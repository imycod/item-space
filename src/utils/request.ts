import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import eventEmitter from "@/utils/eventEmitter.ts";
import {Local} from "@/utils/storage.ts"
import {useUserInfo} from '@/stores/userInfo';

const ins = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000
})

function requestSuccessCallback(config: AxiosRequestConfig<any>) {
	// 统一增加Authorization请求头, skipToken 跳过增加token
	const token = Local.get('token');
	if (token && !config.headers?.skipToken) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	config.headers['Client-Id'] = import.meta.env.VITE_CLIENT_ID;

	console.log('config---',config)

	return config
}

function requestErrorCallback(error) {
	// 对请求错误进行处理
	console.log('error----', error)
	if (error.response.status === 401) {
		eventEmitter.emit('API:UN_AUTHORIZED')
	} else if (error.response.status === 400) {
		eventEmitter.emit('API:VALIDATION_ERROR', error.response.data)
	}
	return Promise.reject(error)
}

ins.interceptors.request.use(requestSuccessCallback, requestErrorCallback)
ins.interceptors.response.use(responseSuccessCallback, responseErrorCallback)

function responseSuccessCallback(response: AxiosResponse<any>) {
	console.log('response----',response)
	if (response.status === 206) {
		const directUrl = response.headers.location;
		Local.clear();
		window.location.href = directUrl; // 去登录页
		throw response.data;
	}
	return response.data;
}

function responseErrorCallback(error) {
	const status = Number(error.response.status)
	if (status === 424) {
		Local.clear(); // 清除浏览器全部临时缓存
		useUserInfo().login({});
		return;
	}
	if (error.response.status === 404) {
		eventEmitter.emit('API:NOT_FOUND')
		return Promise.reject(error)
	}
	return Promise.reject(error)
}

export default ins