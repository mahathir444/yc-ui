import axios, { AxiosInstance } from 'axios';
import { ApiResponse, RequestConfig } from './type';
import router from '@/router';
import { ss, ls } from './storage';
import { baseUrl } from '@/config';

class Request {
  private instance: AxiosInstance;
  private interceptors: any;
  private tokenMap: Record<string, any>;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.tokenMap = {};
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 所有实例都共享的拦截器
    this.instance.interceptors.request.use((config) => {
      return config;
    });
    this.instance.interceptors.response.use((config) => {
      return config;
    });
  }

  private request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.token) {
        if (this.tokenMap[config.token]) {
          this.tokenMap[config.token].cancel();
        }
        this.tokenMap[config.token] = axios.CancelToken.source();
        config = Object.assign(
          {
            cancelToken: this.tokenMap[config.token].token,
          },
          config
        );
      }
      this.instance
        .request(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 将结果resolve返回出去
          resolve(res as any);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.request({ ...config, method: 'PATCH' });
  }

  put<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.request({ ...config, method: 'PUT' });
  }
}

const request = new Request({
  baseURL: baseUrl,
  interceptors: {
    requestInterceptor: (config) => {
      //设置content-type
      if (!config.headers!['Content-Type']) {
        config.headers!['Content-Type'] =
          config.data && config.data instanceof FormData
            ? 'multipart/form-data'
            : 'application/json';
      }
      return config;
    },
    responseInterceptor: (res) => {
      const {
        data,
        headers,
        data: { code, msg },
        config: { method, url },
        status,
      } = res;
      if (!code) {
        return { headers, data };
      }
      if (code == '200') {
        return data;
      } else {
        const error = {
          type: 'error',
          title: '操作失败',
          method,
          url,
          status,
          message: msg?.length > 300 ? '请求出错啦,请稍后重试！' : msg,
        };
        return Promise.reject(error);
      }
    },
  },
});

export default request;
