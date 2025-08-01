import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import StudentLayout from './layouts/StudentLayout'
import TeacherLayout from './layouts/TeacherLayout'
import RequireAuth from './components/auth/RequireAuth'
import UnauthorizedPage from './pages/UnauthorizedPage'
import AdminPage from './pages/AdminPage'
import StudentDashboardPage from './pages/student/StudentDashboardPage'
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage'
import NotesManagementPage from './pages/teacher/NotesManagementPage'
import LMSSeriesPage from './pages/teacher/lms/LMSSeriesPage'
import LMSContentPage from './pages/teacher/lms/LMSContentPage'
import CreateLMSSeriesFormPage from './pages/teacher/lms/CreateLMSSeriesFormPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Student routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={
              <RequireAuth allowedRoles={['Student']}>
                <StudentDashboardPage />
              </RequireAuth>
            } />
            {/* Add more student routes here */}
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <RequireAuth allowedRoles={['Admin']}>
              <AdminPage />
            </RequireAuth>
          } />
          
          {/* Teacher routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={
              <RequireAuth allowedRoles={['Teacher']}>
                <TeacherDashboardPage />
              </RequireAuth>
            } />
            <Route path="notes" element={<NotesManagementPage />} />
            <Route path="lms/series" element={<LMSSeriesPage />} />
            <Route path="lms/series/create" element={<CreateLMSSeriesFormPage />} />
            <Route path="lms/content" element={<LMSContentPage />} />
            {/* Add more teacher routes here */}
          </Route>

          {/* Public routes */}
          <Route path="/" element={<HomePage />} />

          {/* Fallback route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
