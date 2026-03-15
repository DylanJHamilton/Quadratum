(function () {
  const SELECTOR = '[data-qtm-predictive-search]';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function buildSearchUrl(term) {
    const url = new URL(window.Shopify?.routes?.root ? `${window.Shopify.routes.root}search` : '/search', window.location.origin);
    url.searchParams.set('q', term);
    return url.toString();
  }

  function formatMoney(cents) {
    if (typeof cents !== 'number') return '';
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD'
    }).format(cents / 100);
  }

  function makeItem(item, type, flatIndex) {
    const image = item.featured_image?.url || item.image || item.featured_image || '';
    let meta = '';

    if (type === 'products' && typeof item.price !== 'undefined') {
      meta = formatMoney(item.price);
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
        data-qtm-option
        data-flat-index="${flatIndex}"
      >
        ${image ? `<img class="qtm-search-predictive__thumb" src="${escapeHtml(image)}" alt="" loading="lazy">` : `<div class="qtm-search-predictive__thumb" aria-hidden="true"></div>`}
        <div class="qtm-search-predictive__content">
          <p class="qtm-search-predictive__title">${escapeHtml(item.title)}</p>
          ${meta ? `<p class="qtm-search-predictive__meta">${escapeHtml(meta)}</p>` : ''}
        </div>
      </a>
    `;
  }

  function initPredictiveSearch(root) {
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

    let activeIndex = -1;
    let activeItems = [];
    let debounceTimer = null;
    let abortController = null;

    function closePanel() {
      panel.hidden = true;
      panel.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      activeItems = [];
      activeIndex = -1;
    }

    function openPanel() {
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function getResourceTypes() {
      const out = [];
      if (enabled.products) out.push('product');
      if (enabled.collections) out.push('collection');
      if (enabled.articles) out.push('article');
      if (enabled.pages) out.push('page');
      return out;
    }

    function getLimit() {
      return Math.max(limits.products, limits.collections, limits.articles, limits.pages);
    }

    function renderResults(query, payload) {
      const results = payload?.resources?.results || {};
      const groups = [];
      activeItems = [];
      let flatIndex = 0;

      const definitions = [
        { key: 'products', label: 'Products', enabled: enabled.products, limit: limits.products },
        { key: 'collections', label: 'Collections', enabled: enabled.collections, limit: limits.collections },
        { key: 'articles', label: 'Articles', enabled: enabled.articles, limit: limits.articles },
        { key: 'pages', label: 'Pages', enabled: enabled.pages, limit: limits.pages }
      ];

      definitions.forEach((groupDef) => {
        if (!groupDef.enabled) return;

        const items = (results[groupDef.key] || []).slice(0, groupDef.limit);
        if (!items.length) return;

        const html = items.map((item) => {
          const markup = makeItem(item, groupDef.key, flatIndex);
          activeItems.push(item.url);
          flatIndex += 1;
          return markup;
        }).join('');

        groups.push(`
          <section class="qtm-search-predictive__group">
            <h3 class="qtm-search-predictive__heading">${groupDef.label}</h3>
            <div class="qtm-search-predictive__items">
              ${html}
            </div>
          </section>
        `);
      });

      if (!groups.length) {
        panel.innerHTML = `
          <div class="qtm-search-predictive__groups">
            <section class="qtm-search-predictive__group">
              <h3 class="qtm-search-predictive__heading">No matches</h3>
            </section>
          </div>
          <div class="qtm-search-predictive__footer">
            <a class="qtm-search-predictive__view-all" href="${buildSearchUrl(query)}">${escapeHtml(viewAllLabel)}</a>
          </div>
        `;
        openPanel();
        return;
      }

      panel.innerHTML = `
        <div class="qtm-search-predictive__groups">
          ${groups.join('')}
        </div>
        <div class="qtm-search-predictive__footer">
          <a class="qtm-search-predictive__view-all" href="${buildSearchUrl(query)}">${escapeHtml(viewAllLabel)}</a>
        </div>
      `;

      openPanel();
    }

    async function fetchResults(query) {
      if (abortController) abortController.abort();
      abortController = new AbortController();

      const url = new URL('/search/suggest.json', window.location.origin);
      url.searchParams.set('q', query);
      url.searchParams.set('resources[type]', getResourceTypes().join(','));
      url.searchParams.set('resources[limit]', String(getLimit()));
      url.searchParams.set('resources[options][unavailable_products]', 'hide');
      url.searchParams.set('resources[options][fields]', 'title,product_type,variants,title,tag,body');

      try {
        const response = await fetch(url.toString(), {
          signal: abortController.signal,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Predictive search request failed.');

        const payload = await response.json();
        renderResults(query, payload);
      } catch (error) {
        if (error.name !== 'AbortError') {
          closePanel();
        }
      }
    }

    function updateActiveOption() {
      const options = panel.querySelectorAll('[data-qtm-option]');
      options.forEach((option, index) => {
        option.classList.toggle('is-active', index === activeIndex);
        option.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
      });

      if (activeIndex >= 0 && options[activeIndex]) {
        options[activeIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    input.addEventListener('input', () => {
      const query = input.value.trim();

      clearTimeout(debounceTimer);

      if (query.length < minChars) {
        closePanel();
        return;
      }

      debounceTimer = setTimeout(() => {
        fetchResults(query);
      }, debounceMs);
    });

    input.addEventListener('keydown', (event) => {
      const options = panel.querySelectorAll('[data-qtm-option]');
      if (panel.hidden || !options.length) {
        if (event.key === 'Escape') closePanel();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        activeIndex = (activeIndex + 1) % options.length;
        updateActiveOption();
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        activeIndex = activeIndex <= 0 ? options.length - 1 : activeIndex - 1;
        updateActiveOption();
      }

      if (event.key === 'Enter' && activeIndex >= 0 && options[activeIndex]) {
        event.preventDefault();
        options[activeIndex].click();
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
      }
    });

    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) {
        closePanel();
      }
    });

    input.addEventListener('focus', () => {
      if (panel.innerHTML.trim() !== '') {
        openPanel();
      }
    });
  }

  function boot() {
    document.querySelectorAll(SELECTOR).forEach(initPredictiveSearch);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.initPredictiveSearch = boot;
})();