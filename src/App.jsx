import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DetailModal from './components/DetailModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';

// Pages
import Home from './pages/Home.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Refund from './pages/Refund.jsx';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState('bn');
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    if (path === '/refund') return 'refund';
    return 'home';
  });

  // HTML5 History navigation helper
  const navigateTo = (newView) => {
    let path = '/';
    if (newView === 'privacy') path = '/privacy';
    else if (newView === 'terms') path = '/terms';
    else if (newView === 'refund') path = '/refund';
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setView(newView);
  };

  // Modal states
  const [detailCourseId, setDetailCourseId] = useState(null);
  const [checkoutCourse, setCheckoutCourse] = useState(null);

  // Floating Support states
  const [showFloatingSupport, setShowFloatingSupport] = useState(false);
  const [showBotTip, setShowBotTip] = useState(true);
  const [tipMessageIndex, setTipMessageIndex] = useState(0);

  // Set body class to loaded on mount
  useEffect(() => {
    document.body.classList.add('loaded');
  }, []);

  // Sync browser back/forward buttons with active routing view
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') setView('privacy');
      else if (path === '/terms') setView('terms');
      else if (path === '/refund') setView('refund');
      else setView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync language to document element
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  // Scroll listener to toggle floating support pill (visible once scrolled past Hero section)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowFloatingSupport(true);
      } else {
        setShowFloatingSupport(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations (supports both up and down directions)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -5% 0px', // slightly offset trigger bounds
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, observerOptions);

    // Keep track of observed elements to avoid duplicate observers
    const observedElements = new Set();

    const observeNewElements = () => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      revealElements.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Run initial scan
    observeNewElements();

    // Use MutationObserver to observe elements dynamically as React mounts them in the DOM
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [view]);

  // Cycle helper bot messages every 4.5 seconds for attention nudge
  useEffect(() => {
    if (!showBotTip) return;
    const interval = setInterval(() => {
      setTipMessageIndex((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, [showBotTip]);

  // Dynamic helper bot messaging database (Removed Emojis)
  const botTips = {
    en: [
      "Call or chat with us for course details",
      "Click below to ask Najmul any questions",
      "Admissions open! Call 11AM - 5PM"
    ],
    bn: [
      "কোর্স নিয়ে যেকোনো প্রশ্ন থাকলে কল বা চ্যাট করুন",
      "বিস্তারিত জানতে নিচে সরাসরি ক্লিক করুন",
      "ভর্তি চলছে! সকাল ১১টা - বিকাল ৫টার মধ্যে কল করুন"
    ]
  };

  const activeBotTip = (botTips[lang] || botTips.bn)[tipMessageIndex];

  // Render correct view page
  const renderView = () => {
    switch (view) {
      case 'privacy':
        return <Privacy lang={lang} />;
      case 'terms':
        return <Terms lang={lang} />;
      case 'refund':
        return <Refund lang={lang} />;
      case 'home':
      default:
        return (
          <Home
            lang={lang}
            setView={navigateTo}
            setDetailCourseId={setDetailCourseId}
            setCheckoutCourse={setCheckoutCourse}
          />
        );
    }
  };

  return (
    <>
      {/* Responsive styling to show call timings and stack text layout on mobile viewports */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nudgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .nudge-animated {
          animation: nudgePulse 2s ease-in-out infinite;
        }
        @media (max-width: 500px) {
          .floating-support-container {
            bottom: 16px !important;
            left: 16px !important;
          }
          .floating-support-bar {
            padding: 8px 12px !important;
            gap: 8px !important;
          }
          .floating-call-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            line-height: 1.25 !important;
          }
          .floating-call-text {
            font-size: 0.8rem !important;
          }
          .floating-call-hours {
            font-size: 0.68rem !important;
            opacity: 0.8 !important;
            display: inline-block !important;
          }
          .support-bot-bubble {
            width: 190px !important;
            padding: 8px 10px !important;
            bottom: 60px !important;
          }
        }
      `}} />

      {/* Ambient Background Orbs */}
      <div className="bg-orb orb-1"></div>
      {view === 'home' && <div className="bg-orb orb-2"></div>}
      <div className="bg-orb orb-3"></div>

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        setView={navigateTo}
        currentView={view}
      />

      {/* Main Page Area */}
      <main>
        {renderView()}
      </main>

      {/* Footer Area */}
      <Footer lang={lang} setView={navigateTo} />

      {/* Scroll-Reactive Floating Support Helpline Container (Bottom Left) */}
      {showFloatingSupport && (
        <div 
          className="floating-support-container"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px'
          }}
        >
          {/* Animated Helper Bot Chat Tip Bubble */}
          {showBotTip && (
            <div 
              className="support-bot-bubble card-glass"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--color-primary)',
                borderRadius: '16px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',
                width: '220px',
                zIndex: 100,
                position: 'relative',
                animation: 'floatSlow 4s ease-in-out infinite'
              }}
            >
              {/* Vector Bot Avatar Icon (Lucide Robot equivalent) */}
              <div 
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#ffffff'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                  <line x1="16" y1="16" x2="16" y2="16"></line>
                </svg>
              </div>
              
              {/* Tip message (dynamic cycle) */}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.35', textAlign: 'left', flexGrow: 1 }}>
                {activeBotTip}
              </div>

              {/* Close Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBotTip(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  padding: '0 2px 0 4px',
                  fontWeight: '700',
                  alignSelf: 'flex-start'
                }}
                aria-label="Dismiss helper tip"
              >
                &times;
              </button>
            </div>
          )}

          {/* Floating Helpline Pill */}
          <div 
            className="floating-support-bar card-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 14px',
              borderRadius: '40px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              animation: 'slideInUp 0.3s ease forwards'
            }}
          >
            {/* WhatsApp Direct Action Button (Perfect Alignment: inline-flex center, lineHeight 0) */}
            <a 
              href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20some%20queries%20about%20Ecom%20Academy%20courses."
              target="_blank"
              rel="noreferrer"
              className="nudge-animated"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#25d366',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                transition: 'transform 0.2s ease',
                textDecoration: 'none',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)',
                lineHeight: '0'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              title="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', margin: 'auto' }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.864-9.858.002-2.636-1.02-5.115-2.88-6.974A9.784 9.784 0 0 0 12.008 1.84c-5.442 0-9.868 4.421-9.872 9.863-.001 1.73.46 3.42 1.332 4.927l-.987 3.604 3.709-.972.457.272zM17.65 14.5c-.307-.154-1.817-.897-2.098-1.002-.281-.104-.486-.156-.69.155-.205.312-.792.997-.971 1.205-.18.208-.359.234-.666.08-1.123-.564-1.912-.98-2.664-2.274-.183-.314.183-.292.522-.969.09-.18.045-.338-.023-.493-.068-.156-.69-1.662-.947-2.28-.249-.603-.503-.52-.69-.53l-.508-.01c-.18 0-.472.067-.719.339-.247.272-.943.921-.943 2.247s.964 2.607 1.098 2.788c.135.18 1.9 2.9 4.6 4.068.643.278 1.144.444 1.536.568.646.205 1.234.176 1.7.106.519-.078 1.817-.743 2.073-1.459.256-.716.256-1.33.18-1.459-.077-.129-.282-.207-.589-.362z" />
              </svg>
            </a>

            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>

            {/* Call Helpline Action Button (perfectly aligned with SVG phone vector, nudge-animated) */}
            <a 
              href="tel:+919876543210"
              className="nudge-animated"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                lineHeight: 'normal'
              }}
              title="Call Support Helpline"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--color-primary)' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div className="floating-call-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="floating-call-text" style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                  +91 98765 43210
                </span>
                <span className="floating-call-hours" style={{ fontSize: '0.72rem', opacity: 0.6, fontWeight: '500' }}>
                  ({lang === 'bn' ? 'সকাল ১১টা - বিকাল ৫টা' : '11 AM - 5 PM'})
                </span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {detailCourseId && (
        <DetailModal
          courseId={detailCourseId}
          lang={lang}
          onClose={() => setDetailCourseId(null)}
          onEnroll={(title, price) => {
            setDetailCourseId(null);
            setCheckoutCourse({ title, price });
          }}
        />
      )}

      {/* Checkout Enrollment Modal */}
      {checkoutCourse && (
        <CheckoutModal
          courseTitle={checkoutCourse.title}
          coursePrice={checkoutCourse.price}
          lang={lang}
          onClose={() => setCheckoutCourse(null)}
        />
      )}
    </>
  );
}

export default App;
