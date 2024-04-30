/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-04-26 06:31:21
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-04-30 07:58:25
 * @FilePath: \primevue-sass-themed:\code\workcode\item-workspace\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import eventEmitter from "@/utils/eventEmitter.ts";
import {Local} from "@/utils/storage.ts";
import {useUserInfo} from "@/stores/userInfo";
import {isRefreshRequest, refreshToken} from "@/api/token/refreshToken.ts";

const ins = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	// headers:{
	// Authorization: `Bearer ${Local.get('token')}`,
	// }
});

function requestSuccessCallback(config: AxiosRequestConfig<any>) {
	// 统一增加Authorization请求头, skipToken 跳过增加token
	const token = Local.get("token");
	if (token && !config.headers?.skipToken) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	config.headers["Client-Id"] = import.meta.env.VITE_CLIENT_ID;

	// console.log("config---", config);

	return config;
}

function requestErrorCallback(error) {
	// 对请求错误进行处理
	console.log("error----", error);
	if (error.response.status === 401) {
		eventEmitter.emit("API:UN_AUTHORIZED");
	} else if (error.response.status === 400) {
		eventEmitter.emit("API:VALIDATION_ERROR", error.response.data);
	}
	return Promise.reject(error);
}

ins.interceptors.request.use(requestSuccessCallback, requestErrorCallback);
ins.interceptors.response.use(responseSuccessCallback, responseErrorCallback);

async function responseSuccessCallback(response: AxiosResponse<any>) {
	// console.log("response----", response);
	if (response.headers['authorization']) {
		const token = response.headers['authorization'].replace("Bearer ", "");
		Local.set("token", token);
		// ins.defaults.headers["Authorization"] = `Bearer ${token}`;
	}
	if (response.headers['x-refresh-token']) {
		const refreshtoken = response.headers['x-refresh-token'].replace("Bearer ", "");
		Local.set("refreshtoken", refreshtoken);
	}
	// 无权限 token过期了
	if (response.data.code === 401 && !isRefreshRequest(response.config)) {
		console.log("response.data",response.data);

		// 最后 刷新token也过期呢？要么缓存被清空了？
		// 刷新token
		const isSuccess = await refreshToken();
		if (isSuccess) {
			// 重新请求
			console.log("重新请求----是否用原来的token");
			// response.config.headers.Authorization = `Bearer ${Local.get('token')}`;
			const resp = await ins.request(response.config);
			return resp;
		} else {
			// 重新登录
			Local.clear();
			console.log('重定向到登录页');
		}
	}
	if (response.status === 206) {
		const directUrl = response.headers.location;
		Local.clear();
		window.location.href = directUrl; // 去登录页
		throw response.data;
	}
	return response.data;
}

function responseErrorCallback(error) {
	const status = Number(error.response.status);
	if (status === 424) {
		Local.clear(); // 清除浏览器全部临时缓存
		useUserInfo().login({});
		return;
	}
	if (error.response.status === 404) {
		eventEmitter.emit("API:NOT_FOUND");
		return Promise.reject(error);
	}
	return Promise.reject(error);
}

export default ins;
