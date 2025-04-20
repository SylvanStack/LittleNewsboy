from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import random
from datetime import datetime, timedelta

from app.api.deps import get_db
from app.schemas.analytics import (
    GitHubAnalyticsResponse,
    GitHubContributorStats,
    GitHubActivityData,
    GitHubIssueData
)

router = APIRouter()

@router.get("/github/{repo_name}", response_model=GitHubAnalyticsResponse)
def get_github_analytics(
    repo_name: str, 
    period: Optional[str] = "last_6_months", 
    db: Session = Depends(get_db)
):
    """
    获取GitHub项目分析数据
    """
    try:
        # 在实际应用中，这里应该从数据库或GitHub API获取数据
        # 这里使用模拟数据进行演示
        
        # 生成活动数据
        activity_data = generate_activity_data(period)
        
        # 生成贡献者数据
        contributors = [
            GitHubContributorStats(
                name="李明",
                commits=87,
                pull_requests=12,
                issues=9,
                avatar="https://randomuser.me/api/portraits/men/1.jpg",
                profile_url=f"https://github.com/user1"
            ),
            GitHubContributorStats(
                name="王华",
                commits=65,
                pull_requests=9,
                issues=15,
                avatar="https://randomuser.me/api/portraits/men/2.jpg",
                profile_url=f"https://github.com/user2"
            ),
            GitHubContributorStats(
                name="张伟",
                commits=52,
                pull_requests=7,
                issues=11,
                avatar="https://randomuser.me/api/portraits/men/3.jpg",
                profile_url=f"https://github.com/user3"
            ),
            GitHubContributorStats(
                name="陈杰",
                commits=41,
                pull_requests=5,
                issues=8,
                avatar="https://randomuser.me/api/portraits/men/4.jpg",
                profile_url=f"https://github.com/user4"
            ),
            GitHubContributorStats(
                name="刘强",
                commits=34,
                pull_requests=3,
                issues=14,
                avatar="https://randomuser.me/api/portraits/men/5.jpg",
                profile_url=f"https://github.com/user5"
            )
        ]
        
        # 生成问题分类数据
        issue_categories = [
            GitHubIssueData(name="Bug", count=28),
            GitHubIssueData(name="功能请求", count=16),
            GitHubIssueData(name="文档问题", count=9),
            GitHubIssueData(name="性能问题", count=7),
            GitHubIssueData(name="安全问题", count=5),
            GitHubIssueData(name="其他", count=12)
        ]
        
        # 生成项目基本数据
        response = GitHubAnalyticsResponse(
            name="LLaMA",
            full_name="facebookresearch/llama",
            description="Open and efficient foundation language models",
            stars=56800,
            forks=9530,
            open_issues=325,
            watchers=1250,
            last_updated=datetime.now() - timedelta(days=random.randint(1, 5)),
            activity_data=activity_data,
            contributors=contributors,
            issue_categories=issue_categories,
            commit_count_30d=956,
            active_contributors=68
        )
        
        return response
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"获取GitHub分析数据失败: {str(e)}"
        )

def generate_activity_data(period: str) -> List[GitHubActivityData]:
    """
    生成活动数据
    
    Args:
        period: 周期，可选值为 "last_6_months", "last_year", "last_3_months"
    """
    months = {
        "last_6_months": 6,
        "last_year": 12,
        "last_3_months": 3
    }.get(period, 6)
    
    # 生成月份标签
    today = datetime.now()
    result = []
    
    for i in range(months, 0, -1):
        month_date = today - timedelta(days=30 * i)
        month_name = month_date.strftime("%m月")
        
        # 为每个月份生成随机数据
        data = GitHubActivityData(
            name=month_name,
            commits=random.randint(100, 250),
            pull_requests=random.randint(20, 60),
            issues=random.randint(30, 70),
            stars=random.randint(50, 200)
        )
        result.append(data)
    
    return result 