/* Gallery-only accordion and native image dialog. Carousel rotation is shared. */
(() => {
  if (window.qtmGallery) return;
  window.qtmGallery = true;
  const instances = new WeakMap(), selector = '[data-q-gallery]';
  const each = (scope, fn) => { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); };
  function init(root) {
    if (instances.has(root)) return;
    const life = new AbortController(), on = (node, type, fn) => node?.addEventListener(type, fn, { signal: life.signal });
    const panels = [...root.querySelectorAll('.q-gallery__panel')], dialog = root.querySelector('[data-q-lightbox]');
    const images = [...root.querySelectorAll('[data-q-lightbox-open]')];
    let index = 0, opener, restore = true;
    function activate(panel, scroll = false) {
      panels.forEach(item => {
        item.classList.toggle('is-active', item === panel);
        item.querySelector('[data-gallery-expand]')?.setAttribute('aria-expanded', String(item === panel));
      });
      if (scroll) panel.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
    }
    panels.forEach(panel => {
      const expand = panel.querySelector('[data-gallery-expand]');
      if (expand) { expand.hidden = false; on(expand, 'click', () => activate(panel, true)); }
      if (root.dataset.accordionMode === 'hover') {
        on(panel, 'mouseenter', () => activate(panel));
        on(panel, 'focusin', () => activate(panel));
      }
    });
    function show(next) {
      index = Math.max(0, Math.min(next, images.length - 1));
      const link = images[index], item = link?.closest('[data-q-gallery-item]');
      if (!item || !dialog) return;
      const image = dialog.querySelector('[data-q-lightbox-img]');
      Object.assign(image, { src: link.href, alt: item.dataset.alt || '', width: Number(item.dataset.width) || 1600, height: Number(item.dataset.height) || 1600 });
      dialog.querySelector('[data-q-lightbox-cap]').textContent = [item.dataset.tag, item.dataset.title, item.dataset.desc].filter(Boolean).join(' — ');
      dialog.querySelector('[data-q-lightbox-status]').textContent = `Image ${index + 1} of ${images.length}`;
      const prev = dialog.querySelector('[data-q-lightbox-prev]'), nextButton = dialog.querySelector('[data-q-lightbox-next]');
      prev.hidden = nextButton.hidden = images.length < 2;
      prev.disabled = root.dataset.lightboxLoop !== 'true' && index === 0;
      nextButton.disabled = root.dataset.lightboxLoop !== 'true' && index === images.length - 1;
    }
    function close(returnFocus = true) {
      restore = returnFocus;
      if (dialog?.open) dialog.close();
    }
    function navigate(delta) {
      const next = index + delta;
      show(root.dataset.lightboxLoop === 'true' ? (next + images.length) % images.length : next);
    }
    on(root, 'click', e => {
      const link = e.target.closest('[data-q-lightbox-open]');
      if (link && dialog?.showModal && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
        opener = link; restore = true;
        root.querySelector('[data-q-carousel-engine]')?.__qCarousel?.pause();
        window.dispatchEvent(new CustomEvent('qtm:collection-modal-open', { detail: dialog }));
        show(images.indexOf(link));
        if (!dialog.open) dialog.showModal();
        dialog.querySelector('[data-q-lightbox-close]').focus();
      }
      if (e.target.closest('[data-q-lightbox-close]') || e.target === dialog) close();
      if (e.target.closest('[data-q-lightbox-prev]')) navigate(-1);
      if (e.target.closest('[data-q-lightbox-next]')) navigate(1);
    });
    on(dialog, 'cancel', e => { e.preventDefault(); close(); });
    on(dialog, 'close', () => { dialog.querySelector('[data-q-lightbox-img]').removeAttribute('src'); if (restore && opener?.isConnected) opener.focus(); });
    on(dialog, 'keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End','Escape'].includes(e.key) || e.target.matches('input,textarea,select')) return;
      e.preventDefault();
      if (e.key === 'Escape') close();
      else if (e.key === 'Home') show(0);
      else if (e.key === 'End') show(images.length - 1);
      else navigate((e.key === 'ArrowRight' ? 1 : -1) * (getComputedStyle(root).direction === 'rtl' ? -1 : 1));
    });
    on(window, 'qtm:collection-modal-open', e => { if (e.detail !== dialog) close(false); });
    on(root, 'shopify:block:select', e => { const panel = e.target.closest('.q-gallery__panel'); if (panel) activate(panel, true); });
    instances.set(root, () => { close(false); life.abort(); panels.forEach(panel => { const button = panel.querySelector('[data-gallery-expand]'); if (button) button.hidden = true; }); });
  }
  document.addEventListener('shopify:section:load', e => each(e.target, init));
  document.addEventListener('shopify:section:unload', e => each(e.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
