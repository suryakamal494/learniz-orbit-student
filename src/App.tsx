
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';

// Student pages
import SubjectPage from './pages/SubjectPage';
import ExamPage from './pages/ExamPage';
import ExamInstructionsPage from './pages/ExamInstructionsPage';
import ExamResultsPage from './pages/ExamResultsPage';
import AnalysisPage from './pages/AnalysisPage';
import SchedulePage from './pages/SchedulePage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import LiveQuizPage from './pages/LiveQuizPage';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import { TeacherLayout } from './components/teacher/layout/TeacherLayout';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage';
import QuestionBankPage from './pages/teacher/QuestionBankPage';

// Teacher Batches
import BatchListingPage from './pages/teacher/batches/BatchListingPage';
import AddBatchPage from './pages/teacher/batches/AddBatchPage';
import ViewStudentsPage from './pages/teacher/batches/ViewStudentsPage';
import AssignLMSPage from './pages/teacher/batches/AssignLMSPage';
import BatchNotesAssignmentPage from './pages/teacher/batches/BatchNotesAssignmentPage';

// Teacher Exams
import ExamsMainPage from './pages/teacher/exams/ExamsMainPage';
import CreateExamPage from './pages/teacher/exams/CreateExamPage';
import EditExamPage from './pages/teacher/exams/EditExamPage';
import UpdateQuestionsPage from './pages/teacher/exams/UpdateQuestionsPage';
import UpdateBatchesPage from './pages/teacher/exams/UpdateBatchesPage';
import QuestionBankAddPage from './pages/teacher/exams/QuestionBankAddPage';
import QuestionBankViewPage from './pages/teacher/exams/QuestionBankViewPage';
import DirectoryPage from './pages/teacher/exams/DirectoryPage';
import InstructionsPage from './pages/teacher/exams/InstructionsPage';
import CreateInstructionPage from './pages/teacher/exams/CreateInstructionPage';
import EditInstructionPage from './pages/teacher/exams/EditInstructionPage';

// Teacher Schedule
import CreateClassPage from './pages/teacher/schedule/CreateClassPage';
import AssignLMSNotesPage from './pages/teacher/schedule/AssignLMSNotesPage';
import EditSchedulePage from './pages/teacher/schedule/EditSchedulePage';

// Teacher LMS
import LMSContentPage from './pages/teacher/lms/LMSContentPage';
import CreateLMSContentPage from './pages/teacher/lms/content/CreateLMSContentPage';
import ViewLMSContentPage from './pages/teacher/lms/content/ViewLMSContentPage';
import ContentLibraryPage from './pages/teacher/lms/content/ContentLibraryPage';
import LMSSeriesPage from './pages/teacher/lms/LMSSeriesPage';
import CreateLMSSeriesPage from './pages/teacher/lms/CreateLMSSeriesPage';
import UpdateLMSSeriesPage from './pages/teacher/lms/UpdateLMSSeriesPage';
import UpdateExamOrderPage from './pages/teacher/lms/UpdateExamOrderPage';
import LMSSeriesPreviewPage from './pages/teacher/lms/LMSSeriesPreviewPage';

// Teacher Reports - Enhanced
import ReportsMainPage from './pages/teacher/reports/ReportsMainPage';
import AttendancePage from './pages/teacher/reports/AttendancePage';
import BatchReportsPage from './pages/teacher/reports/BatchReportsPage';
import DetailedExamReportPage from './pages/teacher/reports/DetailedExamReportPage';

// Teacher LMS Additional Pages
import LMSMainPage from './pages/teacher/lms/LMSMainPage';
import NotesPage from './pages/teacher/lms/NotesPage';
import LMSDirectoryPage from './pages/teacher/lms/LMSDirectoryPage';
import CreateNotesPage from './pages/teacher/lms/notes/CreateNotesPage';

import { AppLayout } from './components/layout/AppLayout';

