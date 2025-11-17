import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CuratedResources from './pages/CuratedResources';
import CodingPractice from './pages/CodingPractice';
import ProgressTracking from './pages/ProgressTracking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/resources" element={<CuratedResources />} />
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/progress" element={<ProgressTracking />} />
      </Routes>
    </Router>
  );
}

export default App;