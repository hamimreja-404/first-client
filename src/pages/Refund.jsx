import React from 'react';
import { contents } from '../contents';

function Refund({ lang }) {
  const t = contents.translations[lang];

  return (
    <div className="policy-content-wrapper" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
      <article className="policy-card card-glass" style={{ padding: '48px', marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '24px' }}>{t.refund_title}</h1>
        <p><em>Last Updated: June 22, 2026</em></p>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>{t.refund_p1}</p>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '12px' }}>{t.refund_h1}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>{t.refund_p2}</p>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '12px' }}>{t.refund_h2}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>{t.refund_p3}</p>
        <ul style={{ color: 'var(--text-secondary)', marginBottom: '16px', paddingLeft: '20px', listStyleType: 'disc', lineHeight: '1.7' }}>
          <li style={{ marginBottom: '8px' }}>{t.refund_li1}</li>
          <li style={{ marginBottom: '8px' }}>{t.refund_li2}</li>
          <li style={{ marginBottom: '8px' }}>{t.refund_li3}</li>
        </ul>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '12px' }}>{t.refund_h3}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>{t.refund_p4}</p>
        <ul style={{ color: 'var(--text-secondary)', marginBottom: '16px', paddingLeft: '20px', listStyleType: 'disc', lineHeight: '1.7' }}>
          <li style={{ marginBottom: '8px' }}>{t.refund_li4}</li>
          <li style={{ marginBottom: '8px' }}>{t.refund_li5}</li>
          <li style={{ marginBottom: '8px' }}>{t.refund_li6}</li>
          <li style={{ marginBottom: '8px' }}>{t.refund_li7}</li>
        </ul>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '12px' }}>{t.refund_h4}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>{t.refund_p5}</p>
      </article>
    </div>
  );
}

export default Refund;
