
import { QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { cn } from "./lib/utils"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { queryClient } from "./lib/react-query"
import { TeacherLayout } from "./components/teacher/layout/TeacherLayout"
import TeacherDashboardPage from "./pages/teacher/TeacherDashboard"
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
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />

            <Route path="lms/content" element={<LMSContentPage />} />
            <Route path="lms/content/:contentId/view" element={<ViewLMSContentPage />} />
            <Route path="lms/content/library" element={<ContentLibraryPage />} />
            <Route path="lms/content/create" element={<CreateLMSContentPage />} />
            <Route path="lms/content/:contentId/edit" element={<EditLMSContentPage />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
