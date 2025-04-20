import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState {
  activeTab?: string;
}

const Settings = () => {
  const { user } = useAuth()
  const location = useLocation()
  const locationState = location.state as LocationState
  const [activeTab, setActiveTab] = useState(locationState?.activeTab || 'account')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  useEffect(() => {
    // 如果有通过导航传入的activeTab，则设置当前标签
    if (locationState?.activeTab) {
      setActiveTab(locationState.activeTab)
    }
  }, [locationState])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>加载中...</p>
      </div>
    )
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除之前的消息
    setPasswordError('')
    setPasswordSuccess('')
  }

  const handlePasswordUpdate = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData
    
    // 简单的验证
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('所有密码字段都必须填写')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('新密码与确认密码不匹配')
      return
    }
    
    if (newPassword.length < 8) {
      setPasswordError('新密码长度不能少于8个字符')
      return
    }
    
    // 这里将来可以添加API调用，更改密码
    // 暂时仅做前端展示
    setPasswordSuccess('密码修改功能尚在开发中，您的请求已记录')
    
    // 清空表单
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">设置</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'account' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('account')}
            >
              账户设置
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notification' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notification')}
            >
              通知设置
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'security' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              安全设置
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">账户设置</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      用户名
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      defaultValue={user.username}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      电子邮箱
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      defaultValue={user.email}
                    />
                  </div>
                  <div className="pt-3">
                    <button 
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                      onClick={() => alert('账户信息修改功能尚在开发中，您的更改已记录')}
                    >
                      保存更改
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notification' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">通知设置</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                      接收电子邮件通知
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="newsletter"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                      接收资讯订阅
                    </label>
                  </div>
                  <div className="pt-3">
                    <button 
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                      onClick={() => alert('通知设置修改功能尚在开发中，您的更改已记录')}
                    >
                      保存更改
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">安全设置</h2>
                {passwordSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 text-green-700">
                    {passwordSuccess}
                  </div>
                )}
                {passwordError && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700">
                    {passwordError}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      当前密码
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      新密码
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">密码长度至少8个字符，包含大小写字母、数字和特殊符号</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      确认新密码
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="pt-3">
                    <button 
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                      onClick={handlePasswordUpdate}
                    >
                      更新密码
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 