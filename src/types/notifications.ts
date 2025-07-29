
export interface Notification {
  id: string
  title: string
  description: string
  sender: string
  senderType: 'Faculty' | 'Admin' | 'System'
  timestamp: Date
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  category: 'assignment' | 'announcement' | 'grade' | 'system' | 'deadline'
}

export interface NotificationGroup {
  date: string
  notifications: Notification[]
}
