/* Quadratum — Product Wishlist v1
   - LocalStorage store with fallback
   - PDP toggle + Wishlist list render
   - Sync via CustomEvent: q:wishlist:updated
*/

(function () {
  const EVENT_NAME = "q:wishlist:updated";
  const VERSION = 1;
  const HARD_CAP = 100;

  function safeJsonParse(str, fallback) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return fallback;
    }
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function uniqBy(items, keyFn) {
    const seen = new Set();
    const out = [];
    for (const it of items) {
      const k = keyFn(it);
      if (!k) continue;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(it);
    }
    return out;
  }

  function makeStore(storageKey) {
    let storageOK = true;
    let memory = { items: [], version: VERSION };

    function readFromStorage() {
      if (!storageOK) return memory;
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (!raw) return { items: [], version: VERSION };
        const parsed = safeJsonParse(raw, { items: [], version: VERSION });
        if (!parsed || !Array.isArray(parsed.items)) return { items: [], version: VERSION };
        return {
          version: parsed.version === VERSION ? VERSION : VERSION,
          items: parsed.items.filter(Boolean),
        };
      } catch (e) {
        storageOK = false;
        return memory;
      }
    }

    function writeToStorage(state) {
      if (!storageOK) {
        memory = state;
        return;
      }
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) {
        storageOK = false;
        memory = state;
      }
    }

    function getState() {
      const state = readFromStorage();
      // normalize ordering + cap
      const items = Array.isArray(state.items) ? state.items : [];
      return {
        version: VERSION,
        items: items.slice(0, HARD_CAP),
      };
    }

    function setState(nextState) {
      writeToStorage({
        version: VERSION,
        items: (nextState.items || []).slice(0, HARD_CAP),
      });
      dispatchUpdated();
    }

    function dispatchUpdated() {
      const { items } = getState();
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items } }));
    }

    function dedupe(items, useVariantId) {
      // most-recent-first, dedupe by variant_id preferred else product_handle
      const keyFn = (it) => {
        if (useVariantId && it.variant_id) return String(it.variant_id);
        return it.product_handle ? String(it.product_handle) : "";
      };
      return uniqBy(items, keyFn);
    }

    function addItem(payload, useVariantId) {
      const state = getState();
      const item = {
        product_handle: payload.product_handle || "",
        variant_id: payload.variant_id || null,
        added_at: payload.added_at || nowIso(),
      };

      // prepend and dedupe
      const nextItems = dedupe([item, ...state.items], useVariantId);

      // hard cap: drop oldest beyond cap
      const capped = nextItems.slice(0, HARD_CAP);

      setState({ items: capped });
      return getState();
    }

    function removeItem(payload, useVariantId) {
      const state = getState();
      const matchVariant = useVariantId && payload.variant_id;
      const nextItems = state.items.filter((it) => {
        if (matchVariant) return String(it.variant_id) !== String(payload.variant_id);
        return String(it.product_handle) !== String(payload.product_handle);
      });
      setState({ items: nextItems });
      return getState();
    }

    function hasItem(payload, useVariantId) {
      const state = getState();
      const matchVariant = useVariantId && payload.variant_id;
      return state.items.some((it) => {
        if (matchVariant) return String(it.variant_id) === String(payload.variant_id);
        return String(it.product_handle) === String(payload.product_handle);
      });
    }

    function clearAll() {
      setState({ items: [] });
      return getState();
    }

    function isStorageOK() {
      // Try a trivial write/read once (if still OK)
      if (!storageOK) return false;
      try {
        const t = "__q_wl_test__";
        window.localStorage.setItem(t, "1");
        window.localStorage.removeItem(t);
        return true;
      } catch (e) {
        storageOK = false;
        return false;
      }
    }

    return {
      getState,
      addItem,
      removeItem,
      hasItem,
      clearAll,
      isStorageOK,
      dispatchUpdated,
    };
  }

  async function fetchWishlistCardHTML(handle) {
    // Requires: sections/q-wishlist-card-render.liquid
    const url = `/products/${encodeURIComponent(handle)}?section_id=q-wishlist-card-render`;
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`Wishlist render failed for ${handle}`);
    return await res.text();
  }

  function setColsVars(root) {
    const d = parseInt(root.dataset.columnsDesktop || "4", 10);
    const t = parseInt(root.dataset.columnsTablet || "2", 10);
    const m = parseInt(root.dataset.columnsMobile || "1", 10);

    // CSS uses --pw-cols; match breakpoints in CSS
    const list = root.querySelector("[data-wishlist-list]");
    if (!list) return;

    list.style.setProperty("--pw-cols", String(d));

    // Provide responsive overrides using inline style + media? Not possible inline.
    // Instead: set data attrs; CSS already has tablet/mobile defaults (2/1).
    // If merchant changes tablet/mobile, we inject a small per-section style block once.
    const styleId = `q-wl-cols-${root.dataset.sectionId}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @media (max-width: 989px){ .product-wishlist[data-section-id="${root.dataset.sectionId}"] .product-wishlist__list{ --pw-cols:${t}; } }
      @media (max-width: 749px){ .product-wishlist[data-section-id="${root.dataset.sectionId}"] .product-wishlist__list{ --pw-cols:${m}; } }
    `;
    document.head.appendChild(style);
  }

  function updateCountUI(root, count) {
    const badge = root.querySelector("[data-wishlist-badge]");
    if (badge) badge.textContent = String(count);

    const countEl = root.querySelector("[data-wishlist-count]");
    if (countEl) {
      if (count === 1) countEl.textContent = "1 item";
      else countEl.textContent = `${count} items`;
    }
  }

  function setToggleUI(btn, active) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", active ? "true" : "false");

    const label = btn.querySelector("[data-wishlist-label]");
    if (label) label.textContent = active ? "Remove from wishlist" : "Add to wishlist";

    btn.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
    btn.classList.toggle("is-active", !!active);
  }

  function showNotice(root, show) {
    const notices = root.querySelectorAll("[data-wishlist-notice]");
    notices.forEach((n) => {
      if (show) n.removeAttribute("hidden");
      else n.setAttribute("hidden", "");
    });
  }

  function getContextPayload(root) {
    const product_handle = root.dataset.productHandle || "";
    const variant_id = root.dataset.variantId ? Number(root.dataset.variantId) : null;
    return { product_handle, variant_id };
  }

  async function renderList(root, store) {
    const list = root.querySelector("[data-wishlist-list]");
    const empty = root.querySelector("[data-wishlist-empty]");
    if (!list || !empty) return;

    const maxProducts = parseInt(root.dataset.maxProducts || "12", 10);
    const showRemove = root.dataset.showRemoveButtons !== "false";
    const state = store.getState();
    const items = (state.items || []).slice(0, maxProducts);

    updateCountUI(root, (state.items || []).length);

    // Empty state
    if (!items.length) {
      list.innerHTML = "";
      empty.removeAttribute("hidden");
      return;
    } else {
      empty.setAttribute("hidden", "");
    }

    // Render skeletons quickly
    list.innerHTML = items
      .map(
        () =>
          `<div class="product-wishlist__item" aria-busy="true"><div style="opacity:.6; padding:1rem; border:1px solid rgba(0,0,0,.08); border-radius:1rem;">Loading…</div></div>`
      )
      .join("");

    const nodes = Array.from(list.children);

    // Fetch + inject each card
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const slot = nodes[i];
      if (!slot) continue;

      try {
        const html = await fetchWishlistCardHTML(it.product_handle);
        // Wrap into item container + optional remove button overlay (provided by render section as well)
        slot.setAttribute("aria-busy", "false");
        slot.innerHTML = html;

        // Ensure remove button presence/behavior even if merchant toggles it off
        const removeBtn = slot.querySelector("[data-wishlist-remove]");
        if (removeBtn) {
          if (!showRemove) removeBtn.setAttribute("hidden", "");
          else removeBtn.removeAttribute("hidden");
        } else if (showRemove) {
          // Fallback remove overlay
          const title = slot.querySelector("[data-wishlist-title]")?.getAttribute("data-wishlist-title") || "item";
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "product-wishlist__remove";
          btn.setAttribute("data-wishlist-remove", "");
          if (it.variant_id) btn.setAttribute("data-variant-id", String(it.variant_id));
          btn.setAttribute("data-handle", it.product_handle);
          btn.setAttribute("aria-label", `Remove ${title} from wishlist`);
          btn.innerHTML =
            '<svg viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.29-6.3z"/></svg>';
          slot.prepend(btn);
        }
      } catch (e) {
        slot.setAttribute("aria-busy", "false");
        slot.innerHTML = `<div class="product-wishlist__item-error" style="padding:1rem; border:1px solid rgba(0,0,0,.12); border-radius:1rem;">
          Couldn’t load <strong>${it.product_handle}</strong>.
        </div>`;
      }
    }
  }

  function bindRemoveAndClear(root, store) {
    root.addEventListener("click", (e) => {
      const removeBtn = e.target.closest("[data-wishlist-remove]");
      if (removeBtn) {
        e.preventDefault();

        const useVariant = root.dataset.useVariantId === "true";
        const variant_id = removeBtn.getAttribute("data-variant-id");
        const handle = removeBtn.getAttribute("data-handle") || "";

        const payload = {
          product_handle: handle,
          variant_id: variant_id ? Number(variant_id) : null,
        };

        // Focus management: next remove, else list container
        const list = root.querySelector("[data-wishlist-list]");
        const allRemoves = list ? Array.from(list.querySelectorAll("[data-wishlist-remove]")) : [];
        const idx = allRemoves.indexOf(removeBtn);

        store.removeItem(payload, useVariant);

        // After update event rerender, we’ll attempt to focus the next sensible target
        window.requestAnimationFrame(() => {
          const newRemoves = list ? Array.from(list.querySelectorAll("[data-wishlist-remove]")) : [];
          const next = newRemoves[idx] || newRemoves[idx - 1] || null;
          if (next) next.focus();
          else if (list) list.focus?.();
        });

        return;
      }

      const clearBtn = e.target.closest("[data-wishlist-clear]");
      if (clearBtn) {
        e.preventDefault();
        store.clearAll();

        const list = root.querySelector("[data-wishlist-list]");
        if (list) list.focus?.();
      }
    });
  }

  function bindToggle(root, store) {
    const btn = root.querySelector("[data-wishlist-toggle]");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const useVariant = root.dataset.useVariantId === "true";
      const payload = getContextPayload(root);

      if (!payload.product_handle) return;

      const active = store.hasItem(payload, useVariant);
      if (active) store.removeItem(payload, useVariant);
      else store.addItem(payload, useVariant);
    });
  }

  function syncUI(root, store) {
    const state = store.getState();
    updateCountUI(root, (state.items || []).length);

    // PDP toggle state
    const btn = root.querySelector("[data-wishlist-toggle]");
    if (btn) {
      const useVariant = root.dataset.useVariantId === "true";
      const payload = getContextPayload(root);
      const active = payload.product_handle ? store.hasItem(payload, useVariant) : false;
      setToggleUI(btn, active);
    }
  }

  function initSection(root) {
    if (!root || root.__qWishlistInit) return;
    root.__qWishlistInit = true;

    // Ensure we have section id for injected styles
    if (!root.dataset.sectionId) {
      root.dataset.sectionId = root.getAttribute("data-section-id") || "";
    }

    const storageKey = root.dataset.wishlistKey || "q:wishlist:v1";
    const store = makeStore(storageKey);

    // Storage notice
    showNotice(root, !store.isStorageOK());

    // Columns override
    setColsVars(root);

    // Bind interactions
    bindToggle(root, store);
    bindRemoveAndClear(root, store);

    // Initial UI
    syncUI(root, store);

    // Initial list render (if list present)
    const hasList = !!root.querySelector("[data-wishlist-list]");
    if (hasList) {
      renderList(root, store);
    }

    // Listen for global updates
    window.addEventListener(EVENT_NAME, () => {
      showNotice(root, !store.isStorageOK());
      syncUI(root, store);
      if (hasList) renderList(root, store);
    });

    // Also react to native storage events (multi-tab)
    window.addEventListener("storage", (e) => {
      if (e.key === storageKey) {
        store.dispatchUpdated();
      }
    });
  }

  function initAll() {
    document.querySelectorAll(".product-wishlist[data-section-id]").forEach(initSection);
  }

  // Shopify theme editor section load
  document.addEventListener("shopify:section:load", (e) => {
    const container = e.target;
    if (!container) return;
    container.querySelectorAll(".product-wishlist[data-section-id]").forEach(initSection);
  });

  // DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();