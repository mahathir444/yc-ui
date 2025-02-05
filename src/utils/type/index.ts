import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptors<T> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (result: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  token?: string;
}

export interface global extends Window {
  $message?: Record<string, any>;
  $notification?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}
