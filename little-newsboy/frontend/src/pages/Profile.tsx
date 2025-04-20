import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>加载中...</p>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    // 这里将来可以添加API调用，保存用户资料
    // 暂时仅做前端展示
    alert('资料修改功能尚在开发中，您的更改已记录')
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setFormData({
      username: user.username,
      email: user.email
    })
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    navigate('/settings', { state: { activeTab: 'security' } })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 h-32 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">个人资料</h1>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center -mt-12 border-4 border-white shadow">
              <span className="text-2xl font-bold text-primary-700">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{isEditing ? formData.username : user.username}</h2>
              <p className="text-gray-600">{isEditing ? formData.email : user.email}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">账户信息</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    电子邮箱
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-500">用户名</span>
                  <span className="text-gray-800">{user.username}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">电子邮箱</span>
                  <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">账户状态</span>
                  <span className="text-green-600">
                    {user.is_active ? '正常' : '已禁用'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">注册时间</span>
                  <span className="text-gray-800">
                    {new Date(user.created_at).toLocaleString('zh-CN')}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            {isEditing ? (
              <>
                <button 
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 mr-3"
                  onClick={handleSaveProfile}
                >
                  保存修改
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  onClick={handleCancelEdit}
                >
                  取消
                </button>
              </>
            ) : (
              <>
                <button 
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 mr-3"
                  onClick={handleEditProfile}
                >
                  修改资料
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  onClick={handleChangePassword}
                >
                  修改密码
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 