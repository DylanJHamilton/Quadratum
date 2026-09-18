/* Review media is user-controlled; automatic rotation has a disposable lifecycle. */
(() => {
  if (window.qtmReviewsBound) return;
  window.qtmReviewsBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stage = root.querySelector('[data-reviews-slideshow]');
    const track = stage?.querySelector('[data-reviews-track]');
    const slides = [...root.querySelectorAll('[data-review-slide]')];
    const dots = [...root.querySelectorAll('[data-reviews-dot]')];
    const background = root.querySelector('.q-cta-bg video');
    const toggle = root.querySelector('[data-reviews-pause]');
    const automatic = stage?.dataset.autoplay === 'true' && slides.length > 1;
    let index = 0, timer, paused = motion.matches, hovered = false, focused = false;
    const stopVideos = scope => scope.querySelectorAll('video').forEach(video => video.pause());
    function sync() {
      clearTimeout(timer);
      const stopped = paused || hovered || focused || document.hidden;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
        if (!active) stopVideos(slide);
      });
      if (track) track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((dot, i) => { if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
      if (document.hidden) stopVideos(root);
      if (background) {
        if (stopped) background.pause(); else background.play()?.catch(() => {});
      }
      if (toggle) {
        toggle.hidden = !automatic && !background;
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? 'Resume automatic motion' : 'Pause automatic motion';
      }
      if (automatic && !stopped) timer = setTimeout(() => { index = (index + 1) % slides.length; sync(); }, Math.max(3, Number(stage.dataset.interval) || 5) * 1000);
    }
    const on = (node, event, fn) => node?.addEventListener(event, fn, {signal: events.signal});
    function go(next) { if (!slides.length) return; index = (next + slides.length) % slides.length; paused = true; sync(); }
    on(root.querySelector('[data-reviews-prev]'), 'click', () => go(index - 1));
    on(root.querySelector('[data-reviews-next]'), 'click', () => go(index + 1));
    dots.forEach((dot, i) => on(dot, 'click', () => go(i)));
    on(toggle, 'click', () => { paused = !paused; sync(); });
    on(root, 'mouseenter', () => { hovered = true; sync(); });
    on(root, 'mouseleave', () => { hovered = false; sync(); });
    on(root, 'focusin', () => { focused = true; sync(); });
    on(root, 'focusout', event => { focused = root.contains(event.relatedTarget); sync(); });
    on(stage, 'keydown', event => {
      if (event.target.closest('input, textarea, select, video, [contenteditable]')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); go(index + (event.key === 'ArrowLeft' ? -1 : 1)); }
    });
    root.addEventListener('play', event => {
      if (event.target.tagName === 'VIDEO' && event.target !== background) { paused = true; sync(); }
    }, {capture: true, signal: events.signal});
    on(motion, 'change', () => { if (motion.matches) paused = true; sync(); });
    on(document, 'visibilitychange', sync);
    on(root, 'shopify:block:select', event => {
      const selected = slides.findIndex(slide => slide.dataset.blockId === event.detail?.blockId || slide === event.target || slide.contains(event.target));
      if (selected >= 0) go(selected);
    });
    if (stage) stage.dataset.ready = 'true';
    instances.set(root, () => {
      events.abort(); clearTimeout(timer); stopVideos(root);
      if (stage) delete stage.dataset.ready;
      if (track) track.style.removeProperty('transform');
      slides.forEach(slide => { slide.inert = false; slide.removeAttribute('aria-hidden'); });
      if (toggle) toggle.hidden = true;
      instances.delete(root);
    });
    sync();
  }
  const roots = scope => [...(scope.matches?.('[data-cta-reviews]') ? [scope] : []), ...scope.querySelectorAll('[data-cta-reviews]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
