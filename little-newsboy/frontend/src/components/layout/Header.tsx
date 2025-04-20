import { NavLink } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/outline'

const Header = () => {
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

        <div className="flex items-center">
          <button className="flex items-center text-gray-700 hover:text-primary-600">
            <UserIcon className="h-6 w-6 mr-1" />
            <span className="hidden md:inline">用户</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 