
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JournalPage from './pages/JournalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

<div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
  <JournalPage />
</div>

export default App;
