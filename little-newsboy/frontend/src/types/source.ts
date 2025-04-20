export enum SourceType {
  GITHUB = 'github',
  ARXIV = 'arxiv',
  BLOG = 'blog',
  COMMUNITY = 'community',
  NEWS = 'news'
}

export enum UpdateFrequency {
  REALTIME = 'realtime',
  DAILY = 'daily',
  WEEKLY = 'weekly'
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum Status {
  ACTIVE = 'active',
  PAUSED = 'paused'
}

export interface ISource {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  update_frequency: UpdateFrequency;
  priority: Priority;
  status: Status;
  filters?: string;
  credentials?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ISourceCreate {
  name: string;
  type: SourceType;
  url: string;
  update_frequency: UpdateFrequency;
  priority: Priority;
  status: Status;
  filters?: string;
  credentials?: string;
}

export interface ISourceUpdate {
  name?: string;
  type?: SourceType;
  url?: string;
  update_frequency?: UpdateFrequency;
  priority?: Priority;
  status?: Status;
  filters?: string;
  credentials?: string;
}

export interface ISourcesPage {
  items: ISource[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const SourceTypeLabels: Record<SourceType, string> = {
  [SourceType.GITHUB]: 'Github',
  [SourceType.ARXIV]: 'Arxiv',
  [SourceType.BLOG]: 'Blog',
  [SourceType.COMMUNITY]: 'Community',
  [SourceType.NEWS]: 'News'
};

export const UpdateFrequencyLabels: Record<UpdateFrequency, string> = {
  [UpdateFrequency.REALTIME]: '实时',
  [UpdateFrequency.DAILY]: '每天',
  [UpdateFrequency.WEEKLY]: '每周'
};

export const PriorityLabels: Record<Priority, string> = {
  [Priority.HIGH]: '高',
  [Priority.MEDIUM]: '中',
  [Priority.LOW]: '低'
};

export const StatusLabels: Record<Status, string> = {
  [Status.ACTIVE]: '活跃',
  [Status.PAUSED]: '暂停'
};

export const StatusColors: Record<Status, string> = {
  [Status.ACTIVE]: 'success',
  [Status.PAUSED]: 'default'
}; 