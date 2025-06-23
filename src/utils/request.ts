import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import store from '@/store';

const baseURL = 'https://pmuat.handlebook.com.hk';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

// 需要跳过 token 注入的接口（如配对/登录等）
const noTokenApis = [
  '/pm/php/data.php?action=testDeviceAPI',
  // 你可以继续添加其它不需要 token 的接口
];

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || '';
    const needToken = !noTokenApis.some(api => url.includes(api));
    const token = (store.getState() as any).user?.token;
    if (token && needToken) {
      config.headers = {
        ...(config.headers || {}),
        Cookie: `token="${token}"`,
        Accept: '*/*',
      } as any;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截器，兼容后端 warning 和字符串 JSON
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
