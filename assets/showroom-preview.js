/* Preview-only navigation for the shared demo store. Excluded from merchant packages. */
(() => {
  const themeId = document.currentScript?.dataset.showroomTheme;
  if (!/^\d+$/.test(themeId || '') || window.quadratumShowroomPreview) return;
  window.quadratumShowroomPreview = true;
  function preserve(link) {
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#') || link.hasAttribute('download')) return;
    let url;
    try { url = new URL(raw, location.href); } catch { return; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (/^\/(?:admin|account|checkout|checkouts|apps|cdn)(?:\/|$)/.test(url.pathname)) return;
    // Keep the showroom tab intact: Shopify preview cookies are shared across tabs.
    const targetTheme = url.searchParams.get('preview_theme_id');
    if (targetTheme && targetTheme !== themeId) {
      link.setAttribute('target', '_blank');
      link.relList.add('noopener');
      const label = link.getAttribute('aria-label') || link.textContent.trim();
      if (!label.includes('opens in a new tab')) link.setAttribute('aria-label', label + ' (opens in a new tab)');
      return;
    }
    // An explicit brand preview is intentional and must never become ULTIMA.
    if (!url.searchParams.has('preview_theme_id')) {
      url.searchParams.set('preview_theme_id', themeId);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    }
  }
  function scan(root = document) { root.querySelectorAll('a[href]').forEach(preserve); }
  scan();
  window.addEventListener('pageshow', () => scan());
  document.addEventListener('shopify:section:load', event => scan(event.target));
  ['click', 'auxclick'].forEach(type => document.addEventListener(type, event => {
    const link = event.target.closest?.('a[href]');
    if (link) preserve(link);
  }, true));
})();
