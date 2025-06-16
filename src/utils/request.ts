import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const baseURL = 'https://pmuat.handlebook.com.hk';

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

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    let data = response.data;
    if (typeof data === 'string') {
      const lines = data.trim().split('\n');
      const lastLine = lines[lines.length - 1].trim();
      try {
        data = JSON.parse(lastLine);
      } catch (e) {
        // 解析失败，保留原始字符串
      }
    }
    return data;
  },
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
