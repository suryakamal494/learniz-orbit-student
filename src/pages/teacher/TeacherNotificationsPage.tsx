
import { useState } from 'react'
import { TeacherNotificationsHeader } from '@/components/teacher/notifications/TeacherNotificationsHeader'
import { TeacherNotificationsList } from '@/components/teacher/notifications/TeacherNotificationsList'
import { mockTeacherNotifications } from '@/data/mockTeacherNotifications'
import { Notification } from '@/types/notifications'

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockTeacherNotifications)
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
      <div className="max-w-4xl">
        <TeacherNotificationsHeader 
          filter={filter}
          onFilterChange={setFilter}
          onMarkAllRead={markAllAsRead}
          unreadCount={notifications.filter(n => !n.isRead).length}
        />
        
        <TeacherNotificationsList 
          notifications={filteredNotifications}
          onMarkAsRead={markAsRead}
        />
      </div>
    </div>
  )
}
