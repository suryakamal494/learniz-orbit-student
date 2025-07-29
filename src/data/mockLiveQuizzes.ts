
import type { LiveQuizData } from '@/types/liveQuiz'

export const mockLiveQuizData: LiveQuizData = {
  quizzes: [
    {
      id: "live-quiz-1",
      title: "Quick Calculus Check",
      subject: "Mathematics",
      subjectId: "1",
      teacherName: "Dr. Smith",
      duration: 10,
      totalQuestions: 5,
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 60 * 1000).toISOString(), // 8 minutes from now
      isActive: true,
      description: "Quick understanding check on today's derivatives lesson"
    },
    {
      id: "live-quiz-2",
      title: "Newton's Laws Pop Quiz",
      subject: "Physics",
      subjectId: "2", 
      teacherName: "Prof. Johnson",
      duration: 15,
      totalQuestions: 8,
      startedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // started 2 minutes ago
      expiresAt: new Date(Date.now() + 13 * 60 * 1000).toISOString(), // 13 minutes from now
      isActive: true,
      description: "Applied forces and motion concepts"
    }
  ],
  totalActive: 2
}
