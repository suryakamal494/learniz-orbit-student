
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { Toaster } from "@/components/ui/sonner"
import { AppLayout } from '@/components/layout/AppLayout'
import { TeacherLayout } from '@/components/teacher/layout/TeacherLayout'
import { Outlet } from 'react-router-dom'
import SchedulePage from '@/pages/SchedulePage'
import MessagesPage from '@/pages/MessagesPage'
import AnalysisPage from '@/pages/AnalysisPage'
import NotificationsPage from '@/pages/NotificationsPage'
import LoginPage from '@/pages/LoginPage'
import QuestionBankPage from '@/pages/teacher/QuestionBankPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import InstructionsPage from '@/pages/teacher/exams/InstructionsPage'
import TeacherSchedulePage from '@/pages/teacher/TeacherSchedulePage'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'
import LMSMainPage from '@/pages/teacher/lms/LMSMainPage'
import ContentLibraryPage from '@/pages/teacher/lms/content/ContentLibraryPage'
import CreateLMSContentPage from '@/pages/teacher/lms/content/CreateLMSContentPage'
import ViewLMSContentPage from '@/pages/teacher/lms/content/ViewLMSContentPage'
import LMSSeriesPreviewPage from '@/pages/teacher/lms/LMSSeriesPreviewPage'
import NotesPage from '@/pages/teacher/lms/NotesPage'
import EditLMSContentPage from '@/pages/teacher/lms/content/EditLMSContentPage'
import LMSDirectoryPage from './pages/teacher/lms/LMSDirectoryPage'

// Create simple dashboard components since the actual pages don't exist
const DashboardPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Student Dashboard</h1></div>
const TeacherDashboardPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Teacher Dashboard</h1></div>
const ExamsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Exams</h1></div>

function App() {
  return (
    <QueryClientProvider>
      <Router>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout><Outlet /></TeacherLayout>}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />
            <Route path="schedule" element={<TeacherSchedulePage />} />
            <Route path="messages" element={<TeacherMessagesPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="notifications" element={<TeacherNotificationsPage />} />

            {/* Exams Routes */}
            <Route path="exams" element={<ExamsPage />} />
            <Route path="exams/create" element={<CreateExamPage />} />
            <Route path="exams/instructions" element={<InstructionsPage />} />

            {/* Question Bank Route */}
            <Route path="question-bank" element={<QuestionBankPage />} />
            
            {/* LMS Routes */}
            <Route path="lms" element={<LMSMainPage />} />
            <Route path="lms/content" element={<ContentLibraryPage />} />
            <Route path="lms/content/create" element={<CreateLMSContentPage />} />
            <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
            <Route path="lms/content/:contentId/edit" element={<EditLMSContentPage />} />
            <Route path="lms/series/:seriesId/preview" element={<LMSSeriesPreviewPage />} />
            <Route path="lms/directory" element={<LMSDirectoryPage />} />
            <Route path="lms/notes" element={<NotesPage />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
