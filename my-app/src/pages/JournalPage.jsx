import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/journal.css';
import Layout from '../components/Layout';
import '../styles/dashboard.css';

const JournalPage = () => {
  const [type, setType] = useState('journal');
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);

  const userId = 'user123';

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/journals/${userId}`);
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/journals`, {
        userId,
        type,
        content,
      });
      setContent('');
      fetchEntries();
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <Layout>
    <div className="page-container">
      <div className="entry-section">
        <h2 className="entry-heading">
          {type === 'gratitude' ? '🙏 Gratitude Diary' : '📝 Personal Journal'}
        </h2>

        <div className="entry-toggle">
          <button
            className={`entry-toggle-button ${type === 'journal' ? 'active' : ''}`}
            onClick={() => setType('journal')}
          >
            Journal
          </button>
          <button
            className={`entry-toggle-button ${type === 'gratitude' ? 'active' : ''}`}
            onClick={() => setType('gratitude')}
          >
            Gratitude
          </button>
        </div>

        <form className="entry-form" onSubmit={handleSubmit}>
          <textarea
            rows={5}
            placeholder={`Write your ${type} entry...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" className="entry-submit-button">
            Save Entry
          </button>
        </form>
      </div>

      <div className="entry-past-section">
        <h3 className="entry-subheading">📚 Your Past Entries</h3>
        {entries.length === 0 ? (
          <p className="entry-empty">You haven’t written anything yet today. 🌱</p>
        ) : (
          <div className="entry-cards-container">
            {entries.map((entry) => (
              <div key={entry._id} className="entry-card">
                <div>
                  <p className="entry-date">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <p className="entry-text">
                    {entry.content.length > 160
                      ? entry.content.slice(0, 160) + '...'
                      : entry.content}
                  </p>
                </div>
                <span className="entry-type-label">{entry.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default JournalPage;
