import request from "@/utils/request.ts"

export function getUserInfo() {
	return request(`/user/info`)
}