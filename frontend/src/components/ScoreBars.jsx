import React from 'react';

export default function ScoreBars({ confidence = 95, matchScore = 88 }) {
  return (
    <div className="score-bars-container" style={{ margin: '1rem 0' }}>
      <div style={{ marginBottom: '0.75rem' }}>
        <div className="flex-between text-sm" style={{ marginBottom: '0.25rem' }}>
          <span><strong>AI Confidence Score</strong></span>
          <span>{confidence}%</span>
        </div>
        <div style={{ background: '#e2e8f0', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${confidence}%`, background: 'var(--primary-teal)', height: '100%' }} />
        </div>
      </div>

      <div>
        <div className="flex-between text-sm" style={{ marginBottom: '0.25rem' }}>
          <span><strong>Policy Match Accuracy</strong></span>
          <span>{matchScore}%</span>
        </div>
        <div style={{ background: '#e2e8f0', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${matchScore}%`, background: 'var(--status-green)', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}