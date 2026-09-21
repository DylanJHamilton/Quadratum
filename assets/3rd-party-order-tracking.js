/* Redirect helper only: no status lookup or provider authentication. */
(() => {
  'use strict';
  if (window.__qOrderTracking) return;
  window.__qOrderTracking = true;
  const selector = '[data-q-section="order-tracking"]', instances = new Map();
  const safeURL = value => {
    const text = (value || '').trim();
    if (!text || /[\\\r\n\t]/.test(text) || text.startsWith('//')) return null;
    try { const url = new URL(text, location.origin); return url.protocol === 'https:' || (text.startsWith('/') && url.origin === location.origin) ? url : null; } catch (_) { return null; }
  };
  function mount(root) {
    if (instances.has(root)) return;
    const form = root.querySelector('[data-q-order-tracking-form]');
    if (!form) return;
    const input = form.elements.namedItem('tracking'), emailInput = form.elements.namedItem('email');
    const error = root.querySelector('[data-q-order-tracking-error]'), unavailable = root.querySelector('[data-q-order-tracking-unavailable]');
    const d = root.dataset, external = d.qOrderTrackingMode === 'external_pattern';
    const pattern = (d.qOrderTrackingExternalPattern || '').trim();
    const base = external ? pattern : d.qOrderTrackingShopifyUrl;
    const fallback = external ? safeURL(d.qOrderTrackingExternalFallback) : null;
    const configured = safeURL((base || '').replaceAll('{tracking}', 'test').replaceAll('{email}', 'test')) || fallback;
    if (!configured) return;
    const listeners = new AbortController();
    const setError = (text, field) => { error.textContent = text; error.classList.toggle('is-visible', !!text); if (field) { field.setAttribute('aria-invalid','true'); field.focus(); } };
    form.hidden = false; unavailable.hidden = true;
    form.addEventListener('submit', event => {
      event.preventDefault(); input.removeAttribute('aria-invalid'); emailInput?.removeAttribute('aria-invalid'); setError('');
      const tracking = input.value.trim(), email = emailInput?.value.trim() || '';
      if (!tracking) { setError('Enter your order number or tracking ID.', input); return; }
      if (emailInput && !emailInput.checkValidity()) { setError('Enter a valid email address.', emailInput); return; }
      let url;
      if (external) {
        url = safeURL(pattern.replaceAll('{tracking}', encodeURIComponent(tracking)).replaceAll('{email}', encodeURIComponent(email)));
        if (url && !pattern.includes('{tracking}')) url.searchParams.set('tracking', tracking);
        if (url && email && !pattern.includes('{email}')) url.searchParams.set('email', email);
        url ||= fallback;
      } else {
        url = safeURL(base);
        if (url && d.qOrderTrackingShopifyAppend === 'true') {
          url.searchParams.set((d.qOrderTrackingShopifyParam || '').trim() || 'tracking', tracking);
          if (email) url.searchParams.set('email', email);
        }
      }
      if (!url) { setError('Tracking is not configured. Please contact the store.'); return; }
      if (d.qOrderTrackingNewtab === 'true') window.open(url.href, '_blank', 'noopener,noreferrer');
      else location.assign(url.href);
    }, { signal: listeners.signal });
    instances.set(root, () => { listeners.abort(); form.hidden = true; unavailable.hidden = false; setError(''); input.removeAttribute('aria-invalid'); emailInput?.removeAttribute('aria-invalid'); instances.delete(root); });
  }
  const scan = scope => { if (scope.matches?.(selector)) mount(scope); scope.querySelectorAll?.(selector).forEach(mount); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once:true }); else scan(document);
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => { for (const [root, dispose] of instances) if (root === event.target || event.target.contains(root)) dispose(); });
})();
