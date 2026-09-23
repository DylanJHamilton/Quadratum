/* Progressive flip cards: both faces remain available until enhancement succeeds. */
(() => {
  if (window.QuadratumCards) { window.QuadratumCards.scan(document); return; }
  const instances = new Map(), selector = '.q-ce[data-variant="flip_box"]';
  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController();
    const mobile = window.matchMedia?.('(max-width: 749px)');
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const hover = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    const cards = [...root.querySelectorAll('.q-ce__card--flip')].map(card => ({
      card, button: card.querySelector('.q-ce__flipbtn'),
      front: card.querySelector('.q-ce__front'), back: card.querySelector('.q-ce__back')
    })).filter(item => item.button && item.front && item.back);
    const listen = (node, event, fn) => node.addEventListener(event, fn, { signal: abort.signal });
    function face(node, hidden) {
      node.inert = hidden;
      if (hidden) node.setAttribute('aria-hidden', 'true');
      else node.removeAttribute('aria-hidden');
    }
    function flip(item, open) {
      if (!item.card.classList.contains('q-ce__card--enhanced')) return;
      const inactive = open ? item.front : item.back;
      if (inactive.contains(document.activeElement)) item.button.focus({ preventScroll: true });
      item.card.classList.toggle('is-flipped', open);
      item.button.setAttribute('aria-expanded', String(open));
      face(item.front, open); face(item.back, !open);
    }
    function restore(item) {
      item.card.classList.remove('q-ce__card--enhanced', 'is-flipped');
      item.button.setAttribute('aria-expanded', 'false');
      face(item.front, false); face(item.back, false);
    }
    function update() {
      const stacked = window.Shopify?.designMode || motion?.matches ||
        (root.dataset.flipFallback === 'stack_back_content' && mobile?.matches);
      for (const item of cards) {
        if (stacked) {
          if (document.activeElement === item.button) {
            item.front.tabIndex = -1; item.front.focus({ preventScroll: true }); item.front.removeAttribute('tabindex');
          }
          restore(item);
        } else if (!item.card.classList.contains('q-ce__card--enhanced')) {
          item.card.classList.add('q-ce__card--enhanced'); flip(item, false);
        }
      }
    }
    for (const item of cards) {
      listen(item.button, 'click', () => flip(item, !item.card.classList.contains('is-flipped')));
      listen(item.card, 'keydown', event => {
        if (event.key === 'Escape' && item.card.classList.contains('is-flipped')) { event.preventDefault(); flip(item, false); }
      });
      listen(item.card, 'pointerenter', () => {
        if (root.dataset.flipTrigger === 'hover' && hover?.matches && !item.card.contains(document.activeElement)) flip(item, true);
      });
      listen(item.card, 'pointerleave', () => {
        if (root.dataset.flipTrigger === 'hover' && !item.card.contains(document.activeElement)) flip(item, false);
      });
      listen(item.card, 'focusout', event => {
        if (root.dataset.flipTrigger === 'hover' && !item.card.contains(event.relatedTarget)) flip(item, false);
      });
    }
    for (const query of [mobile, motion]) query?.addEventListener?.('change', update);
    update();
    instances.set(root, () => {
      abort.abort(); for (const query of [mobile, motion]) query?.removeEventListener?.('change', update);
      cards.forEach(restore); instances.delete(root);
    });
  }
  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  function unload(scope) {
    for (const [root, dispose] of instances) if (root === scope || scope.contains(root)) dispose();
  }
  window.QuadratumCards = { scan, unload };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  else scan(document);
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => unload(event.target));
})();
