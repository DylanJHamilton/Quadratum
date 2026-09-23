(() => {
  'use strict';
  if (window.QuadratumWaitlist) { window.QuadratumWaitlist.init(document); return; }
  const selector = '[data-q-waitlist]', instances = new Map();
  const candidates = scope => [ ...(scope.matches?.(selector) ? [scope] : []), ...scope.querySelectorAll(selector) ];
  const byName = (form, name) => Array.from(form.elements).find(el => el.name === name);
  const tagValue = value => String(value || '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
  function initOne(root) {
    const form = root.querySelector('form'), picker = root.querySelector('[data-variant-picker]');
    if (!form || !picker || instances.has(root)) return;
    const events = new AbortController(), native = form.dataset.qDestination !== 'custom_endpoint';
    const productId = root.dataset.productId, handle = root.dataset.productHandle;
    const originalRequired = picker.required, originalValue = picker.value;
    const initialOptions = new Set(picker.options), label = root.querySelector('[data-waitlist-label]');
    const variantId = root.querySelector('[data-waitlist-id]'), status = root.querySelector('[data-waitlist-binding]');
    const tags = byName(form, native ? 'contact[tags]' : 'tags');
    const originalTags = tags?.value || '';
    const originalLabel = label?.value || '', originalId = variantId?.value || '';
    let closed = false, lastAuto = '', manualOverride = false;
    const on = (target, type, callback) => target.addEventListener(type, callback, { signal: events.signal });
    picker.required = true;
    function sync(notify = false) {
      const selected = picker.options[picker.selectedIndex];
      const id = selected && /^\d+$/.test(selected.value) ? selected.value : '';
      if (variantId) variantId.value = id;
      if (label) label.value = id ? selected.dataset.variantLabel || selected.textContent : '';
      if (tags) {
        // Replace only this component's reserved context tags; preserve attribution and merchant tags.
        const values = tags.value.split(',').map(x => x.trim()).filter(x => x && !/^variant_id=/.test(x) && !/^product=/.test(x));
        if (handle) values.push('product=' + tagValue(handle));
        if (id) values.push('variant_id=' + id);
        tags.value = [...new Set(values)].join(', ');
      }
      if (notify) form.dispatchEvent(new Event('change', { bubbles: true }));
    }
    function pdpControl() {
      if (root.dataset.bindMode !== 'auto' || !handle) return null;
      // Auto binding is only for the current product page, never a featured card or quick view.
      const path = window.location.pathname.replace(/\/$/, '');
      if (!path.endsWith('/products/' + encodeURIComponent(handle)) && !path.endsWith('/products/' + handle)) return null;
      const controls = new Set();
      document.querySelectorAll('[data-product-id], [data-product-handle], [data-product-url]').forEach(host => {
        if (host.matches('[data-q-form-host]') || host.closest('dialog,[role="dialog"]')) return;
        let match = productId && host.dataset.productId === productId || host.dataset.productHandle === handle;
        if (!match && host.dataset.productUrl) {
          try { const url = new URL(host.dataset.productUrl, location.href); match = url.origin === location.origin && url.pathname.replace(/\/$/, '').endsWith('/products/' + encodeURIComponent(handle)); } catch (_) { /* Invalid host metadata is not an identity. */ }
        }
        if (!match) return;
        host.querySelectorAll('form').forEach(productForm => {
          let cartForm = false;
          try { const url = new URL(productForm.action, location.href); cartForm = url.origin === location.origin && /\/cart\/add(?:\.js)?$/.test(url.pathname); } catch (_) { return; }
          if (!cartForm) return;
          const input = Array.from(productForm.elements).find(el => el.name === 'id' && !el.disabled);
          const owner = input?.closest('[data-product-id], [data-product-handle], [data-product-url]');
          if (input && owner === host && !input.closest('dialog,[role="dialog"]')) controls.add(input);
        });
      });
      return controls.size === 1 ? Array.from(controls)[0] : null;
    }
    function fromProduct(announce = false) {
      if (manualOverride && !announce) return;
      const input = pdpControl();
      if (!input || !/^\d+$/.test(input.value)) return;
      let option = Array.from(picker.options).find(el => el.value === input.value);
      // A selected native product option also covers variants outside Liquid's first 250.
      if (!option && input.tagName === 'SELECT') {
        const source = input.options[input.selectedIndex];
        if (source?.value === input.value) {
          option = document.createElement('option'); option.value = input.value;
          option.textContent = source.textContent; option.dataset.variantLabel = source.dataset.variantLabel || source.textContent;
          picker.appendChild(option);
        }
      }
      if (!option) {
        picker.value = ''; lastAuto = '';
        if (status) status.textContent = 'Choose a variant below to continue.';
        sync(announce); return;
      }
      if (lastAuto === input.value && !announce) return;
      manualOverride = false; lastAuto = input.value; picker.value = option.value;
      if (status && announce) status.textContent = 'Selected from product options: ' + (option.dataset.variantLabel || option.textContent);
      sync(announce);
    }
    on(picker, 'change', () => { manualOverride = true; lastAuto = ''; if (status) status.textContent = ''; sync(); });
    on(document, 'change', event => { if (event.target === pdpControl()) fromProduct(true); });
    on(document, 'qtm:variant-restored', event => { if (event.target === pdpControl()) fromProduct(true); });
    on(form, 'submit', () => sync());
    on(form, 'reset', () => queueMicrotask(() => { if (!closed) { manualOverride = false; lastAuto = ''; if (status) status.textContent = ''; fromProduct(); sync(); } }));
    on(window, 'pageshow', () => { fromProduct(); sync(); });
    sync(); fromProduct();
    const dispose = () => {
      closed = true; events.abort(); picker.required = originalRequired;
      Array.from(picker.options).filter(option => !initialOptions.has(option)).forEach(option => option.remove());
      picker.value = originalValue;
      if (variantId) variantId.value = originalId;
      if (label) label.value = originalLabel;
      if (tags) tags.value = originalTags;
      if (status) status.textContent = '';
      instances.delete(root);
    };
    instances.set(root, dispose);
  }
  const api = {
    init(scope = document) { candidates(scope).forEach(initOne); },
    dispose(scope) { for (const [root, dispose] of instances) if (root === scope || scope.contains?.(root)) dispose(); }
  };
  window.QuadratumWaitlist = api;
  document.addEventListener('shopify:section:load', event => api.init(event.target));
  document.addEventListener('shopify:section:unload', event => api.dispose(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => api.init(), { once: true });
  else api.init();
})();
