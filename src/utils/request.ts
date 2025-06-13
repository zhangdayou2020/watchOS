import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const baseURL = 'https://your-api-base-url.com'; // TODO: 替换为你的后端地址

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可在此添加 token 等通用 header
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  error => Promise.reject(error),
);

// 通用 GET 方法
function get<T = any>(url: string, config?: any): Promise<T> {
  return instance.get(url, config);
}

// 通用 POST 方法
function post<T = any>(url: string, data?: any, config?: any): Promise<T> {
  return instance.post(url, data, config);
}

const request = {
  get,
  post,
};

export default request;
