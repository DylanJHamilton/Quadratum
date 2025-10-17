/* Quadratum — CTA: Current Sale (≤1.5KB gzipped)
   - Section-scoped countdown + progress + analytics
   - A11y: aria-live on countdown container
   - Perf: no layout thrash; transforms/opacity only
*/
(function () {
  const SECTION_CLASS = 'q-cta-sale';

  function q$all(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  function initSection(root) {
    if (!root || root.dataset.qCtaSaleInit === '1') return;
    root.dataset.qCtaSaleInit = '1';

    const sectionId   = root.getAttribute('data-section-id') || '';
    const layout      = root.getAttribute('data-layout') || 'split';
    const pageHandle  = root.getAttribute('data-page-handle') || '';
    const enableCD    = root.getAttribute('data-enable-countdown') === 'true';
    const enableProg  = root.getAttribute('data-enable-progress') === 'true';
    const endISO      = root.getAttribute('data-end-datetime') || '';
    const progMode    = root.getAttribute('data-progress-mode') || 'claimed';
    const progFallback= parseInt(root.getAttribute('data-progress-fallback') || '0', 10);

    /* ===== Analytics: view at 50% ===== */
    try {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting && en.intersectionRatio >= 0.5) {
            window.dispatchEvent(new CustomEvent('quadratum.cta_sale.view', {
              detail: { sectionId, layout, pageHandle }
            }));
            io.disconnect();
          }
        });
      }, { threshold: [0.5] });
      const container = root.closest('section') || root;
      io.observe(container);
    } catch (_) {}

    /* ===== Primary click analytics ===== */
    q$all(root, '[data-cta="primary"]').forEach(a => {
      a.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('quadratum.cta_sale.click_primary', {
          detail: { sectionId, layout, url: a.getAttribute('href') || '', pageHandle }
        }));
      }, { passive: true });
    });

    /* ===== Countdown ===== */
    let cdTimer = null;
    if (enableCD && endISO) {
      const daysEl = root.querySelector('[data-cd-days]');
      const hoursEl = root.querySelector('[data-cd-hours]');
      const minsEl = root.querySelector('[data-cd-minutes]');
      const secsEl = root.querySelector('[data-cd-seconds]');
      const liveRegion = root.querySelector('.countdown');

      const endTs = Date.parse(endISO);
      if (!isNaN(endTs)) {
        const tick = () => {
          const now = Date.now();
          let diff = Math.max(0, endTs - now);

          const d = Math.floor(diff / 86400000); diff -= d * 86400000;
          const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
          const m = Math.floor(diff / 60000);    diff -= m * 60000;
          const s = Math.floor(diff / 1000);

          if (daysEl)  daysEl.textContent  = String(d).padStart(2,'0');
          if (hoursEl) hoursEl.textContent = String(h).padStart(2,'0');
          if (minsEl)  minsEl.textContent  = String(m).padStart(2,'0');
          if (secsEl)  secsEl.textContent  = String(s).padStart(2,'0');

          // aria-live subtle update
          if (liveRegion && s % 10 === 0) liveRegion.setAttribute('data-last-announce', `${d}d ${h}h ${m}m ${s}s`);

          if (endTs - now <= 0) {
            clearInterval(cdTimer);
            cdTimer = null;
            root.classList.add('is-ended');
            window.dispatchEvent(new CustomEvent('quadratum.cta_sale.countdown_end', {
              detail: { sectionId, layout, pageHandle }
            }));
            // Visually mute urgency UI
            q$all(root, '.countdown, .progress-wrap, .strip-urgency').forEach(el => { el.style.opacity = '.6'; });
          }
        };
        tick();
        cdTimer = setInterval(tick, 1000);
      }
    }

    /* ===== Progress (value + analytics) ===== */
    if (enableProg) {
      const fill = root.querySelector('.progressbar-fill');
      const text = root.querySelector('[data-progress-text]');
      const nowVal = isNaN(progFallback) ? 0 : Math.max(0, Math.min(100, progFallback));

      if (fill) fill.style.width = nowVal + '%';
      if (text) text.textContent = nowVal + '%';
      const bar = root.querySelector('.progressbar');
      if (bar) bar.setAttribute('aria-valuenow', String(nowVal));

      // View event once
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('quadratum.cta_sale.progress_view', {
          detail: { sectionId, layout, value: nowVal, mode: progMode, pageHandle }
        }));
      }, 0);
    }
  }

  function bootAll(ctx) {
    const scope = ctx || document;
    q$all(scope, '.' + SECTION_CLASS).forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bootAll());
  } else {
    bootAll();
  }

  /* Shopify editor hooks */
  document.addEventListener('shopify:section:load',   e => bootAll(e.target));
  document.addEventListener('shopify:section:select', e => bootAll(e.target));
  document.addEventListener('shopify:section:unload', e => {
    const root = e.target && e.target.querySelector && e.target.querySelector('.' + SECTION_CLASS);
    if (root) delete root.dataset.qCtaSaleInit;
  });
})();
