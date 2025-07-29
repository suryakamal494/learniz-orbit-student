
import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { NotificationsHeader } from '@/components/notifications/NotificationsHeader'
import { NotificationsList } from '@/components/notifications/NotificationsList'
import { mockNotifications } from '@/data/mockNotifications'
import { Notification } from '@/types/notifications'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      <DashboardHeader />
      
      <div className="max-w-4xl">
        <NotificationsHeader 
          filter={filter}
          onFilterChange={setFilter}
          onMarkAllRead={markAllAsRead}
          unreadCount={notifications.filter(n => !n.isRead).length}
        />
        
        <NotificationsList 
          notifications={filteredNotifications}
          onMarkAsRead={markAsRead}
        />
      </div>
    </div>
  )
}

export default NotificationsPage
