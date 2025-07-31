
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "@/components/layout/AppLayout";
import { TeacherLayout } from "@/components/teacher/layout/TeacherLayout";
import Index from "./pages/Index";
import SubjectPage from "./pages/SubjectPage";
import ExamInstructionsPage from "./pages/ExamInstructionsPage";
import ExamPage from "./pages/ExamPage";
import ExamResultsPage from "./pages/ExamResultsPage";
import LiveQuizPage from "./pages/LiveQuizPage";
import AnalysisPage from "./pages/AnalysisPage";
import NotFound from "./pages/NotFound";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import TeacherDashboardPage from "./pages/teacher/TeacherDashboard";
import TeacherMessagesPage from "./pages/teacher/TeacherMessagesPage";
import TeacherNotificationsPage from "./pages/teacher/TeacherNotificationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default root redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Login page - standalone */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Routes that need full screen (exams, quizzes) */}
            <Route path="/subject/:subjectId/exam/:examId/instructions" element={<ExamInstructionsPage />} />
            <Route path="/subject/:subjectId/exam/:examId" element={<ExamPage />} />
            <Route path="/subject/:subjectId/exam/:examId/results" element={<ExamResultsPage />} />
            <Route path="/subject/:subjectId/live-quiz/:quizId" element={<LiveQuizPage />} />
            
            {/* Student routes with global layout (sidebar) */}
            <Route path="/dashboard" element={
              <AppLayout>
                <Index />
              </AppLayout>
            } />
            <Route path="/subject/:subjectId" element={
              <AppLayout>
                <SubjectPage />
              </AppLayout>
            } />
            <Route path="/analysis" element={
              <AppLayout>
                <AnalysisPage />
              </AppLayout>
            } />
            <Route path="/schedule" element={
              <AppLayout>
                <SchedulePage />
              </AppLayout>
            } />
            <Route path="/messages" element={
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            } />
            <Route path="/notifications" element={
              <AppLayout>
                <NotificationsPage />
              </AppLayout>
            } />

            {/* Teacher routes with teacher layout */}
            <Route path="/teacher/dashboard" element={
              <TeacherLayout>
                <TeacherDashboardPage />
              </TeacherLayout>
            } />
            <Route path="/teacher/messages" element={
              <TeacherLayout>
                <TeacherMessagesPage />
              </TeacherLayout>
            } />
            <Route path="/teacher/notifications" element={
              <TeacherLayout>
                <TeacherNotificationsPage />
              </TeacherLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
