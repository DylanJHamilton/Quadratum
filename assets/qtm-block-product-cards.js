/* Theme Block product cards: progressive native scrolling and complementary recommendations. */
(() => {
  if (window.qtmBlockProductCards) return;
  const selector = '[data-qtm-product-cards]';
  const instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  function init(root) {
    if (instances.has(root)) return;
    const items = root.querySelector('[data-card-items]');
    if (!items) return;
    const abort = new AbortController();
    const on = (node, event, callback, options = {}) => node.addEventListener(event, callback, { ...options, signal: abort.signal });
    const controls = root.querySelector('[data-card-controls]');
    const previous = root.querySelector('[data-card-prev]');
    const next = root.querySelector('[data-card-next]');
    const carousel = root.dataset.carousel === 'true' && typeof items.scrollBy === 'function';
    let active = true, frame = 0, observer, incoming;
    const cards = () => [...items.querySelectorAll('[data-qtm-product-card]')];
    const rtl = () => (getComputedStyle(items).direction || document.documentElement.dir) === 'rtl';
    const update = () => {
      frame = 0;
      if (!active || !carousel) return;
      const list = cards(), bounds = items.getBoundingClientRect();
      const first = list[0]?.getBoundingClientRect(), last = list.at(-1)?.getBoundingClientRect();
      const atStart = !first || (rtl() ? first.right <= bounds.right + 2 : first.left >= bounds.left - 2);
      const atEnd = !last || (rtl() ? last.left >= bounds.left - 2 : last.right <= bounds.right + 2);
      if (previous) previous.disabled = atStart;
      if (next) next.disabled = atEnd;
      if (controls) controls.hidden = !list.length || (atStart && atEnd);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const scroll = left => items.scrollBy({ left, behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    const move = direction => {
      const list = cards(), first = list[0]?.getBoundingClientRect(), second = list[1]?.getBoundingClientRect();
      if (!first) return;
      scroll((second ? Math.abs(second.left - first.left) : first.width) * direction * (rtl() ? -1 : 1));
    };
    if (carousel) {
      if (previous) on(previous, 'click', () => move(-1));
      if (next) on(next, 'click', () => move(1));
      on(items, 'scroll', schedule, { passive: true });
      on(items, 'keydown', event => {
        if (event.target !== items || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault(); move((event.key === 'ArrowRight' ? 1 : -1) * (rtl() ? -1 : 1));
        } else if (event.key === 'Home' || event.key === 'End') {
          const list = cards(), target = (event.key === 'Home' ? list[0] : list.at(-1))?.getBoundingClientRect();
          if (!target) return;
          event.preventDefault(); const bounds = items.getBoundingClientRect();
          scroll(rtl() ? target.right - bounds.right : target.left - bounds.left);
        }
      });
      on(window, 'resize', schedule, { passive: true });
      on(items, 'load', schedule, { capture: true });
      if ('ResizeObserver' in window) { observer = new ResizeObserver(schedule); observer.observe(items); }
      update();
    }
    on(root, 'qtm:cards-updated', event => { if (event.target === root) update(); });
    const apply = () => {
      // Retain a focused fallback product until the shopper leaves the card list.
      if (!active || !incoming || items.contains(document.activeElement)) return;
      items.replaceChildren(...incoming.childNodes); incoming = null;
      root.hidden = false;
      const empty = root.querySelector('[data-card-empty]'); if (empty) empty.hidden = true;
      root.dataset.nativeRecommendations = 'true'; update();
    };
    on(items, 'focusout', () => queueMicrotask(apply));
    async function recommend() {
      if (root.dataset.dynamicRecommendations !== 'true' || root.dataset.recommendationsPerformed === 'true' || !root.dataset.recommendationsUrl || typeof fetch !== 'function') return;
      let url;
      try { url = new URL(root.dataset.recommendationsUrl, window.location.href); } catch { return; }
      const limit = Number(url.searchParams.get('limit'));
      const intent = root.dataset.recommendationsIntent || 'complementary';
      if (!['related', 'complementary'].includes(intent) || url.origin !== window.location.origin || !/\/recommendations\/products\/?$/.test(url.pathname) || url.searchParams.get('intent') !== intent || url.searchParams.get('product_id') !== root.dataset.productId || !url.searchParams.get('section_id') || !Number.isInteger(limit) || limit < 1 || limit > 10) return;
      try {
        const response = await fetch(url, { credentials: 'same-origin', signal: abort.signal });
        if (!response.ok) return;
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        if (!active || !root.isConnected) return;
        const replacement = doc.getElementById(root.id);
        if (!replacement || replacement.dataset.productId !== root.dataset.productId || replacement.dataset.recommendationsPerformed !== 'true' || (replacement.dataset.recommendationsIntent || 'complementary') !== intent) return;
        root.dataset.recommendationsPerformed = 'true';
        const nextItems = replacement.querySelector('[data-card-items]');
        if (replacement.dataset.nativeRecommendations === 'true' && nextItems?.querySelector('[data-qtm-product-card]')) { incoming = nextItems; apply(); }
      } catch (_) { /* Native/manual product links remain available on failure or abort. */ }
    }
    instances.set(root, () => {
      active = false; abort.abort(); observer?.disconnect(); cancelAnimationFrame(frame); incoming = null;
      if (controls) controls.hidden = true;
      root.removeAttribute('data-qtm-cards-ready');
    });
    root.setAttribute('data-qtm-cards-ready', ''); recommend();
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmBlockProductCards = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  const start = () => {
    boot(document);
    if ('MutationObserver' in window && document.body) new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (!node.isConnected) dispose(node);
        for (const node of record.addedNodes) boot(node);
      }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
