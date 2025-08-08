
import { BatchExamReport, StudentExamResult, QuestionAnalysis, DetailedExamReport } from '@/types/batchReport'

export const mockBatchExamReports: BatchExamReport[] = [
  {
    id: 'report-1',
    date: '2024-01-15',
    batchName: 'Physics - Grade 12A',
    batchId: 'batch-1',
    examTitle: 'Mechanics Mid-term',
    examId: 'exam-1',
    averagePerformance: 78.5,
    passPercentage: 85.7,
    totalStudents: 25,
    totalQuestions: 20
  },
  {
    id: 'report-2',
    date: '2024-01-20',
    batchName: 'Chemistry - Grade 12B',
    batchId: 'batch-2',
    examTitle: 'Organic Chemistry Test',
    examId: 'exam-2',
    averagePerformance: 82.3,
    passPercentage: 90.0,
    totalStudents: 30,
    totalQuestions: 25
  },
  {
    id: 'report-3',
    date: '2024-01-25',
    batchName: 'Mathematics - Grade 11A',
    batchId: 'batch-3',
    examTitle: 'Calculus Assessment',
    examId: 'exam-3',
    averagePerformance: 75.8,
    passPercentage: 78.6,
    totalStudents: 28,
    totalQuestions: 15
  },
  {
    id: 'report-4',
    date: '2024-02-01',
    batchName: 'Physics - Grade 12A',
    batchId: 'batch-1',
    examTitle: 'Waves and Optics Quiz',
    examId: 'exam-4',
    averagePerformance: 71.2,
    passPercentage: 72.0,
    totalStudents: 25,
    totalQuestions: 18
  }
]

export const mockStudentResults: Record<string, StudentExamResult[]> = {
  'exam-1': [
    {
      studentId: 'student-1',
      studentName: 'John Doe',
      answers: [
        { questionId: 'q1', questionNumber: 1, status: 'correct', selectedAnswer: 'A', correctAnswer: 'A', timeSpent: 45 },
        { questionId: 'q2', questionNumber: 2, status: 'wrong', selectedAnswer: 'B', correctAnswer: 'C', timeSpent: 60 },
        { questionId: 'q3', questionNumber: 3, status: 'skipped', correctAnswer: 'D', timeSpent: 0 },
        { questionId: 'q4', questionNumber: 4, status: 'correct', selectedAnswer: 'D', correctAnswer: 'D', timeSpent: 50 }
      ],
      totalScore: 14,
      percentage: 70,
      passed: true
    },
    {
      studentId: 'student-2',
      studentName: 'Jane Smith',
      answers: [
        { questionId: 'q1', questionNumber: 1, status: 'correct', selectedAnswer: 'A', correctAnswer: 'A', timeSpent: 40 },
        { questionId: 'q2', questionNumber: 2, status: 'correct', selectedAnswer: 'C', correctAnswer: 'C', timeSpent: 55 },
        { questionId: 'q3', questionNumber: 3, status: 'correct', selectedAnswer: 'D', correctAnswer: 'D', timeSpent: 65 },
        { questionId: 'q4', questionNumber: 4, status: 'wrong', selectedAnswer: 'A', correctAnswer: 'D', timeSpent: 70 }
      ],
      totalScore: 18,
      percentage: 90,
      passed: true
    },
    {
      studentId: 'student-3',
      studentName: 'Mike Johnson',
      answers: [
        { questionId: 'q1', questionNumber: 1, status: 'wrong', selectedAnswer: 'B', correctAnswer: 'A', timeSpent: 50 },
        { questionId: 'q2', questionNumber: 2, status: 'correct', selectedAnswer: 'C', correctAnswer: 'C', timeSpent: 45 },
        { questionId: 'q3', questionNumber: 3, status: 'skipped', correctAnswer: 'D', timeSpent: 0 },
        { questionId: 'q4', questionNumber: 4, status: 'correct', selectedAnswer: 'D', correctAnswer: 'D', timeSpent: 55 }
      ],
      totalScore: 12,
      percentage: 60,
      passed: false
    }
  ]
}

export const mockQuestionAnalysis: Record<string, QuestionAnalysis[]> = {
  'exam-1': [
    {
      questionId: 'q1',
      questionNumber: 1,
      questionText: 'A particle moves with constant acceleration. If its initial velocity is 5 m/s and acceleration is 2 m/s², what is its velocity after 3 seconds?',
      correctCount: 20,
      wrongCount: 4,
      skippedCount: 1,
      totalStudents: 25,
      correctPercentage: 80
    },
    {
      questionId: 'q2',
      questionNumber: 2,
      questionText: 'What is the force required to accelerate a 10 kg mass at 3 m/s²?',
      correctCount: 18,
      wrongCount: 6,
      skippedCount: 1,
      totalStudents: 25,
      correctPercentage: 72
    },
    {
      questionId: 'q3',
      questionNumber: 3,
      questionText: 'A projectile is launched at 45° with initial velocity 20 m/s. What is the maximum height reached?',
      correctCount: 15,
      wrongCount: 7,
      skippedCount: 3,
      totalStudents: 25,
      correctPercentage: 60
    },
    {
      questionId: 'q4',
      questionNumber: 4,
      questionText: 'Calculate the kinetic energy of a 5 kg object moving at 10 m/s.',
      correctCount: 22,
      wrongCount: 2,
      skippedCount: 1,
      totalStudents: 25,
      correctPercentage: 88
    }
  ]
}

export const getDetailedExamReport = (examId: string): DetailedExamReport | null => {
  const examReport = mockBatchExamReports.find(report => report.examId === examId)
  const studentResults = mockStudentResults[examId]
  const questionAnalysis = mockQuestionAnalysis[examId]
  
  if (!examReport || !studentResults || !questionAnalysis) {
    return null
  }
  
  return {
    examReport,
    studentResults,
    questionAnalysis
  }
}
