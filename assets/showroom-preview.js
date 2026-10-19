/* Preview-only navigation for the shared demo store. Excluded from merchant packages. */
(() => {
  const themeId = document.currentScript?.dataset.showroomTheme;
  if (!/^\d+$/.test(themeId || '') || window.quadratumShowroomPreview) return;
  window.quadratumShowroomPreview = true;
  function pinAddress() {
    if (window.Shopify?.designMode) return;
    const url = new URL(location.href);
    if (url.searchParams.get('preview_theme_id') === themeId) return;
    url.searchParams.set('preview_theme_id', themeId);
    try { history.replaceState(history.state, '', url.href); } catch { /* Explicit links remain usable. */ }
  }
  function preserve(link) {
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#') || link.hasAttribute('download')) return;
    let url;
    try { url = new URL(raw, location.href); } catch { return; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (/^\/(?:admin|account|checkout|checkouts|apps|cdn)(?:\/|$)/.test(url.pathname)) return;
    // Open another design separately. pinAddress preserves this tab's own refresh URL.
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
  pinAddress();
  window.addEventListener('pageshow', () => { scan(); pinAddress(); });
  window.addEventListener('load', pinAddress);
  document.addEventListener('shopify:section:load', event => scan(event.target));
  ['click', 'auxclick'].forEach(type => document.addEventListener(type, event => {
    const link = event.target.closest?.('a[href]');
    if (link) preserve(link);
  }, true));
})();
