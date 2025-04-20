import { ISource } from './source';

// 摘要基本类型
export interface Summary {
  id: string;
  title: string;
  content: string;
  key_points: string[];
  sources: ISource[];
  tags: string[];
  is_archived: boolean;
  is_important: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// 创建摘要请求
export interface SummaryCreateRequest {
  title: string;
  content: string;
  key_points: string[];
  source_ids: string[];
  tags: string[];
}

// 更新摘要请求
export interface SummaryUpdateRequest {
  title?: string;
  content?: string;
  key_points?: string[];
  source_ids?: string[];
  tags?: string[];
  is_archived?: boolean;
  is_important?: boolean;
}

// 摘要分页结果
export interface SummariesPage {
  items: Summary[];
  total: number;
  page: number;
  size: number;
  page_size?: number;
  total_pages?: number;
}

// 摘要参数
export interface SummaryParameters {
  max_length?: number;
  focus_points?: string[];
  format?: string;
  tags?: string[];
}

// 摘要模板
export interface SummaryTemplate {
  id: string;
  name: string;
  description: string;
  parameters: SummaryParameters;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// 创建摘要模板请求
export interface SummaryTemplateCreateRequest {
  name: string;
  description: string;
  parameters: SummaryParameters;
}

// 更新摘要模板请求
export interface SummaryTemplateUpdateRequest {
  name?: string;
  description?: string;
  parameters?: SummaryParameters;
}

// 生成摘要请求
export interface SummaryGenerateRequest {
  source_ids: string[];
  template_id?: string;
  parameters?: SummaryParameters;
}

// 摘要筛选参数
export interface SummaryFilter {
  page?: number;
  page_size?: number;
  sort_field?: string;
  sort_order?: 'asc' | 'desc';
  tag?: string;
  search?: string;
  is_archived?: boolean;
  is_important?: boolean;
  source_id?: string;
} 