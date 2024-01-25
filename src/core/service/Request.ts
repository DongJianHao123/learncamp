// index.ts
import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { AxiosInitConfig, RequestInterceptors } from '@/core/types/Request'
import { SafeAny } from '@/core/types/Safe'

class Request {
    // axios 实例
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors

    constructor(config: AxiosInitConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        this.instance.interceptors.request.use(
            (res: InternalAxiosRequestConfig) => {
                // console.log('全局请求拦截器')
                return res
            },
            (err: SafeAny) => err,
        )

        // 使用实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        )
        // 全局响应拦截器保证最后执行
        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            (res: AxiosResponse) => {
                // console.log('全局响应拦截器')
                return res.data
            },
            (err: SafeAny) => err,
        )
    }
}

export default Request