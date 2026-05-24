// src/utils/scrollTo.js
//
// Uses el.offsetTop — always the element's distance from the document top,
// works correctly regardless of scroll position, visibility, or layout state.
// Never use getBoundingClientRect() for this — it gives viewport-relative
// coords and breaks if the page is already scrolled.

export const scrollToSection = (id) => {
  const el = document.querySelector(id);
  if (!el) return;
  const NAVBAR_HEIGHT = 80;
  window.scrollTo({
    top: el.offsetTop - NAVBAR_HEIGHT,
    behavior: 'smooth',
  });
};