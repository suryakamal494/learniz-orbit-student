
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import AppLayout from '@/components/layout/AppLayout'
import TeacherLayout from '@/components/teacher/layout/TeacherLayout'
import Index from '@/pages/Index'
import LoginPage from '@/pages/LoginPage'
import SchedulePage from '@/pages/SchedulePage'
import MessagesPage from '@/pages/MessagesPage'
import NotificationsPage from '@/pages/NotificationsPage'
import AnalysisPage from '@/pages/AnalysisPage'
import SubjectPage from '@/pages/SubjectPage'
import ExamPage from '@/pages/ExamPage'
import ExamResultsPage from '@/pages/ExamResultsPage'
import ExamInstructionsPage from '@/pages/ExamInstructionsPage'
import LiveQuizPage from '@/pages/LiveQuizPage'
import NotFound from '@/pages/NotFound'

// Teacher Pages
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import TeacherSchedulePage from '@/pages/teacher/TeacherSchedulePage'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'
import QuestionBankPage from '@/pages/teacher/QuestionBankPage'
import QuestionBankMainPage from '@/pages/teacher/exams/QuestionBankMainPage'
import QuestionBankAddPage from '@/pages/teacher/exams/QuestionBankAddPage'
import QuestionBankViewPage from '@/pages/teacher/exams/QuestionBankViewPage'

// Teacher Batch Pages
import BatchListingPage from '@/pages/teacher/batches/BatchListingPage'
import AddBatchPage from '@/pages/teacher/batches/AddBatchPage'
import ViewStudentsPage from '@/pages/teacher/batches/ViewStudentsPage'
import AssignLMSPage from '@/pages/teacher/batches/AssignLMSPage'
import BatchNotesAssignmentPage from '@/pages/teacher/batches/BatchNotesAssignmentPage'

// Teacher LMS Pages
import LMSMainPage from '@/pages/teacher/lms/LMSMainPage'
import LMSDirectoryPage from '@/pages/teacher/lms/LMSDirectoryPage'
import LMSSeriesPage from '@/pages/teacher/lms/LMSSeriesPage'
import LMSSeriesPreviewPage from '@/pages/teacher/lms/LMSSeriesPreviewPage'
import CreateLMSSeriesPage from '@/pages/teacher/lms/CreateLMSSeriesPage'
import UpdateLMSSeriesPage from '@/pages/teacher/lms/UpdateLMSSeriesPage'
import LMSContentPage from '@/pages/teacher/lms/LMSContentPage'
import NotesPage from '@/pages/teacher/lms/NotesPage'
import UpdateExamOrderPage from '@/pages/teacher/lms/UpdateExamOrderPage'
import ContentLibraryPage from '@/pages/teacher/lms/content/ContentLibraryPage'
import CreateLMSContentPage from '@/pages/teacher/lms/content/CreateLMSContentPage'
import ViewLMSContentPage from '@/pages/teacher/lms/content/ViewLMSContentPage'

// Teacher Exam Pages
import ExamsMainPage from '@/pages/teacher/exams/ExamsMainPage'
import DirectoryPage from '@/pages/teacher/exams/DirectoryPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import EditExamPage from '@/pages/teacher/exams/EditExamPage'
import InstructionsPage from '@/pages/teacher/exams/InstructionsPage'
import CreateInstructionPage from '@/pages/teacher/exams/CreateInstructionPage'
import EditInstructionPage from '@/pages/teacher/exams/EditInstructionPage'
import UpdateQuestionsPage from '@/pages/teacher/exams/UpdateQuestionsPage'
import UpdateBatchesPage from '@/pages/teacher/exams/UpdateBatchesPage'

// Teacher Schedule Pages  
import CreateClassPage from '@/pages/teacher/schedule/CreateClassPage'
import EditSchedulePage from '@/pages/teacher/schedule/EditSchedulePage'
import AssignLMSNotesPage from '@/pages/teacher/schedule/AssignLMSNotesPage'

