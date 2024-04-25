import axios from "axios"
import eventEmitter from "@/utils/eventEmitter.ts";

const ins = axios.create({
	baseURL: import.meta.env.VITE_NODE_API,
	timeout: 10000
})

function requestSuccessCallback(config) {
	return config
}

function requestErrorCallback(error) {
	if (error.response.status === 401) {
		eventEmitter.emit('API:UN_AUTHORIZED')
	} else if (error.response.status === 400) {
		eventEmitter.emit('API:VALIDATION_ERROR', error.response.data)
	}
	return Promise.reject(error)
}

ins.interceptors.request.use(requestSuccessCallback, requestErrorCallback)

export default ins