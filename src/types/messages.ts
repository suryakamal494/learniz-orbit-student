
export interface Faculty {
  id: string
  name: string
  department: string
  avatar?: string
  email: string
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  subject: string
  body: string
  timestamp: Date
  isRead: boolean
  threadId: string
}

export interface MessageThread {
  id: string
  participants: string[]
  messages: Message[]
  lastMessage: Message
  updatedAt: Date
}

export interface Conversation {
  id: string
  participants: Faculty[]
  messages: Message[]
  subject: string
  lastActivity: Date
}
