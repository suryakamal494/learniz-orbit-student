import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailsPage from './pages/CourseDetailsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import CheckoutPage from './pages/CheckoutPage'
import Error404Page from './pages/Error404Page'
import Error500Page from './pages/Error500Page'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import FAQPage from './pages/FAQPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ComingSoonPage from './pages/ComingSoonPage'
import MaintenancePage from './pages/MaintenancePage'

// Teacher LMS imports
import LMSSeriesPage from '@/pages/teacher/lms/LMSSeriesPage'
import CreateLMSSeriesPage from '@/pages/teacher/lms/CreateLMSSeriesPage'
import NotesManagementPage from '@/pages/teacher/lms/NotesManagementPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/404" element={<Error404Page />} />
          <Route path="/500" element={<Error500Page />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          
          {/* Teacher LMS Routes */}
          <Route path="/teacher/lms/series" element={<LMSSeriesPage />} />
          <Route path="/teacher/lms/series/create" element={<CreateLMSSeriesPage />} />
          <Route path="/teacher/lms/notes" element={<NotesManagementPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
