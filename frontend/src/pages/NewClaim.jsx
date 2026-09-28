import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewClaim() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('iPhone 13 - Serial: [XXXX]');

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass evaluation payload to ClaimResult view
    navigate('/claim-result', {
      state: {
        product: selectedProduct,
        fileName: file ? file.name : 'Receipt.pdf',
      },
    });
  };

  return (
    <div className="view-fade-in data-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Submit New Claim</h2>
      <p className="text-muted text-sm margin-bottom-md">
        Choose your registered device and upload a receipt to start verification.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Choose Registered Product</label>
          <select 
            className="form-control"
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option>iPhone 13 - Serial: [XXXX]</option>
            <option>Dell XPS 15 - Serial: [XXXX]</option>
            <option>MacBook Pro 16 - Serial: [XXXX]</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Receipt Photo / PDF</label>
          <input 
            type="file" 
            accept="image/*,.pdf" 
            className="form-control"
            onChange={handleFileUpload}
            required 
          />
        </div>

        <button type="submit" className="btn-primary full-width">
          Evaluate Receipt &rsaquo;
        </button>
      </form>
    </div>
  );
}