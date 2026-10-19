/* Section-rendered HTML does not execute scripts. Load 3D support on demand. */
(() => {
  'use strict';
  if (window.qtmProductMedia) return;
  let pending;
  const viewers = new WeakMap();
  function load() {
    if (window.Shopify?.ModelViewerUI && customElements.get('model-viewer')) return Promise.resolve();
    if (pending) return pending;
    pending = new Promise((resolve, reject) => {
      let finished = false;
      const timer = setTimeout(() => finish(new Error('Model viewer timed out')), 15000);
      function finish(error) {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        if (error) reject(error);
        else resolve();
      }
      if (!window.Shopify?.loadFeatures) { finish(new Error('Shopify media loader unavailable')); return; }
      window.Shopify.loadFeatures([{ name: 'model-viewer-ui', version: '1.0', onLoad(errors) {
        if (errors) { finish(new Error('Model viewer unavailable')); return; }
        customElements.whenDefined('model-viewer').then(() => finish());
      } }]);
    }).catch(error => { pending = null; throw error; });
    return pending;
  }
  function boot(scope = document) {
    const roots = [...scope.querySelectorAll('[data-product-media-root]')];
    if (scope.matches?.('[data-product-media-root]')) roots.unshift(scope);
    return Promise.all(roots.map(async root => {
      if (!root.querySelector('model-viewer')) return;
      root.querySelector('[data-model-load-error]')?.remove();
      try {
        if (!document.querySelector('link[data-qtm-model-style]')) {
          const style = document.createElement('link');
          style.rel = 'stylesheet'; style.dataset.qtmModelStyle = '';
          style.href = 'https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css';
          document.head.append(style);
        }
        await load();
        if (!root.isConnected) return;
        root.querySelectorAll('model-viewer').forEach(model => {
          if (!viewers.has(model)) viewers.set(model, new window.Shopify.ModelViewerUI(model));
        });
      }
      catch (_) {
        if (!root.isConnected || root.querySelector('[data-model-load-error]')) return;
        const status = document.createElement('p');
        status.dataset.modelLoadError = '';
        status.setAttribute('role', 'status');
        status.textContent = root.dataset.modelError;
        root.querySelector('model-viewer').parentElement.append(status);
      }
    }));
  }
  function stop(scope) {
    scope.querySelectorAll('video, audio').forEach(media => media.pause());
    scope.querySelectorAll('iframe').forEach(frame => frame.removeAttribute('src'));
    scope.querySelectorAll('model-viewer').forEach(model => {
      model.pause?.();
      viewers.get(model)?.destroy?.();
      viewers.delete(model);
    });
  }
  window.qtmProductMedia = { boot, stop };
})();
