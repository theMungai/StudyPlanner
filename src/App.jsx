import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import GradeCalculatorPage from './components/GradeCalculatorPage';
import Assignment from './components/Assignment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/grade-calculator" element={<GradeCalculatorPage />} />
        <Route path="/assignments" element={<Assignment />} />
      </Routes>
    </Router>
  );
}

export default App;
