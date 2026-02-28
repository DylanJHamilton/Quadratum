(() => {
  const roots = document.querySelectorAll('[data-product-faq][data-layout="accordion_split"]');
  if (!roots.length) return;

  roots.forEach((root) => {
    const accordionButtons = Array.from(root.querySelectorAll('.q-pfaq__btn[data-faq-index]'));
    const panels = Array.from(root.querySelectorAll('[data-faq-panel]'));
    const stageNodes = Array.from(root.querySelectorAll('[data-faq-stage-node]'));

    const mediaEnabled = root.getAttribute('data-media-enabled') === 'true';
    const firstMediaIndex = parseInt(root.getAttribute('data-first-media-index') || '-1', 10);

    const getStageNodeByIndex = (idx) => stageNodes.find((n) => n.getAttribute('data-faq-index') === String(idx));

    const showStageForIndex = (idx) => {
      if (!mediaEnabled) return;

      // prefer exact match if it has media; else fallback to first available
      let node = getStageNodeByIndex(idx);
      const hasMedia = node && node.getAttribute('data-has-media') === 'true';

      if (!hasMedia) {
        if (firstMediaIndex >= 0) node = getStageNodeByIndex(firstMediaIndex);
      }

      // if still no node, bail
      if (!node) return;

      stageNodes.forEach((n) => n.hidden = true);
      node.hidden = false;
    };

    const closeAllExcept = (keepIndex) => {
      accordionButtons.forEach((btn) => {
        const idx = parseInt(btn.getAttribute('data-faq-index'), 10);
        const shouldKeep = idx === keepIndex;
        btn.setAttribute('aria-expanded', shouldKeep ? 'true' : 'false');

        const panel = root.querySelector(`#${btn.getAttribute('aria-controls')}`);
        if (panel) panel.hidden = !shouldKeep;
      });
    };

    const findOpenIndex = () => {
      const openBtn = accordionButtons.find((b) => b.getAttribute('aria-expanded') === 'true');
      return openBtn ? parseInt(openBtn.getAttribute('data-faq-index'), 10) : -1;
    };

    accordionButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-faq-index'), 10);
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          // close it (allowed). keep stage as-is.
          btn.setAttribute('aria-expanded', 'false');
          const panel = root.querySelector(`#${btn.getAttribute('aria-controls')}`);
          if (panel) panel.hidden = true;
          return;
        }

        // open this, close others
        closeAllExcept(idx);
        showStageForIndex(idx);
      });
    });

    // Initial stage: if something is open, use it; else fall back to first media if present.
    const initialOpen = findOpenIndex();
    if (initialOpen >= 0) showStageForIndex(initialOpen);
    else if (firstMediaIndex >= 0) showStageForIndex(firstMediaIndex);
  });
})();