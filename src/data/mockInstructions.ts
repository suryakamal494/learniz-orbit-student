
import { Instruction } from '@/types/instruction'

export const mockInstructions: Instruction[] = [
  {
    id: '1',
    title: 'General Exam Guidelines',
    content: 'All students must arrive at least 15 minutes before the exam starts. Mobile phones and electronic devices are strictly prohibited during the examination.',
    description: 'Standard guidelines that apply to all examinations across all subjects.',
    subject: 'General',
    institute: 'DPS',
    type: 'general',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Mathematics Exam Instructions',
    content: 'Use only blue or black ink. Calculators are allowed for sections 2 and 3. Show all working steps clearly for partial credit.',
    description: 'Specific instructions for mathematics examinations including calculator usage.',
    subject: 'Math',
    institute: 'RVS',
    type: 'subject-specific',
    status: 'active',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  },
  {
    id: '3',
    title: 'Physics Laboratory Safety',
    content: 'Wear safety goggles at all times. Handle all equipment with care. Report any accidents immediately to the instructor.',
    description: 'Safety protocols for physics laboratory examinations and practical work.',
    subject: 'Physics',
    institute: 'DAV',
    type: 'subject-specific',
    status: 'active',
    createdAt: '2024-01-25T11:45:00Z',
    updatedAt: '2024-01-25T11:45:00Z'
  },
  {
    id: '4',
    title: 'Online Exam Protocol',
    content: 'Ensure stable internet connection. Keep your camera on throughout the exam. Use Chrome or Firefox browsers for best compatibility.',
    description: 'Guidelines for online examinations including technical requirements.',
    subject: 'General',
    institute: 'DPS',
    type: 'general',
    status: 'draft',
    createdAt: '2024-02-01T16:20:00Z',
    updatedAt: '2024-02-03T10:30:00Z'
  },
  {
    id: '5',
    title: 'Chemistry Lab Instructions',
    content: 'Wear protective equipment at all times. Dispose of chemicals properly. Follow all safety procedures outlined in the manual.',
    description: 'Safety and procedural guidelines for chemistry laboratory work.',
    subject: 'Chemistry',
    institute: 'RVS',
    type: 'subject-specific',
    status: 'archived',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z'
  }
]

// Mock CRUD operations
export const createInstruction = (data: Omit<Instruction, 'id' | 'createdAt' | 'updatedAt'>): Instruction => {
  const now = new Date().toISOString()
  return {
    id: Date.now().toString(),
    ...data,
    createdAt: now,
    updatedAt: now
  }
}

export const updateInstruction = (id: string, data: Partial<Instruction>): Instruction | null => {
  const instruction = mockInstructions.find(i => i.id === id)
  if (!instruction) return null
  
  return {
    ...instruction,
    ...data,
    updatedAt: new Date().toISOString()
  }
}

export const deleteInstruction = (id: string): boolean => {
  const index = mockInstructions.findIndex(i => i.id === id)
  if (index === -1) return false
  
  mockInstructions.splice(index, 1)
  return true
}
