
export interface LiveQuiz {
  id: string
  title: string
  subject: string
  subjectId: string
  teacherName: string
  duration: number // in minutes
  totalQuestions: number
  startedAt: string
  expiresAt: string
  isActive: boolean
  description?: string
}

export interface LiveQuizData {
  quizzes: LiveQuiz[]
  totalActive: number
}
