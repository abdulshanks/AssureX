import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ClaimResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const claimData = location.state || {
    product: 'iPhone 13 - Serial: [XXXX]',
    fileName: 'Receipt_Sample.pdf',
  };

  return (
    <div className="view-fade-in grid-2-col">
      {/* AI Verification Match Card */}
      <div className="data-card">
        <h3>AI Verification Result</h3>
        <div className="badge badge-valid margin-top-md margin-bottom-md">
          ✓ Valid Claim (95% match)
        </div>

        <p className="text-muted text-sm margin-bottom-md">
          A matching policy and receipt purchase history was found.
        </p>

        <div className="info-list">
          <div className="info-row"><strong>Product:</strong> {claimData.product}</div>
          <div className="info-row"><strong>Purchase Date:</strong> Jun 19, 2022</div>
          <div className="info-row"><strong>State Code:</strong> 1233558</div>
          <div className="info-row"><strong>Warranty Status:</strong> Active Coverage</div>
        </div>

        <div className="flex-gap margin-top-md">
          <button className="btn-primary" onClick={() => navigate('/claim-history')}>
            View History
          </button>
          <button className="btn-outline" onClick={() => navigate('/new-claim')}>
            Start Another Claim
          </button>
        </div>
      </div>

      {/* Summary Side Card */}
      <div className="data-card">
        <h3>Receipt Breakdown</h3>
        <div className="info-list margin-top-md">
          <div className="info-row"><strong>Uploaded File:</strong> {claimData.fileName}</div>
          <div className="info-row"><strong>OCR Confidence:</strong> High (98.2%)</div>
          <div className="info-row"><strong>Extracted Amount:</strong> $999.00</div>
        </div>
      </div>
    </div>
  );
}