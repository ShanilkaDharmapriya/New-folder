import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="nav-item" onClick={() => navigate('/Feed')}>Support Wall</button>
          <button className="nav-item" onClick={() => navigate('/journal')}>Journal</button>
          <button className="nav-item" onClick={() => navigate('/DailySchedule')}>My Routines</button>
          <button className="nav-item" onClick={() => navigate('/uplift')}>Uplifter</button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>🔴 Logout</button>
      </aside>

      {/* Main Page Content */}
      <main className="dashboard-page">
        {children}
      </main>
    </div>
  );
};

export default Layout;
