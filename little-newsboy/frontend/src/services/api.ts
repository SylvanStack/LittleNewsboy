import axios from 'axios';

const API_URL = 'http://localhost:8001/api/v1';

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

// 信息源管理API
export const sourceAPI = {
  // 获取信息源列表
  getSources: (params?: {
    skip?: number;
    limit?: number;
    search?: string;
    source_type?: string;
    status?: string;
  }) => {
    return apiClient.get('/source', { params });
  },
  
  // 获取单个信息源
  getSource: (id: string) => {
    return apiClient.get(`/source/${id}`);
  },
  
  // 创建信息源
  createSource: (data: {
    name: string;
    type: string;
    url: string;
    update_frequency?: string;
    priority?: string;
    status?: string;
    filters?: object;
    credentials?: object;
  }) => {
    return apiClient.post('/source', data);
  },
  
  // 更新信息源
  updateSource: (id: string, data: {
    name?: string;
    type?: string;
    url?: string;
    update_frequency?: string;
    priority?: string;
    status?: string;
    filters?: object;
    credentials?: object;
  }) => {
    return apiClient.put(`/source/${id}`, data);
  },
  
  // 删除信息源
  deleteSource: (id: string) => {
    return apiClient.delete(`/source/${id}`);
  },
  
  // 刷新信息源
  refreshSource: (id: string) => {
    return apiClient.post(`/source/${id}/refresh`);
  }
};

export default apiClient; 