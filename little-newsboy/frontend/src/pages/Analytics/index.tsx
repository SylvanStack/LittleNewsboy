import { useState } from 'react'
import { Tabs } from 'antd'
import GitHubAnalytics from './GitHubAnalytics'
import { useNavigate, useLocation } from 'react-router-dom'

const { TabPane } = Tabs

const Analytics = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    const hash = location.hash.slice(1)
    return hash || 'github'
  })

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    navigate(`#${key}`, { replace: true })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">数据分析</h1>
      
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          className="px-4 pt-4"
          size="large"
          type="card"
        >
          <TabPane tab="GitHub项目" key="github">
            <div className="p-4">
              <GitHubAnalytics />
            </div>
          </TabPane>
          <TabPane tab="学术论文" key="papers">
            <div className="p-4">
              <div className="text-center py-20 text-gray-500">
                <p>学术论文分析功能即将推出</p>
              </div>
            </div>
          </TabPane>
          <TabPane tab="技术博客" key="blogs">
            <div className="p-4">
              <div className="text-center py-20 text-gray-500">
                <p>技术博客分析功能即将推出</p>
              </div>
            </div>
          </TabPane>
          <TabPane tab="社区讨论" key="community">
            <div className="p-4">
              <div className="text-center py-20 text-gray-500">
                <p>社区讨论分析功能即将推出</p>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Analytics 