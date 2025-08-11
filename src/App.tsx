import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { Toaster } from "@/components/ui/sonner"
import { AppLayout } from '@/components/layout/AppLayout'
import { TeacherLayout } from '@/components/teacher/layout/TeacherLayout'
import DashboardPage from '@/pages/DashboardPage'
import SchedulePage from '@/pages/SchedulePage'
import MessagesPage from '@/pages/MessagesPage'
import AnalysisPage from '@/pages/AnalysisPage'
import NotificationsPage from '@/pages/NotificationsPage'
import LoginPage from '@/pages/LoginPage'
import ExamsPage from '@/pages/ExamsPage'
import QuestionBankPage from '@/pages/teacher/QuestionBankPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import ViewExamPage from '@/pages/teacher/exams/ViewExamPage'
import UpdateExamPage from '@/pages/teacher/exams/UpdateExamPage'
import UpdateExamOrderPage from '@/pages/teacher/exams/UpdateExamOrderPage'
import InstructionsPage from '@/pages/teacher/exams/InstructionsPage'
import CreateInstructionsPage from '@/pages/teacher/exams/CreateInstructionsPage'
import ViewInstructionsPage from '@/pages/teacher/exams/ViewInstructionsPage'
import UpdateInstructionsPage from '@/pages/teacher/exams/UpdateInstructionsPage'
import DirectoryPage from '@/pages/teacher/exams/DirectoryPage'
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import TeacherSchedulePage from '@/pages/teacher/TeacherSchedulePage'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherAnalysisPage from '@/pages/teacher/TeacherAnalysisPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'
import LMSMainPage from '@/pages/teacher/lms/LMSMainPage'
import ContentLibraryPage from '@/pages/teacher/lms/content/ContentLibraryPage'
import CreateLMSContentPage from '@/pages/teacher/lms/content/CreateLMSContentPage'
import ViewLMSContentPage from '@/pages/teacher/lms/content/ViewLMSContentPage'
import LMSSeriesPage from '@/pages/teacher/lms/series/LMSSeriesPage'
import CreateLMSSeriesPage from '@/pages/teacher/lms/series/CreateLMSSeriesPage'
import LMSSeriesPreviewPage from '@/pages/teacher/lms/series/LMSSeriesPreviewPage'
import UpdateLMSSeriesPage from '@/pages/teacher/lms/series/UpdateLMSSeriesPage'
import NotesPage from '@/pages/teacher/lms/NotesPage'

// Add the new import
import EditLMSContentPage from '@/pages/teacher/lms/content/EditLMSContentPage'
import LMSDirectoryPage from './pages/teacher/lms/LMSDirectoryPage'

function App() {
  return (
    <QueryClientProvider>
      <Router>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />
            <Route path="schedule" element={<TeacherSchedulePage />} />
            <Route path="messages" element={<TeacherMessagesPage />} />
            <Route path="analysis" element={<TeacherAnalysisPage />} />
            <Route path="notifications" element={<TeacherNotificationsPage />} />

            {/* Exams Routes */}
            <Route path="exams" element={<ExamsPage />} />
            <Route path="exams/create" element={<CreateExamPage />} />
            <Route path="exams/:examId/view" element={<ViewExamPage />} />
            <Route path="exams/:examId/update" element={<UpdateExamPage />} />
            <Route path="exams/update-order" element={<UpdateExamOrderPage />} />
            <Route path="exams/instructions" element={<InstructionsPage />} />
            <Route path="exams/instructions/create" element={<CreateInstructionsPage />} />
            <Route path="exams/instructions/:instructionId/view" element={<ViewInstructionsPage />} />
            <Route path="exams/instructions/:instructionId/update" element={<UpdateInstructionsPage />} />
            <Route path="exams/directory" element={<DirectoryPage />} />

            {/* Question Bank Route */}
            <Route path="question-bank" element={<QuestionBankPage />} />
            
            {/* LMS Routes */}
            <Route path="lms" element={<LMSMainPage />} />
            <Route path="lms/content" element={<ContentLibraryPage />} />
            <Route path="lms/content/create" element={<CreateLMSContentPage />} />
            <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
            <Route path="lms/content/:contentId/edit" element={<EditLMSContentPage />} />
            <Route path="lms/series" element={<LMSSeriesPage />} />
            <Route path="lms/series/create" element={<CreateLMSSeriesPage />} />
            <Route path="lms/series/:seriesId/preview" element={<LMSSeriesPreviewPage />} />
            <Route path="lms/series/:seriesId/update" element={<UpdateLMSSeriesPage />} />
            <Route path="lms/directory" element={<LMSDirectoryPage />} />
            <Route path="lms/notes" element={<NotesPage />} />
            <Route path="lms/update-order" element={<UpdateExamOrderPage />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
