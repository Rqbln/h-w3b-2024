import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import QuizzPage from "./pages/QuizzPage";
import RankingPage from "./pages/RankingPage";
import PrivacyPage from "./pages/PrivacyPage";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/quizz" element={<QuizzPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/ranking" element={<RankingPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
        </Router>
    );
}

export default App;
