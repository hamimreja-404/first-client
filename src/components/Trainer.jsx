import React from 'react';
import { contents } from '../contents';

function Trainer({ lang }) {
  const t = contents.translations[lang];

  return (
    <section className="about-section" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Background Concentric Ripple Waves SVG */}
      <svg 
        className="animate-pulse-slow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          opacity: 0.04,
          zIndex: 0,
          pointerEvents: 'none',
          color: 'var(--color-primary)'
        }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.25" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="55" fill="none" stroke="currentColor" strokeWidth="0.35" />
      </svg>

      {/* Responsive alignment and hover tilt stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: `
        .about-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .trainer-social-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        .platforms-flex {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        .about-image-wrapper {
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .about-image-wrapper:hover {
          transform: scale(1.02) rotate(-0.5deg) translateY(-4px) !important;
        }
        @media (max-width: 1024px) {
          .about-content {
            align-items: center !important;
            text-align: center !important;
          }
          .trainer-social-row {
            justify-content: center !important;
          }
          .platforms-flex {
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .trainer-experience-badge {
            right: 10px !important;
            bottom: 10px !important;
            padding: 10px 16px !important;
          }
          .exp-number {
            font-size: 1.8rem !important;
          }
          .exp-text {
            font-size: 0.75rem !important;
            max-width: 80px !important;
          }
        }
      `}} />

      <div className="container about-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left Column - Visual Image Wrapper & Experience Badge */}
        <div className="about-image-wrapper reveal reveal-left">
          <img 
            src="/assets/images/trainer.jpg" 
            alt={t.trainer_title} 
            className="about-image"
          />
          <div className="trainer-experience-badge card-glass">
            <span className="exp-number">10+</span>
            <span className="exp-text">{t.trainer_exp_lbl}</span>
          </div>
        </div>

        {/* Right Column - Trainer Info & Platform Tags */}
        <div className="about-content reveal reveal-right delay-200">
          <div className="badge badge-accent" style={{ alignSelf: 'inherit' }}>{t.trainer_badge}</div>
          <h2 className="section-title" style={{ marginTop: '12px', marginBottom: '16px' }}>{t.trainer_title}</h2>
          
          <p className="about-text-lead">{t.trainer_lead_text}</p>
          <p className="about-text-body">{t.trainer_body_text}</p>

          {/* Certified Platforms */}
          <div className="trainer-platforms">
            <h5>{t.trainer_partner_lbl}</h5>
            <div className="platforms-flex">
              <span className="plat-tag">Amazon</span>
              <span className="plat-tag">Flipkart</span>
              <span className="plat-tag">Meesho</span>
              <span className="plat-tag">WooCommerce</span>
            </div>
          </div>

          {/* YouTube Action CTA & Social Links */}
          <div className="trainer-social-row">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary trainer-yt-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {t.trainer_yt_btn}
            </a>

            {/* Other Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Facebook Link */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn" 
                aria-label="Facebook"
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'var(--gradient-brand)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(99, 102, 241, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* WhatsApp Link */}
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn" 
                aria-label="WhatsApp"
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = '#25D366';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(37, 211, 102, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              {/* LinkedIn Link */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn" 
                aria-label="LinkedIn"
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = '#0077B5';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 119, 181, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trainer;
