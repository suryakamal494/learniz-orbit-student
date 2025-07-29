
import { NotificationCard } from './NotificationCard'
import { Notification } from '@/types/notifications'
import { Bell } from 'lucide-react'

interface NotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
}

export function NotificationsList({ notifications, onMarkAsRead }: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-display-xs font-semibold text-foreground mb-2">
          No notifications yet
        </h3>
        <p className="text-body-sm text-muted-foreground text-center max-w-md">
          You're all caught up! New notifications will appear here when you receive them.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          className={`stagger-${Math.min(index + 1, 6)}`}
        />
      ))}
    </div>
  )
}
