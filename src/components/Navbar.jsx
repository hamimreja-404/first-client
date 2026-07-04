import React, { useState } from 'react';
import { contents } from '../contents';

function Navbar({ lang, setLang, theme, setTheme, setView, currentView }) {
  const [mobileActive, setMobileActive] = useState(false);
  const t = contents.translations[lang];

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setMobileActive(false);
    
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  return (
    <header className="header" id="header" style={{ padding: '10px 0' }}>
      {/* Scoped CSS for header responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 480px) {
          .nav-lang-text {
            display: none !important;
          }
          .logo-text {
            font-size: 1.15rem !important;
          }
          .logo img {
            width: 32px !important;
            height: 32px !important;
          }
          .header-actions {
            gap: 8px !important;
          }
        }
      `}} />

      <div className="container header-container">
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
            {lang === 'bn' ? (
              <>ইকম <span className="logo-accent">একাডেমি</span></>
            ) : (
              <>Ecom <span className="logo-accent">Academy</span></>
            )}
          </span>
        </a>

        <nav className={`nav-menu ${mobileActive ? 'active' : ''}`} id="nav-menu">
          <ul className="nav-list">
            <li>
              <a 
                href="#hero" 
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick('hero', e)}
              >
                {t.nav_home}
              </a>
            </li>
            <li>
              <a 
                href="#courses" 
                className="nav-link" 
                onClick={(e) => handleNavClick('courses', e)}
              >
                {t.nav_courses}
              </a>
            </li>
            <li>
              <a 
                href="/products" 
                className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileActive(false);
                  setView('products');
                }}
              >
                {t.nav_products}
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="nav-link" 
                onClick={(e) => handleNavClick('about', e)}
              >
                {t.nav_about}
              </a>
            </li>
            <li>
              <a 
                href="#faqs" 
                className="nav-link" 
                onClick={(e) => handleNavClick('faqs', e)}
              >
                {t.nav_faqs}
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage} 
            className="btn btn-secondary btn-small"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              borderRadius: '8px'
            }}
            aria-label="Toggle Language"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginRight: '2px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="nav-lang-text">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Theme Toggle Switch */}
          <button 
            className="theme-toggle" 
            id="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? (
              <span className="theme-icon-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </span>
            ) : (
              <span className="theme-icon-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </span>
            )}
          </button>

          {/* Mobile Navigation Menu Toggle */}
          <button 
            className={`mobile-toggle ${mobileActive ? 'active' : ''}`} 
            id="mobile-toggle" 
            onClick={() => setMobileActive((prev) => !prev)}
            aria-label="Open Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
