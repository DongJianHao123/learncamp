// types.ts
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { SafeAny } from './Safe'
export interface RequestInterceptors {
    // 请求拦截
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (err: SafeAny) => SafeAny
    // 响应拦截
    responseInterceptors?: <T = AxiosResponse>(config: T) => T
    responseInterceptorsCatch?: (err: SafeAny) => SafeAny
}

export interface AxiosInitConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors
}