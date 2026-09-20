/* Existing product slider controls; native scrolling and card purchase contracts are unchanged. */
(() => {
  if (window.qtmProductSliderReady) return;
  window.qtmProductSliderReady = true;
  const instances = new WeakMap(), selector = '[data-product-slider]';
  const each = (scope, fn) => { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); };
  function init(root) {
    if (instances.has(root)) return;
    const frame = root.querySelector('[data-product-slider-controls]'), track = root.querySelector('.q-product-slider__track');
    if (!frame || !track) return;
    const lifecycle = new AbortController(), motion = matchMedia('(prefers-reduced-motion: reduce)');
    const on = (node, type, fn) => node.addEventListener(type, fn, { signal: lifecycle.signal });
    const slides = [...track.querySelectorAll('.q-product-slider__slide')], prev = frame.querySelector('[data-q-carousel-prev]'), next = frame.querySelector('[data-q-carousel-next]'), dots = frame.querySelector('[data-product-slider-dots]'), pause = frame.querySelector('[data-product-slider-pause]');
    let timer, paused = false, hover = false, focused = false;
    const max = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const step = () => slides[0]?.getBoundingClientRect().width + (parseFloat(getComputedStyle(track.firstElementChild).gap) || 0) || track.clientWidth;
    const isRTL = () => getComputedStyle(track).direction === 'rtl';
    const position = () => Math.abs(track.scrollLeft);
    const canRun = () => frame.dataset.autoplay === 'true' && !paused && !motion.matches && !document.hidden && !hover && !focused && max() > 1 && (frame.dataset.loop === 'true' || position() < max() - 2);
    function schedule() { clearTimeout(timer); if (canRun()) timer = setTimeout(() => { move(1); schedule(); }, Math.max(2000, Number(frame.dataset.autoplaySpeed) || 4500)); }
    function sync() {
      const atEnd = position() >= max() - 2;
      if (prev) prev.disabled = max() < 1 || (frame.dataset.loop !== 'true' && position() < 2);
      if (next) next.disabled = max() < 1 || (frame.dataset.loop !== 'true' && atEnd);
      const last = Math.ceil(max() / (step() || 1));
      const index = atEnd ? last : Math.round(position() / (step() || 1));
      dots?.querySelectorAll('button').forEach((button, i) => { button.hidden = i > last; button.setAttribute('aria-current', String(i === index)); });
    }
    function scrollTo(value) { track.scrollTo({ left: (isRTL() ? -1 : 1) * Math.max(0, Math.min(max(), value)), behavior: motion.matches ? 'auto' : 'smooth' }); }
    function move(direction) {
      let target = position() + direction * step();
      if (frame.dataset.loop === 'true' && (direction > 0 && position() >= max() - 2 || direction < 0 && position() < 2)) target = direction > 0 ? 0 : max();
      scrollTo(target);
    }
    root.querySelectorAll('.q-product-slider__nav').forEach(node => { node.hidden = false; });
    if (dots) slides.forEach((slide, i) => { const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', 'Scroll to product ' + (i + 1)); on(button, 'click', () => scrollTo(i * step())); dots.append(button); });
    if (pause) { pause.hidden = false; on(pause, 'click', () => { paused = !paused; pause.setAttribute('aria-pressed', String(paused)); pause.textContent = paused ? 'Resume automatic sliding' : 'Pause automatic sliding'; schedule(); }); }
    if (prev) on(prev, 'click', () => move(-1));
    if (next) on(next, 'click', () => move(1));
    on(track, 'keydown', event => { if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); if (event.key === 'Home') scrollTo(0); else if (event.key === 'End') scrollTo(max()); else move((event.key === 'ArrowRight' ? 1 : -1) * (isRTL() ? -1 : 1)); });
    on(track, 'scroll', () => { sync(); schedule(); });
    on(root, 'mouseenter', () => { hover = frame.dataset.pauseOnHover === 'true'; schedule(); });
    on(root, 'mouseleave', () => { hover = false; schedule(); });
    on(root, 'focusin', () => { focused = frame.dataset.pauseOnFocus === 'true'; schedule(); });
    on(root, 'focusout', event => { focused = root.contains(event.relatedTarget) && frame.dataset.pauseOnFocus === 'true'; schedule(); });
    on(document, 'visibilitychange', schedule);
    on(window, 'resize', () => { sync(); schedule(); });
    motion.addEventListener?.('change', schedule);
    on(root, 'shopify:block:select', event => { const i = slides.findIndex(slide => slide.contains(event.target)); if (i >= 0) { paused = true; if (pause) { pause.setAttribute('aria-pressed','true'); pause.textContent = 'Resume automatic sliding'; } scrollTo(i * step()); schedule(); } });
    sync(); schedule();
    instances.set(root, () => { lifecycle.abort(); clearTimeout(timer); motion.removeEventListener?.('change', schedule); dots?.replaceChildren(); root.querySelectorAll('.q-product-slider__nav, [data-product-slider-pause]').forEach(node => { node.hidden = true; }); });
  }
  document.addEventListener('shopify:section:load', event => each(event.target, init));
  document.addEventListener('shopify:section:unload', event => each(event.target, root => { instances.get(root)?.(); instances.delete(root); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => each(document, init), { once: true }); else each(document, init);
})();
