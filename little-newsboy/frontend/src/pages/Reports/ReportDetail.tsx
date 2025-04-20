import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, DocumentDuplicateIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

type Report = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'daily' | 'weekly' | 'custom';
  tags: string[];
  author: string;
}

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      // 模拟数据
      const mockReport: Report = {
        id: id || '1',
        title: 'LLM模型性能对比分析',
        content: `
# LLM模型性能对比分析

## 概述

本报告对比了Claude、GPT-4、LLaMA和Gemini等最新LLM模型在各种任务上的性能表现。我们通过标准化测试集和实际应用场景两个维度进行了全面评估。

## 模型比较

### 1. 自然语言理解能力

| 模型 | MMLU | HellaSwag | TruthfulQA | GSM8K |
|------|------|-----------|------------|-------|
| Claude 3 | 86.2% | 89.7% | 71.3% | 92.1% |
| GPT-4 | 87.5% | 90.3% | 65.2% | 94.6% |
| LLaMA 3 | 83.1% | 88.2% | 59.7% | 89.3% |
| Gemini | 85.9% | 87.1% | 62.5% | 91.7% |

Claude 3在真实性问答(TruthfulQA)方面表现最佳，而GPT-4在数学推理(GSM8K)上占据优势。

### 2. 代码生成与调试

Claude和GPT-4在复杂代码生成和调试方面表现突出，尤其是多文件项目的理解和修改。LLaMA在简单编程任务上性价比较高。

### 3. 长文本处理

Claude 3在处理长文本方面具有显著优势，上下文窗口大且保持连贯性好。GPT-4在长文档摘要质量上略胜一筹。

## 性能与资源消耗

| 模型 | 推理速度 | 内存占用 | 部署成本 |
|------|----------|----------|----------|
| Claude 3 | 中等 | 高 | 高 |
| GPT-4 | 慢 | 高 | 高 |
| LLaMA 3 | 快 | 中等 | 低 |
| Gemini | 中等 | 高 | 中等 |

## 结论

- **通用任务**: GPT-4和Claude 3表现最为全面均衡
- **特定领域**: 根据具体需求选择专门模型可能更有性价比
- **资源受限**: LLaMA系列在本地部署和资源效率上具有优势
- **实时应用**: 需要权衡模型大小与响应速度
        `,
        date: '2023-03-10',
        type: 'custom',
        tags: ['LLM', '性能对比', 'AI模型'],
        author: '小报童AI'
      };
      
      setReport(mockReport);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCopyText = () => {
    if (report) {
      navigator.clipboard.writeText(report.content);
      // 这里应该有成功通知
    }
  };

  const handleDownload = () => {
    if (report) {
      const element = document.createElement('a');
      const file = new Blob([report.content], {type: 'text/markdown'});
      element.href = URL.createObjectURL(file);
      element.download = `${report.title}.md`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  // 将Markdown格式的内容渲染为HTML
  const renderMarkdown = (content: string) => {
    // 这里简单处理一下Markdown格式，实际应用中应使用markdown-it或类似库
    // 处理标题
    let html = content
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium my-2">$1</h3>')
      // 处理段落
      .replace(/^(?!\<h|\||\-|\*)(.*$)/gm, '<p class="my-2">$1</p>')
      // 处理表格 (简单处理)
      .replace(/\|(.+)\|/g, '<div class="overflow-x-auto">$&</div>');
    
    return { __html: html };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">报告不存在或已被删除</h2>
        <button 
          className="mt-4 btn btn-primary"
          onClick={() => navigate('/reports')}
        >
          返回报告列表
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate('/reports')}
          className="flex items-center text-gray-600 hover:text-primary-600"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          返回报告列表
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">{report.date}</span>
              <span className="text-sm text-gray-500">作者: {report.author}</span>
              {report.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleCopyText}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
              title="复制内容"
            >
              <DocumentDuplicateIcon className="h-5 w-5" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
              title="分享报告"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
              title="下载报告"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={renderMarkdown(report.content)}
          />
        </div>
      </div>
    </div>
  )
}

export default ReportDetail 