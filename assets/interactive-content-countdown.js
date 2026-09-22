/* Countdown display only: it does not create or end a Shopify discount. */
(() => {
  if (window.QuadratumCountdown) { window.QuadratumCountdown.mount(document); return; }
  const instances = new Map();
  const selector = '[data-q-campaign][data-mode="countdown"]';
  function mount(scope) {
    const roots = [...(scope.querySelectorAll?.(selector) || [])];
    if (scope.matches?.(selector)) roots.unshift(scope);
    roots.forEach(root => {
      if (instances.has(root)) return;
      const value = root.dataset.targetEpoch || '';
      const target = /^\d+$/.test(value) ? Number(value) * 1000 : NaN;
      const grid = root.querySelector('.q-countdown__grid');
      if (!grid || !Number.isSafeInteger(target)) return;
      const seconds = root.dataset.showSeconds === 'true';
      const editor = root.dataset.designMode === 'true' || window.Shopify?.designMode;
      const message = root.querySelector('[data-q-expired-message]');
      const stat = root.querySelector('[data-q-static]');
      const progress = root.querySelector('[data-q-time-progress]');
      const start = /^\d+$/.test(root.dataset.startEpoch || '') ? Number(root.dataset.startEpoch) * 1000 : NaN;
      const abort = new AbortController();
      let timer = null, disposed = false;
      function cancel() { if (timer !== null) clearTimeout(timer); timer = null; }
      function tick() {
        cancel();
        if (disposed || document.hidden) return;
        const remaining = Math.max(0, target - Date.now());
        if (progress && Number.isSafeInteger(start) && start < target) {
          progress.value = Math.max(0, Math.min(100, (Date.now() - start) * 100 / (target - start)));
          progress.hidden = false;
        }
        const total = Math.ceil(remaining / 1000);
        const values = [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
        ['days', 'hours', 'minutes', 'seconds'].forEach((unit, i) => {
          const number = root.querySelector('[data-q-unit="' + unit + '"] [data-q-num]');
          if (number) number.textContent = i ? String(values[i]).padStart(2, '0') : String(values[i]);
        });
        grid.hidden = false;
        if (remaining === 0) {
          root.classList.add('q-campaign--expired');
          root.querySelectorAll('[data-q-state]').forEach(node => { node.textContent = 'Ended'; });
          if (root.dataset.expiredBehavior === 'hide_section' && !editor) root.hidden = true;
          else if (root.dataset.expiredBehavior === 'show_message' || editor) {
            grid.hidden = true;
            if (stat) stat.hidden = true;
            if (message) { message.hidden = false; if (!message.textContent.trim()) message.textContent = root.dataset.expiredFallback || 'This offer has ended.'; }
          }
          return;
        }
        // Wake at the next displayed boundary or exact deadline, whichever is first.
        const unit = seconds ? 1000 : 60000;
        timer = setTimeout(tick, Math.min(remaining, remaining % unit || unit));
      }
      document.addEventListener('visibilitychange', tick, { signal: abort.signal });
      instances.set(root, () => {
        disposed = true; cancel(); abort.abort(); instances.delete(root);
        root.hidden = false; grid.hidden = true; root.classList.remove('q-campaign--expired');
        if (stat) stat.hidden = false;
        if (message) message.hidden = true;
        if (progress) progress.hidden = true;
      });
      tick();
    });
  }
  function unmount(scope) { instances.forEach((dispose, root) => { if (scope === root || scope.contains?.(root)) dispose(); }); }
  window.QuadratumCountdown = { mount, unmount };
  document.addEventListener('shopify:section:load', event => mount(event.target));
  document.addEventListener('shopify:section:unload', event => unmount(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mount(document), { once: true });
  else mount(document);
})();
