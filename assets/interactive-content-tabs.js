/* Native disclosures remain usable if tab enhancement cannot load. */
(() => {
  if (window.QuadratumContentTabs) { window.QuadratumContentTabs.scan(document); return; }
  const instances = new Map(), selector = '[data-q-tac-root]';
  const hash = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch (_) { return ''; } };
  function mount(root) {
    if (instances.has(root)) return;
    const ui = root.querySelector('.q-tac__ui'), list = root.querySelector('[role=tablist]');
    const items = [...root.querySelectorAll('[data-q-tac-item]')];
    const tabs = [...root.querySelectorAll('[data-q-tac-trigger]')];
    const panels = [...root.querySelectorAll('[data-q-tac-panel]')];
    if (!items.length || items.length !== tabs.length || tabs.length !== panels.length) return;
    const summaries = items.map(item => item.querySelector('summary'));
    const controller = new AbortController(), single = root.dataset.singleOpen === 'true';
    const mobile = matchMedia('(max-width: ' + (Math.max(320, Number(root.dataset.breakpoint) || 768) - 1) + 'px)');
    const opened = new Set(items.map((item, i) => item.open ? i : -1).filter(i => i >= 0));
    let tabMode = false, selected = 0, lastMode = null, disposed = false;
    const listen = (node, name, fn, options = {}) => node.addEventListener(name, fn, { ...options, signal: controller.signal });
    function writeHash(index) {
      if (root.dataset.updateHash !== 'true') return;
      try { history.replaceState(history.state, '', '#' + encodeURIComponent(items[index].id)); } catch (_) { /* Local UI still works. */ }
    }
    function paint() {
      items.forEach((item, i) => {
        item.hidden = tabMode && selected !== i;
        const open = tabMode || opened.has(i);
        if (item.open !== open) item.open = open;
        summaries[i].hidden = tabMode;
        tabs[i].setAttribute('aria-selected', String(selected === i));
        tabs[i].tabIndex = selected === i ? 0 : -1;
        panels[i].setAttribute('role', tabMode ? 'tabpanel' : 'region');
        panels[i].setAttribute('aria-labelledby', tabMode ? tabs[i].id : summaries[i].id);
        if (tabMode) panels[i].tabIndex = 0;
        else panels[i].removeAttribute('tabindex');
      });
    }
    function select(index, user = false, focus = false) {
      if (disposed || index < 0 || index >= items.length) return;
      selected = index;
      if (single) opened.clear();
      opened.add(index);
      paint();
      if (focus) (tabMode ? tabs[index] : summaries[index]).focus({ preventScroll: true });
      if (user) writeHash(index);
    }
    function changeMode() {
      tabMode = root.dataset.layout !== 'accordion' && !(mobile.matches && root.dataset.mobile !== 'keep_tabs');
      const moveFocus = lastMode !== null && lastMode !== tabMode && root.contains(document.activeElement);
      if (moveFocus && document.activeElement.closest('[data-q-tac-item]')) {
        selected = Math.max(0, items.indexOf(document.activeElement.closest('[data-q-tac-item]')));
      }
      list.hidden = !tabMode;
      list.setAttribute('aria-orientation', root.dataset.layout === 'tabs_vertical' ? 'vertical' : 'horizontal');
      ui.classList.toggle('q-tac__ui--tabs', tabMode);
      ui.classList.toggle('q-tac__ui--accordion', !tabMode);
      ui.classList.toggle('q-tac__ui--tabs_vertical', tabMode && root.dataset.layout === 'tabs_vertical');
      if (lastMode !== null && lastMode !== tabMode) { if (single) opened.clear(); opened.add(selected); }
      paint(); lastMode = tabMode;
      if (moveFocus) (tabMode ? tabs[selected] : summaries[selected]).focus({ preventScroll: true });
    }
    tabs.forEach((tab, i) => {
      listen(tab, 'click', () => select(i, true));
      listen(tab, 'keydown', event => {
        const vertical = root.dataset.layout === 'tabs_vertical';
        const prev = vertical ? 'ArrowUp' : 'ArrowLeft', next = vertical ? 'ArrowDown' : 'ArrowRight';
        if (![prev, next, 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : i + (event.key === next ? 1 : -1) * (!vertical && getComputedStyle(list).direction === 'rtl' ? -1 : 1);
        index = (index + items.length) % items.length;
        select(index, true, true);
      });
      listen(summaries[i], 'click', event => {
        if (tabMode) return;
        event.preventDefault();
        if (opened.has(i)) opened.delete(i);
        else { if (single) opened.clear(); opened.add(i); selected = i; writeHash(i); }
        paint();
      });
      // Browser find-in-page can open a native disclosure without a click.
      listen(items[i], 'toggle', () => {
        if (tabMode || disposed || items[i].open === opened.has(i)) return;
        if (items[i].open) { if (single) opened.clear(); opened.add(i); selected = i; }
        else opened.delete(i);
        paint();
      });
    });
    function fromHash() {
      const index = items.findIndex(item => item.id === hash() || item.contains(document.getElementById(hash())));
      if (index >= 0) select(index);
    }
    listen(window, 'hashchange', fromHash);
    listen(root, 'shopify:block:select', event => {
      const item = event.target.closest('[data-q-tac-item]') || items.find(node => node.dataset.blockId === event.detail?.blockId);
      select(items.indexOf(item));
    });
    if (mobile.addEventListener) mobile.addEventListener('change', changeMode);
    else mobile.addListener(changeMode);
    instances.set(root, () => {
      disposed = true; controller.abort();
      if (mobile.removeEventListener) mobile.removeEventListener('change', changeMode);
      else mobile.removeListener(changeMode);
      list.hidden = true;
      items.forEach((item, i) => { item.hidden = false; summaries[i].hidden = false; item.open = opened.has(i); panels[i].removeAttribute('tabindex'); panels[i].setAttribute('role', 'region'); panels[i].setAttribute('aria-labelledby', summaries[i].id); });
      instances.delete(root);
    });
    changeMode(); fromHash();
  }
  function scan(scope) { if (scope.matches?.(selector)) mount(scope); scope.querySelectorAll?.(selector).forEach(mount); }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) if (event.target === root || event.target.contains?.(root)) dispose();
  });
  window.QuadratumContentTabs = { scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  else scan(document);
})();
