/* Transparent Hero: disposable scroll carousel, media and shared header ownership. */
(() => {
  if (window.qtmTransparentHeroBound) return;
  window.qtmTransparentHeroBound = true;
  const instances = new WeakMap(), headers = new WeakMap();
  function headerOwner(header, root) {
    let state = headers.get(header);
    if (!state) {
      state = { roots:new Map(), theme:header.getAttribute('data-theme'), over:header.classList.contains('is-over-hero') };
      headers.set(header, state);
    }
    state.roots.set(root, false);
    const update = () => {
      const visible = [...state.roots].filter(([node, active]) => active && node.isConnected)
        .sort(([a], [b]) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top));
      header.classList.toggle('is-over-hero', visible.length > 0 || state.over);
      if (visible.length) header.dataset.theme = visible[0][0].dataset.headerTheme || 'dark';
      else if (state.theme === null) header.removeAttribute('data-theme'); else header.setAttribute('data-theme', state.theme);
    };
    return {set(active) {state.roots.set(root, active);update();}, dispose() {state.roots.delete(root);update();if (!state.roots.size) headers.delete(header);}};
  }
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController(), on = (node, name, fn) => node?.addEventListener(name, fn, {signal:events.signal});
    const slides = [...root.querySelectorAll('.thb-slide')], dots = [...root.querySelectorAll('.thb-dot')];
    const track = root.querySelector('.thb-track'), toggle = root.querySelector('[data-transparent-pause]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)'), mobile = window.matchMedia('(max-width: 767px)');
    const autoplay = root.dataset.autoplay === 'true' && slides.length > 1;
    let index = 0, paused = motion.matches || (!autoplay && root.dataset.videoAutoplay === 'false'), hovered = false, focused = false, timer, scrollTimer, observer, resizeObserver, owner;
    let inView = false;
    let videoAllowed = root.dataset.videoAutoplay === 'true';
    const hidden = () => document.hidden || root.classList.contains(mobile.matches ? 'hide-mobile' : 'hide-desktop');
    function sync() {
      clearTimeout(timer);
      owner?.set(inView && !hidden());
      const stopped = paused || hidden() || hovered || focused;
      slides.forEach((slide, i) => {
        const active = index === i;
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
        if (active) slide.setAttribute('aria-current', 'true'); else slide.removeAttribute('aria-current');
        slide.querySelectorAll('video').forEach(video => {
          if (active && !stopped && videoAllowed) video.play()?.catch(() => {});
          else if (!active || stopped) video.pause();
        });
      });
      dots.forEach((dot, i) => {dot.classList.toggle('is-active', i === index);dot.setAttribute('aria-current', String(i === index));});
      if (toggle) {
        toggle.hidden = !(autoplay || root.querySelector('video'));
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? 'Resume background motion' : 'Pause background motion';
      }
      if (autoplay && !stopped) timer = setTimeout(() => go(index + 1), Math.max(3000, Number(root.dataset.autoplayMs) || 6000));
    }
    function go(next) {
      if (!slides.length) return;
      index = (next + slides.length) % slides.length;
      const left = slides[index].offsetLeft - slides[0].offsetLeft;
      track?.scrollTo({left, behavior:motion.matches ? 'auto' : 'smooth'});
      sync();
    }
    dots.forEach((dot, i) => on(dot, 'click', () => go(i)));
    on(root.querySelector('.thb-arrow--prev'), 'click', () => go(index - 1));
    on(root.querySelector('.thb-arrow--next'), 'click', () => go(index + 1));
    on(toggle, 'click', () => {paused = !paused;if (!paused) videoAllowed = true;sync();});
    on(root, 'mouseenter', () => {hovered = true;sync();});
    on(root, 'mouseleave', () => {hovered = false;sync();});
    on(root, 'focusin', () => {focused = true;sync();});
    on(root, 'focusout', event => {focused = root.contains(event.relatedTarget);sync();});
    // Scroll completion covers touch, trackpad and scrollbar navigation without racing smooth navigation.
    const settleScroll = () => {
      let closest = 0, distance = Infinity;
      slides.forEach((slide, i) => {const d = Math.abs(slide.offsetLeft - slides[0].offsetLeft - track.scrollLeft);if (d < distance) {closest = i;distance = d;}});
      if (closest !== index) {index = closest;sync();}
    };
    on(track, 'scrollend', settleScroll);
    on(track, 'scroll', () => {clearTimeout(scrollTimer);scrollTimer = setTimeout(settleScroll, 150);});
    on(root, 'keydown', event => {
      if (!event.target.matches('.thb-dot,.thb-arrow') || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : index + (event.key === 'ArrowRight' ? 1 : -1));
      dots[index]?.focus();
    });
    on(document, 'visibilitychange', sync);
    on(motion, 'change', () => {if (motion.matches) paused = true;sync();});
    on(mobile, 'change', sync);
    on(root, 'shopify:block:select', event => {
      const selected = slides.findIndex(slide => slide.dataset.blockId === event.detail?.blockId || slide === event.target);
      if (selected >= 0) {paused = true;go(selected);}
    });
    const header = document.querySelector('[data-header]') || document.querySelector('header');
    if (header && (root.dataset.headerSync === 'true' || root.dataset.headerMeasure === 'true')) {
      const measure = () => {
        const height = header.getBoundingClientRect().height || 0;
        root.style.setProperty('--thb-header-h', `${height}px`);
        root.style.setProperty('--thb-safe-offset', `${height + (Number(root.dataset.safeOffset) || 0)}px`);
      };
      measure();on(window, 'resize', measure);
      if ('ResizeObserver' in window) {resizeObserver = new ResizeObserver(measure);resizeObserver.observe(header);}
      if (root.dataset.headerSync === 'true' && 'IntersectionObserver' in window) {
        owner = headerOwner(header, root);
        observer = new IntersectionObserver(entries => entries.forEach(entry => {inView = entry.isIntersecting && entry.intersectionRatio > .1;owner.set(inView && !hidden());}), {threshold:.1});
        observer.observe(root);
      }
    }
    instances.set(root, () => {
      events.abort();clearTimeout(timer);clearTimeout(scrollTimer);observer?.disconnect();resizeObserver?.disconnect();owner?.dispose();
      root.querySelectorAll('video').forEach(video => video.pause());if (toggle) toggle.hidden = true;
      instances.delete(root);
    });
    sync();
  }
  const roots = scope => [...(scope.matches?.('[data-transparent-hero]') ? [scope] : []), ...scope.querySelectorAll('[data-transparent-hero]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
