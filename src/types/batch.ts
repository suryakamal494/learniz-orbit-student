
export interface Batch {
  id: string
  name: string
  class: string
  course: string
  capacity: number
  currentStudents: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  status: 'active' | 'inactive' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface BatchFormData {
  name: string
  class: string
  course: string
  capacity: number
  startDate: Date | undefined
  endDate: Date | undefined
  startTime: string
  endTime: string
}

export interface LMSAssignmentItem {
  id: string
  title: string
  type: 'video' | 'pdf' | 'quiz' | 'reading' | 'video-playlist'
  subject: string
  duration?: string
  description?: string
  thumbnailUrl?: string
  isAssigned?: boolean
}

export interface NotesAssignmentItem {
  id: string
  institute: string
  title: string
  notesFor: {
    type: string
    subject: string
    chapter: string
    topic: string
  }
  fileSize?: string
  uploadDate: string
  isAssigned?: boolean
}

export interface BatchStudent {
  id: string
  name: string
  email: string
  rollNumber: string
  joinDate: string
  lastActive: string
  performance: number
  status: 'active' | 'inactive'
}
