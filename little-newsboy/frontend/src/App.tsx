import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'))
const SourceManagement = lazy(() => import('./pages/SourceManagement'))
const KnowledgeSummary = lazy(() => import('./pages/KnowledgeSummary'))
const AISettings = lazy(() => import('./pages/AISettings'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sources" element={<SourceManagement />} />
            <Route path="knowledge" element={<KnowledgeSummary />} />
            <Route path="ai-settings" element={<AISettings />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
