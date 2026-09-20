(() => {
  if (window.qtmSellingPlansReady) return;
  window.qtmSellingPlansReady = true;
  const sources = new WeakMap();
  const selections = new WeakMap();
  const retired = new WeakSet();
  const selector = '[data-product-form-selling-plan]';

  function update(select) {
    if (retired.has(select)) return;
    const form = select.form;
    const source = select.parentElement.querySelector('[data-selling-plan-variants]');
    if (!form || !source) return;
    if (!sources.has(source)) {
      try {
        const data = JSON.parse(source.textContent);
        sources.set(source, Array.isArray(data) ? data : null);
      } catch { sources.set(source, null); }
    }
    const variants = sources.get(source);
    if (!variants) {
      select.setCustomValidity('Purchase options are unavailable. Please reload the page.');
      return;
    }
    const variantId = form.elements.namedItem('id')?.value || '';
    const variant = variants.find(item => item && String(item.id) === variantId);
    const ids = (Array.isArray(variant?.selling_plan_allocations) ? variant.selling_plan_allocations : [])
      .map(allocation => String(allocation?.selling_plan?.id));
    const previous = select.value;
    for (const option of select.options) {
      option.disabled = option.value !== '' && !ids.includes(option.value);
      option.hidden = option.disabled;
    }
    if (![...select.options].some(option => option.value === previous && !option.disabled)) {
      select.value = [...select.options].find(option => !option.disabled)?.value || '';
    }
    select.setCustomValidity(select.required && !select.value ? 'Choose an available purchase option.' : '');
    const signature = `${variantId}:${select.value}`;
    if (selections.get(select) !== signature) {
      selections.set(select, signature);
      select.dispatchEvent(new CustomEvent('qtm:selling-plan-change', { bubbles: true }));
    }
  }
  window.qtmSellingPlans = { update };
  function each(scope, callback) {
    if (scope.matches?.(selector)) callback(scope);
    scope.querySelectorAll(selector).forEach(callback);
  }
  function boot(scope = document) { each(scope, select => { retired.delete(select); update(select); }); }
  document.addEventListener('submit', event => {
    if (!event.target.matches('form')) return;
    for (const select of event.target.querySelectorAll(selector)) {
      update(select);
      if (!select.checkValidity()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        select.reportValidity();
        break;
      }
    }
  }, true);
  document.addEventListener('change', event => {
    if (event.target.form) each(event.target.form, update);
  });
  document.addEventListener('qtm:variant-restored', event => {
    if (event.target.form) each(event.target.form, update);
  });
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => {
    each(event.target, select => {
      const source = select.parentElement.querySelector('[data-selling-plan-variants]');
      if (source) sources.delete(source);
      selections.delete(select);
      retired.add(select);
    });
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  else boot();
})();
