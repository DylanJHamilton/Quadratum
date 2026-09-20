/* Shared saved-list storage, preserving the existing q:wishlist:v1 schema. */
(() => {
  if (window.qtmWishlistStore) return;
  const stores = new Map(), buttons = new WeakMap();
  function normalize(items) {
    const seen = new Set();
    return (Array.isArray(items) ? items : []).filter(item => {
      if (!item || typeof item.product_handle !== 'string' || !/^[\p{L}\p{N}_-]{1,255}$/u.test(item.product_handle)) return false;
      if (item.variant_id != null && !/^[1-9]\d*$/.test(String(item.variant_id))) return false;
      const key = item.product_handle + ':' + (item.variant_id || '');
      if (seen.has(key)) return false; seen.add(key); return true;
    }).slice(0, 100).map(item => ({ product_handle: item.product_handle, variant_id: item.variant_id == null ? null : String(item.variant_id), added_at: typeof item.added_at === 'string' ? item.added_at : '' }));
  }
  function makeStore(key = 'q:wishlist:v1') {
    if (stores.has(key)) return stores.get(key);
    let storageOK = true, memory = { version: 1, items: [] };
    function getState() {
      if (storageOK) try {
        const raw = window.localStorage.getItem(key);
        let data; try { data = JSON.parse(raw || 'null'); } catch { data = null; }
        memory = { version: 1, items: normalize(data?.items) };
      } catch { storageOK = false; }
      return { version: 1, items: memory.items.slice() };
    }
    function dispatchUpdated() { window.dispatchEvent(new CustomEvent('q:wishlist:updated', { detail: { key, items: getState().items } })); }
    function set(items) {
      memory = { version: 1, items: normalize(items) };
      if (storageOK) try { window.localStorage.setItem(key, JSON.stringify(memory)); } catch { storageOK = false; }
      dispatchUpdated(); return getState();
    }
    const matches = (item, payload, useVariant) => useVariant && payload.variant_id ? String(item.variant_id) === String(payload.variant_id) : item.product_handle === payload.product_handle;
    const store = {
      getState, dispatchUpdated,
      isStorageOK: () => { getState(); return storageOK; },
      hasItem: (payload, useVariant) => getState().items.some(item => matches(item, payload, useVariant)),
      addItem: (payload, useVariant) => set([{ ...payload, added_at: new Date().toISOString() }, ...getState().items.filter(item => !matches(item, payload, useVariant))]),
      removeItem: (payload, useVariant) => set(getState().items.filter(item => !matches(item, payload, useVariant))),
      clearAll: () => set([])
    };
    stores.set(key, store); return store;
  }
  window.qtmWishlistStore = makeStore;
  window.addEventListener('storage', event => { if (event.key === null) stores.forEach(store => store.dispatchUpdated()); else stores.get(event.key)?.dispatchUpdated(); });
  const selector = '[data-wishlist-button]';
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(button) {
    if (buttons.has(button)) return;
    const root = button.closest('[data-product-purchase-sync]') || button.closest('section');
    const variant = root?.querySelector('form [name="id"]');
    const store = makeStore(button.dataset.wishlistKey || 'q:wishlist:v1');
    const useVariant = button.dataset.wishlistMode !== 'product';
    const life = new AbortController(), on = (node, type, handler) => node?.addEventListener(type, handler, { signal: life.signal });
    const payload = () => ({ product_handle: button.dataset.productHandle, variant_id: useVariant ? (variant ? variant.value || null : button.dataset.variantId || null) : null });
    // Earlier Modern buttons saved IDs under a separate key. Migrate only IDs
    // identifiable from this product; retain every unrelated legacy entry.
    if (button.dataset.productId) try {
      const legacy = JSON.parse(window.localStorage.getItem('qtm_wishlist_v1') || '[]');
      const data = JSON.parse(root.querySelector('[data-product-purchase-data]')?.textContent || '[]');
      if (Array.isArray(legacy) && Array.isArray(data)) {
        const remaining = legacy.filter(value => {
          const productMatch = value === 'p:' + button.dataset.productId;
          const found = data.find(item => value === 'v:' + item.id);
          if (!productMatch && !found) return true;
          const item = { product_handle: button.dataset.productHandle, variant_id: found ? String(found.id) : null };
          if (!store.hasItem(item, Boolean(found))) store.addItem(item, Boolean(found));
          return !store.isStorageOK();
        });
        if (remaining.length !== legacy.length) window.localStorage.setItem('qtm_wishlist_v1', JSON.stringify(remaining));
      }
    } catch { /* Preserve legacy storage when it is unreadable or unwritable. */ }
    function sync() {
      const data = payload(); button.dataset.variantId = data.variant_id || '';
      button.disabled = !data.product_handle || (useVariant && !data.variant_id);
      const active = !button.disabled && store.hasItem(data, useVariant);
      const label = active ? button.dataset.wishlistLabelRemove || 'Remove from wishlist' : button.dataset.wishlistLabelAdd || 'Add to wishlist';
      button.setAttribute('aria-pressed', String(active)); button.setAttribute('aria-label', label);
      const text = button.querySelector('.p-wl__label,[data-qtm-wl-text]'); if (text) text.textContent = label;
      const icon = button.querySelector('[data-qtm-wl-icon]'); if (icon) icon.textContent = active ? button.dataset.iconActive || '♥' : button.dataset.iconInactive || '♡';
      button.classList.toggle('is-active', active); button.hidden = false;
      const notice = button.nextElementSibling; if (notice?.matches('[data-wishlist-notice]')) notice.hidden = store.isStorageOK();
    }
    on(button, 'click', () => { const data = payload(); if (!button.disabled) store[store.hasItem(data, useVariant) ? 'removeItem' : 'addItem'](data, useVariant); });
    on(variant, 'change', sync); on(variant, 'qtm:variant-restored', sync);
    on(window, 'q:wishlist:updated', event => { if (event.detail?.key === (button.dataset.wishlistKey || 'q:wishlist:v1')) sync(); });
    sync(); buttons.set(button, () => { life.abort(); button.hidden = true; });
  }
  document.addEventListener('shopify:section:load', event => each(event.target, init));
  document.addEventListener('shopify:section:unload', event => each(event.target, button => { buttons.get(button)?.(); buttons.delete(button); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
