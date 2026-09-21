/* One-milestone rail navigation; native overflow remains usable without JS. */
(() => {
  if (window.QuadratumTimeline) { window.QuadratumTimeline.scan(document); return; }
  const instances = new Map(), selector = '[data-q-timeline]';
  const clamp = (value, maximum) => Math.max(0, Math.min(value, maximum));
  function mount(root) {
    if (instances.has(root)) return;
    const track = root.querySelector('[data-q-tl-track]');
    const items = track ? [...track.querySelectorAll('.q-tl__item')] : [];
    if (!items.length) return;
    const previous = root.querySelector('[data-q-tl-prev]'), next = root.querySelector('[data-q-tl-next]');
    const nav = root.querySelector('.q-tl__railNav'), controller = new AbortController();
    const desktop = window.matchMedia?.('(min-width: 750px)');
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const status = document.createElement('span');
    status.className = 'sr-only'; status.setAttribute('role', 'status'); root.append(status);
    let targets = [0], positions = [], maximum = 0, index = 0, rtl = false, disposed = false;
    const listen = (node, event, fn, options = {}) => node?.addEventListener(event, fn, { ...options, signal: controller.signal });
    function controls(position) {
      if (previous) previous.disabled = position <= 1;
      if (next) next.disabled = position >= maximum - 1;
    }
    function sync() {
      const position = clamp(Math.abs(track.scrollLeft), maximum);
      index = targets.reduce((best, value, i) => Math.abs(value - position) < Math.abs(targets[best] - position) ? i : best, 0);
      controls(position);
    }
    function measure() {
      if (disposed) return;
      rtl = getComputedStyle(track).direction === 'rtl';
      maximum = desktop?.matches === false ? 0 : Math.max(0, track.scrollWidth - track.clientWidth);
      const first = items[0].getBoundingClientRect();
      positions = items.map(item => {
        const rect = item.getBoundingClientRect();
        return clamp(rtl ? first.right - rect.right : rect.left - first.left, maximum);
      });
      targets = [0];
      positions.forEach(position => { if (position > targets[targets.length - 1] + 1) targets.push(position); });
      if (maximum > targets[targets.length - 1] + 1) targets.push(maximum);
      if (nav) nav.hidden = maximum <= 1;
      track.tabIndex = maximum > 1 ? 0 : -1;
      sync();
    }
    function go(target, announce = true) {
      if (disposed || maximum <= 1) return;
      index = Math.max(0, Math.min(target, targets.length - 1));
      const position = targets[index];
      if (typeof track.scrollTo === 'function') track.scrollTo({ left: position * (rtl ? -1 : 1), behavior: motion?.matches ? 'auto' : 'smooth' });
      else track.scrollLeft = position * (rtl ? -1 : 1);
      controls(position);
      if (announce) {
        const item = items[positions.findIndex(value => Math.abs(value - position) <= 1)] || items[items.length - 1];
        status.textContent = [item.querySelector('.q-tl__date')?.textContent, item.querySelector('.q-tl__itemTitle')?.textContent].filter(Boolean).join(' — ') || 'Milestone ' + (items.indexOf(item) + 1);
      }
    }
    listen(previous, 'click', () => go(index - 1));
    listen(next, 'click', () => go(index + 1));
    listen(track, 'scroll', sync, { passive: true });
    listen(track, 'keydown', event => {
      if (event.target !== track || maximum <= 1 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') go(0);
      else if (event.key === 'End') go(targets.length - 1);
      else go(index + (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1));
    });
    listen(window, 'resize', measure);
    listen(root, 'shopify:block:select', event => {
      const item = event.target.closest('.q-tl__item');
      const itemIndex = items.indexOf(item);
      if (itemIndex < 0) return;
      measure();
      const target = targets.findIndex(value => Math.abs(value - positions[itemIndex]) <= 1);
      go(target < 0 ? targets.length - 1 : target, false);
    });
    if (desktop?.addEventListener) desktop.addEventListener('change', measure);
    else desktop?.addListener?.(measure);
    const observer = window.ResizeObserver ? new ResizeObserver(measure) : null;
    observer?.observe(track);
    instances.set(root, () => {
      disposed = true; controller.abort(); observer?.disconnect(); status.remove();
      if (desktop?.removeEventListener) desktop.removeEventListener('change', measure);
      else desktop?.removeListener?.(measure);
      if (nav) nav.hidden = true;
      track.tabIndex = 0;
      instances.delete(root);
    });
    measure();
  }
  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) if (event.target === root || event.target.contains?.(root)) dispose();
  });
  window.QuadratumTimeline = { scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  else scan(document);
})();
