
import { Faculty, Message, MessageThread, Conversation } from '@/types/messages'

export const mockTeacherFaculty: Faculty[] = [
  {
    id: 'student-1',
    name: 'Alice Johnson',
    department: 'Computer Science',
    email: 'alice.johnson@school.edu',
    avatar: ''
  },
  {
    id: 'student-2', 
    name: 'Bob Smith',
    department: 'Mathematics',
    email: 'bob.smith@school.edu',
    avatar: ''
  },
  {
    id: 'admin-1',
    name: 'Dr. Sarah Wilson',
    department: 'Administration',
    email: 'sarah.wilson@school.edu',
    avatar: ''
  },
  {
    id: 'student-3',
    name: 'Emma Davis',
    department: 'Physics',
    email: 'emma.davis@school.edu',
    avatar: ''
  },
  {
    id: 'admin-2',
    name: 'Principal Martinez',
    department: 'Administration', 
    email: 'martinez@school.edu',
    avatar: ''
  }
]

export const mockTeacherMessages: Message[] = [
  {
    id: 'tm1',
    senderId: 'student-1',
    recipientId: 'teacher-1',
    subject: 'Question about Assignment 3',
    body: 'Hello Professor, I have a question about the third assignment. Could you please clarify the requirements for the final section?',
    timestamp: new Date('2024-01-15T10:30:00'),
    isRead: false,
    threadId: 'thread-1'
  },
  {
    id: 'tm2',
    senderId: 'admin-1',
    recipientId: 'teacher-1', 
    subject: 'Faculty Meeting Reminder',
    body: 'Dear colleagues, this is a reminder about the faculty meeting scheduled for tomorrow at 2 PM in the main conference room.',
    timestamp: new Date('2024-01-14T14:20:00'),
    isRead: true,
    threadId: 'thread-2'
  },
  {
    id: 'tm3',
    senderId: 'student-2',
    recipientId: 'teacher-1',
    subject: 'Grade Inquiry',
    body: 'Professor, I wanted to discuss my grade on the recent exam. Could we schedule a meeting to go over it?',
    timestamp: new Date('2024-01-13T16:45:00'),
    isRead: false,
    threadId: 'thread-3'
  },
  {
    id: 'tm4',
    senderId: 'student-3',
    recipientId: 'teacher-1',
    subject: 'Lab Report Submission',
    body: 'Hi Professor, I submitted my lab report but I am not sure if it went through properly. Could you confirm receipt?',
    timestamp: new Date('2024-01-12T11:15:00'),
    isRead: true,
    threadId: 'thread-4'
  },
  {
    id: 'tm5',
    senderId: 'admin-2',
    recipientId: 'teacher-1',
    subject: 'New Academic Policies',
    body: 'Dear Faculty, please review the new academic policies document attached. Implementation begins next semester.',
    timestamp: new Date('2024-01-11T09:00:00'),
    isRead: false,
    threadId: 'thread-5'
  }
]

export const mockTeacherThreads: MessageThread[] = [
  {
    id: 'thread-1',
    participants: ['student-1', 'teacher-1'],
    messages: [mockTeacherMessages[0]],
    lastMessage: mockTeacherMessages[0],
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'thread-2', 
    participants: ['admin-1', 'teacher-1'],
    messages: [mockTeacherMessages[1]],
    lastMessage: mockTeacherMessages[1],
    updatedAt: new Date('2024-01-14T14:20:00')
  },
  {
    id: 'thread-3',
    participants: ['student-2', 'teacher-1'],
    messages: [mockTeacherMessages[2]],
    lastMessage: mockTeacherMessages[2], 
    updatedAt: new Date('2024-01-13T16:45:00')
  },
  {
    id: 'thread-4',
    participants: ['student-3', 'teacher-1'],
    messages: [mockTeacherMessages[3]],
    lastMessage: mockTeacherMessages[3],
    updatedAt: new Date('2024-01-12T11:15:00')
  },
  {
    id: 'thread-5',
    participants: ['admin-2', 'teacher-1'],
    messages: [mockTeacherMessages[4]],
    lastMessage: mockTeacherMessages[4],
    updatedAt: new Date('2024-01-11T09:00:00')
  }
]
