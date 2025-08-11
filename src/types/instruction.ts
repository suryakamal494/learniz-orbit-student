
export interface Instruction {
  id: string
  title: string
  content: string
  subject: string
  institute: string
  type: 'general' | 'subject-specific'
  status: 'active' | 'draft' | 'archived'
  description?: string
  createdAt: string
  updatedAt: string
}

export interface InstructionFilters {
  subject?: string
  institute?: string
  status?: string
  type?: 'general' | 'subject-specific'
}

export interface InstructionFormData {
  title: string
  content: string
  subject: string
  institute: string
  type: 'general' | 'subject-specific'
  status: 'active' | 'draft' | 'archived'
  description?: string
}
