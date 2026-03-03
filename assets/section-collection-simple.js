/* Quadratum — Collection Simple JS
   File: assets/section-collection-simple.js
   Scope: section root only
*/
(() => {
  function init(root) {
    if (!root) return;

    // Sort dropdown: option value is a URL, navigate to it
    const sortSelect = root.querySelector('[data-qcm-sort]');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const url = e.target.value;
        if (url) window.location.href = url;
      });
    }

    // Drawer open hook (only if you built drawer JS elsewhere)
    const openBtn = root.querySelector('[data-qcm-drawer-open]');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        const drawer = root.querySelector('[data-qcm-drawer]');
        if (drawer) drawer.hidden = false;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.q-collection-modern[data-section-id]').forEach(init);
  });
})();