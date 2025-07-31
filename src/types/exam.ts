
export interface ExamData {
  id: string
  title: string
  duration: number // in minutes
  totalMarks: number
  examType: 'Practice Test' | 'Mock Test' | 'Final Exam' | 'Quiz' | 'Assessment'
  createdAt: string
  updatedAt: string
  questionCount: number
  batchCount: number
}

export interface ExamFormData {
  title: string
  duration: number
  totalMarks: number
  examType: 'Practice Test' | 'Mock Test' | 'Final Exam' | 'Quiz' | 'Assessment'
}
