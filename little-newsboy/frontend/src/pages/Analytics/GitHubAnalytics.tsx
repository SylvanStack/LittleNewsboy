import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  CodeBracketIcon, 
  UserGroupIcon, 
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import DashboardCard from '../../components/ui/DashboardCard'
import AreaChart from '../../components/ui/AreaChart'
import BarChart from '../../components/ui/BarChart'

// 模拟数据：GitHub项目活跃度
const activityData = [
  { name: '1月', commits: 120, pullRequests: 32, issues: 45, stars: 78 },
  { name: '2月', commits: 145, pullRequests: 28, issues: 53, stars: 92 },
  { name: '3月', commits: 162, pullRequests: 41, issues: 47, stars: 105 },
  { name: '4月', commits: 134, pullRequests: 36, issues: 52, stars: 118 },
  { name: '5月', commits: 185, pullRequests: 47, issues: 59, stars: 145 },
  { name: '6月', commits: 210, pullRequests: 56, issues: 41, stars: 180 }
];

// 模拟数据：贡献者活跃度
const contributorsData = [
  { name: '李明', commits: 87, pullRequests: 12, issues: 9 },
  { name: '王华', commits: 65, pullRequests: 9, issues: 15 },
  { name: '张伟', commits: 52, pullRequests: 7, issues: 11 },
  { name: '陈杰', commits: 41, pullRequests: 5, issues: 8 },
  { name: '刘强', commits: 34, pullRequests: 3, issues: 14 }
];

// 模拟数据：问题分类
const issuesData = [
  { name: 'Bug', 数量: 28, color: '#ff6b6b' },
  { name: '功能请求', 数量: 16, color: '#339af0' },
  { name: '文档问题', 数量: 9, color: '#7950f2' },
  { name: '性能问题', 数量: 7, color: '#fcc419' },
  { name: '安全问题', 数量: 5, color: '#fa5252' },
  { name: '其他', 数量: 12, color: '#a9a9a9' }
];

const GitHubAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState({
    name: 'LLaMA',
    fullName: 'facebookresearch/llama',
    description: 'Open and efficient foundation language models',
    stars: 56800,
    forks: 9530,
    openIssues: 325,
    watchers: 1250,
    lastUpdated: '2023-03-15T10:23:45Z'
  });

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">GitHub项目分析</h1>
          <p className="text-gray-600">
            {projectData.fullName} • 最后更新: {new Date(projectData.lastUpdated).toLocaleString('zh-CN')}
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              更新中...
            </>
          ) : (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              刷新数据
            </>
          )}
        </button>
      </div>

      {/* 基本指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard 
          title="星标数" 
          icon={<StarIcon className="h-5 w-5" />} 
          loading={loading}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">{projectData.stars.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">+25% 相比上月</p>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="代码提交" 
          icon={<CodeBracketIcon className="h-5 w-5" />} 
          loading={loading}
          className="bg-gradient-to-br from-blue-50 to-blue-100"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">956</p>
            <p className="text-sm text-gray-500 mt-1">最近30天</p>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="贡献者" 
          icon={<UserGroupIcon className="h-5 w-5" />} 
          loading={loading}
          className="bg-gradient-to-br from-green-50 to-green-100"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">68</p>
            <p className="text-sm text-gray-500 mt-1">活跃贡献者</p>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="开放问题" 
          icon={<ChartBarIcon className="h-5 w-5" />} 
          loading={loading}
          className="bg-gradient-to-br from-orange-50 to-orange-100"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{projectData.openIssues}</p>
            <p className="text-sm text-gray-500 mt-1">-12% 相比上月</p>
          </div>
        </DashboardCard>
      </div>

      {/* 项目活跃度图表 */}
      <DashboardCard 
        title="项目活跃度趋势" 
        icon={<ArrowTrendingUpIcon className="h-5 w-5" />}
        loading={loading}
      >
        <div className="mb-4">
          <AreaChart
            data={activityData}
            areas={[
              { dataKey: 'commits', name: '代码提交', color: '#4c6ef5' },
              { dataKey: 'pullRequests', name: '合并请求', color: '#ae3ec9' },
              { dataKey: 'issues', name: '问题', color: '#ff922b' },
              { dataKey: 'stars', name: '星标', color: '#fcc419' }
            ]}
            height={300}
          />
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 贡献者活跃度 */}
        <DashboardCard 
          title="贡献者活跃度" 
          icon={<UserGroupIcon className="h-5 w-5" />}
          loading={loading}
        >
          <BarChart
            data={contributorsData}
            bars={[
              { dataKey: 'commits', name: '代码提交', color: '#4c6ef5', showLabel: true }
            ]}
            height={300}
            layout="horizontal"
          />
        </DashboardCard>

        {/* 问题分类 */}
        <DashboardCard 
          title="问题分类" 
          icon={<ChartBarIcon className="h-5 w-5" />}
          loading={loading}
        >
          <BarChart
            data={issuesData}
            bars={[
              { dataKey: '数量', name: '问题数量', color: '#ff6b6b', showLabel: true }
            ]}
            height={300}
            layout="horizontal"
          />
        </DashboardCard>
      </div>
    </div>
  )
}

export default GitHubAnalytics 