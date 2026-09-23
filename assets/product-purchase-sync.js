(() => {
  if (window.qtmProductPurchaseSync) return;
  window.qtmProductPurchaseSync = true;
  const instances = new WeakMap();
  const rootSelector = '[data-product-purchase-sync]';
  function each(scope, callback) {
    if (scope.matches?.(rootSelector)) callback(scope);
    scope.querySelectorAll(rootSelector).forEach(callback);
  }
  function init(root) {
    if (instances.has(root)) return;
    let source = root.querySelector('[data-product-purchase-data]');
    // Retained single-host markup may place its data immediately after the root.
    if (!source && root.nextElementSibling?.matches('[data-product-purchase-data]')) source = root.nextElementSibling;
    const form = root.querySelector('form[action*="/cart/add"]');
    const selector = form?.querySelector('[name="id"]');
    if (!source || !selector) return;
    let variants;
    try { variants = JSON.parse(source.textContent); } catch { return; }
    if (!Array.isArray(variants) || !variants.length || variants.some(item => !item || item.id == null)) return;
    const controller = new AbortController();
    const listen = (target, type, callback, extra = {}) => target.addEventListener(type, callback, { ...extra, signal: controller.signal });
    const initialId = selector.value;
    const plan = form.querySelector('[data-product-form-selling-plan]');
    const quantity = form.querySelector('[name="quantity"]');
    const options = Array.from(form.querySelectorAll('[data-purchase-option]'));
    const canEnhance = options.length > 0 && variants.every(item => Array.isArray(item.options) && item.options.length === options.length);
    let previousVariantId;
    function selectedVariant() { return variants.find(item => String(item.id) === selector.value); }
    function ownsURL() {
      if (root.dataset.purchaseUrl === 'false') return false;
      const page = new URL(window.location.href);
      if (!root.dataset.productUrl) return /\/products\//.test(page.pathname);
      try {
        const productURL = new URL(root.dataset.productUrl, page);
        const suffix = productURL.pathname.slice(productURL.pathname.lastIndexOf('/products/'));
        return productURL.origin === page.origin && suffix.startsWith('/products/') && page.pathname.endsWith(suffix);
      } catch { return false; }
    }
    function syncPlan() { if (plan) window.qtmSellingPlans?.update(plan); }
    function purchaseState() {
      const variant = selectedVariant();
      const allocation = (Array.isArray(variant?.allocations) ? variant.allocations : []).find(item => item && String(item.id ?? item.selling_plan?.id) === plan?.value);
      const required = plan?.required || source.dataset.requiresSellingPlan === 'true';
      const validPlan = (!required && !plan?.value) || Boolean(allocation);
      return { variant, allocation, available: Boolean(variant?.available && validPlan && (!plan || plan.validity.valid)) };
    }
    function quantityRules(variant) {
      const positive = (value, fallback) => Number.isInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;
      const rule = variant?.quantityRule || {};
      return { min: positive(rule.min, 1), max: positive(rule.max, null), step: positive(rule.increment, 1) };
    }
    function updateQuantity(variant) {
      if (!quantity || !variant || previousVariantId === variant.id) return;
      const { min, max, step } = quantityRules(variant);
      quantity.min = String(min);
      quantity.step = String(step);
      if (max !== null) quantity.max = String(max); else quantity.removeAttribute('max');
      const value = Number(quantity.value);
      if (!Number.isInteger(value) || value < min || (max !== null && value > max) || (value - min) % step !== 0) quantity.value = String(min);
    }
    function quantityValid(variant) {
      const { min, max, step } = quantityRules(variant);
      const value = quantity ? Number(quantity.value) : 1;
      return Number.isInteger(value) && value >= min && (max === null || value <= max) && (value - min) % step === 0;
    }
    function draw() {
      const state = purchaseState();
      const variant = state.variant;
      const price = state.allocation || variant || { price: 'Unavailable', compare: '', onSale: false };
      if (variant && canEnhance) options.forEach((option, index) => { option.value = variant.options[index]; });
      root.querySelectorAll('[data-purchase-current]').forEach(node => { node.textContent = price.price; });
      root.querySelectorAll('[data-purchase-compare]').forEach(node => { node.textContent = price.compare || ''; node.hidden = !price.onSale; });
      root.querySelectorAll('[data-purchase-sale]').forEach(node => { node.hidden = !price.onSale; node.textContent = price.saleLabel || 'Sale'; });
      root.querySelectorAll('[data-purchase-availability]').forEach(node => {
        node.textContent = variant ? (variant.available ? 'In stock' : 'Sold out') : 'Unavailable';
        node.classList.toggle('q-badge--in', Boolean(variant?.available));
        node.classList.toggle('q-badge--out', !variant?.available);
      });
      root.querySelectorAll('.q-sku').forEach(node => { node.textContent = `SKU: ${variant?.sku || ''}`; node.hidden = !variant?.sku; });
      root.querySelectorAll('[data-purchase-sku]').forEach(node => { node.textContent = variant?.sku || ''; });
      root.querySelectorAll('[data-purchase-sku-wrap]').forEach(node => { node.hidden = !variant?.sku; });
      form.querySelectorAll('[name="add"]').forEach(button => {
        button.disabled = !state.available;
        button.textContent = state.available ? 'Add to cart' : (variant && !variant.available ? 'Sold out' : 'Unavailable');
      });
      root.querySelectorAll('.q-dynamic-checkout').forEach(node => { node.hidden = !state.available; });
      const status = root.querySelector('[data-purchase-status]');
      if (status) status.textContent = !variant ? 'Choose an available combination.' : (!state.available && variant.available ? 'No purchase option is available for this variant.' : '');
      updateQuantity(variant);
      if (variant && previousVariantId !== variant.id && Object.prototype.hasOwnProperty.call(variant, 'image')) {
        const image = root.querySelector('[data-purchase-image]');
        const placeholder = root.querySelector('[data-purchase-image-placeholder]');
        if (image) {
          image.hidden = !variant.image;
          if (variant.image) {
            image.src = variant.image.src;
            image.srcset = variant.image.srcset || '';
            image.alt = variant.image.alt || '';
            image.width = variant.image.width;
            image.height = variant.image.height;
          } else { image.removeAttribute('src'); image.removeAttribute('srcset'); }
        }
        if (placeholder) placeholder.hidden = Boolean(variant.image);
      }
      previousVariantId = variant?.id;
    }
    function update(updateURL = false) {
      syncPlan();
      draw();
      if (updateURL && ownsURL()) {
        const url = new URL(window.location.href);
        const matched = selectedVariant();
        if (matched) url.searchParams.set('variant', selector.value); else url.searchParams.delete('variant');
        if (plan) {
          if (matched && plan.value) url.searchParams.set('selling_plan', plan.value);
          else url.searchParams.delete('selling_plan');
        }
        if (url.href !== window.location.href) window.history.pushState(window.history.state, '', url);
      }
    }
    function resolveOptions() {
      const match = variants.find(item => options.every((option, index) => option.value === item.options[index]));
      selector.value = match ? String(match.id) : '';
      selector.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (canEnhance) {
      options.forEach(option => listen(option, 'change', resolveOptions));
      const fallback = form.querySelector('[data-purchase-fallback]');
      if (fallback) fallback.hidden = true;
      form.querySelectorAll('[data-purchase-options]').forEach(group => { group.hidden = false; });
    }
    listen(selector, 'change', () => update(true));
    listen(form, 'change', event => { if (event.target === plan) update(true); });
    listen(form, 'qtm:selling-plan-change', draw);
    listen(form, 'submit', event => {
      if (canEnhance) resolveOptions(); else update();
      const state = purchaseState();
      if (!state.available || !quantityValid(state.variant) || !form.checkValidity()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        form.reportValidity();
      }
    }, { capture: true });
    function restore() {
      if (!ownsURL()) return;
      const url = new URL(window.location.href);
      const id = url.searchParams.get('variant') || initialId;
      if (!variants.some(item => String(item.id) === id)) return;
      selector.value = id;
      // Enable this variant's plans before restoring its URL selection.
      syncPlan();
      if (plan) {
        const value = url.searchParams.get('selling_plan') || '';
        if ([...plan.options].some(option => option.value === value && !option.disabled)) plan.value = value;
      }
      update();
      selector.dispatchEvent(new CustomEvent('qtm:variant-restored', { bubbles: true }));
    }
    instances.set(root, { restore, dispose: () => controller.abort() });
    update();
  }
  function boot(scope = document) { each(scope, init); }
  window.addEventListener('popstate', () => each(document, root => instances.get(root)?.restore()));
  document.addEventListener('shopify:section:load', event => boot(event.target));
  function dispose(scope) { each(scope, root => {
    instances.get(root)?.dispose();
    instances.delete(root);
  }); }
  window.qtmProductPurchaseSync = { boot, dispose };
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  else boot();
})();
