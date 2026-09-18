/* Audience-source matching is scoped to each section and re-applied on editor load. */
(() => {
  if (window.qtmAudienceSourceBound) return;
  window.qtmAudienceSourceBound = true;
  function init(root) {
    const cards = [...root.querySelectorAll('[data-source-key]')];
    cards.forEach(card => { card.hidden = false; card.removeAttribute('data-active'); });
    if (root.dataset.match !== 'true') return;
    const params = new URL(window.location.href).searchParams;
    const key = (params.get('utm_source') || params.get('source') || root.dataset.defaultKey || '').trim().toLowerCase();
    if (!key || key === 'none') return;
    const matches = cards.filter(card => card.dataset.sourceKey.trim().toLowerCase() === key);
    if (!matches.length) return;
    cards.forEach(card => {
      const active = matches.includes(card);
      card.dataset.active = String(active);
      card.hidden = !active && root.dataset.hideOthers === 'true';
    });
  }
  const roots = scope => [...(scope.matches?.('[data-audience-source]') ? [scope] : []), ...scope.querySelectorAll('[data-audience-source]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:block:select', event => {
    const root = event.target.closest('[data-audience-source]');
    // All blocks must remain selectable in the editor, even when source filtering is active.
    root?.querySelectorAll('[data-source-key]').forEach(card => {card.hidden = false;});
  });
})();
