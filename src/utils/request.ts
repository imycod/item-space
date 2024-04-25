import axios from "axios"

console.log('import.meta.env---',import.meta.env)
const ins = axios.create({
    baseURL: import.meta.env.VITE_NODE_API,
    timeout: 10000
})

function requestSuccessCallback(config) {
    return config
}

function requestErrorCallback(error) {
    return Promise.reject(error)
}

ins.interceptors.request.use(requestSuccessCallback, requestErrorCallback)

export default ins