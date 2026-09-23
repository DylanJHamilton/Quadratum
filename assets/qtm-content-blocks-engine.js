(function () {
  if (window.QuadratumContentBlocksEngineLoaded) return;
  window.QuadratumContentBlocksEngineLoaded = true;

  const selector = '.qtm-content-block.qtm-animate';
  const pending = new Set();
  const motion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;

  function blocks(scope) {
    if (!scope) return [];
    const found = scope.querySelectorAll ? Array.from(scope.querySelectorAll(selector)) : [];
    if (scope.matches && scope.matches(selector)) found.unshift(scope);
    return found;
  }

  function reveal(block) {
    block.classList.add('is-visible');
    block.classList.remove('is-observed');
    if (observer) observer.unobserve(block);
    pending.delete(block);
    if (observer && pending.size === 0) observer.disconnect();
  }

  function init(scope) {
    const candidates = blocks(scope || document);
    if (!candidates.length) return;
    if ((motion && motion.matches) || (window.Shopify && window.Shopify.designMode) || !window.IntersectionObserver) {
      candidates.forEach(reveal);
      return;
    }
    try {
      if (!observer) observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (pending.has(entry.target) && entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0 });
      candidates.forEach(function (block) {
        if (pending.has(block) || block.classList.contains('is-visible')) return;
        pending.add(block);
        observer.observe(block);
        // Presentation is visible until the observer has successfully attached.
        block.classList.add('is-observed');
      });
    } catch (_) {
      Array.from(pending).forEach(reveal);
      candidates.forEach(reveal);
    }
  }

  function dispose(scope) {
    blocks(scope).forEach(function (block) {
      if (observer) observer.unobserve(block);
      pending.delete(block);
      block.classList.remove('is-observed', 'is-visible');
    });
    if (observer && pending.size === 0) observer.disconnect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); }, { once: true });
  } else {
    init(document);
  }
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
  document.addEventListener('shopify:section:unload', function (event) { dispose(event.target); });
  document.addEventListener('shopify:block:select', function (event) { blocks(event.target).forEach(reveal); });
  document.addEventListener('focusin', function (event) {
    const block = event.target.closest && event.target.closest(selector);
    if (block) reveal(block);
  });
  function motionChange() { if (motion.matches) Array.from(pending).forEach(reveal); }
  if (motion && motion.addEventListener) motion.addEventListener('change', motionChange);
  else if (motion && motion.addListener) motion.addListener(motionChange);

  window.QuadratumContentBlocksEngine = { init: init, dispose: dispose };
})();
