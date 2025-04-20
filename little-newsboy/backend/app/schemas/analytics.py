from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GitHubActivityData(BaseModel):
    """GitHub活动数据"""
    name: str
    commits: int
    pull_requests: int
    issues: int
    stars: int

class GitHubContributorStats(BaseModel):
    """GitHub贡献者统计"""
    name: str
    commits: int
    pull_requests: int
    issues: int
    avatar: Optional[str] = None
    profile_url: Optional[str] = None

class GitHubIssueData(BaseModel):
    """GitHub问题数据"""
    name: str
    count: int

class GitHubAnalyticsResponse(BaseModel):
    """GitHub分析响应"""
    name: str
    full_name: str
    description: str
    stars: int
    forks: int
    open_issues: int
    watchers: int
    last_updated: datetime
    activity_data: List[GitHubActivityData]
    contributors: List[GitHubContributorStats]
    issue_categories: List[GitHubIssueData]
    commit_count_30d: int
    active_contributors: int
    
    class Config:
        from_attributes = True 