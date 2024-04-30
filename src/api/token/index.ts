import request from "@/utils/request.ts";

export const login = (data: any) => {
	return request({
		url: '/token/login',
		method: 'post',
		data,
	});
}

export const getProtected = () => {
	return request({
		url: '/token/protection',
		method: 'get',
	});
}