/* Native collection forms and links remain usable without enhancement. */
(() => {
  'use strict';
  if (window.qtmCollectionHosts) return;
  const instances = new Map();
  const selector = '.q-collection-modern[id], .main-collection-classic[id]';
  function init(root) {
    if (instances.has(root)) return;
    const life = new AbortController();
    const on = (node, type, fn) => node && node.addEventListener(type, fn, { signal: life.signal });
    let request, observer, busy = false, fallback = false, disposed = false, opener;
    const drawer = root.querySelector('[data-qcm-drawer]');
    const openButton = root.querySelector('[data-qcm-drawer-open]');
    const nativeFilters = root.querySelector('[data-qcm-drawer-fallback]');
    const panel = drawer?.querySelector('[role=dialog]');
    function closeDrawer(restore = true) {
      if (!drawer) return;
      drawer.hidden = true;
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('is-open');
      openButton?.setAttribute('aria-expanded', 'false');
      if (restore && opener?.isConnected) opener.focus();
      opener = null;
    }
    if (drawer && panel && openButton) {
      if (!drawer.id) drawer.id = root.id + '-filters';
      openButton.setAttribute('aria-controls', drawer.id);
      openButton.hidden = false;
      if (nativeFilters) nativeFilters.hidden = true;
      on(openButton, 'click', () => {
      window.dispatchEvent(new CustomEvent('qtm:collection-modal-open', { detail: drawer }));
        opener = document.activeElement;
        drawer.hidden = false;
        drawer.setAttribute('aria-hidden', 'false');
        drawer.classList.add('is-open');
        openButton.setAttribute('aria-expanded', 'true');
        panel.focus();
      });
      on(drawer, 'click', event => { if (event.target.closest('[data-qcm-drawer-close],[data-qcm-close-filters]')) closeDrawer(); });
      on(document, 'keydown', event => {
        if (drawer.hidden) return;
        if (event.key === 'Escape') { event.preventDefault(); closeDrawer(); }
        if (event.key === 'Tab') {
          const items = [...panel.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled):not([type=hidden]),select:not(:disabled),summary')].filter(el => !el.closest('details:not([open])') || el.tagName === 'SUMMARY');
          const first = items[0] || panel, last = items.at(-1) || panel;
          if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      });
      on(document, 'focusin', event => { if (!drawer.hidden && !panel.contains(event.target)) panel.focus(); });
    }
    // Sort forms always include an explicit native submit button.
    on(root, 'change', event => { if (event.target.matches('[data-qcm-sort]')) event.target.form?.requestSubmit(); });
    on(window, 'qtm:collection-modal-open', event => { if (event.detail !== drawer) closeDrawer(false); });
    const grid = root.querySelector('[data-qcm-grid],.main-collection-classic__grid');
    const link = root.querySelector('[data-qcm-loadmore],[data-infinite-next]');
    const status = root.querySelector('[data-qcm-status],[data-infinite-status]');
    const say = message => { if (status) status.textContent = message; };
    async function load(manual) {
      if (!link || !grid || busy || fallback || disposed || !link.hasAttribute('href')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      busy = true;
      request = new AbortController();
      grid.setAttribute('aria-busy', 'true');
      link.setAttribute('aria-disabled', 'true');
      say('Loading products…');
      try {
        const response = await fetch(url.href, { credentials: 'same-origin', signal: request.signal });
        if (!response.ok) throw new Error('Request failed');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        if (disposed || !root.isConnected) return;
        const incomingRoot = doc.getElementById(root.id);
        const incomingGrid = incomingRoot?.querySelector('[data-qcm-grid],.main-collection-classic__grid');
        const incomingLink = incomingRoot?.querySelector('[data-qcm-loadmore],[data-infinite-next]');
        const next = incomingLink?.getAttribute('href');
        if (!incomingGrid?.children.length) throw new Error('Missing product page');
        if (next && (new URL(next, url).href === url.href || new URL(next, url).origin !== location.origin)) throw new Error('Invalid next page');
        const first = incomingGrid.firstElementChild;
        grid.append(...incomingGrid.children);
        if (next) link.href = new URL(next, url).href;
        else { link.removeAttribute('href'); link.setAttribute('aria-disabled', 'true'); observer?.disconnect(); }
        if (manual) first.querySelector('a[href],button:not(:disabled)')?.focus();
        say(next ? 'More products loaded.' : 'All products loaded.');
      } catch (error) {
        if (!disposed && error.name !== 'AbortError') { fallback = true; observer?.disconnect(); say('Unable to load more. Use the next-page link.'); }
      } finally {
        busy = false;
        grid.removeAttribute('aria-busy');
        if (link.hasAttribute('href')) link.removeAttribute('aria-disabled');
      }
    }
    if (link && grid && window.fetch) {
      on(link, 'click', event => {
        if (fallback || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault(); load(true);
      });
      const infinite = root.dataset.paginationStyle === 'infinite_scroll' || root.dataset.pagination === 'infinite_scroll';
      const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (infinite && window.IntersectionObserver && !motion?.matches) {
        observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) load(false); }, { rootMargin: '300px' });
        observer.observe(link);
        on(motion, 'change', () => { if (motion.matches) observer.disconnect(); });
      }
    }
    instances.set(root, () => {
      disposed = true; request?.abort(); observer?.disconnect(); closeDrawer(false); life.abort();
      if (openButton) openButton.hidden = true;
      if (nativeFilters) nativeFilters.hidden = false;
      grid?.removeAttribute('aria-busy');
      link?.removeAttribute('aria-disabled');
      instances.delete(root);
    });
  }
  function boot(scope = document) { if (scope.matches?.(selector)) init(scope); scope.querySelectorAll(selector).forEach(init); }
  window.qtmCollectionHosts = { boot };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true }); else boot();
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => { for (const [root, dispose] of instances) if (event.target === root || event.target.contains(root)) dispose(); });
})();
