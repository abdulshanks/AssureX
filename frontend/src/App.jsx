import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NewClaim from './pages/NewClaim';
import ClaimResult from './pages/ClaimResult';
import ClaimHistory from './pages/ClaimHistory';
import Dashboard from './pages/Dashboard';
import ReviewDashboard from './pages/ReviewDashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />
      <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-claim" element={<NewClaim />} />
            <Route path="/claim-result" element={<ClaimResult />} />
            <Route path="/claim-history" element={<ClaimHistory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/review-dashboard" element={<ReviewDashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}