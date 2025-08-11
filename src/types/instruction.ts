
export interface Instruction {
  id: string
  title: string
  content: string
  subject: string
  type: 'general' | 'subject-specific'
  createdAt: string
  updatedAt: string
}

export interface InstructionFormData {
  title: string
  content: string
  subject: string
  type: 'general' | 'subject-specific'
}
