/* Merchant-configured messages and native product sharing; countdowns reuse the theme controller. */
(() => {
  if (window.qtmProductBlockUtilities) return;
  const selector = '[data-product-share], [data-product-recently-purchased], [data-product-countdown]';
  const instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController(), cleanups = [], timers = new Set();
    let disposed = false;
    const on = (node, event, handler) => node?.addEventListener(event, handler, { signal: abort.signal });
    const later = (handler, delay) => { const id = setTimeout(() => { timers.delete(id); if (!disposed) handler(); }, delay); timers.add(id); return id; };
    instances.set(root, () => { disposed = true; abort.abort(); timers.forEach(clearTimeout); cleanups.forEach(fn => fn()); });
    if (root.hasAttribute('data-product-countdown')) {
      window.QuadratumCountdown?.mount(root);
      cleanups.push(() => window.QuadratumCountdown?.unmount(root));
    }
    if (root.hasAttribute('data-product-recently-purchased') && root.dataset.randomize === 'true') {
      const node = root.querySelector('[data-product-recently-purchased-message]');
      if (node) {
        const initial = node.textContent;
        try {
          const data = JSON.parse(root.dataset.messages || '[]');
          const messages = Array.isArray(data) ? data.filter(item => typeof item === 'string' && item.trim()) : [];
          if (messages.length) node.textContent = messages[Math.floor(Math.random() * messages.length)];
        } catch (_) { /* Keep the actual server-rendered merchant message. */ }
        cleanups.push(() => { node.textContent = initial; });
      }
    }
    if (root.hasAttribute('data-product-share')) {
      const native = root.querySelector('[data-product-share-native]'), copy = root.querySelector('[data-product-share-copy]');
      const copyText = root.querySelector('[data-product-share-copy-text]'), input = root.querySelector('[data-product-share-url]');
      const status = root.querySelector('[data-product-share-message]'), url = root.dataset.shareUrl;
      let messageTimer, labelTimer;
      const cancel = id => { clearTimeout(id); timers.delete(id); };
      const message = text => {
        if (disposed || !status) return;
        cancel(messageTimer); status.textContent = text;
        messageTimer = later(() => { status.textContent = ''; }, 5000);
      };
      const resetCopy = () => { if (copyText) copyText.textContent = root.dataset.copyLabel; copy?.setAttribute('aria-label', root.dataset.copyLabel); };
      if (native) {
        native.hidden = typeof navigator.share !== 'function';
        on(native, 'click', async () => {
          if (native.disabled) return;
          native.disabled = true;
          try { await navigator.share({ title: root.dataset.shareTitle, text: root.dataset.shareText, url }); }
          catch (error) { if (error?.name !== 'AbortError') message(root.dataset.unsupportedMessage); }
          finally { if (!disposed) native.disabled = false; }
        });
      }
      if (copy) {
        copy.hidden = !navigator.clipboard?.writeText && typeof document.execCommand !== 'function';
        on(copy, 'click', async () => {
          if (copy.disabled) return;
          copy.disabled = true;
          try {
            if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
            else {
              const previous = document.activeElement;
              try { input?.select(); if (!input || !document.execCommand('copy')) throw Error('Copy unavailable'); }
              finally { if (previous?.isConnected) previous.focus(); }
            }
            if (disposed) return;
            cancel(labelTimer);
            if (copyText) copyText.textContent = root.dataset.copiedLabel;
            copy.setAttribute('aria-label', root.dataset.copiedLabel);
            message(root.dataset.copiedMessage); labelTimer = later(resetCopy, 3000);
          } catch (_) { message(root.dataset.unsupportedMessage); }
          finally { if (!disposed) copy.disabled = false; }
        });
      }
      cleanups.push(() => {
        if (native) { native.hidden = true; native.disabled = false; }
        if (copy) { copy.hidden = true; copy.disabled = false; }
        resetCopy(); if (status) status.textContent = '';
      });
    }
  }
  const boot = node => roots(node).forEach(mount);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmProductBlockUtilities = { boot, dispose };
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
