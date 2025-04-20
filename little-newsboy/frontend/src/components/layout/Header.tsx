import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary-700 mr-10">小报童</h1>
          <nav className="hidden md:flex space-x-6">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                isActive ? "text-primary-700 font-medium" : "text-gray-600 hover:text-primary-600"
              }
            >
              首页
            </NavLink>
            <NavLink 
              to="/sources"
              className={({ isActive }) => 
                isActive ? "text-primary-700 font-medium" : "text-gray-600 hover:text-primary-600"
              }
            >
              信息源
            </NavLink>
            <NavLink 
              to="/knowledge"
              className={({ isActive }) => 
                isActive ? "text-primary-700 font-medium" : "text-gray-600 hover:text-primary-600"
              }
            >
              知识库
            </NavLink>
            <NavLink 
              to="/reports"
              className={({ isActive }) => 
                isActive ? "text-primary-700 font-medium" : "text-gray-600 hover:text-primary-600"
              }
            >
              分析报告
            </NavLink>
            <NavLink 
              to="/notifications"
              className={({ isActive }) => 
                isActive ? "text-primary-700 font-medium" : "text-gray-600 hover:text-primary-600"
              }
            >
              通知中心
            </NavLink>
          </nav>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center text-gray-700 hover:text-primary-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <UserIcon className="h-6 w-6 mr-1" />
            <span className="hidden md:inline mr-1">{user?.username || '用户'}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <NavLink 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                个人资料
              </NavLink>
              <NavLink 
                to="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                设置
              </NavLink>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 