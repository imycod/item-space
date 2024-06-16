import {Session} from '@/utils/storage';
import request from "@/utils/request.ts"

export const login = (data: any) => {
	console.log('login----', data);
	return request({
		url: '/auth/login',
		headers: {
			client: 'workspace',
		},
		method: 'post',
		data,
	});
}