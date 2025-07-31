
export interface Student {
  id: string
  name: string
  rollNumber: string
  email: string
  class: string
  section?: string
  joinDate: string
  lastActive: string
  performance: number
  status: 'active' | 'inactive'
  profilePicture?: string
}

export interface StudentBatchAssignment {
  studentId: string
  batchId: string
  assignedDate: string
  status: 'active' | 'inactive'
}

export interface StudentFilters {
  search: string
  class: string
}

export interface StudentSelectionState {
  originalAssignments: Set<string>
  currentSelections: Set<string>
  pendingAdditions: Set<string>
  pendingRemovals: Set<string>
}
