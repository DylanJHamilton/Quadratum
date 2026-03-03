/* Quadratum — Collection Simple JS
   File: assets/section-collection-simple.js
   Scope: section root only
*/
(() => {
  function init(root) {
    if (!root) return;

    // Sort dropdown: option value is a URL
    const sortSelect = root.querySelector('[data-qcm-sort]');
    if (sortSelect && !sortSelect.__qcmBound) {
      sortSelect.__qcmBound = true;
      sortSelect.addEventListener('change', (e) => {
        const url = e.target.value;
        if (url) window.location.href = url;
      });
    }

    // Drawer open/close
    const openBtn = root.querySelector('[data-qcm-drawer-open]');
    const drawer = root.querySelector('[data-qcm-drawer]');
    if (openBtn && drawer && !openBtn.__qcmBound) {
      openBtn.__qcmBound = true;
      openBtn.addEventListener('click', () => {
        drawer.hidden = false;
        drawer.setAttribute('aria-hidden', 'false');
      });
    }

    root.querySelectorAll('[data-qcm-drawer-close]').forEach((btn) => {
      if (btn.__qcmBound) return;
      btn.__qcmBound = true;
      btn.addEventListener('click', () => {
        const d = root.querySelector('[data-qcm-drawer]');
        if (d) {
          d.hidden = true;
          d.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.q-collection-simple[data-section-id]').forEach(init);
  });

function revealAll(root) {
    root.querySelectorAll('.qcm__item').forEach(el => el.classList.add('is-revealed'));
  }

  function initReveal(root) {
    if (!root) return;

    const isOff = root.classList.contains('reveal-off');
    const isFade = root.classList.contains('reveal-fade');
    const isSlide = root.classList.contains('reveal-slide');

    // Nothing selected in UI? Do nothing (don’t hide products).
    if (!isOff && !isFade && !isSlide) return;

    // Always safe: never hide unless we enable ready mode.
    if (!isOff) root.classList.add('is-reveal-ready');

    const items = root.querySelectorAll('.qcm__item');
    if (!items.length) return;

    // Off = show everything
    if (isOff) {
      revealAll(root);
      return;
    }

    // No IO? show everything
    if (!('IntersectionObserver' in window)) {
      revealAll(root);
      return;
    }

    // If items are already visible, still mark revealed to avoid “no change”
    // (and to prevent other CSS from keeping them hidden)
    // Then observe for staggered / future loads.
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(el => io.observe(el));
  }

  function boot() {
    // Any section using qcm + reveal-* should work
    document.querySelectorAll('.qcm.reveal-off, .qcm.reveal-fade, .qcm.reveal-slide').forEach(initReveal);
  }

  // Initial page load
  document.addEventListener('DOMContentLoaded', boot);

  // Theme editor / dynamic section reload (important)
  document.addEventListener('shopify:section:load', (e) => {
    const root = e.target?.querySelector('.qcm.reveal-off, .qcm.reveal-fade, .qcm.reveal-slide');
    if (root) initReveal(root);
  });

  // If your AJAX replaces grid HTML without section reload, call this after:
  window.QCM_RevealBoot = boot;

  // If your AJAX re-renders grid, call initReveal(sectionEl) after update.

})();

