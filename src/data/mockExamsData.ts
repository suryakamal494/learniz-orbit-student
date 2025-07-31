
import { ExamData } from '@/types/exam'

export const mockExamsData: ExamData[] = [
  {
    id: '1',
    title: 'Mathematics Mid-Term Exam',
    duration: 120,
    totalMarks: 100,
    examType: 'Final Exam',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    questionCount: 50,
    batchCount: 3
  },
  {
    id: '2',
    title: 'Physics Practice Test 1',
    duration: 90,
    totalMarks: 80,
    examType: 'Practice Test',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    questionCount: 40,
    batchCount: 2
  },
  {
    id: '3',
    title: 'Chemistry Mock Exam',
    duration: 180,
    totalMarks: 150,
    examType: 'Mock Test',
    createdAt: '2024-01-25T11:45:00Z',
    updatedAt: '2024-01-25T11:45:00Z',
    questionCount: 75,
    batchCount: 4
  },
  {
    id: '4',
    title: 'Biology Quick Quiz',
    duration: 30,
    totalMarks: 25,
    examType: 'Quiz',
    createdAt: '2024-02-01T16:20:00Z',
    updatedAt: '2024-02-03T10:30:00Z',
    questionCount: 15,
    batchCount: 1
  },
  {
    id: '5',
    title: 'English Literature Assessment',
    duration: 150,
    totalMarks: 120,
    examType: 'Assessment',
    createdAt: '2024-02-05T13:00:00Z',
    updatedAt: '2024-02-05T13:00:00Z',
    questionCount: 60,
    batchCount: 2
  }
]

// Mock CRUD operations
export const createExam = (data: Omit<ExamData, 'id' | 'createdAt' | 'updatedAt' | 'questionCount' | 'batchCount'>): ExamData => {
  const now = new Date().toISOString()
  return {
    id: Date.now().toString(),
    ...data,
    createdAt: now,
    updatedAt: now,
    questionCount: 0,
    batchCount: 0
  }
}

export const updateExam = (id: string, data: Partial<ExamData>): ExamData | null => {
  const exam = mockExamsData.find(e => e.id === id)
  if (!exam) return null
  
  return {
    ...exam,
    ...data,
    updatedAt: new Date().toISOString()
  }
}

export const deleteExam = (id: string): boolean => {
  const index = mockExamsData.findIndex(e => e.id === id)
  if (index === -1) return false
  
  mockExamsData.splice(index, 1)
  return true
}
