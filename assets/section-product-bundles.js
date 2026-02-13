(() => {
  const SELECTOR = "[data-pb-add]";

  function idsFrom(el) {
    const v = el.getAttribute("data-items") || "";
    return v
      .split(",")
      .map((x) => x.trim())
      .filter((x) => /^\d+$/.test(x));
  }

  function getErrorEl(btn) {
    const card = btn.closest(".pb__card");
    return card ? card.querySelector(".pb__error") : null;
  }

  function setError(btn, msg) {
    const el = getErrorEl(btn);
    if (!el) return;
    el.textContent = msg || "Unable to add bundle.";
    el.hidden = false;
  }

  function clearError(btn) {
    const el = getErrorEl(btn);
    if (!el) return;
    el.textContent = "";
    el.hidden = true;
  }

  function setLoading(btn, on) {
    btn.setAttribute("aria-busy", on ? "true" : "false");
    btn.disabled = on || btn.disabled;
    btn.classList.toggle("is-loading", !!on);
  }

  async function addItems(items) {
    const res = await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.description || data.message || "Cart add failed.");
    }
    return data;
  }

  document.addEventListener(
    "click",
    async (e) => {
      const btn = e.target.closest(SELECTOR);
      if (!btn) return;

      e.preventDefault();
      clearError(btn);

      const ids = idsFrom(btn);
      if (!ids.length) return;

      const section = btn.closest(".product-bundles");
      const addMode = section?.getAttribute("data-add-mode") || "ajax";

      setLoading(btn, true);

      try {
        await addItems(ids.map((id) => ({ id: Number(id), quantity: 1 })));

        window.dispatchEvent(
          new CustomEvent("quadratum:cart:updated", {
            detail: { source: "product-bundles" },
          })
        );

        if (addMode === "redirect_to_cart") {
          window.location.href = "/cart";
        }
      } catch (err) {
        setError(btn, err?.message || "Unable to add bundle.");
      } finally {
        setLoading(btn, false);
      }
    },
    { passive: false }
  );
})();
