
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import SubjectPage from "./pages/SubjectPage";
import ExamInstructionsPage from "./pages/ExamInstructionsPage";
import ExamPage from "./pages/ExamPage";
import ExamResultsPage from "./pages/ExamResultsPage";
import AnalysisPage from "./pages/AnalysisPage";
import NotFound from "./pages/NotFound";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SchedulePage from "./pages/SchedulePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/subject/:subjectId/exam/:examId/instructions" element={<ExamInstructionsPage />} />
            <Route path="/subject/:subjectId/exam/:examId" element={<ExamPage />} />
            <Route path="/subject/:subjectId/exam/:examId/results" element={<ExamResultsPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
