(() => {
  const WISHLIST_SELECTOR = '[data-wishlist-button]';

  function dispatchWishlist(button) {
    const productId = Number(button.dataset.productId || 0);
    const variantId = Number(button.dataset.variantId || 0);

    // If your theme already has a wishlist engine/event, call it here safely (optional):
    // window.ProductWishlist?.add?.({ productId, variantId });

    document.dispatchEvent(
      new CustomEvent('q:wishlist:add', { detail: { productId, variantId } })
    );
  }

  function syncWishlistVariantIdFromSelect(scopeEl) {
    const buttons = scopeEl.querySelectorAll(WISHLIST_SELECTOR);
    if (!buttons.length) return;

    const select = scopeEl.querySelector('select[name="id"]');
    if (!select) return;

    const update = () => {
      const vId = select.value;
      buttons.forEach((btn) => {
        btn.dataset.variantId = vId;
      });
    };

    select.addEventListener('change', update, { passive: true });
    update();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest(WISHLIST_SELECTOR);
    if (!btn) return;
    e.preventDefault();
    dispatchWishlist(btn);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[id^="q-pdp-"]').forEach((sectionEl) => {
      if (sectionEl.querySelector(WISHLIST_SELECTOR)) {
        syncWishlistVariantIdFromSelect(sectionEl);
      }
    });
  });

  document.addEventListener('shopify:section:load', (e) => {
    const sectionEl = e.target?.querySelector?.('[id^="q-pdp-"]') || e.target;
    if (sectionEl?.querySelector?.(WISHLIST_SELECTOR)) {
      syncWishlistVariantIdFromSelect(sectionEl);
    }
  });
})();