/* ==========================================================================
   navbar.js — injects shared header, mobile nav & footer on every page
   Reads data-active from <body> to mark the current nav item.
   ========================================================================== */
(function () {
  const PHONE = "0793016084";
  const PHONE_ALT = "0731981336";
  const WHATSAPP = "254793016084"; // international format for wa.me
  const EMAIL = "sisuthelegend@gmail.com";

  const NAV_ITEMS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "services.html", label: "Services", key: "services" },
    { href: "emergency.html", label: "Emergency", key: "emergency" },
    { href: "testimonials.html", label: "Reviews", key: "testimonials" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];

  const activeKey = document.body.getAttribute("data-active") || "";

  const navLinksHTML = (isMobile) =>
    NAV_ITEMS.map((item) => {
      const current = item.key === activeKey ? ' aria-current="page"' : "";
      return `<li><a href="${item.href}"${current}>${item.label}</a></li>`;
    }).join("");

  const headerHTML = `
    <header class="site-header" id="siteHeader">
      <div class="container">
        <a href="index.html" class="brand" aria-label="Plumbing Services — home">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 22v-4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="4"/></svg>
          </span>
          <span>
            Plumbing Services
            <span class="brand-text-sub">Nairobi · Est. Trust</span>
          </span>
        </a>
        <nav class="nav-main" aria-label="Primary">
          <ul style="display:flex;gap:4px;">${navLinksHTML(false)}</ul>
        </nav>
        <div class="header-actions">
          <a href="https://wa.me/${WHATSAPP}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.3 17L2 22l5.2-1.3A11 11 0 1 0 20.5 3.5zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-3-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1a7.3 7.3 0 0 1-2.2-1.3 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3z"/></svg>
            WhatsApp
          </a>
          <a href="tel:${PHONE}" class="btn btn-navy btn-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>
            Call Now
          </a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile" aria-hidden="true">
      <div class="mobile-nav-head">
        <a href="index.html" class="brand"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 22v-4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="4"/></svg></span>Plumbing Services</a>
        <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <ul>${navLinksHTML(true)}</ul>
      <div class="mobile-nav-footer">
        <a href="tel:${PHONE}" class="btn btn-primary">Call ${PHONE}</a>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 22v-4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="4"/></svg></span>Plumbing Services</a>
            <p>Nairobi's trusted name in premium residential and commercial plumbing — licensed, insured, and on call 24 hours a day.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.6-1.5H16.5V4.3C16.2 4.3 15.2 4 14 4c-2.3 0-3.9 1.4-3.9 4v2.5H7.6v3H10V21h3.5z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
              <a href="#" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3l7.6 9.6L3.3 21H6l6-6.5L16.5 21H21l-8-10.2L20.4 3H18l-5.6 6L8 3H3z"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Our Services</a></li>
              <li><a href="testimonials.html">Reviews</a></li>
              <li><a href="quote.html">Request a Quote</a></li>
              <li><a href="emergency.html">Emergency Help</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="services.html#leak-detection">Leak Detection</a></li>
              <li><a href="services.html#drain-cleaning">Drain Cleaning</a></li>
              <li><a href="services.html#bathroom-renovation">Bathroom Renovation</a></li>
              <li><a href="services.html#water-heater-installation">Water Heater Installation</a></li>
              <li><a href="services.html#commercial-plumbing">Commercial Plumbing</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Get In Touch</h4>
            <address>
              Jumuiah Place, Nairobi, Kenya<br>
              <a href="tel:${PHONE}">${PHONE}</a> / <a href="tel:${PHONE_ALT}">${PHONE_ALT}</a><br>
              <a href="mailto:${EMAIL}">${EMAIL}</a><br>
              Open 24 Hours
            </address>
            <form class="newsletter-form" id="newsletterForm">
              <label for="newsletterEmail" class="visually-hidden">Email address</label>
              <input type="email" id="newsletterEmail" placeholder="Your email" required>
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; <span id="year"></span> Plumbing Services, Nairobi. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = headerHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll state
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("mobileNavClose");
  const openNav = () => {
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  if (toggle) toggle.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Newsletter (front-end only demo)
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletterEmail");
      input.value = "";
      const btn = newsletterForm.querySelector("button");
      const original = btn.innerHTML;
      btn.innerHTML = "&#10003;";
      setTimeout(() => (btn.innerHTML = original), 2000);
    });
  }
})();
