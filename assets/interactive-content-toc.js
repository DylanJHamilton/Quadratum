/* Native manual links, optional heading discovery and disposable scroll tracking. */
(() => {
  if (window.QuadratumTOC) { window.QuadratumTOC.scan(document); return; }
  const instances = new Map(), selector = '[data-q-toc]';
  function mount(root) {
    if (instances.has(root)) return;
    const list = root.querySelector('[data-q-toc-list]');
    if (!list) return;
    const controller = new AbortController(), desktop = matchMedia('(min-width: 750px)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)'), details = root.querySelector('details');
    const offset = Math.max(0, Number(root.dataset.qTocOffset) || 0);
    let observer, frame = null, pairs = [], disposed = false, mobileOpen = false;
    const listen = (node, event, fn, options = {}) => node?.addEventListener(event, fn, { ...options, signal: controller.signal });
    function responsive() { if (details) details.open = desktop.matches || mobileOpen; }
    listen(details?.querySelector('summary'), 'click', event => {
      if (desktop.matches) { event.preventDefault(); return; }
      mobileOpen = !details.open;
    });
    function highlight() {
      frame = null;
      if (disposed || root.dataset.qTocActive !== 'true' || !pairs.length) return;
      const connected = pairs.filter(pair => pair.target.isConnected);
      const passed = connected.filter(pair => pair.target.getBoundingClientRect().top <= offset + 2);
      const current = passed[passed.length - 1] || connected[0];
      for (const pair of pairs) {
        const active = pair === current;
        pair.link.classList.toggle('is-active', active);
        if (active) pair.link.setAttribute('aria-current', 'location');
        else pair.link.removeAttribute('aria-current');
      }
    }
    function schedule() { if (!disposed && frame === null) frame = requestAnimationFrame(highlight); }
    function refresh(excluded) {
      if (disposed) return;
      observer?.disconnect();
      if (root.dataset.qTocMode === 'auto_blog_headings') {
        list.replaceChildren();
        const scope = document.querySelector('main, [role=main]');
        const headings = scope ? [...scope.querySelectorAll(root.dataset.qTocMaxDepth === 'h2_h3' ? 'h2, h3' : 'h2')] : [];
        headings.filter(node => node.textContent.trim() && !node.closest('[data-q-toc], nav, footer, aside, [hidden], [aria-hidden=true]') && !excluded?.contains(node)).forEach((node, index) => {
          if (!node.id) {
            const base = node.textContent.trim().toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'heading-' + (index + 1);
            let id = base, suffix = 2;
            while (document.getElementById(id)) id = base + '-' + suffix++;
            node.id = id;
          }
          const item = document.createElement('li'), link = document.createElement('a');
          item.className = 'q-toc__item q-indent--' + (node.tagName === 'H3' ? 1 : 0);
          link.className = 'q-toc__link'; link.href = '#' + encodeURIComponent(node.id);
          link.dataset.qTocLink = ''; link.dataset.qTocTarget = node.id; link.textContent = node.textContent.trim();
          item.append(link); list.append(item);
        });
      }
      pairs = [...list.querySelectorAll('[data-q-toc-link]')].map(link => ({ link, target: document.getElementById(link.dataset.qTocTarget) })).filter(pair => pair.target && !excluded?.contains(pair.target));
      root.hidden = !list.children.length;
      if (root.hidden && window.Shopify?.designMode) root.hidden = false;
      if (root.dataset.qTocActive === 'true' && window.IntersectionObserver) {
        observer = new IntersectionObserver(schedule, { rootMargin: '-' + offset + 'px 0px -70% 0px', threshold: [0, 1] });
        pairs.forEach(pair => observer.observe(pair.target));
      }
      highlight();
    }
    listen(root, 'click', event => {
      const link = event.target.closest('[data-q-toc-link]');
      if (!link || !root.contains(link) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = document.getElementById(link.dataset.qTocTarget);
      if (!target) return;
      event.preventDefault();
      try { history.pushState(history.state, '', '#' + encodeURIComponent(target.id)); } catch (_) { /* Scroll still works. */ }
      // Reveal native disclosure ancestors before measuring or moving focus.
      for (let node = target.parentElement; node; node = node.parentElement) if (node.tagName === 'DETAILS') node.open = true;
      const focusable = target.hasAttribute('tabindex');
      if (!focusable) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!focusable) target.removeAttribute('tabindex');
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: root.dataset.qTocSmooth === 'true' && !motion.matches ? 'smooth' : 'auto' });
      highlight();
    });
    listen(window, 'scroll', schedule, { passive: true }); listen(window, 'resize', schedule);
    if (desktop.addEventListener) desktop.addEventListener('change', responsive); else desktop.addListener(responsive);
    instances.set(root, { refresh, dispose() {
      disposed = true; controller.abort(); observer?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      if (desktop.removeEventListener) desktop.removeEventListener('change', responsive); else desktop.removeListener(responsive);
      instances.delete(root);
    } });
    responsive(); refresh();
  }
  function scan(scope) { if (scope.matches?.(selector)) mount(scope); scope.querySelectorAll?.(selector).forEach(mount); }
  document.addEventListener('shopify:section:load', event => { scan(event.target); for (const instance of instances.values()) instance.refresh(); });
  document.addEventListener('shopify:section:reorder', () => { for (const instance of instances.values()) instance.refresh(); });
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, instance] of instances) if (event.target === root || event.target.contains?.(root)) instance.dispose();
    for (const instance of instances.values()) instance.refresh(event.target);
  });
  window.QuadratumTOC = { scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  else scan(document);
})();
