
export interface Instruction {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface InstructionFormData {
  title: string
  content: string
}
