
export interface ExamQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  marks: number
}

export interface ExamResult {
  id: string
  examId: string
  score: number
  totalMarks: number
  percentage: number
  timeTaken: number // in minutes
  submissionDate: string
  answers: Record<string, number> // questionId -> selectedOption
  passed: boolean
}

export interface Exam {
  id: string
  title: string
  description: string
  duration: number // in minutes
  totalMarks: number
  totalQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'not-started' | 'in-progress' | 'completed'
  chapterId: string
  questions?: ExamQuestion[]
  result?: ExamResult
  allowRetake: boolean
  passingScore: number
}

export interface ExamChapter {
  id: string
  title: string
  description: string
  exams: Exam[]
  totalExams: number
  completedExams: number
  progress: number
}

export interface ExamSection {
  subjectId: string
  chapters: ExamChapter[]
  overallProgress: number
  totalExams: number
  completedExams: number
}
