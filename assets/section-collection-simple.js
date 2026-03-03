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

function initReveal(root){
  if (!root) return;

  // enable reveal mode safely
  if (!root.classList.contains('reveal-off')) {
    root.classList.add('is-reveal-ready');
  }

  const items = root.querySelectorAll('.qcm__item');
  if (!items.length) return;

  if (root.classList.contains('reveal-off') || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
}

  // If your AJAX re-renders grid, call initReveal(sectionEl) after update.

})();

