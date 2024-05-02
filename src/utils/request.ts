import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"

const ins = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000
})

function requestSuccessCallback(config: AxiosRequestConfig<any>) {
	return config
}

function requestErrorCallback(error) {
	return Promise.reject(error)
}

ins.interceptors.request.use(requestSuccessCallback, requestErrorCallback)
ins.interceptors.response.use(responseSuccessCallback, responseErrorCallback)

function responseSuccessCallback(response: AxiosResponse<any>) {
	return response.data;
}

function responseErrorCallback(error) {
	return Promise.reject(error)
}

export default ins