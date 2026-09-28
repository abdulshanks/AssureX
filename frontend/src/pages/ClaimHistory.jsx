import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClaimHistory() {
  const navigate = useNavigate();

  const claims = [
    { id: 'Claim 07', item: 'iPhone 13 - [XXXX]', date: 'Jan 11, 2022', status: 'Valid Claim', type: 'valid' },
    { id: 'Claim 08', item: 'iPhone 13 - [XXXX]', date: 'Jan 11, 2022', status: 'Invalid', type: 'invalid' },
    { id: 'Claim 09', item: 'iPhone 13 - [XXXX]', date: 'Jun 11, 2022', status: 'Valid Claim', type: 'valid' },
    { id: 'Claim 01', item: 'Dell XPS 15 - [XXXX]', date: 'Jan 11, 2022', status: 'Manual Review', type: 'review' },
    { id: 'Claim 02', item: 'Dell XPS 15 - [XXXX]', date: 'Jan 11, 2022', status: 'Manual Review', type: 'review' },
    { id: 'Claim 03', item: 'Dell XPS 15 - [XXXX]', date: 'Jan 11, 2022', status: 'Valid Claim', type: 'valid' },
  ];

  return (
    <div className="view-fade-in data-card">
      <div className="flex-between margin-bottom-md">
        <h2>Claim History</h2>
        <button className="btn-primary" onClick={() => navigate('/new-claim')}>
          + New Claim
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Item</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.id}</strong></td>
                <td>{row.item}</td>
                <td>{row.date}</td>
                <td>
                  <span className={`badge badge-${row.type}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}