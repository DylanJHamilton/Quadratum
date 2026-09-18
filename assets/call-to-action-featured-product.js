/**
 * Quadratum — CTA: Featured Product (scoped)
 * - Updates price/compare/savings/sku/stock on variant change
 * - Enables sticky CTA when variant selectable
 * - Emits analytics events
 * Keep it tiny and strictly scoped to [data-section-id]
 */
(() => {
  if (window.qtmFeaturedCtaBound) return;
  window.qtmFeaturedCtaBound = true;
  const instances = new WeakMap();
  function money(cents, locale, currency) {
    try { return (cents/100).toLocaleString(locale || undefined, { style:'currency', currency: currency || window.Shopify?.currency?.active || 'USD' }); }
    catch(_) { return (cents/100).toFixed(2); }
  }
  function findVariant(p, selected) {
    // selected is array of option values in order
    return (p.variants || []).find(v => v.options.every((ov,i)=> ov===selected[i]));
  }
  function init(root){
    if (!root || root.dataset.qCtaInit) return;


    const jsonEl = root.querySelector('[data-product-json]');
    const form = root.querySelector('form.q-form');
    if (!jsonEl || !form) return;

    let data;
    try { data = JSON.parse(jsonEl.textContent || '{}'); } catch { return; }
    if (!Array.isArray(data.variants)) return;
    const events = new AbortController();
    instances.set(root, events);
    root.dataset.qCtaInit = '1';
    const priceEl   = root.querySelector('[data-price]');
    const compareEl = root.querySelector('[data-compare]');
    const saveEl    = root.querySelector('[data-savings]');
    const skuEl     = root.querySelector('[data-sku]');
    const stockEl   = root.querySelector('[data-stock]');
    const varInput  = root.querySelector('[data-variant-input]');
    const sticky    = root.querySelector('[data-sticky]');
    const stickyPrice = root.querySelector('[data-sticky-price]');
    const stickyBtn = root.querySelector('[data-sticky-button]');

    function payload(extra={}){
      return Object.assign({
        product_id: data?.id,
        variant_id: varInput?.value ? Number(varInput.value) : null,
        price: priceEl?.textContent || null,
        page_handle: root.dataset.pageHandle || null
      }, extra);
    }

    // emit a view event
    root.dispatchEvent(new CustomEvent('quadratum.cta_featured_product.view', { bubbles:true, detail: payload() }));

    // Options: radio groups & selects
    const optionFields = Array.from(root.querySelectorAll('[data-options] [name]')).filter(field => /^options\[.+\]$/.test(field.name));
    function readSelection(){
      const groups = {};
      optionFields.forEach(f=>{
        const m = f.name.match(/^options\[(.*)\]$/);
        if (!m) return;
        const key = m[1];
        if (f.type==='radio'){ if (f.checked) groups[key]=f.value; }
        else groups[key]=f.value;
      });
      const ordered = (data.options||[]).map(o=> groups[o]);
      return ordered;
    }

    function updateUI(variant){
      const purchasable = Boolean(variant?.available);
      root.querySelectorAll('[data-primary-cta], [data-sticky-button]').forEach(button => {
        if (button.tagName === 'BUTTON') button.disabled = !purchasable;
        button.dataset.available = String(purchasable);
      });
      if (!variant) {
        if (varInput) { varInput.value = ''; varInput.dispatchEvent(new Event('change', {bubbles:true})); }
        if (priceEl) priceEl.textContent = 'Unavailable';
        if (stockEl) stockEl.textContent = 'Unavailable';
        if (compareEl) compareEl.hidden = true;
        if (saveEl) saveEl.hidden = true;
        if (stickyPrice) stickyPrice.textContent = 'Unavailable';
        return;
      }
      if (varInput) { varInput.value = variant.id; varInput.dispatchEvent(new Event('change', {bubbles:true})); }

      const locale = document.documentElement.lang || undefined;
      const currency = window.Shopify?.currency?.active;

      if (priceEl) priceEl.textContent = money(variant.price, locale, currency);
      if (compareEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price){
          compareEl.textContent = money(variant.compare_at_price, locale, currency);
          compareEl.hidden = false;
        } else compareEl.hidden = true;
      }
      if (saveEl){
        if (variant.compare_at_price && variant.compare_at_price > variant.price){
          const save = variant.compare_at_price - variant.price;
          const pct  = Math.round((save*100)/variant.compare_at_price);
          saveEl.textContent = `Save ${money(save, locale, currency)} (${pct}%)`;
          saveEl.hidden = false;
        } else saveEl.hidden = true;
      }
      if (skuEl){ skuEl.textContent = variant.sku || ''; }
      if (stockEl){
        stockEl.dataset.available = String(!!variant.available);
        stockEl.textContent = variant.available ? 'In stock' : 'Sold out';
      }
      if (stickyPrice) stickyPrice.textContent = money(variant.price, locale, currency);

      if (sticky) sticky.hidden = false;

      const live = root.querySelector('[data-live]');
      if (live) live.textContent = `${priceEl?.textContent || ''} — ${stockEl?.textContent || ''}`;
    }

    function onChange(){
      const selected = readSelection();
      const v = optionFields.length ? findVariant(data, selected) : data.variants.find(variant => String(variant.id) === varInput?.value);
      updateUI(v);
      root.dispatchEvent(new CustomEvent('quadratum.cta_featured_product.variant_change', { bubbles:true, detail: payload({ variant_id: v?.id }) }));
    }

    optionFields.forEach(f => f.addEventListener('change', onChange, { passive:true, signal: events.signal }));
    form.addEventListener('submit', event => {
      onChange();
      const variant = data.variants.find(item => String(item.id) === varInput?.value);
      if (!variant?.available) { event.preventDefault(); event.stopImmediatePropagation(); }
    }, {capture:true, signal:events.signal});
    if (optionFields.length) {
      root.querySelector('[data-options]').hidden = false;
      const fallback = root.querySelector('[data-variant-fallback]');
      if (fallback) fallback.hidden = true;
    }
    const slider = root.querySelector('.q-slider');
    if (slider) {
      const track = slider.querySelector('.q-track');
      const slides = Array.from(slider.querySelectorAll('.q-slide'));
      const dots = Array.from(slider.querySelectorAll('[data-dot]'));
      let index = 0;
      function showSlide(next) {
        if (!track || !slides.length) return;
        index = (next + slides.length) % slides.length;
        track.style.transform = `translateX(${-100 * index}%)`;
        slides.forEach((slide, position) => {
          slide.inert = position !== index;
          slide.setAttribute('aria-hidden', String(position !== index));
        });
        dots.forEach((dot, position) => dot.setAttribute('aria-current', String(position === index)));
      }
      slider.querySelector('[data-prev]')?.addEventListener('click', () => showSlide(index - 1), {signal:events.signal});
      slider.querySelector('[data-next]')?.addEventListener('click', () => showSlide(index + 1), {signal:events.signal});
      dots.forEach((dot, position) => dot.addEventListener('click', () => showSlide(position), {signal:events.signal}));
      showSlide(0);
    }
    // Initialize with the currently selected variant (Shopify sets product.selected_or_first_available_variant)
    onChange();

    // Form events for analytics
    if (form) {
      form.addEventListener('submit', (e)=>{
        root.dispatchEvent(new CustomEvent('quadratum.cta_featured_product.add_to_cart_attempt', { bubbles:true, detail: payload() }));
      }, {signal:events.signal});
      // Ajax cart not assumed; success/fail events should be emitted by your cart handler.
    }

    // Secondary CTA
    const secondary = root.querySelector('[data-secondary-cta]');
    if (secondary) secondary.addEventListener('click', ()=>{
      root.dispatchEvent(new CustomEvent('quadratum.cta_featured_product.click_secondary', { bubbles:true, detail: payload() }));
    }, {signal:events.signal});
  }

  document.addEventListener('shopify:section:unload', event => {
    const roots = [...(event.target.matches?.('[data-section-id].cta-featured-product') ? [event.target] : []), ...event.target.querySelectorAll('[data-section-id].cta-featured-product')];
    roots.forEach(root => {
      instances.get(root)?.abort(); instances.delete(root); delete root.dataset.qCtaInit;
    });
  });

  function boot(){
    document.querySelectorAll('[data-section-id].cta-featured-product').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // Theme editor hooks
  document.addEventListener('shopify:section:load', e => {
    const root = e.target?.querySelector?.('[data-section-id].cta-featured-product') || e.target;
    if (root?.matches?.('[data-section-id].cta-featured-product')) init(root);
  });
})();
