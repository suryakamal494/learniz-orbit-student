
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
      description: "",
      totalExams: 3,
      completedExams: 1,
      progress: 33,
      exams: [
        {
          id: "exam-1-1",
          title: "Basic Derivatives Quiz",
          description: "",
          duration: 30,
          totalMarks: 10,
          totalQuestions: 5,
          difficulty: "easy",
          status: "completed",
          chapterId: "chapter-1-exams",
          questions: sampleQuestions,
          result: sampleResult,
          allowRetake: true,
          passingScore: 60,
          instructions: "Please read all questions carefully before answering. Each question has only one correct answer. You cannot go back to previous questions once you move forward. Manage your time wisely as the test will auto-submit when time expires."
        },
        {
          id: "exam-1-2",
          title: "Limits and Continuity Test",
          description: "",
          duration: 45,
          totalMarks: 15,
          totalQuestions: 8,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-1-exams",
          allowRetake: true,
          passingScore: 60,
          instructions: "This test covers limits and continuity concepts. Make sure you understand the fundamental theorems before attempting. Calculator is not allowed for this test. Show your work clearly for partial credit."
        },
        {
          id: "exam-1-3",
          title: "Integration Fundamentals",
          description: "",
          duration: 60,
          totalMarks: 20,
          totalQuestions: 10,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-1-exams",
          allowRetake: false,
          passingScore: 70,
          instructions: "This comprehensive test covers all integration techniques studied so far. You may use the provided formula sheet. Ensure all final answers are simplified. Partial credit will be awarded for correct methods."
        }
      ]
    },
    {
      id: "chapter-2-exams",
      title: "Advanced Calculus",
      description: "",
      totalExams: 2,
      completedExams: 0,
      progress: 0,
      exams: [
        {
          id: "exam-2-1",
          title: "Multivariable Calculus",
          description: "",
          duration: 90,
          totalMarks: 25,
          totalQuestions: 12,
          difficulty: "hard",
          status: "not-started",
          chapterId: "chapter-2-exams",
          allowRetake: true,
          passingScore: 70,
          instructions: "Advanced test on functions of multiple variables. Graphing calculator is permitted. Take your time to visualize the problems. Partial derivatives and optimization problems require careful attention to detail."
        },
        {
          id: "exam-2-2",
          title: "Vector Calculus",
          description: "",
          duration: 120,
          totalMarks: 30,
          totalQuestions: 15,
          difficulty: "hard",
          status: "not-started",
          chapterId: "chapter-2-exams",
          allowRetake: false,
          passingScore: 75,
          instructions: "Final comprehensive exam covering vector fields, line integrals, and surface integrals. This is a closed-book exam. Review all theorems and their applications. Time management is crucial for success."
        }
      ]
    },
    {
      id: "chapter-3-exams",
      title: "Applied Mathematics",
      description: "",
      totalExams: 2,
      completedExams: 0,
      progress: 0,
      exams: [
        {
          id: "exam-3-1",
          title: "Optimization Problems",
          description: "",
          duration: 75,
          totalMarks: 20,
          totalQuestions: 10,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-3-exams",
          allowRetake: true,
          passingScore: 65,
          instructions: "Real-world optimization problems require setting up equations correctly. Read each problem statement twice. Clearly define your variables and constraints. Check your solutions for reasonableness."
        },
        {
          id: "exam-3-2",
          title: "Statistics and Probability",
          description: "",
          duration: 60,
          totalMarks: 18,
          totalQuestions: 9,
          difficulty: "medium",
          status: "not-started",
          chapterId: "chapter-3-exams",
          allowRetake: true,
          passingScore: 65,
          instructions: "Statistical concepts test with probability distributions. Formula sheet is provided. Round final answers to 3 decimal places unless otherwise specified. Show all calculation steps clearly."
        }
      ]
    }
  ],
  overallProgress: 14,
  totalExams: 7,
  completedExams: 1
}
