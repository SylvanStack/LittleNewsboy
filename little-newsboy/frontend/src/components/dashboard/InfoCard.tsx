import React from 'react'

interface InfoCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  className?: string
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, change, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className="p-2 bg-primary-50 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <div className="mt-2">
          <span
            className={`text-sm font-medium ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-500 ml-1">
            与上周相比
          </span>
        </div>
      )}
    </div>
  )
}

export default InfoCard 