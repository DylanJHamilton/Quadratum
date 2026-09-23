/* Featured Product Hero: progressive motion and native commerce enhancement. */
(() => {
  if (window.qtmFeaturedHeroBound) return;
  window.qtmFeaturedHeroBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const background = root.querySelector('.fp-bg');
    let observer, frame;
    const reveal = () => {
      observer?.disconnect();
      root.classList.remove('fp-reveal-ready');
      root.querySelectorAll('[data-reveal]').forEach(node => node.classList.add('is-in'));
    };
    if (root.dataset.revealEnabled === 'true' && !motion.matches && 'IntersectionObserver' in window) {
      try {
        observer = new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }), {threshold:0.15});
        root.classList.add('fp-reveal-ready');
        root.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
      } catch (_) { reveal(); }
    }
    const scroll = () => {
      if (frame || !background || root.dataset.parallaxEnabled !== 'true' || motion.matches || document.hidden) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = root.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2 - window.innerHeight / 2;
        const strength = Math.max(0, Math.min(30, Number(root.dataset.parallaxStrength) || 0));
        background.style.setProperty('--fp-parallax', Math.max(-60, Math.min(60, -midpoint * strength / 100))+'px');
      });
    };
    const playback = () => {
      if (motion.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = null;
        background?.style.removeProperty('--fp-parallax');
      }
      if (motion.matches) reveal();
      root.querySelectorAll('video').forEach(video => {
        if (motion.matches || document.hidden) video.pause();
        else if (video.autoplay) video.play()?.catch(() => {});
      });
      scroll();
    };
    window.addEventListener('scroll', scroll, {passive:true, signal:events.signal});
    window.addEventListener('resize', scroll, {passive:true, signal:events.signal});
    document.addEventListener('visibilitychange', playback, {signal:events.signal});
    motion.addEventListener('change', playback, {signal:events.signal});
    root.querySelectorAll('.fp-atc-form').forEach(form => {
      const select = form.querySelector('[data-fp-variant]');
      if (!select) return;
      const update = () => {
        const selected = select.selectedOptions[0];
        form.querySelector('[type=submit]').disabled = selected?.dataset.available !== 'true';
        form.querySelector('[data-fp-price]').textContent = selected ? '— '+selected.dataset.price : '';
      };
      select.addEventListener('change', update, {signal:events.signal});
      form.addEventListener('submit', event => {
        update();
        if (select.selectedOptions[0]?.dataset.available !== 'true') { event.preventDefault(); event.stopImmediatePropagation(); }
      }, {signal:events.signal});
      update();
    });
    instances.set(root, () => {
      events.abort(); observer?.disconnect(); cancelAnimationFrame(frame); reveal();
      background?.style.removeProperty('--fp-parallax');
      root.querySelectorAll('video').forEach(video => video.pause());
      instances.delete(root);
    });
    playback();
  }
  const roots = scope => [...(scope.matches?.('[data-featured-product-hero]') ? [scope] : []), ...scope.querySelectorAll('[data-featured-product-hero]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
