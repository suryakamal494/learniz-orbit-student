
import { Notification, NotificationGroup } from '@/types/notifications'

export const mockTeacherNotifications: Notification[] = [
  {
    id: 'tn1',
    title: 'New Student Enrollment',
    description: 'Sarah Chen has enrolled in your Advanced Mathematics course',
    sender: 'Registration System',
    senderType: 'System',
    timestamp: new Date('2024-01-15T09:30:00'),
    isRead: false,
    priority: 'medium',
    category: 'system'
  },
  {
    id: 'tn2', 
    title: 'Assignment Submission',
    description: 'Michael Johnson submitted Assignment 3 for review',
    sender: 'Learning Management System',
    senderType: 'System',
    timestamp: new Date('2024-01-15T08:45:00'),
    isRead: false,
    priority: 'low',
    category: 'assignment'
  },
  {
    id: 'tn3',
    title: 'Faculty Meeting Tomorrow',
    description: 'Monthly faculty meeting scheduled for 2 PM in Conference Room A',
    sender: 'Dr. Sarah Wilson',
    senderType: 'Admin',
    timestamp: new Date('2024-01-14T16:20:00'),
    isRead: true,
    priority: 'high',
    category: 'announcement'
  },
  {
    id: 'tn4',
    title: 'Grade Submission Deadline',
    description: 'Reminder: Final grades must be submitted by Friday, January 19th',
    sender: 'Academic Office',
    senderType: 'Admin',
    timestamp: new Date('2024-01-14T10:15:00'),
    isRead: false,
    priority: 'high',
    category: 'deadline'
  },
  {
    id: 'tn5',
    title: 'Student Question',
    description: 'Emma Davis asked a question in the Physics 201 discussion forum',
    sender: 'Discussion Forum',
    senderType: 'System',
    timestamp: new Date('2024-01-13T14:30:00'),
    isRead: true,
    priority: 'medium',
    category: 'system'
  },
  {
    id: 'tn6',
    title: 'Class Schedule Update',
    description: 'Physics 301 lecture moved to Room B204 starting next week',
    sender: 'Scheduling Office',
    senderType: 'Admin',
    timestamp: new Date('2024-01-12T11:45:00'),
    isRead: true,
    priority: 'medium',
    category: 'announcement'
  }
]

export const mockTeacherNotificationGroups: NotificationGroup[] = [
  {
    date: 'Today',
    notifications: mockTeacherNotifications.slice(0, 2)
  },
  {
    date: 'Yesterday', 
    notifications: mockTeacherNotifications.slice(2, 4)
  },
  {
    date: 'Earlier',
    notifications: mockTeacherNotifications.slice(4)
  }
]
