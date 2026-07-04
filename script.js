/* ==========================================================================
   ADVINE ECOM ACADEMY - INTERACTIVITY & DYNAMIC FUNCTIONALITY (i18n Support)
   ========================================================================== */

let translations = {};
let courseDetailsData = {};

// --- DOM ELEMENTS SELECTION ---
document.addEventListener("DOMContentLoaded", async () => {

  const htmlEl = document.documentElement;

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");

  // Nav Elements
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Modals Backdrops
  const detailModal = document.getElementById("detail-modal");
  const checkoutModal = document.getElementById("checkout-modal");

  // Detail Modal Elements
  const detailModalClose = document.getElementById("detail-modal-close");
  const detailTitle = document.getElementById("detail-title");
  const detailBody = document.getElementById("detail-body");

  // Checkout Modal Elements
  const checkoutModalClose = document.getElementById("checkout-modal-close");
  const checkoutItemName = document.getElementById("checkout-item-name");
  const checkoutItemPrice = document.getElementById("checkout-item-price");
  const checkoutTotal = document.getElementById("checkout-total");
  const checkoutForm = document.getElementById("checkout-form");

  // Course Catalog Filtering
  const filterTabs = document.querySelectorAll(".filter-tab");

  // WhatsApp Widget
  const whatsappTrigger = document.getElementById("whatsapp-trigger");
  const whatsappChatBox = document.getElementById("whatsapp-chat-box");
  const chatClose = document.getElementById("chat-close");
  const waChatSendLink = document.getElementById("wa-chat-send-link");

  /* --- 1. LIGHT/DARK THEME IMPLEMENTATION --- */
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  /* --- 2. HEADER SCROLL EFFECT & MOBILE MENU --- */
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.style.padding = "10px 0";
        header.style.background = htmlEl.getAttribute("data-theme") === "dark"
          ? "rgba(8, 11, 17, 0.95)"
          : "rgba(249, 250, 251, 0.95)";
      } else {
        header.style.padding = "0";
        header.style.background = htmlEl.getAttribute("data-theme") === "dark"
          ? "rgba(8, 11, 17, 0.8)"
          : "rgba(249, 250, 251, 0.85)";
      }
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close Mobile Menu on Nav Link Click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");

      if (mobileToggle) mobileToggle.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  /* --- 3. COURSE FILTERING --- */
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");
      const currentCards = document.querySelectorAll(".course-card");

      currentCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transition = "opacity 0.4s ease";
          }, 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* --- 4. DETAILS MODAL HANDLER --- */
  const openDetailModal = (courseId) => {
    const currentLang = "bn";
    const data = courseDetailsData[courseId] ? courseDetailsData[courseId][currentLang] : null;
    if (!data) return;

    if (detailTitle) detailTitle.textContent = data.title;

    // Localized strings for modal elements
    const overviewLbl = "কোর্স ওভারভিউ";
    const durationLbl = "⏱ সময়কাল:";
    const langLbl = "🎯 ভাষা:";
    const langVal = "হিন্দি (হিংলিশ)";
    const curriculumLbl = "কারিকুলাম / মডিউলসমূহ";
    const btnBackText = "কোর্সে ফিরে যান";
    const btnEnrollText = "এখনই এনরোল করুন";

    // Construct modal HTML content
    let curriculumHTML = "";
    const curriculum = Array.isArray(data.curriculum) ? data.curriculum : [];
    curriculum.forEach(item => {
      if (!item) return;
      curriculumHTML += `
        <div class="detail-bullet-item">
          <span>✔</span>
          <p>${item}</p>
        </div>
      `;
    });

    if (detailBody) {
      detailBody.innerHTML = `
        <div class="detail-grid">
          <div>
            <h3>${overviewLbl}</h3>
            <p style="margin-top: 10px; color: var(--text-secondary); line-height: 1.6;">${data.description}</p>
            <div style="margin-top: 24px;">
              <strong>${durationLbl}</strong> <span style="color: var(--color-accent); font-weight: 600;">${data.duration}</span>
            </div>
            <div style="margin-top: 10px;">
              <strong>${langLbl}</strong> <span style="color: var(--text-secondary);">${langVal}</span>
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 16px;">
              <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-accent);">${data.price}</span>
              <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.95rem;">${data.originalPrice}</span>
            </div>
          </div>
          <div>
            <h3>${curriculumLbl}</h3>
            <div class="detail-bullets">
              ${curriculumHTML}
            </div>
          </div>
        </div>
        <div style="margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--border-color); padding-top: 20px;">
          <button class="btn btn-secondary" id="detail-close-inner-btn">${btnBackText}</button>
          <button class="btn btn-primary" id="detail-enroll-inner-btn" data-title="${data.title}" data-price="${data.price.replace("₹", "")}">${btnEnrollText}</button>
        </div>
      `;
    }

    if (detailModal) detailModal.classList.add("active");

    // Connect detail modal internal buttons
    const closeInnerBtn = document.getElementById("detail-close-inner-btn");
    if (closeInnerBtn) {
      closeInnerBtn.addEventListener("click", () => {
        if (detailModal) detailModal.classList.remove("active");
      });
    }

    const enrollInnerBtn = document.getElementById("detail-enroll-inner-btn");
    if (enrollInnerBtn) {
      enrollInnerBtn.addEventListener("click", (e) => {
        if (detailModal) detailModal.classList.remove("active");
        const title = e.currentTarget.getAttribute("data-title");
        const price = e.currentTarget.getAttribute("data-price");
        openCheckoutModal(title, price);
      });
    }
  };

  // Helper to bind events to dynamically rendered courses
  const bindDynamicCourseEvents = () => {
    // Attach click events to all Detail buttons
    document.querySelectorAll(".detail-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const courseId = e.currentTarget.getAttribute("data-course-id");
        openDetailModal(courseId);
      });
    });

    // Attach click events to all Buy/Enroll buttons
    document.querySelectorAll(".buy-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemName = e.currentTarget.getAttribute("data-course-title");
        const itemPrice = e.currentTarget.getAttribute("data-course-price");
        openCheckoutModal(itemName, itemPrice);
      });
    });
  };

  // Attach click event to Join Live trigger badge
  const joinLiveTrigger = document.getElementById("join-live-trigger");
  if (joinLiveTrigger) {
    joinLiveTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openDetailModal("workshop");
    });
  }

  if (detailModalClose) {
    detailModalClose.addEventListener("click", () => {
      if (detailModal) detailModal.classList.remove("active");
    });
  }

  /* --- 5. CHECKOUT MODAL HANDLER --- */
  const openCheckoutModal = (itemName, price) => {
    if (checkoutItemName) checkoutItemName.textContent = itemName;
    
    // Format price correctly ensuring it has ₹ symbol and handles unicode digits
    const formattedPrice = price.startsWith('₹') ? price : `₹${price}`;
    
    if (checkoutItemPrice) checkoutItemPrice.textContent = formattedPrice;
    if (checkoutTotal) checkoutTotal.textContent = formattedPrice;
    if (checkoutModal) checkoutModal.classList.add("active");
  };

  if (checkoutModalClose) {
    checkoutModalClose.addEventListener("click", () => {
      if (checkoutModal) checkoutModal.classList.remove("active");
    });
  }

  // Handle Checkout Form Submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cust-name").value;
      const email = document.getElementById("cust-email").value;
      const phone = document.getElementById("cust-phone").value;
      const courseTitle = checkoutItemName ? checkoutItemName.textContent : "";

      // Construct WhatsApp message URL
      const targetNumber = "919999999999";
      
      const message = `হ্যালো ইকম একাডেমি, আমি নিম্নলিখিত কোর্সে নথিভুক্ত করতে চাই:\n\n📚 *কোর্স:* ${courseTitle}\n\n👤 *আমার বিবরণ:*\n- *নাম:* ${name}\n- *ইমেল:* ${email}\n- *ফোন:* ${phone}`;

      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

      // Redirect customer to WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      checkoutForm.reset();
      if (checkoutModal) checkoutModal.classList.remove("active");
    });
  }

  // Global modal backdrop close
  window.addEventListener("click", (e) => {
    if (e.target === detailModal) detailModal.classList.remove("active");
    if (e.target === checkoutModal) checkoutModal.classList.remove("active");
  });

  /* --- 7. FAQS ACCORDION --- */
  const bindAccordionEvents = () => {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const isActive = item.classList.contains("active");

        // Close all accordion items first
        document.querySelectorAll(".accordion-item").forEach(i => {
          i.classList.remove("active");
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  };

  /* --- 9. WHATSAPP CHAT POPUP --- */
  if (whatsappTrigger && whatsappChatBox) {
    whatsappTrigger.addEventListener("click", () => {
      whatsappChatBox.classList.toggle("active");
    });
  }

  if (chatClose && whatsappChatBox) {
    chatClose.addEventListener("click", (e) => {
      e.stopPropagation();
      whatsappChatBox.classList.remove("active");
    });
  }

  // Auto trigger WhatsApp chat suggestion after 8 seconds of page load
  setTimeout(() => {
    const tooltip = document.querySelector(".whatsapp-tooltip");
    if (tooltip) {
      tooltip.style.opacity = "1";
      setTimeout(() => {
        tooltip.style.opacity = "";
      }, 5000);
    }
  }, 8000);

  /* --- 10. DYNAMIC RENDER HELPERS --- */
  const renderCourses = (courses) => {
    const coursesGrid = document.getElementById("courses-grid");
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = "";
    if (!Array.isArray(courses)) return;
    
    courses.forEach(course => {
      if (!course) return;
      // Get first 2-3 curriculum bullets for the preview card
      let featuresHTML = "";
      const previewFeats = Array.isArray(course.curriculum) ? course.curriculum.slice(0, 3) : [];
      previewFeats.forEach(feat => {
        if (!feat) return;
        featuresHTML += `
          <div class="feature-line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${feat}</span>
          </div>
        `;
      });
      
      const badgeHTML = course.badge 
        ? `<div class="course-badge ${course.badge === 'Best Seller' ? 'badge-hot' : course.badge === 'Popular' ? 'badge-popular' : 'badge-new'}">${course.badge}</div>` 
        : "";
        
      const imageHTML = course.image
        ? `<img src="${course.image}" alt="${course.title || ''}" class="course-card-image">`
        : (course.id === 'bundle'
          ? `<img src="assets/images/bundle.png" alt="${course.title || ''}" class="course-card-image">`
          : `<div class="course-card-fallback ${course.imageFallbackGradient || 'gradient-orange-purple'}">
               <span>${course.title || ''}</span>
             </div>`);

      const card = document.createElement("div");
      card.className = "course-card";
      card.setAttribute("data-category", course.category || "marketplaces");
      card.innerHTML = `
        ${badgeHTML}
        <div class="course-image-container">
          ${imageHTML}
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span class="course-duration">${course.duration || ''}</span>
            <span class="course-lang">${course.lang || ''}</span>
          </div>
          <h3 class="course-title">${course.title || ''}</h3>
          <p class="course-description">${course.description || ''}</p>
          
          <div class="course-features">
            ${featuresHTML}
          </div>
          
          <div class="course-footer">
            <div class="course-pricing">
              <span class="original-price">${course.originalPrice || ''}</span>
              <span class="current-price">${course.price || ''}</span>
            </div>
            <div class="course-actions">
              <button class="btn btn-secondary btn-small detail-btn" data-course-id="${course.id || ''}">বিস্তারিত</button>
              <button class="btn btn-primary btn-small buy-btn" data-course-title="${course.title || ''}" data-course-price="${course.price || ''}">এনরোল</button>
            </div>
          </div>
        </div>
      `;
      coursesGrid.appendChild(card);
    });

    bindDynamicCourseEvents();
  };

  const renderTestimonials = (testimonials) => {
    const testimonialsGrid = document.getElementById("testimonials-grid");
    if (!testimonialsGrid) return;
    
    testimonialsGrid.innerHTML = "";
    if (!Array.isArray(testimonials)) return;
    
    testimonials.forEach(test => {
      if (!test) return;
      const initials = (test.author || '')
        .split(' ')
        .map(n => n[0])
        .filter(Boolean)
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const card = document.createElement("div");
      card.className = "testimonial-card card-glass";
      card.innerHTML = `
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonial-quote">${test.quote || ''}</p>
        <div class="testimonial-author">
          <div class="author-initials">${initials || 'EC'}</div>
          <div>
            <h4 class="author-name">${test.author || ''}</h4>
            <p class="author-meta">${test.meta || ''}</p>
          </div>
        </div>
      `;
      testimonialsGrid.appendChild(card);
    });
  };

  const renderFAQs = (faqs) => {
    const accordion = document.getElementById("faqs-accordion");
    if (!accordion) return;
    
    accordion.innerHTML = "";
    if (!Array.isArray(faqs)) return;
    
    faqs.forEach(faq => {
      if (!faq) return;
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <button class="accordion-header">
          <span>${faq.q || ''}</span>
          <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
          <p>${faq.a || ''}</p>
        </div>
      `;
      accordion.appendChild(item);
    });

    bindAccordionEvents();
  };

  /* --- 11. INTERNATIONALIZATION (i18n) ENGINE --- */
  const applyLanguage = (lang) => {
    // Find all elements with data-i18n
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Find all elements with data-i18n-src
    const imgElements = document.querySelectorAll("[data-i18n-src]");
    imgElements.forEach(el => {
      const key = el.getAttribute("data-i18n-src");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.src = translations[lang][key];
      }
    });

    // Find all elements with data-i18n-placeholder
    const inputs = document.querySelectorAll("[data-i18n-placeholder]");
    inputs.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.placeholder = translations[lang][key];
      }
    });

    // Update WhatsApp chat box link dynamically
    if (waChatSendLink) {
      waChatSendLink.href = "https://wa.me/919999999999?text=" + encodeURIComponent("হ্যালো, আমি ইকম একাডেমির কোর্সগুলোতে আগ্রহী।");
    }

    // Save language to localStorage and HTML attribute
    localStorage.setItem("lang", lang);
    htmlEl.setAttribute("lang", lang);

    // Add loaded class to body to transition visibility
    document.body.classList.add("loaded");
  };

  // Initialize Language
  try {
    const response = await fetch('/api/content');
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    
    translations = { bn: data.translations };
    
    // Map dynamic courses array into courseDetailsData format for the detail modal
    courseDetailsData = {};
    const coursesList = Array.isArray(data.courses) ? data.courses : [];
    coursesList.forEach(course => {
      if (!course || !course.id) return;
      courseDetailsData[course.id] = {
        bn: {
          title: course.title || '',
          description: course.description || '',
          curriculum: course.curriculum || [],
          duration: course.duration || '',
          price: course.price || '',
          originalPrice: course.originalPrice || ''
        }
      };
    });

    // Render all elements
    renderCourses(data.courses);
    renderTestimonials(data.testimonials);
    renderFAQs(data.faqs);
    
    // Check if workshop course exists, if not hide the join live trigger badge
    const workshopExists = coursesList.some(c => c && c.id === 'workshop');
    const joinLiveTrigger = document.getElementById("join-live-trigger");
    if (joinLiveTrigger) {
      joinLiveTrigger.style.display = workshopExists ? 'flex' : 'none';
    }
    
    applyLanguage("bn");
  } catch (error) {
    console.error("Error loading website content, falling back to static:", error);
    document.body.classList.add("loaded");
  }
});
