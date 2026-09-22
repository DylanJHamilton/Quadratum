/* Native Theme Block bundle forms. The shared cart drawer owns submission and real cart refresh. */
(() => {
  if (window.qtmBlockBundles) return;
  const selector = '[data-qtm-block-bundle]', instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const scopeOf = node => node.closest('.qtm-product-block-section, .shopify-section') || node;
  const parse = (text, fallback) => { try { return JSON.parse(text); } catch { return fallback; } };
  function init(root) {
    if (instances.has(root)) return;
    const form = root.querySelector('[data-bundle-form]'), submit = form?.querySelector('[data-bundle-submit]');
    if (!form || !submit) return;
    const abort = new AbortController(), scope = scopeOf(root);
    const on = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: abort.signal });
    const variants = parse(root.querySelector('[data-qtm-product-block-variants]')?.textContent, []);
    const items = [...form.querySelectorAll('[data-bundle-item]')].map(node => ({ node, variant: parse(node.dataset.itemRecord, null), plan: node.dataset.initialPlan || '', initialPlanName: node.dataset.initialPlanName || '', choice: null, quantity: null, renderedVariant: parse(node.dataset.itemRecord, null)?.id }));
    const current = items.find(item => item.node.dataset.currentItem === 'true');
    const money = cents => {
      const format = root.dataset.moneyFormat || '', currency = root.dataset.currency || root.dataset.baseCurrency;
      const token = format.match(/\{\{\s*(amount(?:_\w+)?)\s*\}\}/);
      if (currency === root.dataset.baseCurrency && token) {
        const style = token[1], decimals = style.includes('no_decimals') ? 0 : 2;
        const group = style.includes('space') ? ' ' : style.includes('comma_separator') ? '.' : style.includes('apostrophe') ? "'" : ',';
        const separator = style.includes('comma_separator') || style === 'amount_with_space_separator' ? ',' : '.';
        const parts = (cents / 100).toFixed(decimals).split('.'); parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, group);
        return format.replace(token[0], parts.join(separator));
      }
      try { return new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency }).format(cents / 100); }
      catch { return ''; } // No invented currency when native context is unavailable.
    };
    function purchase(item) {
      const v = item.variant, rule = v?.quantity_rule || {}, min = Math.max(1, Number(rule.min) || 1), step = Math.max(1, Number(rule.increment) || 1);
      const max = rule.max == null ? Infinity : Number(rule.max), quantity = item.quantity ?? min;
      const allocation = item.plan ? v?.allocations?.find(plan => String(plan.id) === String(item.plan)) : null;
      const needsPlan = item.node.dataset.requiresPlan === 'true';
      const planValid = item.plan ? !!allocation : !needsPlan;
      const quantityValid = Number.isInteger(quantity) && quantity >= min && quantity <= max && (quantity - min) % step === 0;
      const price = allocation?.price ?? v?.price, compare = Math.max(allocation?.compare_at_price ?? v?.compare_at_price ?? price, price);
      const valid = !!v?.available && /^\d+$/.test(String(v.id)) && planValid && quantityValid && Number.isFinite(price);
      return { valid, quantity, allocation, planValid, price, compare, included: valid && item.choice !== false };
    }
    function draw() {
      let total = 0, compare = 0, selected = 0, index = 0;
      for (const item of items) {
        const state = purchase(item), node = item.node, checkbox = node.querySelector('[data-bundle-select]');
        if (checkbox) { checkbox.disabled = !state.valid; checkbox.checked = state.included; }
        node.dataset.available = String(state.valid);
        const id = node.querySelector('[data-bundle-id]'), quantity = node.querySelector('[data-bundle-quantity]'), plan = node.querySelector('[data-bundle-plan]');
        id.value = item.variant?.id ?? ''; quantity.value = String(state.quantity); plan.value = state.allocation?.id ?? '';
        id.disabled = quantity.disabled = !state.included; plan.disabled = !state.included || !state.allocation;
        // Selected lines remain a contiguous native array after an item is deselected.
        for (const [input, key] of [[id, 'id'], [quantity, 'quantity'], [plan, 'selling_plan']]) input.name = `items[${index}][${key}]`;
        if (state.included) { index += 1; selected += 1; total += state.price * state.quantity; compare += state.compare * state.quantity; }
        const title = node.querySelector('[data-bundle-variant-title]'); title.textContent = item.variant?.title || ''; title.hidden = !title.textContent || title.textContent === 'Default Title';
        const planName = node.querySelector('[data-bundle-plan-name]'); planName.textContent = state.allocation?.name || (String(state.allocation?.id) === node.dataset.initialPlan ? item.initialPlanName : ''); planName.hidden = !planName.textContent;
        node.querySelector('[data-bundle-quantity-value]').textContent = String(state.quantity);
        const row = node.querySelector('[data-bundle-price-row]'); if (row) row.hidden = !item.variant;
        const price = node.querySelector('[data-bundle-price]'); if (price && item.variant) price.textContent = money(state.price * state.quantity);
        const compareNode = node.querySelector('[data-bundle-compare]'); if (compareNode) { compareNode.hidden = !item.variant || state.compare <= state.price; compareNode.textContent = item.variant ? money(state.compare * state.quantity) : ''; }
        const unavailable = node.querySelector('[data-bundle-unavailable]'); unavailable.hidden = state.valid; unavailable.textContent = !state.planValid ? root.dataset.optionsRequired : root.dataset.itemUnavailable;
        const image = node.querySelector('img'), nativeImage = item.variant?.image;
        if (image && nativeImage && item.renderedVariant !== item.variant.id) { image.src = nativeImage.src; image.removeAttribute('srcset'); image.removeAttribute('sizes'); image.alt = nativeImage.alt || ''; image.width = nativeImage.width || 180; image.height = nativeImage.height || 180; }
        item.renderedVariant = item.variant?.id;
      }
      const totalNode = form.querySelector('[data-bundle-total]'); if (totalNode) totalNode.textContent = money(total);
      const compareNode = form.querySelector('[data-bundle-compare-total]'); if (compareNode) compareNode.textContent = money(compare);
      const compareRow = form.querySelector('[data-bundle-compare-row]'); if (compareRow) compareRow.hidden = compare <= total;
      const savings = form.querySelector('[data-bundle-savings]'); if (savings) { savings.hidden = compare <= total; savings.textContent = (savings.dataset.prefix || '') + ' ' + money(compare - total); }
      submit.disabled = selected === 0;
      if (submit.dataset.availableLabel) submit.textContent = selected ? submit.dataset.availableLabel : submit.dataset.unavailableLabel;
      return selected;
    }
    const ownedForm = node => {
      const candidate = node.closest?.('form');
      if (!candidate || candidate === form || scopeOf(candidate) !== scope) return null;
      const owner = candidate.closest('[data-product-id]');
      return !owner || owner.dataset.productId === root.dataset.productId ? candidate : null;
    };
    const nativeForm = () => [...scope.querySelectorAll('form [name="id"]')].map(ownedForm).find(Boolean);
    function sync(id, source, detail = {}, strict = false) {
      if (!current) return;
      const variant = variants.find(v => String(v.id) === String(id));
      if (id && !variant && !strict) return;
      current.variant = variant || null;
      const sourceForm = source || nativeForm();
      current.plan = detail.sellingPlan != null ? String(detail.sellingPlan) : (sourceForm?.elements.namedItem('selling_plan')?.value ?? current.plan);
      const quantity = detail.quantity ?? sourceForm?.elements.namedItem('quantity')?.value;
      current.quantity = quantity == null ? null : Number(quantity);
      root.dataset.variantId = current.variant?.id ?? ''; draw();
    }
    on(form, 'change', event => {
      const checkbox = event.target.closest('[data-bundle-select]');
      if (checkbox) { items.find(item => item.node.contains(checkbox)).choice = checkbox.checked; draw(); }
    });
    on(form, 'submit', event => {
      if (!draw()) { event.preventDefault(); const status = form.querySelector('[data-cart-add-status]'); if (status) status.textContent = form.dataset.emptyMessage || 'Select an available item.'; }
    });
    on(scope, 'change', event => {
      if (!current || !event.target.matches?.('[name="id"], [name="selling_plan"], [name="quantity"]')) return;
      const source = ownedForm(event.target); if (!source) return;
      if (['radio', 'checkbox'].includes(event.target.type) && !event.target.checked) return;
      sync(source.elements.namedItem('id')?.value, source, {}, true);
    });
    const handle = event => {
      if (!current) return;
      const detail = event.detail || {};
      if (detail.productId != null && String(detail.productId) !== root.dataset.productId) return;
      const target = event.target instanceof Element ? event.target : null, owner = target?.closest('[data-product-id]');
      if (owner && owner.dataset.productId !== root.dataset.productId) return;
      if (target && scopeOf(target) !== scope) return;
      if (!target) {
        if (detail.sectionId != null) { if (![String(detail.sectionId), 'shopify-section-' + detail.sectionId, 'qtm-product-block-section-' + detail.sectionId].includes(scope.id)) return; }
        else if (new Set([...document.querySelectorAll(selector)].filter(n => n.dataset.productId === root.dataset.productId).map(scopeOf)).size !== 1) return;
      }
      const id = detail.variant?.id ?? detail.variantId ?? detail.variant_id ?? detail.id;
      if (id != null || detail.variant === null) sync(id, null, detail);
    };
    for (const name of ['variant:change', 'qtm:variant:change', 'product:variant-change', 'quantity:change', 'qtm:quantity:change']) on(document, name, handle);
    on(scope, 'qtm:variant-restored', event => { const source = ownedForm(event.target); if (source) sync(source.elements.namedItem('id')?.value, source, {}, true); });
    root.setAttribute('data-bundle-ready', '');
    for (const label of form.querySelectorAll('[data-bundle-select-label]')) label.hidden = false;
    instances.set(root, () => { abort.abort(); root.removeAttribute('data-bundle-ready'); for (const label of form.querySelectorAll('[data-bundle-select-label]')) label.hidden = true; });
    const source = current && nativeForm(); if (source) sync(source.elements.namedItem('id')?.value, source, {}, true); else draw();
  }
  const boot = node => roots(node).forEach(init), dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmBlockBundles = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  const start = () => { boot(document); if ('MutationObserver' in window && document.body) new MutationObserver(records => { for (const record of records) { for (const node of record.removedNodes) if (!node.isConnected) dispose(node); for (const node of record.addedNodes) boot(node); } }).observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
