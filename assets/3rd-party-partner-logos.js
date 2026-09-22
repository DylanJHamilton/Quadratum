(() => {
  'use strict';
  if (window.__qPartnerLogos) { window.__qPartnerLogos.scan(document); return; }
  const controllers = new Map();
  const selector = '[data-q-partner-logos]';
  function mount(root) {
    if (controllers.has(root)) return;
    const viewport = root.querySelector('[data-q-logos-viewport]');
    const original = root.querySelector('[data-q-logos-original]');
    const toggle = root.querySelector('[data-q-logos-toggle]');
    if (!viewport || !original || !toggle) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const eligible = root.dataset.autoplay === 'true' && root.dataset.mode !== 'grid' && original.children.length > 1 && root.dataset.editor !== 'true';
    const speed = Math.min(9500, Math.max(1000, Number(root.dataset.speed) || 4000));
    const disposers = [];
    let timer = null, stopped = false, hovered = false, focused = root.contains(document.activeElement), inView = !window.IntersectionObserver, disposed = false;
    const on = (target, type, fn) => { target.addEventListener(type, fn); disposers.push(() => target.removeEventListener(type, fn)); };
    function measure() {
      const style = getComputedStyle(viewport);
      const width = Math.max(0, viewport.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0));
      const widthValue = width + 'px';
      if (root.style.getPropertyValue('--q-logos-viewport') !== widthValue) root.style.setProperty('--q-logos-viewport', widthValue);
      const distance = original.getBoundingClientRect().width + 'px';
      if (root.style.getPropertyValue('--q-logos-distance') !== distance) root.style.setProperty('--q-logos-distance', distance);
      if (root.hasAttribute('data-q-motion-block')) root.style.setProperty('--q-logos-direction', style.direction === 'rtl' ? '1' : '-1');
    }
    function advance() {
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const current = Math.min(max, Math.abs(viewport.scrollLeft));
      const first = original.firstElementChild;
      const gap = parseFloat(getComputedStyle(original).gap) || 0;
      const step = (first?.getBoundingClientRect().width || viewport.clientWidth) + gap;
      const next = current >= max - 1 ? 0 : Math.min(max, current + step);
      const direction = getComputedStyle(viewport).direction === 'rtl' ? -1 : 1;
      viewport.scrollTo({ left: direction * next, behavior: 'smooth' });
    }
    function update() {
      if (disposed) return;
      if (timer !== null) { clearInterval(timer); timer = null; }
      const canAnimate = eligible && (root.dataset.mode !== 'strip' || viewport.scrollWidth - viewport.clientWidth > 1);
      const playing = canAnimate && !motion.matches && !document.hidden && inView && !stopped && !hovered && !focused;
      root.dataset.playing = String(playing);
      toggle.hidden = !canAnimate || motion.matches;
      toggle.setAttribute('aria-pressed', String(stopped));
      toggle.textContent = stopped ? (toggle.dataset.startLabel || 'Start logo motion') : (toggle.dataset.stopLabel || 'Stop logo motion');
      if (playing && root.dataset.mode === 'strip') timer = setInterval(advance, speed);
      if (playing && root.dataset.mode === 'marquee') viewport.scrollLeft = 0;
    }
    on(toggle, 'click', () => { stopped = !stopped; update(); });
    on(viewport, 'pointerenter', () => { hovered = root.dataset.pauseHover !== 'false'; update(); });
    on(viewport, 'pointerleave', () => { hovered = false; update(); });
    on(root, 'focusin', () => { focused = true; update(); });
    on(root, 'focusout', event => { focused = !!event.relatedTarget && root.contains(event.relatedTarget); update(); });
    on(document, 'visibilitychange', update);
    const changedMotion = () => update();
    if (motion.addEventListener) { motion.addEventListener('change', changedMotion); disposers.push(() => motion.removeEventListener('change', changedMotion)); }
    else if (motion.addListener) { motion.addListener(changedMotion); disposers.push(() => motion.removeListener(changedMotion)); }
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => { inView = entries.some(entry => entry.target === root && entry.isIntersecting); update(); });
      observer.observe(root); disposers.push(() => observer.disconnect());
    }
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => { measure(); update(); }); observer.observe(viewport); observer.observe(original); disposers.push(() => observer.disconnect());
    } else on(window, 'resize', () => { measure(); update(); });
    measure(); update();
    controllers.set(root, () => {
      disposed = true; if (timer !== null) clearInterval(timer);
      for (const dispose of disposers) dispose();
      delete root.dataset.playing; toggle.hidden = true;
      root.style.removeProperty('--q-logos-viewport'); root.style.removeProperty('--q-logos-distance');
      if (root.hasAttribute('data-q-motion-block')) root.style.removeProperty('--q-logos-direction');
      controllers.delete(root);
    });
  }
  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  window.__qPartnerLogos = { scan };
  const start = () => {
    scan(document);
    if (window.MutationObserver && document.body) new MutationObserver(records => {
      for (const [root, dispose] of controllers) if (!root.isConnected) dispose();
      for (const record of records) for (const node of record.addedNodes) if (node.isConnected) scan(node);
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of controllers) if (event.target === root || event.target.contains(root)) dispose();
  });
})();
