/* Optional, single-play count-up. Native text remains authoritative without JS. */
(() => {
  if (window.QuadratumStatsStrip) { window.QuadratumStatsStrip.scan(document); return; }
  const selector = '[data-q-stats-strip][data-q-counters="true"]';
  const instances = new Map();

  function parse(text) {
    const match = text.match(/^([^\d]*?)(-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)([^\d]*)$/);
    if (!match) return null;
    const value = Number(match[2].replace(/,/g, ''));
    const decimals = (match[2].split('.')[1] || '').length;
    if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER || decimals > 6) return null;
    return { value, decimals, commas: match[2].includes(','), prefix: match[1], suffix: match[3] };
  }

  function mount(root) {
    if (instances.has(root)) return;
    const items = [...root.querySelectorAll('[data-q-counter]')].map(node => {
      const display = node.querySelector('[data-q-counter-display]');
      const original = node.getAttribute('data-q-counter-text') || '';
      return { node, display, original, target: parse(original), done: false, frame: null };
    }).filter(item => item.display && item.target);
    if (!items.length) return;
    const controller = new AbortController();
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let observer;
    function finish(item) {
      if (item.frame !== null) cancelAnimationFrame(item.frame);
      item.frame = null;
      item.display.textContent = item.original;
      item.done = true;
      observer?.unobserve(item.node);
    }
    function finishAll() { items.forEach(finish); observer?.disconnect(); }
    function animate(item) {
      if (item.done) return;
      item.done = true;
      if (motion?.matches || document.hidden || !root.isConnected) { finish(item); return; }
      let started = null;
      const step = timestamp => {
        item.frame = null;
        if (controller.signal.aborted || !root.isConnected || motion?.matches || document.hidden) { finish(item); return; }
        if (started === null) started = timestamp;
        const progress = Math.min(1, Math.max(0, (timestamp - started) / 950));
        if (progress === 1) { finish(item); return; }
        const target = item.target;
        let number = (target.value * (1 - (1 - progress) ** 3)).toFixed(target.decimals);
        if (target.commas) {
          const parts = number.split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          number = parts.join('.');
        }
        item.display.textContent = target.prefix + number + target.suffix;
        item.frame = requestAnimationFrame(step);
      };
      item.frame = requestAnimationFrame(step);
    }
    const onMotion = () => { if (motion.matches) finishAll(); };
    if (motion?.addEventListener) motion.addEventListener('change', onMotion);
    else motion?.addListener?.(onMotion);
    document.addEventListener('visibilitychange', () => { if (document.hidden) finishAll(); }, { signal: controller.signal });
    instances.set(root, () => {
      controller.abort(); finishAll();
      if (motion?.removeEventListener) motion.removeEventListener('change', onMotion);
      else motion?.removeListener?.(onMotion);
      instances.delete(root);
    });
    if (motion?.matches || document.hidden || window.Shopify?.designMode || typeof requestAnimationFrame !== 'function') { finishAll(); return; }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const item = items.find(candidate => candidate.node === entry.target);
          if (item && entry.isIntersecting) { animate(item); observer.unobserve(item.node); }
        }
      }, { threshold: 0.35 });
      items.forEach(item => observer.observe(item.node));
    } else items.forEach(animate);
  }
  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) if (event.target === root || event.target.contains?.(root)) dispose();
  });
  window.QuadratumStatsStrip = { scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  else scan(document);
})();
