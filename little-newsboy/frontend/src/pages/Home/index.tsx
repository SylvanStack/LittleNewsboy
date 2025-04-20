import { Link } from 'react-router-dom'
import { FireIcon, DocumentTextIcon, ChartBarIcon, RssIcon } from '@heroicons/react/24/outline'
import HotTopics from './HotTopics'
import RecentReports from './RecentReports'
import InfoCard from '../../components/dashboard/InfoCard'
import ProjectHealthChart from './ProjectHealthChart'
import InfoSources from './InfoSources'

const Home = () => {
  // 模拟数据
  const sourceStats = {
    github: 12,
    blog: 8,
    paper: 5,
    community: 3
  }

  return (
    <div className="space-y-6">
      {/* 顶部欢迎区 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-2">欢迎使用小报童</h2>
          <p className="text-gray-600 mb-4">您的AI知识追踪助手</p>
          <div className="flex space-x-3">
            <Link to="/sources/new" className="btn btn-accent">
              开始追踪
            </Link>
            <Link to="/tutorial" className="btn btn-secondary">
              查看教程
            </Link>
          </div>
        </div>

        {/* 信息源统计 */}
        <div className="card">
          <div className="flex items-center mb-3">
            <ChartBarIcon className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">信息源统计</h2>
          </div>
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between">
              <span className="text-gray-600">GitHub项目:</span>
              <span className="font-medium">{sourceStats.github}个</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">技术博客:</span>
              <span className="font-medium">{sourceStats.blog}个</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">学术论文:</span>
              <span className="font-medium">{sourceStats.paper}个</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">社区论坛:</span>
              <span className="font-medium">{sourceStats.community}个</span>
            </li>
          </ul>
          <Link to="/sources" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            管理信息源 →
          </Link>
        </div>
      </div>

      {/* 中间区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 今日热点 */}
        <div className="card">
          <div className="flex items-center mb-3">
            <FireIcon className="h-5 w-5 text-accent-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">今日热点</h2>
          </div>
          <HotTopics />
        </div>

        {/* 正在追踪的信息源 */}
        <div className="card">
          <div className="flex items-center mb-3">
            <RssIcon className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">正在追踪的信息源</h2>
          </div>
          <InfoSources />
        </div>
      </div>

      {/* 项目健康度 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <ChartBarIcon className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">项目健康度</h2>
        </div>
        <ProjectHealthChart />
        <div className="mt-3 text-right">
          <Link to="/analytics" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            查看详细分析 →
          </Link>
        </div>
      </div>
      
      {/* 最近生成的报告 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <DocumentTextIcon className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">最近生成的报告</h2>
        </div>
        <RecentReports />
        <div className="mt-3 text-right">
          <Link to="/reports" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            查看全部报告 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 