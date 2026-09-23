(() => {
  if (window.qtmBlogFeeds) { window.qtmBlogFeeds(); return; }
  const instances = new Map();
  const selector = '[data-q-section="feeds-blogs"]';
  function init(root) {
    if (instances.has(root)) return;
    const button = root.querySelector('[data-q-loadmore]');
    const items = root.querySelector('[data-q-feed-items]');
    let fallback = root.querySelector('[data-q-pagination-fallback]');
    if (!button || !items || !window.fetch) return;
    const listeners = new AbortController();
    let request, busy = false;
    button.hidden = false;
    if (fallback) fallback.hidden = true;
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.className = 'q-feed__status';
    button.after(status);
    button.addEventListener('click', async () => {
      if (busy || !button.dataset.nextUrl) return;
      busy = true;
      request = new AbortController();
      const activeRequest = request;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      root.classList.add('is-loading');
      status.textContent = '';
      try {
        const nextUrl = new URL(button.dataset.nextUrl, location.href);
        if (nextUrl.origin !== location.origin) throw new Error('Invalid pagination origin');
        const response = await fetch(nextUrl.href, { credentials: 'same-origin', signal: activeRequest.signal });
        if (!response.ok) throw new Error('Page unavailable');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        if (activeRequest.signal.aborted || !root.isConnected) return;
        const nextRoot = doc.getElementById(root.id);
        const incoming = nextRoot?.querySelector('[data-q-feed-items]');
        if (!incoming || !incoming.children.length) throw new Error('Articles unavailable');
        const children = [...incoming.children];
        const nextButton = nextRoot.querySelector('[data-q-loadmore]');
        const next = nextButton?.dataset.nextUrl || '';
        if (next && new URL(next, location.href).href === nextUrl.href) throw new Error('Repeated page');
        items.append(...children);
        button.dataset.nextUrl = next;
        const nextFallback = nextRoot.querySelector('[data-q-pagination-fallback]');
        if (fallback && nextFallback) { fallback.replaceWith(nextFallback); fallback = nextFallback; fallback.hidden = true; }
        status.textContent = `${children.length} more articles loaded.`;
        children[0].querySelector('a')?.focus({ preventScroll: true });
      } catch (_) {
        if (activeRequest.signal.aborted) return;
        status.textContent = 'Unable to load more articles. Use the page links below.';
        if (fallback) fallback.hidden = false;
        button.hidden = true;
      } finally {
        if (!activeRequest.signal.aborted) {
          busy = false;
          button.disabled = !button.dataset.nextUrl;
          button.setAttribute('aria-disabled', String(button.disabled));
          button.removeAttribute('aria-busy');
          root.classList.remove('is-loading');
        }
      }
    }, { signal: listeners.signal });
    instances.set(root, () => {
      request?.abort(); listeners.abort(); status.remove();
      button.hidden = true; button.disabled = false; button.removeAttribute('aria-busy'); button.removeAttribute('aria-disabled');
      root.classList.remove('is-loading'); if (fallback) fallback.hidden = false;
      instances.delete(root);
    });
  }
  function boot(scope = document) {
    instances.forEach((dispose, root) => { if (!root.isConnected) dispose(); });
    if (scope.matches?.(selector)) init(scope);
    scope.querySelectorAll(selector).forEach(init);
  }
  window.qtmBlogFeeds = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true }); else boot();
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => instances.forEach((dispose, root) => { if (event.target === root || event.target.contains(root)) dispose(); }));
})();
