/* Native collection scrolling with one disposable controller per section. */
(() => {
  if (window.qtmCollectionListBound) return;
  window.qtmCollectionListBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const scroller = root.querySelector('[data-qcl-carousel]');
    if (!scroller) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prev = root.querySelector('[data-qcl-prev]'), next = root.querySelector('[data-qcl-next]');
    const track = scroller.querySelector('.qcl__track');
    const items = [...scroller.querySelectorAll('.qcl__item')];
    const max = () => Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const direction = () => getComputedStyle(scroller).direction === 'rtl' ? -1 : 1;
    const position = () => Math.max(0, Math.min(max(), scroller.scrollLeft * direction()));
    const update = () => { if (prev) prev.disabled = position() <= 2; if (next) next.disabled = position() >= max() - 2; };
    const go = value => scroller.scrollTo({left: direction() * Math.max(0, Math.min(max(), value)), behavior: motion.matches ? 'auto' : 'smooth'});
    const step = () => (items[0]?.getBoundingClientRect().width || scroller.clientWidth) + (parseFloat(getComputedStyle(track || scroller).columnGap) || 0);
    const on = (node, name, fn) => node?.addEventListener(name, fn, {signal: events.signal});
    on(prev, 'click', () => go(position() - step()));
    on(next, 'click', () => go(position() + step()));
    on(scroller, 'scroll', update);
    on(window, 'resize', update);
    root.addEventListener('load', update, {capture: true, signal: events.signal});
    on(root, 'shopify:block:select', event => {
      const item = items.find(item => item.dataset.blockId === event.detail?.blockId || item === event.target || item.contains(event.target));
      if (!item) return;
      const edge = scroller.getBoundingClientRect(), rect = item.getBoundingClientRect();
      go(position() + (direction() === -1 ? edge.right - rect.right : rect.left - edge.left));
    });
    const observer = 'ResizeObserver' in window ? new ResizeObserver(update) : null;
    observer?.observe(scroller); if (track) observer?.observe(track);
    [prev, next].forEach(button => { if (button) button.hidden = false; });
    instances.set(root, () => { events.abort(); observer?.disconnect(); [prev, next].forEach(button => { if (button) button.hidden = true; }); instances.delete(root); });
    update();
  }
  const roots = scope => [...(scope.matches?.('[data-qcl]') ? [scope] : []), ...scope.querySelectorAll('[data-qcl]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
