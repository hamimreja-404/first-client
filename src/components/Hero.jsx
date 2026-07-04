import React from 'react';
import { contents } from '../contents';

function Hero({ lang, onExploreCourses, onMeetCoach, onJoinLive }) {
  const t = contents.translations[lang];

  return (
    <section className="hero" id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Scoped CSS to show floating badges on Mobile View and prevent horizontal overflow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .floating-badge {
            display: flex !important;
            position: absolute !important;
            padding: 8px 14px !important;
            border-radius: 12px !important;
          }
          .badge-top-right {
            top: 15px !important;
            right: 15px !important;
          }
          .badge-bottom-left {
            bottom: 15px !important;
            left: 15px !important;
          }
          .floating-badge .badge-icon {
            font-size: 0.95rem !important;
            margin-right: 4px !important;
          }
          .floating-badge .badge-title {
            font-size: 0.72rem !important;
            line-height: 1.2 !important;
          }
          .floating-badge .badge-subtitle {
            font-size: 0.6rem !important;
            line-height: 1.2 !important;
          }
        }
      `}} />

      {/* Floating Animated Dotted Grid Pattern Background */}
      <svg 
        className="animate-pulse-slow" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          zIndex: 0, 
          opacity: 0.08
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-dot-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="var(--color-primary)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
      </svg>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left Column - Information Heading & Benefits */}
        <div className="hero-content reveal reveal-left">
          <div className="badge badge-primary">{t.hero_badge}</div>
          
          <h1 
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: t.hero_title }}
          />
          
          <p className="hero-description">{t.hero_description}</p>
          
          <div className="hero-benefits">
            <div className="benefit-item reveal delay-100">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{t.hero_benefit1}</span>
            </div>
            
            <div className="benefit-item reveal delay-200">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{t.hero_benefit2}</span>
            </div>

            <div className="benefit-item reveal delay-300">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{t.hero_benefit3}</span>
            </div>
          </div>

          <div className="hero-actions reveal delay-400">
            <button className="btn btn-primary btn-large" onClick={onExploreCourses}>
              {t.hero_cta1}
            </button>
            <button className="btn btn-secondary btn-large" onClick={onMeetCoach}>
              {t.hero_cta2}
            </button>
          </div>

          {/* Quick Contact Helpline CTAs */}
          <div className="hero-support-line reveal delay-500" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {lang === 'bn' ? 'হেল্পলাইন:' : 'Helpline:'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Call Helpline Link */}
              <a 
                href="tel:+919876543210" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '30px', 
                  padding: '8px 16px', 
                  fontSize: '0.88rem', 
                  fontWeight: '600', 
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-primary)' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 98765 43210</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: '500' }}>
                  ({lang === 'bn' ? 'সকাল ১১টা - বিকাল ৫টা' : '11 AM - 5 PM'})
                </span>
              </a>

              {/* WhatsApp Helpline Link */}
              <a 
                href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20some%20queries%20about%20Ecom%20Academy%20courses." 
                target="_blank"
                rel="noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(37, 211, 102, 0.08)', 
                  border: '1px solid rgba(37, 211, 102, 0.2)', 
                  borderRadius: '30px', 
                  padding: '8px 16px', 
                  fontSize: '0.88rem', 
                  fontWeight: '600', 
                  color: '#25d366',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)';
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.2)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.864-9.858.002-2.636-1.02-5.115-2.88-6.974A9.784 9.784 0 0 0 12.008 1.84c-5.442 0-9.868 4.421-9.872 9.863-.001 1.73.46 3.42 1.332 4.927l-.987 3.604 3.709-.972.457.272zM17.65 14.5c-.307-.154-1.817-.897-2.098-1.002-.281-.104-.486-.156-.69.155-.205.312-.792.997-.971 1.205-.18.208-.359.234-.666.08-1.123-.564-1.912-.98-2.664-2.274-.183-.314.183-.292.522-.969.09-.18.045-.338-.023-.493-.068-.156-.69-1.662-.947-2.28-.249-.603-.503-.52-.69-.53l-.508-.01c-.18 0-.472.067-.719.339-.247.272-.943.921-.943 2.247s.964 2.607 1.098 2.788c.135.18 1.9 2.9 4.6 4.068.643.278 1.144.444 1.536.568.646.205 1.234.176 1.7.106.519-.078 1.817-.743 2.073-1.459.256-.716.256-1.33.18-1.459-.077-.129-.282-.207-.589-.362z" />
                </svg>
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Visual Trainer Image & Badges */}
        <div className="hero-image-wrapper reveal reveal-right delay-200">
          <div className="image-glass-backdrop"></div>
          
          <img 
            src="/assets/images/trainer.jpg" 
            alt={t.trainer_title} 
            className="hero-image"
          />

          {/* Top Right Live Zoom Badge */}
          <div 
            className="floating-badge card-glass badge-top-right animate-float"
            onClick={onJoinLive}
            style={{ cursor: 'pointer' }}
          >
            <span className="badge-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ec4899', animation: 'pulse 2s infinite' }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
              </svg>
            </span>
            <div>
              <div className="badge-title">{t.join_live_title}</div>
              <div className="badge-subtitle">{t.join_live_subtitle}</div>
            </div>
          </div>

          {/* Bottom Left Rating Badge */}
          <div className="floating-badge card-glass badge-bottom-left animate-float" style={{ animationDelay: '1s' }}>
            <span className="badge-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            <div>
              <div className="badge-title">{t.rating_title}</div>
              <div className="badge-subtitle">{t.rating_subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
