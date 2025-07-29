
import { Notification } from '@/types/notifications'

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment: Linear Algebra Problem Set',
    description: 'A new assignment has been posted for Linear Algebra. The problem set covers eigenvalues and eigenvectors. Please complete all 15 problems and submit by the due date. Partial credit will be given for showing work.',
    sender: 'Dr. Sarah Johnson',
    senderType: 'Faculty',
    timestamp: new Date('2024-01-29T09:30:00'),
    isRead: false,
    priority: 'high',
    category: 'assignment'
  },
  {
    id: '2',
    title: 'Grade Released: Physics Quiz #3',
    description: 'Your grade for Physics Quiz #3 has been released. You scored 92/100. Great work on the thermodynamics section! Review the feedback for areas of improvement.',
    sender: 'Prof. Michael Chen',
    senderType: 'Faculty',
    timestamp: new Date('2024-01-29T08:15:00'),
    isRead: false,
    priority: 'medium',
    category: 'grade'
  },
  {
    id: '3',
    title: 'Upcoming Deadline: Research Paper',
    description: 'Reminder that your research paper for Advanced Chemistry is due in 3 days (February 1st). Make sure to follow the APA format guidelines and include at least 8 peer-reviewed sources.',
    sender: 'Dr. Emily Rodriguez',
    senderType: 'Faculty',
    timestamp: new Date('2024-01-28T16:45:00'),
    isRead: true,
    priority: 'high',
    category: 'deadline'
  },
  {
    id: '4',
    title: 'System Maintenance Notice',
    description: 'The learning management system will undergo scheduled maintenance on February 2nd from 2:00 AM to 6:00 AM EST. During this time, the system will be unavailable. Please plan accordingly.',
    sender: 'System Administrator',
    senderType: 'System',
    timestamp: new Date('2024-01-28T14:20:00'),
    isRead: true,
    priority: 'medium',
    category: 'system'
  },
  {
    id: '5',
    title: 'Course Announcement: Guest Lecture',
    description: 'We are excited to announce a guest lecture by Dr. Jane Smith, a renowned expert in quantum computing. The lecture will be held on February 5th at 2:00 PM in Lecture Hall A.',
    sender: 'Prof. David Wilson',
    senderType: 'Faculty',
    timestamp: new Date('2024-01-27T11:30:00'),
    isRead: true,
    priority: 'low',
    category: 'announcement'
  },
  {
    id: '6',
    title: 'Library Hours Extended',
    description: 'Good news! The library will now be open 24/7 during finals week (February 12-16). Additional study spaces and computer workstations will be available.',
    sender: 'Library Administration',
    senderType: 'Admin',
    timestamp: new Date('2024-01-26T13:15:00'),
    isRead: true,
    priority: 'low',
    category: 'announcement'
  }
]