// Teacher Report Pages
import ReportsMainPage from '@/pages/teacher/reports/ReportsMainPage'
import AttendancePage from '@/pages/teacher/reports/AttendancePage'
import BatchReportsPage from '@/pages/teacher/reports/BatchReportsPage'
import DetailedExamReportPage from '@/pages/teacher/reports/DetailedExamReportPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Student Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="subject/:subjectId" element={<SubjectPage />} />
            <Route path="exam/:examId" element={<ExamPage />} />
            <Route path="exam/:examId/results" element={<ExamResultsPage />} />
            <Route path="exam/:examId/instructions" element={<ExamInstructionsPage />} />
            <Route path="live-quiz/:quizId" element={<LiveQuizPage />} />
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="schedule" element={<TeacherSchedulePage />} />
            <Route path="messages" element={<TeacherMessagesPage />} />
            <Route path="notifications" element={<TeacherNotificationsPage />} />
            
            {/* Question Bank Routes */}
            <Route path="question-bank" element={<QuestionBankPage />} />
            <Route path="question-bank/main" element={<QuestionBankMainPage />} />
            <Route path="question-bank/add" element={<QuestionBankAddPage />} />
            <Route path="question-bank/view/:questionId" element={<QuestionBankViewPage />} />
            
            {/* Batch Management Routes */}
            <Route path="batches" element={<BatchListingPage />} />
            <Route path="batches/add" element={<AddBatchPage />} />
            <Route path="batches/:batchId/students" element={<ViewStudentsPage />} />
            <Route path="batches/:batchId/assign-lms" element={<AssignLMSPage />} />
            <Route path="batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />
            
            {/* LMS Routes */}
            <Route path="lms" element={<LMSMainPage />} />
            <Route path="lms/directory" element={<LMSDirectoryPage />} />
            <Route path="lms/series" element={<LMSSeriesPage />} />
            <Route path="lms/series/:seriesId/preview" element={<LMSSeriesPreviewPage />} />
            <Route path="lms/series/create" element={<CreateLMSSeriesPage />} />
            <Route path="lms/series/:seriesId/edit" element={<UpdateLMSSeriesPage />} />
            <Route path="lms/content" element={<LMSContentPage />} />
            <Route path="lms/notes" element={<NotesPage />} />
            <Route path="lms/exam-order" element={<UpdateExamOrderPage />} />
            <Route path="lms/content/library" element={<ContentLibraryPage />} />
            <Route path="lms/content/create" element={<CreateLMSContentPage />} />
            <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
            
            {/* Exam Routes */}
            <Route path="exams" element={<ExamsMainPage />} />
            <Route path="exams/directory" element={<DirectoryPage />} />
            <Route path="exams/create" element={<CreateExamPage />} />
            <Route path="exams/:examId/edit" element={<EditExamPage />} />
            <Route path="exams/instructions" element={<InstructionsPage />} />
            <Route path="exams/instructions/create" element={<CreateInstructionPage />} />
            <Route path="exams/instructions/:instructionId/edit" element={<EditInstructionPage />} />
            <Route path="exams/:examId/questions" element={<UpdateQuestionsPage />} />
            <Route path="exams/:examId/batches" element={<UpdateBatchesPage />} />
            
            {/* Schedule Routes */}
            <Route path="schedule/create" element={<CreateClassPage />} />
            <Route path="schedule/:classId/edit" element={<EditSchedulePage />} />
            <Route path="schedule/:classId/assign" element={<AssignLMSNotesPage />} />
            
            {/* Reports Routes */}
            <Route path="reports" element={<ReportsMainPage />} />
            <Route path="reports/attendance" element={<AttendancePage />} />
            <Route path="reports/batch" element={<BatchReportsPage />} />
            <Route path="reports/batch/:batchId/exam/:examId" element={<DetailedExamReportPage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
