import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMessagesPage from './pages/student/StudentMessagesPage';
import StudentNotificationsPage from './pages/student/StudentNotificationsPage';
import SchedulePage from './pages/SchedulePage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage';
import BatchListingPage from './pages/teacher/batches/BatchListingPage';
import AddBatchPage from './pages/teacher/batches/AddBatchPage';
import ViewStudentsPage from './pages/teacher/batches/ViewStudentsPage';
import AssignLMSPage from './pages/teacher/batches/AssignLMSPage';
import BatchNotesAssignmentPage from './pages/teacher/batches/BatchNotesAssignmentPage';
import QuestionBankMainPage from './pages/teacher/question-bank/QuestionBankMainPage';
import QuestionBankAddPage from './pages/teacher/question-bank/QuestionBankAddPage';
import QuestionBankViewPage from './pages/teacher/question-bank/QuestionBankViewPage';
import ExamsMainPage from './pages/teacher/exams/ExamsMainPage';
import CreateExamPage from './pages/teacher/exams/CreateExamPage';
import EditExamPage from './pages/teacher/exams/EditExamPage';
import UpdateQuestionsPage from './pages/teacher/exams/UpdateQuestionsPage';
import UpdateBatchesPage from './pages/teacher/exams/UpdateBatchesPage';
import DirectoryPage from './pages/teacher/exams/DirectoryPage';
import InstructionsPage from './pages/teacher/instructions/InstructionsPage';
import CreateInstructionPage from './pages/teacher/instructions/CreateInstructionPage';
import EditInstructionPage from './pages/teacher/instructions/EditInstructionPage';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
        
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="messages" element={<StudentMessagesPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="notifications" element={<TeacherNotificationsPage />} />
          <Route path="schedule" element={<TeacherSchedulePage />} />
          
          {/* Batch Management Routes */}
          <Route path="batches" element={<BatchListingPage />} />
          <Route path="batches/add" element={<AddBatchPage />} />
          <Route path="batches/:batchId/students" element={<ViewStudentsPage />} />
          <Route path="batches/:batchId/assign-lms" element={<AssignLMSPage />} />
          <Route path="batches/:batchId/assign-notes" element={<BatchNotesAssignmentPage />} />

          {/* Question Bank Routes */}
          <Route path="question-bank" element={<QuestionBankMainPage />} />
          <Route path="question-bank/add" element={<QuestionBankAddPage />} />
          <Route path="question-bank/view/:questionId" element={<QuestionBankViewPage />} />

          {/* Exam Management Routes */}
          <Route path="exams" element={<ExamsMainPage />} />
          <Route path="exams/create" element={<CreateExamPage />} />
          <Route path="exams/:examId/edit" element={<EditExamPage />} />
          <Route path="exams/:examId/update-questions" element={<UpdateQuestionsPage />} />
          <Route path="exams/:examId/update-batches" element={<UpdateBatchesPage />} />
          <Route path="exams/directory" element={<DirectoryPage />} />

          {/* Instructions Routes */}
          <Route path="instructions" element={<InstructionsPage />} />
          <Route path="instructions/create" element={<CreateInstructionPage />} />
          <Route path="instructions/:id/edit" element={<EditInstructionPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
