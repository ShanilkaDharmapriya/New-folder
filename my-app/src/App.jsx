import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JournalPage from './pages/JournalPage';
import UpliftMe from './pages/UpLift';
import SupportWall from './pages/Feed';
import DailySchedule from './pages/DailySchedule';
import './styles/journal.css';
import './styles/uplift.css';
import './styles/feed.css';
import './styles/dailyschedule.css';


function App() {
  return (
    <Router>
      <div className="app-layout">
        <nav className="nav-links">
          <Link to="/journal">📖 Journal</Link>
          <Link to="/uplift">🌟 Uplift Me</Link>
          <Link to="/Feed">Feed</Link>
          <Link to="/DailySchedule">DailySchedule</Link>
        </nav>

        <Routes>
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/uplift" element={<UpliftMe />} />
          <Route path="*" element={<JournalPage />} />
          <Route path="/Feed" element={<SupportWall/>}/>
          <Route path="/DailySchedule" element={<DailySchedule/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
