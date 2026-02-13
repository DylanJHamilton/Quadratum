/* assets/main-product-modern.js
   Quadratum — Main Product Modern
   Minimal, reliable JS:
   - Variant resolution from option selects / radios
   - Updates hidden input name="id"
   - Updates price + ATC disabled state
   - Updates media viewer via thumbs + variant featured_media
   - tabs_auto: converts radio-tab markup into <details> accordion on mobile
*/

(function () {
  const SEL = {
    section: '[id^="q-pdp-modern-"]',
    variantsJson: '[data-variants-json]',
    moneyFormat: '[data-money-format]',
    variantIdInput: '[data-variant-id]',
    optionSelect: '[data-option-select]',
    optionFieldset: '[data-option-fieldset]',
    optionRadio: '[data-option-radio]',
    priceWrap: '[data-price]',
    priceSale: '[data-price-sale]',
    priceCompare: '[data-price-compare]',
    priceRegular: '[data-price-regular]',
    atcBtn: '[data-atc]',
    atcText: '[data-atc-text]',
    gallery: '[data-gallery]',
    viewerItem: '.q-modern-media__item[data-media-id]',
    thumbBtn: '[data-thumb]',
    contentModeJson: '[data-content-mode]',
    tabsRoot: '.q-modern-tabs'
  };

  function safeParseJson(el) {
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return null;
    }
  }

  function formatMoney(cents, moneyFormat) {
    // Simple fallback formatting if theme money_format isn't used.
    // If money_format exists, we do a basic replacement for {{amount}}.
    const amount = (Number(cents || 0) / 100).toFixed(2);
    if (typeof moneyFormat === 'string' && moneyFormat.includes('{{amount}}')) {
      return moneyFormat.replace('{{amount}}', amount);
    }
    return '$' + amount;
  }

  function getSelectedOptions(section) {
    const selects = Array.from(section.querySelectorAll(SEL.optionSelect));
    if (selects.length) {
      return selects
        .sort((a, b) => Number(a.dataset.optionIndex) - Number(b.dataset.optionIndex))
        .map((s) => s.value);
    }

    const fieldsets = Array.from(section.querySelectorAll(SEL.optionFieldset));
    if (fieldsets.length) {
      return fieldsets
        .sort((a, b) => Number(a.dataset.optionIndex) - Number(b.dataset.optionIndex))
        .map((fs) => {
          const checked = fs.querySelector('input[type="radio"]:checked');
          return checked ? checked.value : '';
        });
    }

    return [];
  }

  function findVariantByOptions(variants, options) {
    if (!Array.isArray(variants) || !options || !options.length) return null;
    // Shopify variants JSON includes "options": ["Size","Color"...]
    return variants.find((v) => {
      if (!Array.isArray(v.options)) return false;
      if (v.options.length !== options.length) return false;
      for (let i = 0; i < options.length; i++) {
        if (String(v.options[i]) !== String(options[i])) return false;
      }
      return true;
    }) || null;
  }

  function setActiveMedia(section, mediaId) {
    if (!mediaId) return;

    const viewerItems = Array.from(section.querySelectorAll(SEL.viewerItem));
    if (!viewerItems.length) return;

    viewerItems.forEach((it) => {
      if (String(it.dataset.mediaId) === String(mediaId)) {
        it.setAttribute('data-active', 'true');
      } else {
        it.removeAttribute('data-active');
      }
    });

    const thumbs = Array.from(section.querySelectorAll(SEL.thumbBtn));
    thumbs.forEach((btn) => {
      if (String(btn.dataset.mediaId) === String(mediaId)) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }

  function updatePrice(section, variant, moneyFormat) {
    const wrap = section.querySelector(SEL.priceWrap);
    if (!wrap || !variant) return;

    const saleEl = wrap.querySelector(SEL.priceSale);
    const compareEl = wrap.querySelector(SEL.priceCompare);
    const regEl = wrap.querySelector(SEL.priceRegular);

    const price = Number(variant.price || 0);
    const compare = Number(variant.compare_at_price || 0);

    if (compare > price) {
      if (saleEl) saleEl.textContent = formatMoney(price, moneyFormat);
      if (compareEl) compareEl.textContent = formatMoney(compare, moneyFormat);
      if (regEl) regEl.textContent = '';
      if (saleEl) saleEl.style.display = '';
      if (compareEl) compareEl.style.display = '';
      if (regEl) regEl.style.display = 'none';
    } else {
      if (regEl) regEl.textContent = formatMoney(price, moneyFormat);
      if (saleEl) saleEl.textContent = '';
      if (compareEl) compareEl.textContent = '';
      if (regEl) regEl.style.display = '';
      if (saleEl) saleEl.style.display = 'none';
      if (compareEl) compareEl.style.display = 'none';
    }
  }

  function updateATC(section, variant) {
    const btn = section.querySelector(SEL.atcBtn);
    if (!btn || !variant) return;

    const textEl = btn.querySelector(SEL.atcText);
    const addText = 'Add to cart';
    const soldText = 'Sold out';
    const unavailText = 'Unavailable';

    // If variant exists but unavailable => sold out
    if (variant.available) {
      btn.removeAttribute('disabled');
      if (textEl) textEl.textContent = addText;
    } else {
      btn.setAttribute('disabled', 'disabled');
      if (textEl) textEl.textContent = soldText;
    }

    // If no matching variant is found, we’ll handle elsewhere (unavailable)
  }

  function setUnavailable(section) {
    const btn = section.querySelector(SEL.atcBtn);
    if (btn) {
      btn.setAttribute('disabled', 'disabled');
      const textEl = btn.querySelector(SEL.atcText);
      if (textEl) textEl.textContent = 'Unavailable';
    }
  }

  function updateVariant(section, variants, moneyFormat) {
    const options = getSelectedOptions(section);
    const v = findVariantByOptions(variants, options);

    const idInput = section.querySelector(SEL.variantIdInput);
    if (!v) {
      if (idInput) idInput.value = '';
      setUnavailable(section);
      return;
    }

    if (idInput) idInput.value = v.id;

    updatePrice(section, v, moneyFormat);
    updateATC(section, v);

    // Featured media switch (Dawn behavior)
    if (v.featured_media && v.featured_media.id) {
      setActiveMedia(section, v.featured_media.id);
    }
  }

  function bindVariantInputs(section, variants, moneyFormat) {
    const selects = Array.from(section.querySelectorAll(SEL.optionSelect));
    selects.forEach((sel) => {
      sel.addEventListener('change', () => updateVariant(section, variants, moneyFormat));
    });

    const radios = Array.from(section.querySelectorAll(SEL.optionRadio));
    radios.forEach((r) => {
      r.addEventListener('change', () => updateVariant(section, variants, moneyFormat));
    });
  }

  function bindThumbs(section) {
    const thumbs = Array.from(section.querySelectorAll(SEL.thumbBtn));
    if (!thumbs.length) return;

    thumbs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mediaId = btn.dataset.mediaId;
        setActiveMedia(section, mediaId);
      });
    });
  }

  // tabs_auto -> accordion on mobile
  function convertTabsToAccordion(section) {
    const modeEl = section.querySelector(SEL.contentModeJson);
    const mode = modeEl ? safeParseJson(modeEl) : null;
    if (!mode || (mode !== 'tabs_auto' && mode !== 'tabs')) return;

    // Only convert for tabs_auto on mobile width
    if (mode !== 'tabs_auto') return;

    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    if (!isMobile) return;

    const tabs = section.querySelector(SEL.tabsRoot);
    if (!tabs) return;

    // Already converted?
    if (tabs.dataset.accordionBuilt === 'true') return;

    // The markup pattern is: radio, label, panel, repeated.
    const children = Array.from(tabs.children);
    const triples = [];
    for (let i = 0; i < children.length; i++) {
      const a = children[i];
      const b = children[i + 1];
      const c = children[i + 2];
      if (!a || !b || !c) break;
      if (a.classList.contains('q-modern-tab__radio') &&
          b.classList.contains('q-modern-tab__label') &&
          c.classList.contains('q-modern-tab__panel')) {
        triples.push([a, b, c]);
        i += 2;
      }
    }

    if (!triples.length) return;

    const accWrap = document.createElement('div');
    accWrap.className = 'q-modern-accordion';

    triples.forEach(([radio, label, panel], idx) => {
      const details = document.createElement('details');
      details.className = 'q-modern-acc';
      // open first item if first tab was checked
      if (radio.checked || idx === 0) details.open = true;

      const summary = document.createElement('summary');
      summary.textContent = label.textContent.trim();

      const panelWrap = document.createElement('div');
      panelWrap.className = 'q-modern-acc__panel';

      // move panel children into accordion panel
      while (panel.firstChild) panelWrap.appendChild(panel.firstChild);

      // preserve shopify attributes by copying attributes from panel onto details wrapper
      // (shopify_attributes are rendered as attributes)
      Array.from(panel.attributes).forEach((attr) => {
        // avoid duplicating class/id collisions
        if (attr.name === 'class' || attr.name === 'id') return;
        details.setAttribute(attr.name, attr.value);
      });

      details.appendChild(summary);
      details.appendChild(panelWrap);
      accWrap.appendChild(details);
    });

    // Replace tabs content fully
    tabs.innerHTML = '';
    tabs.appendChild(accWrap);
    tabs.dataset.accordionBuilt = 'true';
  }

  function initSection(section) {
    const variants = safeParseJson(section.querySelector(SEL.variantsJson)) || [];
    const moneyFormat = safeParseJson(section.querySelector(SEL.moneyFormat)) || null;

    bindVariantInputs(section, variants, moneyFormat);
    bindThumbs(section);
    convertTabsToAccordion(section);

    // Initial sync (important if defaults are not the first variant)
    updateVariant(section, variants, moneyFormat);
  }

  function initAll() {
    const sections = Array.from(document.querySelectorAll(SEL.section));
    sections.forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
