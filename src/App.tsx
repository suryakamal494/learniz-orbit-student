
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { AppLayout } from '@/components/layout/AppLayout'
import { TeacherLayout } from '@/components/teacher/layout/TeacherLayout'

// Student Pages
import Index from '@/pages/Index'
import ExamPage from '@/pages/ExamPage'
import SubjectPage from '@/pages/SubjectPage'
import SchedulePage from '@/pages/SchedulePage'
import AnalysisPage from '@/pages/AnalysisPage'
import MessagesPage from '@/pages/MessagesPage'
import NotificationsPage from '@/pages/NotificationsPage'
import ExamResultsPage from '@/pages/ExamResultsPage'
import ExamInstructionsPage from '@/pages/ExamInstructionsPage'
import LiveQuizPage from '@/pages/LiveQuizPage'
import LoginPage from '@/pages/LoginPage'
import NotFound from '@/pages/NotFound'

// Teacher Pages
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import TeacherSchedulePage from '@/pages/teacher/TeacherSchedulePage'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'

// Teacher Exams
import ExamsMainPage from '@/pages/teacher/exams/ExamsMainPage'
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import EditExamPage from '@/pages/teacher/exams/EditExamPage'
import UpdateQuestionsPage from '@/pages/teacher/exams/UpdateQuestionsPage'
import UpdateBatchesPage from '@/pages/teacher/exams/UpdateBatchesPage'
import DirectoryPage from '@/pages/teacher/exams/DirectoryPage'
import InstructionsPage from '@/pages/teacher/exams/InstructionsPage'
import CreateInstructionPage from '@/pages/teacher/exams/CreateInstructionPage'
import EditInstructionPage from '@/pages/teacher/exams/EditInstructionPage'

// Teacher LMS
import LMSMainPage from '@/pages/teacher/lms/LMSMainPage'
import LMSDirectoryPage from '@/pages/teacher/lms/LMSDirectoryPage'
import LMSSeriesPage from '@/pages/teacher/lms/LMSSeriesPage'
import CreateLMSSeriesPage from '@/pages/teacher/lms/CreateLMSSeriesPage'
import LMSSeriesPreviewPage from '@/pages/teacher/lms/LMSSeriesPreviewPage'
import UpdateLMSSeriesPage from '@/pages/teacher/lms/UpdateLMSSeriesPage'
import LMSContentPage from '@/pages/teacher/lms/LMSContentPage'
import NotesPage from '@/pages/teacher/lms/NotesPage'
import UpdateExamOrderPage from '@/pages/teacher/lms/UpdateExamOrderPage'
import ContentLibraryPage from '@/pages/teacher/lms/content/ContentLibraryPage'
import CreateLMSContentPage from '@/pages/teacher/lms/content/CreateLMSContentPage'
import ViewLMSContentPage from '@/pages/teacher/lms/content/ViewLMSContentPage'
import EditLMSContentPage from '@/pages/teacher/lms/content/EditLMSContentPage'

// Teacher Question Bank
import QuestionBankPage from '@/pages/teacher/QuestionBankPage'
import QuestionBankMainPage from '@/pages/teacher/exams/QuestionBankMainPage'
import QuestionBankAddPage from '@/pages/teacher/exams/QuestionBankAddPage'
import QuestionBankViewPage from '@/pages/teacher/exams/QuestionBankViewPage'

// Teacher Batches
import BatchListingPage from '@/pages/teacher/batches/BatchListingPage'
import AddBatchPage from '@/pages/teacher/batches/AddBatchPage'
import ViewStudentsPage from '@/pages/teacher/batches/ViewStudentsPage'
import AssignLMSPage from '@/pages/teacher/batches/AssignLMSPage'
import BatchNotesAssignmentPage from '@/pages/teacher/batches/BatchNotesAssignmentPage'

// Teacher Schedule
import CreateClassPage from '@/pages/teacher/schedule/CreateClassPage'
import EditSchedulePage from '@/pages/teacher/schedule/EditSchedulePage'
import AssignLMSNotesPage from '@/pages/teacher/schedule/AssignLMSNotesPage'

