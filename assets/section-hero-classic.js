/* Classic Hero: one disposable controller for static and slideshow media. */
(() => {
  if (window.qtmClassicHeroBound) return;
  window.qtmClassicHeroBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    const stage = root.querySelector('[data-q-hero]');
    const slides = [...root.querySelectorAll('[data-q-hero-slide]')];
    const dots = [...root.querySelectorAll('[data-q-hero-dot]')];
    const toggle = root.querySelector('[data-classic-pause]');
    const autoplay = stage?.dataset.autoplay === 'true' && slides.length > 1;
    const hasMotion = autoplay || root.querySelector('video, iframe, .q-ken-in, .q-ken-out, .q-pan-left, .q-pan-right');
    let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let paused = motion.matches, hovered = false, focused = false, timer;
    function synchronize() {
      clearTimeout(timer);
      const hidden = document.hidden || root.classList.contains(desktop.matches ? 'q-hide-desktop' : 'q-hide-mobile');
      const stopped = paused || hidden || hovered || focused;
      root.dataset.motionPaused = String(stopped);
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
        slide.style.visibility = active ? 'visible' : 'hidden';
      });
      dots.forEach((dot, i) => { if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
      root.querySelectorAll('video, iframe[data-classic-video-src]').forEach(media => {
        const slide = media.closest('[data-q-hero-slide]');
        const playing = !stopped && (!slide || slide === slides[index]);
        if (media.tagName === 'VIDEO') {
          if (playing) media.play()?.catch(() => {}); else media.pause();
        } else {
          media.hidden = !playing;
          if (playing) { if (!media.hasAttribute('src')) media.src = media.dataset.classicVideoSrc; }
          else media.removeAttribute('src');
        }
      });
      if (toggle) {
        toggle.hidden = !hasMotion;
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? 'Resume background motion' : 'Pause background motion';
      }
      if (autoplay && !stopped) timer = setTimeout(() => { index = (index + 1) % slides.length; synchronize(); }, Math.max(3, Number(stage.dataset.interval) || 5) * 1000);
    }
    const on = (node, event, fn) => node.addEventListener(event, fn, {signal: events.signal});
    dots.forEach((dot, i) => on(dot, 'click', () => { index = i; synchronize(); }));
    if (toggle) on(toggle, 'click', () => { paused = !paused; synchronize(); });
    on(root, 'mouseenter', () => { hovered = true; synchronize(); });
    on(root, 'mouseleave', () => { hovered = false; synchronize(); });
    on(root, 'focusin', () => { focused = true; synchronize(); });
    on(root, 'focusout', event => { focused = root.contains(event.relatedTarget); synchronize(); });
    on(document, 'visibilitychange', synchronize);
    on(motion, 'change', () => { if (motion.matches) paused = true; synchronize(); });
    on(desktop, 'change', synchronize);
    on(root, 'shopify:block:select', event => {
      const selected = slides.findIndex(slide => slide.dataset.blockId === event.detail?.blockId || slide === event.target);
      if (selected >= 0) { index = selected; paused = true; synchronize(); }
    });
    instances.set(root, () => {
      events.abort(); clearTimeout(timer);
      root.querySelectorAll('video').forEach(video => video.pause());
      root.querySelectorAll('iframe[data-classic-video-src]').forEach(frame => { frame.removeAttribute('src'); frame.hidden = true; });
      root.dataset.motionPaused = 'true';
      if (toggle) toggle.hidden = true;
      instances.delete(root);
    });
    synchronize();
  }
  const roots = scope => [...(scope.matches?.('[data-classic-hero]') ? [scope] : []), ...scope.querySelectorAll('[data-classic-hero]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
