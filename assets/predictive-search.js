(function () {
  if (window.__qtmPredictiveSearch) {
    window.initPredictiveSearch();
    return;
  }
  window.__qtmPredictiveSearch = true;
  const ROOT_SELECTOR = '[data-qtm-predictive-search]';
  const instances = new Map();

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function boundedNumber(value, fallback, min, max) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : fallback;
  }

  // Predictive Search JSON prices are decimal currency amounts, not cart API cents.
  function moneyFormat(value, currency) {
    if (value == null || value === '' || !['number', 'string'].includes(typeof value)) return '';
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount < 0) return '';
    try {
      return new Intl.NumberFormat(document.documentElement.lang || undefined, {
        style: 'currency', currency
      }).format(amount);
    } catch (_) {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  function getImageUrl(item) {
    return item.featured_image?.url || item.image?.url || (typeof item.image === 'string' ? item.image : '');
  }

  function buildItemMarkup(item, type, showThumbnails, currency) {
    const imageUrl = getImageUrl(item);
    let meta = '';
    if (type === 'products') meta = moneyFormat(item.price, currency);
    else if (type === 'collections' && item.products_count != null) meta = `${item.products_count} items`;
    else if (type === 'articles' && item.author) meta = item.author;
    return `<a class="qtm-search-predictive__item" href="${escapeHtml(item.url)}"
      role="option" aria-selected="false" tabindex="-1" data-qtm-option>
      ${showThumbnails && imageUrl ? `<img class="qtm-search-predictive__thumb" src="${escapeHtml(imageUrl)}" alt="" width="96" height="96" loading="lazy">` : ''}
      <div class="qtm-search-predictive__content">
        <p class="qtm-search-predictive__title">${escapeHtml(item.title)}</p>
        ${meta ? `<p class="qtm-search-predictive__meta${type === 'products' ? ' qtm-search-predictive__price' : ''}">${escapeHtml(meta)}</p>` : ''}
      </div>
    </a>`;
  }

  function initPredictive(root) {
    if (instances.has(root)) return;
    const input = root.querySelector('[data-qtm-predictive-input]');
    const panel = root.querySelector('[data-qtm-predictive-panel]');
    if (!input || !panel) return;
    const form = root.querySelector('form');
    const status = root.querySelector('[data-qtm-predictive-status]');
    const lifecycle = new AbortController();
    const listen = (target, type, handler) => target.addEventListener(type, handler, { signal: lifecycle.signal });
    const minChars = boundedNumber(root.dataset.minChars, 2, 1, 5);
    const debounceMs = boundedNumber(root.dataset.debounce, 250, 0, 500);
    const viewAllLabel = root.dataset.viewAllLabel || 'View all results';
    const showHeadings = root.dataset.showGroupHeadings !== 'false';
    const showThumbnails = root.dataset.showThumbnails !== 'false';
    const showViewAll = root.dataset.showViewAll !== 'false';
    const productsLayout = ['list', 'compact', 'grid'].includes(root.dataset.productsLayout) ? root.dataset.productsLayout : 'list';
    const currency = root.dataset.currency || window.Shopify?.currency?.active || 'USD';
    const groups = [
      { key: 'products', type: 'product', label: 'Products', fallback: 4 },
      { key: 'collections', type: 'collection', label: 'Collections', fallback: 3 },
      { key: 'articles', type: 'article', label: 'Articles', fallback: 3 },
      { key: 'pages', type: 'page', label: 'Pages', fallback: 3 }
    ].filter((group) => root.dataset[`${group.key}Enabled`] !== 'false').map((group) => ({
      ...group, limit: boundedNumber(root.dataset[`${group.key}Limit`], group.fallback, 1, 10)
    }));
    const fullTypes = groups.filter((group) => group.type !== 'collection').map((group) => group.type).join(',');
    let debounceTimer;
    let requestController;
    let activeIndex = -1;
    let composing = false;

    function closePanel() {
      clearTimeout(debounceTimer);
      requestController?.abort();
      requestController = null;
      input.removeAttribute('aria-activedescendant');
      input.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      panel.innerHTML = '';
      if (status) status.textContent = '';
      activeIndex = -1;
    }

    function viewAllUrl(query) {
      const url = new URL(form?.action || `${window.Shopify?.routes?.root || '/'}search`, window.location.origin);
      url.searchParams.set('q', query);
      url.searchParams.set('type', fullTypes);
      url.searchParams.delete('page');
      for (const name of ['options[unavailable_products]', 'options[prefix]']) {
        const value = form?.elements.namedItem(name)?.value;
        if (value) url.searchParams.set(name, value);
      }
      return url.toString();
    }

    function renderResults(query, payload) {
      const resources = payload?.resources?.results || {};
      let count = 0;
      const markup = groups.map((group) => {
        const items = Array.isArray(resources[group.key])
          ? resources[group.key].filter((item) => item && typeof item.url === 'string' && item.url.trim()).slice(0, group.limit) : [];
        if (!items.length) return '';
        count += items.length;
        const headingId = `${panel.id}-${group.key}-heading`;
        return `<div class="qtm-search-predictive__group" role="group" ${showHeadings ? `aria-labelledby="${escapeHtml(headingId)}"` : `aria-label="${group.label}"`}>
          ${showHeadings ? `<h3 id="${escapeHtml(headingId)}" class="qtm-search-predictive__heading">${group.label}</h3>` : ''}
          <div class="qtm-search-predictive__items${group.key === 'products' ? ` qtm-search-predictive__items--${productsLayout}` : ''}" role="presentation">
            ${items.map((item) => buildItemMarkup(item, group.key, showThumbnails, currency)).join('')}
          </div>
        </div>`;
      }).join('');
      activeIndex = -1;
      input.removeAttribute('aria-activedescendant');
      panel.innerHTML = `<div class="qtm-search-predictive__groups" role="presentation">
        ${markup || '<div class="qtm-search-predictive__empty" role="option" aria-disabled="true">No matches</div>'}
        </div>
        ${showViewAll && fullTypes ? `<div class="qtm-search-predictive__footer" role="presentation">
          <a class="qtm-search-predictive__view-all" href="${escapeHtml(viewAllUrl(query))}" role="option" aria-selected="false" tabindex="-1" data-qtm-option>${escapeHtml(viewAllLabel)}</a>
        </div>` : ''}`;
      if (status) status.textContent = count ? `${count} search suggestion${count === 1 ? '' : 's'}.` : 'No matches.';
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    async function fetchResults(query) {
      if (!groups.length || !root.isConnected) return;
      requestController?.abort();
      const controller = new AbortController();
      requestController = controller;
      const url = new URL(`${window.Shopify?.routes?.root || '/'}search/suggest.json`, window.location.origin);
      url.searchParams.set('q', query);
      url.searchParams.set('resources[type]', groups.map((group) => group.type).join(','));
      url.searchParams.set('resources[limit]', String(Math.max(...groups.map((group) => group.limit))));
      url.searchParams.set('resources[limit_scope]', 'each');
      const unavailable = form?.elements.namedItem('options[unavailable_products]')?.value;
      url.searchParams.set('resources[options][unavailable_products]', ['show', 'hide', 'last'].includes(unavailable) ? unavailable : 'hide');
      url.searchParams.set('resources[options][fields]', 'title,product_type,variants.title,vendor,tag,body');
      try {
        const response = await fetch(url.toString(), { signal: controller.signal, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Predictive search failed');
        const payload = await response.json();
        if (controller.signal.aborted || requestController !== controller || !root.isConnected || input.value.trim() !== query) return;
        renderResults(query, payload);
      } catch (_) {
        if (!controller.signal.aborted && requestController === controller) closePanel();
      }
    }

    function scheduleSearch(event) {
      closePanel();
      const query = input.value.trim();
      if (composing || event?.isComposing || input.disabled || query.length < minChars || !groups.length) return;
      debounceTimer = setTimeout(() => fetchResults(query), debounceMs);
    }

    function syncActiveOption() {
      const options = panel.querySelectorAll('[data-qtm-option]');
      options.forEach((option, index) => {
        option.classList.toggle('is-active', index === activeIndex);
        option.setAttribute('aria-selected', String(index === activeIndex));
      });
      const active = options[activeIndex];
      if (active) {
        if (!active.id) active.id = `${panel.id}-option-${activeIndex}`;
        input.setAttribute('aria-activedescendant', active.id);
        active.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }

    listen(input, 'input', scheduleSearch);
    listen(input, 'compositionstart', () => { composing = true; closePanel(); });
    listen(input, 'compositionend', () => { composing = false; scheduleSearch(); });
    listen(input, 'keydown', (event) => {
      if (composing || event.isComposing) return;
      if (event.key === 'Tab') { closePanel(); return; }
      if (event.key === 'Escape') {
        if (!panel.hidden) event.preventDefault();
        closePanel();
        return;
      }
      const options = panel.querySelectorAll('[data-qtm-option]');
      if (panel.hidden || !options.length) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        activeIndex = event.key === 'ArrowDown' ? (activeIndex + 1) % options.length : (activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        syncActiveOption();
      } else if (event.key === 'Enter' && options[activeIndex]) {
        event.preventDefault();
        options[activeIndex].click();
      }
    });
    if (form) {
      listen(form, 'submit', (event) => {
        if (!fullTypes) event.preventDefault();
        closePanel();
      });
      listen(form, 'reset', closePanel);
    }
    root.dataset.qtmPredictiveReady = 'true';
    instances.set(root, { close: closePanel, destroy() {
      closePanel();
      lifecycle.abort();
      delete root.dataset.qtmPredictiveReady;
      instances.delete(root);
    } });
  }

  function bootPredictiveSearch(scope = document) {
    if (!scope?.querySelectorAll) return;
    instances.forEach((instance, root) => { if (!root.isConnected) instance.destroy(); });
    if (scope.matches?.(ROOT_SELECTOR)) initPredictive(scope);
    scope.querySelectorAll(ROOT_SELECTOR).forEach(initPredictive);
  }
  window.initPredictiveSearch = bootPredictiveSearch;
  const observer = new MutationObserver((records) => {
    if (!records.some((record) => [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(ROOT_SELECTOR) || node.querySelector?.(ROOT_SELECTOR))))) return;
    bootPredictiveSearch();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  const closeOutside = (event) => instances.forEach((instance, root) => {
    if (!root.contains(event.target)) instance.close();
  });
  document.addEventListener('click', closeOutside);
  document.addEventListener('focusin', closeOutside);
  document.addEventListener('qtm:search-close', (event) => instances.forEach((instance, root) => {
    if (event.target === root || event.target.contains(root)) instance.close();
  }));
  document.addEventListener('shopify:section:load', (event) => bootPredictiveSearch(event.target));
  document.addEventListener('shopify:section:unload', (event) => instances.forEach((instance, root) => {
    if (event.target === root || event.target.contains(root)) instance.destroy();
  }));
  window.addEventListener('pagehide', () => instances.forEach((instance) => instance.close()));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => bootPredictiveSearch(), { once: true });
  else bootPredictiveSearch();
})();
