import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Simulated Auth State (Replace with your actual Auth Context / Hook)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Search & FAQ Interactive States
  const [searchBrand, setSearchBrand] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // ---------------------------------------------------------------------------
  // 1. SIGNED-OUT VIEW (High-Converting Public Landing Page)
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="landing-container" style={{ backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        {/* Navigation Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', sticky: 'top' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            ASSURE<span style={{ color: '#0d9488' }}>X</span>
          </div>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '500', fontSize: '0.95rem' }}>
            
          </nav>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => setIsAuthenticated(true)} 
              style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer' }}
            >
              Demo Logged In
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={{ padding: '0.5rem 1.25rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', backgroundColor: '#fff', fontWeight: '600', cursor: 'pointer' }}
            >
              Member Login
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{ padding: '4rem 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', maxWidth: '1280px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.35rem 0.85rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              <span>SMART WARRANTY CLAIM ASSESSMENT</span>
            </div>
            <h1 style={{ fontSize: '3.25rem', fontWeight: '800', lineHeight: '1.1', color: '#0f172a', marginBottom: '1.25rem', letterSpacing: '-1px' }}>
              Warranty claims,<br />made clearer.
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '500px' }}>
              Upload your receipt, check coverage, and understand the result before you proceed.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#475569' }}>
              <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★</span>
              <strong>Trustworthiness Score: 4.8/5</strong> based on 25,000+ reviews.
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/signup')} 
                style={{ padding: '0.85rem 1.75rem', backgroundColor: '#0d9488', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Start a claim &rarr;
              </button>
              <button 
                onClick={() => navigate('/supported-brands')} 
                style={{ padding: '0.85rem 1.75rem', backgroundColor: '#fff', color: '#0d9488', border: '1.5px solid #0d9488', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
              >
                Explore Supported Brands
              </button>
            </div>
          </div>

          {/* Unauthenticated Quick Lookup Widget (Lucrative Lead Capture Card) */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', border: '1px solid #e2e8f0', position: 'relative' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a' }}>
              Get a quick check - <br />no login required.
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Instant policy lookup across top retailers.</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="Search by brand (e.g., Apple, Dyson...)" 
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.95rem', outline: 'none' }}
              />
              <button 
                onClick={() => navigate(`/search?q=${searchBrand}`)}
                style={{ padding: '0.75rem 1.25rem', backgroundColor: '#0d9488', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Check Now
              </button>
            </div>

            {/* Store Logos Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#334155' }}>Apple</span>
              <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0284c7' }}>BEST BUY</span>
              <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#dc2626' }}>TARGET</span>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#16a34a' }}>amazon</span>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#ea580c' }}>HomeDepot</span>
            </div>
            
            {/* Sample Receipt Checklist Card */}
            <div style={{ backgroundColor: '#f0fdf4', border: '1px dashed #4ade80', borderRadius: '0.75rem', padding: '1rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ backgroundColor: '#22c55e', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#15803d' }}>Policy Found</div>
                  <div style={{ fontSize: '0.75rem', color: '#166534' }}>Instant upload & AI-check supported</div>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '600' }}>Sample Check &rsaquo;</span>
            </div>
          </div>
        </section>

        {/* Value Proposition Banners */}
        <section style={{ padding: '2rem 5%', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0d9488', marginBottom: '0.25rem' }}>$3M+</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>Recovered</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>in warranty claims for users.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0369a1', marginBottom: '0.25rem' }}>1,500+</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>Supported Brands</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Electronics</span>
                <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Appliances</span>
                <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Furniture</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#166534', marginBottom: '0.5rem' }}>Instant Upload & AI-check</div>
              <p style={{ color: '#15803d', fontSize: '0.9rem', marginBottom: '1rem' }}>Try with a sample receipt now without signing in.</p>
              <button 
                onClick={() => navigate('/demo')}
                style={{ backgroundColor: '#166534', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer', width: 'fit-content' }}
              >
                Try Sample Receipt
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" style={{ padding: '4rem 5%', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>How AssureX works</h2>
            <p style={{ color: '#64748b', marginBottom: '3rem' }}>A simple 4-step process to get a clear recommendation.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {[
                { step: '1', title: 'Submit details', desc: 'Tell us about your product and the issue.' },
                { step: '2', title: 'Scan receipt', desc: 'Upload a clear photo or PDF of your receipt.' },
                { step: '3', title: 'Check coverage', desc: 'We check your product and warranty rules.' },
                { step: '4', title: 'Review outcome', desc: 'See a clear recommendation and next steps.' }
              ].map((item) => (
                <div key={item.step} style={{ position: 'relative' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    {item.step}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Ticker Bar */}
        <section style={{ backgroundColor: '#f1f5f9', padding: '1.25rem 5%', borderBottom: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {["AssureX saved me $300!", "Incredibly easy to use.", "Found warranty I forgot about.", "Approved in 10 minutes."].map((quote, idx) => (
              <div key={idx} style={{ flexShrink: 0, backgroundColor: '#fff', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', color: '#334155', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0d9488', color: '#fff', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                "{quote}"
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" style={{ padding: '4rem 5%', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', textAlign: 'center', marginBottom: '2rem' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'Can I correct scanned details?', a: 'Yes, our OCR tool lets you edit any extracted details before finalizing your claim analysis.' },
              { q: 'What if my claim needs manual review?', a: 'Unclear receipts are routed to our expert team for manual review within 24 hours.' }
            ].map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: '#fff', overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(idx)}
                  style={{ width: '100%', padding: '1.25rem', textAlign: 'left', fontWeight: '600', backgroundColor: '#fff', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '2rem 5%', borderTop: '1px solid #e2e8f0', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          <div style={{ fontWeight: '800', color: '#0f172a' }}>ASSURE<span style={{ color: '#0d9488' }}>X</span></div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#about" style={{ color: '#64748b', textDecoration: 'none' }}>About</a>
            <a href="#how-it-works" style={{ color: '#64748b', textDecoration: 'none' }}>How it works</a>
            <a href="#coverage" style={{ color: '#64748b', textDecoration: 'none' }}>Coverage</a>
            <a href="#faq" style={{ color: '#64748b', textDecoration: 'none' }}>FAQ</a>
          </div>
        </footer>

      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. SIGNED-IN VIEW (Member Portal Dashboard)
  // ---------------------------------------------------------------------------
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '2rem 5%', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
          ASSURE<span style={{ color: '#0d9488' }}>X</span>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '600' }}
        >
          Sign Out
        </button>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              Welcome back.
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Upload your receipt, check coverage, and understand the result.
            </p>
            <button 
              onClick={() => navigate('/new-claim')}
              style={{ padding: '0.85rem 1.75rem', backgroundColor: '#0d9488', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Start a claim &rarr;
            </button>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>Claim check</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div onClick={() => navigate('/claim-history')} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem', cursor: 'pointer' }}>
                <span style={{ color: '#166534', fontWeight: '600', fontSize: '0.9rem' }}>✓ Valid Claim</span>
                <span style={{ color: '#166534' }}>&rsaquo;</span>
              </div>
              <div onClick={() => navigate('/claim-history')} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#fef2f2', borderRadius: '0.375rem', cursor: 'pointer' }}>
                <span style={{ color: '#991b1b', fontWeight: '600', fontSize: '0.9rem' }}>✕ Invalid Claim</span>
                <span style={{ color: '#991b1b' }}>&rsaquo;</span>
              </div>
              <div onClick={() => navigate('/review-dashboard')} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#fffbeb', borderRadius: '0.375rem', cursor: 'pointer' }}>
                <span style={{ color: '#92400e', fontWeight: '600', fontSize: '0.9rem' }}>🕒 Manual Review</span>
                <span style={{ color: '#92400e' }}>&rsaquo;</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div onClick={() => navigate('/new-claim')} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>📄 Scan receipt</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Upload a clear photo or PDF of your receipt.</p>
          </div>
          <div onClick={() => navigate('/claim-history')} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>🔍 Check policy</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>We'll check your product and warranty coverage.</p>
          </div>
          <div onClick={() => navigate('/review-dashboard')} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>📊 Understand result</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>See a clear outcome and next steps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}