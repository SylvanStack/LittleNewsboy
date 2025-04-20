import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BellAlertIcon, CheckIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  date: string;
  link?: {
    url: string;
    text: string;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '新源码更新',
      message: 'LLaMA 3 模型已发布新版本，新增多语言支持和长文本能力',
      type: 'info',
      isRead: false,
      date: '2023-03-15 10:23',
      link: {
        url: '/sources/github/llama',
        text: '查看详情'
      }
    },
    {
      id: '2',
      title: '追踪项目异常',
      message: 'Hugging Face Transformers 库出现安全漏洞警告',
      type: 'warning',
      isRead: false,
      date: '2023-03-14 15:47',
      link: {
        url: '/sources/github/transformers',
        text: '查看项目'
      }
    },
    {
      id: '3',
      title: '报告生成完成',
      message: '您请求的"每周AI研究热点"报告已生成完成',
      type: 'success',
      isRead: true,
      date: '2023-03-13 09:12',
      link: {
        url: '/reports/2',
        text: '查看报告'
      }
    },
    {
      id: '4',
      title: '连接失败',
      message: '无法连接到API端点，请检查网络连接或服务状态',
      type: 'error',
      isRead: true,
      date: '2023-03-12 17:35'
    },
    {
      id: '5',
      title: '新论文发布',
      message: 'DeepMind发布新论文：大型语言模型中的幻觉现象研究',
      type: 'info',
      isRead: true,
      date: '2023-03-11 11:20',
      link: {
        url: '/sources/papers/deepmind-hallucination',
        text: '查看论文'
      }
    }
  ]);

  // 标记通知为已读
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // 删除通知
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // 标记所有为已读
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // 清除所有已读通知
  const clearReadNotifications = () => {
    setNotifications(prev => prev.filter(notif => !notif.isRead));
  };

  // 根据通知类型返回不同的样式
  const getNotificationStyle = (type: string) => {
    switch(type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // 显示通知图标
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'info':
        return <div className="p-2 bg-blue-100 rounded-full text-blue-600"><BellAlertIcon className="h-5 w-5" /></div>;
      case 'warning':
        return <div className="p-2 bg-yellow-100 rounded-full text-yellow-600"><BellAlertIcon className="h-5 w-5" /></div>;
      case 'success':
        return <div className="p-2 bg-green-100 rounded-full text-green-600"><BellAlertIcon className="h-5 w-5" /></div>;
      case 'error':
        return <div className="p-2 bg-red-100 rounded-full text-red-600"><BellAlertIcon className="h-5 w-5" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full text-gray-600"><BellAlertIcon className="h-5 w-5" /></div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-800">通知中心</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
              {unreadCount} 未读
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="btn btn-secondary flex items-center text-sm"
            disabled={unreadCount === 0}
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            标记所有已读
          </button>
          <button 
            onClick={clearReadNotifications}
            className="btn btn-secondary flex items-center text-sm"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            清除已读
          </button>
          <button className="btn btn-secondary p-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <BellAlertIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-600">没有通知</h3>
            <p className="text-gray-500 mt-1">您的通知将显示在这里</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`py-4 flex ${getNotificationStyle(notification.type)} ${!notification.isRead ? 'border-l-4 pl-3' : 'pl-4'} rounded-md mb-2`}
              >
                <div className="mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`text-base font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <p className={`mt-1 ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  {notification.link && (
                    <div className="mt-2">
                      <Link 
                        to={notification.link.url} 
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        {notification.link.text}
                      </Link>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col space-y-2">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
                      title="标记为已读"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                    title="删除通知"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications 