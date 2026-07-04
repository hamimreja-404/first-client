import React, { useState } from 'react';
import { contents } from '../contents';

function Courses({ lang, onSelectDetailCourse, onSelectCheckoutCourse }) {
  const [activeTab, setActiveTab] = useState('all');
  const t = contents.translations[lang];
  const { courses } = contents;

  // Filter courses based on activeTab
  const filteredCourses = courses.filter((course) => {
    if (activeTab === 'all') return true;
    return course.category === activeTab;
  });

  return (
    <section className="courses-section" id="courses" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Background Hexagon Web Pattern (SVG) */}
      <svg 
        className="animate-spin-slow"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none',
          color: 'var(--color-secondary)'
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
      >
        <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
        <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" />
        <line x1="50" y1="1" x2="50" y2="99" />
        <line x1="5" y1="25" x2="95" y2="75" />
        <line x1="95" y1="25" x2="5" y2="75" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Block with Reveal Animation */}
        <div className="section-header reveal reveal-scale" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge-glow" style={{ margin: '0 auto 16px auto' }}>{t.catalog_badge}</div>
          <h2 className="section-title">{t.catalog_title}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>{t.catalog_subtitle}</p>
        </div>

        {/* Filter Tabs with Reveal Animation */}
        <div className="filter-tabs reveal delay-100" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button 
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {t.tab_all}
          </button>
          <button 
            className={`filter-tab ${activeTab === 'bundle' ? 'active' : ''}`}
            onClick={() => setActiveTab('bundle')}
          >
            {t.tab_bundle}
          </button>
          <button 
            className={`filter-tab ${activeTab === 'marketplaces' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplaces')}
          >
            {t.tab_marketplaces}
          </button>
        </div>

        {/* Courses Cards Grid */}
        <div className="courses-grid" id="courses-grid">
          {filteredCourses.map((course, idx) => {
            // Localized fields for course card
            const details = course[lang] || course.bn;
            const previewFeats = Array.isArray(details.curriculum) ? details.curriculum.slice(0, 3) : [];
            
            const badgeClass = course.badge === 'Best Seller' 
              ? 'badge-hot' 
              : course.badge === 'Popular' 
                ? 'badge-popular' 
                : 'badge-new';

            // Calculate stagger animation delay based on card grid index
            const delayClass = `delay-${(idx % 3) * 100}`;

            return (
              <div 
                key={course.id} 
                className={`course-card reveal reveal-scale ${delayClass}`}
                data-category={course.category}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {course.badge && (
                  <div className={`course-badge ${badgeClass}`}>
                    {course.badge === 'Best Seller' ? t.course_badge_best 
                     : course.badge === 'Popular' ? t.course_badge_popular 
                     : t.course_badge_budget}
                  </div>
                )}

                <div className="course-image-container">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={details.title} 
                      className="course-card-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className={`course-card-fallback ${course.imageFallbackGradient || 'gradient-orange-purple'}`}>
                      <span>{details.title}</span>
                    </div>
                  )}
                </div>

                <div className="course-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="course-meta">
                    <span className="course-duration">{details.duration}</span>
                    <span className="course-lang">{t.course_lang}</span>
                  </div>
                  
                  <h3 className="course-title">{details.title}</h3>
                  <p className="course-description">{details.description}</p>
                  
                  <div className="course-features" style={{ flexGrow: 1, margin: '20px 0' }}>
                    {previewFeats.map((feat, index) => (
                      <div key={index} className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--color-primary)', fontSize: '1rem' }}>✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="course-actions" style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button 
                      className="btn btn-secondary btn-small details-btn" 
                      onClick={() => onSelectDetailCourse(course.id)}
                    >
                      {t.course_btn_details}
                    </button>
                    <button 
                      className="btn btn-primary btn-small buy-btn" 
                      onClick={() => onSelectCheckoutCourse(details.title, details.price)}
                    >
                      {t.course_btn_enroll}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Courses;
