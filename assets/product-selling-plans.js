(() => {
  if (window.qtmSellingPlansReady) return;
  window.qtmSellingPlansReady = true;
  function update(select) {
    const form = select.form;
    const source = select.parentElement.querySelector('[data-selling-plan-variants]');
    if (!form || !source) return;
    let variants;
    try { variants = JSON.parse(source.textContent); } catch { return; }
    const variant = variants.find(item => String(item.id) === form.elements.namedItem('id')?.value);
    if (!variant) return;
    const ids = variant.selling_plan_allocations.map(allocation => String(allocation.selling_plan.id));
    const previous = select.value;
    for (const option of select.options) {
      option.disabled = option.value !== '' && !ids.includes(option.value);
      option.hidden = option.disabled;
    }
    if (![...select.options].some(option => option.value === previous && !option.disabled)) {
      select.value = [...select.options].find(option => !option.disabled)?.value || '';
    }
    select.setCustomValidity(select.required && !select.value ? 'Choose an available purchase option.' : '');
  }
  function boot(scope = document) { scope.querySelectorAll('[data-product-form-selling-plan]').forEach(update); }
  document.addEventListener('submit', event => {
    for (const select of event.target.querySelectorAll('[data-product-form-selling-plan]')) {
      update(select);
      if (!select.checkValidity()) { event.preventDefault(); select.reportValidity(); }
    }
  }, true);
  document.addEventListener('change', event => {
    if (event.target.form) event.target.form.querySelectorAll('[data-product-form-selling-plan]').forEach(update);
  });
  document.addEventListener('shopify:section:load', event => boot(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot()); else boot();
})();
