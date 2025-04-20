import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

const SourceManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">信息源管理</h1>
        <button className="btn btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-1" />
          添加信息源
        </button>
      </div>
      
      <div className="card">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">信息源管理页面将在后续开发中实现</p>
        </div>
      </div>
    </div>
  )
}

export default SourceManagement 