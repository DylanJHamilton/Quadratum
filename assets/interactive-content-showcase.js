/* Pinned local runtime; isolate registration from Shopify media and preserve poster/file fallback. */
(() => {
  if (window.QuadratumShowcase) { window.QuadratumShowcase.scan(document); return; }
  const selector = '[data-q-showcase]', instances = new Map();
  let runtime;
  function ensureRuntime(runtimeURL) {
    if (window.customElements?.get('qtm-model-viewer')) return Promise.resolve();
    if (runtime) return runtime;
    runtime = new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.type = 'module'; script.src = runtimeURL;
      const timeout = setTimeout(() => finish(new Error('3D runtime timed out')), 15000);
      function finish(error) {
        clearTimeout(timeout); script.onload = null; script.onerror = null;
        if (error) { script.remove(); runtime = null; reject(error); } else resolve();
      }
      script.onload = () => finish(window.customElements?.get('qtm-model-viewer') ? null : new Error('3D runtime unavailable'));
      script.onerror = () => finish(new Error('3D runtime failed')); document.head.append(script);
    });
    return runtime;
  }
  function mount(root) {
    if (instances.has(root)) return;
    const model = root.querySelector('[data-q-model-viewer]'); if (!model) return;
    const abort = new AbortController(), motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const message = root.querySelector('[data-q-model-message]'), fill = root.querySelector('[data-q-loading-fill]');
    let disposed = false, started = false, observer, visible = !window.IntersectionObserver;
    const listen = (node, event, fn) => node.addEventListener(event, fn, { signal: abort.signal });
    function rotate() {
      model.toggleAttribute('auto-rotate', !disposed && visible && !document.hidden && !motion?.matches && !window.Shopify?.designMode && root.dataset.autoRotate === 'true' && !root.classList.contains('has-error'));
    }
    function failure() {
      if (disposed) return;
      root.classList.remove('is-loading', 'is-ready'); root.classList.add('has-error');
      if (message) message.hidden = false; model.removeAttribute('auto-rotate');
    }
    function loaded() {
      if (disposed) return;
      root.classList.remove('is-loading', 'has-error'); root.classList.add('is-ready');
      if (message) message.hidden = true; if (fill) fill.style.width = '100%'; rotate();
    }
    function start() {
      if (disposed || started) return; started = true; root.classList.add('is-loading');
      ensureRuntime(root.dataset.modelRuntime).then(() => { if (!disposed && model.loaded) loaded(); }, failure);
    }
    listen(model, 'load', loaded); listen(model, 'error', failure);
    listen(model, 'progress', event => {
      const progress = Number(event.detail?.totalProgress);
      if (fill && Number.isFinite(progress)) fill.style.width = Math.round(Math.max(0, Math.min(1, progress)) * 100) + '%';
    });
    listen(document, 'visibilitychange', rotate); motion?.addEventListener?.('change', rotate);
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        if (visible) start(); rotate();
      }); observer.observe(root);
    } else start();
    rotate();
    instances.set(root, () => {
      disposed = true; abort.abort(); observer?.disconnect(); motion?.removeEventListener?.('change', rotate);
      model.removeAttribute('auto-rotate'); model.pause?.();
      root.classList.remove('is-loading', 'is-ready', 'has-error'); if (message) message.hidden = false;
      instances.delete(root);
    });
  }
  function scan(scope) { if (scope.matches?.(selector)) mount(scope); scope.querySelectorAll?.(selector).forEach(mount); }
  function unload(scope) { for (const [root, dispose] of instances) if (root === scope || scope.contains(root)) dispose(); }
  window.QuadratumShowcase = { scan, unload };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true }); else scan(document);
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => unload(event.target));
})();
