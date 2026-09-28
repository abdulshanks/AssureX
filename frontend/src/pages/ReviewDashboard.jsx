import React from 'react';

export default function ReviewDashboard() {
  return (
    <div className="view-fade-in grid-2-col">
      {/* Pending Items List */}
      <div className="data-card">
        <h2>Flagged Claims for Review</h2>
        <p className="text-muted text-sm margin-bottom-md">
          Items flagged for auditor verification.
        </p>
        
        <div className="status-list">
          <div className="status-row">
            <div>
              <strong>Claim #01 - Dell XPS 15</strong>
              <div className="text-muted text-sm">Flag: Receipt amount mismatch</div>
            </div>
            <span className="badge badge-review">Review</span>
          </div>

          <div className="status-row">
            <div>
              <strong>Claim #02 - Dell XPS 15</strong>
              <div className="text-muted text-sm">Flag: Image blur detected</div>
            </div>
            <span className="badge badge-review">Review</span>
          </div>
        </div>
      </div>

      {/* Audit Action Panel */}
      <div className="data-card">
        <h2>Auditor Decision</h2>
        <div className="info-list margin-top-md">
          <div className="info-row"><strong>Purchase Date:</strong> Jun 19, 2022</div>
          <div className="info-row"><strong>Item Name:</strong> iPhone 13</div>
          <div className="info-row"><strong>Product Code:</strong> 1233558</div>
          <div className="info-row"><strong>Warranty Coverage:</strong> Unconfirmed</div>
        </div>

        <div className="flex-gap margin-top-md">
          <button className="btn-primary" style={{ backgroundColor: 'var(--status-green)', flex: 1 }}>
            Approval
          </button>
          <button className="btn-primary" style={{ backgroundColor: 'var(--status-red)', flex: 1 }}>
            Denial
          </button>
        </div>
      </div>
    </div>
  );
}