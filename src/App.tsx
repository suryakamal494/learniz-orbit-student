import { QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainLayout from "./layouts/MainLayout"
import { routes } from "./routes"
import { cn } from "./lib/utils"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { queryClient } from "./lib/react-query"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "./pages/auth/ResetPasswordPage"
import VerifyEmailPage from "./pages/auth/VerifyEmailPage"
import TeacherLayout from "./layouts/TeacherLayout"
import TeacherDashboardPage from "./pages/teacher/TeacherDashboardPage"
import LMSContentPage from "./pages/teacher/lms/LMSContentPage"
import ViewLMSContentPage from "./pages/teacher/lms/content/ViewLMSContentPage"
import ContentLibraryPage from "./pages/teacher/lms/content/ContentLibraryPage"
import CreateLMSContentPage from "./pages/teacher/lms/content/CreateLMSContentPage"
import EditLMSContentPage from '@/pages/teacher/lms/content/EditLMSContentPage'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
          </Route>

          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Route>

          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />

            <Route path="lms/content" element={<LMSContentPage />} />
            <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
            <Route path="lms/content/library" element={<ContentLibraryPage />} />
            <Route path="lms/content/create" element={<CreateLMSContentPage />} />
          </Route>
          <Route path="/teacher/lms/content/:contentId/edit" element={<EditLMSContentPage />} />
        </Routes>
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
