import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 认证相关API
export const authAPI = {
  register: (username: string, email: string, password: string, passwordConfirm: string) => {
    return apiClient.post('/auth/register', {
      username,
      email,
      password,
      password_confirm: passwordConfirm,
    });
  },
  
  login: (usernameOrEmail: string, password: string, rememberMe: boolean = false) => {
    return apiClient.post('/auth/login', {
      username_or_email: usernameOrEmail,
      password,
      remember_me: rememberMe,
    });
  },
  
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },
};

export default apiClient; 