import React, { useState } from 'react';

function LiveModal({ lang, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !email.trim()) return;
    onSubmit({ name: name.trim(), whatsapp: whatsapp.trim(), email: email.trim() });
  };

  const isEn = lang === 'en';
  const t = {
    title: isEn ? "Register for Live Zoom Workshop" : "লাইভ জুম ওয়ার্কশপ রেজিস্ট্রেশন",
    name: isEn ? "Your Name" : "আপনার নাম",
    whatsapp: isEn ? "WhatsApp Number" : "হোয়াটসঅ্যাপ নম্বর",
    email: isEn ? "Email Address" : "ইমেল ঠিকানা",
    phName: isEn ? "Enter your full name" : "আপনার সম্পূর্ণ নাম লিখুন",
    phWhatsapp: isEn ? "10-digit mobile number" : "১০-সংখ্যার মোবাইল নম্বর",
    phEmail: isEn ? "Enter your email address" : "আপনার ইমেল অ্যাড্রেস লিখুন",
    submit: isEn ? "Register & Join Live" : "রেজিস্ট্রেশন সম্পন্ন করুন",
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal card-glass" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>
          {t.title}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="live-name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.name}</label>
            <input
              type="text"
              id="live-name"
              required
              placeholder={t.phName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="live-whatsapp" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.whatsapp}</label>
            <input
              type="tel"
              id="live-whatsapp"
              required
              pattern="[0-9]{10}"
              placeholder={t.phWhatsapp}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 10))}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="live-email" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.email}</label>
            <input
              type="email"
              id="live-email"
              required
              placeholder={t.phEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ padding: '14px', width: '100%', marginTop: '10px', fontSize: '1rem', fontWeight: '600' }}
          >
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LiveModal;
