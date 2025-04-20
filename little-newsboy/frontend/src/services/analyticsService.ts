import axios from 'axios';
import { API_BASE_URL } from '../config';

export interface GitHubActivityData {
  name: string;
  commits: number;
  pullRequests: number;
  issues: number;
  stars: number;
}

export interface GitHubContributorStats {
  name: string;
  commits: number;
  pullRequests: number;
  issues: number;
  avatar?: string;
  profileUrl?: string;
}

export interface GitHubIssueData {
  name: string;
  count: number;
}

export interface GitHubAnalytics {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  lastUpdated: string;
  activityData: GitHubActivityData[];
  contributors: GitHubContributorStats[];
  issueCategories: GitHubIssueData[];
  commitCount30d: number;
  activeContributors: number;
}

export const getGitHubAnalytics = async (
  repoName: string,
  period: 'last_3_months' | 'last_6_months' | 'last_year' = 'last_6_months'
): Promise<GitHubAnalytics> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analytics/github/${repoName}`, {
      params: { period },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    // 转换后端的snake_case为前端的camelCase
    const data = response.data;
    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stars,
      forks: data.forks,
      openIssues: data.open_issues,
      watchers: data.watchers,
      lastUpdated: data.last_updated,
      commitCount30d: data.commit_count_30d,
      activeContributors: data.active_contributors,
      activityData: data.activity_data.map((item: any) => ({
        name: item.name,
        commits: item.commits,
        pullRequests: item.pull_requests,
        issues: item.issues,
        stars: item.stars
      })),
      contributors: data.contributors.map((item: any) => ({
        name: item.name,
        commits: item.commits,
        pullRequests: item.pull_requests,
        issues: item.issues,
        avatar: item.avatar,
        profileUrl: item.profile_url
      })),
      issueCategories: data.issue_categories.map((item: any) => ({
        name: item.name,
        count: item.count
      }))
    };
  } catch (error) {
    console.error('Error fetching GitHub analytics:', error);
    throw error;
  }
}; 