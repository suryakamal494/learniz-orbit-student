
export interface BatchExamReport {
  id: string
  date: string
  batchName: string
  batchId: string
  examTitle: string
  examId: string
  averagePerformance: number
  passPercentage: number
  totalStudents: number
  totalQuestions: number
}

export interface StudentExamResult {
  studentId: string
  studentName: string
  answers: QuestionAnswer[]
  totalScore: number
  percentage: number
  passed: boolean
}

export interface QuestionAnswer {
  questionId: string
  questionNumber: number
  status: 'correct' | 'wrong' | 'skipped'
  selectedAnswer?: string
  correctAnswer: string
  timeSpent: number
}

export interface QuestionAnalysis {
  questionId: string
  questionNumber: number
  questionText: string
  correctCount: number
  wrongCount: number
  skippedCount: number
  totalStudents: number
  correctPercentage: number
}

export interface BatchReportFilters {
  batchId?: string
  dateRange?: {
    from?: Date
    to?: Date
  }
}

export interface DetailedExamReport {
  examReport: BatchExamReport
  studentResults: StudentExamResult[]
  questionAnalysis: QuestionAnalysis[]
}
