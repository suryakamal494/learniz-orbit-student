
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from './pages/LoginPage';
import Index from './pages/Index';
import SchedulePage from './pages/SchedulePage';
import SubjectPage from './pages/SubjectPage';
import ExamPage from './pages/ExamPage';
import ExamInstructionsPage from './pages/ExamInstructionsPage';
import ExamResultsPage from './pages/ExamResultsPage';
import LiveQuizPage from './pages/LiveQuizPage';
import AnalysisPage from './pages/AnalysisPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFound from './pages/NotFound';

// Teacher imports
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage';
import QuestionBankPage from './pages/teacher/QuestionBankPage';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';

// Teacher batches
import BatchListingPage from './pages/teacher/batches/BatchListingPage';
import AddBatchPage from './pages/teacher/batches/AddBatchPage';
import ViewStudentsPage from './pages/teacher/batches/ViewStudentsPage';
import AssignLMSPage from './pages/teacher/batches/AssignLMSPage';
import BatchNotesAssignmentPage from './pages/teacher/batches/BatchNotesAssignmentPage';

// Teacher exams
import ExamsMainPage from './pages/teacher/exams/ExamsMainPage';
import CreateExamPage from './pages/teacher/exams/CreateExamPage';
import EditExamPage from './pages/teacher/exams/EditExamPage';
import UpdateQuestionsPage from './pages/teacher/exams/UpdateQuestionsPage';
import UpdateBatchesPage from './pages/teacher/exams/UpdateBatchesPage';
import DirectoryPage from './pages/teacher/exams/DirectoryPage';
import QuestionBankMainPage from './pages/teacher/exams/QuestionBankMainPage';
import QuestionBankAddPage from './pages/teacher/exams/QuestionBankAddPage';
import QuestionBankViewPage from './pages/teacher/exams/QuestionBankViewPage';
import InstructionsPage from './pages/teacher/exams/InstructionsPage';
import CreateInstructionPage from './pages/teacher/exams/CreateInstructionPage';
import EditInstructionPage from './pages/teacher/exams/EditInstructionPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Index />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/exam/:examId/instructions" element={<ExamInstructionsPage />} />
          <Route path="/exam/:examId/results" element={<ExamResultsPage />} />
          <Route path="/live-quiz/:quizId" element={<LiveQuizPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/messages" element={<TeacherMessagesPage />} />
          <Route path="/teacher/notifications" element={<TeacherNotificationsPage />} />
          <Route path="/teacher/question-bank" element={<QuestionBankPage />} />
          <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />

          {/* Teacher Batches */}
          <Route path="/teacher/batches" element={<BatchListingPage />} />
          <Route path="/teacher/batches/add" element={<AddBatchPage />} />
          <Route path="/teacher/batches/:batchId/students" element={<ViewStudentsPage />} />
          <Route path="/teacher/batches/:batchId/assign-lms" element={<AssignLMSPage />} />
          <Route path="/teacher/batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />

          {/* Teacher Exams */}
          <Route path="/teacher/exams" element={<ExamsMainPage />} />
          <Route path="/teacher/exams/create" element={<CreateExamPage />} />
          <Route path="/teacher/exams/:examId/edit" element={<EditExamPage />} />
          <Route path="/teacher/exams/:examId/questions" element={<UpdateQuestionsPage />} />
          <Route path="/teacher/exams/:examId/batches" element={<UpdateBatchesPage />} />
          <Route path="/teacher/exams/directory" element={<DirectoryPage />} />
          <Route path="/teacher/exams/question-bank" element={<QuestionBankMainPage />} />
          <Route path="/teacher/exams/question-bank/add" element={<QuestionBankAddPage />} />
          <Route path="/teacher/exams/question-bank/:questionId" element={<QuestionBankViewPage />} />
          <Route path="/teacher/exams/instructions" element={<InstructionsPage />} />
          <Route path="/teacher/exams/instructions/create" element={<CreateInstructionPage />} />
          <Route path="/teacher/exams/instructions/:instructionId/edit" element={<EditInstructionPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
