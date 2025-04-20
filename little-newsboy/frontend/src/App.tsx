import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Layout from './components/layout/Layout'
import { useAuth } from './contexts/AuthContext'

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'))
const SourceManagement = lazy(() => import('./pages/SourceManagement'))
const KnowledgeSummary = lazy(() => import('./pages/KnowledgeSummary'))
const SummaryDetail = lazy(() => import('./pages/KnowledgeSummary/SummaryDetail'))
const AISettings = lazy(() => import('./pages/AISettings'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // 如果正在加载认证状态，显示加载指示器
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  // 如果未认证，重定向到登录页面，并记住当前URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 如果已认证，渲染子组件
  return <>{children}</>
}

function App() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="sources" element={<SourceManagement />} />
          <Route path="knowledge" element={<KnowledgeSummary />} />
          <Route path="knowledge/:id" element={<SummaryDetail />} />
          <Route path="ai-settings" element={<AISettings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
