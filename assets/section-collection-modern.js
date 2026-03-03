/* Quadratum — Collection Modern (scoped JS) */
(function () {
  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function trapFocus(container) {
    const focusable = qsa(container, 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function onKeyDown(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    container.addEventListener('keydown', onKeyDown);
    return () => container.removeEventListener('keydown', onKeyDown);
  }

  function initSection(root) {
    const sectionId = root.getAttribute('data-section-id');
    const paginationStyle = root.getAttribute('data-pagination-style');
    const filterMode = root.getAttribute('data-filter-mode');
    const enableDrawer = root.getAttribute('data-enable-drawer') === 'true';

    const grid = qs(root, '[data-qcm-grid]');
    if (!grid) return;

    // Drawer (optional)
    if (enableDrawer && filterMode === 'drawer') {
      const drawerWrap = qs(root, '[data-qcm-drawer]');
      const openBtn = qs(root, '[data-qcm-open-drawer]');
      const closeBtn = qs(root, '[data-qcm-close-drawer]');
      if (drawerWrap && openBtn && closeBtn) {
        let untrap = null;
        const previouslyFocused = { el: null };

        function open() {
          previouslyFocused.el = document.activeElement;
          drawerWrap.hidden = false;
          drawerWrap.setAttribute('aria-hidden', 'false');
          drawerWrap.classList.add('is-open');
          untrap = trapFocus(drawerWrap);
          const focusTarget = qs(drawerWrap, 'button, [href], input, select, textarea') || drawerWrap;
          focusTarget.focus && focusTarget.focus();
          document.addEventListener('keydown', onEsc);
        }
        function close() {
          drawerWrap.classList.remove('is-open');
          drawerWrap.hidden = true;
          drawerWrap.setAttribute('aria-hidden', 'true');
          if (untrap) untrap();
          document.removeEventListener('keydown', onEsc);
          if (previouslyFocused.el && previouslyFocused.el.focus) previouslyFocused.el.focus();
        }
        function onEsc(e) {
          if (e.key === 'Escape') close();
        }

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);

        // click outside panel (simple)
        drawerWrap.addEventListener('click', (e) => {
          if (e.target && e.target.matches('[data-qcm-drawer-overlay]')) close();
        });
      }
    }

    // Pagination enhancements
    if (paginationStyle === 'load_more' || paginationStyle === 'infinite_scroll') {
      const loadMoreBtn = qs(root, '[data-qcm-load-more]');
      const nextLink = () => qs(root, '[data-qcm-next-link]');
      const status = qs(root, '[data-qcm-status]');

      async function fetchNext() {
        const nl = nextLink();
        if (!nl) return;

        const url = nl.getAttribute('href');
        if (!url) return;

        // UI state
        if (loadMoreBtn) loadMoreBtn.disabled = true;
        if (status) status.textContent = 'Loading more…';

        try {
          const res = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
          if (!res.ok) throw new Error('Bad response');
          const html = await res.text();

          const doc = new DOMParser().parseFromString(html, 'text/html');
          const incomingRoot = doc.querySelector('.q-collection-modern[data-section-id="' + CSS.escape(sectionId) + '"]');
          if (!incomingRoot) throw new Error('Section not found in response');

          const incomingItems = incomingRoot.querySelectorAll('[data-qcm-item]');
          incomingItems.forEach((node) => {
            const wrapper = document.createElement('div');
            wrapper.className = node.className;
            wrapper.setAttribute('data-qcm-item', '');
            wrapper.innerHTML = node.innerHTML;
            grid.appendChild(wrapper);
          });

          // swap next link href (or remove)
          const newNext = incomingRoot.querySelector('[data-qcm-next-link]');
          const currentNext = nextLink();
          if (newNext && currentNext) {
            currentNext.setAttribute('href', newNext.getAttribute('href'));
          } else if (currentNext) {
            currentNext.remove();
          }

          // done
          if (status) status.textContent = '';
        } catch (err) {
          if (status) status.textContent = 'Could not load more products.';
        } finally {
          if (loadMoreBtn) loadMoreBtn.disabled = false;
        }
      }

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          fetchNext();
        });
      }

      if (paginationStyle === 'infinite_scroll' && !prefersReducedMotion()) {
        const sentinel = qs(root, '[data-qcm-sentinel]');
        if (sentinel && 'IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) fetchNext();
            });
          }, { rootMargin: '600px 0px' });
          io.observe(sentinel);
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.q-collection-modern[data-section-id]').forEach(initSection);
  });
})();