import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/dashboard.css';
import brain1 from '../assets/brain1.svg.png';
import brain2 from '../assets/brain2.svg.png';

const UserDashboard = () => {
  const navigate = useNavigate();
  const brainImages = [brain1, brain2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % brainImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="welcome-text">Welcome back, Friend!</h1>
          <button className="profile-btn">👤 View Profile</button>
        </div>

        <div className="dashboard-brain-card">
          <img
            src={brainImages[currentImageIndex]}
            alt="Brain"
            className="brain-img rounded-full transition-all duration-500 ease-in-out"
          />
          <div className="tip-text">
            <h2 className="tip-heading">Tip of the Day</h2>
            <p className="tip-sub">Drink a glass of water every 2 hours 💧</p>
            <p className="quote">“You are doing enough. Be proud of yourself.”</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="action-btn journal" onClick={() => navigate('/Feed')}>
            📖 Journal Now
          </button>
          <button className="action-btn uplift" onClick={() => navigate('/Uplift')}>
            🌟 Get Uplifted
          </button>
          <button className="action-btn support" onClick={() => navigate('/Feed')}>
            💬 Support Wall
          </button>
          <button className="action-btn routine" onClick={() => navigate('/DailySchedule')}>
            🧘 My Routines
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
