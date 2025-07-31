
import { TeacherNotificationCard } from "./TeacherNotificationCard"
import { Notification, NotificationGroup } from "@/types/notifications"
import { formatDistanceToNow } from "date-fns"

interface TeacherNotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
}

export function TeacherNotificationsList({ notifications, onMarkAsRead }: TeacherNotificationsListProps) {
  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups: NotificationGroup[], notification) => {
    const now = new Date()
    const notificationDate = notification.timestamp
    
    let groupLabel = ''
    const diffInDays = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) {
      groupLabel = 'Today'
    } else if (diffInDays === 1) {
      groupLabel = 'Yesterday'
    } else if (diffInDays < 7) {
      groupLabel = 'This week'
    } else {
      groupLabel = 'Earlier'
    }
    
    const existingGroup = groups.find(group => group.date === groupLabel)
    if (existingGroup) {
      existingGroup.notifications.push(notification)
    } else {
      groups.push({
        date: groupLabel,
        notifications: [notification]
      })
    }
    
    return groups
  }, [])

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mb-4">
          <div className="text-3xl">🔔</div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
        <p className="text-gray-600">
          You're all caught up! New notifications will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {groupedNotifications.map((group) => (
        <div key={group.date} className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">
            {group.date}
          </h3>
          <div className="space-y-3">
            {group.notifications.map((notification) => (
              <TeacherNotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
