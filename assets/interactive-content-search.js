/* Section-specific predictive search; native form and query links remain usable. */
(() => {
  if (window.QuadratumContentSearch) { window.QuadratumContentSearch.mount(document); return; }
  const instances = new Map(), selector = '[data-qps-host]';
  const recentKey = 'qps_recent_terms_v1';
  function mount(scope) {
    const roots = [...(scope.querySelectorAll?.(selector) || [])];
    if (scope.matches?.(selector)) roots.unshift(scope);
    roots.forEach(root => {
      if (instances.has(root)) return;
      const input = root.querySelector('[data-qps-input]'), panel = root.querySelector('[data-qps-panel]');
      const inner = root.querySelector('[data-qps-panel-inner]'), form = root.querySelector('form');
      if (!input || !panel || !inner || !form) return;
      const status = root.querySelector('[data-qps-status]'), recent = root.querySelector('[data-qps-recent]');
      const abort = new AbortController(), events = { signal: abort.signal };
      const integer = (key, fallback, min, max) => Math.max(min, Math.min(max, Number(root.dataset[key]) || fallback));
      const minChars = integer('minChars', 2, 1, 6), debounce = integer('debounce', 200, 0, 1000);
      const limits = {product:Number(root.dataset.limitProducts),collection:Number(root.dataset.limitCollections),article:Number(root.dataset.limitArticles),page:Number(root.dataset.limitPages)};
      const scopeSelect = root.querySelector('[data-qps-scope]');
      const scopeType = {products_only:'product',articles_only:'article',pages_only:'page',collections_only:'collection'}[root.dataset.scope];
      const types = Object.keys(limits).filter(type => limits[type] > 0 && (scopeSelect || !scopeType || type === scopeType));
      const limit = Math.min(10, Math.max(integer('max', 8, 1, 16), ...types.map(type => limits[type])));
      let timer = null, timeout = null, request = null, generation = 0, disposed = false, composing = false, skipFocus = false;
      function announce(text) { if (status) status.textContent = text; }
      function cancel() {
        generation++; clearTimeout(timer); clearTimeout(timeout); timer = timeout = null;
        request?.abort(); request = null; input.removeAttribute('aria-busy');
      }
      function close() { cancel(); panel.hidden = true; input.setAttribute('aria-expanded', 'false'); announce(''); }
      function fullSearch(term) {
        const url = new URL(form.action, location.origin); url.searchParams.set('q', term);
        const type = form.querySelector('[name="type"]')?.value;
        if (type) url.searchParams.set('type', type);
        return url.href;
      }
      function readRecent() {
        try {
          const data = JSON.parse(localStorage.getItem(recentKey) || '[]');
          return Array.isArray(data) ? data.filter(item => typeof item === 'string' && item.trim() && item.length <= 200).slice(0, 6) : [];
        } catch (_) { return []; }
      }
      function saveRecent() {
        if (root.dataset.showRecent !== 'true') return;
        const term = input.value.trim().slice(0, 200); if (!term) return;
        try { localStorage.setItem(recentKey, JSON.stringify([term, ...readRecent().filter(x => x.toLowerCase() !== term.toLowerCase())].slice(0, 6))); } catch (_) { /* Storage is optional. */ }
      }
      function loadRecent() {
        if (!recent) return;
        const chips = recent.querySelector('[data-qps-recent-chips]'), terms = readRecent();
        chips.replaceChildren(); recent.hidden = !terms.length;
        terms.forEach(term => {
          const a = document.createElement('a'); a.className = 'q-ps__chip'; a.href = fullSearch(term);
          a.dataset.qpsChip = ''; a.dataset.term = term; a.textContent = term; chips.append(a);
        });
      }
      function run() {
        close(); inner.replaceChildren();
        const term = input.value.trim();
        const selectedScope = scopeSelect?.selectedOptions[0]?.dataset.resourceType;
        const requestTypes = selectedScope && selectedScope !== 'all' ? types.filter(type => type === selectedScope) : types;
        if (composing || term.length < minChars || !requestTypes.length) return;
        const version = generation;
        timer = setTimeout(async () => {
          timer = null;
          if (disposed || version !== generation) return;
          const controller = new AbortController(); request = controller;
          input.setAttribute('aria-busy', 'true'); announce('Loading search suggestions.');
          timeout = setTimeout(() => {
            if (version !== generation || disposed) return;
            close(); announce('Search suggestions are unavailable. Use the Search button.');
          }, 10000);
          try {
            const base = root.dataset.suggestUrl || ((window.Shopify?.routes?.root || '/') + 'search/suggest');
            const url = new URL(base, location.origin);
            url.searchParams.set('q', term); url.searchParams.set('section_id', root.dataset.sectionId);
            url.searchParams.set('resources[type]', requestTypes.join(',')); url.searchParams.set('resources[limit]', String(limit));
            url.searchParams.set('resources[limit_scope]', 'each');
            const response = await fetch(url.href, { credentials:'same-origin', signal:controller.signal });
            if (!response.ok) throw new Error('Predictive response failed');
            const html = await response.text();
            if (disposed || version !== generation || input.value.trim() !== term) return;
            const rendered = new DOMParser().parseFromString(html, 'text/html').querySelector('[data-qps-render="panel"]');
            if (!rendered) throw new Error('Missing search panel');
            rendered.querySelectorAll('[data-qps-view-all]').forEach(link => { link.href = fullSearch(term); });
            inner.replaceChildren(rendered); panel.hidden = false; input.setAttribute('aria-expanded', 'true');
            announce(rendered.querySelector('.q-ps__empty') ? rendered.textContent.trim() : 'Search suggestions are available. Use the down arrow or Tab to browse.');
          } catch (_) {
            if (!disposed && version === generation) { panel.hidden = true; input.setAttribute('aria-expanded','false'); announce('Search suggestions are unavailable. Use the Search button.'); }
          } finally {
            if (version === generation) { clearTimeout(timeout); timeout = null; request = null; input.removeAttribute('aria-busy'); }
          }
        }, debounce);
      }
      input.addEventListener('input', run, events);
      scopeSelect?.addEventListener('change', run, events);
      input.addEventListener('compositionstart', () => { composing = true; close(); }, events);
      input.addEventListener('compositionend', () => { composing = false; run(); }, events);
      input.addEventListener('focus', () => { loadRecent(); if (skipFocus) { skipFocus = false; return; } if (root.dataset.openOnFocus === 'true') run(); }, events);
      root.addEventListener('keydown', event => {
        if (event.isComposing || composing) return;
        if (event.key === 'Escape' && root.dataset.closeOnEscape === 'true' && (!panel.hidden || request || timer !== null)) {
          event.preventDefault(); event.stopPropagation(); close();
          if (document.activeElement !== input) { skipFocus = true; input.focus(); }
          return;
        }
        if (panel.hidden || !['ArrowDown','ArrowUp'].includes(event.key)) return;
        const links = [...inner.querySelectorAll('a[href],button:not([disabled])')].filter(el => !el.closest('[hidden]'));
        if (!links.length || (event.target !== input && !inner.contains(event.target))) return;
        event.preventDefault();
        const current = links.indexOf(document.activeElement);
        const index = event.key === 'ArrowDown' ? (current + 1) % links.length : (current < 0 ? links.length - 1 : (current + links.length - 1) % links.length);
        links[index].focus(); links[index].scrollIntoView({ block:'nearest' });
      }, events);
      root.addEventListener('click', event => {
        const chip = event.target.closest('[data-qps-chip]');
        if (chip && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
          event.preventDefault(); input.value = chip.dataset.term || ''; skipFocus = document.activeElement !== input;
          input.focus(); run();
        } else if (inner.contains(event.target) && event.target.closest('a[href]')) { saveRecent(); close(); }
      }, events);
      form.addEventListener('submit', () => { saveRecent(); close(); }, events);
      root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) close(); }, events);
      document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) close(); }, events);
      instances.set(root, () => { disposed = true; close(); abort.abort(); inner.replaceChildren(); instances.delete(root); });
      loadRecent();
    });
  }
  function unmount(scope) { instances.forEach((dispose, root) => { if (scope === root || scope.contains?.(root)) dispose(); }); }
  window.QuadratumContentSearch = { mount, unmount };
  document.addEventListener('shopify:section:load', event => mount(event.target));
  document.addEventListener('shopify:section:unload', event => unmount(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mount(document), { once:true });
  else mount(document);
})();
