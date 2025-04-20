import { Link } from 'react-router-dom'

// 模拟数据
const hotTopicsData = [
  {
    id: '1',
    title: 'LangChain发布v0.8.0',
    source: 'github',
    url: '/content/1'
  },
  {
    id: '2',
    title: 'OpenAI推出新模型',
    source: 'news',
    url: '/content/2'
  },
  {
    id: '3',
    title: '学术前沿: 多模态研究',
    source: 'paper',
    url: '/content/3'
  },
  {
    id: '4',
    title: 'HackerNews热门讨论',
    source: 'community',
    url: '/content/4'
  }
]

const HotTopics = () => {
  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {hotTopicsData.map(topic => (
          <li key={topic.id}>
            <Link 
              to={topic.url}
              className="block py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <span className="h-2 w-2 mt-2 mr-2 rounded-full bg-accent-500 flex-shrink-0"></span>
                <span className="text-gray-800">{topic.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-right">
        <Link to="/hot-topics" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          查看全部 →
        </Link>
      </div>
    </div>
  )
}

export default HotTopics 