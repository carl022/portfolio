document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // NAVIGATION
  // ============================================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Navbar scroll effect
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  const sections = document.querySelectorAll("section[id]");
  const navLinkItems = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // ============================================
  // ANIMATE ON SCROLL (AOS)
  // ============================================
  const aosElements = document.querySelectorAll("[data-aos]");

  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("aos-animate");
          }, parseInt(delay));
          aosObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  aosElements.forEach((el) => aosObserver.observe(el));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll(".stat-number[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            counter.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ============================================
  // SKILL BARS ANIMATION
  // ============================================
  const skillItems = document.querySelectorAll(".skill-item[data-level]");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const level = item.getAttribute("data-level");
          const fill = item.querySelector(".skill-fill");

          // Set CSS custom property for the width
          item.style.setProperty("--level", level + "%");

          // Small delay for staggered animation
          setTimeout(() => {
            item.classList.add("animate");
          }, 200);

          skillObserver.unobserve(item);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillItems.forEach((item) => skillObserver.observe(item));

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML =
      '<span><i class="fa-solid fa-check"></i> Message Sent!</span>';
    btn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

    // Reset form after delay
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.style.background = "";
    }, 3000);

    // Log form data (in production, send to backend)
    console.log("Form submitted:", data);
  });

  // ============================================
  // PARALLAX EFFECT ON HERO PARTICLES
  // ============================================
  const heroParticles = document.querySelectorAll(".hero-particle");

  window.addEventListener(
    "mousemove",
    function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      heroParticles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    },
    { passive: true },
  );

  // ============================================
  // PROJECT CARD HOVER EFFECT
  // ============================================
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "";
    });
  });

  // ============================================
  // EXPERTISE CARD TILT EFFECT
  // ============================================
  const expertiseCards = document.querySelectorAll(".expertise-card");

  expertiseCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  // ============================================
  // TYPING EFFECT FOR HERO TITLE (Optional enhancement)
  // ============================================
  // Uncomment to enable typing effect
  /*
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 500);
    */

  // ============================================
  // LOADING SCREEN (Optional)
  // ============================================
  // Uncomment to enable loading screen
  /*
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
    */

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener("keydown", function (e) {
    // Close mobile menu on Escape
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ============================================
  // PERFORMANCE: Reduce animations on mobile
  // ============================================
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  if (isMobile) {
    // Disable parallax on mobile
    heroParticles.forEach((p) => (p.style.animation = "none"));
  }

  // ============================================
  // CONSOLE EASTER EGG
  // ============================================
  console.log(
    "%c🔬 Engineered by Carl",
    "font-size: 24px; font-weight: bold; color: #0ea5e9;",
  );
  console.log(
    "%cLefa Carl Tautsagae - Graduate Chemical Engineer",
    "font-size: 14px; color: #94a3b8;",
  );
  console.log(
    "%cProcess Engineering | Safety | Green Energy | Data Analytics",
    "font-size: 12px; color: #64748b;",
  );
}); // End DOMContentLoaded

// ============================================
// CAPSTONE PROJECT TABS
// ============================================
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");

    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    this.classList.add("active");
    const content = document.getElementById("tab-" + tabId);
    if (content) {
      content.classList.add("active");
    }
  });
});

// ============================================
// DIAGRAM MODAL
// ============================================
const diagramData = {
  pfd: {
    title: "Process Flow Diagram (PFD)",
    desc: "Major unit operations and material flows from coal reception through to synthetic crude product storage.",
    img: "images/pfd.png", // PLACEHOLDER: Replace with your actual PFD image path
  },
  eld: {
    title: "Engineering Line Diagram (ELD)",
    desc: "Line classification, pipe sizing, and utility routing for construction and procurement.",
    img: "images/eld.png", // PLACEHOLDER: Replace with your actual ELD image path
  },
  pid: {
    title: "P&ID Schematic",
    desc: "Instrumentation, control loops, safety valves, and piping details for the reactor section.",
    img: "images/pid.png", // PLACEHOLDER: Replace with your actual P&ID image path
  },
  pinch: {
    title: "Pinch Analysis & Heat Integration",
    desc: "Composite curves, pinch point analysis, and optimized heat exchanger network design.",
    img: "images/pinch.png", // PLACEHOLDER: Replace with your actual pinch analysis image path
  },
};

function openDiagramModal(type) {
  const modal = document.getElementById("diagramModal");
  const body = document.getElementById("modalBody");
  const data = diagramData[type];

  if (data) {
    body.innerHTML =
      '<img src="' +
      data.img +
      '" alt="' +
      data.title +
      '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="diagram-placeholder" style="display:none;"><i class="fa-solid fa-image"></i><span>' +
      data.title +
      "</span><small>Image not found. Place your image at: " +
      data.img +
      "</small></div><h4>" +
      data.title +
      "</h4><p>" +
      data.desc +
      "</p>";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeDiagramModal() {
  const modal = document.getElementById("diagramModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeDiagramModal();
  }
});

// ============================================
// PROJECT REPORT DOWNLOAD
// ============================================
function downloadProjectReport() {
  const btn = document.getElementById("downloadProjectBtn");
  const originalHTML = btn.innerHTML;

  // PLACEHOLDER: Replace 'docs/ctl-project-report.pdf' with your actual file path
  const fileUrl = "../docs/TAUTSAGAE-DESIGN.pdf";

  // Create temporary link and trigger download
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "90-KBPD-CTL-Plant-Design-Report.pdf";

  // Check if file exists (basic check)
  fetch(fileUrl, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        link.click();
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Download Started';
        btn.style.background =
          "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      } else {
        throw new Error("File not found");
      }
    })
    .catch(() => {
      btn.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> File Not Available';
      btn.style.background =
        "linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)";
      console.warn("Project report file not found at: " + fileUrl);
      console.warn(
        "Please place your report PDF at the specified path and update the fileUrl variable.",
      );
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = "";
      }, 3000);
    });
}
