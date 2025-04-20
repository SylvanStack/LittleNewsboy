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
    page?: number;
    page_size?: number;
    search?: string;
    source_type?: string;
    status?: string;
  }) => {
    return apiClient.get('/sources', { params });
  },
  
  // 获取单个信息源
  getSource: (id: string) => {
    return apiClient.get(`/sources/${id}`);
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
    return apiClient.post('/sources', data);
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
    return apiClient.put(`/sources/${id}`, data);
  },
  
  // 删除信息源
  deleteSource: (id: string) => {
    return apiClient.delete(`/sources/${id}`);
  },
  
  // 刷新信息源
  refreshSource: (id: string) => {
    return apiClient.post(`/sources/${id}/refresh`);
  }
};

// 知识摘要管理API
export const summaryAPI = {
  // 获取摘要列表
  getSummaries: (params?: {
    page?: number;
    page_size?: number;
    sort_field?: string;
    sort_order?: string;
    tag?: string;
    search?: string;
    is_archived?: boolean;
    is_important?: boolean;
    source_id?: string;
  }) => {
    return apiClient.get('/summaries', { params });
  },
  
  // 获取单个摘要详情
  getSummary: (id: string) => {
    return apiClient.get(`/summaries/${id}`);
  },
  
  // 创建新摘要
  createSummary: (data: {
    title: string;
    content: string;
    key_points: string[];
    source_ids: string[];
    tags: string[];
  }) => {
    return apiClient.post('/summaries', data);
  },
  
  // 更新摘要
  updateSummary: (id: string, data: {
    title?: string;
    content?: string;
    key_points?: string[];
    source_ids?: string[];
    tags?: string[];
    is_archived?: boolean;
    is_important?: boolean;
  }) => {
    return apiClient.put(`/summaries/${id}`, data);
  },
  
  // 删除摘要
  deleteSummary: (id: string) => {
    return apiClient.delete(`/summaries/${id}`);
  },
  
  // 切换摘要归档状态
  toggleArchive: (id: string) => {
    return apiClient.post(`/summaries/${id}/archive`);
  },
  
  // 切换摘要重要标记
  toggleImportant: (id: string) => {
    return apiClient.post(`/summaries/${id}/important`);
  },
  
  // 从指定信息源生成摘要
  generateSummary: (data: {
    source_ids: string[];
    template_id?: string;
    parameters?: {
      max_length?: number;
      focus_points?: string[];
      format?: string;
      tags?: string[];
    };
  }) => {
    return apiClient.post('/summaries/generate', data);
  },
  
  // 获取摘要模板列表
  getTemplates: () => {
    return apiClient.get('/summaries/templates');
  },
  
  // 获取单个摘要模板
  getTemplate: (id: string) => {
    return apiClient.get(`/summaries/templates/${id}`);
  },
  
  // 创建摘要模板
  createTemplate: (data: {
    name: string;
    description: string;
    parameters: {
      max_length?: number;
      focus_points?: string[];
      format?: string;
      tags?: string[];
    };
  }) => {
    return apiClient.post('/summaries/templates', data);
  },
  
  // 更新摘要模板
  updateTemplate: (id: string, data: {
    name?: string;
    description?: string;
    parameters?: {
      max_length?: number;
      focus_points?: string[];
      format?: string;
      tags?: string[];
    };
  }) => {
    return apiClient.put(`/summaries/templates/${id}`, data);
  },
  
  // 删除摘要模板
  deleteTemplate: (id: string) => {
    return apiClient.delete(`/summaries/templates/${id}`);
  }
};

export default apiClient; 