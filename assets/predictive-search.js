(function () {
  const ROOT_SELECTOR = '[data-qtm-predictive-search]';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function moneyFormat(cents) {
    if (typeof cents !== 'number') return '';
    const currency = (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'USD';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency
      }).format(cents / 100);
    } catch (e) {
      return `${(cents / 100).toFixed(2)} ${currency}`;
    }
  }

  function buildViewAllUrl(query) {
    const url = new URL('/search', window.location.origin);
    url.searchParams.set('q', query);
    return url.toString();
  }

  function getImageUrl(item) {
    if (item && item.featured_image && typeof item.featured_image === 'object' && item.featured_image.url) {
      return item.featured_image.url;
    }
    if (item && item.image && typeof item.image === 'object' && item.image.url) {
      return item.image.url;
    }
    if (item && typeof item.image === 'string') {
      return item.image;
    }
    return '';
  }

  function buildItemMarkup(item, type, flatIndex) {
    const imageUrl = getImageUrl(item);
    let meta = '';

    if (type === 'products' && typeof item.price === 'number') {
      meta = moneyFormat(item.price);
    } else if (type === 'collections' && typeof item.products_count !== 'undefined') {
      meta = `${item.products_count} items`;
    } else if (type === 'articles' && item.author) {
      meta = item.author;
    }

    return `
      <a
        class="qtm-search-predictive__item"
        href="${escapeHtml(item.url)}"
        role="option"
        aria-selected="false"
        data-qtm-option
        data-flat-index="${flatIndex}"
      >
        ${imageUrl ? `<img class="qtm-search-predictive__thumb" src="${escapeHtml(imageUrl)}" alt="" loading="lazy">` : `<div class="qtm-search-predictive__thumb" aria-hidden="true"></div>`}
        <div class="qtm-search-predictive__content">
          <p class="qtm-search-predictive__title">${escapeHtml(item.title)}</p>
          ${meta ? `<p class="qtm-search-predictive__meta">${escapeHtml(meta)}</p>` : ''}
        </div>
      </a>
    `;
  }

  function initPredictive(root) {
    if (!root || root.dataset.qtmPredictiveReady === 'true') return;
    root.dataset.qtmPredictiveReady = 'true';

    const input = root.querySelector('[data-qtm-predictive-input]');
    const panel = root.querySelector('[data-qtm-predictive-panel]');
    if (!input || !panel) return;

    const minChars = parseInt(root.dataset.minChars || '2', 10);
    const debounceMs = parseInt(root.dataset.debounce || '250', 10);
    const viewAllLabel = root.dataset.viewAllLabel || 'View all results';

    const enabled = {
      products: root.dataset.productsEnabled === 'true',
      collections: root.dataset.collectionsEnabled === 'true',
      articles: root.dataset.articlesEnabled === 'true',
      pages: root.dataset.pagesEnabled === 'true'
    };

    const limits = {
      products: parseInt(root.dataset.productsLimit || '4', 10),
      collections: parseInt(root.dataset.collectionsLimit || '3', 10),
      articles: parseInt(root.dataset.articlesLimit || '3', 10),
      pages: parseInt(root.dataset.pagesLimit || '3', 10)
    };

    let debounceTimer = null;
    let abortController = null;
    let activeIndex = -1;

    function openPanel() {
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function closePanel() {
      panel.hidden = true;
      panel.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    }

    function getEnabledTypes() {
      const types = [];
      if (enabled.products) types.push('product');
      if (enabled.collections) types.push('collection');
      if (enabled.articles) types.push('article');
      if (enabled.pages) types.push('page');
      return types;
    }

    function getMaxLimit() {
      return Math.max(limits.products, limits.collections, limits.articles, limits.pages, 1);
    }

    function renderResults(query, payload) {
      const resources = (payload && payload.resources && payload.resources.results) || {};
      const groupDefs = [
        { key: 'products', label: 'Products', enabled: enabled.products, limit: limits.products },
        { key: 'collections', label: 'Collections', enabled: enabled.collections, limit: limits.collections },
        { key: 'articles', label: 'Articles', enabled: enabled.articles, limit: limits.articles },
        { key: 'pages', label: 'Pages', enabled: enabled.pages, limit: limits.pages }
      ];

      let flatIndex = 0;
      const groups = [];

      groupDefs.forEach((group) => {
        if (!group.enabled) return;

        const items = Array.isArray(resources[group.key]) ? resources[group.key].slice(0, group.limit) : [];
        if (!items.length) return;

        const itemsMarkup = items.map((item) => {
          const markup = buildItemMarkup(item, group.key, flatIndex);
          flatIndex += 1;
          return markup;
        }).join('');

        groups.push(`
          <section class="qtm-search-predictive__group">
            <h3 class="qtm-search-predictive__heading">${group.label}</h3>
            <div class="qtm-search-predictive__items">
              ${itemsMarkup}
            </div>
          </section>
        `);
      });

      panel.innerHTML = `
        <div class="qtm-search-predictive__groups">
          ${groups.length ? groups.join('') : '<section class="qtm-search-predictive__group"><h3 class="qtm-search-predictive__heading">No matches</h3></section>'}
        </div>
        <div class="qtm-search-predictive__footer">
          <a class="qtm-search-predictive__view-all" href="${buildViewAllUrl(query)}">${escapeHtml(viewAllLabel)}</a>
        </div>
      `;

      openPanel();
    }

    async function fetchResults(query) {
      if (abortController) abortController.abort();
      abortController = new AbortController();

      const types = getEnabledTypes();
      if (!types.length) {
        closePanel();
        return;
      }

      const url = new URL('/search/suggest.json', window.location.origin);
      url.searchParams.set('q', query);
      url.searchParams.set('resources[type]', types.join(','));
      url.searchParams.set('resources[limit]', String(getMaxLimit()));
      url.searchParams.set('resources[options][unavailable_products]', 'hide');

      try {
        const response = await fetch(url.toString(), {
          signal: abortController.signal,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Predictive search failed');

        const data = await response.json();
        renderResults(query, data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          closePanel();
        }
      }
    }

    function syncActiveOption() {
      const options = panel.querySelectorAll('[data-qtm-option]');
      options.forEach((option, index) => {
        const isActive = index === activeIndex;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (activeIndex >= 0 && options[activeIndex]) {
        options[activeIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    input.addEventListener('input', function () {
      const query = input.value.trim();
      clearTimeout(debounceTimer);

      if (query.length < minChars) {
        closePanel();
        return;
      }

      debounceTimer = setTimeout(function () {
        fetchResults(query);
      }, debounceMs);
    });

    input.addEventListener('focus', function () {
      if (panel.innerHTML.trim() !== '') {
        openPanel();
      }
    });

    input.addEventListener('keydown', function (event) {
      const options = panel.querySelectorAll('[data-qtm-option]');
      if (panel.hidden || !options.length) {
        if (event.key === 'Escape') closePanel();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        activeIndex = (activeIndex + 1) % options.length;
        syncActiveOption();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        activeIndex = activeIndex <= 0 ? options.length - 1 : activeIndex - 1;
        syncActiveOption();
      } else if (event.key === 'Enter') {
        if (activeIndex >= 0 && options[activeIndex]) {
          event.preventDefault();
          options[activeIndex].click();
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
      }
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        closePanel();
      }
    });
  }

  function bootPredictiveSearch() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initPredictive);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPredictiveSearch);
  } else {
    bootPredictiveSearch();
  }

  window.initPredictiveSearch = bootPredictiveSearch;
})();