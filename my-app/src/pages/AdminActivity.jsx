import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const AdminActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/activity', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setData(res.data);
    }).catch(err => {
      console.error('Failed to fetch activity stats:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="dashboard-page">Loading...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">📊 Activity Overview</h2>
        <p className="dashboard-subtext">Monitor what’s happening across the platform today</p>

        <div className="dashboard-cards">
          <div className="admin-card"><div className="card-icon">💬</div><div><p className="card-value">{data.postsToday}</p><p className="card-label">Posts Today</p></div></div>
          <div className="admin-card"><div className="card-icon">📓</div><div><p className="card-value">{data.journalsToday}</p><p className="card-label">Journal Entries</p></div></div>
          <div className="admin-card"><div className="card-icon">🧘</div><div><p className="card-value">{data.routinesToday}</p><p className="card-label">Routines Done</p></div></div>
          <div className="admin-card"><div className="card-icon">🕒</div><div><p className="card-value">{data.loginsLast24h}</p><p className="card-label">Logins (24h)</p></div></div>
        </div>
      </div>
    </div>
  );
};

export default AdminActivity;