// Teacher Reports
import ReportsMainPage from '@/pages/teacher/reports/ReportsMainPage'
import AttendancePage from '@/pages/teacher/reports/AttendancePage'
import BatchReportsPage from '@/pages/teacher/reports/BatchReportsPage'
import DetailedExamReportPage from '@/pages/teacher/reports/DetailedExamReportPage'

function App() {
  return (
    <QueryClientProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Student Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Index />} />
              <Route path="exam/:examId" element={<ExamPage />} />
              <Route path="subject/:subjectId" element={<SubjectPage />} />
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="exam/:examId/results" element={<ExamResultsPage />} />
              <Route path="exam/:examId/instructions" element={<ExamInstructionsPage />} />
              <Route path="live-quiz/:quizId" element={<LiveQuizPage />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="schedule" element={<TeacherSchedulePage />} />
              <Route path="messages" element={<TeacherMessagesPage />} />
              <Route path="notifications" element={<TeacherNotificationsPage />} />
              
              {/* Teacher Exams */}
              <Route path="exams" element={<ExamsMainPage />} />
              <Route path="exams/create" element={<CreateExamPage />} />
              <Route path="exams/:examId/edit" element={<EditExamPage />} />
              <Route path="exams/:examId/update-questions" element={<UpdateQuestionsPage />} />
              <Route path="exams/:examId/update-batches" element={<UpdateBatchesPage />} />
              <Route path="exams/directory" element={<DirectoryPage />} />
              <Route path="exams/instructions" element={<InstructionsPage />} />
              <Route path="exams/instructions/create" element={<CreateInstructionPage />} />
              <Route path="exams/instructions/:instructionId/edit" element={<EditInstructionPage />} />

              {/* Teacher LMS */}
              <Route path="lms" element={<LMSMainPage />} />
              <Route path="lms/directory" element={<LMSDirectoryPage />} />
              <Route path="lms/series" element={<LMSSeriesPage />} />
              <Route path="lms/series/create" element={<CreateLMSSeriesPage />} />
              <Route path="lms/series/:seriesId/preview" element={<LMSSeriesPreviewPage />} />
              <Route path="lms/series/:seriesId/edit" element={<UpdateLMSSeriesPage />} />
              <Route path="lms/content-management" element={<LMSContentPage />} />
              <Route path="lms/notes" element={<NotesPage />} />
              <Route path="lms/update-exam-order" element={<UpdateExamOrderPage />} />
              <Route path="lms/content" element={<ContentLibraryPage />} />
              <Route path="lms/content/create" element={<CreateLMSContentPage />} />
              <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
              <Route path="lms/content/:contentId/edit" element={<EditLMSContentPage />} />

              {/* Teacher Question Bank */}
              <Route path="question-bank" element={<QuestionBankPage />} />
              <Route path="exams/question-bank" element={<QuestionBankMainPage />} />
              <Route path="exams/question-bank/add" element={<QuestionBankAddPage />} />
              <Route path="exams/question-bank/:questionId/view" element={<QuestionBankViewPage />} />

              {/* Teacher Batches */}
              <Route path="batches" element={<BatchListingPage />} />
              <Route path="batches/add" element={<AddBatchPage />} />
              <Route path="batches/:batchId/students" element={<ViewStudentsPage />} />
              <Route path="batches/:batchId/assign-lms" element={<AssignLMSPage />} />
              <Route path="batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />

              {/* Teacher Schedule */}
              <Route path="schedule/create" element={<CreateClassPage />} />
              <Route path="schedule/:scheduleId/edit" element={<EditSchedulePage />} />
              <Route path="schedule/:scheduleId/assign-lms-notes" element={<AssignLMSNotesPage />} />

              {/* Teacher Reports */}
              <Route path="reports" element={<ReportsMainPage />} />
              <Route path="reports/attendance" element={<AttendancePage />} />
              <Route path="reports/batches" element={<BatchReportsPage />} />
              <Route path="reports/exam/:examId" element={<DetailedExamReportPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
