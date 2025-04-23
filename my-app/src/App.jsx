import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import JournalPage from './pages/JournalPage';
import UpliftMe from './pages/UpLift';
import SupportWall from './pages/Feed';
import DailySchedule from './pages/DailySchedule';
import UserDashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminActivity from './pages/AdminActivity';
import AdminModeration from './pages/AdminModeration';
import ProtectedRoute from './ProtectedRoute';

import './styles/auth.css';
import './styles/journal.css';
import './styles/uplift.css';
import './styles/feed.css';
import './styles/dailyschedule.css';
import './styles/dashboard.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (User Only) */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/journal" element={
            <ProtectedRoute allowedRoles={['user']}>
              <JournalPage />
            </ProtectedRoute>
          } />
          <Route path="/uplift" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UpliftMe />
            </ProtectedRoute>
          } />
          <Route path="/Feed" element={
            <ProtectedRoute allowedRoles={['user']}>
              <SupportWall />
            </ProtectedRoute>
          } />
          <Route path="/DailySchedule" element={
            <ProtectedRoute allowedRoles={['user']}>
              <DailySchedule />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/activity" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminActivity />
            </ProtectedRoute>
          } />
          <Route path="/admin/moderation" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminModeration />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
