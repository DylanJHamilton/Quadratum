/* One purchase state per product builder instance; native forms remain the mutation owner. */
(() => {
  if (window.qtmProductBlockCommerce) return;
  const selector = '[data-qtm-product-block-commerce]';
  const instances = new Map();
  const states = new Set();
  const scopeOf = root => root.closest('.qtm-product-block-section, .shopify-section') || root;
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const number = (value, fallback) => Number.isInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;
  function rules(state) {
    const rule = state.variant?.quantity_rule || {};
    const base = number(rule.min, 1), step = number(rule.increment, 1);
    let min = base, max = number(rule.max, Infinity);
    for (const root of state.roots) {
      min = Math.max(min, number(root.dataset.minQuantity, 1));
      max = Math.min(max, number(root.dataset.maxQuantity, Infinity));
    }
    min = base + Math.ceil((min - base) / step) * step;
    if (Number.isFinite(max)) max = base + Math.floor((max - base) / step) * step;
    return { min, max, step };
  }
  function normalize(state, value) {
    const { min, max, step } = rules(state);
    const parsed = Number(value);
    return Math.max(min, Math.min(max, min + Math.floor((Number.isFinite(parsed) ? Math.max(min, parsed) - min : 0) / step) * step));
  }
  function allocation(state) { return state.variant?.allocations.find(item => String(item.id) === state.plan); }
  function available(state) { const r = rules(state); return Boolean(state.variant?.available && (!state.required || allocation(state)) && (!state.plan || allocation(state)) && r.max >= r.min); }
  function price(root, state) {
    const current = allocation(state) || state.variant;
    const onSale = Boolean(current && current.compare_at_price > current.price);
    root.querySelectorAll('[data-product-price-current],[data-product-sticky-price]').forEach(node => { node.textContent = current?.money || root.dataset.unavailableLabel; });
    root.querySelectorAll('[data-product-price-compare],[data-product-sticky-compare-price]').forEach(node => { node.textContent = onSale ? current.compareMoney : ''; node.hidden = !onSale; });
    const badge = root.querySelector('[data-product-price-badge]');
    if (badge) {
      badge.hidden = !onSale;
      if (onSale) {
        const savings = current.compare_at_price - current.price;
        badge.textContent = root.dataset.savingsDisplay === 'amount' ? `${root.dataset.salePrefix} ${current.savingsMoney}` : root.dataset.savingsDisplay === 'percentage' ? `${root.dataset.salePrefix} ${Math.floor(savings * 100 / current.compare_at_price)}%` : root.dataset.saleLabel;
      }
    }
    const unit = root.querySelector('[data-product-price-unit]');
    if (unit) { unit.hidden = !current?.unit; unit.textContent = current?.unit || ''; }
    if (root.hasAttribute('data-product-price')) root.classList.toggle('product-price--on-sale', onSale);
  }
  function draw(state) {
    if (state.drawing) return;
    state.drawing = true;
    try {
      const variant = state.variant, rule = rules(state), canPurchase = available(state);
      for (const root of state.roots) {
        root.dataset.variantId = variant ? String(variant.id) : '';
        for (const input of root.querySelectorAll('[data-b8-variant-id]')) input.value = variant ? String(variant.id) : '';
        for (const input of root.querySelectorAll('[data-b8-option-select]')) if (variant) input.value = variant.options[Number(input.dataset.optionPosition) - 1];
        for (const group of root.querySelectorAll('[data-product-variant-option]')) {
          const input = group.querySelector('select'), value = input?.value || '';
          const selected = group.querySelector('[data-product-variant-selected-value]'); if (selected) selected.textContent = value;
          for (const button of group.querySelectorAll('[data-product-variant-value]')) {
            const active = button.dataset.optionValue === value;
            const position = Number(button.dataset.optionPosition) - 1;
            const choices = [...root.querySelectorAll('[data-b8-option-select]')].map(node => node.value);
            choices[position] = button.dataset.optionValue;
            const matches = state.variants.filter(item => choices.every((choice, index) => item.options[index] === choice));
            button.classList.toggle('is-active', active);
            button.classList.toggle('is-unavailable', !matches.some(item => item.available));
            button.setAttribute('aria-pressed', String(active));
            // A temporarily unavailable combination must not trap navigation to another option.
            button.disabled = false;
          }
        }
        for (const input of root.querySelectorAll('[name="quantity"]')) {
          input.disabled = false;
          input.min = String(rule.min); input.step = String(rule.step);
          if (Number.isFinite(rule.max)) input.max = String(rule.max); else input.removeAttribute('max');
          input.value = String(state.quantity);
          input.setCustomValidity(rule.max < rule.min ? 'No quantity is available for this selection.' : '');
        }
        root.querySelectorAll('[data-b8-minus]').forEach(button => { button.disabled = state.quantity <= rule.min; });
        root.querySelectorAll('[data-b8-plus]').forEach(button => { button.disabled = state.quantity >= rule.max; });
        for (const plan of root.querySelectorAll('[name="selling_plan"]')) {
          if (plan.matches('select')) {
            const ids = variant?.allocations.map(item => String(item.id)) || [];
            for (const option of plan.options) { option.disabled = option.value !== '' && !ids.includes(option.value); option.hidden = option.disabled; }
          }
          plan.value = state.plan;
          plan.setCustomValidity(state.required && !allocation(state) ? 'Choose an available purchase option.' : '');
        }
        root.querySelectorAll('[data-b8-submit]').forEach(button => {
          button.disabled = !canPurchase;
          button.textContent = canPurchase ? root.dataset.addLabel : variant && !variant.available ? root.dataset.soldLabel : root.dataset.unavailableLabel;
        });
        root.querySelectorAll('[data-b8-payment]').forEach(node => { node.hidden = !canPurchase; node.inert = !canPurchase; });
        const status = root.querySelector('[data-product-variant-status]');
        if (status) status.textContent = !variant ? root.dataset.unavailableLabel : variant.available ? root.dataset.availableLabel : root.dataset.soldLabel;
        const unavailable = root.querySelector('[data-product-dynamic-checkout-unavailable]'); if (unavailable) unavailable.hidden = canPurchase;
        if (root.hasAttribute('data-product-dynamic-checkout')) root.classList.toggle('product-dynamic-checkout--unavailable', !canPurchase);
        const title = root.querySelector('[data-product-sticky-variant-label]'); if (title) { title.textContent = variant?.title || ''; title.hidden = !variant || variant.title === 'Default Title'; }
        const image = root.querySelector('.product-sticky-add-to-cart__image');
        if (image) {
          image.hidden = !variant?.image;
          if (variant?.image) { image.src = variant.image.src; image.removeAttribute('srcset'); image.alt = variant.image.alt; }
        }
        price(root, state);
      }
    } finally { state.drawing = false; }
  }
  function publish(state, origin, type = 'variant') {
    state.publishing = true;
    try {
      const detail = { productId: state.productId, variantId: state.variant?.id ?? null, variant: state.variant, quantity: state.quantity, sellingPlan: state.plan };
      for (const name of type === 'variant' ? ['variant:change', 'qtm:variant:change'] : ['quantity:change', 'qtm:quantity:change']) origin.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
    } finally { state.publishing = false; }
  }
  function ownsURL(state) {
    if (window.Shopify?.designMode || [...states].filter(item => item.productId === state.productId).length !== 1) return false;
    try {
      const target = new URL(state.roots.values().next().value.dataset.productUrl, location.href);
      const path = target.pathname.slice(target.pathname.lastIndexOf('/products/'));
      return target.origin === location.origin && path.startsWith('/products/') && location.pathname.endsWith(path);
    } catch (_) { return false; }
  }
  function updateURL(state) {
    if (!ownsURL(state)) return;
    const url = new URL(location.href);
    if (state.variant) url.searchParams.set('variant', state.variant.id); else url.searchParams.delete('variant');
    if (state.variant && state.plan) url.searchParams.set('selling_plan', state.plan); else url.searchParams.delete('selling_plan');
    if (url.href !== location.href) history.pushState(history.state, '', url);
  }
  function setVariant(state, variant, origin, emit = true) {
    state.variant = variant || null;
    if (!allocation(state)) state.plan = state.required && variant?.allocations.length ? String(variant.allocations[0].id) : '';
    state.quantity = normalize(state, state.quantity);
    draw(state);
    if (emit) publish(state, origin);
  }
  function ownsEvent(state, event) {
    const detail = event.detail || {};
    if (detail.productId != null && String(detail.productId) !== state.productId) return false;
    if (event.target instanceof Element) return scopeOf(event.target) === state.scope;
    if (detail.sectionId != null) return [String(detail.sectionId), 'shopify-section-' + detail.sectionId, 'qtm-product-block-section-' + detail.sectionId].includes(state.scope.id);
    return [...states].filter(item => item.productId === state.productId).length === 1;
  }
  function init(root) {
    if (instances.has(root)) return;
    let variants;
    try { variants = JSON.parse(root.querySelector('[data-qtm-product-block-variants]')?.textContent || 'null'); } catch (_) { return; }
    if (!Array.isArray(variants) || !variants.length || variants.some(item => !item || item.id == null || !Array.isArray(item.options) || !Array.isArray(item.allocations))) return;
    const scope = scopeOf(root), productId = root.dataset.productId;
    let state = [...states].find(item => item.scope === scope && item.productId === productId);
    if (!state) {
      const variant = variants.find(item => String(item.id) === root.dataset.variantId);
      if (!variant) return;
      state = { initialId: variant.id, scope, productId, variants, variant, roots: new Set(), quantity: number(root.querySelector('[name="quantity"]')?.value, number(variant.quantity_rule?.min, 1)), plan: root.dataset.initialPlan || '', required: root.dataset.requiresPlan === 'true', abort: new AbortController() };
      states.add(state);
      for (const name of ['variant:change', 'qtm:variant:change', 'product:variant-change']) document.addEventListener(name, event => {
        if (state.publishing || !ownsEvent(state, event)) return;
        const detail = event.detail || {}, id = detail.variant?.id ?? detail.variantId ?? detail.variant_id ?? detail.id;
        const next = state.variants.find(item => String(item.id) === String(id));
        if (next || detail.variant === null) setVariant(state, next, state.roots.values().next().value, false);
      }, { signal: state.abort.signal });
    }
    if (!state.interacted && !state.quantityOwner && ['quantity-selector', 'add-to-cart'].includes(root.dataset.qtmProductBlockCommerce)) {
      state.quantity = number(root.querySelector('[name="quantity"]')?.value, state.quantity);
      state.quantityOwner = true;
    }
    state.roots.add(root);
    const abort = new AbortController();
    const on = (node, name, callback, options = {}) => node.addEventListener(name, callback, { ...options, signal: abort.signal });
    const form = root.querySelector('form');
    if (form) {
      form.dataset.cartAddingMessage = root.dataset.cartAddingMessage;
      form.dataset.cartAddedMessage = root.dataset.cartAddedMessage;
      on(form, 'submit', event => {
        const rule = rules(state), quantity = Number(form.elements.namedItem('quantity')?.value || 1);
        const validQuantity = Number.isInteger(quantity) && quantity >= rule.min && quantity <= rule.max && (quantity - rule.min) % rule.step === 0;
        if (!available(state) || !validQuantity || !form.checkValidity()) {
          event.preventDefault(); event.stopImmediatePropagation();
          const message = form.querySelector('[data-cart-add-status]'); if (message) message.textContent = root.dataset.unavailableLabel;
          form.reportValidity();
        }
      }, { capture: true });
    }
    on(root, 'change', event => {
      if (state.drawing) return;
      const input = event.target;
      state.interacted = true;
      if (input.matches('[data-b8-option-select]')) {
        const choices = [...root.querySelectorAll('[data-b8-option-select]')].map(node => node.value);
        setVariant(state, state.variants.find(item => choices.length === item.options.length && choices.every((value, index) => item.options[index] === value)), root);
      } else if (input.matches('[data-b8-variant-id]')) setVariant(state, state.variants.find(item => String(item.id) === input.value), root);
      else if (input.name === 'quantity') { state.quantity = normalize(state, input.value); draw(state); publish(state, root, 'quantity'); }
      else if (input.name === 'selling_plan') { state.plan = input.value; draw(state); publish(state, root); }
      if (input.matches('[data-b8-option-select],[data-b8-variant-id],[name="selling_plan"]')) updateURL(state);
    });
    on(root, 'click', event => {
      const button = event.target.closest('button'); if (!button || button.disabled) return;
      state.interacted = true;
      if (button.matches('[data-product-variant-value]')) {
        const input = button.closest('[data-product-variant-option]')?.querySelector('select');
        if (input) { input.value = button.dataset.optionValue; input.dispatchEvent(new Event('change', { bubbles: true })); }
      } else if (button.matches('[data-b8-minus],[data-b8-plus]')) {
        state.quantity = normalize(state, state.quantity + (button.hasAttribute('data-b8-minus') ? -1 : 1) * rules(state).step);
        draw(state); publish(state, root, 'quantity');
      }
    });
    root.querySelectorAll('[data-b8-option-controls]').forEach(node => { node.hidden = false; });
    root.querySelectorAll('[data-b8-variant-links]').forEach(node => { node.hidden = true; });
    const cleanup = () => {
      abort.abort(); state.roots.delete(root);
      if (!state.roots.size) { state.abort.abort(); states.delete(state); }
    };
    instances.set(root, cleanup);
    setVariant(state, state.variant, root, false);
  }
  function reconcile() {
    for (const state of states) {
      const hasPicker = [...state.roots].some(root => root.querySelector('[data-b8-option-select]'));
      for (const root of state.roots) root.querySelectorAll('[data-b8-fallback]').forEach(node => { node.hidden = hasPicker || state.variants.length === 1; });
      state.quantity = normalize(state, state.quantity); draw(state);
    }
  }
  const boot = node => { roots(node).forEach(init); reconcile(); };
  const dispose = node => { roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); }); reconcile(); };
  window.qtmProductBlockCommerce = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  window.addEventListener('popstate', () => {
    for (const state of states) {
      if (!ownsURL(state)) continue;
      const url = new URL(location.href), id = url.searchParams.get('variant') || String(state.initialId);
      const variant = state.variants.find(item => String(item.id) === id);
      state.plan = url.searchParams.get('selling_plan') || '';
      setVariant(state, variant, state.roots.values().next().value);
    }
  });
  const start = () => {
    boot(document);
    if ('MutationObserver' in window && document.body) new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (!node.isConnected && roots(node).length) dispose(node);
        for (const node of record.addedNodes) if (roots(node).length) boot(node);
      }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
