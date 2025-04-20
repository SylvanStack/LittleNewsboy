import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">关于我们</Link>
          <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">使用条款</Link>
          <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">隐私政策</Link>
          <Link to="/help" className="text-sm text-gray-600 hover:text-primary-600">帮助中心</Link>
        </div>
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} 小报童
        </div>
      </div>
    </footer>
  )
}

export default Footer 