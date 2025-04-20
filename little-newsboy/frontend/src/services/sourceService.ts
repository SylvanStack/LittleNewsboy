import api from '../api';
import { SourceType, UpdateFrequency, Priority, Status } from '../types/source';

export interface SourceCreate {
  name: string;
  type: SourceType;
  url: string;
  update_frequency?: UpdateFrequency;
  priority?: Priority;
  status?: Status;
  filters?: Record<string, any>;
  credentials?: Record<string, any>;
}

export interface SourceUpdate {
  name?: string;
  type?: SourceType;
  url?: string;
  update_frequency?: UpdateFrequency;
  priority?: Priority;
  status?: Status;
  filters?: Record<string, any>;
  credentials?: Record<string, any>;
}

export interface Source extends SourceCreate {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface SourcesResponse {
  items: Source[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// 获取信息源列表
export const getSources = async (
  page = 1,
  size = 10,
  search?: string,
  sourceType?: SourceType,
  status?: Status
) => {
  const params = { page, size, search, source_type: sourceType, status };
  const response = await api.get<SourcesResponse>('/sources', { params });
  return response.data;
};

// 获取单个信息源
export const getSource = async (id: string) => {
  const response = await api.get<Source>(`/sources/${id}`);
  return response.data;
};

// 创建信息源
export const createSource = async (source: SourceCreate) => {
  const response = await api.post<Source>('/sources', source);
  return response.data;
};

// 更新信息源
export const updateSource = async (id: string, source: SourceUpdate) => {
  const response = await api.put<Source>(`/sources/${id}`, source);
  return response.data;
};

// 删除信息源
export const deleteSource = async (id: string) => {
  await api.delete(`/sources/${id}`);
};

// 刷新信息源
export const refreshSource = async (id: string) => {
  const response = await api.post<Source>(`/sources/${id}/refresh`);
  return response.data;
}; 