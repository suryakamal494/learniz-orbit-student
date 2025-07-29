
import type { ExamSection, ExamChapter, Exam, ExamQuestion, ExamResult } from '@/types/exams'

const sampleQuestions: ExamQuestion[] = [
  {
    id: "q1",
    question: "What is the derivative of x²?",
    options: ["2x", "x", "2", "x²"],
    correctAnswer: 0,
    explanation: "The derivative of x² is 2x using the power rule.",
    marks: 2
  },
  {
    id: "q2", 
    question: "What is the limit of (x²-1)/(x-1) as x approaches 1?",
    options: ["0", "1", "2", "∞"],
    correctAnswer: 2,
    explanation: "Using L'Hôpital's rule or factoring: (x+1)(x-1)/(x-1) = x+1, so limit is 2.",
    marks: 3
  },
  {
    id: "q3",
    question: "What is the integral of 2x dx?",
    options: ["x² + C", "2x² + C", "x²/2 + C", "2x + C"],
    correctAnswer: 0,
    explanation: "∫2x dx = x² + C using the power rule for integration.",
    marks: 2
  }
]

const sampleResult: ExamResult = {
  id: "result-1",
  examId: "exam-1-1",
  score: 7,
  totalMarks: 10,
  percentage: 70,
  timeTaken: 25,
  submissionDate: "2024-01-15T10:30:00Z",
  answers: { "q1": 0, "q2": 2, "q3": 1 },
  passed: true
}

export const mockExamData: ExamSection = {
  subjectId: "mathematics",
  chapters: [
    {
      id: "chapter-1-exams",
      title: "Introduction to Calculus",
      description: "Test your understanding of basic calculus concepts",
      totalExams: 3,
      completedExams: 1,
      progress: 33,
      exams: [
        {
          id: "exam-1-1",
          title: "Basic Derivatives Quiz",
          description: "Test your knowledge of derivative rules and applications",
          duration: 30,
          totalMarks: 10,
          totalQuestions: 5,
          difficulty: "easy",
          status: "completed",
          chapterId: "chapter-1-exams",
          questions: sampleQuestions,
          result: sampleResult,
          allowRetake: true,
          passingScore: 60
        },
        {
          id: "exam-1-2",
          title: "Limits and Continuity Test",
          description: "Comprehensive test on limits, continuity, and their properties",
          duration: 45,
          totalMarks: 15,
          totalQuestions: 8,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-1-exams",
          allowRetake: true,
          passingScore: 60
        },
        {
          id: "exam-1-3",
          title: "Integration Fundamentals",
          description: "Test your understanding of basic integration techniques",
          duration: 60,
          totalMarks: 20,
          totalQuestions: 10,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-1-exams",
          allowRetake: false,
          passingScore: 70
        }
      ]
    },
    {
      id: "chapter-2-exams",
      title: "Advanced Calculus",
      description: "Advanced topics in differential and integral calculus",
      totalExams: 2,
      completedExams: 0,
      progress: 0,
      exams: [
        {
          id: "exam-2-1",
          title: "Multivariable Calculus",
          description: "Functions of multiple variables, partial derivatives, and applications",
          duration: 90,
          totalMarks: 25,
          totalQuestions: 12,
          difficulty: "hard",
          status: "not-started",
          chapterId: "chapter-2-exams",
          allowRetake: true,
          passingScore: 70
        },
        {
          id: "exam-2-2",
          title: "Vector Calculus",
          description: "Line integrals, surface integrals, and vector field analysis",
          duration: 120,
          totalMarks: 30,
          totalQuestions: 15,
          difficulty: "hard",
          status: "not-started",
          chapterId: "chapter-2-exams",
          allowRetake: false,
          passingScore: 75
        }
      ]
    },
    {
      id: "chapter-3-exams",
      title: "Applied Mathematics",
      description: "Real-world applications of mathematical concepts",
      totalExams: 2,
      completedExams: 0,
      progress: 0,
      exams: [
        {
          id: "exam-3-1",
          title: "Optimization Problems",
          description: "Linear programming and optimization techniques",
          duration: 75,
          totalMarks: 20,
          totalQuestions: 10,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-3-exams",
          allowRetake: true,
          passingScore: 65
        },
        {
          id: "exam-3-2",
          title: "Statistics and Probability",
          description: "Statistical analysis and probability distributions",
          duration: 60,
          totalMarks: 18,
          totalQuestions: 9,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-3-exams",
          allowRetake: true,
          passingScore: 65
        }
      ]
    }
  ],
  overallProgress: 14,
  totalExams: 7,
  completedExams: 1
}
