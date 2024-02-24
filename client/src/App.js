import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/Login';
import SignUpPage from './components/Signup';
import PageDetails from './components/agent';
import './App.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/fbpage" element={<PageDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
