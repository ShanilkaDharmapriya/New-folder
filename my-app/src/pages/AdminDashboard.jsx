import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        {/* Hero Section */}
        <div className="admin-hero">
          <h2 className="hero-greeting">👋 Welcome back, Admin</h2>
          <p className="hero-sub">Today is {new Date().toLocaleDateString()}</p>
        </div>

        {/* Stat Cards */}
        <div className="dashboard-cards">
          <div className="admin-card">
            <div className="card-icon">👥</div>
            <div>
              <p className="card-value">120</p>
              <p className="card-label">Total Users</p>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-icon">💬</div>
            <div>
              <p className="card-value">34</p>
              <p className="card-label">Posts Today</p>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-icon">🧘</div>
            <div>
              <p className="card-value">87</p>
              <p className="card-label">Routines Completed</p>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-icon">📈</div>
            <div>
              <p className="card-value">72%</p>
              <p className="card-label">Weekly Active</p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="admin-quick-access">
          <h3 className="quick-access-title">Quick Actions</h3>
          <div className="quick-links">
            <Link to="/admin/users" className="quick-link">👥 Manage Users</Link>
            <Link to="/admin/activity" className="quick-link">📊 View Activity</Link>
            <Link to="/admin/moderation" className="quick-link">🧹 Moderate Posts</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
