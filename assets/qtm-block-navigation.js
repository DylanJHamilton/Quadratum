/* Progressive Theme Block navigation; native links/disclosures remain the fallback. */
(() => {
  if (window.qtmBlockNavigation) return;
  const selector = '[data-qtm-anchor-nav], [data-qtm-menu-list]', instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  function init(root) {
    if (instances.has(root)) return;
    const abort = new AbortController(), cleanups = [];
    const on = (node, name, fn) => node.addEventListener(name, fn, { signal: abort.signal });
    instances.set(root, () => { abort.abort(); cleanups.forEach(fn => fn()); });
    if (root.hasAttribute('data-qtm-menu-list')) {
      const items = [...root.querySelectorAll('details')].filter(item => item.closest('[data-qtm-menu-list]') === root);
      const states = new Map();
      const restore = () => { states.forEach((open, item) => { item.open = open; }); states.clear(); root.removeAttribute('data-menu-ready'); };
      const resize = () => {
        if (window.innerWidth > 749 || root.dataset.mobileAccordion !== 'false') { restore(); return; }
        for (const item of items) {
          if (!states.has(item)) states.set(item, item.open);
          if (item.querySelector('summary')?.contains(document.activeElement)) item.querySelector('a')?.focus();
          item.open = true;
        }
        root.setAttribute('data-menu-ready', '');
      };
      on(window, 'resize', resize); resize(); cleanups.push(restore);
    }
    if (root.hasAttribute('data-qtm-anchor-nav')) {
      const links = [...root.querySelectorAll('a[data-anchor-target]')].filter(link => link.closest('[data-qtm-anchor-nav]') === root);
      const original = links.map(link => ({ link, active: link.classList.contains('is-active'), current: link.getAttribute('aria-current') }));
      const active = selected => links.forEach(link => { link.classList.toggle('is-active', link === selected); if (link === selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
      const sync = () => {
        if (root.dataset.activeOnClick !== 'true') return;
        let id; try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
        active(id ? links.find(link => link.dataset.anchorTarget === id && document.getElementById(id)) : original.find(item => item.active)?.link);
      };
      const focusCleanups = new Map();
      for (const link of links) on(link, 'click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
        const target = document.getElementById(link.dataset.anchorTarget);
        if (!target || root.dataset.smoothScroll !== 'true') return;
        const oldURL = window.location.href;
        // Keep native history/back and other fragment consumers (including tabs) in sync.
        try { if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash); }
        catch (_) { return; }
        event.preventDefault();
        if (oldURL !== window.location.href) window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));
        sync();
        if (!target.hasAttribute('tabindex') && !target.matches('a[href], button, input, select, textarea, summary')) {
          const clean = () => { if (target.getAttribute('tabindex') === '-1') target.removeAttribute('tabindex'); target.removeEventListener('blur', clean); focusCleanups.delete(target); };
          if (!focusCleanups.has(target)) { focusCleanups.set(target, clean); target.setAttribute('tabindex', '-1'); target.addEventListener('blur', clean, { once: true }); }
        }
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      });
      on(window, 'hashchange', sync); on(window, 'popstate', sync); sync();
      cleanups.push(() => { focusCleanups.forEach(fn => fn()); original.forEach(({ link, active, current }) => { link.classList.toggle('is-active', active); if (current === null) link.removeAttribute('aria-current'); else link.setAttribute('aria-current', current); }); });
    }
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmBlockNavigation = { boot, dispose };
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
