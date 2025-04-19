import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const userName = 'Friend'; // Later replace with actual user name from context
  const completedToday = 5;
  const totalTasks = 15;
  const communityPostsToday = 3;
  const tipOfTheDay = "Drink a glass of water every 2 hours 💧";
  const quote = "You are doing enough. Be proud of yourself.";

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">👋 Welcome back, {userName}!</h2>
        <p className="dashboard-subtext">Today is {new Date().toLocaleDateString()}</p>

        {/* Daily Progress Widget */}
        <div className="dashboard-widget">
          <h3 className="widget-title">📊 Today's Routine Progress</h3>
          <p>{completedToday} / {totalTasks} routines completed 💪</p>
          <button onClick={() => navigate('/schedule')}>Go to My Daily Schedule</button>
        </div>

        {/* Daily Tip & Quote */}
        <div className="dashboard-widget">
          <h3 className="widget-title">💡 Tip of the Day</h3>
          <p className="widget-content">{tipOfTheDay}</p>
          <blockquote className="dashboard-quote">“{quote}”</blockquote>
        </div>

        {/* Community Activity */}
        <div className="dashboard-widget">
          <h3 className="widget-title">🫶 Community Activity</h3>
          <p>{communityPostsToday} new posts in the Support Wall today</p>
          <button onClick={() => navigate('/support')}>Join the Conversation</button>
        </div>

        {/* Quick Links */}
        <div className="dashboard-links">
          <button onClick={() => navigate('/journal')}>📖 Journal Now</button>
          <button onClick={() => navigate('/uplift')}>🌟 Get Uplifted</button>
          <button onClick={() => navigate('/support')}>💬 Post to Support Wall</button>
          <button onClick={() => navigate('/schedule')}>🧘‍♀️ My Routines</button>
          <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
