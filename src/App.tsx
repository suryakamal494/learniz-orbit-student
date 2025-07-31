import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { TeacherLayout } from '@/layouts/TeacherLayout'
import { StudentLayout } from '@/layouts/StudentLayout'
import { useAuth } from '@/contexts/AuthContext'
import Loading from '@/components/Loading'

// Pages - Auth
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'

// Pages - Main
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import PricingPage from '@/pages/PricingPage'
import TermsPage from '@/pages/TermsPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Pages - Teacher
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import TeacherMessagesPage from '@/pages/teacher/TeacherMessagesPage'
import TeacherNotificationsPage from '@/pages/teacher/TeacherNotificationsPage'

// Pages - Student
import StudentDashboard from '@/pages/student/StudentDashboard'
import StudentMessagesPage from '@/pages/student/StudentMessagesPage'
import StudentNotificationsPage from '@/pages/student/StudentNotificationsPage'

// Pages - Exams
import ExamsMainPage from '@/pages/exams/ExamsMainPage'
import InstructionsPage from '@/pages/exams/InstructionsPage'
import DirectoryPage from '@/pages/exams/DirectoryPage'

// Pages - Teacher Exams
import CreateExamPage from '@/pages/teacher/exams/CreateExamPage'
import QuestionBankMainPage from '@/pages/teacher/exams/QuestionBankMainPage'
import QuestionBankViewPage from '@/pages/teacher/exams/QuestionBankViewPage'
import QuestionBankAddPage from '@/pages/teacher/exams/QuestionBankAddPage'
import CreateInstructionPage from '@/pages/teacher/exams/CreateInstructionPage'
import EditInstructionPage from '@/pages/teacher/exams/EditInstructionPage'
import UpdateQuestionsPage from '@/pages/teacher/exams/UpdateQuestionsPage'

const App: React.FC = () => {
  const { isLoggedIn, userRole } = useAuth()

  const PrivateRoute = ({
    children,
    requiredRole
  }: {
    children: React.ReactNode
    requiredRole?: string
  }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />
    }

    return children
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Main Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="unauthorized" element={<NotFoundPage />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="messages" element={<TeacherMessagesPage />} />
            <Route path="notifications" element={<TeacherNotificationsPage />} />
            
            {/* Exams Routes */}
            <Route path="exams" element={<ExamsMainPage />} />
            <Route path="exams/create" element={<CreateExamPage />} />
            <Route path="exams/update-questions/:examId" element={<UpdateQuestionsPage />} />
            <Route path="exams/question-bank" element={<QuestionBankMainPage />} />
            <Route path="exams/question-bank/view/:subjectId" element={<QuestionBankViewPage />} />
            <Route path="exams/question-bank/add/:subjectId" element={<QuestionBankAddPage />} />
            <Route path="exams/instructions" element={<InstructionsPage />} />
            <Route path="exams/instructions/create" element={<CreateInstructionPage />} />
            <Route path="exams/instructions/edit/:id" element={<EditInstructionPage />} />
            <Route path="exams/directory" element={<DirectoryPage />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="messages" element={<StudentMessagesPage />} />
            <Route path="notifications" element={<StudentNotificationsPage />} />
          </Route>

          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
