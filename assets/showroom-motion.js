(() => {
  if (window.quadratumShowroomMotion) return;
  window.quadratumShowroomMotion = true;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const seen = new WeakSet();
  function scan(root = document) {
    if (preference.matches || !('IntersectionObserver' in window)) return;
    observer ||= new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('q-reveal--arrive');
        seen.add(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    root.querySelectorAll('.q-reveal').forEach(node => { if (!seen.has(node)) observer.observe(node); });
  }
  scan();
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    event.target.querySelectorAll('.q-reveal').forEach(node => observer?.unobserve(node));
  });
  preference.addEventListener('change', () => {
    observer?.disconnect();
    document.querySelectorAll('.q-reveal--arrive').forEach(node => node.classList.remove('q-reveal--arrive'));
    scan();
  });
})();
