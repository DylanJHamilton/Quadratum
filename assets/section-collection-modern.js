/* Quadratum — Collection Modern JS (scoped)
   File: assets/section-collection-modern.js
   Progressive enhancement only. No global side effects.
*/

(function () {
  function qs(root, sel) { return root ? root.querySelector(sel) : null; }
  function qsa(root, sel) { return root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []; }

  async function fetchDoc(url) {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Bad response: ' + res.status);
    const html = await res.text();
    return new DOMParser().parseFromString(html, 'text/html');
  }

  function getNextUrlFromDoc(doc, rootId) {
    const nextRoot = doc.getElementById(rootId);
    if (!nextRoot) return null;
    const next = qs(nextRoot, '[data-qcm-next-url]');
    return next ? next.getAttribute('data-qcm-next-url') : null;
  }

  function appendGridFromDoc(doc, rootId, liveRoot) {
    const nextRoot = doc.getElementById(rootId);
    if (!nextRoot) return { appended: 0 };

    const nextGrid = qs(nextRoot, '[data-qcm-grid]');
    const curGrid = qs(liveRoot, '[data-qcm-grid]');
    if (!nextGrid || !curGrid) return { appended: 0 };

    const nextItems = qsa(nextGrid, '[data-qcm-item]');
    const curHandles = new Set(
      qsa(curGrid, '[data-qcm-item] [data-qcm-handle]').map(n => n.getAttribute('data-qcm-handle'))
    );

    let appended = 0;
    nextItems.forEach((item) => {
      // If card provides a handle marker, avoid duplicates.
      const handleNode = qs(item, '[data-qcm-handle]');
      const handle = handleNode ? handleNode.getAttribute('data-qcm-handle') : null;

      if (handle && curHandles.has(handle)) return;

      curGrid.appendChild(item);
      if (handle) curHandles.add(handle);
      appended += 1;
    });

    return { appended };
  }

  function initDrawer(root) {
    const btn = qs(root, '[data-qcm-open-drawer]');
    const drawer = qs(root, '[data-qcm-drawer]');
    if (!btn || !drawer) return;

    const closeBtn = qs(drawer, '[data-qcm-close-drawer]');
    const backdrop = qs(drawer, '[data-qcm-drawer-backdrop]');

    function open() {
      drawer.setAttribute('aria-hidden', 'false');
      drawer.dataset.open = 'true';
      // basic focus
      const focusTarget = closeBtn || qs(drawer, 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusTarget) focusTarget.focus();
    }
    function close() {
      drawer.setAttribute('aria-hidden', 'true');
      drawer.dataset.open = 'false';
      btn.focus();
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });

    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); close(); });
    if (backdrop) backdrop.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (drawer.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') close();
    });
  }

  function initLoadMoreOrInfinite(root) {
    const style = root.getAttribute('data-pagination-style');
    if (style !== 'load_more' && style !== 'infinite_scroll') return;

    const pager = qs(root, '[data-qcm-pagination]');
    if (!pager) return;

    const grid = qs(root, '[data-qcm-grid]');
    if (!grid) return;

    let isLoading = false;
    let nextUrl = (qs(root, '[data-qcm-next-url]') || {}).getAttribute?.('data-qcm-next-url') || null;

    const btn = qs(root, '[data-qcm-load-more]');
    const sentinel = qs(root, '[data-qcm-sentinel]');

    async function loadNext() {
      if (!nextUrl || isLoading) return;
      isLoading = true;

      if (btn) {
        btn.setAttribute('aria-busy', 'true');
        btn.disabled = true;
      }

      try {
        const doc = await fetchDoc(nextUrl);
        appendGridFromDoc(doc, root.id, root);

        nextUrl = getNextUrlFromDoc(doc, root.id);

        // update data attribute so future loads are correct
        const nextHolder = qs(root, '[data-qcm-next-url]');
        if (nextHolder) {
          if (nextUrl) nextHolder.setAttribute('data-qcm-next-url', nextUrl);
          else nextHolder.removeAttribute('data-qcm-next-url');
        }

        // hide controls if done
        if (!nextUrl) {
          if (btn) btn.style.display = 'none';
          if (sentinel) sentinel.style.display = 'none';
        }
      } catch (err) {
        // Fail soft: re-enable button
        console.error('[QCM] pagination fetch error', err);
      } finally {
        isLoading = false;
        if (btn) {
          btn.setAttribute('aria-busy', 'false');
          btn.disabled = false;
        }
      }
    }

    if (style === 'load_more' && btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadNext();
      });
    }

    if (style === 'infinite_scroll' && sentinel) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) loadNext();
        });
      }, { rootMargin: '400px 0px' });

      io.observe(sentinel);
    }
  }

  function initDescriptionToggle(root) {
    const btn = qs(root, '[data-qcm-desc-toggle]');
    const desc = qs(root, '[data-qcm-desc]');
    if (!btn || !desc) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isFull = desc.classList.toggle('is-full');
      btn.setAttribute('aria-expanded', isFull ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const roots = document.querySelectorAll('section.qcm[id^="QtmCollectionModern-"]');
    roots.forEach((root) => {
      initDrawer(root);
      initLoadMoreOrInfinite(root);
      initDescriptionToggle(root);
    });
  });
})();