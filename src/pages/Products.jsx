import React from 'react';

function Products({ lang }) {
  const isBn = lang === 'bn';

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background SVG Grid and Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      <div 
        className="card-glass reveal reveal-scale reveal-visible"
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: '48px 32px',
          textAlign: 'center',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          background: 'var(--bg-card)',
          boxShadow: 'var(--card-shadow)',
          zIndex: 1,
          position: 'relative'
        }}
      >
        {/* Animated Icon Container */}
        <div style={{ marginBottom: '24px', display: 'inline-block', position: 'relative' }}>
          <div 
            className="animate-float-slow"
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '24px', 
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(99, 102, 241, 0.35)',
              color: '#ffffff'
            }}
          >
            {/* SVG Parcel Box Icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          {/* Pulsing indicator */}
          <span style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            border: '3px solid var(--bg-primary)',
            boxShadow: '0 0 10px var(--color-accent)',
            animation: 'nudgePulse 2s infinite'
          }} />
        </div>

        {/* Header Badge */}
        <div 
          className="badge-glow" 
          style={{ 
            margin: '0 auto 18px auto', 
            fontSize: '0.8rem', 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase',
            background: 'rgba(6, 182, 212, 0.12)',
            color: 'var(--color-secondary)',
            border: '1px solid rgba(6, 182, 212, 0.25)'
          }}
        >
          {isBn ? 'পাইকারি প্রোডাক্ট হাব' : 'Wholesale Product Directory'}
        </div>

        {/* Main Title */}
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '800', 
          marginBottom: '16px', 
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-primary)'
        }}>
          {isBn ? (
            <>পাইকারি পণ্য সম্ভার <span className="gradient-text">শীঘ্রই আসছে</span></>
          ) : (
            <>Wholesale Products <span className="gradient-text">Coming Soon</span></>
          )}
        </h1>

        {/* Description */}
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          marginBottom: '32px',
          maxWidth: '520px',
          margin: '0 auto 32px auto'
        }}>
          {isBn 
            ? 'আমরা ভারতের সেরা উৎপাদনকারী ও পাইকারি বিক্রেতাদের সাথে সরাসরি কাজ করছি। খুব শীঘ্রই আমাদের ভেরিফাইড ৮০০+ হট-সেলিং প্রোডাক্ট ডিরেক্টরি এবং সাপ্লায়ার কন্টাক্ট লিস্ট শিক্ষার্থীদের জন্য এই পেইজে উন্মুক্ত করা হবে।' 
            : 'We are curating directly from elite Indian manufacturers and wholesale distributors. Our verified database of 800+ winning products, supplier contacts, and logistics rates will be launched here very soon.'}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 auto 28px auto', maxWidth: '120px' }}></div>

        {/* CTA Button */}
        <button 
          onClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('popstate'));
          }}
          className="btn btn-primary"
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
        >
          {isBn ? '← কোর্সে ফিরে যান' : '← Back to Courses'}
        </button>
      </div>
    </div>
  );
}

export default Products;
