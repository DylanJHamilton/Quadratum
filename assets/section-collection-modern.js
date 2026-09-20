/* Retained legacy host adapter. Main Collection Simple uses the native host controller directly. */
(() => {
  'use strict';
  if (window.qtmLegacyCollections) return;
  const instances = new Map(), selector = '.q-collection-modern[id]:not(.q-collection-simple)';
  // Native forms, drawers and pagination share the active implementation.
  const scriptURL = document.currentScript?.src;
  if (!window.qtmCollectionHosts && scriptURL && !document.querySelector('script[data-qtm-collection-controller]')) {
    const script = document.createElement('script');
    script.dataset.qtmCollectionController = '';
    script.src = new URL('section-collection-simple.js', scriptURL).href;
    document.head.append(script);
  }
  function init(root) {
    if (instances.has(root)) return;
    const life = new AbortController(), on = (node, event, fn) => node?.addEventListener(event, fn, { signal: life.signal });
    const host = root.querySelector('[data-qcm-qv]'), inner = host?.querySelector('[data-qcm-qv-inner]');
    let request, opener, disposed = false, version = 0;
    function close(restore = true) {
      version++; request?.abort();
      if (host) { host.hidden = true; host.setAttribute('aria-hidden','true'); }
      if (inner) inner.replaceChildren();
      if (restore && opener?.isConnected) opener.focus();
      opener = null;
    }
    on(window, 'qtm:collection-modal-open', event => { if (event.detail !== host) close(false); });
    function focusables() { return [...host.querySelectorAll('button:not(:disabled),a[href],select:not(:disabled),input:not([type=hidden]):not(:disabled)')].filter(el => !el.closest('[hidden]')); }
    if (host && inner) { host.setAttribute('role','dialog'); host.setAttribute('aria-modal','true'); host.setAttribute('aria-label','Product quick view'); host.tabIndex = -1; }
    async function quickView(button) {
      if (!host || !inner || root.dataset.qcmQvEnabled !== 'true') return;
      const card = button.closest('[data-qcmc]'), path = card?.dataset.productUrl;
      if (!path) return;
      const url = new URL(path, location.href);
      if (url.origin !== location.origin) return;
      window.dispatchEvent(new CustomEvent('qtm:collection-modal-open', { detail: host }));
      close(false); const current = ++version; request = new AbortController(); opener = button;
      host.hidden = false; host.setAttribute('aria-hidden','false'); inner.textContent = 'Loading product…';
      (host.querySelector('[data-qcm-qv-close]') || host).focus();
      url.searchParams.set('section_id','collection-modern-quick-view');
      try {
        const response = await fetch(url.href, { credentials:'same-origin', signal:request.signal });
        if (!response.ok) throw new Error('Product request failed');
        const doc = new DOMParser().parseFromString(await response.text(),'text/html');
        if (disposed || current !== version || host.hidden || !root.isConnected) return;
        const fragment = doc.querySelector('[data-qcm-qv-fragment]');
        if (!fragment) throw new Error('Missing product');
        fragment.dataset.qcmQvMode = root.dataset.qcmQvGalleryMode === 'hover' ? 'hover' : 'slider';
        inner.replaceChildren(fragment);
      } catch (error) { if (!disposed && current === version && error.name !== 'AbortError') inner.textContent = 'Unable to load this product. Close quick view and use the product link.'; }
    }
    on(document,'keydown',event => {
      if (!host || host.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const items = focusables(), first = items[0] || host, last = items.at(-1) || host;
        if (event.shiftKey && (document.activeElement === first || document.activeElement === host)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    on(document,'focusin',event => { if (host && !host.hidden && !host.contains(event.target)) host.focus(); });
    on(root,'change',event => {
      if (!event.target.matches('[data-qcm-qv-variant]')) return;
      const option = event.target.selectedOptions[0], fragment = event.target.closest('[data-qcm-qv-fragment]');
      fragment.querySelector('.qcmQv__priceNow').textContent = option.dataset.price || '';
      const compare = fragment.querySelector('.qcmQv__priceWas');
      compare.hidden = !option.dataset.compare; compare.querySelector('s').textContent = option.dataset.compare || '';
      fragment.querySelector('button[type=submit]').disabled = option.disabled;
    });
    const selected = new Map();
    function updateSelection() {
      const tray = root.querySelector('[data-qcm-compare]');
      if (!tray) return;
      tray.hidden = selected.size === 0;
      tray.querySelector('[data-qcm-compare-count]').textContent = String(selected.size);
      const links = tray.querySelector('[data-qcm-selected-links]'); links.replaceChildren();
      for (const item of selected.values()) { const a = document.createElement('a'); a.href = item.url; a.textContent = item.title; a.className = 'qcm__btn'; links.append(a); }
      root.querySelectorAll('[data-qcm-compare-toggle]').forEach(button => {
        const active = selected.has(button.closest('[data-qcmc]')?.dataset.productHandle);
        button.setAttribute('aria-pressed',String(active)); button.textContent = active ? (button.dataset.labelSelected || 'Selected') : (button.dataset.labelSelect || 'Select');
      });
    }
    const storageKey = 'qcm:prefs:' + root.id;
    let prefs = {};
    try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (saved && typeof saved === 'object' && !Array.isArray(saved)) prefs = saved; } catch (_) { /* Native layout remains. */ }
    const layout = root.querySelector('[data-qcm-view]');
    function applyPrefs() {
      if (!layout) return;
      if (['grid','list','compact'].includes(prefs.view)) { root.classList.toggle('is-list',prefs.view === 'list'); root.classList.toggle('density-compact',prefs.view === 'compact'); }
      if (Number.isFinite(prefs.cols)) { prefs.cols = Math.max(1,Math.min(6,Math.round(prefs.cols))); root.style.setProperty('--qcm-cols-d',prefs.cols); }
      layout.querySelectorAll('[data-qcm-view-mode]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.qcmViewMode === prefs.view)));
      const readout = layout.querySelector('[data-qcm-cols-val]'); if (readout) readout.textContent = String(prefs.cols || parseInt(getComputedStyle(root).getPropertyValue('--qcm-cols-d')) || 4);
    }
    applyPrefs();
    on(root,'click',event => {
      const target = event.target;
      const qv = target.closest('[data-qcm-quick-view]'); if (qv) { event.preventDefault(); quickView(qv); return; }
      if (target.closest('[data-qcm-qv-close]')) { close(); return; }
      const arrow = target.closest('[data-qcmc-prev],[data-qcmc-next],[data-qcm-qv-prev],[data-qcm-qv-next]');
      if (arrow) {
        event.preventDefault(); const slider = arrow.closest('[data-qcmc-slider],[data-qcm-qv-slider]');
        const track = slider?.querySelector('[data-qcmc-track],[data-qcm-qv-track]'); if (!track?.children.length) return;
        const prev = arrow.matches('[data-qcmc-prev],[data-qcm-qv-prev]');
        const index = ((Number(slider.dataset.qcmcIndex) || 0) + (prev ? -1 : 1) + track.children.length) % track.children.length;
        slider.dataset.qcmcIndex = index; track.style.transform = `translateX(-${index * 100}%)`; return;
      }
      const choice = target.closest('[data-qcm-view-mode],[data-qcm-cols-step]');
      if (choice && layout?.contains(choice)) {
        if (choice.dataset.qcmViewMode) prefs.view = choice.dataset.qcmViewMode;
        if (choice.dataset.qcmColsStep) prefs.cols = (prefs.cols || parseInt(getComputedStyle(root).getPropertyValue('--qcm-cols-d')) || 4) + Number(choice.dataset.qcmColsStep);
        applyPrefs(); try { localStorage.setItem(storageKey,JSON.stringify(prefs)); } catch (_) {} return;
      }
      if (root.dataset.qcmEnableCompare === 'true' && root.querySelector('[data-qcm-compare]')) {
        const button = target.closest('[data-qcm-compare-toggle]');
        if (button) {
          const card = button.closest('[data-qcmc]'), key = card?.dataset.productHandle;
          if (!key || !card.dataset.productUrl) return;
          const url = new URL(card.dataset.productUrl,location.href); if (url.origin !== location.origin) return;
          if (selected.has(key)) selected.delete(key); else selected.set(key,{url:url.href,title:card.dataset.productTitle || key}); updateSelection();
        } else if (target.closest('[data-qcm-compare-clear]')) { selected.clear(); updateSelection(); }
      }
    });
    instances.set(root,() => { disposed = true; close(false); life.abort(); selected.clear(); instances.delete(root); });
  }
  function boot(scope = document) { if (scope.matches?.(selector)) init(scope); scope.querySelectorAll(selector).forEach(init); window.qtmCollectionHosts?.boot(scope); }
  window.qtmLegacyCollections = { boot };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',() => boot(),{once:true}); else boot();
  document.addEventListener('shopify:section:load',event => boot(event.target));
  document.addEventListener('shopify:section:unload',event => { for (const [root,dispose] of instances) if (root === event.target || event.target.contains(root)) dispose(); });
})();
