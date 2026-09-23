/* Merchant-configured redirect only. No requests or shipment-status inference. */
(() => {
  'use strict';
  if (window.__qAccountTracking) return;
  window.__qAccountTracking = true;

  const instances = new Map();
  const selector = '[data-qtm-order-tracking]';
  const fields = ['order', 'email', 'tracking'];

  function safeDestination(value) {
    const text = (value || '').trim();
    if (!/^(https:\/\/|\/(?!\/))/i.test(text) || /[\\\u0000-\u001f\u007f]/.test(text)) return null;
    try {
      const url = new URL(text, location.origin);
      if (url.username || url.password) return null;
      if (url.protocol === 'https:' || (text.startsWith('/') && url.origin === location.origin)) return url;
    } catch (_) {
      // Invalid merchant configuration leaves native order/support guidance visible.
    }
    return null;
  }

  function validatePattern(pattern) {
    const authority = pattern.match(/^https:\/\/([^/?#]*)/i)?.[1] || '';
    if (/[{}]/.test(authority)) return null;
    let example = pattern;
    for (const field of fields) example = example.replaceAll('{' + field + '}', 'test');
    if (/[{}]/.test(example)) return null;
    return safeDestination(example);
  }

  function mount(root) {
    if (instances.has(root)) return;
    const form = root.querySelector('[data-qtm-tracking-form]');
    const note = root.querySelector('[data-qtm-tracking-unavailable]');
    const message = root.querySelector('[data-qtm-tracking-message]');
    const pattern = (root.dataset.providerUrl || '').trim();
    const destination = validatePattern(pattern);
    if (!form || !message || !destination) return;
    const orderInput = form.elements.namedItem('order_number');
    const emailInput = form.elements.namedItem('email');
    const trackingInput = form.elements.namedItem('tracking_number');
    if (!orderInput || !emailInput) return;

    const abort = new AbortController();
    form.hidden = false;
    if (note) note.hidden = true;

    function showError(text, target = message) {
      message.textContent = text;
      message.hidden = false;
      target.focus();
    }

    function submit(event) {
      event.preventDefault();
      message.hidden = true;
      if (!form.reportValidity()) return;
      const values = { order: orderInput.value.trim(), email: emailInput.value.trim(), tracking: trackingInput?.value.trim() || '' };
      if (!values.order) {
        showError('Enter an order number.', orderInput);
        return;
      }
      let expanded = pattern;
      for (const field of fields) expanded = expanded.replaceAll('{' + field + '}', encodeURIComponent(values[field]));
      const url = safeDestination(expanded);
      if (!url || url.origin !== destination.origin) {
        showError('Tracking is unavailable. Please contact the store.');
        return;
      }
      for (const field of fields) {
        if (values[field] && !pattern.includes('{' + field + '}')) url.searchParams.set(field, values[field]);
      }
      location.assign(url.href);
    }

    form.addEventListener('submit', submit, { signal: abort.signal });
    function dispose() {
      abort.abort();
      form.hidden = true;
      if (note) note.hidden = false;
      message.hidden = true;
      instances.delete(root);
    }
    instances.set(root, dispose);
  }

  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  } else {
    scan(document);
  }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) {
      if (root === event.target || event.target.contains(root)) dispose();
    }
  });
})();
