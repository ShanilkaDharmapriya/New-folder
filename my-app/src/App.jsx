import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JournalPage from './pages/JournalPage';
import UpliftMe from './pages/UpLift';
import './styles/journal.css';
import './styles/uplift.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <nav className="nav-links">
          <Link to="/journal">📖 Journal</Link>
          <Link to="/uplift">🌟 Uplift Me</Link>
        </nav>

        <Routes>
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/uplift" element={<UpliftMe />} />
          <Route path="*" element={<JournalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
