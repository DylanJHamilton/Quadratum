/* Quadratum — Collection Modern JS
   File: assets/section-collection-modern.js
   Scoped to each section root only.
*/
(function () {
  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.from(root.querySelectorAll(sel)); }

  function moneyFormatFromShopify(cents) {
    // basic fallback; your theme may have a formatter later
    const n = (cents / 100).toFixed(2);
    return `$${n}`;
  }

  function buildModal(root) {
    let modal = qs(root, '[data-qcm-qv-modal]');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'qcm__modal';
    modal.setAttribute('data-qcm-qv-modal', 'true');
    modal.innerHTML = `
      <div class="qcm__modalBackdrop" data-qcm-qv-close></div>
      <div class="qcm__modalPanel" role="dialog" aria-modal="true" aria-label="Quick view">
        <button class="qcm__modalClose" type="button" data-qcm-qv-close aria-label="Close">×</button>
        <div class="qcm__modalGrid">
          <div class="qcm__modalMedia">
            <div class="qcm__modalGallery" data-qcm-qv-gallery>
              <img class="qcm__modalImg" data-qcm-qv-img alt="">
            </div>
            <div class="qcm__modalArrows">
              <button type="button" class="qcm__modalArrow" data-qcm-qv-prev aria-label="Previous">‹</button>
              <button type="button" class="qcm__modalArrow" data-qcm-qv-next aria-label="Next">›</button>
            </div>
          </div>
          <div class="qcm__modalInfo">
            <h3 class="qcm__modalTitle" data-qcm-qv-title></h3>
            <div class="qcm__modalPrice" data-qcm-qv-price></div>
            <div class="qcm__modalDesc" data-qcm-qv-desc></div>

            <div class="qcm__modalVariants" data-qcm-qv-variants></div>

            <div class="qcm__modalActions" data-qcm-qv-actions>
              <button type="button" class="qcm__btn" data-qcm-qv-atc>Add to cart</button>
              <a class="qcm__btn qcm__btn--ghost" data-qcm-qv-view href="#">View product</a>
              <button type="button" class="qcm__btn" data-qcm-qv-buynow>Buy now</button>
            </div>

            <div class="qcm__modalStatus" aria-live="polite" data-qcm-qv-status></div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(modal);
    return modal;
  }

  async function fetchProductJSON(handle) {
    const res = await fetch(`/products/${handle}.js`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Product fetch failed');
    return await res.json();
  }

  function initSection(root) {
    // Sort dropdown navigation
    const sortSelect = qs(root, '[data-qcm-sort-select]');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const val = sortSelect.value;
        const url = new URL(window.location.href);
        url.searchParams.set('sort_by', val);
        window.location.href = url.toString();
      });
    }

    // Drawer open (your facets snippet should include drawer panel with [data-qcm-drawer])
    const openFilters = qs(root, '[data-qcm-open-filters]');
    if (openFilters) {
      openFilters.addEventListener('click', () => {
        const drawer = qs(root, '[data-qcm-drawer]');
        if (drawer) drawer.classList.add('is-open');
      });
    }
    qsa(root, '[data-qcm-close-filters]').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawer = qs(root, '[data-qcm-drawer]');
        if (drawer) drawer.classList.remove('is-open');
      });
    });

    // Layout controls
    const layout = qs(root, '[data-qcm-layout]');
    const colsReadout = qs(root, '[data-qcm-cols-readout]');
    const storageKey = `qcm:${root.id}:prefs`;

    function getPrefs() {
      try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
      catch (e) { return {}; }
    }
    function setPrefs(next) {
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) {}
    }

    function applyPrefs(p) {
      if (p.view === 'list') root.classList.add('is-list'); else root.classList.remove('is-list');
      if (p.density === 'compact') root.classList.add('density-compact'); else root.classList.remove('density-compact');

      if (typeof p.cols === 'number') {
        const c = Math.min(6, Math.max(1, p.cols));
        root.style.setProperty('--qcm-cols-d', c);
        if (colsReadout) colsReadout.textContent = `${c} cols`;
      }
    }

    if (layout) {
      const prefs = getPrefs();
      applyPrefs(prefs);

      layout.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;

        const p = getPrefs();

        if (b.hasAttribute('data-qcm-view')) {
          p.view = b.getAttribute('data-qcm-view');
        }
        if (b.hasAttribute('data-qcm-density')) {
          p.density = b.getAttribute('data-qcm-density');
        }
        if (b.hasAttribute('data-qcm-cols-plus')) {
          p.cols = (p.cols || parseInt(getComputedStyle(root).getPropertyValue('--qcm-cols-d')) || 4) + 1;
        }
        if (b.hasAttribute('data-qcm-cols-minus')) {
          p.cols = (p.cols || parseInt(getComputedStyle(root).getPropertyValue('--qcm-cols-d')) || 4) - 1;
        }

        setPrefs(p);
        applyPrefs(p);
      });
    }

    // Product card mini slider arrows
    qsa(root, '[data-qcmc]').forEach(card => {
      const mode = card.getAttribute('data-media-mode');
      if (mode !== 'slider') return;

      const imagesScript = qs(card, '[data-qcmc-images]');
      if (!imagesScript) return;

      let images = [];
      try { images = JSON.parse(imagesScript.textContent || '[]'); } catch (e) { images = []; }
      if (!images.length) return;

      const img = qs(card, '.qcmc__img--primary');
      if (!img) return;

      let idx = 0;
      const prev = qs(card, '[data-qcmc-prev]');
      const next = qs(card, '[data-qcmc-next]');

      function show(i) {
        idx = (i + images.length) % images.length;
        img.src = images[idx];
      }

      if (prev) prev.addEventListener('click', (e) => { e.preventDefault(); show(idx - 1); });
      if (next) next.addEventListener('click', (e) => { e.preventDefault(); show(idx + 1); });
    });

    // Compare / Select
    const compare = {
      enabled: root.getAttribute('data-enable-compare') === 'true',
      items: new Map()
    };

    function ensureCompareBar() {
      let bar = qs(root, '[data-qcm-comparebar]');
      if (bar) return bar;

      bar = document.createElement('div');
      bar.className = 'qcm__compareBar';
      bar.setAttribute('data-qcm-comparebar', 'true');
      bar.innerHTML = `
        <div class="qcm__compareLeft"><span data-qcm-comparecount>0</span> selected</div>
        <div class="qcm__compareRight">
          <button type="button" class="qcm__btn qcm__btn--ghost" data-qcm-compareclear>Clear</button>
          <button type="button" class="qcm__btn" data-qcm-comparego>Compare</button>
        </div>
      `;
      root.appendChild(bar);
      return bar;
    }

    function updateCompareUI() {
      const bar = ensureCompareBar();
      const count = compare.items.size;
      qs(bar, '[data-qcm-comparecount]').textContent = String(count);
      bar.classList.toggle('is-active', count > 0);
    }

    if (compare.enabled) {
      ensureCompareBar();
      updateCompareUI();

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qcm-compare-toggle]');
        if (!btn) return;
        const card = e.target.closest('[data-qcmc]');
        if (!card) return;

        const handle = card.getAttribute('data-product-handle');
        const url = card.getAttribute('data-product-url');
        const title = card.getAttribute('data-product-title');

        if (compare.items.has(handle)) {
          compare.items.delete(handle);
          btn.textContent = btn.getAttribute('data-label-select') || 'Select';
          btn.classList.remove('is-selected');
        } else {
          compare.items.set(handle, { handle, url, title });
          btn.textContent = btn.getAttribute('data-label-selected') || 'Selected';
          btn.classList.add('is-selected');
        }
        updateCompareUI();
      });

      const bar = ensureCompareBar();
      bar.addEventListener('click', (e) => {
        if (e.target.closest('[data-qcm-compareclear]')) {
          compare.items.clear();
          qsa(root, '[data-qcm-compare-toggle]').forEach(b => {
            b.classList.remove('is-selected');
            b.textContent = b.getAttribute('data-label-select') || 'Select';
          });
          updateCompareUI();
        }

        if (e.target.closest('[data-qcm-comparego]')) {
          // Minimal v1: open a compare page if you have one; otherwise open first 2 products.
          const arr = Array.from(compare.items.values()).slice(0, 2);
          if (arr.length) window.location.href = arr[0].url;
        }
      });
    }

    // Quick View
    const qvEnabled = root.getAttribute('data-enable-quickview') === 'true';
    if (qvEnabled) {
      const modal = buildModal(root);
      const closeEls = qsa(modal, '[data-qcm-qv-close]');
      closeEls.forEach(el => el.addEventListener('click', () => modal.classList.remove('is-open')));

      let gallery = [];
      let gIndex = 0;

      function setGalleryIndex(i) {
        if (!gallery.length) return;
        gIndex = (i + gallery.length) % gallery.length;
        const img = qs(modal, '[data-qcm-qv-img]');
        img.src = gallery[gIndex];
      }

      qs(modal, '[data-qcm-qv-prev]').addEventListener('click', () => setGalleryIndex(gIndex - 1));
      qs(modal, '[data-qcm-qv-next]').addEventListener('click', () => setGalleryIndex(gIndex + 1));

      root.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-qcm-qv]');
        if (!btn) return;

        const card = e.target.closest('[data-qcmc]');
        if (!card) return;

        const handle = card.getAttribute('data-product-handle');

        modal.classList.add('is-open');
        qs(modal, '[data-qcm-qv-status]').textContent = 'Loading…';

        try {
          const data = await fetchProductJSON(handle);

          // Title
          qs(modal, '[data-qcm-qv-title]').textContent = data.title;

          // Price
          const priceEl = qs(modal, '[data-qcm-qv-price]');
          if (data.compare_at_price && data.compare_at_price > data.price) {
            priceEl.innerHTML = `<span class="qcm__priceNow">${moneyFormatFromShopify(data.price)}</span> <span class="qcm__priceWas"><s>${moneyFormatFromShopify(data.compare_at_price)}</s></span>`;
          } else {
            priceEl.innerHTML = `<span class="qcm__priceNow">${moneyFormatFromShopify(data.price)}</span>`;
          }

          // Description (small)
          const desc = (data.description || '').replace(/<[^>]*>?/gm, '').trim();
          qs(modal, '[data-qcm-qv-desc]').textContent = desc ? desc.slice(0, 180) + (desc.length > 180 ? '…' : '') : '';

          // Gallery
          gallery = (data.images || []).slice(0, 10);
          if (!gallery.length) gallery = [card.getAttribute('data-product-featured')].filter(Boolean);
          setGalleryIndex(0);

          // Variants
          const vWrap = qs(modal, '[data-qcm-qv-variants]');
          vWrap.innerHTML = '';
          const needsVariant = (data.variants || []).length > 1;

          let activeVariantId = (data.variants && data.variants[0]) ? data.variants[0].id : null;

          if (needsVariant) {
            const sel = document.createElement('select');
            sel.className = 'qcm__variantSelect';
            sel.setAttribute('data-qcm-qv-variant', 'true');

            data.variants.forEach(v => {
              const opt = document.createElement('option');
              opt.value = String(v.id);
              opt.textContent = v.public_title || v.title;
              if (v.available === false) opt.disabled = true;
              sel.appendChild(opt);
            });
            vWrap.appendChild(sel);

            sel.addEventListener('change', () => {
              activeVariantId = parseInt(sel.value, 10);
            });
          } else if ((data.variants || []).length === 1) {
            activeVariantId = data.variants[0].id;
          }

          // Actions: optional logic
          const actions = qs(modal, '[data-qcm-qv-actions]');
          const atcBtn = qs(actions, '[data-qcm-qv-atc]');
          const viewLink = qs(actions, '[data-qcm-qv-view]');
          const buyNowBtn = qs(actions, '[data-qcm-qv-buynow]');

          // These are controlled by data attributes from section if you want later,
          // for now default ON:
          const enableATC = root.getAttribute('data-qcm-qv-atc') !== 'false';
          const enableView = root.getAttribute('data-qcm-qv-view') !== 'false';
          const enableBuyNow = root.getAttribute('data-qcm-qv-buynow') === 'true';

          // If Buy Now enabled => remove ATC + View product (per your rule)
          atcBtn.style.display = enableATC && !enableBuyNow ? '' : 'none';
          viewLink.style.display = enableView && !enableBuyNow ? '' : 'none';
          buyNowBtn.style.display = enableBuyNow ? '' : 'none';

          viewLink.href = data.url;

          // ATC
          atcBtn.onclick = async () => {
            qs(modal, '[data-qcm-qv-status]').textContent = 'Adding…';
            const body = { id: activeVariantId, quantity: 1 };
            const r = await fetch('/cart/add.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'same-origin',
              body: JSON.stringify(body)
            });
            if (!r.ok) throw new Error('ATC failed');
            qs(modal, '[data-qcm-qv-status]').textContent = 'Added to cart';
          };

          // BUY NOW = one-step checkout
          buyNowBtn.onclick = async () => {
            qs(modal, '[data-qcm-qv-status]').textContent = 'Processing…';
            const body = { id: activeVariantId, quantity: 1 };
            const r = await fetch('/cart/add.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'same-origin',
              body: JSON.stringify(body)
            });
            if (!r.ok) throw new Error('Buy Now add failed');
            window.location.href = '/checkout';
          };

          qs(modal, '[data-qcm-qv-status]').textContent = '';
        } catch (err) {
          qs(modal, '[data-qcm-qv-status]').textContent = 'Could not load product.';
        }
      });
    }
  }

  function boot() {
    document.querySelectorAll('.q-collection-modern[id^="QtmCollectionModern-"]').forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
