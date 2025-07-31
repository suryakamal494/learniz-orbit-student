
export interface ExamData {
  id: string
  title: string
  category: 'Subject Exam' | 'Quiz' | 'LMS Exam'
  duration: number // in minutes
  marksPerQuestion: number
  totalMarks: number
  passPercentage: number
  negativeMark: number
  instructionId?: string
  startDate: string
  endDate: string
  startTime: string
  examType: 'No Section, No Timer' | 'Section with No Timer' | 'Section with Timer'
  createdAt: string
  updatedAt: string
  questionCount: number
  batchCount: number
}

export interface ExamFormData {
  title: string
  category: 'Subject Exam' | 'Quiz' | 'LMS Exam'
  duration: number
  marksPerQuestion: number
  totalMarks: number
  passPercentage: number
  negativeMark: number
  instructionId?: string
  startDate: string
  endDate: string
  startTime: string
  examType: 'No Section, No Timer' | 'Section with No Timer' | 'Section with Timer'
}
