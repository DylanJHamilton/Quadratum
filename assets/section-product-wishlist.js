/* Existing wishlist section: shared storage, native product card fragments. */
(() => {
  if (window.qtmWishlistSections) return;
  window.qtmWishlistSections = true;
  const instances = new WeakMap(), selector = '.product-wishlist[data-section-id]';
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(root) {
    if (instances.has(root) || !window.qtmWishlistStore) return;
    const key = root.dataset.wishlistKey || 'q:wishlist:v1', store = window.qtmWishlistStore(key);
    const life = new AbortController(), on = (node, event, fn) => node.addEventListener(event, fn, { signal: life.signal });
    const list = root.querySelector('[data-wishlist-list]'), empty = root.querySelector('[data-wishlist-empty]'), toggle = root.querySelector('[data-wishlist-toggle]');
    const useVariant = root.dataset.useVariantId === 'true';
    let request, lastItems, focusIndex = null;
    function payload() { return { product_handle: root.dataset.productHandle || '', variant_id: root.dataset.variantId || null }; }
    function sync() {
      const items = store.getState().items;
      root.querySelectorAll('[data-wishlist-count]').forEach(node => { node.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'}`; });
      root.querySelectorAll('[data-wishlist-badge]').forEach(node => { node.textContent = String(items.length); });
      root.querySelectorAll('[data-wishlist-notice]').forEach(node => { node.hidden = store.isStorageOK(); });
      root.querySelectorAll('[data-wishlist-clear]').forEach(node => { node.hidden = false; node.disabled = !items.length; });
      if (toggle) {
        toggle.disabled = !payload().product_handle || (useVariant && !payload().variant_id);
        const active = !toggle.disabled && store.hasItem(payload(), useVariant);
        toggle.setAttribute('aria-pressed', String(active)); toggle.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
        toggle.querySelector('[data-wishlist-label]').textContent = active ? 'Remove from wishlist' : 'Add to wishlist'; toggle.hidden = false;
      }
      const signature = JSON.stringify(items);
      if (list && signature !== lastItems) { lastItems = signature; render(items); }
    }
    async function render(allItems) {
      request?.abort(); request = new AbortController(); const signal = request.signal;
      const max = Math.max(2, Math.min(50, Number(root.dataset.maxProducts) || 12)), items = allItems.slice(0, max);
      list.replaceChildren(); empty.hidden = items.length > 0;
      if (!items.length) { if (focusIndex !== null) { list.focus(); focusIndex = null; } return; }
      for (const item of items) {
        if (signal.aborted) return;
        const slot = document.createElement('div'); slot.className = 'product-wishlist__item'; slot.setAttribute('role', 'listitem'); list.append(slot);
        slot.setAttribute('aria-busy', 'true');
        try {
          const path = `${window.Shopify?.routes?.root || '/'}products/${encodeURIComponent(item.product_handle)}?section_id=product-wishlist-card-renderer`;
          const url = new URL(path, location.href); if (url.origin !== location.origin) throw new Error('Invalid product route');
          if (useVariant && item.variant_id) url.searchParams.set('variant', item.variant_id);
          const response = await fetch(url, { credentials: 'same-origin', signal });
          if (!response.ok) throw new Error('Unavailable product');
          const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
          if (signal.aborted) return;
          const card = doc.querySelector('[data-wishlist-title]'); if (!card) throw new Error('Missing product card');
          if (useVariant && item.variant_id) card.querySelectorAll('a[href]').forEach(link => { const target = new URL(link.getAttribute('href'), url); if (target.origin === location.origin && target.pathname.includes('/products/')) { target.searchParams.set('variant', item.variant_id); link.href = target.href; } });
          slot.append(document.importNode(card, true));
        } catch (error) {
          if (signal.aborted) return;
          const message = document.createElement('p'); message.className = 'product-wishlist__item-error'; message.textContent = `Couldn’t load ${item.product_handle}.`; slot.append(message);
        }
        slot.removeAttribute('aria-busy');
        if (root.dataset.showRemoveButtons !== 'false') {
          const button = document.createElement('button'); button.type = 'button'; button.className = 'product-wishlist__remove'; button.dataset.wishlistRemove = ''; button.dataset.handle = item.product_handle; button.dataset.variantId = item.variant_id || '';
          button.textContent = '×'; button.setAttribute('aria-label', `Remove ${slot.querySelector('[data-wishlist-title]')?.dataset.wishlistTitle || item.product_handle} from wishlist`); slot.prepend(button);
        }
      }
      if (focusIndex !== null) { const buttons = list.querySelectorAll('[data-wishlist-remove]'); (buttons[Math.min(focusIndex, buttons.length - 1)] || list).focus(); focusIndex = null; }
    }
    on(root, 'click', event => {
      const remove = event.target.closest('[data-wishlist-remove]');
      if (remove) { event.preventDefault(); focusIndex = [...list.querySelectorAll('[data-wishlist-remove]')].indexOf(remove); store.removeItem({ product_handle: remove.dataset.handle, variant_id: remove.dataset.variantId || null }, useVariant); list.focus(); }
      else if (event.target.closest('[data-wishlist-clear]')) { event.preventDefault(); focusIndex = 0; store.clearAll(); }
      else if (event.target.closest('[data-wishlist-toggle]') && !toggle.disabled) { event.preventDefault(); store[store.hasItem(payload(), useVariant) ? 'removeItem' : 'addItem'](payload(), useVariant); }
    });
    on(window, 'q:wishlist:updated', event => { if (event.detail?.key === key) sync(); });
    function variantChanged(event) {
      const input = event.target;
      if (!input.matches?.('[name="id"]')) return;
      const owner = input.closest('[data-product-url]');
      if (owner && root.dataset.productUrl && owner.dataset.productUrl === root.dataset.productUrl) { root.dataset.variantId = input.value; sync(); }
    }
    on(document, 'change', variantChanged); on(document, 'qtm:variant-restored', variantChanged);
    instances.set(root, () => { life.abort(); request?.abort(); }); sync();
  }
  document.addEventListener('shopify:section:load', event => each(event.target, init));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
