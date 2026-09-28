import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="view-fade-in grid-3-col">
      <div className="data-card">
        <h3>Total Claims</h3>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--primary-teal)' }}>128</h1>
        <p className="text-muted text-sm">Processed this month</p>
      </div>

      <div className="data-card">
        <h3>Pending Approval</h3>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--status-yellow)' }}>12</h1>
        <p className="text-muted text-sm">Requires manual review</p>
      </div>

      <div className="data-card">
        <h3>Approval Rate</h3>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--status-green)' }}>92.4%</h1>
        <p className="text-muted text-sm">Automated system match</p>
      </div>

      <div className="data-card" style={{ gridColumn: 'span 3' }}>
        <div className="flex-between">
          <h3>Quick Actions</h3>
          <button className="btn-primary" onClick={() => navigate('/review-dashboard')}>
            Open Review Queue &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
}