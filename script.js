/* ==========================================================================
   ADVINE ECOM ACADEMY - INTERACTIVITY & DYNAMIC FUNCTIONALITY
   ========================================================================== */

// --- COURSE DATABASE ---
const courseDetailsData = {
  bundle: {
    title: "Ecommerce Course Bundle (All-in-One)",
    description: "The ultimate package for anyone serious about building a high-growth ecommerce business in India. This bundle compiles all our flagship seller courses into one cohesive roadmap, designed to take you from a absolute beginner to an independent seller on multiple marketplaces.",
    curriculum: [
      "Introduction to Indian E-commerce Landscapes & Margins",
      "GST, Trademark, & Company Registration Walkthrough",
      "Amazon Seller Central Mastery (Beginner to PPC Advertising)",
      "Flipkart Seller Portal Onboarding & Scaling Masterclass",
      "Meesho Social Commerce Launchpad & Low-budget Ads",
      "Product Sourcing Secrets: Direct Delhi & Mumbai Wholesaler Connections",
      "800+ Top Sourced Winning Products Database (xlsx)",
      "Weekly Live Zoom Consultation Calls (Lifetime Access)"
    ],
    duration: "Lifetime Access (40+ Hours of On-Demand Videos)",
    price: "₹1,999",
    originalPrice: "₹9,999"
  },
  amazon: {
    title: "Amazon Seller Mastery Course",
    description: "Master India's largest search-based ecommerce platform. Learn how to identify high-demand products, list them with optimal search engine terms, optimize conversion layouts, set up FBA (Fulfillment by Amazon) or Easy Ship, and build high-converting PPC campaigns to outrank competitors.",
    curriculum: [
      "Understanding Amazon's Search Algorithm (A10 Search Engine)",
      "Product Hunting: Helium 10 & Jungle Scout walkthroughs",
      "Creating SEO-Optimized Product Listings (H1, Bullet Points, Description)",
      "Setting up Amazon FBA (Fulfillment by Amazon) and Send-to-Amazon shipment",
      "Amazon PPC Ads: Broad, Phrase, Exact, Auto vs Manual Campaigns",
      "Brand Registry, A+ Content (EBC) & Storefront design basics",
      "Review Generation Strategies & Negative Feedback Removal hacks"
    ],
    duration: "Lifetime Access (18 Hours)",
    price: "₹1,499",
    originalPrice: "₹4,999"
  },
  flipkart: {
    title: "Flipkart Launchpad Masterclass",
    description: "Flipkart remains a massive player in Indian fashion, electronics, and home decors. This course covers everything you need to leverage Flipkart's massive Tier-2 and Tier-3 userbase. Learn to manage shipping, optimize listings, configure Flipkart ads, and scale your sales during Big Billion Days.",
    curriculum: [
      "Flipkart Seller Hub Setup & Verification guidelines",
      "Single Listing vs. Bulk Listing uploads",
      "Understanding Flipkart's Tier levels (Bronze, Silver, Gold)",
      "Flipkart Smart Fulfillment & Assured badge requirements",
      "Setting up Flipkart Product Ads & PLA campaigns",
      "Reconciliation of Payments & Safe Return claims"
    ],
    duration: "Lifetime Access (10 Hours)",
    price: "₹999",
    originalPrice: "₹2,999"
  },
  meesho: {
    title: "Meesho Seller Success Course",
    description: "Meesho is revolutionizing social commerce in India with its zero-commission model. Ideal for beginners or small local shop owners who have limited investment budget. Learn how to set up, upload catalogs, optimize pricing to trigger Meesho's organic recommendation algorithm, and manage reverse logistics.",
    curriculum: [
      "Introduction to Meesho's Zero Commission Model",
      "Setting up Meesho Seller Account & GST requirements",
      "Catalog upload guidelines and Image editing hacks",
      "Meesho Recommendation System: How to get organic views",
      "Meesho Ads Panel: Bidding & budget management",
      "RTO (Return to Origin) management & claims procedure"
    ],
    duration: "Lifetime Access (8 Hours)",
    price: "₹499",
    originalPrice: "₹1,499"
  },
  wordpress: {
    title: "WordPress Ecommerce Website Course",
    description: "Stop paying high recurring fees on platforms like Shopify. Learn how to launch your own standalone online store using WordPress and WooCommerce. Build a brand asset that you fully own. Ideal for sellers wanting to scale via Instagram Ads or freelancers wanting to offer web development services.",
    curriculum: [
      "Domain registration & Choosing reliable Web Hosting",
      "WordPress Installation & Essential Security Plugins setup",
      "WooCommerce Configuration & Storefront Customization (Elementor)",
      "Adding Products, Categories, Variations & Inventory tracking",
      "Integrating Payment Gateways (Razorpay/Instamojo/Cashfree)",
      "Setting up Cash on Delivery (COD) shipping options (Shiprocket)",
      "Google Analytics & Facebook Pixel setup for retargeting"
    ],
    duration: "Lifetime Access (12 Hours)",
    price: "₹1,499",
    originalPrice: "₹4,999"
  },
  workshop: {
    title: "Ecommerce Live Kickstart Workshop",
    description: "A fast-paced, interactive workshop for absolute beginners. We strip away the complex jargon and show you the exact roadmap, investment required, and operational setups needed to sell online. Perfect for validating if e-commerce is the right path for you.",
    curriculum: [
      "Reality Check: Budget & Investment roadmap for Indian sellers",
      "How to search local wholesale hubs (Sadar Bazar, Surat, Tirupur)",
      "The E-Commerce Profit Calculator walk-through",
      "Live packaging demo (Amazon/Flipkart shipping standards)",
      "Live Q&A with Tathastu Sharma to clear your personal doubts"
    ],
    duration: "2-Hour Live Zoom Session + Recording Access",
    price: "₹499",
    originalPrice: "₹999"
  }
};

