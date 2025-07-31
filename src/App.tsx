
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import LoginPage from './pages/LoginPage'
import SubjectPage from './pages/SubjectPage'
import ExamPage from './pages/ExamPage'
import ExamInstructionsPage from './pages/ExamInstructionsPage'
import ExamResultsPage from './pages/ExamResultsPage'
import SchedulePage from './pages/SchedulePage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import AnalysisPage from './pages/AnalysisPage'
import LiveQuizPage from './pages/LiveQuizPage'
import NotFound from './pages/NotFound'

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage'
import CreateExamPage from './pages/teacher/exams/CreateExamPage'
import ExamsMainPage from './pages/teacher/exams/ExamsMainPage'
import QuestionBankMainPage from './pages/teacher/exams/QuestionBankMainPage'
import QuestionBankViewPage from './pages/teacher/exams/QuestionBankViewPage'
import QuestionBankAddPage from './pages/teacher/exams/QuestionBankAddPage'
import InstructionsPage from './pages/teacher/exams/InstructionsPage'
import CreateInstructionPage from './pages/teacher/exams/CreateInstructionPage'
import EditInstructionPage from './pages/teacher/exams/EditInstructionPage'
import DirectoryPage from './pages/teacher/exams/DirectoryPage'
import BatchListingPage from './pages/teacher/batches/BatchListingPage'
import AddBatchPage from './pages/teacher/batches/AddBatchPage'
import ViewStudentsPage from './pages/teacher/batches/ViewStudentsPage'
import AssignLMSPage from './pages/teacher/batches/AssignLMSPage'
import BatchNotesAssignmentPage from './pages/teacher/batches/BatchNotesAssignmentPage'
import UpdateQuestionsPage from './pages/teacher/exams/UpdateQuestionsPage'

// Layout components
import { AppLayout } from './components/layout/AppLayout'
import { TeacherLayout } from './components/teacher/layout/TeacherLayout'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Student routes */}
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/subject/:id" element={<AppLayout><SubjectPage /></AppLayout>} />
            <Route path="/exam/:id" element={<AppLayout><ExamPage /></AppLayout>} />
            <Route path="/exam/:id/instructions" element={<AppLayout><ExamInstructionsPage /></AppLayout>} />
            <Route path="/exam/:id/results" element={<AppLayout><ExamResultsPage /></AppLayout>} />
            <Route path="/schedule" element={<AppLayout><SchedulePage /></AppLayout>} />
            <Route path="/messages" element={<AppLayout><MessagesPage /></AppLayout>} />
            <Route path="/notifications" element={<AppLayout><NotificationsPage /></AppLayout>} />
            <Route path="/analysis" element={<AppLayout><AnalysisPage /></AppLayout>} />
            <Route path="/live-quiz/:id" element={<AppLayout><LiveQuizPage /></AppLayout>} />
            
            {/* Teacher routes */}
            <Route path="/teacher" element={<TeacherLayout><TeacherDashboard /></TeacherLayout>} />
            <Route path="/teacher/messages" element={<TeacherLayout><TeacherMessagesPage /></TeacherLayout>} />
            <Route path="/teacher/notifications" element={<TeacherLayout><TeacherNotificationsPage /></TeacherLayout>} />
            <Route path="/teacher/exams" element={<TeacherLayout><ExamsMainPage /></TeacherLayout>} />
            <Route path="/teacher/exams/create" element={<TeacherLayout><CreateExamPage /></TeacherLayout>} />
            <Route path="/teacher/exams/:examId/update-questions" element={<TeacherLayout><UpdateQuestionsPage /></TeacherLayout>} />
            <Route path="/teacher/question-bank" element={<TeacherLayout><QuestionBankMainPage /></TeacherLayout>} />
            <Route path="/teacher/question-bank/:subjectId" element={<TeacherLayout><QuestionBankViewPage /></TeacherLayout>} />
            <Route path="/teacher/question-bank/add" element={<TeacherLayout><QuestionBankAddPage /></TeacherLayout>} />
            <Route path="/teacher/instructions" element={<TeacherLayout><InstructionsPage /></TeacherLayout>} />
            <Route path="/teacher/instructions/create" element={<TeacherLayout><CreateInstructionPage /></TeacherLayout>} />
            <Route path="/teacher/instructions/:id/edit" element={<TeacherLayout><EditInstructionPage /></TeacherLayout>} />
            <Route path="/teacher/directory" element={<TeacherLayout><DirectoryPage /></TeacherLayout>} />
            <Route path="/teacher/batches" element={<TeacherLayout><BatchListingPage /></TeacherLayout>} />
            <Route path="/teacher/batches/add" element={<TeacherLayout><AddBatchPage /></TeacherLayout>} />
            <Route path="/teacher/batches/:id/students" element={<TeacherLayout><ViewStudentsPage /></TeacherLayout>} />
            <Route path="/teacher/batches/:id/assign-lms" element={<TeacherLayout><AssignLMSPage /></TeacherLayout>} />
            <Route path="/teacher/batches/:id/assign-notes" element={<TeacherLayout><BatchNotesAssignmentPage /></TeacherLayout>} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
