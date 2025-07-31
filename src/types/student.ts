
export interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  class: string
  phone?: string
  joinDate: string
  status: 'active' | 'inactive'
}

export interface BatchStudentAssignment {
  studentId: string
  batchId: string
  assignedDate: string
  isActive: boolean
}
