import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please choose a password.');
      return;
    }
    setError('');
    navigate('/login');
  };

  return (
    <div className="view-fade-in grid-2-col" style={{ alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
      {/* Left Column: Sign Up Form */}
      <div className="data-card" style={{ padding: '2.5rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
          Create account
        </h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Sign up to process claims and track warranty coverage online.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              required 
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>Email or Username</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member01@assurex.com"
              required 
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ paddingRight: '2.5rem' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: '1rem'
                }}
              >
                👁
              </button>
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-red)', fontSize: '0.875rem', marginBottom: '1.25rem', fontWeight: '600' }}>
              <span style={{ background: 'var(--status-red)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>!</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary full-width" 
            style={{ 
              borderRadius: '8px', 
              padding: '0.85rem', 
              fontSize: '1rem',
              fontWeight: '700',
              marginTop: '0.5rem' 
            }}
          >
            Create account &rarr;
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--primary-teal)', fontWeight: '700', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
      </div>

      {/* Right Column: Feature Highlights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e6f2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            📄
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Submit claims</h3>
            <p className="text-muted text-sm">Upload your receipt and tell us what happened.</p>
          </div>
        </div>

        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e6f2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            🔍
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Review flagged cases</h3>
            <p className="text-muted text-sm">We may review some claims if more information is needed.</p>
          </div>
        </div>

        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e6f2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            📊
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Track decisions</h3>
            <p className="text-muted text-sm">See your claim outcome and next steps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}