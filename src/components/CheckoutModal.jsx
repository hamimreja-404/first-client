import React, { useState } from 'react';
import { contents } from '../contents';

function CheckoutModal({ courseTitle, coursePrice, lang, onClose }) {
  const t = contents.translations[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const targetNumber = "919999999999";
    
    // Construct WhatsApp message based on selected language
    const message = lang === 'bn'
      ? `হ্যালো ইকম একাডেমি, আমি নিম্নলিখিত কোর্সে নথিভুক্ত করতে চাই:\n\n📚 *কোর্স:* ${courseTitle}\n\n👤 *আমার বিবরণ:*\n- *নাম:* ${name}\n- *ইমেল:* ${email}\n- *ফোন:* ${phone}`
      : `Hello Ecom Academy, I would like to enroll in the following course:\n\n📚 *Course:* ${courseTitle}\n\n👤 *My Details:*\n- *Name:* ${name}\n- *Email:* ${email}\n- *Phone:* ${phone}`;

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

    // Redirect customer to WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset local states and close modal
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div 
      className="modal-backdrop active" 
      id="checkout-modal"
      onClick={onClose}
    >
      <div 
        className="modal card-glass"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{t.checkout_title}</h2>

        <div className="checkout-summary-box" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--border-radius-sm)', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', tracking: '0.05em' }}>
            {t.checkout_summary}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '500' }}>{courseTitle}</span>
            <span style={{ fontWeight: '600' }}>{coursePrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
            <span>{t.checkout_fees}</span>
            <span style={{ color: 'var(--color-accent)' }}>{t.checkout_free}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
            <span>{t.checkout_payable}</span>
            <span style={{ color: 'var(--color-accent)' }}>{coursePrice}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} id="checkout-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cust-name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.checkout_lbl_name}</label>
            <input 
              type="text" 
              id="cust-name" 
              required 
              placeholder={t.checkout_ph_name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cust-email" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.checkout_lbl_email}</label>
            <input 
              type="email" 
              id="cust-email" 
              required 
              placeholder={t.checkout_ph_email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cust-phone" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.checkout_lbl_phone}</label>
            <input 
              type="tel" 
              id="cust-phone" 
              required 
              placeholder={t.checkout_ph_phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            style={{ padding: '14px', width: '100%', marginTop: '10px', fontSize: '1rem', fontWeight: '600' }}
          >
            {t.checkout_btn_submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
