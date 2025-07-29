
import type { AnalysisData, SubjectMarksAnalysis, SubjectTimeAnalysis, ExamAnalysis, AnalysisHistory } from '@/types/analysis'

const mockMarksAnalysis: SubjectMarksAnalysis[] = [
  {
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    correct: 18,
    wrong: 7,
    notAnswered: 3,
    total: 28,
    percentage: 64.3
  },
  {
    subjectId: 'physics',
    subjectName: 'Physics',
    correct: 22,
    wrong: 5,
    notAnswered: 2,
    total: 29,
    percentage: 75.9
  },
  {
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    correct: 15,
    wrong: 8,
    notAnswered: 4,
    total: 27,
    percentage: 55.6
  },
  {
    subjectId: 'biology',
    subjectName: 'Biology',
    correct: 20,
    wrong: 6,
    notAnswered: 1,
    total: 27,
    percentage: 74.1
  }
]

const mockTimeAnalysis: SubjectTimeAnalysis[] = [
  {
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    spentOnCorrect: 1245, // 20.75 minutes
    spentOnWrong: 687, // 11.45 minutes
    totalTime: 2400, // 40 minutes allocated
    spentTime: 2156 // 35.93 minutes actual
  },
  {
    subjectId: 'physics',
    subjectName: 'Physics',
    spentOnCorrect: 1567, // 26.12 minutes
    spentOnWrong: 423, // 7.05 minutes
    totalTime: 2700, // 45 minutes allocated
    spentTime: 2234 // 37.23 minutes actual
  },
  {
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    spentOnCorrect: 987, // 16.45 minutes
    spentOnWrong: 756, // 12.6 minutes
    totalTime: 2100, // 35 minutes allocated
    spentTime: 1998 // 33.3 minutes actual
  },
  {
    subjectId: 'biology',
    subjectName: 'Biology',
    spentOnCorrect: 1334, // 22.23 minutes
    spentOnWrong: 445, // 7.42 minutes
    totalTime: 2400, // 40 minutes allocated
    spentTime: 2067 // 34.45 minutes actual
  }
]

const mockExamAnalysis: ExamAnalysis[] = [
  {
    examId: 'exam-1-1',
    examTitle: 'Basic Derivatives Quiz',
    subjectName: 'Mathematics',
    score: 7,
    totalMarks: 10,
    percentage: 70,
    timeTaken: 25,
    correct: 7,
    wrong: 2,
    notAnswered: 1,
    completionDate: '2024-01-15T10:30:00Z'
  },
  {
    examId: 'exam-2-1',
    examTitle: 'Motion and Force',
    subjectName: 'Physics',
    score: 18,
    totalMarks: 20,
    percentage: 90,
    timeTaken: 35,
    correct: 18,
    wrong: 2,
    notAnswered: 0,
    completionDate: '2024-01-16T14:20:00Z'
  },
  {
    examId: 'exam-3-1',
    examTitle: 'Organic Chemistry Basics',
    subjectName: 'Chemistry',
    score: 12,
    totalMarks: 18,
    percentage: 66.7,
    timeTaken: 40,
    correct: 12,
    wrong: 5,
    notAnswered: 1,
    completionDate: '2024-01-17T11:15:00Z'
  }
]

const mockAnalysisHistory: AnalysisHistory[] = [
  {
    date: '2024-01-15',
    totalExams: 3,
    averageScore: 75.6,
    timeSpent: 180, // 3 hours
    subjectsStudied: ['Mathematics', 'Physics']
  },
  {
    date: '2024-01-16',
    totalExams: 2,
    averageScore: 82.3,
    timeSpent: 120, // 2 hours
    subjectsStudied: ['Chemistry', 'Biology']
  },
  {
    date: '2024-01-17',
    totalExams: 4,
    averageScore: 68.9,
    timeSpent: 240, // 4 hours
    subjectsStudied: ['Mathematics', 'Physics', 'Chemistry']
  }
]

export const mockAnalysisData: AnalysisData = {
  marksAnalysis: mockMarksAnalysis,
  timeAnalysis: mockTimeAnalysis,
  examAnalysis: mockExamAnalysis,
  history: mockAnalysisHistory
}
