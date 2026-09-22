/* Theme Block media only. Purchase state remains owned by the product form/controller. */
(() => {
  if (window.qtmProductBlockGallery) return;
  const selector = '[data-qtm-block-gallery]', instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const scopeOf = root => root.closest('.qtm-product-block-section, .shopify-section') || root;
  function init(root) {
    if (instances.has(root)) return;
    const items = [...root.querySelectorAll('[data-gallery-item]')];
    if (!items.length) return;
    const abort = new AbortController(), on = (node, event, fn, options = {}) => node?.addEventListener(event, fn, { ...options, signal: abort.signal });
    const viewport = root.querySelector('[data-product-gallery-viewport]'), scope = scopeOf(root);
    const choices = [...root.querySelectorAll('[data-product-gallery-thumbnail], [data-product-gallery-dot]')];
    const nav = [...root.querySelectorAll('[data-gallery-nav]')], pauseButton = root.querySelector('[data-gallery-pause]');
    const slider = root.dataset.galleryMode === 'slider', panels = root.dataset.galleryMode === 'horizontal_thumbs' && choices.length > 0;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let variants; try { variants = JSON.parse(root.dataset.variants || '[]'); } catch (_) { variants = []; }
    if (!Array.isArray(variants)) variants = [];
    let active = Math.max(0, items.findIndex(item => item.dataset.mediaId === root.dataset.currentMedia));
    let timer, frame, disposed = false, userPaused = false, hovering = false, focused = false;
    const cancel = () => { clearTimeout(timer); timer = null; };
    function stopMedia(item, except) {
      item.querySelectorAll('video, model-viewer').forEach(media => { if (media !== except) { try { media.pause?.(); } catch (_) {} } });
      item.querySelectorAll('[data-gallery-embed-player]').forEach(node => node.remove());
      item.querySelectorAll('[data-gallery-embed-link]').forEach(node => { node.hidden = false; });
    }
    function schedule() {
      cancel();
      if (pauseButton) { pauseButton.hidden = false; pauseButton.textContent = userPaused ? root.dataset.resumeLabel : root.dataset.pauseLabel; }
      if (disposed || !slider || items.length < 2 || root.dataset.autoplay !== 'true' || root.dataset.designMode === 'true' || motion.matches || document.hidden || userPaused || hovering || focused) return;
      const delay = Math.max(2000, Number(root.dataset.autoplaySpeed) || 5000);
      timer = setTimeout(() => { activate(active + 1, true, false); schedule(); }, delay);
    }
    function userAction() { userPaused = true; schedule(); }
    function activate(index, scroll = false, announce = false) {
      active = (index + items.length) % items.length;
      const item = items[active];
      if (slider || panels) { item.inert = false; if (panels) item.hidden = false; }
      for (const entry of items) {
        const selected = entry === item;
        entry.classList.toggle('is-active', selected);
        if (slider || panels) {
          if (!selected && entry.contains(document.activeElement)) (viewport || item).focus({ preventScroll: true });
          if (panels) entry.hidden = !selected;
          entry.inert = !selected;
          entry.setAttribute('aria-hidden', String(!selected));
        }
        if (!selected) stopMedia(entry);
      }
      choices.forEach(button => {
        const selected = Number(button.dataset.index) === active;
        button.classList.toggle('is-active', selected);
        if (selected) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
      });
      root.dataset.currentMedia = item.dataset.mediaId;
      if (announce) root.querySelector('[data-gallery-status]').textContent = item.getAttribute('aria-label');
      if (scroll && slider && viewport) {
        const target = item.getBoundingClientRect(), view = viewport.getBoundingClientRect();
        const rtl = (getComputedStyle(root).direction || root.closest('[dir]')?.getAttribute('dir') || document.documentElement.dir) === 'rtl';
        const left = rtl ? target.right - view.right : target.left - view.left;
        if (typeof viewport.scrollBy === 'function') viewport.scrollBy({ left, behavior: 'auto' }); else viewport.scrollLeft += left;
      } else if (scroll && !slider && !panels) item.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
    choices.forEach(button => on(button, 'click', () => { userAction(); activate(Number(button.dataset.index), true, true); }));
    on(root.querySelector('[data-product-gallery-prev]'), 'click', () => { userAction(); activate(active - 1, true, true); });
    on(root.querySelector('[data-product-gallery-next]'), 'click', () => { userAction(); activate(active + 1, true, true); });
    on(pauseButton, 'click', () => { userPaused = !userPaused; schedule(); });
    on(root, 'keydown', event => {
      if (!slider || !(event.target === viewport || event.target.matches('[data-product-gallery-thumbnail], [data-product-gallery-dot], [data-product-gallery-prev], [data-product-gallery-next]'))) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); userAction();
      const rtl = (getComputedStyle(root).direction || root.closest('[dir]')?.getAttribute('dir') || document.documentElement.dir) === 'rtl';
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      activate(index, true, true);
    });
    on(viewport, 'scroll', () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null; if (disposed) return;
        const view = viewport.getBoundingClientRect(); if (!view.width) return;
        const middle = (view.left + view.right) / 2;
        const distances = items.map(item => { const rect = item.getBoundingClientRect(); return Math.abs((rect.left + rect.right) / 2 - middle); });
        activate(distances.indexOf(Math.min(...distances)));
      });
    }, { passive: true });
    on(root, 'pointerdown', event => { if (!event.target.closest('[data-gallery-pause]')) userAction(); });
    on(root, 'mouseenter', () => { hovering = true; schedule(); });
    on(root, 'mouseleave', () => { hovering = false; schedule(); });
    on(root, 'focusin', event => { focused = true; if (event.target !== pauseButton) userPaused = true; schedule(); });
    on(root, 'focusout', event => { focused = root.contains(event.relatedTarget); schedule(); });
    on(document, 'visibilitychange', () => { if (document.hidden) items.forEach(item => stopMedia(item)); schedule(); });
    on(motion, 'change', schedule);
    on(root, 'play', event => { userAction(); items.forEach(item => stopMedia(item, event.target)); }, { capture: true });
    root.querySelectorAll('[data-gallery-embed-link]').forEach(link => on(link, 'click', event => {
      const container = link.parentElement, template = container.querySelector('template[data-gallery-embed-template]');
      if (!template) return;
      event.preventDefault(); userAction(); items.forEach(item => stopMedia(item));
      const player = document.createElement('div'); player.dataset.galleryEmbedPlayer = '';
      player.append(template.content.cloneNode(true)); link.after(player); link.hidden = true; player.querySelector('iframe')?.focus();
    }));
    const updateVariant = (id, scroll = false, fromUser = scroll) => {
      const variant = variants.find(item => String(item.id) === String(id));
      if (id && !variant) return;
      root.dataset.variantId = variant ? String(variant.id) : '';
      const index = items.findIndex(item => item.dataset.mediaId === String(variant?.mediaId));
      if (index >= 0) { if (fromUser) userAction(); activate(index, scroll); }
    };
    const handle = event => {
      const detail = event.detail || {};
      if (detail.productId != null && String(detail.productId) !== root.dataset.productId) return;
      const owner = event.target instanceof Element && event.target.closest('[data-product-id]');
      if (owner && owner.dataset.productId !== root.dataset.productId) return;
      const sourceScope = event.target instanceof Element && scopeOf(event.target);
      if (sourceScope && sourceScope !== scope) return;
      if (!sourceScope) {
        if (detail.sectionId != null) { const id = String(detail.sectionId); if (![id, 'shopify-section-' + id, 'qtm-product-block-section-' + id].includes(scope.id)) return; }
        else if (new Set([...document.querySelectorAll(selector)].filter(node => node.dataset.productId === root.dataset.productId).map(scopeOf)).size !== 1) return;
      }
      const id = detail.variant?.id ?? detail.variantId ?? detail.variant_id ?? detail.id;
      if (id != null || detail.variant === null) updateVariant(id, true);
    };
    for (const name of ['variant:change', 'qtm:variant:change', 'product:variant-change']) on(document, name, handle);
    const nativeVariant = input => input?.matches?.('[name="id"]') && !input.disabled && (!['radio', 'checkbox'].includes(input.type) || input.checked) && (!input.closest('[data-product-id]') || input.closest('[data-product-id]').dataset.productId === root.dataset.productId);
    on(scope, 'change', event => { if (nativeVariant(event.target)) updateVariant(event.target.value, true); });
    on(scope, 'qtm:variant-restored', event => { const input = nativeVariant(event.target) ? event.target : event.target.querySelector?.('[name="id"]'); if (nativeVariant(input)) updateVariant(input.value); });
    on(root.closest('.shopify-block') || root, 'shopify:block:select', () => { userAction(); activate(active, true); });
    let resize;
    if (viewport && 'ResizeObserver' in window) { resize = new ResizeObserver(() => { if (!disposed) activate(active, true); }); resize.observe(viewport); }
    else on(window, 'resize', () => { if (slider) activate(active, true); });
    root.dataset.qtmGalleryReady = '';
    nav.forEach(node => { node.hidden = false; });
    items.forEach(item => { item.tabIndex = -1; });
    activate(active, slider);
    const initial = [...scope.querySelectorAll('form [name="id"]')].find(nativeVariant);
    if (initial) updateVariant(initial.value, slider, false);
    schedule();
    instances.set(root, () => {
      disposed = true; abort.abort(); cancel(); resize?.disconnect(); if (frame) cancelAnimationFrame(frame);
      items.forEach(item => { stopMedia(item); item.hidden = false; item.inert = false; item.removeAttribute('inert'); item.removeAttribute('aria-hidden'); item.removeAttribute('tabindex'); });
      nav.forEach(node => { node.hidden = true; }); if (pauseButton) pauseButton.hidden = true;
      delete root.dataset.qtmGalleryReady; root.querySelector('[data-gallery-status]').textContent = '';
    });
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmProductBlockGallery = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  const start = () => {
    boot(document);
    if ('MutationObserver' in window && document.body) new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (!node.isConnected) dispose(node);
        for (const node of record.addedNodes) boot(node);
      }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
