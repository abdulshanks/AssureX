import React from 'react';

export default function Reports() {
  return (
    <div className="view-fade-in grid-2-col">
      <div className="data-card">
        <h2>Claim Volume Trends</h2>
        <p className="text-muted text-sm">Monthly overall warranty submissions.</p>
        <div className="chart-placeholder">
          📊 [ Volume Chart Visualizer ]
        </div>
      </div>

      <div className="data-card">
        <h2>Model Metrics</h2>
        <p className="text-muted text-sm">AI verification confidence breakdown.</p>
        <div className="chart-placeholder">
          📈 [ Model Metrics Visualizer ]
        </div>
      </div>
    </div>
  );
}