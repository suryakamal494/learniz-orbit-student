
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import LoginPage from './pages/LoginPage'
import { TeacherLayout } from './components/teacher/layout/TeacherLayout'
import LMSSeriesPage from './pages/teacher/lms/LMSSeriesPage'
import LMSContentPage from './pages/teacher/lms/LMSContentPage'
import CreateLMSSeriesFormPage from './pages/teacher/lms/CreateLMSSeriesFormPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Teacher routes */}
          <Route path="/teacher" element={<TeacherLayout children={<div>Teacher Dashboard</div>} />}>
            <Route path="lms/series" element={<LMSSeriesPage />} />
            <Route path="lms/series/create" element={<CreateLMSSeriesFormPage />} />
            <Route path="lms/content" element={<LMSContentPage />} />
          </Route>

          {/* Default route */}
          <Route path="/" element={<LoginPage />} />

          {/* Fallback route */}
          <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-xl">Page not found</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
