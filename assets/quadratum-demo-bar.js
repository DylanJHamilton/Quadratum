/* Shared-store demo overlay. Kept outside the merchant package. */
(() => {
  const themeId = document.currentScript?.dataset.demoTheme;
  if (!/^\d+$/.test(themeId || '') || window.quadratumDemoNavigation) return;
  window.quadratumDemoNavigation = true;
  const bar = document.querySelector('.quadratum-demo-bar');
  if (!bar) return;

  // A theme cookie is shared across tabs; an explicit URL survives another tab switching it.
  function pinAddress() {
    if (window.Shopify?.designMode) return;
    const url = new URL(location.href);
    if (url.searchParams.get('preview_theme_id') === themeId) return;
    url.searchParams.set('preview_theme_id', themeId);
    try { history.replaceState(history.state, '', url.href); } catch { /* Return link still works. */ }
  }
  function preserve(link) {
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#') || link.hasAttribute('download')) return;
    let url;
    try { url = new URL(raw, location.href); } catch { return; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (/^\/(?:admin|account|checkout|checkouts|apps|cdn)(?:\/|$)/.test(url.pathname)) return;
    // Explicit return/gallery destinations must keep their own theme selection.
    if (!url.searchParams.has('preview_theme_id')) {
      url.searchParams.set('preview_theme_id', themeId);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    }
  }
  function scan(root = document) { root.querySelectorAll('a[href]').forEach(preserve); }
  let observedFrame;
  const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(positionBar) : null;
  function positionBar() {
    const frame = document.getElementById('PBarNextFrameWrapper') || document.getElementById('preview-bar-iframe');
    if (frame && frame !== observedFrame) {
      if (observedFrame) resize?.unobserve(observedFrame);
      observedFrame = frame;
      resize?.observe(frame);
    }
    const rect = frame?.getBoundingClientRect();
    const inset = rect && rect.height > 0 && rect.top < innerHeight && rect.bottom >= innerHeight - 2
      ? Math.min(innerHeight - rect.top, innerHeight / 2) : 0;
    bar.style.setProperty('--quadratum-preview-inset', `${Math.ceil(inset)}px`);
  }
  pinAddress();
  scan();
  positionBar();
  window.addEventListener('pageshow', () => { pinAddress(); positionBar(); });
  window.addEventListener('load', () => { pinAddress(); positionBar(); });
  window.addEventListener('resize', positionBar, { passive: true });
  document.addEventListener('shopify:section:load', event => scan(event.target));
  ['click', 'auxclick'].forEach(type => document.addEventListener(type, event => {
    const link = event.target.closest?.('a[href]');
    if (link) preserve(link);
  }, true));
  // Shopify may insert its preview toolbar after load; observe only its host insertion.
  const observer = new MutationObserver(positionBar);
  observer.observe(document.body, { childList: true });
})();
