/* Shopify recommendation fragments, scoped to their originating section. */
(() => {
  if (window.qtmProductRecommendations) return;
  window.qtmProductRecommendations = true;
  const instances = new WeakMap(), selector = '.product-recommended[data-dynamic="true"]';
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(root) {
    if (instances.has(root)) return;
    const items = root.querySelector('[data-recommendations-url]');
    if (!items) return;
    let url;
    try { url = new URL(items.dataset.recommendationsUrl, location.href); if (url.origin !== location.origin) return; } catch { return; }
    const controller = new AbortController(); instances.set(root, controller);
    items.setAttribute('aria-busy', 'true');
    fetch(url, { credentials: 'same-origin', signal: controller.signal }).then(response => response.ok ? response.text() : null).then(html => {
      if (!html || controller.signal.aborted) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const incoming = doc.getElementById(root.id)?.querySelector('.product-recommended__items');
      if (!incoming) return;
      if (incoming.querySelector('.product-recommended__item')) {
        items.replaceChildren(...[...incoming.children].map(node => document.importNode(node, true)));
        root.hidden = false;
      } else if (!items.querySelector('.product-recommended__item') && !window.Shopify?.designMode) root.hidden = true;
    }).catch(() => { /* Keep the server-rendered manual/collection fallback. */ }).finally(() => {
      if (!controller.signal.aborted) items.removeAttribute('aria-busy');
    });
  }
  const boot = (scope = document) => each(scope, init);
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.abort(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true }); else boot();
})();
