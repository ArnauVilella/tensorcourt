import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter as Router, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ClubsDirectory from './components/ClubsDirectory';
import StartGame from './components/StartGame';
import MatchDetails from './components/MatchDetails';
import AllMatches from './components/AllMatches';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ManagePlan from './components/ManagePlan';
import FullStats from './components/FullStats';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

import adminProfilePic from './assets/e4f959eb9c7282fb18efbf5a5472f0ee4737b846.jpg';

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem('tennisUser');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem('tennisUser');
  }
  return null;
};

const AppContent = () => {
  const [user, setUser] = useState(getInitialUser);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    if (userData.username === 'admin') {
      userData.profilePicture = adminProfilePic;
    }
    setUser(userData);
    localStorage.setItem('tennisUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tennisUser');
    navigate('/', { replace: true });
  };

  const handlePlanChange = (plan) => {
    const updatedUser = { ...user, plan };
    setUser(updatedUser);
    localStorage.setItem('tennisUser', JSON.stringify(updatedUser));
  };

  const isAuthenticated = user !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route 
          path="/"
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LandingPage />
          } 
        />
        <Route 
          path="/auth" 
          element={<AuthPage onLogin={handleLogin} redirectTo="/dashboard" />}
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        {/* Clubs route - publicly accessible */}
        <Route 
          path="/clubs" 
          element={
            <ClubsDirectory 
              user={isAuthenticated ? user : null} 
              onLogout={isAuthenticated ? handleLogout : null}
              isAuthenticated={isAuthenticated}
            />
          } 
        />
        <Route 
          path="/start-game" 
          element={
            isAuthenticated ? 
            <StartGame user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/match/:id" 
          element={
            isAuthenticated ? 
            <MatchDetails user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/matches" 
          element={
            isAuthenticated ? 
            <AllMatches user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? 
            <Profile user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? 
            <Settings user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/manage-plan" 
          element={
            isAuthenticated ? 
            <ManagePlan user={user} onLogout={handleLogout} onPlanChange={handlePlanChange} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/full-stats" 
          element={
            isAuthenticated ? 
            <FullStats user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        {/* Public pages - accessible to everyone */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {/* Catch-all route for any unmatched paths */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;