
import Request from "./Request";

const request = new Request({
    baseURL: `https://admin.maodouketang.com:8443`,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            // console.log('实例请求拦截器')
            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            // console.log('实例响应拦截器')
            return result
        },
    },
}).instance

export default request