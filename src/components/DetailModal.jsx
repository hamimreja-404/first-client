import React, { useState } from 'react';
import { contents } from '../contents';

function DetailModal({ courseId, lang, onClose, onEnroll }) {
  const [showVideo, setShowVideo] = useState(false);
  const course = contents.courses.find(c => c.id === courseId);
  if (!course) return null;

  const data = course[lang] || course.bn; // fallback to Bengali

  // Bilingual Labels
  const labels = {
    en: {
      overview: "Course Overview",
      duration: "⏱ Duration:",
      language: "🎯 Language:",
      langVal: "Hindi (Hinglish)",
      curriculum: "Curriculum / Modules",
      back: "Back to Courses",
      enroll: "Enroll Now",
      showDemo: "Show Demo Video",
      demoTitle: "Course Demo"
    },
    bn: {
      overview: "কোর্স ওভারভিউ",
      duration: "⏱ সময়কাল:",
      language: "🎯 ভাষা:",
      langVal: "হিন্দি (হিংলিশ)",
      curriculum: "কারিকুলাম / মডিউলসমূহ",
      back: "কোর্সে ফিরে যান",
      enroll: "এখনই এনরোল করুন",
      showDemo: "ডেমো ভিডিও দেখুন",
      demoTitle: "কোর্স ডেমো"
    }
  };

  const l = labels[lang] || labels.bn;

  return (
    <>
      <div 
        className="modal-backdrop active" 
        id="detail-modal"
        onClick={onClose}
      >
        <div 
          className="modal modal-large card-glass"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>&times;</button>
          <h2 className="modal-title" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{data.title}</h2>
          
          <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '8px' }}>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {/* Overview / Left Column */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{l.overview}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{data.description}</p>
                
                <div style={{ marginTop: '24px', fontSize: '0.95rem' }}>
                  <strong>{l.duration}</strong> <span style={{ color: 'var(--color-accent)', fontWeight: '600', marginLeft: '8px' }}>{data.duration}</span>
                </div>
                
                <div style={{ marginTop: '10px', fontSize: '0.95rem' }}>
                  <strong>{l.language}</strong> <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{l.langVal}</span>
                </div>
                
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-accent)' }}>{data.price}</span>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.1rem' }}>{data.originalPrice}</span>
                </div>
              </div>

              {/* Curriculum / Right Column */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{l.curriculum}</h3>
                <div className="detail-bullets" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Array.isArray(data.curriculum) && data.curriculum.map((item, idx) => (
                    <div key={idx} className="detail-bullet-item" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✔</span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', flexWrap: 'wrap' }}>
            {/* Show Demo Video Button */}
            <button 
              className="btn btn-secondary" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(239, 68, 68, 0.08)', 
                borderColor: 'rgba(239, 68, 68, 0.25)', 
                color: '#ef4444',
                fontWeight: '600'
              }}
              onClick={() => setShowVideo(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.borderColor = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>{l.showDemo}</span>
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={onClose}>
                {l.back}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => onEnroll(data.title, data.price)}
              >
                {l.enroll}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Video Pop-up Modal (Cinematic Backdrop, 16:9 Iframe) */}
      {showVideo && (
        <div 
          className="modal-backdrop active" 
          style={{ zIndex: 1000, background: 'rgba(3, 7, 18, 0.92)' }}
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="modal card-glass" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '800px', 
              width: '90%', 
              padding: '16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'var(--bg-secondary)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                {data.title} - {l.demoTitle}
              </h4>
              <button 
                onClick={() => setShowVideo(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1.6rem',
                  lineHeight: '1',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                &times;
              </button>
            </div>
            
            {/* 16:9 Aspect Ratio Iframe Wrapper */}
            <div 
              style={{ 
                position: 'relative', 
                paddingBottom: '56.25%', 
                height: 0, 
                overflow: 'hidden', 
                borderRadius: '12px',
                background: '#000',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
              }}
            >
              <iframe 
                src="https://www.youtube.com/embed/c35fpGWqXnk?autoplay=1&rel=0" 
                title="Course Demo Video"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  border: 0 
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailModal;
