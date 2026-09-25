/* One global promotion/newsletter dialog. This is not a privacy or age-verification gate. */
(() => {
  'use strict';
  if (window.qtmGlobalPopupBound) return;
  window.qtmGlobalPopupBound = true;
  const STORAGE_KEY = 'qtm_global_popup_seen';
  const SESSION_KEY = 'qtm_global_popup_seen_session';
  const FIRST_KEY = 'qtm_global_popup_first_visit';
  const memory = { localStorage: new Map(), sessionStorage: new Map() };
  let popup = null, dialog = null, config = {}, openedThisPage = false;
  let lastFocusedElement = null, closeTimer = null, autoTimer = null, triggerAbort = null;
  let background = [];
  const editor = () => Boolean(window.Shopify?.designMode || document.documentElement.classList.contains('shopify-design-mode'));
  const current = () => document.getElementById('QuadratumGlobalPopup') || document.querySelector('[data-qtm-popup]');
  const boolean = value => value === true || value === 'true';
  const number = (value, fallback, min, max) => {
    const n = Number(value); return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
  };
  function storageAllowed() {
    try { return !editor() && window.Shopify?.customerPrivacy?.preferencesProcessingAllowed() === true; }
    catch { return false; }
  }
  function storage(kind, method, key, value) {
    if (editor()) return null;
    if (method === 'setItem') memory[kind].set(key, value);
    if (method === 'removeItem') memory[kind].delete(key);
    if (storageAllowed()) {
      try {
        const result = window[kind][method](key, value);
        if (method !== 'getItem' || result !== null) return result;
      } catch { /* Storage disabled: retain only this page's in-memory frequency. */ }
    }
    return method === 'getItem' ? memory[kind].get(key) ?? null : null;
  }
  function readConfig() {
    const global = window.QuadratumSettings?.popups || {}, d = popup.dataset;
    return {
      enabled: boolean(d.popupEnabled ?? global.enabled),
      trigger: d.popupTrigger || global.trigger || 'delay',
      frequency: d.popupFrequency || global.frequency || 'once_per_session',
      delay: number(d.popupDelay ?? global.delaySeconds, 8, 0, 60),
      scroll: number(d.popupScroll ?? global.scrollPercent, 45, 10, 100),
      mobile: boolean(d.popupMobile ?? global.showOnMobile),
      desktop: boolean(d.popupDesktop ?? global.showOnDesktop),
      overlay: boolean(d.popupOverlayClose ?? global.overlayClickClose),
      preview: boolean(d.popupEditorPreview ?? global.editorPreview)
    };
  }
  const isMobile = () => window.matchMedia('(max-width: 749px)').matches;
  const permitted = () => (editor() && config.preview) || (config.enabled && (isMobile() ? config.mobile : config.desktop));
  const visible = () => popup && popup.classList.contains('is-visible');
  function frequencyAllows() {
    if (openedThisPage) return false;
    if (config.trigger === 'first_visit' && (storage('localStorage', 'getItem', FIRST_KEY) || storage('localStorage', 'getItem', STORAGE_KEY))) return false;
    if (config.frequency === 'once_per_session') return storage('sessionStorage', 'getItem', SESSION_KEY) !== 'true';
    const interval = { once_per_day: 86400000, once_per_week: 604800000 }[config.frequency];
    if (!interval) return true;
    const seen = Number(storage('localStorage', 'getItem', STORAGE_KEY) || 0);
    return !seen || Date.now() - seen >= interval;
  }
  function markSeen() {
    if (editor()) return;
    storage('localStorage', 'setItem', FIRST_KEY, 'true');
    if (config.frequency === 'once_per_session') storage('sessionStorage', 'setItem', SESSION_KEY, 'true');
    else if (['once_per_day', 'once_per_week'].includes(config.frequency)) storage('localStorage', 'setItem', STORAGE_KEY, String(Date.now()));
  }
  function focusables() {
    return [...(dialog?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])') || [])]
      .filter(el => !el.closest('[hidden], [inert], [aria-hidden="true"]') && Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }
  function focusInside() {
    const feedback = dialog?.querySelector('[data-popup-feedback]');
    (feedback || focusables()[0] || dialog)?.focus({ preventScroll: true });
  }
  function containFocus(event) {
    if (visible() && !dialog.contains(event.target)) focusInside();
  }
  function keydown(event) {
    if (!visible()) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const nodes = focusables(), first = nodes[0], last = nodes[nodes.length - 1];
    if (!nodes.length) { event.preventDefault(); dialog?.focus(); }
    else if (event.shiftKey && (document.activeElement === first || !nodes.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !nodes.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
  }
  function isolate() {
    background = [];
    for (let branch = popup; branch && branch.parentElement && branch !== document.body; branch = branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling === branch || ['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) continue;
        background.push([sibling, sibling.inert]); sibling.inert = true;
      }
    }
    document.documentElement.classList.add('qtm-popup-open');
    document.body.classList.add('qtm-popup-open');
  }
  function restore() {
    for (const [node, inert] of background) node.inert = inert;
    background = [];
    document.documentElement.classList.remove('qtm-popup-open');
    document.body.classList.remove('qtm-popup-open');
    document.removeEventListener('focusin', containFocus);
    document.removeEventListener('keydown', keydown);
  }
  function open(manual = false) {
    if (popup !== current()) boot();
    if (!popup || !dialog || !permitted()) return false;
    if (visible()) return true;
    if (!manual && !frequencyAllows()) return false;
    // An automatic promotion must not interrupt another open modal.
    if (!manual && [...document.querySelectorAll('[aria-modal="true"]')].some(el => el !== dialog && !el.closest('[hidden], [aria-hidden="true"]') && el.getClientRects().length)) return false;
    window.clearTimeout(closeTimer);
    lastFocusedElement = document.activeElement;
    popup.hidden = false; popup.inert = false;
    popup.removeAttribute('inert'); popup.setAttribute('aria-hidden', 'false');
    void popup.offsetWidth;
    popup.classList.add('is-visible');
    isolate(); openedThisPage = true; markSeen();
    document.addEventListener('keydown', keydown);
    document.addEventListener('focusin', containFocus);
    window.requestAnimationFrame(() => { if (visible()) focusInside(); });
    return true;
  }
  function close() {
    if (!popup) return false;
    if (!visible()) return false;
    const closing = popup;
    popup.classList.remove('is-visible'); popup.setAttribute('aria-hidden', 'true'); popup.inert = true;
    restore();
    if (lastFocusedElement?.isConnected) lastFocusedElement.focus?.({ preventScroll: true });
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches || popup.classList.contains('qtm-popup--none');
    closeTimer = window.setTimeout(() => { closing.hidden = true; }, instant ? 0 : 220);
    return true;
  }
  function clearTriggers() { window.clearTimeout(autoTimer); triggerAbort?.abort(); triggerAbort = null; }
  function dispose() {
    clearTriggers(); window.clearTimeout(closeTimer);
    if (visible()) close();
    window.clearTimeout(closeTimer); restore();
    if (popup) { popup.hidden = true; popup.inert = true; popup.classList.remove('is-visible'); popup.setAttribute('aria-hidden', 'true'); }
    popup = null; dialog = null;
  }
  function triggers() {
    clearTriggers();
    if (editor()) { if (config.preview) autoTimer = window.setTimeout(() => open(true), 100); return; }
    if (!permitted()) return;
    if (dialog.querySelector('[data-popup-feedback]')) { open(true); return; }
    if (config.trigger === 'manual') return;
    triggerAbort = new AbortController();
    const options = { signal: triggerAbort.signal };
    if (config.trigger === 'scroll') {
      const check = () => {
        const doc = document.documentElement, distance = doc.scrollHeight - window.innerHeight;
        const progress = distance > 0 ? ((window.scrollY || doc.scrollTop) / distance) * 100 : 100;
        if (progress >= config.scroll) { clearTriggers(); open(); }
      };
      window.addEventListener('scroll', check, { ...options, passive: true }); check();
    } else if (config.trigger === 'exit_intent') {
      if (isMobile()) return;
      document.addEventListener('mouseout', event => {
        if (event.relatedTarget || event.clientY > 8) return;
        clearTriggers(); open();
      }, options);
    } else { autoTimer = window.setTimeout(() => open(), config.delay * 1000); }
  }
  function boot() {
    const next = current(); if (next === popup) return;
    dispose(); popup = next;
    if (!popup) return;
    dialog = popup.querySelector('[data-qtm-popup-dialog], [role="dialog"]');
    config = readConfig(); openedThisPage = false;
    if (dialog) triggers();
  }
  window.QuadratumPopup = {
    open: () => open(true), close,
    reset: () => { for (const key of [STORAGE_KEY, FIRST_KEY]) storage('localStorage', 'removeItem', key); storage('sessionStorage', 'removeItem', SESSION_KEY); openedThisPage = false; }
  };
  document.addEventListener('click', event => {
    const target = event.target.closest?.('[data-qtm-popup-open], [data-qtm-popup-close], [data-qtm-popup-overlay]');
    if (!target) return;
    if (target.hasAttribute('data-qtm-popup-open')) { if (open(true)) event.preventDefault(); }
    else if (popup?.contains(target) && (target.hasAttribute('data-qtm-popup-close') || config.overlay || editor())) close();
  });
  document.addEventListener('shopify:section:load', boot);
  document.addEventListener('shopify:section:unload', event => { if (popup && (event.target === popup || event.target.contains(popup))) dispose(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
  // Request the platform API without asserting or changing visitor consent.
  if (!window.Shopify?.customerPrivacy && typeof window.Shopify?.loadFeatures === 'function') {
    window.Shopify.loadFeatures([{ name: 'consent-tracking-api', version: '0.1' }], () => {});
  }
})();
