
import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 md:px-6 py-6 max-w-4xl">
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
        </main>
      </div>
    </SidebarProvider>
  )
}

export default NotificationsPage
