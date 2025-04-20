import { Link } from 'react-router-dom'
import { CalendarIcon } from '@heroicons/react/24/outline'

// 模拟数据
const reportsData = [
  {
    id: '1',
    title: 'GitHub周报',
    date: '2025/04/20',
    description: 'LangChain, Hugging Face...',
    url: '/reports/1',
  },
  {
    id: '2',
    title: '技术趋势分析',
    date: '2025/04/18',
    description: '大模型应用新方向',
    url: '/reports/2',
  },
  {
    id: '3',
    title: '学术研究摘要',
    date: '2025/04/15',
    description: '多模态模型进展',
    url: '/reports/3',
  }
]

const RecentReports = () => {
  return (
    <div className="space-y-2">
      {reportsData.map(report => (
        <Link 
          key={report.id}
          to={report.url}
          className="flex items-start py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          <div className="flex-grow">
            <div className="flex items-center text-gray-800 font-medium mb-1">
              <span>{report.title}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm flex items-center text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {report.date}
              </span>
            </div>
            <p className="text-sm text-gray-600">{report.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RecentReports 