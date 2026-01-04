(() => {
  const host = document.getElementById("q-qv");
  if (!host) return;

  const panel = host.querySelector(".q-qv__panel");
  const content = host.querySelector("[data-qv-content]");
  const closeEls = host.querySelectorAll("[data-qv-close]");
  let lastFocus = null;

  /* ------------------------------
     Utilities
  ------------------------------ */

  const moneyFormat = (cents) => {
    const v = (Number(cents) / 100).toFixed(2);
    return `$${v}`;
  };

  const setMode = (mode) => {
    host.setAttribute("data-mode", mode === "modal" ? "modal" : "drawer");
  };

  const open = () => {
    lastFocus = document.activeElement;
    host.hidden = false;
    host.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => panel?.focus());
  };

  const close = () => {
    host.hidden = true;
    host.setAttribute("aria-hidden", "true");
    content.innerHTML = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  const trap = (e) => {
    if (host.hidden || e.key !== "Tab") return;
    const focusables = panel.querySelectorAll(
      'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /* ------------------------------
     Variant detection
  ------------------------------ */

  const hasRealVariants = (product) => {
    // Shopify .js endpoint uses "Title" for single-variant products
    if (!product || !Array.isArray(product.variants)) return false;
    if (product.variants.length <= 1) return false;

    // If options is ["Title"] (or empty), treat as no real options UI
    if (!Array.isArray(product.options) || product.options.length === 0) return false;
    if (product.options.length === 1 && String(product.options[0]).toLowerCase() === "title") return false;

    return true;
  };

  const safeText = (v) => (typeof v === "string" ? v : (v == null ? "" : String(v)));

  /* ------------------------------
     Render
  ------------------------------ */

  const render = (product, variantId) => {
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const v = variants.find((x) => x.id === variantId) || variants[0];
    if (!v) {
      content.innerHTML = `<div class="q-qv__micro">Unable to load this product.</div>`;
      return;
    }

    // DEBUG (safe): uncomment if needed
    // console.log("QV product:", product);

    const img =
      v?.featured_image?.src ||
      product.featured_image ||
      "";

    const showOptions = hasRealVariants(product);

    const optionsHTML = showOptions
      ? product.options
          .map((name, idx) => {
            const values = [...new Set(variants.map((va) => va.options[idx]).filter(Boolean))];
            const current = v.options[idx];

            // If somehow this option has <2 values, skip rendering it
            if (values.length < 2) return "";

            return `
              <label class="q-qv__label">
                <span>${safeText(name)}</span>
                <select data-qv-option="${idx}">
                  ${values
                    .map((val) => {
                      const t = safeText(val);
                      return `<option value="${t}" ${t === current ? "selected" : ""}>${t}</option>`;
                    })
                    .join("")}
                </select>
              </label>
            `;
          })
          .join("")
      : "";

    const price = moneyFormat(v.price);
    const compare =
      v.compare_at_price && v.compare_at_price > v.price
        ? moneyFormat(v.compare_at_price)
        : "";

    const saleBadge = compare
      ? `<span class="q-qv__badge q-qv__badge--sale">Sale</span>`
      : "";

    const vendor = safeText(product.vendor);
    const title = safeText(product.title);

    const desc =
      typeof product.description === "string" && product.description.trim() !== ""
        ? product.description.replace(/<[^>]*>/g, "").trim()
        : "";

    content.innerHTML = `
      <div class="q-qv__grid">
        <div class="q-qv__media">
          ${saleBadge}
          ${img ? `<img src="${img}" alt="${title}" loading="lazy" />` : ``}
        </div>

        <div class="q-qv__info">
          ${vendor ? `<div class="q-qv__kicker">${vendor}</div>` : ``}
          <h3 class="q-qv__title">${title}</h3>

          <div class="q-qv__price">
            <span class="q-qv__price-main">${price}</span>
            ${compare ? `<span class="q-qv__price-compare">${compare}</span>` : ``}
          </div>

          ${optionsHTML ? `<div class="q-qv__options">${optionsHTML}</div>` : ``}

          <label class="q-qv__label">
            <span>Quantity</span>
            <input type="number" min="1" value="1" data-qv-qty />
          </label>

          <div class="q-qv__actions">
            <button
              type="button"
              class="q-qv__btn q-qv__btn--primary"
              data-qv-add
              ${v.available ? "" : "disabled"}
            >
              ${v.available ? "Add to cart" : "Sold out"}
            </button>

            <a class="q-qv__btn q-qv__btn--secondary" href="${safeText(product.url)}">
              View full product
            </a>
          </div>

          ${desc ? `<div class="q-qv__micro">${desc.slice(0, 220)}…</div>` : ``}

          <input type="hidden" value="${v.id}" data-qv-variant-id />
          <input type="hidden" value="${showOptions ? "1" : "0"}" data-qv-has-options />
        </div>
      </div>
    `;
  };

  /* ------------------------------
     Variant Helpers
  ------------------------------ */

  const findVariantByOptions = (product) => {
    const variants = product.variants || [];
    const selected = product.options.map(
      (_, i) => content.querySelector(`[data-qv-option="${i}"]`)?.value || ""
    );
    return variants.find((v) => v.options.every((opt, i) => opt === selected[i]));
  };

  const bind = (product) => {
    const showOptions = content.querySelector('[data-qv-has-options]')?.value === "1";

    // Only bind option changes if we actually rendered options
    if (showOptions) {
      content.querySelectorAll("[data-qv-option]").forEach((sel) => {
        sel.addEventListener("change", () => {
          const match = findVariantByOptions(product);
          if (match) {
            render(product, match.id);
            bind(product);
          }
        });
      });
    }

    // Add to cart
    const addBtn = content.querySelector("[data-qv-add]");
    const qtyEl = content.querySelector("[data-qv-qty]");

    if (addBtn) {
      addBtn.addEventListener("click", async () => {
        const id = Number(content.querySelector("[data-qv-variant-id]")?.value || 0);
        const qty = Number(qtyEl?.value || 1);
        if (!id || qty < 1) return;

        addBtn.disabled = true;
        const prior = addBtn.textContent;
        addBtn.textContent = "Adding…";

        try {
          const res = await fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, quantity: qty }),
          });
          if (!res.ok) throw new Error("Add failed");

          addBtn.textContent = "Added ✓";
          setTimeout(() => {
            addBtn.textContent = prior;
            addBtn.disabled = false;
          }, 900);
        } catch {
          addBtn.textContent = "Error — try again";
          setTimeout(() => {
            addBtn.textContent = prior;
            addBtn.disabled = false;
          }, 1200);
        }
      });
    }
  };

  /* ------------------------------
     Load Product
  ------------------------------ */

  const loadProduct = async (handle) => {
    const res = await fetch(`/products/${handle}.js`, { credentials: "same-origin" });
    if (!res.ok) throw new Error("Product load failed");
    const product = await res.json();
    product.url = `/products/${handle}`;
    return product;
  };

  /* ------------------------------
     Event Wiring
  ------------------------------ */

  document.addEventListener("click", async (e) => {
    const trigger = e.target.closest("[data-quick-view]");
    if (!trigger) return;

    e.preventDefault();

    const handle = trigger.getAttribute("data-product-handle");
    if (!handle) return;

    const section = trigger.closest('[data-feed="product-grid"]');
    const mode = section?.getAttribute("data-quick-view-mode") || "drawer";
    setMode(mode);

    try {
      const product = await loadProduct(handle);
      render(product, product.variants?.[0]?.id);
      bind(product);
      open();
    } catch {
      window.location.href = `/products/${handle}`;
    }
  });

  closeEls.forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !host.hidden) close();
    trap(e);
  });
})();
