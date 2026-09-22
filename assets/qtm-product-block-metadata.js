/* Product Theme Block metadata: scoped variants and progressive descriptions. */
(() => {
  if (window.qtmProductBlockMetadata) return;
  const selector = '[data-product-sku], [data-product-description], [data-product-info]';
  const instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const scopeOf = root => root.closest('.qtm-product-block-section, .shopify-section') || root;
  function init(root) {
    if (instances.has(root)) return;
    const abort = new AbortController();
    let active = true;
    let observer;
    const on = (node, name, fn, options = {}) => node.addEventListener(name, fn, { ...options, signal: abort.signal });
    const cleanup = () => { active = false; abort.abort(); observer?.disconnect(); root.classList.remove('is-enhanced'); };
    instances.set(root, cleanup);
    if (root.hasAttribute('data-product-sku') || root.hasAttribute('data-product-info')) {
      const value = root.querySelector('[data-product-sku-value]');
      let variants;
      try { variants = JSON.parse(root.dataset.variants || '[]'); } catch (_) { variants = []; }
      if ((!value && !root.hasAttribute('data-product-info')) || !Array.isArray(variants)) return;
      const scope = scopeOf(root);
      const update = id => {
        const variant = variants.find(item => String(item.id) === String(id));
        if (id && !variant) return;
        const sku = variant?.sku || '';
        if (value) {
          value.textContent = sku || root.dataset.emptyText || '';
          root.classList.toggle('product-sku--empty', !sku && root.dataset.hideEmpty === 'true' && root.dataset.designMode !== 'true');
        }
        for (const field of root.querySelectorAll('[data-product-info-value]')) {
          const key = field.dataset.infoKey;
          field.textContent = variant?.values?.[key] ?? (['availability', 'inventory'].includes(key) ? (root.dataset.unavailableText || 'Unavailable') : '');
          if (field.hasAttribute('data-hide-empty')) field.hidden = !field.textContent.trim();
        }
        root.dataset.variantId = variant ? String(variant.id) : '';
      };
      const handle = event => {
        const detail = event.detail || {};
        if (detail.productId != null && String(detail.productId) !== root.dataset.productId) return;
        const owner = event.target instanceof Element && event.target.closest('[data-product-id]');
        if (owner && owner.dataset.productId !== root.dataset.productId) return;
        const sourceScope = event.target instanceof Element && scopeOf(event.target);
        if (sourceScope && sourceScope !== scope) return;
        if (!sourceScope) {
          if (detail.sectionId != null) {
            const id = String(detail.sectionId);
            if (![id, 'shopify-section-' + id, 'qtm-product-block-section-' + id].includes(scope.id)) return;
          } else {
            // Legacy document events cannot identify one of several instances of the same product.
            const scopes = new Set([...document.querySelectorAll('[data-product-sku], [data-product-info]')].filter(node => node.dataset.productId === root.dataset.productId).map(scopeOf));
            if (scopes.size !== 1) return;
          }
        }
        const id = detail.variant?.id ?? detail.variantId ?? detail.variant_id ?? detail.id;
        if (id != null || detail.variant === null) update(id);
      };
      for (const name of ['variant:change', 'product:variant-change', 'qtm:variant:change']) on(document, name, handle);
      on(scope, 'change', event => {
        const input = event.target;
        const owner = input.closest?.('[data-product-id]');
        if (owner && owner.dataset.productId !== root.dataset.productId) return;
        if (input.matches?.('[name="id"]') && !input.disabled && (!['radio', 'checkbox'].includes(input.type) || input.checked)) update(input.value);
      });
      const initial = [...scope.querySelectorAll('form [name="id"]')].find(input => { const owner = input.closest('[data-product-id]'); return !owner || owner.dataset.productId === root.dataset.productId; });
      if (initial && !initial.disabled) update(initial.value);
      on(scope, 'qtm:variant-restored', event => { const input = event.target.matches?.('[name="id"]') ? event.target : event.target.querySelector?.('[name="id"]'); if (input && (!input.closest('[data-product-id]') || input.closest('[data-product-id]').dataset.productId === root.dataset.productId)) update(input.value); });
    } else {
      const content = root.querySelector('[data-product-description-content]');
      const toggle = root.querySelector('[data-product-description-toggle]');
      if (!content || !toggle || root.dataset.designMode === 'true') return;
      let expanded = false;
      const render = () => {
        if (!active) return;
        const limit = Number.parseFloat(getComputedStyle(root).getPropertyValue('--product-description-collapsed-height'));
        const long = limit > 0 && content.scrollHeight > limit + 8;
        root.classList.toggle('is-enhanced', long);
        root.classList.toggle('is-expanded', expanded);
        toggle.hidden = !long;
        toggle.setAttribute('aria-expanded', String(!long || expanded));
        toggle.textContent = expanded ? root.dataset.readLess : root.dataset.readMore;
      };
      on(toggle, 'click', () => { expanded = !expanded; render(); });
      // Keyboard access to a link in the clipped region reveals the complete description.
      on(content, 'focusin', () => { expanded = true; render(); });
      on(root.closest('.shopify-block') || root, 'shopify:block:select', () => { expanded = true; render(); });
      on(root, 'load', render, { capture: true });
      on(window, 'resize', render, { passive: true });
      if ('ResizeObserver' in window) {
        try { observer = new ResizeObserver(render); observer.observe(content); } catch (_) { observer?.disconnect(); }
      }
      document.fonts?.ready.then(render);
      render();
    }
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmProductBlockMetadata = { boot, dispose };
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
