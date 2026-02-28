// File: assets/section-product-recommended.js
(function () {
  'use strict';

  function initSection(sectionEl) {
    if (!sectionEl) return;

    var itemsEl = sectionEl.querySelector('.product-recommended__items[data-recommendations-url]');
    if (!itemsEl) return;

    var url = itemsEl.getAttribute('data-recommendations-url');
    if (!url) return;

    if (itemsEl.getAttribute('data-recommendations-loaded') === 'true') return;
    itemsEl.setAttribute('data-recommendations-loaded', 'true');

    fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res || !res.ok) return null;
        return res.text();
      })
      .then(function (html) {
        if (!html) return;

        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Find first returned items container
        var incomingItems = doc.querySelector('#product-recommended .product-recommended__items');
        if (!incomingItems) {
          sectionEl.style.display = 'none';
          return;
        }

        var incomingCount = incomingItems.querySelectorAll('.product-recommended__item').length;
        if (incomingCount === 0) {
          sectionEl.style.display = 'none';
          return;
        }

        // Replace only inside this section instance
        var currentItems = sectionEl.querySelector('.product-recommended__items');
        if (!currentItems) {
          sectionEl.style.display = 'none';
          return;
        }

        currentItems.innerHTML = incomingItems.innerHTML;
      })
      .catch(function () {
        // Silent fail: keep whatever server rendered (fallback if configured).
      });
  }

  function initAll() {
    var sections = document.querySelectorAll('.product-recommended[data-dynamic="true"]');
    if (!sections || !sections.length) return;
    for (var i = 0; i < sections.length; i++) initSection(sections[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', function (evt) {
    if (!evt || !evt.target) return;
    var sec = (evt.target.matches && evt.target.matches('.product-recommended'))
      ? evt.target
      : (evt.target.querySelector ? evt.target.querySelector('.product-recommended') : null);
    if (sec) initSection(sec);
  });
})();