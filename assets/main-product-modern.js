/* Quadratum — Main Product Modern (V1)
   File: assets/main-product-modern.js
   - Minimal JS, no global pollution
   - Scoped per section via [data-q-pdp-modern]
*/

(() => {
  const moneyText = (cents, currencyFallback = '') => {
    // We avoid assuming currency formatting rules.
    // Liquid renders the initial price, and JS only swaps text to the variant's money string
    // if provided elsewhere. Since we don't have that, we keep cents formatting simple.
    // Recommendation: keep this basic for V1.
    if (typeof cents !== 'number') return '';
    const val = (cents / 100).toFixed(2);
    return currencyFallback ? `${currencyFallback}${val}` : val;
  };

  const initSection = (root) => {
    const variantsScript = root.querySelector('script[data-q-variants]');
    if (!variantsScript) return;

    let variants = [];
    try {
      variants = JSON.parse(variantsScript.textContent || '[]');
    } catch (e) {
      return;
    }

    const form = root.querySelector('[data-q-form]');
    const variantIdInput = root.querySelector('[data-q-variant-id]');
    const optionSelects = Array.from(root.querySelectorAll('[data-q-option]'));

    const priceWrap = root.querySelector('[data-q-price]');
    const priceRegular = root.querySelector('[data-q-price-regular]');
    const priceCompare = root.querySelector('[data-q-price-compare]');

    const atcBtn = root.querySelector('[data-q-atc]');
    const atcText = root.querySelector('[data-q-atc-text]');

    const availability = root.querySelector('[data-q-availability]');
    const skuWrap = root.querySelector('[data-q-sku]');
    const skuVal = root.querySelector('[data-q-sku-val]');

    const mediaRoot = root.querySelector('[data-q-media]');
    const mediaItems = Array.from(root.querySelectorAll('[data-media-id]'));
    const thumbBtns = Array.from(root.querySelectorAll('[data-thumb]'));

    const getSelectedOptions = () => {
      // optionSelects store option-index and value
      const opts = [];
      optionSelects.forEach((sel) => {
        const idx = Number(sel.getAttribute('data-option-index'));
        opts[idx] = sel.value;
      });
      return opts;
    };

    const findMatchingVariant = (selectedOptions) => {
      // Variants JSON includes "options": ["Size","Color",...]
      return variants.find((v) => {
        if (!v || !Array.isArray(v.options)) return false;
        if (v.options.length !== selectedOptions.length) return false;
        for (let i = 0; i < selectedOptions.length; i++) {
          if (v.options[i] !== selectedOptions[i]) return false;
        }
        return true;
      }) || null;
    };

    const setActiveMedia = (mediaId) => {
      if (!mediaId || !mediaItems.length) return;

      mediaItems.forEach((item) => {
        const isActive = String(item.getAttribute('data-media-id')) === String(mediaId);
        if (isActive) item.removeAttribute('hidden');
        else item.setAttribute('hidden', '');
      });

      thumbBtns.forEach((btn) => {
        const target = btn.getAttribute('data-target-media-id');
        btn.setAttribute('aria-current', String(target) === String(mediaId) ? 'true' : 'false');
      });
    };

    const updateUI = (variant) => {
      if (!variant) return;

      // variant id
      if (variantIdInput) variantIdInput.value = variant.id;

      // price
      if (priceRegular) {
        // We can't reproduce Liquid money formatting reliably without Shopify formatting helpers.
        // For V1, we still update the numeric value; Liquid renders initial correct formatting.
        priceRegular.textContent = moneyText(variant.price);
      }
      if (priceCompare) {
        const onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
        if (onSale) {
          priceCompare.textContent = moneyText(variant.compare_at_price);
          priceCompare.removeAttribute('hidden');
        } else {
          priceCompare.setAttribute('hidden', '');
        }
      }

      // availability + ATC
      const available = !!variant.available;
      if (availability) availability.textContent = available ? 'In stock' : 'Sold out';
      if (atcBtn) atcBtn.disabled = !available;
      if (atcText) atcText.textContent = available ? 'Add to cart' : 'Sold out';

      // SKU
      if (skuWrap && skuVal) {
        if (variant.sku) {
          skuVal.textContent = variant.sku;
          skuWrap.removeAttribute('hidden');
        } else {
          skuWrap.setAttribute('hidden', '');
        }
      }

      // featured media
      if (variant.featured_media && variant.featured_media.id) {
        setActiveMedia(variant.featured_media.id);
      }
    };

    // Thumb click swaps media (independent of variants)
    if (thumbBtns.length && mediaItems.length) {
      thumbBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-target-media-id');
          setActiveMedia(id);
        });
      });
    }

    // Options change => match variant => update UI
    if (optionSelects.length) {
      optionSelects.forEach((sel) => {
        sel.addEventListener('change', () => {
          const selectedOptions = getSelectedOptions();
          const match = findMatchingVariant(selectedOptions);
          if (match) updateUI(match);
        });
      });

      // Initial sync (in case theme selects differ)
      const initialMatch = findMatchingVariant(getSelectedOptions());
      if (initialMatch) updateUI(initialMatch);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-q-pdp-modern]').forEach(initSection);
  });
})();
