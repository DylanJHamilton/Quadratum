(() => {
  if (window.qtmProductPurchaseSync) return;
  window.qtmProductPurchaseSync = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const wrapper = root.closest('.shopify-section') || root.parentElement;
    const source = wrapper.querySelector('[data-product-purchase-data]');
    const form = root.querySelector('form[action*="/cart/add"]');
    const selector = form?.querySelector('[name="id"]');
    if (!source || !selector) return;
    let variants;
    try { variants = JSON.parse(source.textContent); } catch { return; }
    const initialId = selector.value;
    function update(updateURL = false) {
      const variant = variants.find(item => String(item.id) === selector.value);
      if (!variant) return;
      const current = root.querySelector('[data-purchase-current]');
      const compare = root.querySelector('[data-purchase-compare]');
      if (current) current.textContent = variant.price;
      if (compare) { compare.textContent = variant.compare; compare.hidden = !variant.onSale; }
      const sale = root.querySelector('[data-purchase-sale]');
      if (sale) { sale.hidden = !variant.onSale; sale.textContent = 'Sale'; }
      const availability = root.querySelector('[data-purchase-availability]');
      if (availability) {
        availability.textContent = variant.available ? 'In stock' : 'Sold out';
        availability.classList.toggle('q-badge--in', variant.available);
        availability.classList.toggle('q-badge--out', !variant.available);
      }
      const sku = root.querySelector('.q-sku');
      if (sku) { sku.textContent = `SKU: ${variant.sku || ''}`; sku.hidden = !variant.sku; }
      const button = form.querySelector('[name="add"]');
      if (button) { button.disabled = !variant.available; button.textContent = variant.available ? 'Add to cart' : 'Sold out'; }
      const checkout = root.querySelector('.q-dynamic-checkout');
      if (checkout) checkout.hidden = !variant.available;
      if (updateURL) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', selector.value);
        if (url.href !== window.location.href) window.history.pushState({}, '', url);
      }
    }
    selector.addEventListener('change', () => update(true));
    instances.set(root, { selector, initialId, update });
    update();
  }
  function boot(scope = document) { scope.querySelectorAll('[data-product-purchase-sync]').forEach(init); }
  window.addEventListener('popstate', () => {
    document.querySelectorAll('[data-product-purchase-sync]').forEach(root => {
      const instance = instances.get(root);
      if (!instance) return;
      instance.selector.value = new URL(location.href).searchParams.get('variant') || instance.initialId;
      instance.update();
      instance.selector.dispatchEvent(new CustomEvent('qtm:variant-restored', { bubbles: true }));
    });
  });
  document.addEventListener('shopify:section:load', event => boot(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot());
  else boot();
})();
