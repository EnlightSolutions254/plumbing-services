/* ==========================================================================
   testimonials.js — simple carousel for review cards
   ========================================================================== */
(function () {
  const track = document.querySelector(".testi-track");
  if (!track) return;

  const cards = Array.from(track.children);
  const prevBtn = document.querySelector(".testi-controls .prev");
  const nextBtn = document.querySelector(".testi-controls .next");
  let index = 0;

  const cardsPerView = () => (window.innerWidth < 720 ? 1 : window.innerWidth < 1080 ? 2 : 3);

  const update = () => {
    const perView = cardsPerView();
    const maxIndex = Math.max(0, cards.length - perView);
    index = Math.max(0, Math.min(index, maxIndex));
    const cardWidth = cards[0].getBoundingClientRect().width + 22; // gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  prevBtn.addEventListener("click", () => {
    index -= 1;
    update();
  });
  nextBtn.addEventListener("click", () => {
    index += 1;
    update();
  });
  window.addEventListener("resize", update);

  // Auto-advance
  let auto = setInterval(() => {
    const perView = cardsPerView();
    const maxIndex = Math.max(0, cards.length - perView);
    index = index >= maxIndex ? 0 : index + 1;
    update();
  }, 5500);

  track.closest(".testi-track-wrap").addEventListener("mouseenter", () => clearInterval(auto));

  update();
})();
