/* assets/interactive-content-carousel-testimonials.js
   Testimonial skin bootstrap. The canonical engine should do the real work.
   We DO NOT ship a second engine. This file only nudges/init-scans and adds a couple
   safety behaviors for testimonials (e.g., pause autoplay on focus within slide).
*/
(function () {
  const SELECTOR = '[data-q-carousel][data-q-carousel-skin="testimonials"]';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function requestEngineScan(root) {
    // Prefer a known global scan/mount hook if your engine exposes it.
    // This avoids duplicating logic and keeps Media/Logos/Testimonial unified.
    const w = window;

    // Common patterns you might have in the canonical engine:
    if (w.QCarousel && typeof w.QCarousel.scan === 'function') return w.QCarousel.scan(root);
    if (w.QCarousel && typeof w.QCarousel.mount === 'function') return w.QCarousel.mount(root);
    if (w.QuadratumCarousel && typeof w.QuadratumCarousel.scan === 'function') return w.QuadratumCarousel.scan(root);

    // Last resort: fire a custom event (engine can listen for this).
    try {
      document.dispatchEvent(new CustomEvent('q:carousel:scan', { detail: { root } }));
    } catch (e) {}
  }

  function enhanceAutoplayPause(el) {
    // If the engine already does pauseOnFocus, great—this just reinforces it.
    // We do not manipulate autoplay directly; we emit events the engine may listen to.
    const emit = (name) => {
      try { el.dispatchEvent(new CustomEvent(name, { bubbles: true })); } catch (e) {}
    };

    el.addEventListener('focusin', () => emit('q:carousel:pause'), true);
    el.addEventListener('mouseenter', () => emit('q:carousel:pause'), true);
    el.addEventListener('mouseleave', () => emit('q:carousel:resume'), true);
    el.addEventListener('focusout', () => emit('q:carousel:resume'), true);
  }

  function init() {
    const carousels = document.querySelectorAll(SELECTOR);
    if (!carousels.length) return;

    carousels.forEach((el) => {
      enhanceAutoplayPause(el);
      requestEngineScan(el);
    });
  }

  onReady(init);

  // Theme editor support (Shopify)
  document.addEventListener('shopify:section:load', function (evt) {
    const section = evt.target;
    if (!section) return;
    const el = section.querySelector(SELECTOR);
    if (!el) return;
    enhanceAutoplayPause(el);
    requestEngineScan(el);
  });
})();
