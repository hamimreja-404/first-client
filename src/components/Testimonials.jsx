import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { contents } from '../contents';

function Testimonials({ lang, showToast }) {
  const t = contents.translations[lang];
  
  // State for active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // State for testimonials list (initialized from static content)
  const [testimonialsList, setTestimonialsList] = useState(contents.testimonials);

  // Form states
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  // Swipe gesture support for mobile viewports
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Initial reveal animation trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle window resizing to detect mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide effect (auto-advances every 5 seconds)
  useEffect(() => {
    if (isHovered || formOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsList.length, isHovered, formOpen]);

  // Lock body & html scrolling when review form modal is open
  useEffect(() => {
    if (formOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [formOpen]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped Left -> Next slide
      handleNext();
    }
    if (touchStart - touchEnd < -50) {
      // Swiped Right -> Previous slide
      handlePrev();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    setName('');
    setLocation('');
    setRating(5);
    setReview('');
    setPhotoPreview('');
    setFormOpen(false);

    const thankYouMsg = lang === 'bn' 
      ? 'রিভিউ দেওয়ার জন্য ধন্যবাদ! আপনার মতামত সফলভাবে জমা হয়েছে।' 
      : 'Thank You for your review! Your feedback has been submitted successfully.';
    
    if (showToast) {
      showToast(thankYouMsg);
    }
  };

  // Get responsive dynamic card styling for the 3D layered look
  const getCardStyle = (index) => {
    const total = testimonialsList.length;
    const diff = (index - activeIndex + total) % total;

    // Staggered reveal animation variables on mount
    const staggerDelay = `${index * 150}ms`;

    if (!mounted) {
      return {
        transform: 'translateY(30px)',
        opacity: 0,
        visibility: 'visible',
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        transitionDelay: staggerDelay
      };
    }

    if (diff === 0) {
      // Center Active Card
      return {
        transform: 'scale(1) translateX(0)',
        opacity: 1,
        zIndex: 3,
        visibility: 'visible',
        pointerEvents: 'auto',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--color-primary)',
        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)'
      };
    } else if (diff === total - 1 || (total === 2 && diff === 1)) {
      // Left Preview Card (dimmed, smaller, pushed back)
      return {
        transform: isMobile ? 'scale(0.8) translateX(-120%)' : 'scale(0.85) translateX(-280px)',
        opacity: isMobile ? 0 : 0.45,
        zIndex: 1,
        visibility: isMobile ? 'hidden' : 'visible',
        pointerEvents: 'none',
        background: 'rgba(var(--color-primary-rgb), 0.03)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
      };
    } else if (diff === 1) {
      // Right Preview Card (dimmed, smaller, pushed back)
      return {
        transform: isMobile ? 'scale(0.8) translateX(120%)' : 'scale(0.85) translateX(280px)',
        opacity: isMobile ? 0 : 0.45,
        zIndex: 1,
        visibility: isMobile ? 'hidden' : 'visible',
        pointerEvents: 'none',
        background: 'rgba(var(--color-primary-rgb), 0.03)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
      };
    } else {
      // Completely Hidden Cards (behind center)
      return {
        transform: 'scale(0.7) translateX(0)',
        opacity: 0,
        zIndex: 0,
        visibility: 'hidden',
        pointerEvents: 'none'
      };
    }
  };

  // Localization variables
  const labels = {
    en: {
      writeReviewBtn: "Write your Review",
      closeFormBtn: "Cancel",
      formTitle: "Share Your Success Story",
      lblName: "Your Full Name",
      lblLocation: "Your Location & Profession",
      lblRating: "Rating (Stars)",
      lblReview: "Your Review Message",
      lblPhoto: "Upload Your Photo (Optional)",
      phName: "Enter your name",
      phLocation: "e.g., Clothing Seller, Mumbai",
      phReview: "How did Ecom Academy help your business?",
      submitBtn: "Submit Review"
    },
    bn: {
      writeReviewBtn: "আপনার রিভিউ লিখুন",
      closeFormBtn: "বাতিল করুন",
      formTitle: "আপনার সাফল্যের গল্প শেয়ার করুন",
      lblName: "আপনার পুরো নাম",
      lblLocation: "আপনার পেশা ও অবস্থান",
      lblRating: "রেটিং (স্টার)",
      lblReview: "আপনার রিভিউ বার্তা",
      lblPhoto: "আপনার ছবি আপলোড করুন (ঐচ্ছিক)",
      phName: "আপনার নাম লিখুন",
      phLocation: "যেমন: পোশাক বিক্রেতা, নতুন দিল্লি",
      phReview: "ইকম একাডেমি কীভাবে আপনার ব্যবসাকে সাহায্য করেছে?",
      submitBtn: "রিভিউ সাবমিট করুন"
    }
  };

  const l = labels[lang] || labels.bn;

  return (
    <section 
      className="testimonials-section" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: 'var(--section-padding) 0', 
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, rgba(99, 102, 241, 0.05) 100%)' 
      }}
    >
      {/* Floating Background Concentric Ripple Waves SVG */}
      <svg 
        className="animate-pulse-slow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          opacity: 0.04,
          zIndex: 0,
          pointerEvents: 'none',
          color: 'var(--color-primary)'
        }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.25" />
        <circle cx="50" cy="50" r="55" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="75" fill="none" stroke="currentColor" strokeWidth="0.35" />
      </svg>

      <div className="container" style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}>
        {/* Custom Styles for Nav Arrows and Pagination Pill Shapes */}
        <style dangerouslySetInnerHTML={{ __html: `
          .carousel-arrow {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--color-primary);
            box-shadow: var(--card-shadow);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }
          .carousel-arrow:hover {
            transform: translateY(-50%) scale(1.1);
            border-color: var(--color-primary);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.25);
          }
          .arrow-left { left: 10px; }
          .arrow-right { right: 10px; }
          
          .dot {
            height: 10px;
            border-radius: 50%;
            background: var(--border-color);
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .dot.active {
            background: var(--color-primary);
            border-radius: 10px;
          }
          
          @media (max-width: 768px) {
            .carousel-arrow {
              display: none !important;
            }
          }
          @media (max-width: 550px) {
            .review-modal-form-grid {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }
          }
        `}} />

        {/* Header with Title and Write Review Button */}
        <div 
          className="reveal reveal-left"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '48px', 
            flexWrap: 'wrap', 
            gap: '20px',
            position: 'relative',
            zIndex: 5
          }}
        >
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div className="badge-glow" style={{ marginBottom: '16px' }}>{t.test_badge}</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t.test_title}</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '600px' }}>{t.test_subtitle}</p>
          </div>

          {/* Top Right "Write your Review" Button */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setFormOpen(true)}
              style={{ fontWeight: '600' }}
            >
              {l.writeReviewBtn}
            </button>
          </div>
        </div>

        {/* Pop Up Form Modal */}
        {formOpen && createPortal(
          <div className="modal-backdrop active" onClick={() => setFormOpen(false)}>
            <div className="modal card-glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', margin: 'auto' }}>
              <button className="modal-close" onClick={() => setFormOpen(false)}>&times;</button>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', textAlign: 'center', fontWeight: '700' }}>
                {l.formTitle}
              </h3>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="review-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rev-name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{l.lblName}</label>
                    <input 
                      type="text" 
                      id="rev-name" 
                      required 
                      placeholder={l.phName}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rev-loc" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{l.lblLocation}</label>
                    <input 
                      type="text" 
                      id="rev-loc" 
                      required 
                      placeholder={l.phLocation}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div className="review-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rev-rating" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{l.lblRating}</label>
                    <select 
                      id="rev-rating" 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}
                      style={{ 
                        padding: '12px', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--border-radius-sm)', 
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                      <option value="2">⭐⭐ (2 Stars)</option>
                      <option value="1">⭐ (1 Star)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rev-photo" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{l.lblPhoto}</label>
                    <input 
                      type="file" 
                      id="rev-photo" 
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ padding: '8px 0', color: 'var(--text-secondary)' }}
                    />
                  </div>
                </div>

                {photoPreview && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-8px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <img src={photoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="rev-msg" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{l.lblReview}</label>
                  <textarea 
                    id="rev-msg" 
                    required 
                    rows="3" 
                    placeholder={l.phReview}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    style={{ 
                      padding: '12px 16px', 
                      background: 'var(--bg-secondary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--border-radius-sm)', 
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontWeight: '600' }}
                >
                  {l.submitBtn}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

        {/* 3D Layered Carousel Deck */}
        <div 
          className="reveal reveal-scale delay-200"
          style={{ 
            position: 'relative', 
            height: '420px', 
            margin: '0 auto', 
            maxWidth: '960px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button (Floats at outer edge, hidden on mobile) */}
          <button 
            className="carousel-arrow arrow-left" 
            onClick={handlePrev}
            aria-label="Previous testimonials"
          >
            &lt;
          </button>

          {/* Testimonial Cards Render Deck */}
          {testimonialsList.map((test, index) => {
            const details = test[lang] || test.bn;
            const starsString = "★".repeat(test.rating || 5);
            const isCenterCard = index === activeIndex;

            return (
              <div 
                key={index} 
                className="testimonial-card"
                style={{ 
                  position: 'absolute',
                  width: '90%',
                  maxWidth: '520px',
                  padding: '36px', 
                  borderRadius: '24px', 
                  transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.55s ease, z-index 0.55s ease, border-color 0.3s ease',
                  ...getCardStyle(index)
                }}
              >
                {/* Large Decorative Quote Watermark (Top right, active card only) */}
                {isCenterCard && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '30px',
                    fontSize: '6.5rem',
                    color: 'rgba(99, 102, 241, 0.15)',
                    fontWeight: '900',
                    fontFamily: 'serif',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}>
                    “
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Card Header Profile Block */}
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Rounded Square Profile Photo */}
                    <div 
                      style={{ 
                        width: '68px', 
                        height: '68px', 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <img 
                        src={test.image} 
                        alt={details.author} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    {/* Author Meta Details */}
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: '1.25' }}>
                        {details.author}
                      </h4>
                      {/* Star Rating Row */}
                      <div className="stars" style={{ color: '#fbbf24', fontSize: '0.95rem', margin: '4px 0', letterSpacing: '1px' }}>
                        {starsString}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '500' }}>
                        {details.meta}
                      </p>
                    </div>
                  </div>

                  {/* Thin Divider Line */}
                  <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '20px' }}></div>

                  {/* Quote Message Text */}
                  <p 
                    style={{ 
                      fontSize: '0.94rem', 
                      color: 'var(--text-secondary)', 
                      margin: 0, 
                      lineHeight: '1.7',
                      fontWeight: '400',
                      fontStyle: 'normal'
                    }}
                  >
                    "{details.quote}"
                  </p>
                </div>
              </div>
            );
          })}

          {/* Right Arrow Button (Floats at outer edge, hidden on mobile) */}
          <button 
            className="carousel-arrow arrow-right" 
            onClick={handleNext}
            aria-label="Next testimonials"
          >
            &gt;
          </button>
        </div>

        {/* Dynamic Pagination Pill Dots Below Center Card */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {testimonialsList.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button 
                key={index} 
                className={`dot ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{ 
                  width: isActive ? '24px' : '10px',
                  padding: 0,
                  border: 'none',
                  outline: 'none'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
