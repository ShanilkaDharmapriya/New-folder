import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/upLift.css';
import Layout from '../components/Layout';

const quotes = [
  "You are stronger than you think.",
  "Every day is a fresh start. 🌞",
  "Your presence matters. You matter. 💚",
  "Take a deep breath, you are doing okay.",
  "Progress is progress, no matter how small."
];

const UpliftMe = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [supportType, setSupportType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const requestSupport = async (type) => {
    setSupportType(type);
    setShowConfirmation(true);
    try {
      await axios.post('http://localhost:5000/api/support-request', {
        userId: 'user123',
        type,
      });
    } catch (error) {
      console.error('Error sending support request:', error);
    }
  };

  return (
    <Layout>
    <div className="uplift-page">
      <div className="uplift-section">
        <h2 className="uplift-heading">🌟 Uplift Me</h2>
        <div className="quote-carousel">
          <p className="quote-text">{quotes[currentQuote]}</p>
        </div>
      </div>

      <div className="support-section">
        <h3 className="support-heading">Need Someone Right Now?</h3>
        <div className="support-buttons">
          <button className="support-btn" onClick={() => requestSupport('doctor')}>Contact Doctor</button>
          <button className="support-btn" onClick={() => requestSupport('expert')}>Contact Expert</button>
          <button className="support-btn" onClick={() => requestSupport('admin')}>Contact Admin</button>
        </div>
        {showConfirmation && (
          <p className="support-confirm">✅ Support request sent to a {supportType}.</p>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default UpliftMe;
