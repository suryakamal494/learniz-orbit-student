
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from '@/pages/Index'
import LoginPage from '@/pages/LoginPage'
import SchedulePage from '@/pages/SchedulePage'
import SubjectPage from '@/pages/SubjectPage'
import ExamPage from '@/pages/ExamPage'
import ExamInstructionsPage from '@/pages/ExamInstructionsPage'
import ExamResultsPage from '@/pages/ExamResultsPage'
import AnalysisPage from '@/pages/AnalysisPage'
import MessagesPage from '@/pages/MessagesPage'
import NotificationsPage from '@/pages/NotificationsPage'
import LiveQuizPage from '@/pages/LiveQuizPage'
import NotFound from '@/pages/NotFound'
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'
import AddBatchPage from '@/pages/teacher/batches/AddBatchPage'
import BatchListingPage from '@/pages/teacher/batches/BatchListingPage'
import ViewStudentsPage from '@/pages/teacher/batches/ViewStudentsPage'
import AssignLMSPage from '@/pages/teacher/batches/AssignLMSPage'
import BatchNotesAssignmentPage from '@/pages/teacher/batches/BatchNotesAssignmentPage'
import ExamsMainPage from '@/pages/teacher/exams/ExamsMainPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import DirectoryPage from '@/pages/teacher/exams/DirectoryPage'
import InstructionsPage from '@/pages/teacher/exams/InstructionsPage'
import CreateInstructionPage from '@/pages/teacher/exams/CreateInstructionPage'
import EditInstructionPage from '@/pages/teacher/exams/EditInstructionPage'
import QuestionBankMainPage from '@/pages/teacher/exams/QuestionBankMainPage'
import QuestionBankAddPage from '@/pages/teacher/exams/QuestionBankAddPage'
import QuestionBankViewPage from '@/pages/teacher/exams/QuestionBankViewPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/exam/:examId/instructions" element={<ExamInstructionsPage />} />
          <Route path="/exam/:examId/results" element={<ExamResultsPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/live-quiz/:quizId" element={<LiveQuizPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/messages" element={<TeacherMessagesPage />} />
          <Route path="/teacher/notifications" element={<TeacherNotificationsPage />} />
          
          {/* Teacher Batches Routes */}
          <Route path="/teacher/batches" element={<BatchListingPage />} />
          <Route path="/teacher/batches/add" element={<AddBatchPage />} />
          <Route path="/teacher/batches/:batchId/students" element={<ViewStudentsPage />} />
          <Route path="/teacher/batches/:batchId/assign-lms" element={<AssignLMSPage />} />
          <Route path="/teacher/batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />
          
          {/* Teacher Exams Routes */}
          <Route path="/teacher/exams" element={<ExamsMainPage />} />
          <Route path="/teacher/exams/create" element={<CreateExamPage />} />
          <Route path="/teacher/exams/directory" element={<DirectoryPage />} />
          <Route path="/teacher/exams/instructions" element={<InstructionsPage />} />
          <Route path="/teacher/exams/instructions/create" element={<CreateInstructionPage />} />
          <Route path="/teacher/exams/instructions/edit/:id" element={<EditInstructionPage />} />
          <Route path="/teacher/exams/question-bank" element={<QuestionBankMainPage />} />
          <Route path="/teacher/exams/question-bank/add/:examType" element={<QuestionBankAddPage />} />
          <Route path="/teacher/exams/question-bank/view/:examType" element={<QuestionBankViewPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
