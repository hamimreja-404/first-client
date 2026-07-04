// Admin Dashboard Logic
document.addEventListener("DOMContentLoaded", () => {
  const authScreen = document.getElementById("auth-screen");
  const dashboardScreen = document.getElementById("dashboard-screen");
  const logoutBtn = document.getElementById("btn-logout");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const saveBar = document.getElementById("save-bar");
  const saveStatus = document.getElementById("save-status");
  const saveBtn = document.getElementById("btn-save");
  const contentForm = document.getElementById("content-form");

  let contentData = null;
  let hasUnsavedChanges = false;

  // --- 1. AUTHENTICATION HANDLERS ---
  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      showAuthScreen();
      return;
    }

    try {
      // Validate token and fetch data
      const response = await fetch('/api/content');
      if (response.status === 401 || response.status === 403) {
        throw new Error("Session expired");
      }
      
      contentData = await response.json();
      showDashboard();
      populateForm();
    } catch (error) {
      console.error("Auth validation failed:", error);
      localStorage.removeItem("adminToken");
      showAuthScreen();
    }
  };

  // Helper function to handle image upload via base64
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1];
          const token = localStorage.getItem("adminToken");
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ filename: file.name, base64Data })
          });
          
          const data = await response.json();
          if (response.ok && data.success) {
            resolve(data.fileUrl);
          } else {
            reject(new Error(data.message || "ছবি আপলোড ব্যর্থ হয়েছে।"));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const showAuthScreen = () => {
    authScreen.style.display = "flex";
    dashboardScreen.style.display = "none";
    logoutBtn.style.display = "none";
    saveBar.style.display = "none";
  };

  const showDashboard = () => {
    authScreen.style.display = "none";
    dashboardScreen.style.display = "block";
    logoutBtn.style.display = "block";
    saveBar.style.display = "flex";
  };

  // Login handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    loginError.style.display = "none";

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        await checkAuth();
      } else {
        throw new Error(data.message || "ভুল শংসাপত্র!");
      }
    } catch (error) {
      loginError.textContent = error.message;
      loginError.style.display = "block";
    }
  });

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    if (hasUnsavedChanges) {
      if (!confirm("আপনার কাছে সেভ না করা পরিবর্তন রয়েছে। আপনি কি নিশ্চিত যে লগআউট করতে চান?")) {
        return;
      }
    }
    localStorage.removeItem("adminToken");
    hasUnsavedChanges = false;
    showAuthScreen();
  });

  // --- 2. SIDEBAR TAB NAVIGATION ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".content-section");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetTab = btn.getAttribute("data-tab");
      sections.forEach(sec => {
        if (sec.id === targetTab) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });
    });
  });

  // --- 3. DYNAMIC FORM POPULATION ---
  const populateForm = () => {
    if (!contentData) return;

    // A. Populate Simple General and Trainer fields using data-key attributes
    const inputs = document.querySelectorAll("[data-key]");
    inputs.forEach(input => {
      const keyPath = input.getAttribute("data-key");
      if (keyPath.includes('.')) {
        const [parent, child] = keyPath.split('.');
        if (contentData[parent] && contentData[parent][child] !== undefined) {
          input.value = contentData[parent][child];
        }
      } else {
        if (contentData.translations && contentData.translations[keyPath] !== undefined) {
          input.value = contentData.translations[keyPath];
        }
      }
    });

    renderCoursesEditor();
    renderFaqsEditor();
    renderTestimonialsEditor();
    renderPoliciesEditor();

    // Reset unsaved changes state after popup values
    resetChangeTracker();
  };

  // --- 4. DYNAMIC SECTION EDITORS ---

  // A. Course Catalog Editor
  const renderCoursesEditor = () => {
    const coursesContainer = document.getElementById("courses-editor-container");
    if (!coursesContainer) return;
    coursesContainer.innerHTML = "";

    if (!contentData.courses) contentData.courses = [];

    contentData.courses.forEach((course, index) => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card-edit";
      courseCard.innerHTML = `
        <div class="course-card-edit-header">
          <h3>কোর্স #${index + 1}: ${course.title || 'নতুন কোর্স'}</h3>
          <div style="display: flex; gap: 10px; align-items: center;">
            <span style="background: rgba(99, 102, 241, 0.1); font-size: 0.75rem; padding: 4px 8px; border-radius: 4px;">ID: ${course.id || ''}</span>
            <button type="button" class="btn-delete btn-delete-course" data-index="${index}">মুছুন</button>
          </div>
        </div>
        <div class="flex-row">
          <div class="form-group">
            <label>কোর্স ID (অনন্য ইংরেজি নাম, যেমন: amazon)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="id" value="${course.id || ''}">
          </div>
          <div class="form-group">
            <label>ক্যাটেগরি</label>
            <select class="course-input" data-index="${index}" data-field="category">
              <option value="bundle" ${course.category === 'bundle' ? 'selected' : ''}>বান্ডিল (bundle)</option>
              <option value="marketplaces" ${course.category === 'marketplaces' ? 'selected' : ''}>মার্কেটপ্লেস (marketplaces)</option>
            </select>
          </div>
        </div>
        <div class="flex-row">
          <div class="form-group">
            <label>কোর্সের শিরোনাম (Title)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="title" value="${course.title || ''}">
          </div>
          <div class="form-group">
            <label>ব্যাজ (Badge, যেমন: Best Seller)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="badge" value="${course.badge || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>বর্ণনা (Description)</label>
          <textarea class="course-input" data-index="${index}" data-field="description" rows="3">${course.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label>কোর্সের কভার ইমেজ (Cover Image URL / Path)</label>
          <div style="display: flex; gap: 15px; align-items: center; margin-top: 5px; margin-bottom: 10px;">
            <input type="file" class="course-image-file" data-index="${index}" accept="image/*" style="width: auto;">
            <input type="text" class="course-input" data-index="${index}" data-field="image" value="${course.image || ''}" placeholder="/assets/images/course.png" readonly style="flex: 1;">
          </div>
          ${course.image ? `<img src="${course.image}" style="max-height: 100px; border-radius: 8px; border: 1px solid var(--border-color); display: block;" alt="Preview">` : ''}
        </div>
        <div class="flex-row">
          <div class="form-group">
            <label>ডিসকাউন্ট মূল্য (Price, e.g. ₹১,৯৯৯)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="price" value="${course.price || ''}">
          </div>
          <div class="form-group">
            <label>আসল মূল্য (Original Price, e.g. ₹৯,৯৯৯)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="originalPrice" value="${course.originalPrice || ''}">
          </div>
        </div>
        <div class="flex-row">
          <div class="form-group">
            <label>সময়কাল (Duration, e.g. ⌛ ১৮ ঘণ্টা)</label>
            <input type="text" class="course-input" data-index="${index}" data-field="duration" value="${course.duration || ''}">
          </div>
          <div class="form-group">
            <label>ভাষা</label>
            <input type="text" class="course-input" data-index="${index}" data-field="lang" value="${course.lang || '🇮🇳 হিন্দি'}">
          </div>
        </div>
        <div class="form-group">
          <label>ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট (Image Fallback Gradient)</label>
          <select class="course-input" data-index="${index}" data-field="imageFallbackGradient">
            <option value="gradient-orange-purple" ${course.imageFallbackGradient === 'gradient-orange-purple' ? 'selected' : ''}>Orange Purple</option>
            <option value="gradient-blue-cyan" ${course.imageFallbackGradient === 'gradient-blue-cyan' ? 'selected' : ''}>Blue Cyan</option>
            <option value="gradient-purple-pink" ${course.imageFallbackGradient === 'gradient-purple-pink' ? 'selected' : ''}>Purple Pink</option>
            <option value="gradient-dark-blue" ${course.imageFallbackGradient === 'gradient-dark-blue' ? 'selected' : ''}>Dark Blue</option>
            <option value="gradient-teal-green" ${course.imageFallbackGradient === 'gradient-teal-green' ? 'selected' : ''}>Teal Green</option>
            <option value="" ${!course.imageFallbackGradient ? 'selected' : ''}>None (No gradient)</option>
          </select>
        </div>
        <div class="form-group">
          <label>কারিকুলাম বুলেট পয়েন্ট (Curriculum - প্রতি লাইনে একটি করে লিখুন)</label>
          <textarea class="course-input" data-index="${index}" data-field="curriculum" rows="6">${(course.curriculum || []).join('\n')}</textarea>
        </div>
      `;
      coursesContainer.appendChild(courseCard);
    });

    // Bind course image upload inputs
    document.querySelectorAll(".course-image-file").forEach(input => {
      input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const index = parseInt(e.target.getAttribute("data-index"), 10);
        const textInput = e.target.closest(".form-group").querySelector('input[type="text"]');
        
        try {
          saveStatus.textContent = "ছবি আপলোড করা হচ্ছে...";
          saveStatus.className = "save-status-msg";
          
          const fileUrl = await uploadImage(file);
          
          contentData.courses[index].image = fileUrl;
          textInput.value = fileUrl;
          
          // Re-render editor list to show the new preview image
          renderCoursesEditor();
          markChanged();
          
          saveStatus.textContent = "ছবি সফলভাবে আপলোড করা হয়েছে!";
          saveStatus.className = "save-status-msg success";
        } catch (err) {
          alert("ছবি আপলোড ব্যর্থ হয়েছে: " + err.message);
          saveStatus.textContent = "ছবি আপলোড ত্রুটি: " + err.message;
          saveStatus.className = "save-status-msg error";
        }
      });
    });

    // Bind delete course buttons
    document.querySelectorAll(".btn-delete-course").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        if (confirm("আপনি কি নিশ্চিত যে এই курсটি ডিলিট করতে চান?")) {
          contentData.courses.splice(index, 1);
          renderCoursesEditor();
          markChanged();
        }
      });
    });
  };

  // B. FAQ Editor
  const renderFaqsEditor = () => {
    const faqsContainer = document.getElementById("faqs-editor-container");
    if (!faqsContainer) return;
    faqsContainer.innerHTML = "";

    if (!contentData.faqs) contentData.faqs = [];

    contentData.faqs.forEach((faq, index) => {
      const faqBlock = document.createElement("div");
      faqBlock.className = "course-card-edit";
      faqBlock.innerHTML = `
        <div class="course-card-edit-header">
          <h3>জিজ্ঞাসা #${index + 1}</h3>
          <button type="button" class="btn-delete btn-delete-faq" data-index="${index}">মুছুন</button>
        </div>
        <div class="form-group">
          <label>প্রশ্ন #${index + 1}</label>
          <input type="text" class="faq-input" data-index="${index}" data-field="q" value="${faq.q || ''}">
        </div>
        <div class="form-group">
          <label>উত্তর #${index + 1} (HTML Supported)</label>
          <textarea class="faq-input" data-index="${index}" data-field="a" rows="4">${faq.a || ''}</textarea>
        </div>
      `;
      faqsContainer.appendChild(faqBlock);
    });

    // Bind delete FAQ buttons
    document.querySelectorAll(".btn-delete-faq").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        if (confirm("আপনি কি নিশ্চিত যে এই FAQ-টি ডিলিট করতে চান?")) {
          contentData.faqs.splice(index, 1);
          renderFaqsEditor();
          markChanged();
        }
      });
    });
  };

  // C. Testimonial Editor
  const renderTestimonialsEditor = () => {
    const testimonialsContainer = document.getElementById("testimonials-editor-container");
    if (!testimonialsContainer) return;
    testimonialsContainer.innerHTML = "";

    if (!contentData.testimonials) contentData.testimonials = [];

    contentData.testimonials.forEach((testimonial, index) => {
      const testBlock = document.createElement("div");
      testBlock.className = "course-card-edit";
      testBlock.innerHTML = `
        <div class="course-card-edit-header">
          <h3>রিভিউ #${index + 1}</h3>
          <button type="button" class="btn-delete btn-delete-testimonial" data-index="${index}">মুছুন</button>
        </div>
        <div class="form-group">
          <label>প্রাক্তন শিক্ষার্থীর নাম</label>
          <input type="text" class="test-input" data-index="${index}" data-field="author" value="${testimonial.author || ''}">
        </div>
        <div class="form-group">
          <label>লোকেশন ও কোর্স (e.g. পোশাক বিক্রেতা, নতুন দিল্লি)</label>
          <input type="text" class="test-input" data-index="${index}" data-field="meta" value="${testimonial.meta || ''}">
        </div>
        <div class="form-group">
          <label>রিভিউ বার্তা (Quote Text)</label>
          <textarea class="test-input" data-index="${index}" data-field="quote" rows="3">${testimonial.quote || ''}</textarea>
        </div>
      `;
      testimonialsContainer.appendChild(testBlock);
    });

    // Bind delete testimonial buttons
    document.querySelectorAll(".btn-delete-testimonial").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        if (confirm("আপনি কি নিশ্চিত যে এই রিভিউটি ডিলিট করতে চান?")) {
          contentData.testimonials.splice(index, 1);
          renderTestimonialsEditor();
          markChanged();
        }
      });
    });
  };

  // D. Policies Editor
  const renderPoliciesEditor = () => {
    const policiesContainer = document.getElementById("policies-editor-container");
    if (!policiesContainer) return;
    policiesContainer.innerHTML = "";

    const policyTypes = [
      { id: 'privacy', name: 'Privacy Policy', keys: ['privacy_title', 'privacy_p1', 'privacy_h1', 'privacy_p2', 'privacy_li1', 'privacy_li2', 'privacy_li3', 'privacy_h2', 'privacy_p3', 'privacy_li4', 'privacy_li5', 'privacy_li6', 'privacy_li7', 'privacy_li8', 'privacy_h3', 'privacy_p4', 'privacy_h4', 'privacy_p5', 'privacy_h5', 'privacy_p6'] },
      { id: 'terms', name: 'Terms of Use', keys: ['terms_title', 'terms_p1', 'terms_h1', 'terms_p2', 'terms_h2', 'terms_p3', 'terms_li1', 'terms_li2', 'terms_li3', 'terms_h3', 'terms_p4', 'terms_h4', 'terms_p5', 'terms_h5', 'terms_p6'] },
      { id: 'refund', name: 'Refund Policy', keys: ['refund_title', 'refund_p1', 'refund_h1', 'refund_p2', 'refund_h2', 'refund_p3', 'refund_li1', 'refund_li2', 'refund_li3', 'refund_h3', 'refund_p4', 'refund_li4', 'refund_li5', 'refund_li6', 'refund_li7', 'refund_h4', 'refund_p5'] }
    ];

    policyTypes.forEach(policy => {
      const policyCard = document.createElement("div");
      policyCard.className = "course-card-edit";
      policyCard.innerHTML = `
        <div class="course-card-edit-header">
          <h3>${policy.name}</h3>
        </div>
        <div id="policy-${policy.id}-fields"></div>
      `;
      
      const fieldsContainer = policyCard.querySelector(`#policy-${policy.id}-fields`);
      
      policy.keys.forEach(key => {
        const isHeader = key.includes('_title') || key.includes('_h');
        const label = isHeader ? `শিরোনাম (${key})` : `অনুচ্ছেদ / লিস্ট আইটেম (${key})`;
        
        const formGroup = document.createElement("div");
        formGroup.className = "form-group";
        
        if (isHeader) {
          formGroup.innerHTML = `
            <label>${label}</label>
            <input type="text" class="policy-input" data-key="${key}" value="${contentData.translations[key] || ''}">
          `;
        } else {
          formGroup.innerHTML = `
            <label>${label}</label>
            <textarea class="policy-input" data-key="${key}" rows="3">${contentData.translations[key] || ''}</textarea>
          `;
        }
        fieldsContainer.appendChild(formGroup);
      });
      
      policiesContainer.appendChild(policyCard);
    });
  };

  // --- 5. TRACK CHANGES ---
  const resetChangeTracker = () => {
    hasUnsavedChanges = false;
    saveStatus.textContent = "কোনো পরিবর্তন করা হয়নি।";
    saveStatus.className = "save-status-msg";
    saveBtn.disabled = true;
    saveBtn.style.opacity = "0.6";
  };

  const markChanged = () => {
    hasUnsavedChanges = true;
    saveStatus.textContent = "আপনার কাছে সেভ না করা পরিবর্তন রয়েছে।";
    saveStatus.className = "save-status-msg error";
    saveBtn.disabled = false;
    saveBtn.style.opacity = "1";
  };

  // Warn user before leaving page with unsaved changes
  window.addEventListener("beforeunload", (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = "আপনার কাছে সেভ না করা পরিবর্তন রয়েছে। আপনি কি নিশ্চিত যে চলে যেতে চান?";
    }
  });

  // --- 6. ADD NEW BUTTONS LISTENERS ---
  const addCourseBtn = document.getElementById("btn-add-course");
  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", () => {
      if (!contentData) return;
      if (!contentData.courses) contentData.courses = [];
      
      // Push template course
      contentData.courses.push({
        id: "new-course-" + Date.now(),
        category: "marketplaces",
        badge: "",
        title: "নতুন কোর্স",
        description: "কোর্সের বর্ণনা এখানে লিখুন।",
        price: "₹৯৯৯",
        originalPrice: "₹২,৯৯৯",
        duration: "⌛ ১০ ঘণ্টা",
        lang: "🇮🇳 হিন্দি",
        imageFallbackGradient: "gradient-orange-purple",
        curriculum: ["মডিউল ১: পরিচিতি", "মডিউল ২: প্রাকটিক্যাল সেশন"]
      });
      
      renderCoursesEditor();
      markChanged();
      // Scroll to the bottom of editor container to show new card
      const container = document.getElementById("courses-editor-container");
      if (container && container.lastElementChild) {
        container.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const addFaqBtn = document.getElementById("btn-add-faq");
  if (addFaqBtn) {
    addFaqBtn.addEventListener("click", () => {
      if (!contentData) return;
      if (!contentData.faqs) contentData.faqs = [];

      contentData.faqs.push({
        q: "নতুন প্রশ্ন?",
        a: "উত্তর এখানে লিখুন।"
      });

      renderFaqsEditor();
      markChanged();
      const container = document.getElementById("faqs-editor-container");
      if (container && container.lastElementChild) {
        container.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const addTestimonialBtn = document.getElementById("btn-add-testimonial");
  if (addTestimonialBtn) {
    addTestimonialBtn.addEventListener("click", () => {
      if (!contentData) return;
      if (!contentData.testimonials) contentData.testimonials = [];

      contentData.testimonials.push({
        quote: "চমৎকার কোর্স! আমি অনেক কিছু শিখেছি।",
        author: "নতুন শিক্ষার্থীর নাম",
        meta: "উদ্যোক্তা, কলকাতা"
      });

      renderTestimonialsEditor();
      markChanged();
      const container = document.getElementById("testimonials-editor-container");
      if (container && container.lastElementChild) {
        container.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 6B. IMAGE UPLOAD INPUT LISTENERS ---
  const heroImageInput = document.getElementById("upload-hero-image");
  if (heroImageInput) {
    heroImageInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const pathInput = document.getElementById("gen-hero_image");
      try {
        saveStatus.textContent = "ব্যানার ছবি আপলোড করা হচ্ছে...";
        saveStatus.className = "save-status-msg";
        
        const fileUrl = await uploadImage(file);
        
        if (!contentData.translations) contentData.translations = {};
        contentData.translations.hero_image = fileUrl;
        if (pathInput) pathInput.value = fileUrl;
        
        markChanged();
        saveStatus.textContent = "ব্যানার ছবি সফলভাবে আপলোড করা হয়েছে!";
        saveStatus.className = "save-status-msg success";
      } catch (err) {
        alert("ছবি আপলোড ব্যর্থ হয়েছে: " + err.message);
        saveStatus.textContent = "ছবি আপলোড ত্রুটি: " + err.message;
        saveStatus.className = "save-status-msg error";
      }
    });
  }

  const trainerImageInput = document.getElementById("upload-trainer-image");
  if (trainerImageInput) {
    trainerImageInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const pathInput = document.getElementById("tr-trainer_image");
      try {
        saveStatus.textContent = "কোচের ছবি আপলোড করা হচ্ছে...";
        saveStatus.className = "save-status-msg";
        
        const fileUrl = await uploadImage(file);
        
        if (!contentData.translations) contentData.translations = {};
        contentData.translations.trainer_image = fileUrl;
        if (pathInput) pathInput.value = fileUrl;
        
        markChanged();
        saveStatus.textContent = "কোচের ছবি সফলভাবে আপলোড করা হয়েছে!";
        saveStatus.className = "save-status-msg success";
      } catch (err) {
        alert("ছবি আপলোড ব্যর্থ হয়েছে: " + err.message);
        saveStatus.textContent = "ছবি আপলোড ত্রুটি: " + err.message;
        saveStatus.className = "save-status-msg error";
      }
    });
  }

  // --- 7. AUTO-SYNC INPUT FIELDS TO DATA MODEL ---
  const handleFormInput = (e) => {
    const target = e.target;
    
    // Check if it's a dotted/direct translation field
    const keyPath = target.getAttribute("data-key");
    if (keyPath) {
      if (keyPath.includes('.')) {
        const [parent, child] = keyPath.split('.');
        if (contentData[parent]) {
          contentData[parent][child] = target.value;
          markChanged();
        }
      } else {
        if (!contentData.translations) contentData.translations = {};
        contentData.translations[keyPath] = target.value;
        markChanged();
      }
      return;
    }

    // Check if it's a dynamic course input
    const courseIndex = target.getAttribute("data-index");
    const courseField = target.getAttribute("data-field");
    if (courseIndex !== null && courseField && target.classList.contains("course-input")) {
      const idx = parseInt(courseIndex, 10);
      const course = contentData.courses[idx];
      if (course) {
        if (courseField === "curriculum") {
          course.curriculum = target.value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        } else {
          course[courseField] = target.value;
        }
        
        // Update header dynamically
        if (courseField === "title") {
          const headerEl = target.closest(".course-card-edit").querySelector(".course-card-edit-header h3");
          if (headerEl) {
            headerEl.textContent = `কোর্স #${idx + 1}: ${target.value || 'নতুন কোর্স'}`;
          }
        }
        if (courseField === "id") {
          const idSpan = target.closest(".course-card-edit").querySelector(".course-card-edit-header span");
          if (idSpan) {
            idSpan.textContent = `ID: ${target.value || ''}`;
          }
        }
        
        markChanged();
      }
      return;
    }

    // Check if it's a dynamic FAQ input
    const faqIndex = target.getAttribute("data-index");
    const faqField = target.getAttribute("data-field");
    if (faqIndex !== null && faqField && target.classList.contains("faq-input")) {
      const idx = parseInt(faqIndex, 10);
      const faq = contentData.faqs[idx];
      if (faq) {
        faq[faqField] = target.value;
        markChanged();
      }
      return;
    }

    // Check if it's a dynamic Testimonial input
    const testIndex = target.getAttribute("data-index");
    const testField = target.getAttribute("data-field");
    if (testIndex !== null && testField && target.classList.contains("test-input")) {
      const idx = parseInt(testIndex, 10);
      const testimonial = contentData.testimonials[idx];
      if (testimonial) {
        testimonial[testField] = target.value;
        markChanged();
      }
      return;
    }
  };

  contentForm.addEventListener("input", handleFormInput);
  contentForm.addEventListener("change", handleFormInput);

  // --- 8. SAVE CHANGES TO SERVER ---
  saveBtn.addEventListener("click", async () => {
    if (!contentData) return;

    saveStatus.textContent = "সেভ করা হচ্ছে...";
    saveStatus.className = "save-status-msg";

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("আপনার সেশন বাতিল হয়েছে! অনুগ্রহ করে আবার লগইন করুন।");
      showAuthScreen();
      return;
    }

    // Validation checks
    let hasValidationError = false;
    let errorMsg = "";
    
    const courseIds = new Set();
    for (let i = 0; i < contentData.courses.length; i++) {
      const course = contentData.courses[i];
      if (!course.id || !course.id.trim()) {
        hasValidationError = true;
        errorMsg = `কোর্স #${i + 1}-এর জন্য ID প্রদান করা আবশ্যক।`;
        break;
      }
      
      const cleanId = course.id.trim();
      if (!/^[a-z0-9-_]+$/.test(cleanId)) {
        hasValidationError = true;
        errorMsg = `কোর্স #${i + 1}-এর ID-তে শুধুমাত্র ছোট হাতের অক্ষর, সংখ্যা এবং ড্যাশ থাকতে পারবে (যেমন: amazon-mastery)।`;
        break;
      }
      
      if (courseIds.has(cleanId)) {
        hasValidationError = true;
        errorMsg = `ডুপ্লিকেট কোর্স ID সনাক্ত করা হয়েছে: "${cleanId}"। প্রতিটি কোর্সের ID অনন্য হতে হবে।`;
        break;
      }
      courseIds.add(cleanId);
    }
    
    if (hasValidationError) {
      alert(errorMsg);
      saveStatus.textContent = `ত্রুটি: ${errorMsg}`;
      saveStatus.className = "save-status-msg error";
      return;
    }

    // Send payload
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contentData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        saveStatus.textContent = "সফলভাবে সেভ করা হয়েছে!";
        saveStatus.className = "save-status-msg success";
        hasUnsavedChanges = false;
        
        // Disable save button again until next input
        setTimeout(() => {
          if (!hasUnsavedChanges) {
            resetChangeTracker();
          }
        }, 3000);
      } else {
        throw new Error(result.message || "সেভ করতে ব্যর্থ হয়েছে!");
      }
    } catch (error) {
      saveStatus.textContent = `ত্রুটি: ${error.message}`;
      saveStatus.className = "save-status-msg error";
    }
  });

  // Initialize page and verify authentication status
  checkAuth();
});
