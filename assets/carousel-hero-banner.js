/* Carousel Hero: independent instance lifecycle; decorative clones keep the peeked layout. */
(() => {
  if (window.qtmCarouselHeroBound) return;
  window.qtmCarouselHeroBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const track = root.querySelector('[data-carousel-track]');
    const viewport = root.querySelector('.q-carousel-viewport');
    const slides = Array.from(root.querySelectorAll('[data-carousel-slide]:not(.is-clone)'));
    if (!track || !viewport || !slides.length) return;
    const events = new AbortController();
    const on = (target, type, handler) => target?.addEventListener(type, handler, {signal:events.signal});
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer = null, resizeFrame = null, paused = false, hovered = false;
    const clones = [];
    if (slides.length > 1) {
      [slides.at(-1), slides[0]].forEach((slide, position) => {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.inert = true;
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('id');
        clone.removeAttribute('data-shopify-editor-block');
        clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        clone.querySelectorAll('script').forEach(node => node.remove());
        clone.querySelectorAll('input, select, button, textarea').forEach(node => node.disabled = true);
        if (position === 0) track.prepend(clone); else track.append(clone);
        clones.push(clone);
      });
    }
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    function show(next, animate = true) {
      index = (next + slides.length) % slides.length;
      const slide = slides[index];
      const offset = Math.max(0, slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2);
      track.style.transition = animate && !motion.matches ? '' : 'none';
      track.style.transform = `translateX(${-offset}px)`;
      slides.forEach((item, position) => {
        item.classList.toggle('is-active', position === index);
        item.inert = position !== index;
        item.setAttribute('aria-hidden', String(position !== index));
      });
      dots.forEach((dot, position) => dot.setAttribute('aria-current', String(position === index)));
    }
    function stop() { window.clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (!instances.has(root) || !root.isConnected || root.dataset.autoplay !== 'true' || slides.length < 2 || paused || hovered || motion.matches || document.hidden || root.contains(document.activeElement)) return;
      timer = window.setInterval(() => show(index + 1), Math.max(3000, Number(root.dataset.interval) || 5000));
    }
    on(root.querySelector('[data-carousel-prev]'), 'click', () => { stop(); show(index - 1); });
    on(root.querySelector('[data-carousel-next]'), 'click', () => { stop(); show(index + 1); });
    dots.forEach((dot, position) => on(dot, 'click', () => { stop(); show(position); }));
    const pause = root.querySelector('[data-carousel-pause]');
    on(pause, 'click', () => {
      paused = !paused;
      pause.setAttribute('aria-pressed', String(paused));
      pause.textContent = paused ? 'Resume slides' : 'Pause slides';
      start();
    });
    on(root, 'mouseenter', () => { hovered = true; stop(); });
    on(root, 'mouseleave', () => { hovered = false; start(); });
    on(root, 'focusin', stop);
    on(root, 'focusout', event => { if (!root.contains(event.relatedTarget)) queueMicrotask(start); });
    on(document, 'visibilitychange', start);
    on(motion, 'change', () => { show(index, false); start(); });
    on(window, 'resize', () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => show(index, false));
    });
    slides.forEach(slide => {
      const form = slide.querySelector('.q-add-to-cart-form');
      const select = form?.querySelector('[data-variant-input]');
      if (!select) return;
      const buttons = Array.from(slide.querySelectorAll('[data-variant-id]'));
      function updateVariant() {
        const option = select.selectedOptions[0];
        const submit = form.querySelector('[type=submit]');
        if (submit) submit.disabled = option?.dataset.available !== 'true';
        const price = slide.querySelector('.q-product-price');
        if (price && option?.dataset.price) price.textContent = option.dataset.price;
        buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.variantId === select.value)));
      }
      on(select, 'change', updateVariant);
      buttons.forEach(button => on(button, 'click', () => {
        select.value = button.dataset.variantId;
        select.dispatchEvent(new Event('change', {bubbles:true}));
      }));
      on(form, 'submit', event => {
        if (select.selectedOptions[0]?.dataset.available !== 'true') { event.preventDefault(); event.stopImmediatePropagation(); }
      });
      if (buttons.length) {
        slide.querySelector('.q-variant-selector').hidden = false;
        form.querySelector('[data-variant-fallback]').hidden = true;
      }
      updateVariant();
    });
    instances.set(root, () => {
      stop(); events.abort(); window.cancelAnimationFrame(resizeFrame);
      clones.forEach(clone => clone.remove());
      instances.delete(root);
    });
    show(0, false); start();
  }
  const roots = scope => [...(scope.matches?.('[data-carousel-id]') ? [scope] : []), ...scope.querySelectorAll('[data-carousel-id]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
