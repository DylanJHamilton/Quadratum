(() => {
  if (window.qtmStackedProductMedia) return;
  window.qtmStackedProductMedia = true;
  const instances = new WeakMap(), selector = '[data-stacked-product-media]';
  function each(scope, fn) { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); }
  function init(root) {
    if (instances.has(root)) return;
    const life = new AbortController(), on = (node, event, fn) => node?.addEventListener(event, fn, { signal: life.signal });
    const media = [...root.querySelectorAll('[data-classic-media]')], thumbs = [...root.querySelectorAll('[data-classic-thumb]')];
    const fallback = root.querySelector('[data-classic-variant-media]'), viewer = root.querySelector('.q-pdp-media__viewer');
    if (fallback && viewer) viewer.prepend(fallback);
    const select = root.querySelector('form [name="id"]'), dialog = root.querySelector('[data-classic-lightbox]');
    let opener, current, variants = [];
    try { variants = JSON.parse(root.querySelector('[data-product-purchase-data]').textContent); } catch { /* Native media links remain. */ }
    variants = Array.isArray(variants) ? variants.filter(item => item && item.id != null) : [];
    function pause(scope, unload = false) {
      scope.querySelectorAll('video, model-viewer').forEach(node => node.pause?.());
      scope.querySelectorAll('iframe').forEach(frame => {
        if (!frame.src) return;
        if (unload) { frame.dataset.classicSrc = frame.src; frame.removeAttribute('src'); return; }
        try { const url = new URL(frame.src, location.href); const message = url.hostname.includes('vimeo.com') ? { method: 'pause' } : { event: 'command', func: 'pauseVideo', args: [] }; frame.contentWindow?.postMessage(JSON.stringify(message), url.origin); } catch { /* Native controls remain. */ }
      });
    }
    function show(item, scroll = false) {
      if (!item) return;
      [...media, fallback].filter(Boolean).forEach(node => { node.classList.toggle('is-current', node === item); if (node !== item) pause(node); });
      item.querySelectorAll('iframe[data-classic-src]').forEach(frame => { frame.src = frame.dataset.classicSrc; delete frame.dataset.classicSrc; });
      thumbs.forEach(thumb => { if (thumb.dataset.classicThumb === item.dataset.classicMedia) thumb.setAttribute('aria-current', 'true'); else thumb.removeAttribute('aria-current'); });
      if (scroll) item.scrollIntoView?.({ behavior: 'auto', block: 'nearest' });
    }
    function sync(scroll = false) {
      const variant = variants.find?.(item => String(item.id) === select?.value);
      const target = variant?.mediaId ? media.find(item => item.dataset.classicMedia === String(variant.mediaId)) : media[0];
      if (target) { fallback.hidden = true; show(target, scroll); }
      else if (variant?.image && fallback) {
        const image = fallback.querySelector('img'); Object.assign(image, { src: variant.image.src, srcset: variant.image.srcset, alt: variant.image.alt, width: variant.image.width, height: variant.image.height });
        const link = fallback.querySelector('a'); if (link) link.href = variant.image.src;
        fallback.hidden = false; show(fallback, scroll);
      } else { if (fallback) fallback.hidden = true; show(media[0]); }
    }
    function images() { return [...root.querySelectorAll('[data-classic-enlarge]')].filter(link => !link.closest('[hidden]')); }
    function setImage(link) {
      if (!link || !dialog) return;
      const image = dialog.querySelector('[data-classic-lightbox-image]'), original = link.querySelector('img');
      image.src = link.href; image.alt = original?.alt || ''; image.width = original?.width || 1600; image.height = original?.height || 1600;
      current = link; dialog.querySelectorAll('[data-classic-prev], [data-classic-next]').forEach(button => { button.hidden = images().length < 2; });
    }
    function close() { if (dialog?.open) dialog.close(); }
    on(root, 'click', event => {
      const thumb = event.target.closest('[data-classic-thumb]');
      if (thumb) { const target = media.find(item => item.dataset.classicMedia === thumb.dataset.classicThumb); if (target) { event.preventDefault(); show(target, true); } }
      const link = event.target.closest('[data-classic-enlarge]');
      if (link && dialog?.showModal) { event.preventDefault(); opener = link; setImage(link); dialog.showModal(); dialog.querySelector('.q-lb__close').focus(); }
      if (event.target.closest('[data-classic-close]')) close();
      if (event.target.closest('[data-classic-prev], [data-classic-next]')) { const all = images(), offset = event.target.closest('[data-classic-prev]') ? -1 : 1; setImage(all[(all.indexOf(current) + offset + all.length) % all.length]); }
    });
    on(dialog, 'close', () => { if (opener?.isConnected) opener.focus(); });
    on(dialog, 'keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); const all = images(); setImage(all[(all.indexOf(current) + (event.key === 'ArrowLeft' ? -1 : 1) + all.length) % all.length]); } });
    on(select, 'change', () => sync(true)); on(select, 'qtm:variant-restored', () => sync());
    on(root, 'shopify:block:select', event => { const masterBlock = [...root.querySelectorAll('[data-master-block]')].find(node => node.dataset.masterBlock === event.detail?.blockId); if (masterBlock) { const pane = masterBlock.closest('.q-pdp-pane'); if (pane?.id) location.hash = pane.id; masterBlock.scrollIntoView?.({ block: 'nearest' }); } const panel = [...root.querySelectorAll('[data-classic-tab-panel]')].find(node => node.dataset.classicTabPanel === event.detail?.blockId); const radio = panel?.previousElementSibling?.previousElementSibling; if (radio?.matches('input[type="radio"]')) radio.checked = true; });
    on(document, 'visibilitychange', () => { if (document.hidden) media.forEach(item => pause(item)); });
    root.dataset.classicReady = ''; sync();
    instances.set(root, () => { close(); life.abort(); media.forEach(item => pause(item, true)); delete root.dataset.classicReady; });
  }
  document.addEventListener('shopify:section:load', event => each(event.target, init));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
