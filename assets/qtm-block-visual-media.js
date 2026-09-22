/* Progressive Theme Block comparisons, native disclosures, feature maps and native video. */
(() => {
  if (window.qtmBlockVisualMedia) return;
  const selector = '[data-qtm-visual-block]', instances = new Map();
  const roots = node => node?.querySelectorAll ? [...(node.matches?.(selector) ? [node] : []), ...node.querySelectorAll(selector)] : [];
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  function init(root) {
    if (instances.has(root)) return;
    const abort = new AbortController(), cleanups = [];
    const on = (node, type, fn) => node?.addEventListener(type, fn, { signal: abort.signal });
    let stop = () => {};
    const kind = root.dataset.qtmVisualBlock;
    if (kind === 'comparison') {
      const range = root.querySelector('[data-content-before-after-range]'), handle = root.querySelector('[data-content-before-after-handle]');
      if (!range || !handle) return;
      const before = root.style.getPropertyValue('--content-before-after-slider-position');
      const update = () => root.style.setProperty('--content-before-after-slider-position', `${Math.max(0, Math.min(100, Number(range.value) || 0))}%`);
      range.hidden = false; handle.hidden = false; on(range, 'input', update); on(range, 'change', update); update();
      cleanups.push(() => { range.hidden = true; handle.hidden = true; root.style.setProperty('--content-before-after-slider-position', before); });
    } else if (kind === 'hotspots') {
      const details = [...root.querySelectorAll('details')];
      const close = (item, restore = false) => { if (!item.open) return; const summary = item.querySelector('summary'); if (restore && item.contains(document.activeElement)) summary?.focus({ preventScroll: true }); item.open = false; };
      details.forEach(item => {
        on(item, 'toggle', () => { if (item.open) details.forEach(other => { if (other !== item) close(other, true); }); });
        on(item, 'keydown', event => { if (event.key !== 'Escape' || !item.open) return; event.preventDefault(); event.stopPropagation(); close(item, true); });
      });
      on(document, 'click', event => { if (!root.contains(event.target)) details.forEach(item => close(item, true)); });
      cleanups.push(() => details.forEach(item => close(item)));
    } else if (kind === 'feature-map') {
      const panels = [...root.querySelectorAll('[data-qtm-feature-map-panel]')];
      const pins = [...root.querySelectorAll('[data-qtm-feature-map-pin]')].filter(pin => panels.some(panel => panel.id === pin.getAttribute('aria-controls')));
      const media = root.querySelector('.qtm-feature-map__media-wrap');
      if (!pins.length || media?.hidden) return;
      let active = pins[0].dataset.qtmFeatureMapPin;
      const sync = () => {
        const narrow = window.innerWidth <= 749 || (root.getBoundingClientRect().width > 0 && root.getBoundingClientRect().width <= 580);
        for (const pin of pins) { const selected = pin.dataset.qtmFeatureMapPin === active; pin.hidden = false; pin.classList.toggle('is-active', selected); pin.setAttribute('aria-expanded', String(narrow || selected)); }
        for (const panel of panels) { const selected = panel.dataset.qtmFeatureMapPanel === active; if (!narrow && !selected && panel.contains(document.activeElement)) pins.find(pin => pin.dataset.qtmFeatureMapPin === active)?.focus({ preventScroll: true }); panel.hidden = !narrow && !selected; panel.classList.toggle('is-active', selected); }
      };
      pins.forEach((pin, index) => {
        on(pin, 'click', () => { active = pin.dataset.qtmFeatureMapPin; sync(); });
        on(pin, 'keydown', event => {
          if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const rtl = getComputedStyle(root).direction === 'rtl';
          let next = index;
          if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = pins.length - 1;
          else { const backwards = event.key === 'ArrowUp' || (event.key === 'ArrowLeft' && !rtl) || (event.key === 'ArrowRight' && rtl); next = (index + (backwards ? -1 : 1) + pins.length) % pins.length; }
          active = pins[next].dataset.qtmFeatureMapPin; pins[next].focus({ preventScroll: true }); sync();
        });
      });
      on(window, 'resize', sync);
      if (window.ResizeObserver) { const observer = new ResizeObserver(sync); observer.observe(root); cleanups.push(() => observer.disconnect()); }
      sync(); cleanups.push(() => { pins.forEach(pin => { pin.hidden = true; pin.classList.remove('is-active'); pin.setAttribute('aria-expanded', 'true'); }); panels.forEach(panel => { panel.hidden = false; panel.classList.remove('is-active'); }); });
    } else if (kind === 'video') {
      const video = root.querySelector('video'), button = root.querySelector('[data-qtm-video-toggle]');
      if (!video || !button) return;
      let generation = 0, attempted = false, inViewport = false, disposed = false;
      const sync = () => { button.textContent = video.paused ? 'Play video' : 'Pause video'; };
      stop = () => { generation++; try { video.pause(); } catch (_) {} sync(); };
      const play = () => {
        const epoch = ++generation;
        try { Promise.resolve(video.play()).then(() => { if (disposed || epoch !== generation || !root.isConnected || document.hidden) { try { video.pause(); } catch (_) {} } sync(); }, () => { sync(); }); }
        catch (_) { sync(); }
      };
      video.autoplay = false; video.controls = root.dataset.controls !== 'false';
      button.hidden = root.dataset.controls !== 'false' && root.dataset.autoplay !== 'true';
      on(video, 'play', () => { attempted = true; sync(); }); on(video, 'pause', sync); on(video, 'ended', sync);
      on(button, 'click', () => { attempted = true; if (video.paused) play(); else stop(); });
      const policy = () => { if (document.hidden || reduced?.matches) stop(); };
      on(document, 'visibilitychange', policy); on(reduced, 'change', policy);
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(entries => {
          inViewport = entries.some(entry => entry.target === root && entry.isIntersecting);
          if (!inViewport) { stop(); return; }
          if (!attempted && root.dataset.autoplay === 'true' && root.dataset.designMode !== 'true' && !reduced?.matches && !document.hidden && root.getClientRects().length) { attempted = true; play(); }
        }, { threshold: 0.1 });
        observer.observe(root); cleanups.push(() => observer.disconnect());
      }
      sync(); cleanups.push(() => { disposed = true; stop(); video.controls = true; button.hidden = true; });
    } else return;
    root.setAttribute('data-qtm-visual-ready', '');
    instances.set(root, { stop, destroy() { abort.abort(); cleanups.forEach(fn => fn()); root.removeAttribute('data-qtm-visual-ready'); } });
  }
  const boot = node => roots(node).forEach(init);
  const dispose = node => roots(node).forEach(root => { instances.get(root)?.destroy(); instances.delete(root); });
  window.qtmBlockVisualMedia = { boot, dispose };
  document.addEventListener('shopify:section:load', event => boot(event.target));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
  window.addEventListener('pagehide', () => instances.forEach(instance => instance.stop()));
  const observer = new MutationObserver(records => {
    for (const [root, instance] of instances) if (!root.isConnected) { instance.destroy(); instances.delete(root); }
    records.forEach(record => record.addedNodes.forEach(node => { if (node.isConnected) boot(node); }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(document), { once: true });
  else boot(document);
})();
