/* assets/main-product-modern.js
   Quadratum — Main Product Modern
   Dawn-like behavior:
   - Variant resolution from option selects / radios
   - Updates hidden input name="id"
   - Updates price + ATC state + URL ?variant=
   - Updates media (featured_media) + thumbs current
   - Supports scroll_gallery layouts by scrolling instead of toggling display
   - tabs_auto: converts radio-tab markup into <details> accordion on mobile
*/

(function () {
  const SEL = {
    section: '[id^="q-pdp-modern-"]',
    variantsJson: '[data-variants-json]',
    moneyFormat: '[data-money-format]',
    uiStrings: '[data-ui-strings]',
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
    viewerItem: '.q-modern-media__item[data-media-id]',
    thumbBtn: '[data-thumb]',
    contentModeJson: '[data-content-mode]',
    tabsRoot: '.q-modern-tabs'
  };

  function safeParseJson(el) {
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function formatMoney(cents, moneyFormat) {
    const amount = (Number(cents || 0) / 100).toFixed(2);
    if (typeof moneyFormat === 'string') {
      if (moneyFormat.includes('{{amount}}')) return moneyFormat.replace('{{amount}}', amount);
      if (moneyFormat.includes('{{ amount }}')) return moneyFormat.replace('{{ amount }}', amount);
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
    return variants.find((v) => {
      if (!Array.isArray(v.options)) return false;
      if (v.options.length !== options.length) return false;
      for (let i = 0; i < options.length; i++) {
        if (String(v.options[i]) !== String(options[i])) return false;
      }
      return true;
    }) || null;
  }

  function isScrollGallery(section) {
    const mode = section.getAttribute('data-layout-mode') || '';
    return mode === 'scroll_gallery_left' || mode === 'scroll_gallery_right';
  }

  function updateURLVariant(variantId) {
    if (!variantId) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('variant', String(variantId));
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
  }

  function setActiveMedia(section, mediaId) {
    if (!mediaId) return;

    const items = Array.from(section.querySelectorAll(SEL.viewerItem));
    if (!items.length) return;

    if (isScrollGallery(section)) {
      const target = items.find((it) => String(it.dataset.mediaId) === String(mediaId));
      if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else {
      items.forEach((it) => {
        if (String(it.dataset.mediaId) === String(mediaId)) it.setAttribute('data-active', 'true');
        else it.removeAttribute('data-active');
      });
    }

    const thumbs = Array.from(section.querySelectorAll(SEL.thumbBtn));
    thumbs.forEach((btn) => {
      if (String(btn.dataset.mediaId) === String(mediaId)) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
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
      if (saleEl) { saleEl.textContent = formatMoney(price, moneyFormat); saleEl.style.display = ''; }
      if (compareEl) { compareEl.textContent = formatMoney(compare, moneyFormat); compareEl.style.display = ''; }
      if (regEl) { regEl.textContent = ''; regEl.style.display = 'none'; }
    } else {
      if (regEl) { regEl.textContent = formatMoney(price, moneyFormat); regEl.style.display = ''; }
      if (saleEl) { saleEl.textContent = ''; saleEl.style.display = 'none'; }
      if (compareEl) { compareEl.textContent = ''; compareEl.style.display = 'none'; }
    }
  }

  function updateATC(section, variant, strings) {
    const btn = section.querySelector(SEL.atcBtn);
    if (!btn) return;

    const textEl = btn.querySelector(SEL.atcText);
    const addText = (strings && strings.add) || 'Add to cart';
    const soldText = (strings && strings.sold) || 'Sold out';
    const unavailText = (strings && strings.unavail) || 'Unavailable';

    if (!variant) {
      btn.setAttribute('disabled', 'disabled');
      if (textEl) textEl.textContent = unavailText;
      return;
    }

    if (variant.available) {
      btn.removeAttribute('disabled');
      if (textEl) textEl.textContent = addText;
    } else {
      btn.setAttribute('disabled', 'disabled');
      if (textEl) textEl.textContent = soldText;
    }
  }

  function updateVariant(section, variants, moneyFormat, strings) {
    const options = getSelectedOptions(section);
    const v = findVariantByOptions(variants, options);

    const idInput = section.querySelector(SEL.variantIdInput);
    if (idInput) idInput.value = v ? v.id : '';

    updateATC(section, v, strings);
    if (!v) return;

    updatePrice(section, v, moneyFormat);
    updateURLVariant(v.id);

    if (v.featured_media && v.featured_media.id) {
      setActiveMedia(section, v.featured_media.id);
    }
  }

  function bindVariantInputs(section, variants, moneyFormat, strings) {
    Array.from(section.querySelectorAll(SEL.optionSelect)).forEach((sel) => {
      sel.addEventListener('change', () => updateVariant(section, variants, moneyFormat, strings));
    });

    Array.from(section.querySelectorAll(SEL.optionRadio)).forEach((r) => {
      r.addEventListener('change', () => updateVariant(section, variants, moneyFormat, strings));
    });
  }

  function bindThumbs(section) {
    const thumbs = Array.from(section.querySelectorAll(SEL.thumbBtn));
    thumbs.forEach((btn) => {
      btn.addEventListener('click', () => setActiveMedia(section, btn.dataset.mediaId));
    });
  }

  function convertTabsToAccordion(section) {
    const modeEl = section.querySelector(SEL.contentModeJson);
    const mode = modeEl ? safeParseJson(modeEl) : null;
    if (mode !== 'tabs_auto') return;

    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    if (!isMobile) return;

    const tabs = section.querySelector(SEL.tabsRoot);
    if (!tabs) return;
    if (tabs.dataset.accordionBuilt === 'true') return;

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
      if (radio.checked || idx === 0) details.open = true;

      const summary = document.createElement('summary');
      summary.textContent = label.textContent.trim();

      const panelWrap = document.createElement('div');
      panelWrap.className = 'q-modern-acc__panel';

      while (panel.firstChild) panelWrap.appendChild(panel.firstChild);

      Array.from(panel.attributes).forEach((attr) => {
        if (attr.name === 'class' || attr.name === 'id') return;
        details.setAttribute(attr.name, attr.value);
      });

      details.appendChild(summary);
      details.appendChild(panelWrap);
      accWrap.appendChild(details);
    });

    tabs.innerHTML = '';
    tabs.appendChild(accWrap);
    tabs.dataset.accordionBuilt = 'true';
  }

  function initSection(section) {
    const variants = safeParseJson(section.querySelector(SEL.variantsJson)) || [];
    const moneyFormat = safeParseJson(section.querySelector(SEL.moneyFormat)) || null;
    const strings = safeParseJson(section.querySelector(SEL.uiStrings)) || null;

    if (isScrollGallery(section)) {
      Array.from(section.querySelectorAll(SEL.viewerItem)).forEach((it) => {
        it.setAttribute('data-active', 'true');
      });
    }

    bindVariantInputs(section, variants, moneyFormat, strings);
    bindThumbs(section);
    convertTabsToAccordion(section);

    updateVariant(section, variants, moneyFormat, strings);
  }

  function initAll() {
    Array.from(document.querySelectorAll(SEL.section)).forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
