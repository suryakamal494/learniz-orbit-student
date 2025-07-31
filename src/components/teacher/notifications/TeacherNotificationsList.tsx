
import { TeacherNotificationCard } from "./TeacherNotificationCard"
import { Notification, NotificationGroup } from "@/types/notifications"
import { TeacherDataWrapper } from "../ui/TeacherDataWrapper"
import { TeacherListSkeleton } from "../ui/TeacherLoadingSkeleton"

interface TeacherNotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  loading?: boolean
  error?: string | null
}

export function TeacherNotificationsList({ 
  notifications, 
  onMarkAsRead,
  loading = false,
  error = null
}: TeacherNotificationsListProps) {
  
  const groupNotifications = (notifications: Notification[]): NotificationGroup[] => {
    return notifications.reduce((groups: NotificationGroup[], notification) => {
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
  }

  return (
    <TeacherDataWrapper
      data={notifications}
      loading={loading}
      error={error}
      emptyTitle="No notifications"
      emptyDescription="You're all caught up! New notifications will appear here."
      emptyIcon={<div className="text-3xl">🔔</div>}
      loadingComponent={<TeacherListSkeleton count={8} />}
      className="space-y-6"
    >
      {(notificationData) => {
        const groupedNotifications = groupNotifications(notificationData)
        
        return (
          <div className="space-y-6">
            {groupedNotifications.map((group) => (
              <div key={group.date} className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
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
      }}
    </TeacherDataWrapper>
  )
}
