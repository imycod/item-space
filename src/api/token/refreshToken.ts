import request from "@/utils/request.ts";
import {Local} from "@/utils/storage.ts";
/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-04-30 07:48:12
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-04-30 08:05:57
 * @FilePath: \primevue-sass-themed:\code\workcode\item-workspace\src\api\token\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let promise;

export async function refreshToken() {
	console.log("refreshToken");
	if (promise) {
		return promise;
	}
	promise = new Promise(async (resolve) => {
		console.log('Local.get("refreshtoken")---',Local.get("refreshtoken"))
		const resp = await request.get(`/token/refresh`, {
			headers: {
				Authorization: `Bearer ${Local.get("refreshtoken")}`,
			},
			__isRefreshToken: true,
		});
		console.log('----')
		console.log('resp--', resp)
		resolve(resp.code === 0);
	});
	promise.finally(() => {
		promise = null;
	});
	return promise;
} //

export function isRefreshRequest(config) {
	console.log('config---,', config)
	return !!config.__isRefreshToken;
}
