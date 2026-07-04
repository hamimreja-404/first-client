import React, { useState } from 'react';
import { contents } from '../contents';

function AccessModal({ lang, setLang, onSubmit }) {
  const t = contents.translations[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [otherText, setOtherText] = useState('');

  // Dynamically map course options from contents.js
  const courseOptions = contents.courses.map((c) => {
    const details = c[lang] || c.bn || c.en;
    return {
      id: c.id,
      title: details.title
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !course) return;
    
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      course: course === 'other' ? (otherText.trim() || 'Other') : course,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div 
      className="modal-backdrop active" 
      style={{
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div 
        className="modal card-glass"
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          position: 'relative',
          margin: 'auto'
        }}
      >
        {/* Absolute floating language selector button inside modal */}
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <button 
            onClick={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))} 
            className="btn btn-secondary btn-small"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.82rem', 
              fontWeight: '600', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            type="button"
            aria-label="Toggle Language"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          {/* Visual logo/icon */}
          <div 
            style={{ 
              width: '54px', 
              height: '54px', 
              borderRadius: '50%', 
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 className="modal-title" style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '10px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t.access_title}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {t.access_subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Full Name */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <label htmlFor="access-name" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {t.access_lbl_name}
            </label>
            <input 
              type="text" 
              id="access-name" 
              required 
              placeholder={t.access_ph_name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 'var(--border-radius-sm)', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Contact Number */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <label htmlFor="access-phone" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {t.access_lbl_phone}
            </label>
            <input 
              type="tel" 
              id="access-phone" 
              required 
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
              placeholder={t.access_ph_phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 'var(--border-radius-sm)', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Interested Course */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <label htmlFor="access-course" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {t.access_lbl_course}
            </label>
            <select 
              id="access-course" 
              required 
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                if (e.target.value !== 'other') {
                  setOtherText('');
                }
              }}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 'var(--border-radius-sm)', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              <option value="" disabled>{t.access_select_course}</option>
              {courseOptions.map(opt => (
                <option key={opt.id} value={opt.title}>{opt.title}</option>
              ))}
              <option value="other">{t.access_other_option}</option>
            </select>
          </div>

          {/* Animate Specify Other Course Input */}
          <div 
            style={{ 
              maxHeight: course === 'other' ? '100px' : '0',
              opacity: course === 'other' ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <label htmlFor="access-other-text" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {t.access_other_specify}
            </label>
            <input 
              type="text" 
              id="access-other-text"
              required={course === 'other'}
              placeholder={lang === 'bn' ? 'কোর্সের নাম লিখুন...' : 'Specify course name...'}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 'var(--border-radius-sm)', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            style={{ 
              padding: '14px', 
              width: '100%', 
              fontSize: '1rem', 
              fontWeight: '700',
              marginTop: '10px',
              borderRadius: 'var(--border-radius-sm)',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}
          >
            {t.access_btn_submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccessModal;
