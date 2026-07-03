/* ==========================================================================
   main.js — shared interactive behaviors across all pages
   ========================================================================== */
(function () {
  const PHONE = "0793016084";
  const WHATSAPP = "254793016084";

  /* ---- Inject floating action buttons ---- */
  const floatMount = document.createElement("div");
  floatMount.className = "floating-stack";
  floatMount.innerHTML = `
    <button class="fab fab-top" id="fabTop" aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <a class="fab fab-call" href="tel:${PHONE}" aria-label="Call us now">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>
    </a>
    <a class="fab fab-whatsapp" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.3 17L2 22l5.2-1.3A11 11 0 1 0 20.5 3.5zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-3-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1a7.3 7.3 0 0 1-2.2-1.3 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3z"/></svg>
    </a>
  `;
  document.body.appendChild(floatMount);

  const fabTop = document.getElementById("fabTop");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) fabTop.classList.add("is-visible");
      else fabTop.classList.remove("is-visible");
    },
    { passive: true }
  );
  fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              io2.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => io2.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---- Before / After comparison slider(s) ---- */
  document.querySelectorAll(".ba-slider").forEach((slider) => {
    const afterImg = slider.querySelector(".ba-after");
    const handle = slider.querySelector(".ba-handle");
    let dragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + "%";
    };

    const start = () => (dragging = true);
    const stop = () => (dragging = false);
    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    };

    handle.addEventListener("mousedown", start);
    handle.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });

    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Drag to compare before and after");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.setAttribute("aria-valuenow", "50");
    handle.addEventListener("keydown", (e) => {
      const rect = slider.getBoundingClientRect();
      let current = parseFloat(handle.style.left) || 50;
      if (e.key === "ArrowLeft") current -= 5;
      if (e.key === "ArrowRight") current += 5;
      current = Math.max(0, Math.min(100, current));
      afterImg.style.clipPath = `inset(0 0 0 ${current}%)`;
      handle.style.left = current + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(current)));
    });
  });

  /* ---- Header scroll offset for in-page anchors (services.html deep links) ---- */
  document.querySelectorAll('a[href*="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const url = new URL(a.href);
      if (url.pathname !== window.location.pathname) return;
      const id = url.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 130;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
