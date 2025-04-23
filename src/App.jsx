import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import GradeCalculatorPage from './components/GradeCalculatorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/grade-calculator" element={<GradeCalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
