import React, { useState, useEffect } from 'react';
import '../styles/dailyschedule.css';
import dayjs from 'dayjs';
import Layout from '../components/Layout';
import '../styles/dashboard.css';

const dailyRoutines = {
  morning: [
    "Wake up before 7:30 AM",
    "Drink a glass of water",
    "5-minute stretch or light exercise",
    "Write one thing you’re grateful for",
    "No phone for 30 minutes",
    "Plan your top 3 priorities for the day"
  ],
  productivity: [
    "Complete a deep work task",
    "Take a break every 90 mins",
    "Check your progress by midday",
    "Read or learn something new (15 min)",
    "Avoid social media during work hours"
  ],
  evening: [
    "No screens 1 hour before bed",
    "Reflect on your day",
    "Prepare clothes or plan for tomorrow",
    "Sleep before 11 PM"
  ]
};

const generateDateRange = () => {
  const today = dayjs();
  const range = [];
  for (let i = -30; i <= 30; i++) {
    range.push(today.add(i, 'day'));
  }
  return range;
};

const DailySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [completed, setCompleted] = useState({});

  const toggleComplete = (task) => {
    setCompleted(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate]?.includes(task)
        ? prev[selectedDate].filter(t => t !== task)
        : [...(prev[selectedDate] || []), task]
    }));
  };

  const totalTasks = Object.values(dailyRoutines).flat().length;
  const completedCount = completed[selectedDate]?.length || 0;

  return (
    <Layout>
    <div className="schedule-page">
      <div className="schedule-box">
        <h2 className="schedule-heading">📆 Daily Routine Checklist</h2>

        <div className="calendar-strip">
          {generateDateRange().map((date, index) => {
            const formatted = date.format('YYYY-MM-DD');
            const label = date.format('DD MMM');
            return (
              <button
                key={index}
                className={`calendar-day ${formatted === selectedDate ? 'active' : ''}`}
                onClick={() => setSelectedDate(formatted)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p className="progress-text">
          You completed <strong>{completedCount}</strong> / {totalTasks} routines on {dayjs(selectedDate).format('DD MMM YYYY')} 💪
        </p>

        {Object.entries(dailyRoutines).map(([section, tasks]) => (
          <div key={section} className="routine-section">
            <h3 className="routine-title">
              {section === 'morning' && '🌅 Morning Routine'}
              {section === 'productivity' && '🚀 Productivity Goals'}
              {section === 'evening' && '🌙 Evening Wind-Down'}
            </h3>
            <ul className="routine-list">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`routine-item ${completed[selectedDate]?.includes(task) ? 'completed' : ''}`}
                  onClick={() => toggleComplete(task)}
                >
                  <input
                    type="checkbox"
                    checked={completed[selectedDate]?.includes(task) || false}
                    readOnly
                  />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default DailySchedule;
