/* History stores native handles only; current native cards come from the owning section. */
(() => {
  if (window.qtmBlockRecentlyViewed) return;
  const selector = '[data-qtm-recently-viewed]', instances = new Map(), memory = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const validHandle = value => typeof value === 'string' && value.length <= 255 && /^[\p{L}\p{N}][\p{L}\p{N}_-]*$/u.test(value);
  const normalize = value => Array.isArray(value) ? [...new Set(value.map(entry => typeof entry === 'string' ? entry : entry?.handle).filter(validHandle))].slice(0, 24) : [];
  function read(key) {
    if (memory.has(key)) return memory.get(key);
    for (const storeName of ['sessionStorage', 'localStorage']) {
      try { const value = window[storeName].getItem(key); if (value !== null) return normalize(JSON.parse(value)); } catch (_) { /* Continue with the next available store. */ }
    }
    try {
      const prefix = encodeURIComponent(key) + '=', cookie = document.cookie.split(';').map(x => x.trim()).find(x => x.startsWith(prefix));
      if (cookie) return normalize(JSON.parse(decodeURIComponent(cookie.slice(prefix.length))));
    } catch (_) { /* Malformed legacy cookies cannot break the block. */ }
    return memory.get(key) || [];
  }
  function write(key, handles) {
    memory.set(key, handles);
    const payload = JSON.stringify(handles);
    for (const storeName of ['localStorage', 'sessionStorage']) {
      try { window[storeName].setItem(key, payload); if (storeName === 'localStorage') { try { window.sessionStorage.removeItem(key); } catch (_) {} } return; } catch (_) { /* Try the next available store. */ }
    }
    try { document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(payload) + '; Max-Age=2592000; Path=/; SameSite=Lax'; } catch (_) { /* Page memory still works. */ }
  }
  function init(root) {
    if (instances.has(root)) return;
    const items = root.querySelector('[data-card-items]');
    if (!items) return;
    const abort = new AbortController(), key = root.dataset.storageKey || 'quadratum_recently_viewed_products';
    const design = root.dataset.designMode === 'true', current = root.dataset.currentHandle;
    const limit = Math.min(12, Math.max(2, Number(root.dataset.productLimit) || 6));
    const section = root.dataset.sectionId || root.closest('[id^="shopify-section-"]')?.id.slice(16);
    let active = true, incoming;
    const apply = () => {
      if (!active || !root.isConnected || !incoming || items.contains(document.activeElement)) return;
      items.replaceChildren(...incoming); incoming = null;
      const count = items.querySelectorAll('[data-qtm-product-card]').length;
      root.hidden = !count && root.dataset.showWhenEmpty === 'false' && !design;
      const empty = root.querySelector('[data-card-empty]'); if (empty) empty.hidden = count > 0;
      items.removeAttribute('aria-busy');
      root.dispatchEvent(new CustomEvent('qtm:cards-updated'));
    };
    items.addEventListener('focusout', () => queueMicrotask(apply), { signal: abort.signal });
    instances.set(root, () => { active = false; abort.abort(); incoming = null; items.removeAttribute('aria-busy'); delete root.dataset.recentReady; });
    root.dataset.recentReady = '';
    if (design) return;
    let history = read(key);
    if (validHandle(root.dataset.pageProduct)) history = [root.dataset.pageProduct, ...history.filter(handle => handle !== root.dataset.pageProduct)].slice(0, 24);
    write(key, history);
    const handles = history.filter(handle => root.dataset.excludeCurrent !== 'true' || handle !== current).slice(0, limit);
    async function card(handle) {
      const own = root.querySelector('template[data-recent-card-template]')?.content.querySelector('[data-qtm-product-card]');
      if (handle === current && own) return own.cloneNode(true);
      if (!section || typeof fetch !== 'function') return null;
      try {
        const base = new URL(root.dataset.rootUrl || window.Shopify?.routes?.root || '/', location.href);
        if (base.origin !== location.origin) return null;
        const url = new URL('products/' + encodeURIComponent(handle), base);
        url.searchParams.set('section_id', section);
        const response = await fetch(url, { credentials: 'same-origin', signal: abort.signal });
        if (!response.ok || !active) return null;
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html'), replacement = doc.getElementById(root.id);
        if (!replacement?.matches(selector) || replacement.dataset.currentHandle !== handle || replacement.dataset.sectionId !== section) return null;
        const node = replacement.querySelector('template[data-recent-card-template]')?.content.querySelector('[data-qtm-product-card]');
        if (!node || !replacement.dataset.productId || node.dataset.cardProductId !== replacement.dataset.productId) return null;
        return node.cloneNode(true);
      } catch (_) { return null; }
    }
    async function load() {
      items.setAttribute('aria-busy', 'true');
      // Bound concurrency while preserving recency order and all configured slots.
      const result = Array(handles.length); let index = 0;
      const worker = async () => { while (active && index < handles.length) { const next = index++; result[next] = await card(handles[next]); } };
      await Promise.all(Array.from({ length: Math.min(3, handles.length) }, worker));
      if (!active || !root.isConnected) return;
      incoming = result.filter(Boolean); apply();
    }
    load();
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmBlockRecentlyViewed = { boot, dispose };
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
