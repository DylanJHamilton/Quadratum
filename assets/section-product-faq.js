(() => {
  const sections = document.querySelectorAll('[data-product-faq][data-layout="accordion_split"]');
  if (!sections.length) return;

  sections.forEach((section) => {
    const buttons = Array.from(section.querySelectorAll('.q-pfaq__btn[data-faq-index]'));
    const panels = Array.from(section.querySelectorAll('[data-faq-panel]'));
    const stageNodes = Array.from(section.querySelectorAll('[data-faq-stage-node]'));

    if (!buttons.length) return;

    const hideAllStage = () => {
      stageNodes.forEach((n) => n.setAttribute('hidden', 'hidden'));
    };

    const showStageFor = (index) => {
      // If the selected item has no media, keep existing stage media (do nothing)
      const node = stageNodes.find((n) => n.dataset.faqIndex === String(index));
      if (!node) return;
      if (node.getAttribute('data-has-media') === 'false') return;

      hideAllStage();
      node.removeAttribute('hidden');
    };

    const closeAllPanels = () => {
      buttons.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
      panels.forEach((p) => p.setAttribute('hidden', 'hidden'));
    };

    const openPanel = (index) => {
      const btn = buttons.find((b) => b.dataset.faqIndex === String(index));
      const panel = section.querySelector(`#faq-panel-${section.id.replace('ProductFAQ-', '')}-${index}`) || panels[index];
      if (!btn || !panel) return;

      btn.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    };

    // Click handling
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.faqIndex;
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        // Toggle accordion
        closeAllPanels();
        if (!expanded) {
          openPanel(idx);
          showStageFor(idx);
        } else {
          // All closed: keep last media visible (no stage change)
        }
      });
    });

    // Initial stage: show first item’s media if possible else first media index
    const firstMediaIndex = section.getAttribute('data-first-media-index');
    const initIdx = firstMediaIndex && firstMediaIndex !== '-1' ? firstMediaIndex : '0';
    showStageFor(initIdx);
  });
})();