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
})();