/* Progressive reveal only: wallet state belongs to an actual external provider. */
(() => {
  if (window.qtmWeb3CtaBound) return;
  window.qtmWeb3CtaBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const card = root.querySelector('.qw3-card');
    if (!card) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const show = () => { observer?.disconnect(); card.classList.remove('is-pending'); card.classList.add('is-visible'); };
    if (!motion.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) show(); }, {threshold: 0.1});
      card.classList.add('is-pending'); observer.observe(card);
    } else show();
    motion.addEventListener('change', () => { if (motion.matches) show(); }, {signal: events.signal});
    root.addEventListener('focusin', show, {signal: events.signal});
    root.addEventListener('shopify:block:select', show, {signal: events.signal});
    root.addEventListener('shopify:section:select', show, {signal: events.signal});
    instances.set(root, () => { events.abort(); show(); instances.delete(root); });
  }
  const roots = scope => [...(scope.matches?.('[data-web3-cta]') ? [scope] : []), ...scope.querySelectorAll('[data-web3-cta]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true}); else boot();
  document.addEventListener('shopify:section:load', e => roots(e.target).forEach(init));
  document.addEventListener('shopify:section:unload', e => roots(e.target).forEach(root => instances.get(root)?.()));
})();
