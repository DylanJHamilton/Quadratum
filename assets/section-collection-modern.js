/* Quadratum — Collection Modern (Max Capability)
   File: assets/section-collection-modern.js
   HARD RULE: never attach globally; only inside #QtmCollectionModern-* roots.
*/

(function(){
  const roots = document.querySelectorAll('[id^="QtmCollectionModern-"]');
  if (!roots || !roots.length) return;

  roots.forEach((root) => {
    try { initModernCollection(root); } catch(e) { /* no-op */ }
  });

  function initModernCollection(root){
    const paginationStyle = root.getAttribute('data-pagination-style') || 'numbered';

    // Sticky toolbar class toggle (CSS handles sticky; class just enables styling if needed)
    const stickyEnabled = String(root.getAttribute('data-sticky-toolbar')) === 'true';
    const toolbar = root.querySelector('.qcm__toolbar');
    if (stickyEnabled && toolbar) toolbar.classList.add('is-sticky');

    // Drawer support (optional; details fallback exists)
    // If your facets snippet uses a <dialog> or a drawer wrapper, this remains safe/no-op.
    const drawer = root.querySelector('[data-qcm-drawer]');
    const openBtn = root.querySelector('[data-qcm-open-filters]');
    const closeBtn = root.querySelector('[data-qcm-close-filters]');

    if (drawer && openBtn){
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof drawer.showModal === 'function') drawer.showModal();
        drawer.classList.add('is-open');
      });
    }
    if (drawer && closeBtn){
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof drawer.close === 'function') drawer.close();
        drawer.classList.remove('is-open');
      });
    }

    // Progressive pagination enhancements
    if (paginationStyle === 'load_more') {
      wireLoadMore(root);
    } else if (paginationStyle === 'infinite_scroll') {
      wireInfinite(root);
    }
  }

  function wireLoadMore(root){
    const btn = root.querySelector('[data-qcm-load-more]');
    if (!btn) return;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (btn.disabled) return;

      const nextUrl = btn.getAttribute('href') || btn.dataset.nextUrl;
      if (!nextUrl) return;

      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');

      try {
        await fetchAndAppend(root, nextUrl);
      } finally {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
      }
    });
  }

  function wireInfinite(root){
    const sentinel = root.querySelector('[data-qcm-sentinel]');
    if (!sentinel) return;

    let busy = false;
    const io = new IntersectionObserver(async (entries) => {
      const entry = entries[0];
      if (!entry || !entry.isIntersecting) return;
      if (busy) return;

      const nextLink = root.querySelector('[data-qcm-next-page]');
      const nextUrl = nextLink ? (nextLink.getAttribute('href') || nextLink.dataset.nextUrl) : null;
      if (!nextUrl) {
        io.disconnect();
        return;
      }

      busy = true;
      try {
        await fetchAndAppend(root, nextUrl);
      } finally {
        busy = false;
      }
    }, { rootMargin: '800px 0px' });

    io.observe(sentinel);
  }

  async function fetchAndAppend(root, url){
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) return;

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Find the matching section by ID in the response
    const incomingRoot = doc.getElementById(root.id);
    if (!incomingRoot) return;

    const currentGrid = root.querySelector('[data-qcm-grid]');
    const incomingGrid = incomingRoot.querySelector('[data-qcm-grid]');
    if (!currentGrid || !incomingGrid) return;

    const incomingItems = Array.from(incomingGrid.querySelectorAll('[data-qcm-item]'));
    if (!incomingItems.length) return;

    // Append new items
    incomingItems.forEach((it) => currentGrid.appendChild(it));

    // Replace pagination block (keeps next URL, numbered links, etc.)
    const currentPagination = root.querySelector('[data-qcm-pagination]');
    const incomingPagination = incomingRoot.querySelector('[data-qcm-pagination]');
    if (currentPagination && incomingPagination) {
      currentPagination.innerHTML = incomingPagination.innerHTML;
    }

    // If no next page exists, hide load more (if present) and stop infinite sentinel logic naturally
    const next = root.querySelector('[data-qcm-next-page]');
    const loadMoreBtn = root.querySelector('[data-qcm-load-more]');
    if (!next && loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }
})();