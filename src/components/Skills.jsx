import React from 'react';
import { contents } from '../contents';

function Skills({ lang }) {
  const t = contents.translations[lang];
  const { skills } = contents;

  return (
    <section className="skills-section" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--section-padding) 0' }}>
      {/* Floating Background Network Connections SVG */}
      <svg 
        className="animate-float-slow"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '600px',
          height: '600px',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none',
          color: 'var(--color-primary)'
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
      >
        <circle cx="10" cy="20" r="1.2" fill="currentColor" />
        <circle cx="50" cy="50" r="1.8" fill="currentColor" />
        <circle cx="90" cy="30" r="1.2" fill="currentColor" />
        <circle cx="30" cy="80" r="1.2" fill="currentColor" />
        <circle cx="80" cy="70" r="1.2" fill="currentColor" />
        
        <line x1="10" y1="20" x2="50" y2="50" />
        <line x1="50" y1="50" x2="90" y2="30" />
        <line x1="10" y1="20" x2="30" y2="80" />
        <line x1="30" y1="80" x2="50" y2="50" />
        <line x1="50" y1="50" x2="80" y2="70" />
        <line x1="80" y1="70" x2="90" y2="30" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Scoped CSS to enforce a strict 4-column desktop layout and handle tablet/mobile rollbacks */}
        <style dangerouslySetInnerHTML={{ __html: `
          .skills-points-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          @media (max-width: 1024px) {
            .skills-points-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 576px) {
            .skills-points-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
        `}} />

        {/* Section Header with reveal animation */}
        <div className="section-header reveal reveal-scale" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge-glow" style={{ margin: '0 auto 16px auto' }}>{t.skills_badge}</div>
          <h2 className="section-title">{t.skills_title}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>{t.skills_subtitle}</p>
        </div>

        {/* Grid of 20 Skills Points (Uses staggered delay classes) */}
        <div className="skills-points-grid">
          {skills.map((skill, index) => {
            const text = skill[lang] || skill.bn;
            const delayClass = `delay-${(index % 4) * 100}`;
            
            return (
              <div 
                key={index} 
                className={`card-glass reveal reveal-scale ${delayClass}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: '16px 20px', 
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                {/* Checkmark icon badge */}
                <div 
                  style={{ 
                    color: 'var(--color-accent)', 
                    fontWeight: '800', 
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    flexShrink: 0
                  }}
                >
                  ✔
                </div>
                
                <span 
                  style={{ 
                    fontSize: '0.92rem', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    lineHeight: '1.4'
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
