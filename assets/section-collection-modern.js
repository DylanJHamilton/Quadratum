/* Quadratum — Collection Modern (Interactive)
   Scoped to .q-collection-modern only.
*/
(() => {
  const qs = (root, sel) => root.querySelector(sel);
  const qsa = (root, sel) => Array.from(root.querySelectorAll(sel));

  const parseHTML = (html) => new DOMParser().parseFromString(html, "text/html");

  const getFocusable = (el) => qsa(el, [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(','));

  function serializeForm(form) {
    const fd = new FormData(form);
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      if (v === "" || v == null) continue;
      params.append(k, v.toString());
    }
    return params.toString();
  }

  function safeJSON(v, fallback) {
    try { return JSON.parse(v); } catch(e){ return fallback; }
  }

  class QcmEngine {
    constructor(root){
      this.root = root;
      this.sectionId = root.dataset.sectionId;
      this.enableAjax = root.dataset.enableAjax === "true";
      this.filterMode = root.dataset.filterMode || "none";
      this.enableDrawer = root.dataset.enableDrawer === "true";
      this.paginationStyle = root.dataset.paginationStyle || "numbered";

      this.enableQuickView = root.dataset.enableQuickview === "true";
      this.enableCompare = root.dataset.enableCompare === "true";
      this.enableWishlist = root.dataset.enableWishlist === "true";
      this.enableSwatches = root.dataset.enableSwatches === "true";

      this.wishlistKey = root.dataset.wishlistKey || "qtm_wishlist";
      this.compareKey = root.dataset.compareKey || "qtm_compare";
      this.compareMax = parseInt(root.dataset.compareMax || "4", 10);

      this.loadingBar = null;

      this.drawer = null;
      this.drawerPanel = null;
      this.drawerOpenBtn = null;

      this.modal = null;
      this.modalPanel = null;
      this.modalBody = null;
      this.lastActiveEl = null;

      this.compareEl = qs(root, "[data-qcm-compare]");
      this.compareItemsEl = qs(root, "[data-qcm-compare-items]");
      this.compareCountEl = qs(root, "[data-qcm-compare-count]");

      this.io = null;

      this.init();
    }

    init(){
      // Drawer wiring (if present)
      if (this.enableDrawer) this.bindDrawer();

      // AJAX wiring
      if (this.enableAjax) this.bindAjax();

      // Pagination enhancements (Load more / Infinite)
      if (this.paginationStyle === "load_more" || this.paginationStyle === "infinite_scroll") {
        this.bindLoadMore();
      }

      // Quick View
      if (this.enableQuickView) this.bindQuickView();

      // Compare & wishlist
      if (this.enableCompare) this.bindCompare();
      if (this.enableWishlist) this.bindWishlist();

      // Swatches
      if (this.enableSwatches) this.bindSwatches();

      // Back/forward
      if (this.enableAjax) {
        window.addEventListener("popstate", (e) => {
          // Only handle if URL changed and section exists
          this.fetchAndSwap(location.href, {push:false});
        });
      }
    }

    setLoading(isLoading){
      this.root.classList.toggle("is-loading", !!isLoading);
      const toolbar = qs(this.root, "[data-qcm-toolbar]");
      if (!toolbar) return;

      if (isLoading) {
        if (!this.loadingBar) {
          this.loadingBar = document.createElement("div");
          this.loadingBar.className = "qcmLoadingBar";
        }
        if (!toolbar.contains(this.loadingBar)) toolbar.appendChild(this.loadingBar);
      } else {
        if (this.loadingBar && this.loadingBar.parentNode) {
          this.loadingBar.parentNode.removeChild(this.loadingBar);
        }
      }
    }

    // ---------- Drawer ----------
    bindDrawer(){
      // Drawer markup lives inside facets snippet
      this.drawer = qs(this.root, "[data-qcm-drawer]");
      this.drawerPanel = qs(this.root, "[data-qcm-drawer-panel]");
      this.drawerOpenBtn = qs(this.root, "[data-qcm-drawer-open]");

      if (!this.drawer || !this.drawerPanel || !this.drawerOpenBtn) return;

      const closeEls = qsa(this.root, "[data-qcm-drawer-close]");
      const onClose = () => this.closeDrawer();
      closeEls.forEach(el => el.addEventListener("click", onClose));

      this.drawerOpenBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });

      document.addEventListener("keydown", (e) => {
        if (this.drawer.hasAttribute("hidden")) return;
        if (e.key === "Escape") this.closeDrawer();
        if (e.key === "Tab") this.trapFocus(e, this.drawerPanel);
      });
    }

    openDrawer(){
      this.lastActiveEl = document.activeElement;
      this.drawer.removeAttribute("hidden");
      this.drawer.setAttribute("aria-hidden", "false");
      const focusables = getFocusable(this.drawerPanel);
      (focusables[0] || this.drawerPanel).focus();
      document.documentElement.style.overflow = "hidden";
    }

    closeDrawer(){
      if (!this.drawer) return;
      this.drawer.setAttribute("hidden", "");
      this.drawer.setAttribute("aria-hidden", "true");
      document.documentElement.style.overflow = "";
      if (this.lastActiveEl) this.lastActiveEl.focus();
    }

    trapFocus(e, container){
      const focusables = getFocusable(container);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // ---------- AJAX ----------
    bindAjax(){
      // Intercept any link with data-qcm-ajax-link within this root
      this.root.addEventListener("click", (e) => {
        const a = e.target.closest("a[data-qcm-ajax-link]");
        if (!a) return;
        if (a.target && a.target !== "_self") return;

        e.preventDefault();
        const url = a.href;
        this.fetchAndSwap(url, {push:true});
      });

      // Facets form submit/change
      this.root.addEventListener("submit", (e) => {
        const form = e.target.closest("form[data-qcm-facets-form]");
        if (!form) return;
        e.preventDefault();

        const action = form.getAttribute("action") || location.pathname;
        const qs = serializeForm(form);
        const url = qs ? `${action}?${qs}` : action;
        this.fetchAndSwap(url, {push:true});
      });

      this.root.addEventListener("change", (e) => {
        const form = e.target.closest("form[data-qcm-facets-form]");
        if (form && form.dataset.qcmAutosubmit === "true") {
          // Auto submit on filter toggle
          const submitEvt = new Event("submit", {bubbles:true, cancelable:true});
          form.dispatchEvent(submitEvt);
        }
      });

      // Sort select change
      this.root.addEventListener("change", (e) => {
        const sel = e.target.closest("select[data-qcm-sort]");
        if (!sel) return;
        const url = sel.value;
        if (!url) return;
        this.fetchAndSwap(url, {push:true});
      });
    }

    async fetchAndSwap(url, {push}){
      this.setLoading(true);
      try{
        const res = await fetch(url, {headers: {"X-Requested-With":"XMLHttpRequest"}});
        if (!res.ok) throw new Error("Fetch failed");
        const html = await res.text();
        const doc = parseHTML(html);

        const incomingRoot = doc.getElementById(`QtmCollectionModern-${this.sectionId}`);
        if (!incomingRoot) {
          // fallback: hard navigate
          location.href = url;
          return;
        }

        // Replace subtrees
        this.swapRegion(incomingRoot, "[data-qcm-toolbar]");
        this.swapRegion(incomingRoot, "[data-qcm-facets]");
        this.swapRegion(incomingRoot, "[data-qcm-grid]");
        this.swapRegion(incomingRoot, "[data-qcm-pagination]");

        // Update data attributes that might change
        this.root.dataset.paginationStyle = incomingRoot.dataset.paginationStyle || this.root.dataset.paginationStyle;

        if (push) history.pushState({}, "", url);

        // Re-bind after swap
        if (this.enableDrawer) this.bindDrawer();
        if (this.paginationStyle === "load_more" || this.paginationStyle === "infinite_scroll") this.bindLoadMore();
        if (this.enableQuickView) this.bindQuickView();
        if (this.enableCompare) this.refreshCompareUI();
        if (this.enableWishlist) this.refreshWishlistUI();
      } catch(err){
        // fallback
        location.href = url;
      } finally {
        this.setLoading(false);
      }
    }

    swapRegion(incomingRoot, selector){
      const incoming = incomingRoot.querySelector(selector);
      const current = this.root.querySelector(selector);
      if (!incoming || !current) return;

      // Replace element
      current.replaceWith(incoming);
    }

    // ---------- Load more / Infinite ----------
    bindLoadMore(){
      // Clear previous observer
      if (this.io) { this.io.disconnect(); this.io = null; }

      const pag = qs(this.root, "[data-qcm-pagination]");
      if (!pag) return;

      const btn = qs(pag, "[data-qcm-loadmore]");
      const sentinel = qs(pag, "[data-qcm-sentinel]");

      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const next = btn.getAttribute("href");
          if (!next) return;
          this.appendNextPage(next);
        }, {once:false});
      }

      if (this.paginationStyle === "infinite_scroll" && sentinel) {
        this.io = new IntersectionObserver((entries) => {
          const ent = entries[0];
          if (!ent || !ent.isIntersecting) return;

          const nextUrl = sentinel.getAttribute("data-next-url") || "";
          if (!nextUrl) return;

          // prevent rapid refires
          sentinel.setAttribute("data-next-url", "");
          this.appendNextPage(nextUrl).then((newNext) => {
            if (newNext) sentinel.setAttribute("data-next-url", newNext);
          });
        }, {rootMargin: "600px 0px"});
        this.io.observe(sentinel);
      }
    }

    async appendNextPage(url){
      const grid = qs(this.root, "[data-qcm-grid]");
      const pag = qs(this.root, "[data-qcm-pagination]");
      if (!grid || !pag) return "";

      this.setLoading(true);
      try{
        const res = await fetch(url, {headers: {"X-Requested-With":"XMLHttpRequest"}});
        if (!res.ok) throw new Error("Fetch failed");
        const html = await res.text();
        const doc = parseHTML(html);

        const incomingRoot = doc.getElementById(`QtmCollectionModern-${this.sectionId}`);
        if (!incomingRoot) return "";

        const incomingGrid = incomingRoot.querySelector("[data-qcm-grid]");
        const incomingPag = incomingRoot.querySelector("[data-qcm-pagination]");

        if (incomingGrid) {
          const newItems = incomingGrid.querySelectorAll("[data-qcm-item]");
          newItems.forEach(it => grid.appendChild(it));
        }

        if (incomingPag) {
          pag.replaceWith(incomingPag);
        }

        // Return next url (for infinite)
        const newPag = qs(this.root, "[data-qcm-pagination]");
        const sentinel = newPag ? qs(newPag, "[data-qcm-sentinel]") : null;
        if (sentinel) return sentinel.getAttribute("data-next-url") || "";

        return "";
      } catch(e){
        return "";
      } finally {
        this.setLoading(false);
        // Re-bind after pagination swap
        this.bindLoadMore();
        if (this.enableQuickView) this.bindQuickView();
        if (this.enableCompare) this.refreshCompareUI();
        if (this.enableWishlist) this.refreshWishlistUI();
      }
    }

    // ---------- Quick View ----------
    bindQuickView(){
      this.modal = qs(this.root, "[data-qcm-modal]");
      this.modalPanel = this.modal ? qs(this.modal, ".qcmModal__panel") : null;
      this.modalBody = this.modal ? qs(this.modal, "[data-qcm-modal-body]") : null;

      if (!this.modal || !this.modalPanel || !this.modalBody) return;

      qsa(this.root, "[data-qcm-quickview]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const handle = btn.getAttribute("data-handle");
          const url = btn.getAttribute("data-url");
          if (!handle) {
            if (url) location.href = url;
            return;
          }
          this.openModal(handle, url);
        }, {once:false});
      });

      qsa(this.modal, "[data-qcm-modal-close]").forEach(el => {
        el.addEventListener("click", () => this.closeModal());
      });

      document.addEventListener("keydown", (e) => {
        if (this.modal.hasAttribute("hidden")) return;
        if (e.key === "Escape") this.closeModal();
        if (e.key === "Tab") this.trapFocus(e, this.modalPanel);
      });
    }

    openModal(handle, fallbackUrl){
      this.lastActiveEl = document.activeElement;
      this.modal.removeAttribute("hidden");
      this.modal.setAttribute("aria-hidden", "false");
      document.documentElement.style.overflow = "hidden";

      this.modalBody.innerHTML = `<div class="qcmModal__loading">Loading…</div>`;
      this.fetchQuickView(handle, fallbackUrl);
    }

    closeModal(){
      if (!this.modal) return;
      this.modal.setAttribute("hidden", "");
      this.modal.setAttribute("aria-hidden", "true");
      document.documentElement.style.overflow = "";
      if (this.lastActiveEl) this.lastActiveEl.focus();
    }

    async fetchQuickView(handle, fallbackUrl){
      try{
        const res = await fetch(`/products/${handle}.js`);
        if (!res.ok) throw new Error("Product JSON fetch failed");
        const p = await res.json();

        const price = (p.price / 100).toLocaleString(undefined, {style:"currency", currency: (p.currency || "USD")});
        const img = p.featured_image || "";
        const url = p.url || fallbackUrl || `/products/${handle}`;
        const variants = p.variants || [];

        const hasVariants = variants.length > 1 || (variants[0] && variants[0].title && variants[0].title.toLowerCase() !== "default title");
        const firstAvail = variants.find(v => v.available) || variants[0];

        const optionsHtml = hasVariants
          ? `<label style="display:block;margin:10px 0 6px;">Variant</label>
             <select data-qcm-qv-variant style="width:100%;padding:10px;border:1px solid rgba(0,0,0,.15);border-radius:12px;">
               ${variants.map(v => `<option value="${v.id}" ${v.id===firstAvail.id?'selected':''} ${v.available?'':'disabled'}>${v.title}${v.available?'':' (Sold out)'}</option>`).join("")}
             </select>`
          : `<input type="hidden" data-qcm-qv-variant value="${firstAvail.id}">`;

        this.modalBody.innerHTML = `
          <div style="display:grid;grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap:16px;">
            <div>
              ${img ? `<img src="${img}" alt="" style="width:100%;height:auto;border-radius:16px;border:1px solid rgba(0,0,0,.12);">` : ""}
            </div>
            <div>
              <h2 style="margin:0 0 6px;">${p.title}</h2>
              <div style="opacity:.85;margin-bottom:12px;">${price}</div>
              ${optionsHtml}
              <label style="display:block;margin:12px 0 6px;">Qty</label>
              <input type="number" min="1" value="1" data-qcm-qv-qty style="width:100%;padding:10px;border:1px solid rgba(0,0,0,.15);border-radius:12px;">
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
                <button type="button" class="qcm__btn" data-qcm-qv-atc>Add to cart</button>
                <a class="qcm__btn" href="${url}">View product</a>
              </div>
              <div style="margin-top:10px;opacity:.8;" data-qcm-qv-msg></div>
            </div>
          </div>
        `;

        const btn = this.modalBody.querySelector("[data-qcm-qv-atc]");
        const msg = this.modalBody.querySelector("[data-qcm-qv-msg]");

        btn.addEventListener("click", async () => {
          const vidEl = this.modalBody.querySelector("[data-qcm-qv-variant]");
          const qtyEl = this.modalBody.querySelector("[data-qcm-qv-qty]");
          const variantId = vidEl ? parseInt(vidEl.value, 10) : firstAvail.id;
          const quantity = qtyEl ? parseInt(qtyEl.value, 10) : 1;

          msg.textContent = "Adding…";
          try{
            const r = await fetch("/cart/add.js", {
              method: "POST",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({items:[{id: variantId, quantity: quantity}]})
            });
            if (!r.ok) throw new Error("ATC failed");
            msg.textContent = "Added to cart.";
          } catch(e){
            msg.textContent = "Could not add to cart. Please open the product page.";
          }
        });

        // Focus
        const f = getFocusable(this.modalPanel)[0];
        if (f) f.focus();

      } catch(e){
        this.modalBody.innerHTML = `<p>Could not load quick view.</p>`;
      }
    }

    // ---------- Compare ----------
    bindCompare(){
      this.root.addEventListener("click", (e) => {
        const t = e.target.closest("[data-qcm-compare-toggle]");
        if (!t) return;
        e.preventDefault();
        const handle = t.getAttribute("data-handle");
        const title = t.getAttribute("data-title") || "";
        if (!handle) return;
        this.toggleCompare(handle, title);
      });

      const clearBtn = qs(this.root, "[data-qcm-compare-clear]");
      if (clearBtn) clearBtn.addEventListener("click", () => {
        localStorage.setItem(this.compareKey, JSON.stringify([]));
        this.refreshCompareUI();
      });

      this.refreshCompareUI();
    }

    getCompare(){
      const raw = localStorage.getItem(this.compareKey);
      const list = safeJSON(raw, []);
      return Array.isArray(list) ? list : [];
    }

    setCompare(list){
      localStorage.setItem(this.compareKey, JSON.stringify(list));
    }

    toggleCompare(handle, title){
      let list = this.getCompare();
      const idx = list.findIndex(x => x.handle === handle);
      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        if (list.length >= this.compareMax) list.shift();
        list.push({handle, title});
      }
      this.setCompare(list);
      this.refreshCompareUI();
    }

    refreshCompareUI(){
      if (!this.compareEl) return;
      const list = this.getCompare();
      this.compareEl.hidden = list.length === 0;

      if (this.compareCountEl) this.compareCountEl.textContent = `${list.length}/${this.compareMax}`;

      if (this.compareItemsEl) {
        this.compareItemsEl.innerHTML = "";
        list.forEach(item => {
          const pill = document.createElement("span");
          pill.className = "qcmCompare__pill";
          pill.innerHTML = `<span>${item.title || item.handle}</span><button type="button" aria-label="Remove">×</button>`;
          pill.querySelector("button").addEventListener("click", () => {
            let l = this.getCompare();
            l = l.filter(x => x.handle !== item.handle);
            this.setCompare(l);
            this.refreshCompareUI();
          });
          this.compareItemsEl.appendChild(pill);
        });
      }

      // Update toggles on cards
      qsa(this.root, "[data-qcm-compare-toggle]").forEach(btn => {
        const h = btn.getAttribute("data-handle");
        const active = list.some(x => x.handle === h);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
        btn.classList.toggle("is-active", active);
      });
    }

    // ---------- Wishlist ----------
    bindWishlist(){
      this.root.addEventListener("click", (e) => {
        const t = e.target.closest("[data-qcm-wish-toggle]");
        if (!t) return;
        e.preventDefault();
        const handle = t.getAttribute("data-handle");
        if (!handle) return;
        this.toggleWish(handle);
      });
      this.refreshWishlistUI();
    }

    getWish(){
      const raw = localStorage.getItem(this.wishlistKey);
      const list = safeJSON(raw, []);
      return Array.isArray(list) ? list : [];
    }
    setWish(list){
      localStorage.setItem(this.wishlistKey, JSON.stringify(list));
    }
    toggleWish(handle){
      let list = this.getWish();
      const idx = list.indexOf(handle);
      if (idx >= 0) list.splice(idx, 1);
      else list.push(handle);
      this.setWish(list);
      this.refreshWishlistUI();
    }
    refreshWishlistUI(){
      const list = this.getWish();
      qsa(this.root, "[data-qcm-wish-toggle]").forEach(btn => {
        const h = btn.getAttribute("data-handle");
        const active = list.includes(h);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
        btn.classList.toggle("is-active", active);
      });
    }

    // ---------- Swatches ----------
    bindSwatches(){
      this.root.addEventListener("click", (e) => {
        const sw = e.target.closest("[data-qcm-swatch]");
        if (!sw) return;
        e.preventDefault();

        const card = sw.closest("[data-qcm-card]");
        if (!card) return;

        const img = sw.getAttribute("data-image") || "";
        const vid = sw.getAttribute("data-variant-id") || "";

        if (img) {
          const imgEl = card.querySelector("[data-qcm-card-image]");
          if (imgEl) imgEl.setAttribute("src", img);
        }

        if (vid) {
          const hid = card.querySelector('input[name="id"][data-qcm-variant-id]');
          if (hid) hid.value = vid;
        }

        // Selected UI
        qsa(card, "[data-qcm-swatch]").forEach(b => b.setAttribute("aria-current", "false"));
        sw.setAttribute("aria-current", "true");
      });
    }
  }

  function boot(){
    document.querySelectorAll(".q-collection-modern[data-section-id]").forEach(root => {
      // prevent double init
      if (root.__qcm) return;
      root.__qcm = new QcmEngine(root);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();