import { Link } from 'react-router-dom'
import { GlobeAltIcon, CodeBracketIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline'

// 模拟数据
const infoSourcesData = [
  {
    id: '1',
    name: 'LangChain',
    type: 'github',
    url: 'https://github.com/langchain-ai/langchain',
    lastUpdate: '2小时前',
    updates: 3
  },
  {
    id: '2',
    name: 'Hugging Face Blog',
    type: 'blog',
    url: 'https://huggingface.co/blog',
    lastUpdate: '昨天',
    updates: 1
  },
  {
    id: '3',
    name: '多模态大模型论文',
    type: 'paper',
    url: 'https://arxiv.org/abs/2301.00234',
    lastUpdate: '3天前',
    updates: 0
  },
  {
    id: '4',
    name: 'AI社区讨论',
    type: 'community',
    url: 'https://community.ai',
    lastUpdate: '5小时前',
    updates: 2
  }
]

// 根据类型获取图标
const getSourceIcon = (type: string) => {
  switch (type) {
    case 'github':
      return <CodeBracketIcon className="h-4 w-4 text-gray-600" />
    case 'paper':
      return <DocumentTextIcon className="h-4 w-4 text-gray-600" />
    case 'community':
      return <UserGroupIcon className="h-4 w-4 text-gray-600" />
    case 'blog':
    default:
      return <GlobeAltIcon className="h-4 w-4 text-gray-600" />
  }
}

const InfoSources = () => {
  return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-100">
        {infoSourcesData.map(source => (
          <li key={source.id}>
            <Link 
              to={`/sources/${source.id}`}
              className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {getSourceIcon(source.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{source.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{source.type}</span>
                    <span className="mx-1">•</span>
                    <span>更新于{source.lastUpdate}</span>
                  </div>
                </div>
              </div>
              
              {source.updates > 0 && (
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  {source.updates}条更新
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-right">
        <Link to="/sources" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          管理全部信息源 →
        </Link>
      </div>
    </div>
  )
}

export default InfoSources 