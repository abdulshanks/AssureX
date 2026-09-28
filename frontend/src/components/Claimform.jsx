import React, { useState } from 'react';

export default function Claimform({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('iPhone 13 - Serial: [XXXX]');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ product: selectedProduct, file });
    }
  };

  return (
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
          onChange={handleFileChange}
          required 
        />
      </div>

      <button type="submit" className="btn-primary full-width" disabled={loading}>
        {loading ? 'Processing Receipt...' : 'Evaluate Receipt \u203A'}
      </button>
    </form>
  );
}