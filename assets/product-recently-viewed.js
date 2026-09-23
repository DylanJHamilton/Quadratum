/* Recent history keeps the existing keys; cards use this host's Shopify settings. */
(() => {
  if (window.qtmRecentlyViewed) return;
  window.qtmRecentlyViewed = true;
  const instances = new WeakMap(), memory = new Map(), recorded = new Set();
  const selector = '.product-recently-viewed[data-section-id]';
  const validHandle = value => typeof value === 'string' && /^[\p{L}\p{N}_-]{1,255}$/u.test(value);
  const clamp = (value, min, max, fallback) => Math.max(min, Math.min(max, Number.parseInt(value, 10) || fallback));
  function storage() {
    for (const name of ['localStorage', 'sessionStorage']) try {
      const store = window[name]; store.setItem('__q_prv__', '1'); store.removeItem('__q_prv__'); return store;
    } catch { /* Try session storage, then shared page memory. */ }
    return null;
  }
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(root) {
    if (instances.has(root)) return;
    const items = root.querySelector('[data-prv-items]'), empty = root.querySelector('[data-prv-empty]');
    if (!items || !empty) return;
    const life = new AbortController(), request = new AbortController();
    const on = (node, type, fn, options = {}) => node?.addEventListener(type, fn, { ...options, signal: life.signal });
    const key = root.dataset.storageKey || 'q_recently_viewed', current = root.dataset.currentHandle;
    const limit = clamp(root.dataset.storageLimit, 10, 50, 20), max = clamp(root.dataset.maxProducts, 2, 12, 8);
    const designMode = root.dataset.designMode === 'true', dedupe = root.dataset.dedupe !== 'false';
    let store = storage();
    let history = memory.get(key) || [];
    if (store) try { const raw = JSON.parse(store.getItem(key) || '[]'); history = Array.isArray(raw) ? raw.filter(validHandle) : []; } catch { /* Preserve page history when storage is unreadable. */ }
    if (!designMode && validHandle(current) && !recorded.has(key + ':' + current)) {
      recorded.add(key + ':' + current); history = [current, ...history];
      if (dedupe) history = [...new Set(history)]; history = history.slice(0, limit);
      memory.set(key, history);
      if (store) try { store.setItem(key, JSON.stringify(history)); } catch { store = null; }
    }
    let handles = history.filter(validHandle);
    if (dedupe) handles = [...new Set(handles)];
    if (root.dataset.excludeCurrent !== 'false') handles = handles.filter(handle => handle !== current);
    handles = handles.slice(0, max);
    const prev = root.querySelector('[data-prv-prev]'), next = root.querySelector('[data-prv-next]'), controls = root.querySelector('[data-prv-controls]');
    function nav() {
      const maxScroll = items.scrollWidth - items.clientWidth;
      if (prev) prev.disabled = items.scrollLeft <= 2;
      if (next) next.disabled = items.scrollLeft >= maxScroll - 2;
      if (controls) controls.hidden = items.children.length < 2 || maxScroll <= 2;
    }
    function scroll(direction) {
      const first = items.querySelector('.product-recently-viewed__item'), gap = parseFloat(getComputedStyle(items).gap) || 0;
      const distance = first ? first.getBoundingClientRect().width + gap : items.clientWidth;
      items.scrollBy({ left: direction * distance, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    on(prev, 'click', () => scroll(-1)); on(next, 'click', () => scroll(1));
    on(items, 'scroll', nav, { passive: true }); on(window, 'resize', nav, { passive: true });
    function showEmpty() {
      root.hidden = !designMode && root.dataset.showWhenEmpty !== 'true';
      empty.hidden = designMode; empty.textContent = root.dataset.emptyText || "You haven't viewed any products yet.";
      if (controls) controls.hidden = true;
    }
    async function card(handle) {
      try {
        const url = new URL(`${window.Shopify?.routes?.root || '/'}products/${encodeURIComponent(handle)}`, location.href);
        if (url.origin !== location.origin) return null;
        url.searchParams.set('section_id', root.dataset.sectionId);
        const response = await fetch(url, { credentials: 'same-origin', signal: request.signal });
        if (!response.ok) return null;
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const host = doc.getElementById(root.id);
        return host?.querySelector('template[data-prv-card]')?.content.querySelector('.product-recently-viewed__item') || null;
      } catch { return null; }
    }
    async function render() {
      if (!handles.length) { showEmpty(); return; }
      items.setAttribute('aria-busy', 'true');
      const cards = await Promise.all(handles.map(card));
      if (request.signal.aborted) return;
      items.replaceChildren(...cards.filter(Boolean).map(node => document.importNode(node, true)));
      items.removeAttribute('aria-busy');
      if (!items.children.length) { showEmpty(); return; }
      root.hidden = false; empty.hidden = true;
      root.querySelector('.product-recently-viewed__items--placeholder')?.setAttribute('hidden', ''); nav();
    }
    const idle = 'requestIdleCallback' in window;
    const pending = idle ? window.requestIdleCallback(render, { timeout: 1200 }) : window.setTimeout(render, 0);
    instances.set(root, () => { request.abort(); life.abort(); if (idle) window.cancelIdleCallback(pending); else window.clearTimeout(pending); });
  }
  const boot = (scope = document) => each(scope, init);
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true }); else boot();
})();
