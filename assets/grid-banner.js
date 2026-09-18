/* One delegated listener supports editor insertions without retaining removed sections. */
(() => {
  if (window.qtmGridBannerEventsBound) return;
  window.qtmGridBannerEventsBound = true;
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a.q-btn');
    const root = link?.closest('[data-grid-banner]');
    if (!root || root.dataset.sendEvents !== 'true') return;
    const payload = {component: 'hero_grid', href: link.getAttribute('href')};
    window.dispatchEvent(new CustomEvent('quadratum:cta', {detail: payload}));
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({event: 'quadratum_cta', ...payload});
    }
  });
})();
