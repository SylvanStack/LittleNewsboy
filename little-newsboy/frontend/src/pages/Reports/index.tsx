import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DocumentTextIcon, EyeIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

type Report = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'daily' | 'weekly' | 'custom';
  tags: string[];
}

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // 模拟数据
  const reports: Report[] = [
    {
      id: '1',
      title: 'LLM模型性能对比分析',
      description: '对比了最新的LLM模型在各种任务上的性能表现，包括Claude、GPT-4、LLaMA和Gemini。',
      date: '2023-03-10',
      type: 'custom',
      tags: ['LLM', '性能对比', 'AI模型']
    },
    {
      id: '2',
      title: '本周AI研究热点',
      description: '总结了本周AI领域的主要研究进展和热点讨论，包括多模态模型、强化学习和AI安全方面的新进展。',
      date: '2023-03-07',
      type: 'weekly',
      tags: ['AI研究', '热点', '周报']
    },
    {
      id: '3',
      title: 'GitHub项目活跃度报告',
      description: '分析了您关注的开源项目的活跃度、贡献者变化和最新进展，包括Pull Request和Issue的处理情况。',
      date: '2023-03-05',
      type: 'daily',
      tags: ['GitHub', '开源', '项目活跃度']
    },
    {
      id: '4',
      title: 'AI论文摘要集锦',
      description: '汇总了近期发布的重要AI论文的摘要和关键发现，主要关注强化学习、生成模型和自然语言处理领域。',
      date: '2023-03-01',
      type: 'custom',
      tags: ['论文', '摘要', '研究']
    },
    {
      id: '5',
      title: '技术社区讨论分析',
      description: '分析了Hacker News、Reddit和Stack Overflow等社区中关于AI和机器学习的讨论热点和趋势。',
      date: '2023-02-25',
      type: 'weekly',
      tags: ['社区', '讨论', '趋势']
    }
  ];

  const handleGenerateReport = () => {
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false);
      // 这里应该有成功通知
    }, 2000);
  };

  // 根据报告类型返回不同的标签样式
  const getReportTypeStyle = (type: string) => {
    switch(type) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'custom':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">分析报告</h1>
        <button 
          className="btn btn-primary flex items-center"
          onClick={handleGenerateReport}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              生成新报告
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索报告..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">所有类型</option>
            <option value="daily">每日报告</option>
            <option value="weekly">每周报告</option>
            <option value="custom">自定义报告</option>
          </select>
          <select className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">所有标签</option>
            <option value="LLM">LLM</option>
            <option value="研究">研究</option>
            <option value="GitHub">GitHub</option>
          </select>
        </div>

        <div className="divide-y divide-gray-200">
          {reports.map(report => (
            <div key={report.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{report.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getReportTypeStyle(report.type)}`}>
                      {report.type === 'daily' ? '每日' : report.type === 'weekly' ? '每周' : '自定义'}
                    </span>
                    <span className="text-sm text-gray-500">{report.date}</span>
                    {report.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    to={`/reports/${report.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
                    title="查看报告"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                  <Link 
                    to={`/reports/${report.id}/analytics`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
                    title="查看分析"
                  >
                    <ChartBarIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports 