import {Local} from '@/utils/storage';
import request from "@/utils/request.ts"
import qs from 'qs';

export const refreshTokenApi = (refresh_token: string) => {
	const grant_type = 'refresh_token';
	const scope = 'server';
	// 获取当前选中的 basic 认证信息
	const basicAuth = Local.get('basicAuth');

	return request({
		url: '/auth/oauth2/token',
		headers: {
			skipToken: true,
			Authorization: basicAuth,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method: 'post',
		params: {refresh_token, grant_type, scope},
	});
};

/**
 * 登录
 * @param data
 */
export const login = (data: any) => {
	const {username, password, randomStr, grant_type} = data;
	const dataObj = qs.stringify({username, password});
	const basicAuth = 'Basic Y2FzOmNhcw==';
	// 保存当前选中的 basic 认证信息
	Local.set('basicAuth', basicAuth);
	console.log('data----', data)
	console.log('dataObj----', dataObj)

	return request({
		// url: '/auth/oauth/token',
		url: '/login',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			// isToken: false,
			// Authorization: basicAuth,
		},
		method: 'post',
		params: {randomStr, grant_type},
		data: dataObj,
	});
}