// --- DOM ELEMENTS SELECTION ---
document.addEventListener("DOMContentLoaded", () => {

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

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
  const courseCards = document.querySelectorAll(".course-card");



  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  // WhatsApp Widget
  const whatsappTrigger = document.getElementById("whatsapp-trigger");
  const whatsappChatBox = document.getElementById("whatsapp-chat-box");
  const chatClose = document.getElementById("chat-close");

  /* --- 1. LIGHT/DARK THEME IMPLEMENTATION --- */
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  /* --- 2. HEADER SCROLL EFFECT & MOBILE MENU --- */
  window.addEventListener("scroll", () => {
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
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close Mobile Menu on Nav Link Click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");

      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  /* --- 3. COURSE FILTERING --- */
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");

      courseCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          // Add small fade animation
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
    const data = courseDetailsData[courseId];
    if (!data) return;

    detailTitle.textContent = data.title;

    // Construct modal HTML content
    let curriculumHTML = "";
    data.curriculum.forEach(item => {
      curriculumHTML += `
        <div class="detail-bullet-item">
          <span>✔</span>
          <p>${item}</p>
        </div>
      `;
    });

    detailBody.innerHTML = `
      <div class="detail-grid">
        <div>
          <h3>Course Overview</h3>
          <p style="margin-top: 10px; color: var(--text-secondary); line-height: 1.6;">${data.description}</p>
          <div style="margin-top: 24px;">
            <strong>⏱ Duration:</strong> <span style="color: var(--color-accent); font-weight: 600;">${data.duration}</span>
          </div>
          <div style="margin-top: 10px;">
            <strong>🎯 Language:</strong> <span style="color: var(--text-secondary);">Hindi (Hinglish)</span>
          </div>
          <div style="margin-top: 20px; display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-accent);">${data.price}</span>
            <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.95rem;">${data.originalPrice}</span>
          </div>
        </div>
        <div>
          <h3>Curriculum / Modules</h3>
          <div class="detail-bullets">
            ${curriculumHTML}
          </div>
        </div>
      </div>
      <div style="margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--border-color); padding-top: 20px;">
        <button class="btn btn-secondary" id="detail-close-inner-btn">Back to Courses</button>
        <button class="btn btn-primary" id="detail-enroll-inner-btn" data-title="${data.title}" data-price="${data.price.replace("₹", "")}">Enroll Now</button>
      </div>
    `;

    detailModal.classList.add("active");

    // Connect detail modal internal buttons
    document.getElementById("detail-close-inner-btn").addEventListener("click", () => {
      detailModal.classList.remove("active");
    });

    document.getElementById("detail-enroll-inner-btn").addEventListener("click", (e) => {
      detailModal.classList.remove("active");
      const title = e.currentTarget.getAttribute("data-title");
      const price = e.currentTarget.getAttribute("data-price");
      openCheckoutModal(title, price);
    });
  };

  // Attach click events to all Detail buttons
  document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const courseId = e.currentTarget.getAttribute("data-course-id");
      openDetailModal(courseId);
    });
  });

  // Attach click event to Join Live trigger badge
  const joinLiveTrigger = document.getElementById("join-live-trigger");
  if (joinLiveTrigger) {
    joinLiveTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openDetailModal("workshop");
    });
  }

  detailModalClose.addEventListener("click", () => {
    detailModal.classList.remove("active");
  });

  /* --- 5. CHECKOUT MODAL HANDLER --- */
  const openCheckoutModal = (itemName, price) => {
    checkoutItemName.textContent = itemName;
    checkoutItemPrice.textContent = `₹${price}`;
    checkoutTotal.textContent = `₹${price}`;
    checkoutModal.classList.add("active");
  };

  // Attach click events to all Buy/Enroll buttons
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const itemName = e.currentTarget.getAttribute("data-course-title");
      const itemPrice = e.currentTarget.getAttribute("data-course-price");
      openCheckoutModal(itemName, itemPrice);
    });
  });

  checkoutModalClose.addEventListener("click", () => {
    checkoutModal.classList.remove("active");
  });

  // Handle Checkout Form Submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cust-name").value;
    const email = document.getElementById("cust-email").value;
    const phone = document.getElementById("cust-phone").value;
    const fileInput = document.getElementById("cust-screenshot");
    const courseTitle = checkoutItemName.textContent;

    let fileName = "None";
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
      if (!allowedExtensions.exec(file.name)) {
        alert("Please upload a payment screenshot in PNG or JPG/JPEG format only.");
        fileInput.value = ""; // Clear input
        return;
      }
      fileName = file.name;
    }

    // Construct WhatsApp message URL
    const targetNumber = "919999999999"; // Update this with client's active WhatsApp number
    const message = `Hello Ecom Academy, I would like to enroll in the following course:\n\n📚 *Course:* ${courseTitle}\n\n👤 *My Details:*\n- *Name:* ${name}\n- *Email:* ${email}\n- *Phone:* ${phone}\n- *Proof of Payment:* Attached file (${fileName})`;

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

    // Redirect customer to WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    checkoutForm.reset();
    checkoutModal.classList.remove("active");
  });

  // Global modal backdrop close
  window.addEventListener("click", (e) => {
    if (e.target === detailModal) detailModal.classList.remove("active");
    if (e.target === checkoutModal) checkoutModal.classList.remove("active");
  });

  /* --- 7. FAQS ACCORDION --- */
  accordionHeaders.forEach(header => {
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



  /* --- 9. WHATSAPP CHAT POPUP --- */
  whatsappTrigger.addEventListener("click", () => {
    whatsappChatBox.classList.toggle("active");
  });

  chatClose.addEventListener("click", (e) => {
    e.stopPropagation();
    whatsappChatBox.classList.remove("active");
  });

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
});
