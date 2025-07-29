
export interface SubjectMarksAnalysis {
  subjectId: string
  subjectName: string
  correct: number
  wrong: number
  notAnswered: number
  total: number
  percentage: number
}

export interface SubjectTimeAnalysis {
  subjectId: string
  subjectName: string
  spentOnCorrect: number // in seconds
  spentOnWrong: number // in seconds
  totalTime: number // total test time in seconds
  spentTime: number // actual time spent in session
}

export interface ExamAnalysis {
  examId: string
  examTitle: string
  subjectName: string
  score: number
  totalMarks: number
  percentage: number
  timeTaken: number
  correct: number
  wrong: number
  notAnswered: number
  completionDate: string
}

export interface AnalysisHistory {
  date: string
  totalExams: number
  averageScore: number
  timeSpent: number
  subjectsStudied: string[]
}

export interface AnalysisData {
  marksAnalysis: SubjectMarksAnalysis[]
  timeAnalysis: SubjectTimeAnalysis[]
  examAnalysis: ExamAnalysis[]
  history: AnalysisHistory[]
}
