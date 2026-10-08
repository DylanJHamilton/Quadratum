(() => {
  const init = (root) => {
    if (!root || root.dataset.mcReady === 'true') return;
    root.dataset.mcReady = 'true';
    const cards = [...root.querySelectorAll('[data-mc-product]')];
    const filters = [...root.querySelectorAll('[data-mc-filter]')];
    const search = root.querySelector('[data-mc-search]');
    const empty = root.querySelector('[data-mc-empty]');
    let category = 'All';
    const update = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const categoryMatch = category === 'All' || card.dataset.mcCategory === category;
        const textMatch = !query || (card.dataset.mcName || '').toLocaleLowerCase().includes(query) || card.textContent.toLocaleLowerCase().includes(query);
        card.hidden = !(categoryMatch && textMatch);
        if (!card.hidden) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    };
    filters.forEach((button) => button.addEventListener('click', () => {
      category = button.dataset.mcFilter || 'All';
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      update();
    }));
    search?.addEventListener('input', update);
    document.querySelectorAll('[data-mc-filter-link]').forEach((link) => link.addEventListener('click', (event) => {
      const target = link.getAttribute('href') || '';
      const value = link.dataset.mcFilterLink;
      if (target.startsWith('#') && value && root.contains(document.querySelector(target))) {
        event.preventDefault();
        const filter = root.querySelector(`[data-mc-filter="${CSS.escape(value)}"]`);
        filter?.click();
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }));
    document.querySelectorAll('[data-mc-quiz]').forEach((button) => button.addEventListener('click', () => {
      const value = button.dataset.mcQuiz;
      const filter = root.querySelector(`[data-mc-filter="${CSS.escape(value)}"]`);
      filter?.click();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };
  const start = () => document.querySelectorAll('[data-mc-catalog]').forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
  document.addEventListener('shopify:section:load', (event) => init(event.target.querySelector('[data-mc-catalog]')));
})();
