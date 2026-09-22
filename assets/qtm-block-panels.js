/* Theme Block panels: progressive native disclosure/dialog and scoped tabs. */
(() => {
  if (window.qtmBlockPanels) return;
  const selector = '[data-qtm-tabs], [data-qtm-accordion], [data-qtm-size-chart]';
  const instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  function stopMedia(container) {
    for (const media of container.querySelectorAll('video, audio')) { try { media.pause(); } catch (_) {} }
    for (const frame of container.querySelectorAll('iframe')) {
      if (!frame.dataset.qtmMediaOriginalSrc) frame.dataset.qtmMediaOriginalSrc = frame.getAttribute('src') || '';
      frame.setAttribute('src', 'about:blank');
    }
    for (const mounted of container.querySelectorAll('[data-qtm-active-media]')) mounted.remove();
  }
  function startMedia(container) {
    for (const frame of container.querySelectorAll('iframe[data-qtm-media-original-src]')) frame.setAttribute('src', frame.dataset.qtmMediaOriginalSrc);
    for (const template of container.querySelectorAll('template[data-qtm-panel-media-template]')) {
      if (template.nextElementSibling?.hasAttribute('data-qtm-active-media')) continue;
      const mounted = document.createElement('div'); mounted.dataset.qtmActiveMedia = '';
      mounted.append(template.content.cloneNode(true)); template.after(mounted);
    }
  }
  function init(root) {
    if (instances.has(root)) return;
    const abort = new AbortController(), cleanups = [];
    const on = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: abort.signal });
    const cleanup = () => { abort.abort(); cleanups.forEach(fn => fn()); stopMedia(root); root.classList.remove('qtm-panels-ready'); };
    instances.set(root, cleanup);
    const editorRoot = root.closest('.shopify-block') || root;
    if (root.hasAttribute('data-qtm-accordion')) {
      const items = [...root.querySelectorAll('details')].filter(item => item.closest('[data-qtm-accordion]') === root);
      const exclusive = root.dataset.allowMultiple !== 'true';
      const opened = items.find(item => item.open);
      if (exclusive) items.forEach(item => { if (item !== opened) item.open = false; });
      items.filter(item => item.open).forEach(startMedia);
      for (const item of items) on(item, 'toggle', () => {
        if (!item.open) { stopMedia(item); return; }
        if (exclusive) items.forEach(other => { if (other !== item) other.open = false; });
        startMedia(item);
      });
      on(editorRoot, 'shopify:block:select', event => {
        const item = event.target.closest?.('details');
        if (item && items.includes(item)) item.open = true;
        else if (items[0]) items[0].open = true;
      });
    }
    if (root.hasAttribute('data-qtm-tabs')) {
      const nav = root.querySelector('[data-qtm-tablist]');
      const panels = [...root.querySelectorAll('[data-qtm-tabpanel]')];
      const pairs = [...root.querySelectorAll('[data-qtm-tab]')].map(tab => ({ tab, panel: panels.find(panel => panel.id === tab.getAttribute('aria-controls')) })).filter(pair => pair.panel);
      const media = [...root.querySelectorAll('[data-qtm-tabmedia]')];
      if (!nav || !pairs.length) return;
      let active = pairs.find(pair => pair.tab.getAttribute('aria-selected') === 'true') || pairs[0];
      const vertical = () => root.dataset.tabsVertical === 'true' && window.innerWidth >= Number(root.dataset.tabsBreakpoint || 750);
      const orientation = () => nav.setAttribute('aria-orientation', vertical() ? 'vertical' : 'horizontal');
      const activate = (pair, focus = false) => {
        active = pair;
        for (const item of pairs) {
          const selected = item === pair;
          item.tab.setAttribute('aria-selected', String(selected)); item.tab.tabIndex = selected ? 0 : -1;
          item.panel.hidden = !selected; item.panel.setAttribute('role', 'tabpanel');
          item.panel.dataset.active = String(selected); item.panel.classList.toggle('is-active', selected);
          if (!selected) stopMedia(item.panel); else startMedia(item.panel);
        }
        for (const panel of media) {
          const selected = panel.dataset.contentTabsMediaIndex === pair.tab.dataset.contentTabsMediaIndex;
          panel.hidden = !selected; panel.classList.toggle('is-active', selected);
          if (selected) startMedia(panel); else stopMedia(panel);
        }
        if (focus) pair.tab.focus();
      };
      for (const [index, pair] of pairs.entries()) {
        on(pair.tab, 'click', () => activate(pair));
        on(pair.tab, 'keydown', event => {
          const keys = vertical() ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
          if (![...keys, 'Home', 'End'].includes(event.key)) return;
          event.preventDefault(); let next = index;
          if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = pairs.length - 1;
          else {
            let delta = event.key === keys[1] ? 1 : -1;
            const rtl = (getComputedStyle(root).direction || root.closest('[dir]')?.getAttribute('dir') || document.documentElement.dir) === 'rtl';
            if (!vertical() && rtl) delta *= -1;
            next = (index + delta + pairs.length) % pairs.length;
          }
          activate(pairs[next], true);
        });
      }
      const hash = () => {
        let id; try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        const pair = pairs.find(item => item.panel === target || item.panel.contains(target));
        if (pair) activate(pair);
      };
      on(window, 'resize', orientation, { passive: true }); on(window, 'hashchange', hash);
      on(editorRoot, 'shopify:block:select', event => { const pair = pairs.find(item => item.panel.contains(event.target)); if (pair) activate(pair); });
      root.classList.add('qtm-panels-ready'); nav.hidden = false; orientation(); activate(active); hash();
      cleanups.push(() => { nav.hidden = true; pairs.forEach(({ panel }) => { panel.hidden = false; panel.setAttribute('role', 'region'); }); media.forEach(panel => { panel.hidden = false; }); });
    }
    if (root.hasAttribute('data-qtm-size-chart')) {
      const trigger = root.querySelector('[data-product-size-chart-open]'), dialog = root.querySelector('dialog[data-product-size-chart-modal]');
      const content = root.querySelector('[data-qtm-chart-content]'), fallback = root.querySelector('[data-qtm-chart-fallback]'), destination = dialog?.querySelector('[data-qtm-chart-destination]');
      if (!trigger || !dialog || !content || !fallback || !destination || typeof dialog.showModal !== 'function') return;
      let returnFocus = null;
      const close = () => { if (dialog.open) dialog.close(); };
      on(trigger, 'click', () => {
        returnFocus = document.activeElement;
        try { dialog.showModal(); dialog.querySelector('button')?.focus(); startMedia(dialog); }
        catch (_) { fallback.append(content); fallback.hidden = false; trigger.hidden = true; root.classList.remove('qtm-panels-ready'); }
      });
      for (const button of dialog.querySelectorAll('[data-product-size-chart-close]')) on(button, 'click', close);
      on(dialog, 'cancel', event => { event.preventDefault(); close(); });
      on(dialog, 'close', () => { stopMedia(dialog); if (returnFocus?.isConnected) returnFocus.focus(); });
      destination.append(content); fallback.hidden = true; trigger.hidden = false; root.classList.add('qtm-panels-ready');
      cleanups.push(() => { const restore = dialog.open && dialog.contains(document.activeElement); close(); fallback.append(content); fallback.hidden = false; trigger.hidden = true; if (restore && returnFocus?.isConnected) returnFocus.focus(); });
    }
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.(); instances.delete(root); });
  window.qtmBlockPanels = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  const start = () => {
    boot(document);
    if ('MutationObserver' in window && document.body) new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (!node.isConnected) dispose(node);
        for (const node of record.addedNodes) boot(node);
      }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
