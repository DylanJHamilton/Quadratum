/* Quadratum — Collection Modern JS
   File: assets/section-collection-modern.js
   Scoped to each section root only.

   PATCH ONLY (no refactors):
   - Keep existing features exactly
   - Add missing Quick View fragment gallery wiring (slideshow arrows)
   - Broaden drawer close selectors to match both facet implementations
   - Broaden compare enable attribute to support alt legacy attr
*/
(function () {
  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.from(root.querySelectorAll(sel)); }

  function closest(el, sel) {
    if (!el) return null;
    return el.closest(sel);
  }

  function setHtml(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }

  function lockBodyScroll(lock) {
    document.documentElement.classList.toggle('qcm-scroll-lock', !!lock);
  }

  /* -----------------------------
     Quick View host open/close
     ----------------------------- */
  function openQuickView(root, html) {
    const host = qs(root, '[data-qcm-qv]');
    const inner = qs(root, '[data-qcm-qv-inner]');
    if (!host || !inner) return;

    setHtml(inner, html);

    host.hidden = false;
    host.setAttribute('aria-hidden', 'false');

    lockBodyScroll(true);

    // focus close button for accessibility
    const closeBtn = qs(host, '[data-qcm-qv-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeQuickView(root) {
    const host = qs(root, '[data-qcm-qv]');
    const inner = qs(root, '[data-qcm-qv-inner]');
    if (!host || !inner) return;

    host.hidden = true;
    host.setAttribute('aria-hidden', 'true');
    inner.innerHTML = '';

    lockBodyScroll(false);
  }

  async function fetchSectionFragment(handle) {
    const url = `/products/${encodeURIComponent(handle)}?section_id=collection-modern-quick-view`;
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Quick view fetch failed');
    return await res.text();
  }

  /* -----------------------------
     Quick View fragment enhancer
     (adds slideshow arrows support)
     ----------------------------- */
  function initQuickViewFragment(root) {
    const host = qs(root, '[data-qcm-qv]');
    const inner = host ? qs(host, '[data-qcm-qv-inner]') : null;
    if (!host || !inner) return;

    // The fragment you render should include:
    // - [data-qcm-qv-fragment]
    // - [data-qcm-qv-images] <script type="application/json">
    // - [data-qcm-qv-slide] <img>
    // - [data-qcm-qv-prev], [data-qcm-qv-next] buttons (optional)
    const frag = qs(inner, '[data-qcm-qv-fragment]');
    if (!frag) return;

    const mode = frag.getAttribute('data-qcm-qv-gallery-mode') || 'static';
    if (mode !== 'slideshow') return;

    const jsonEl = qs(frag, '[data-qcm-qv-images]');
    const imgEl = qs(frag, '[data-qcm-qv-slide]');
    if (!jsonEl || !imgEl) return;

    let images = [];
    try { images = JSON.parse(jsonEl.textContent || '[]'); } catch (e) { images = []; }
    images = (images || []).filter(Boolean);

    if (images.length < 2) return;

    let idx = 0;
    const prevBtn = qs(frag, '[data-qcm-qv-prev]');
    const nextBtn = qs(frag, '[data-qcm-qv-next]');

    function show(i) {
      idx = (i + images.length) % images.length;
      imgEl.src = images[idx];
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        show(idx - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        show(idx + 1);
      });
    }

    // If the fragment’s first image is empty/placeholder, ensure we set it.
    show(0);
  }

  /* -----------------------------
     Pagination helpers
     ----------------------------- */
  function getNextUrl(root) {
    const holder = qs(root, '[data-qcm-next-url]');
    if (!holder) return '';
    return holder.getAttribute('data-qcm-next-url') || '';
  }

  function setNextUrl(root, nextUrl) {
    const holder = qs(root, '[data-qcm-next-url]');
    if (!holder) return;
    if (nextUrl) holder.setAttribute('data-qcm-next-url', nextUrl);
    else holder.removeAttribute('data-qcm-next-url');
  }

  function extractFromHTML(html, rootId) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nextRoot = doc.getElementById(rootId);
    if (!nextRoot) return { items: [], nextUrl: '' };

    const nextGrid = nextRoot.querySelector('[data-qcm-grid]');
    const items = nextGrid ? Array.from(nextGrid.querySelectorAll('[data-qcm-item]')) : [];

    const nextHolder = nextRoot.querySelector('[data-qcm-next-url]');
    const nextUrl = nextHolder ? (nextHolder.getAttribute('data-qcm-next-url') || '') : '';

    return { items, nextUrl };
  }

  function initSection(root) {
    if (root.__qcmInit) return;
    root.__qcmInit = true;

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

    // Drawer open/close (support both facet implementations)
    root.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-qcm-open-filters]');
      if (openBtn) {
        const drawer = qs(root, '[data-qcm-drawer]');
        if (drawer) drawer.classList.add('is-open');
        return;
      }

      // Close selectors (support multiple variants without breaking existing)
      const closeBtnA = e.target.closest('[data-qcm-close-filters]');
      const closeBtnB = e.target.closest('[data-qcm-close-drawer]');
      const closeBtnC = e.target.closest('[data-qcm-drawer-close]');
      const backdropCloseA = e.target.closest('[data-qcm-drawer-backdrop]');
      const backdropCloseB = e.target.closest('[data-qcm-drawer-backdrop]');
      const backdropCloseC = e.target.closest('[data-qcm-drawer-close]');

      if (closeBtnA || closeBtnB || closeBtnC || backdropCloseA || backdropCloseB || backdropCloseC) {
        const drawer = qs(root, '[data-qcm-drawer]');
        if (drawer) drawer.classList.remove('is-open');
        return;
      }
    });

    // Layout controls (unchanged)
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
        if (b.hasAttribute('data-qcm-view')) p.view = b.getAttribute('data-qcm-view');
        if (b.hasAttribute('data-qcm-density')) p.density = b.getAttribute('data-qcm-density');

        const currentCols = parseInt(getComputedStyle(root).getPropertyValue('--qcm-cols-d')) || 4;

        if (b.hasAttribute('data-qcm-cols-plus')) p.cols = (p.cols || currentCols) + 1;
        if (b.hasAttribute('data-qcm-cols-minus')) p.cols = (p.cols || currentCols) - 1;

        setPrefs(p);
        applyPrefs(p);
      });
    }

    // Slider arrows (delegation; no per-card init)
    root.addEventListener('click', (e) => {
      const prevBtn = e.target.closest('[data-qcmc-prev]');
      const nextBtn = e.target.closest('[data-qcmc-next]');
      if (!prevBtn && !nextBtn) return;

      const slider = e.target.closest('[data-qcmc-slider]');
      if (!slider) return;

      const track = slider.querySelector('[data-qcmc-track]');
      if (!track) return;

      const slides = Array.from(track.querySelectorAll('img'));
      if (!slides.length) return;

      let idx = parseInt(slider.getAttribute('data-qcmc-index') || '0', 10);
      idx = Number.isFinite(idx) ? idx : 0;

      if (prevBtn) idx = (idx - 1 + slides.length) % slides.length;
      if (nextBtn) idx = (idx + 1) % slides.length;

      slider.setAttribute('data-qcmc-index', String(idx));
      track.style.transform = `translateX(-${idx * 100}%)`;
      e.preventDefault();
    });

    // Compare / Select (contract: [data-qcm-compare-toggle] + [data-qcmc] datasets)
    const compareEnabled =
      root.getAttribute('data-qcm-enable-compare') === 'true' ||
      root.getAttribute('data-enable-compare') === 'true';

    const compare = { items: new Map() };

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
      const countEl = qs(bar, '[data-qcm-comparecount]');
      if (countEl) countEl.textContent = String(count);
      bar.classList.toggle('is-active', count > 0);
    }

    if (compareEnabled) {
      ensureCompareBar();
      updateCompareUI();

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qcm-compare-toggle]');
        if (btn) {
          const card = closest(btn, '[data-qcmc]');
          if (!card) return;

          const handle = card.getAttribute('data-product-handle') || '';
          const url = card.getAttribute('data-product-url') || '';
          const title = card.getAttribute('data-product-title') || '';

          if (!handle || !url) return;

          const labelSelect = btn.getAttribute('data-label-select') || 'Select';
          const labelSelected = btn.getAttribute('data-label-selected') || 'Selected';

          if (compare.items.has(handle)) {
            compare.items.delete(handle);
            btn.textContent = labelSelect;
            btn.classList.remove('is-selected');
          } else {
            compare.items.set(handle, { handle, url, title });
            btn.textContent = labelSelected;
            btn.classList.add('is-selected');
          }
          updateCompareUI();
          return;
        }

        const bar = qs(root, '[data-qcm-comparebar]');
        if (!bar) return;

        if (e.target.closest('[data-qcm-compareclear]')) {
          compare.items.clear();
          qsa(root, '[data-qcm-compare-toggle]').forEach(b => {
            b.classList.remove('is-selected');
            b.textContent = b.getAttribute('data-label-select') || 'Select';
          });
          updateCompareUI();
          return;
        }

        if (e.target.closest('[data-qcm-comparego]')) {
          const arr = Array.from(compare.items.values()).slice(0, 2);
          if (arr.length) window.location.href = arr[0].url;
          return;
        }
      });
    }

    // Quick View (ONE system: section-render fragment)
    const qvEnabled = root.getAttribute('data-qcm-qv-enabled') === 'true';
    if (qvEnabled) {
      root.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-qcm-quick-view]');
        if (!btn) return;

        e.preventDefault();

        const card = closest(btn, '[data-qcmc]');
        if (!card) return;

        const handle = card.getAttribute('data-product-handle');
        if (!handle) return;

        // open shell immediately
        openQuickView(root, '<div style="padding:16px;">Loading…</div>');

        try {
          const html = await fetchSectionFragment(handle);
          openQuickView(root, html);

          // PATCH: enhance the injected fragment (slideshow arrows, etc.)
          initQuickViewFragment(root);
        } catch (err) {
          openQuickView(root, '<div style="padding:16px;">Could not load product.</div>');
        }
      });

      root.addEventListener('click', (e) => {
        if (e.target.closest('[data-qcm-qv-close]')) {
          closeQuickView(root);
        }
      });

      document.addEventListener('keydown', (e) => {
        const host = qs(root, '[data-qcm-qv]');
        if (!host || host.hidden) return;
        if (e.key === 'Escape') closeQuickView(root);
      });
    }

    // Load more / Infinite scroll (AJAX pagination)
    const paginationStyle = root.getAttribute('data-pagination-style') || 'numbered';
    const grid = qs(root, '[data-qcm-grid]');

    async function loadNextPage() {
      const nextUrl = getNextUrl(root);
      if (!nextUrl || !grid) return false;

      const res = await fetch(nextUrl, { credentials: 'same-origin' });
      if (!res.ok) return false;

      const html = await res.text();
      const parsed = extractFromHTML(html, root.id);
      const items = parsed.items || [];
      const newNext = parsed.nextUrl || '';

      if (items.length) {
        items.forEach(it => grid.appendChild(it));
      }

      setNextUrl(root, newNext || '');
      return items.length > 0;
    }

    // Load more button
    root.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-qcm-load-more]');
      if (!btn) return;

      const nextUrl = getNextUrl(root);
      if (!nextUrl) return;

      btn.setAttribute('aria-busy', 'true');
      try {
        const ok = await loadNextPage();
        if (!ok) btn.style.display = 'none';
        if (!getNextUrl(root)) btn.style.display = 'none';
      } finally {
        btn.setAttribute('aria-busy', 'false');
      }
    });

    // Infinite scroll sentinel
    if (paginationStyle === 'infinite_scroll') {
      const sentinel = qs(root, '[data-qcm-sentinel]');
      if (sentinel && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(async (entries) => {
          const hit = entries.some(en => en.isIntersecting);
          if (!hit) return;
          if (!getNextUrl(root)) return;

          // prevent rapid-fire
          io.unobserve(sentinel);
          await loadNextPage();
          if (getNextUrl(root)) io.observe(sentinel);
        }, { rootMargin: '600px 0px' });

        io.observe(sentinel);
      }
    }
  }

  function boot() {
    document
      .querySelectorAll('.q-collection-modern[id^="QtmCollectionModern-"]')
      .forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();