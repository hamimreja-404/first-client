import React, { useState, useEffect } from 'react';
import { contents } from '../contents';

function WhatsAppWidget({ lang }) {
  const [active, setActive] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const t = contents.translations[lang];

  // Auto trigger WhatsApp tooltip suggestion after 8 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setTooltipVisible(true);
      const closeTimer = setTimeout(() => {
        setTooltipVisible(false);
      }, 5000);
      return () => clearTimeout(closeTimer);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTriggerClick = () => {
    setActive((prev) => !prev);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActive(false);
  };

  const targetNumber = "919999999999";
  const defaultMessage = lang === 'bn' 
    ? "হ্যালো, আমি ইকম একাডেমির курсগুলোতে আগ্রহী।" 
    : "Hello, I am interested in Ecom Academy courses.";

  const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="whatsapp-widget" id="whatsapp-widget">
      {/* Hide tooltip on mobile/tablet viewports to prevent width overflow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .whatsapp-tooltip {
            display: none !important;
          }
        }
      `}} />

      <button 
        className="whatsapp-trigger" 
        id="whatsapp-trigger" 
        onClick={handleTriggerClick}
        aria-label="Contact support on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.864-9.858.002-2.636-1.02-5.115-2.88-6.974A9.784 9.784 0 0 0 12.008 1.84c-5.442 0-9.868 4.421-9.872 9.863-.001 1.73.46 3.42 1.332 4.927l-.987 3.604 3.709-.972.457.272zM17.65 14.5c-.307-.154-1.817-.897-2.098-1.002-.281-.104-.486-.156-.69.155-.205.312-.792.997-.971 1.205-.18.208-.359.234-.666.08-1.123-.564-1.912-.98-2.664-2.274-.183-.314.183-.292.522-.969.09-.18.045-.338-.023-.493-.068-.156-.69-1.662-.947-2.28-.249-.603-.503-.52-.69-.53l-.508-.01c-.18 0-.472.067-.719.339-.247.272-.943.921-.943 2.247s.964 2.607 1.098 2.788c.135.18 1.9 2.9 4.6 4.068.643.278 1.144.444 1.536.568.646.205 1.234.176 1.7.106.519-.078 1.817-.743 2.073-1.459.256-.716.256-1.33.18-1.459-.077-.129-.282-.207-.589-.362z" />
        </svg>
        <span 
          className="whatsapp-tooltip" 
          style={{ opacity: tooltipVisible ? '1' : '' }}
        >
          {t.wa_tooltip}
        </span>
      </button>

      <div className={`whatsapp-chat-box card-glass ${active ? 'active' : ''}`} id="whatsapp-chat-box">
        <div className="chat-header">
          <div className="chat-avatar">NH</div>
          <div className="chat-status-info">
            <h4>Najmul Haque</h4>
            <p>{t.wa_status}</p>
          </div>
          <button className="chat-close" id="chat-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="chat-body">
          <div className="chat-bubble chat-bot">
            {t.wa_welcome}
          </div>
        </div>
        <div className="chat-footer">
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noreferrer"
            className="whatsapp-send-btn" 
            id="wa-chat-send-link"
          >
            {t.wa_btn_chat}
          </a>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppWidget;
