/* ==========================================================================
   gallery.js — masonry filtering + lightbox viewer
   ========================================================================== */
(function () {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll(".gallery-item"));
  const chips = document.querySelectorAll(".service-filter-bar .filter-chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const cat = chip.getAttribute("data-filter");
      items.forEach((item) => {
        const match = cat === "all" || item.getAttribute("data-cat") === cat;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---- Lightbox ---- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <button class="lightbox-nav prev" aria-label="Previous image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <img src="" alt="">
    <button class="lightbox-nav next" aria-label="Next image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  `;
  document.body.appendChild(lightbox);
  const lbImg = lightbox.querySelector("img");
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const img = items[index].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  const step = (dir) => {
    let next = currentIndex;
    do {
      next = (next + dir + items.length) % items.length;
    } while (items[next].classList.contains("is-hidden") && next !== currentIndex);
    openLightbox(next);
  };

  items.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
