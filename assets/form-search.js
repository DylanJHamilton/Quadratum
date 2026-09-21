/* Optional price-band shortcuts; native GET controls always own the submitted filters. */
(() => {
  'use strict';
  if (window.QuadratumFormSearch) { window.QuadratumFormSearch.init(document); return; }
  const selector = '[data-q-form-search]', instances = new Map();
  function init(scope = document) {
    const roots = [...(scope.matches?.(selector) ? [scope] : []), ...scope.querySelectorAll(selector)];
    roots.forEach(root => {
      if (instances.has(root)) return;
      const band = root.querySelector('[data-price-band]'), min = root.querySelector('[name="filter.v.price.gte"]'), max = root.querySelector('[name="filter.v.price.lte"]');
      if (!band || !min || !max) return;
      const events = new AbortController(), initialHidden = band.closest('[data-price-shortcut]').hidden;
      let disposed = false, ownsError = false;
      const parse = value => {
        const match = /^(?:(\d+(?:\.\d{1,2})?)-(\d+(?:\.\d{1,2})?)|(\d+(?:\.\d{1,2})?)\+|<(\d+(?:\.\d{1,2})?))$/.exec(value.trim());
        if (!match) return null;
        const cents = x => Math.round(Number(x) * 100);
        let lower = match[1] ? cents(match[1]) : match[3] ? cents(match[3]) : null;
        let upper = match[2] ? cents(match[2]) : match[4] ? cents(match[4]) - 1 : null;
        if ([lower, upper].some(x => x !== null && (!Number.isSafeInteger(x) || x < 0)) || lower !== null && upper !== null && lower > upper) return null;
        return [lower === null ? '' : (lower / 100).toFixed(2), upper === null ? '' : (upper / 100).toFixed(2)];
      };
      const optionStates = [...band.options].map(option => [option, option.disabled, option.hidden]);
      for (const [option] of optionStates) if (option.value && !parse(option.value)) { option.disabled = true; option.hidden = true; }
      const wrap = band.closest('[data-price-shortcut]');
      wrap.hidden = ![...band.options].some(option => option.value && !option.disabled);
      function validate() {
        if (ownsError) { max.setCustomValidity(''); ownsError = false; }
        if (min.value !== '' && max.value !== '' && Number(min.value) > Number(max.value) && !max.validity.customError) {
          max.setCustomValidity('Maximum price must be greater than or equal to minimum price.'); ownsError = true;
        }
      }
      const on = (el, event, handler) => el.addEventListener(event, handler, { signal: events.signal });
      on(band, 'change', () => {
        const range = band.value ? parse(band.value) : ['', ''];
        if (!range) return;
        [min.value, max.value] = range; validate();
      });
      [min, max].forEach(input => on(input, 'input', () => { band.value = ''; validate(); }));
      on(band.form, 'reset', () => queueMicrotask(() => { if (!disposed) validate(); }));
      validate();
      instances.set(root, () => {
        disposed = true; events.abort(); wrap.hidden = initialHidden;
        if (ownsError) max.setCustomValidity('');
        optionStates.forEach(([option, disabled, hidden]) => { option.disabled = disabled; option.hidden = hidden; });
        instances.delete(root);
      });
    });
  }
  function dispose(scope) { for (const [root, fn] of instances) if (root === scope || scope.contains?.(root)) fn(); }
  window.QuadratumFormSearch = { init, dispose };
  document.addEventListener('shopify:section:load', event => init(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true }); else init();
})();
