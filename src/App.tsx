
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TeacherLayout } from './components/teacher/layout/TeacherLayout';
import TeacherDashboardPage from './pages/teacher/TeacherDashboard';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout><div /></TeacherLayout>}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="notifications" element={<TeacherNotificationsPage />} />
          <Route path="schedule" element={<TeacherSchedulePage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<TeacherDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
