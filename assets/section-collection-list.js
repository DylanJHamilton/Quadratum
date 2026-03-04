// File: assets/section-collection-list.js
// JS ONLY for carousel arrows. Scoped per section instance.

(() => {
  const roots = document.querySelectorAll('[data-qcl][data-layout="carousel"]');
  if (!roots.length) return;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  roots.forEach((root) => {
    const scroller = root.querySelector('[data-qcl-carousel]');
    if (!scroller) return;

    const prev = root.querySelector('[data-qcl-prev]');
    const next = root.querySelector('[data-qcl-next]');

    const getStep = () => {
      const item = scroller.querySelector('.qcl__item');
      if (!item) return 320;
      const itemW = item.getBoundingClientRect().width;
      const track = scroller.querySelector('.qcl__track');
      const styles = getComputedStyle(track || scroller);
      const gap = parseFloat(styles.gap || styles.columnGap || '0') || 0;
      return Math.round(itemW + gap);
    };

    const updateDisabled = () => {
      if (!prev && !next) return;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const x = scroller.scrollLeft;
      if (prev) prev.disabled = x <= 2;
      if (next) next.disabled = x >= (maxScroll - 2);
    };

    const scrollByStep = (dir) => {
      const step = getStep();
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const target = scroller.scrollLeft + (dir * step);
      const left = clamp(target, 0, maxScroll);
      scroller.scrollTo({ left, behavior: 'smooth' });
    };

    if (prev) prev.addEventListener('click', () => scrollByStep(-1));
    if (next) next.addEventListener('click', () => scrollByStep(1));

    scroller.addEventListener('scroll', updateDisabled, { passive: true });
    updateDisabled();
  });
})();