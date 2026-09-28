import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        ASSUREX
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-claim" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            New Claim
          </NavLink>
        </li>
        <li>
          <NavLink to="/claim-history" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Claim History
          </NavLink>
        </li>
        <li>
          <NavLink to="/review-dashboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Review Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Reports
          </NavLink>
        </li>
      </ul>

      <button className="btn-outline" onClick={() => navigate('/login')}>
        Member Login
      </button>
    </nav>
  );
}