(() => {
  const sections = document.querySelectorAll('[data-product-faq]');
  if (!sections.length) return;

  sections.forEach((section) => {
    const layout = section.getAttribute('data-layout') || 'accordion_inline';
    const buttons = Array.from(section.querySelectorAll('.q-pfaq__btn[data-faq-index]'));

    if (!buttons.length) return;

    // Map index -> panel by aria-controls (most reliable)
    const panelByIndex = new Map();
    buttons.forEach((btn) => {
      const idx = btn.dataset.faqIndex;
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? section.querySelector(`#${CSS.escape(panelId)}`) : null;
      if (idx != null && panel) panelByIndex.set(String(idx), panel);
    });

    const closeAll = () => {
      buttons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      panelByIndex.forEach((p) => p.setAttribute('hidden', 'hidden'));
    };

    const openOne = (idx) => {
      const btn = buttons.find((b) => b.dataset.faqIndex === String(idx));
      const panel = panelByIndex.get(String(idx));
      if (!btn || !panel) return;
      btn.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    };

    // --- Split stage support (optional) ---
    const stageNodes = Array.from(section.querySelectorAll('[data-faq-stage-node]'));
    const hasStage = layout === 'accordion_split' && stageNodes.length;

    const hideAllStage = () => stageNodes.forEach((n) => n.setAttribute('hidden', 'hidden'));

    const showStageFor = (idx) => {
      if (!hasStage) return;

      const node = stageNodes.find((n) => n.dataset.faqIndex === String(idx));
      if (!node) return;

      // If selected item has no media, keep current stage (no change)
      if (node.getAttribute('data-has-media') === 'false') return;

      hideAllStage();
      node.removeAttribute('hidden');
    };

    // Click behavior
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.faqIndex;
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        // Always behave like an accordion: only one open at a time
        closeAll();

        if (!expanded) {
          openOne(idx);
          showStageFor(idx);
        } else {
          // closed all; in split we keep last stage media visible (do nothing)
        }
      });
    });

    // Initial stage selection in split layout
    if (hasStage) {
      const firstMediaIndex = section.getAttribute('data-first-media-index');
      const initIdx = firstMediaIndex && firstMediaIndex !== '-1' ? firstMediaIndex : '0';
      showStageFor(initIdx);
    }
  });
})();