// File: assets/section-product-recently-viewed.js
(() => {
  const supportsStorage = () => {
    try {
      const k = '__q_prv__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  };

  function getStore(preferLocal = true) {
    // localStorage primary, sessionStorage fallback
    const localOk = supportsStorage();
    if (preferLocal && localOk) return window.localStorage;
    try {
      const k = '__q_prv__';
      window.sessionStorage.setItem(k, '1');
      window.sessionStorage.removeItem(k);
      return window.sessionStorage;
    } catch (e) {
      return null;
    }
  }

  function parseBool(v, fallback = false) {
    if (v === '' || v == null) return fallback;
    if (typeof v === 'boolean') return v;
    return String(v) === 'true' || String(v) === '1';
  }

  function safeJsonParse(str, fallback) {
    try {
      const v = JSON.parse(str);
      return v == null ? fallback : v;
    } catch {
      return fallback;
    }
  }

  function uniqueHandles(list) {
    const seen = new Set();
    const out = [];
    for (const h of list) {
      const handle = String(h || '').trim();
      if (!handle) continue;
      if (seen.has(handle)) continue;
      seen.add(handle);
      out.push(handle);
    }
    return out;
  }

  function clampInt(n, min, max, fallback) {
    const v = Number.parseInt(n, 10);
    if (Number.isNaN(v)) return fallback;
    return Math.max(min, Math.min(max, v));
  }

  function buildCardsUrl(root, handles, opts) {
    const url = new URL(root, window.location.origin);
    url.searchParams.set('section_id', 'product-recently-viewed-cards');
    url.searchParams.set('handles', handles.join(','));

    // Pass card behavior down to renderer (keeps server cards consistent with section settings)
    url.searchParams.set('qa', opts.enableQuickAdd ? '1' : '0');
    url.searchParams.set('qam', opts.quickAddMode);
    url.searchParams.set('qav', opts.quickAddVisibility);
    url.searchParams.set('cta', opts.primaryCtaLabel);
    url.searchParams.set('sel', opts.labelSelectOptions);
    url.searchParams.set('sold', opts.labelSoldOut);
    url.searchParams.set('bs', opts.buttonStyle);
    url.searchParams.set('bz', opts.buttonSize);

    return url.toString();
  }

  class ProductRecentlyViewed {
    constructor(sectionEl) {
      this.el = sectionEl;
      this.sectionId = sectionEl.dataset.sectionId;
      this.itemsEl = sectionEl.querySelector('[data-prv-items]');
      this.emptyEl = sectionEl.querySelector('[data-prv-empty]');
      this.prevBtn = sectionEl.querySelector('[data-prv-prev]');
      this.nextBtn = sectionEl.querySelector('[data-prv-next]');

      this.designMode = parseBool(sectionEl.dataset.designMode, false);

      this.currentHandle = (sectionEl.dataset.currentHandle || '').trim();
      this.maxProducts = clampInt(sectionEl.dataset.maxProducts, 2, 12, 8);

      this.showWhenEmpty = parseBool(sectionEl.dataset.showWhenEmpty, false);
      this.emptyText = sectionEl.dataset.emptyText || "You haven't viewed any products yet.";

      this.excludeCurrent = parseBool(sectionEl.dataset.excludeCurrent, true);
      this.dedupe = parseBool(sectionEl.dataset.dedupe, true);

      this.storageKey = sectionEl.dataset.storageKey || 'q_recently_viewed';
      this.storageLimit = clampInt(sectionEl.dataset.storageLimit, 10, 50, 20);

      this.layout = sectionEl.dataset.layout || 'grid';

      this.opts = {
        enableQuickAdd: parseBool(sectionEl.dataset.enableQuickAdd, true),
        quickAddMode: sectionEl.dataset.quickAddMode || 'button',
        quickAddVisibility: sectionEl.dataset.quickAddVisibility || 'desktop_only',
        primaryCtaLabel: sectionEl.dataset.primaryCtaLabel || 'Add to cart',
        labelSelectOptions: sectionEl.dataset.labelSelectOptions || 'Select options',
        labelSoldOut: sectionEl.dataset.labelSoldOut || 'Sold out',
        buttonStyle: sectionEl.dataset.buttonStyle || 'filled',
        buttonSize: sectionEl.dataset.buttonSize || 'md'
      };

      this.store = getStore(true);
    }

    init() {
      if (!this.itemsEl) return;

      // Always ensure some visibility in editor so merchant can configure
      if (this.designMode) {
        this.el.removeAttribute('hidden');
        this.el.style.display = '';
      }

      // Update history (only when we have a product handle)
      if (this.currentHandle) this.updateHistory(this.currentHandle);

      // Defer render to avoid impacting LCP
      const run = () => this.render();
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 1200 });
      } else {
        window.setTimeout(run, 0);
      }
    }

    readHistory() {
      if (!this.store) return [];
      const raw = this.store.getItem(this.storageKey);
      const arr = safeJsonParse(raw, []);
      if (!Array.isArray(arr)) return [];
      return arr.map(String);
    }

    writeHistory(list) {
      if (!this.store) return;
      try {
        this.store.setItem(this.storageKey, JSON.stringify(list));
      } catch (e) {
        // ignore quota errors
      }
    }

    updateHistory(current) {
      const existing = this.readHistory();
      let next = [current, ...existing];

      if (this.dedupe) next = uniqueHandles(next);
      next = next.slice(0, this.storageLimit);

      this.writeHistory(next);
    }

    computeRenderList() {
      let list = this.readHistory();

      if (this.dedupe) list = uniqueHandles(list);

      if (this.excludeCurrent && this.currentHandle) {
        list = list.filter((h) => h !== this.currentHandle);
      }

      return list.slice(0, this.maxProducts);
    }

    hideSection() {
      // Hide entire section on live storefront when empty (default behavior)
      this.el.style.display = 'none';
      this.el.setAttribute('hidden', 'hidden');
    }

    showSection() {
      this.el.style.display = '';
      this.el.removeAttribute('hidden');
    }

    showEmptyState() {
      if (!this.emptyEl) return;
      this.emptyEl.hidden = false;
      this.emptyEl.textContent = this.emptyText;
    }

    clearEmptyState() {
      if (!this.emptyEl) return;
      this.emptyEl.hidden = true;
    }

    setNavState() {
      if (this.layout !== 'carousel') return;
      const scroller = this.itemsEl;
      if (!scroller) return;

      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const left = scroller.scrollLeft;

      const canPrev = left > 2;
      const canNext = left < (maxScrollLeft - 2);

      if (this.prevBtn) this.prevBtn.disabled = !canPrev;
      if (this.nextBtn) this.nextBtn.disabled = !canNext;
    }

    bindCarouselControls() {
      if (this.layout !== 'carousel') return;
      if (!this.itemsEl) return;

      const scroller = this.itemsEl;
      const scrollByCard = (dir) => {
        // Scroll roughly one card width
        const firstItem = scroller.querySelector('.product-recently-viewed__item');
        const delta = firstItem ? firstItem.getBoundingClientRect().width + 16 : 320;
        scroller.scrollBy({ left: dir * delta, behavior: 'smooth' });
      };

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => scrollByCard(-1));
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => scrollByCard(1));
      }

      scroller.addEventListener('scroll', () => this.setNavState(), { passive: true });
      window.addEventListener('resize', () => this.setNavState(), { passive: true });
    }

    async fetchCards(handles) {
      const root = window.Shopify?.routes?.root || '/';
      const url = buildCardsUrl(root, handles, this.opts);

      const res = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      if (!res.ok) throw new Error(`Recently viewed cards fetch failed (${res.status})`);
      const text = await res.text();

      // Shopify section render returns HTML string
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const payload = doc.querySelector('[data-prv-cards]');
      return payload ? payload.innerHTML : '';
    }

    async render() {
      const handles = this.computeRenderList();

      if (!handles.length) {
        // If empty and editor -> do nothing (placeholders already shown).
        if (this.designMode) return;

        if (this.showWhenEmpty) {
          this.showSection();
          this.showEmptyState();
        } else {
          this.hideSection();
        }
        return;
      }

      this.showSection();
      this.clearEmptyState();

      try {
        const html = await this.fetchCards(handles);

        // If all requested handles fail (unpublished/404), html may be empty.
        if (!html || !html.trim()) {
          if (this.designMode) return;
          if (this.showWhenEmpty) {
            this.showEmptyState();
          } else {
            this.hideSection();
          }
          return;
        }

        this.itemsEl.innerHTML = html;

        // If carousel, wire controls & state
        this.bindCarouselControls();
        this.setNavState();
      } catch (e) {
        // Fail quietly (no console spam in production)
        if (this.designMode) console.warn(e);
        if (!this.designMode && !this.showWhenEmpty) this.hideSection();
        if (!this.designMode && this.showWhenEmpty) this.showEmptyState();
      }
    }
  }

  function initAll(root = document) {
    root.querySelectorAll('.product-recently-viewed[data-section-id]').forEach((el) => {
      // Avoid double init
      if (el.__qPrvInit) return;
      el.__qPrvInit = true;
      new ProductRecentlyViewed(el).init();
    });
  }

  document.addEventListener('DOMContentLoaded', () => initAll());

  // Theme editor support (section reloads)
  document.addEventListener('shopify:section:load', (evt) => {
    if (!evt?.target) return;
    initAll(evt.target);
  });
})();