(() => {
  function findMatchingVariant(variants, selectedOptions) {
    return variants.find((v) => {
      const o1 = selectedOptions[1] ? v.option1 === selectedOptions[1] : true;
      const o2 = selectedOptions[2] ? v.option2 === selectedOptions[2] : true;
      const o3 = selectedOptions[3] ? v.option3 === selectedOptions[3] : true;
      return o1 && o2 && o3;
    });
  }

  function setPressedState(controlsEl, value) {
    controlsEl.querySelectorAll('.q-variant-ui__item').forEach((btn) => {
      const isSelected = btn.dataset.productOptionValue === value;
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      btn.classList.toggle('is-selected', isSelected);
    });
  }

  function updateLabelValue(groupEl, value) {
    const labelValue = groupEl.closest('.q-variant-ui__group')?.querySelector('[data-product-selected-value]');
    if (labelValue) labelValue.textContent = value || '';
  }

  function initVariantUI(wrapper) {
    const selectId = wrapper.dataset.productSelectId;
    const select =
      document.getElementById(selectId) ||
      wrapper.closest('[id^="q-pdp-"]')?.querySelector('select[name="id"]');

    if (!select) return;

    const jsonEl = wrapper.querySelector('[data-product-variants-json]');
    if (!jsonEl) return;

    let variants;
    try {
      variants = JSON.parse(jsonEl.textContent || '[]');
    } catch {
      return;
    }

    function currentVariant() {
      const vId = Number(select.value);
      return variants.find((v) => Number(v.id) === vId) || variants[0];
    }

    function applySelectedFromVariant(v) {
      if (!v) return;
      const selectedOptions = { 1: v.option1, 2: v.option2, 3: v.option3 };

      wrapper.querySelectorAll('[data-product-controls]').forEach((controls) => {
        const group = controls.closest('.q-variant-ui__group');
        const idx = Number(group?.dataset.productOptionIndex || 0);
        const val = selectedOptions[idx] || '';
        setPressedState(controls, val);
        updateLabelValue(controls, val);
      });
    }

    function selectVariantByOptions(selectedOptions) {
      const match = findMatchingVariant(variants, selectedOptions);
      if (!match) return;

      const newId = String(match.id);
      if (select.value !== newId) {
        select.value = newId;
        // Trigger existing theme logic WITHOUT altering it
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      applySelectedFromVariant(match);
    }

    wrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('.q-variant-ui__item');
      if (!btn) return;

      const group = btn.closest('.q-variant-ui__group');
      const controls = btn.closest('[data-product-controls]');
      if (!group || !controls) return;

      const idx = Number(group.dataset.productOptionIndex || 0);
      const value = btn.dataset.productOptionValue || '';

      const v = currentVariant();
      const selectedOptions = { 1: v?.option1, 2: v?.option2, 3: v?.option3 };
      selectedOptions[idx] = value;

      selectVariantByOptions(selectedOptions);
    });

    wrapper.addEventListener('keydown', (e) => {
      const btn = e.target.closest('.q-variant-ui__item');
      if (!btn) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      btn.click();
    });

    select.addEventListener(
      'change',
      () => {
        applySelectedFromVariant(currentVariant());
      },
      { passive: true }
    );

    applySelectedFromVariant(currentVariant());
  }

  function boot(root = document) {
    root.querySelectorAll('[data-product-variant-ui]').forEach(initVariantUI);
  }

  document.addEventListener('DOMContentLoaded', () => boot(document));
  document.addEventListener('shopify:section:load', (e) => boot(e.target || document));
})();