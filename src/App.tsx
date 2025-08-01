
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import AnalysisPage from './pages/AnalysisPage'
import ExamInstructionsPage from './pages/ExamInstructionsPage'
import ExamPage from './pages/ExamPage'
import ExamResultsPage from './pages/ExamResultsPage'
import LiveQuizPage from './pages/LiveQuizPage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import SchedulePage from './pages/SchedulePage'
import SubjectPage from './pages/SubjectPage'

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage'
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage'
import QuestionBankPage from './pages/teacher/QuestionBankPage'

// Teacher Batch pages
import AddBatchPage from './pages/teacher/batches/AddBatchPage'
import AssignLMSPage from './pages/teacher/batches/AssignLMSPage'
import BatchListingPage from './pages/teacher/batches/BatchListingPage'
import BatchNotesAssignmentPage from './pages/teacher/batches/BatchNotesAssignmentPage'
import ViewStudentsPage from './pages/teacher/batches/ViewStudentsPage'

// Teacher Exam pages
import CreateExamPage from './pages/teacher/exams/CreateExamPage'
import CreateInstructionPage from './pages/teacher/exams/CreateInstructionPage'
import DirectoryPage from './pages/teacher/exams/DirectoryPage'
import EditExamPage from './pages/teacher/exams/EditExamPage'
import EditInstructionPage from './pages/teacher/exams/EditInstructionPage'
import ExamsMainPage from './pages/teacher/exams/ExamsMainPage'
import InstructionsPage from './pages/teacher/exams/InstructionsPage'
import QuestionBankAddPage from './pages/teacher/exams/QuestionBankAddPage'
import QuestionBankMainPage from './pages/teacher/exams/QuestionBankMainPage'
import QuestionBankViewPage from './pages/teacher/exams/QuestionBankViewPage'
import UpdateBatchesPage from './pages/teacher/exams/UpdateBatchesPage'
import UpdateQuestionsPage from './pages/teacher/exams/UpdateQuestionsPage'

// Teacher LMS pages
import LMSSeriesPage from '@/pages/teacher/lms/LMSSeriesPage'
import CreateLMSSeriesPage from '@/pages/teacher/lms/CreateLMSSeriesPage'
import NotesManagementPage from '@/pages/teacher/lms/NotesManagementPage'
import LMSContentPage from './pages/teacher/lms/LMSContentPage'
import ContentLibraryPage from './pages/teacher/lms/content/ContentLibraryPage'
import CreateLMSContentPage from './pages/teacher/lms/content/CreateLMSContentPage'
import ViewLMSContentPage from './pages/teacher/lms/content/ViewLMSContentPage'

// Teacher Schedule pages
import CreateClassPage from './pages/teacher/schedule/CreateClassPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/exam-instructions" element={<ExamInstructionsPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/exam-results" element={<ExamResultsPage />} />
          <Route path="/live-quiz" element={<LiveQuizPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/subject/:id" element={<SubjectPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/messages" element={<TeacherMessagesPage />} />
          <Route path="/teacher/notifications" element={<TeacherNotificationsPage />} />
          <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
          <Route path="/teacher/question-bank" element={<QuestionBankPage />} />
          
          {/* Teacher Batch Routes */}
          <Route path="/teacher/batches/add" element={<AddBatchPage />} />
          <Route path="/teacher/batches/assign-lms" element={<AssignLMSPage />} />
          <Route path="/teacher/batches" element={<BatchListingPage />} />
          <Route path="/teacher/batches/notes-assignment" element={<BatchNotesAssignmentPage />} />
          <Route path="/teacher/batches/view-students" element={<ViewStudentsPage />} />
          
          {/* Teacher Exam Routes */}
          <Route path="/teacher/exams/create" element={<CreateExamPage />} />
          <Route path="/teacher/exams/instructions/create" element={<CreateInstructionPage />} />
          <Route path="/teacher/exams/directory" element={<DirectoryPage />} />
          <Route path="/teacher/exams/edit/:id" element={<EditExamPage />} />
          <Route path="/teacher/exams/instructions/edit/:id" element={<EditInstructionPage />} />
          <Route path="/teacher/exams" element={<ExamsMainPage />} />
          <Route path="/teacher/exams/instructions" element={<InstructionsPage />} />
          <Route path="/teacher/exams/question-bank/add" element={<QuestionBankAddPage />} />
          <Route path="/teacher/exams/question-bank" element={<QuestionBankMainPage />} />
          <Route path="/teacher/exams/question-bank/view/:id" element={<QuestionBankViewPage />} />
          <Route path="/teacher/exams/update-batches" element={<UpdateBatchesPage />} />
          <Route path="/teacher/exams/update-questions" element={<UpdateQuestionsPage />} />
          
          {/* Teacher LMS Routes */}
          <Route path="/teacher/lms/series" element={<LMSSeriesPage />} />
          <Route path="/teacher/lms/series/create" element={<CreateLMSSeriesPage />} />
          <Route path="/teacher/lms/notes" element={<NotesManagementPage />} />
          <Route path="/teacher/lms/content" element={<LMSContentPage />} />
          <Route path="/teacher/lms/content/library" element={<ContentLibraryPage />} />
          <Route path="/teacher/lms/content/create" element={<CreateLMSContentPage />} />
          <Route path="/teacher/lms/content/view/:id" element={<ViewLMSContentPage />} />
          
          {/* Teacher Schedule Routes */}
          <Route path="/teacher/schedule/create-class" element={<CreateClassPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
