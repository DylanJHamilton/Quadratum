(() => {
  if (window.qtmProductGallery) return;
  window.qtmProductGallery = true;
  const instances = new WeakMap(), selector = '[data-product-gallery]';
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(root) {
    if (instances.has(root)) return;
    const form = root.querySelector('form[action*="/cart/add"]'), id = form?.querySelector('[name="id"]');
    let variants;
    try { variants = JSON.parse(root.querySelector('[data-product-purchase-data]').textContent); } catch { return; }
    const groups = [...root.querySelectorAll('[data-qtm-option]')];
    if (!id || !Array.isArray(variants) || !variants.length || variants.some(v => !v || !Array.isArray(v.options) || (groups.length && v.options.length !== groups.length))) return;
    const controller = new AbortController();
    const on = (target, type, fn, options = {}) => target?.addEventListener(type, fn, { ...options, signal: controller.signal });
    const fallback = root.querySelector('[data-simple-fallback]');
    if (fallback) fallback.hidden = groups.length > 0 || variants.length === 1;
    groups.forEach(group => { group.hidden = false; });
    const buttons = [...root.querySelectorAll('[data-qtm-image]')];
    const photos = buttons.map(button => ({ id: button.dataset.mediaId, src: button.dataset.qtmImage, srcset: button.dataset.imageSrcset, alt: button.dataset.imageAlt, width: button.dataset.imageWidth, height: button.dataset.imageHeight }));
    const main = root.querySelector('[id^="QtmMainImage-"]'), modal = root.querySelector('dialog'), modalImage = modal?.querySelector('img');
    const zoomButton = modal?.querySelector('[data-qtm-zoom]'), fullscreenButton = modal?.querySelector('[data-qtm-fullscreen]');
    const canvas = modal?.querySelector('.qtm-lightbox__canvas');
    if (fullscreenButton) fullscreenButton.hidden = !modal.requestFullscreen;
    function resetZoom() {
      if (modal) modal.dataset.zoomed = 'false';
      zoomButton?.setAttribute('aria-pressed', 'false');
      if (canvas) { canvas.scrollTop = 0; canvas.scrollLeft = 0; }
    }
    let active = photos.find(photo => photo.id === root.dataset.featuredMedia) || photos[0], opener;
    let variantPhoto;
    function image(node, photo) {
      if (!node || !photo) return;
      node.src = photo.src;
      if (photo.srcset) node.srcset = photo.srcset; else node.removeAttribute('srcset');
      node.alt = photo.alt || '';
      node.width = Number(photo.width) || 800; node.height = Number(photo.height) || 800;
    }
    function display(photo) {
      if (!photo) return;
      active = photo; image(main, photo); image(modalImage, photo);
      resetZoom();
      const count = modal?.querySelector('[data-qtm-image-count]'), caption = modal?.querySelector('[data-qtm-image-caption]');
      const gallery = variantPhoto && !photos.some(item => item.id === variantPhoto.id) ? [...photos, variantPhoto] : photos;
      if (count) count.textContent = `${Math.max(0, gallery.findIndex(item => item.id === photo.id)) + 1} / ${gallery.length}`;
      if (caption) caption.textContent = photo.alt || '';
      if (modalImage) { modalImage.classList.remove('qtm-lightbox__enter'); }
      buttons.forEach(button => button.setAttribute('aria-current', String(button.dataset.mediaId === photo.id)));
    }
    function pauseMedia(unload = false, except) {
      root.querySelectorAll('video,model-viewer').forEach(media => { if (media !== except) media.pause?.(); });
      root.querySelectorAll('iframe').forEach(frame => {
        try { const origin = new URL(frame.src).origin; frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), origin); frame.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), origin); } catch { /* Missing/unloaded media. */ }
        if (unload && frame.hasAttribute('src')) { frame.dataset.simpleSrc = frame.getAttribute('src'); frame.removeAttribute('src'); }
      });
    }
    root.querySelectorAll('[data-simple-src]').forEach(frame => { frame.src = frame.dataset.simpleSrc; delete frame.dataset.simpleSrc; });
    on(root, 'play', event => pauseMedia(false, event.target), { capture: true });
    function open(button) {
      if (!modal?.showModal || modal.open || !active) return;
      pauseMedia(); opener = button; modal.showModal(); modal.querySelector('[data-qtm-close-modal]')?.focus();
    }
    buttons.forEach(button => on(button, 'click', () => {
      display(photos[buttons.indexOf(button)]);
      if (button.closest('.qtm-modern__grid-gallery')) open(button);
    }));
    root.querySelectorAll('[data-qtm-open-main],[data-qtm-open-modal]').forEach(button => on(button, 'click', () => open(button)));
    on(root.querySelector('[data-qtm-close-modal]'), 'click', () => modal?.close());
    on(modal, 'close', () => { resetZoom(); if (document.fullscreenElement === modal) document.exitFullscreen?.().catch(() => {}); if (opener?.isConnected) opener.focus(); });
    on(modalImage, 'load', () => modalImage.classList.add('qtm-lightbox__enter'));
    on(zoomButton, 'click', () => {
      const zoomed = modal.dataset.zoomed !== 'true'; modal.dataset.zoomed = String(zoomed); zoomButton.setAttribute('aria-pressed', String(zoomed));
      if (zoomed) canvas?.focus();
    });
    on(fullscreenButton, 'click', async () => {
      try { if (document.fullscreenElement === modal) await document.exitFullscreen(); else await modal.requestFullscreen(); } catch { /* Browser permissions may disallow fullscreen; the native dialog remains usable. */ }
    });
    let touchStart;
    on(modalImage, 'pointerdown', event => { if (event.pointerType === 'touch' && modal.dataset.zoomed !== 'true') touchStart = { x: event.clientX, y: event.clientY }; });
    on(modalImage, 'pointerup', event => {
      if (!touchStart) return;
      const dx = event.clientX - touchStart.x, dy = event.clientY - touchStart.y; touchStart = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    });
    on(modalImage, 'pointercancel', () => { touchStart = null; });
    on(modal, 'click', event => { if (event.target === modal) modal.close(); });
    function step(delta) {
      const list = variantPhoto && !photos.some(photo => photo.id === variantPhoto.id) ? [...photos, variantPhoto] : photos;
      if (list.length) display(list[(Math.max(0, list.indexOf(active)) + delta + list.length) % list.length]);
    }
    on(root.querySelector('[data-qtm-prev]'), 'click', () => step(-1));
    on(root.querySelector('[data-qtm-next]'), 'click', () => step(1));
    on(modal, 'keydown', event => {
      if (modal.dataset.zoomed !== 'true' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1); }
      if (event.key === 'Escape') modal.close();
    });
    const rail = root.querySelector('[data-qtm-thumb-rail]');
    on(root.querySelector('[data-qtm-thumb-prev]'), 'click', () => { if (rail) rail.scrollLeft -= rail.clientWidth * .8; });
    on(root.querySelector('[data-qtm-thumb-next]'), 'click', () => { if (rail) rail.scrollLeft += rail.clientWidth * .8; });
    function sync() {
      const variant = variants.find(v => String(v.id) === id.value);
      if (!variant) return;
      groups.forEach((group, index) => {
        const select = group.querySelector('select');
        if (select) select.value = variant.options[index];
        group.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = input.value === variant.options[index]; });
      });
      variantPhoto = variant.variantImage && variant.image ? { ...variant.image, id: String(variant.mediaId || 'variant-' + variant.id) } : null;
      const matching = photos.find(photo => photo.id === String(variant.mediaId));
      display(matching || variantPhoto || active);
      const extra = root.querySelector('[data-simple-variant-image]');
      if (extra) { extra.hidden = !variantPhoto || Boolean(matching) || Boolean(main); if (!extra.hidden) image(extra.querySelector('img'), variantPhoto); }
    }
    groups.forEach(group => on(group, 'change', () => {
      const options = groups.map(node => node.querySelector('select')?.value ?? node.querySelector('input:checked')?.value);
      const variant = variants.find(v => options.every((option, index) => v.options[index] === option));
      id.value = variant ? String(variant.id) : '';
      id.dispatchEvent(new Event('change', { bubbles: true }));
    }));
    on(id, 'change', sync); on(id, 'qtm:variant-restored', sync);
    on(root.querySelector('[data-simple-variant-image]'), 'click', event => open(event.currentTarget));
    on(document, 'visibilitychange', () => { if (document.hidden) pauseMedia(); });
    on(root, 'shopify:block:select', event => {
      root.querySelectorAll('[data-simple-block]').forEach(block => { if (block.dataset.simpleBlock === event.detail?.blockId) { block.open = true; block.scrollIntoView({ block: 'nearest' }); } });
    });
    instances.set(root, () => { if (modal?.open) modal.close(); pauseMedia(true); controller.abort(); if (fallback) fallback.hidden = false; groups.forEach(group => { group.hidden = true; }); });
    sync();
  }
  const boot = (scope = document) => each(scope, init);
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true }); else boot();
})();
