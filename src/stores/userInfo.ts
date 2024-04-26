import {defineStore} from 'pinia';
import {Local} from '@/utils/storage';
import {login, refreshTokenApi} from '@/api/login/index';

/**
 * @function useUserInfo
 * @returns {UserInfosStore}
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		/**
		 * 登录方法
		 * @function login
		 * @async
		 * @param {Object} data - 登录数据
		 * @returns {Promise<Object>}
		 */
		async login(data) {
			data.grant_type = 'password';
			data.scope = 'server';

			// 密码加密
			const user = {
				data: data,
				param: ['password'],
			}

			return new Promise((resolve, reject) => {
				login(user)
					.then((res) => {
						// 存储token 信息
						Local.set('token', res?.access_token);
						Local.set('refresh_token', res?.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		/**
		 * 刷新token方法
		 * @function refreshToken
		 * @async
		 * @returns {Promise<any>}
		 */
		async refreshToken() {
			return new Promise((resolve, reject) => {
				const refreshToken = Local.get('refresh_token');
				refreshTokenApi(refreshToken)
					.then((res) => {
						// 存储token 信息
						Local.set('token', res.access_token);
						Local.set('refresh_token', res.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	}
})