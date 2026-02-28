// File: assets/section-product-recently-viewed.js
(() => {
  const canUse = (store) => {
    try {
      const k = '__q_prv__';
      store.setItem(k, '1');
      store.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getStore = () => {
    if (canUse(window.localStorage)) return window.localStorage;
    if (canUse(window.sessionStorage)) return window.sessionStorage;
    return null;
  };

  const parseBool = (v, fallback = false) => {
    if (v == null || v === '') return fallback;
    if (typeof v === 'boolean') return v;
    const s = String(v);
    return s === 'true' || s === '1';
  };

  const safeJsonParse = (str, fallback) => {
    try {
      const v = JSON.parse(str);
      return v == null ? fallback : v;
    } catch {
      return fallback;
    }
  };

  const unique = (arr) => {
    const seen = new Set();
    const out = [];
    for (const x of arr) {
      const v = String(x || '').trim();
      if (!v) continue;
      if (seen.has(v)) continue;
      seen.add(v);
      out.push(v);
    }
    return out;
  };

  const clampInt = (n, min, max, fallback) => {
    const v = Number.parseInt(n, 10);
    if (Number.isNaN(v)) return fallback;
    return Math.max(min, Math.min(max, v));
  };

  const buildUrl = (handles, opts) => {
    const root = window.Shopify?.routes?.root || '/';
    const url = new URL(root, window.location.origin);
    url.searchParams.set('section_id', 'product-recently-viewed-cards');
    url.searchParams.set('handles', handles.join(','));

    // Match product-card inputs
    url.searchParams.set('qa', opts.enableQuickAdd ? '1' : '0');
    url.searchParams.set('qam', opts.quickAddMode);
    url.searchParams.set('hav', opts.hoverActionsVisibility);
    url.searchParams.set('cta', opts.primaryCtaLabel);
    url.searchParams.set('sel', opts.labelSelectOptions);
    url.searchParams.set('sold', opts.labelSoldOut);
    url.searchParams.set('bs', opts.buttonStyle);
    url.searchParams.set('bz', opts.buttonSize);

    return url.toString();
  };

  class RecentlyViewed {
    constructor(el) {
      this.el = el;
      this.itemsEl = el.querySelector('[data-prv-items]');
      this.emptyEl = el.querySelector('[data-prv-empty]');
      this.prevBtn = el.querySelector('[data-prv-prev]');
      this.nextBtn = el.querySelector('[data-prv-next]');

      this.designMode = parseBool(el.dataset.designMode, false);

      this.currentHandle = (el.dataset.currentHandle || '').trim();
      this.maxProducts = clampInt(el.dataset.maxProducts, 2, 12, 8);
      this.layout = el.dataset.layout || 'grid';

      this.showWhenEmpty = parseBool(el.dataset.showWhenEmpty, false);
      this.emptyText = el.dataset.emptyText || "You haven't viewed any products yet.";
      this.excludeCurrent = parseBool(el.dataset.excludeCurrent, true);
      this.dedupe = parseBool(el.dataset.dedupe, true);

      this.storageKey = el.dataset.storageKey || 'q_recently_viewed';
      this.storageLimit = clampInt(el.dataset.storageLimit, 10, 50, 20);

      this.opts = {
        enableQuickAdd: parseBool(el.dataset.enableQuickAdd, true),
        quickAddMode: el.dataset.quickAddMode || 'button',
        hoverActionsVisibility: el.dataset.hoverActionsVisibility || 'desktop_only',
        primaryCtaLabel: el.dataset.primaryCtaLabel || 'Add to cart',
        labelSelectOptions: el.dataset.labelSelectOptions || 'Select options',
        labelSoldOut: el.dataset.labelSoldOut || 'Sold out',
        buttonStyle: el.dataset.buttonStyle || 'filled',
        buttonSize: el.dataset.buttonSize || 'md'
      };

      this.store = getStore();
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

    updateHistory(handle) {
      let next = [handle, ...this.readHistory()];
      if (this.dedupe) next = unique(next);
      next = next.slice(0, this.storageLimit);
      this.writeHistory(next);
    }

    computeList() {
      let list = this.readHistory();
      if (this.dedupe) list = unique(list);
      if (this.excludeCurrent && this.currentHandle) {
        list = list.filter((h) => h !== this.currentHandle);
      }
      return list.slice(0, this.maxProducts);
    }

    hideSection() {
      this.el.style.display = 'none';
      this.el.setAttribute('hidden', 'hidden');
    }

    showSection() {
      this.el.style.display = '';
      this.el.removeAttribute('hidden');
    }

    showEmpty() {
      if (!this.emptyEl) return;
      this.emptyEl.hidden = false;
      this.emptyEl.textContent = this.emptyText;
    }

    clearEmpty() {
      if (!this.emptyEl) return;
      this.emptyEl.hidden = true;
    }

    setNavState() {
      if (this.layout !== 'carousel' || !this.itemsEl) return;
      const scroller = this.itemsEl;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const left = scroller.scrollLeft;

      const canPrev = left > 2;
      const canNext = left < (maxScrollLeft - 2);

      if (this.prevBtn) this.prevBtn.disabled = !canPrev;
      if (this.nextBtn) this.nextBtn.disabled = !canNext;
    }

    bindCarousel() {
      if (this.layout !== 'carousel' || !this.itemsEl) return;
      const scroller = this.itemsEl;

      const scrollByCard = (dir) => {
        const firstItem = scroller.querySelector('.product-recently-viewed__item');
        const delta = firstItem ? firstItem.getBoundingClientRect().width + 16 : 320;
        scroller.scrollBy({ left: dir * delta, behavior: 'smooth' });
      };

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => scrollByCard(-1));
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => scrollByCard(1));

      scroller.addEventListener('scroll', () => this.setNavState(), { passive: true });
      window.addEventListener('resize', () => this.setNavState(), { passive: true });
    }

    async fetchCards(handles) {
      const url = buildUrl(handles, this.opts);
      const res = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      if (!res.ok) throw new Error(`Recently viewed fetch failed (${res.status})`);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const node = doc.querySelector('[data-prv-cards]');
      return node ? node.innerHTML : '';
    }

    async render() {
      const handles = this.computeList();

      if (!handles.length) {
        if (this.designMode) return;

        if (this.showWhenEmpty) {
          this.showSection();
          this.showEmpty();
        } else {
          this.hideSection();
        }
        return;
      }

      this.showSection();
      this.clearEmpty();

      try {
        const html = await this.fetchCards(handles);

        if (!html || !html.trim()) {
          if (this.designMode) return;
          if (this.showWhenEmpty) this.showEmpty();
          else this.hideSection();
          return;
        }

        this.itemsEl.innerHTML = html;

        this.bindCarousel();
        this.setNavState();
      } catch (e) {
        if (this.designMode) console.warn(e);
        if (!this.designMode && this.showWhenEmpty) this.showEmpty();
        if (!this.designMode && !this.showWhenEmpty) this.hideSection();
      }
    }

    init() {
      if (!this.itemsEl) return;

      if (this.designMode) {
        this.showSection();
      }

      if (this.currentHandle) this.updateHistory(this.currentHandle);

      const run = () => this.render();
      if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 1200 });
      else window.setTimeout(run, 0);
    }
  }

  const initAll = (root = document) => {
    root.querySelectorAll('.product-recently-viewed[data-section-id]').forEach((el) => {
      if (el.__qPrvInit) return;
      el.__qPrvInit = true;
      new RecentlyViewed(el).init();
    });
  };

  document.addEventListener('DOMContentLoaded', () => initAll());

  document.addEventListener('shopify:section:load', (evt) => {
    if (evt?.target) initAll(evt.target);
  });
})();