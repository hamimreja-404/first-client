import React from 'react';
import { contents } from '../contents';

function Footer({ lang, setView }) {
  const t = contents.translations[lang];

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewChange = (viewName, e) => {
    e.preventDefault();
    setView(viewName);
  };

  // Localized texts
  const newsTitle = lang === 'en' ? "Join Our Newsletter" : "আমাদের নিউজলেটারে যোগ দিন";
  const newsDesc = lang === 'en' ? "Get wholesale market updates and exclusive sales guides." : "পাইকারি বাজারের আপডেট ও এক্সক্লুসিভ সেলিং গাইড পান।";
  const emailPlaceholder = lang === 'en' ? "Your email address" : "আপনার ইমেল অ্যাড্রেস";

  return (
    <footer className="footer" id="footer" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 40px 0', background: 'var(--bg-primary)' }}>
      {/* Premium hover transitions in scoped style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-link {
          transition: transform 0.25s ease, color 0.25s ease;
          display: inline-block;
        }
        .footer-link:hover {
          transform: translateX(6px);
          color: var(--color-primary) !important;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .social-btn:hover {
          transform: translateY(-4px);
          background: var(--gradient-brand);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
        }
      `}} />

      {/* Modern Gradient Divider */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)' }} />

      <div className="container">
        {/* Main Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px', marginBottom: '64px' }}>
          
          {/* Column 1: Brand details & Socials */}
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a 
              href="/" 
              className="logo"
              onClick={(e) => {
                e.preventDefault();
                setView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              <img 
                src="/assets/images/LOGO.webp" 
                alt="Ecom Academy Logo" 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  objectFit: 'contain',
                  imageRendering: 'auto',
                  display: 'block',
                  backfaceVisibility: 'hidden'
                }} 
              />
              <span className="logo-text" style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                Ecom <span className="logo-accent">Academy / Bengali</span>
              </span>
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', margin: 0 }}>
              {t.footer_about}
            </p>
            
            {/* Social Links Row */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-links-col">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: '700' }}>{t.footer_explore}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#hero" className="footer-link" onClick={(e) => handleNavClick('hero', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.nav_home}
                </a>
              </li>
              <li>
                <a href="#courses" className="footer-link" onClick={(e) => handleNavClick('courses', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.nav_courses}
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => handleNavClick('about', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.nav_about}
                </a>
              </li>
              <li>
                <a href="#faqs" className="footer-link" onClick={(e) => handleNavClick('faqs', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.nav_faqs}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Policy Links */}
          <div className="footer-links-col">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: '700' }}>{t.footer_legal}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="/privacy" className="footer-link" onClick={(e) => handleViewChange('privacy', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.footer_privacy}
                </a>
              </li>
              <li>
                <a href="/terms" className="footer-link" onClick={(e) => handleViewChange('terms', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.footer_terms}
                </a>
              </li>
              <li>
                <a href="/refund" className="footer-link" onClick={(e) => handleViewChange('refund', e)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  {t.footer_refund}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriptions & Address details */}
          <div className="footer-links-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>{newsTitle}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              {newsDesc}
            </p>
            
            {/* Newsletter input layout */}
            <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
              <input 
                type="email" 
                placeholder={emailPlaceholder} 
                style={{ 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--border-radius-sm)', 
                  padding: '10px 14px', 
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  flexGrow: 1,
                  minWidth: '0',
                  outline: 'none'
                }} 
              />
              <button 
                className="btn btn-primary"
                style={{ borderRadius: 'var(--border-radius-sm)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Subscribe"
              >
                ➔
              </button>
            </div>
            
            {/* Contact details */}
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <div>{t.support_email}</div>
              <div>{t.support_address}</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p 
            style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', margin: 0 }} 
            dangerouslySetInnerHTML={{ __html: t.footer_copyright }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
