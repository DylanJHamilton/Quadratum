(() => {
  const qs = (root, sel) => root.querySelector(sel);
  const qsa = (root, sel) => Array.from(root.querySelectorAll(sel));

  function trapFocus(container){
    const focusable = () => qsa(container, 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      .filter(el => el.offsetParent !== null);

    function onKeydown(e){
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      }
    }

    container.addEventListener('keydown', onKeydown);
    return () => container.removeEventListener('keydown', onKeydown);
  }

  async function fetchNext(url){
    const res = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    if (!res.ok) throw new Error('Fetch failed');
    return await res.text();
  }

  function parseHTML(html){
    const doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;
    return doc;
  }

  function initSection(root){
    const sectionId = root.dataset.sectionId;
    const paginationStyle = root.dataset.paginationStyle || 'numbered';
    const filterMode = root.dataset.filterMode || 'sidebar';
    const enableDrawer = root.dataset.enableDrawer === 'true';

    // Drawer
    if (enableDrawer && filterMode === 'drawer') {
      const drawer = qs(root, '[data-qcm-drawer]');
      const openBtn = qs(root, '[data-qcm-open-drawer]');
      const closeBtn = qs(root, '[data-qcm-close-drawer]');

      if (drawer && openBtn && closeBtn) {
        let untrap = null;
        let previouslyFocused = null;

        function onEsc(e){ if (e.key === 'Escape') close(); }

        function open(){
          previouslyFocused = document.activeElement;
          drawer.hidden = false;
          drawer.setAttribute('aria-hidden', 'false');

          untrap = trapFocus(drawer);
          const focusTarget = drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusTarget && focusTarget.focus) focusTarget.focus();

          document.addEventListener('keydown', onEsc);
        }

        function close(){
          drawer.hidden = true;
          drawer.setAttribute('aria-hidden', 'true');
          if (untrap) untrap();
          document.removeEventListener('keydown', onEsc);
          if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
        }

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);

        drawer.addEventListener('click', (e) => {
          if (e.target && e.target.matches('[data-qcm-drawer-overlay]')) close();
        });
      }
    }

    // Load More / Infinite Scroll
    if (paginationStyle !== 'load_more' && paginationStyle !== 'infinite_scroll') return;

    const grid = qs(root, '[data-qcm-grid]');
    const pager = qs(root, '[data-qcm-pager]');
    const btn = qs(root, '[data-qcm-load-more]');
    const sentinel = qs(root, '[data-qcm-sentinel]');

    if (!grid || !pager) return;

    let loading = false;

    async function loadNext(){
      if (loading) return;
      const nextUrl = pager.getAttribute('data-next-url');
      if (!nextUrl) return;

      loading = true;
      if (btn) btn.disabled = true;

      try{
        const html = await fetchNext(nextUrl);
        const doc = parseHTML(html);

        const nextRoot = doc.getElementById(root.id);
        if (!nextRoot) throw new Error('Section root not found in next page');

        const newItems = nextRoot.querySelectorAll('[data-qcm-item]');
        newItems.forEach(item => grid.appendChild(item));

        const nextPager = nextRoot.querySelector('[data-qcm-pager]');
        const newNextUrl = nextPager ? nextPager.getAttribute('data-next-url') : '';
        pager.setAttribute('data-next-url', newNextUrl || '');

        if (!newNextUrl) {
          if (btn) btn.remove();
          if (sentinel) sentinel.remove();
        }
      } catch(e){
        // Fallback: if anything fails, keep normal link visible (noscript already exists)
        console.warn('[Collection Modern] loadNext error', e);
      } finally{
        loading = false;
        if (btn) btn.disabled = false;
      }
    }

    if (btn) {
      btn.addEventListener('click', loadNext);
    }

    if (paginationStyle === 'infinite_scroll' && sentinel) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) loadNext();
        });
      }, { rootMargin: '600px 0px' });

      io.observe(sentinel);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.q-collection-modern[data-section-id]').forEach(initSection);
  });
})();