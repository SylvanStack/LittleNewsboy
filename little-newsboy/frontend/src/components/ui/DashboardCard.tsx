import { ReactNode } from 'react'

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  loading?: boolean;
}

const DashboardCard = ({ 
  title, 
  icon, 
  children, 
  footer, 
  className = '',
  loading = false 
}: DashboardCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden ${className}`}>
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="mr-2 text-primary-600">{icon}</div>}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
      
      <div className="p-5">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          children
        )}
      </div>

      {footer && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}

export default DashboardCard 