import React, { useState } from 'react';
import { contents } from '../contents';

function FAQs({ lang }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const t = contents.translations[lang];
  const { faqs } = contents;

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faqs-section" id="faqs" style={{ padding: 'var(--section-padding) 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Background Wave Pathways SVG */}
      <svg 
        className="animate-float-slow"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          opacity: 0.04,
          zIndex: 0,
          pointerEvents: 'none',
          color: 'var(--color-primary)'
        }}
        viewBox="0 0 100 100"
      >
        <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <path d="M0,60 Q25,30 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.2" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="section-header reveal reveal-scale" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div className="badge-glow" style={{ margin: '0 auto 16px auto' }}>{t.faq_badge}</div>
        <h2 className="section-title">{t.faq_title}</h2>
        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>{t.faq_subtitle}</p>
      </div>

      {/* Accordion Layout */}
      <div className="faqs-accordion reveal reveal-left delay-100" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const details = faq[lang] || faq.bn;
          const isActive = activeIndex === index;

          return (
            <div 
              key={index} 
              className="accordion-item card-glass"
              style={{ 
                borderRadius: '16px',
                border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                background: isActive ? 'rgba(99, 102, 241, 0.03)' : 'var(--bg-card)',
                boxShadow: isActive ? '0 8px 30px rgba(99, 102, 241, 0.1)' : 'var(--card-shadow)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                overflow: 'hidden'
              }}
            >
              {/* Header Toggle Button */}
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion(index)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  width: '100%', 
                  cursor: 'pointer', 
                  background: 'none', 
                  border: 'none', 
                  textAlign: 'left',
                  padding: '24px 28px',
                  color: isActive ? 'var(--color-primary)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontSize: '1.08rem',
                  gap: '20px',
                  transition: 'color 0.25s ease'
                }}
              >
                <span style={{ lineHeight: '1.4' }}>{details.q}</span>
                
                {/* Custom Chevron Arrow rotating smoothly */}
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{ 
                    transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                    flexShrink: 0
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Collapsible Answer Content */}
              <div 
                className="accordion-content" 
                style={{ 
                  maxHeight: isActive ? '500px' : '0', 
                  opacity: isActive ? '1' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease, padding 0.35s ease',
                  padding: isActive ? '0 28px 24px 28px' : '0 28px'
                }}
              >
                <p 
                  style={{ 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.65',
                    fontSize: '0.94rem',
                    margin: 0
                  }}
                >
                  {details.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpline FAQ Callout Card */}
      <div 
        className="card-glass reveal reveal-scale delay-200" 
        style={{ 
          marginTop: '56px', 
          padding: '32px', 
          borderRadius: '24px', 
          border: '1px solid rgba(99, 102, 241, 0.25)', 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)', 
          textAlign: 'center',
          boxShadow: 'var(--card-shadow)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {lang === 'bn' ? 'এখনও কোনো প্রশ্ন আছে?' : 'Still Have Questions?'}
        </h4>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          {lang === 'bn' 
            ? 'আমাদের এডমিশন টিমের সাথে সরাসরি কথা বলুন অথবা হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে আপনার প্রশ্নের সমাধান করুন।' 
            : 'Get in touch with our admissions expert directly via phone or WhatsApp for quick support.'}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Call Helpline Button */}
          <a 
            href="tel:+919876543210"
            className="btn btn-secondary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 20px', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--color-primary)' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 98765 43210</span>
            <span style={{ fontSize: '0.78rem', opacity: 0.7, fontWeight: '500' }}>
              ({lang === 'bn' ? 'সকাল ১১টা - বিকাল ৫টা' : '11 AM - 5 PM'})
            </span>
          </a>

          {/* WhatsApp Message Button */}
          <a 
            href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20some%20queries%20about%20Ecom%20Academy%20courses."
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 20px', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.864-9.858.002-2.636-1.02-5.115-2.88-6.974A9.784 9.784 0 0 0 12.008 1.84c-5.442 0-9.868 4.421-9.872 9.863-.001 1.73.46 3.42 1.332 4.927l-.987 3.604 3.709-.972.457.272zM17.65 14.5c-.307-.154-1.817-.897-2.098-1.002-.281-.104-.486-.156-.69.155-.205.312-.792.997-.971 1.205-.18.208-.359.234-.666.08-1.123-.564-1.912-.98-2.664-2.274-.183-.314.183-.292.522-.969.09-.18.045-.338-.023-.493-.068-.156-.69-1.662-.947-2.28-.249-.603-.503-.52-.69-.53l-.508-.01c-.18 0-.472.067-.719.339-.247.272-.943.921-.943 2.247s.964 2.607 1.098 2.788c.135.18 1.9 2.9 4.6 4.068.643.278 1.144.444 1.536.568.646.205 1.234.176 1.7.106.519-.078 1.817-.743 2.073-1.459.256-.716.256-1.33.18-1.459-.077-.129-.282-.207-.589-.362z" />
            </svg>
            <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Message on WhatsApp'}</span>
          </a>
        </div>
      </div>

     </div>
    </section>
  );
}

export default FAQs;
