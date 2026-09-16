/* Current Sale: countdown state belongs to each merchant block. */
(() => {
  if (window.qtmCurrentSaleBound) return;
  window.qtmCurrentSaleBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController();
    const timers = [];
    let observer;
    const detail = {sectionId:root.dataset.sectionId,layout:root.dataset.layout,pageHandle:root.dataset.pageHandle};
    const emit = (name, extra = {}) => window.dispatchEvent(new CustomEvent('quadratum.cta_sale.'+name, {detail:{...detail,...extra}}));
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
        emit('view'); observer.disconnect();
      }, {threshold:[0.5]});
      observer.observe(root);
    }
    root.querySelectorAll('[data-cta="primary"]').forEach(link => link.addEventListener('click', () => emit('click_primary', {url:link.href}), {signal:events.signal}));
    root.querySelectorAll('[data-cd-end]').forEach(countdown => {
      const end = Date.parse(countdown.dataset.cdEnd);
      if (!Number.isFinite(end)) {
        countdown.hidden = root.dataset.designMode !== 'true';
        if (!countdown.hidden) countdown.textContent = 'Choose an end date for this countdown.';
        return;
      }
      let timer;
      const tick = () => {
        let remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
        for (const [unit, divisor] of [['days',86400],['hours',3600],['minutes',60],['seconds',1]]) {
          const value = Math.floor(remaining / divisor); remaining %= divisor;
          const node = countdown.querySelector('[data-cd-'+unit+']');
          if (node) node.textContent = String(value).padStart(2,'0');
        }
        if (end <= Date.now()) {
          window.clearInterval(timer);
          countdown.classList.add('is-ended');
          countdown.setAttribute('aria-label','Sale countdown ended');
          emit('countdown_end', {end:countdown.dataset.cdEnd});
        }
      };
      tick();
      if (end > Date.now()) { timer = window.setInterval(tick,1000); timers.push(timer); }
    });
    root.querySelectorAll('[role="progressbar"]').forEach(bar => emit('progress_view', {value:Number(bar.getAttribute('aria-valuenow'))}));
    instances.set(root, () => { events.abort(); observer?.disconnect(); timers.forEach(window.clearInterval); instances.delete(root); });
  }
  const roots = scope => [...(scope.matches?.('.q-cta-sale') ? [scope] : []), ...scope.querySelectorAll('.q-cta-sale')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
