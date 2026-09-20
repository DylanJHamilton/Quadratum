(() => {
  if (window.qtmVariantUIReady) return;
  window.qtmVariantUIReady = true;
  const instances = new WeakMap(), selector = '[data-product-variant-ui]';
  function each(scope, callback) { if (scope.matches?.(selector)) callback(scope); scope.querySelectorAll(selector).forEach(callback); }
  function init(root) {
    if (instances.has(root)) return;
    const form = root.closest('form'), select = form?.querySelector('[name="id"]');
    let variants;
    try { variants = JSON.parse(root.querySelector('[data-product-variants-json]').textContent); } catch { return; }
    const groups = [...root.querySelectorAll('[data-product-option-index]')];
    if (!select || !Array.isArray(variants) || !variants.length || !variants.every(v => v && Array.isArray(v.options) && v.options.length === groups.length)) return;
    const life = new AbortController();
    const on = (node, event, handler) => node.addEventListener(event, handler, { signal: life.signal });
    function apply(values) {
      groups.forEach((group, index) => {
        group.querySelectorAll('input[type="radio"]').forEach(input => {
          input.checked = input.value === values[index];
          input.closest('label').classList.toggle('is-selected', input.checked);
        });
        const dropdown = group.querySelector('select'); if (dropdown) dropdown.value = values[index];
        const label = group.querySelector('[data-product-selected-value]'); if (label) label.textContent = values[index] || '';
      });
    }
    function sync() { const variant = variants.find(v => String(v.id) === select.value); if (variant) apply(variant.options); }
    on(root, 'change', event => {
      if (!event.target.matches('input[type="radio"], [data-product-option-select]')) return;
      const values = groups.map(group => group.querySelector('select, input:checked')?.value || '');
      const variant = variants.find(v => v.options.every((value, index) => value === values[index]));
      select.value = variant ? String(variant.id) : '';
      apply(values); // Keep partial choices so sparse combinations remain reachable.
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    on(select, 'change', sync); on(select, 'qtm:variant-restored', sync);
    sync(); select.closest('.q-field')?.setAttribute('hidden', ''); root.hidden = false;
    instances.set(root, () => { life.abort(); root.hidden = true; select.closest('.q-field')?.removeAttribute('hidden'); });
  }
  document.addEventListener('shopify:section:load', e => each(e.target, init));
  document.addEventListener('shopify:section:unload', e => each(e.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