function StudentLayoutWrapper() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function TeacherLayoutWrapper() {
  return (
    <TeacherLayout>
      <Outlet />
    </TeacherLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Routes */}
        <Route path="/" element={<StudentLayoutWrapper />}>
          <Route path="dashboard" element={<Index />} />
          <Route path="subject/:subjectId" element={<SubjectPage />} />
          <Route path="exam/:examId" element={<ExamPage />} />
          <Route path="exam/:examId/instructions" element={<ExamInstructionsPage />} />
          <Route path="exam/:examId/results" element={<ExamResultsPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="live-quiz/:quizId" element={<LiveQuizPage />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayoutWrapper />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="schedule" element={<TeacherSchedulePage />} />
          <Route path="schedule/create" element={<CreateClassPage />} />
          <Route path="schedule/assign/:scheduleId" element={<AssignLMSNotesPage />} />
          <Route path="schedule/edit/:scheduleId" element={<EditSchedulePage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="notifications" element={<TeacherNotificationsPage />} />
          
          {/* Question Bank Routes */}
          <Route path="question-bank" element={<QuestionBankPage />} />
          <Route path="question-bank/add" element={<QuestionBankAddPage />} />
          <Route path="question-bank/:subjectId" element={<QuestionBankViewPage />} />

          {/* Directory Route - Fixed */}
          <Route path="directory" element={<DirectoryPage />} />

          {/* Instructions Route - Alias for convenience */}
          <Route path="instructions" element={<Navigate to="/teacher/exams/instructions" replace />} />

          {/* Reports Routes - Enhanced */}
          <Route path="reports" element={<ReportsMainPage />} />
          <Route path="reports/attendance" element={<AttendancePage />} />
          <Route path="reports/batch" element={<BatchReportsPage />} />
          <Route path="reports/batch/:batchId/exam/:examId" element={<DetailedExamReportPage />} />

          {/* Batches */}
          <Route path="batches" element={<BatchListingPage />} />
          <Route path="batches/add" element={<AddBatchPage />} />
          <Route path="batches/:batchId/students" element={<ViewStudentsPage />} />
          <Route path="batches/:batchId/assign-lms" element={<AssignLMSPage />} />
          <Route path="batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />

          {/* Exams */}
          <Route path="exams" element={<ExamsMainPage />} />
          <Route path="exams/create" element={<CreateExamPage />} />
          <Route path="exams/:examId/edit" element={<EditExamPage />} />
          <Route path="exams/:examId/update-questions" element={<UpdateQuestionsPage />} />
          <Route path="exams/:examId/update-batches" element={<UpdateBatchesPage />} />
          <Route path="exams/directory" element={<DirectoryPage />} />
          <Route path="exams/instructions" element={<InstructionsPage />} />
          <Route path="exams/instructions/create" element={<CreateInstructionPage />} />
          <Route path="exams/instructions/:instructionId/edit" element={<EditInstructionPage />} />

          {/* LMS Routes - Enhanced */}
          <Route path="lms" element={<LMSMainPage />} />
          <Route path="lms/content" element={<LMSContentPage />} />
          <Route path="lms/content/create" element={<CreateLMSContentPage />} />
          <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
          <Route path="lms/library" element={<ContentLibraryPage />} />
          <Route path="lms/series" element={<LMSSeriesPage />} />
          <Route path="lms/series/create" element={<CreateLMSSeriesPage />} />
          <Route path="lms/series/:seriesId/update" element={<UpdateLMSSeriesPage />} />
          <Route path="lms/series/:seriesId/update-order" element={<UpdateExamOrderPage />} />
          <Route path="lms/series/:seriesId/preview" element={<LMSSeriesPreviewPage />} />
          <Route path="lms/notes" element={<NotesPage />} />
          <Route path="lms/notes/create" element={<CreateNotesPage />} />
          <Route path="lms/directory" element={<LMSDirectoryPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
