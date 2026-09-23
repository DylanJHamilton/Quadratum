(() => {
  'use strict';
  if (window.__qAccountActivate) return;
  window.__qAccountActivate = true;
  const selector = '[data-qtm-account-activate]', instances = new Map();
  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController(), toggles = [];
    root.querySelectorAll('[data-qtm-account-activate-password-toggle]').forEach(button => {
      const input = button.closest('.qtmAccountActivate__passwordField')?.querySelector('input');
      if (!input) return;
      const label = button.querySelector('[data-qtm-account-activate-password-toggle-text]');
      function paint(reveal) { input.type = reveal ? 'text' : 'password'; button.setAttribute('aria-pressed',String(reveal)); button.setAttribute('aria-controls',input.id); button.setAttribute('aria-label',(reveal ? button.dataset.hideLabel : button.dataset.showLabel) || (reveal ? 'Hide password' : 'Show password')); if(label) label.textContent = reveal ? 'Hide' : 'Show'; }
      button.hidden = false; paint(false);
      button.addEventListener('click', () => paint(input.type === 'password'), {signal:abort.signal});
      toggles.push(() => { paint(false); button.hidden = true; });
    });
    instances.set(root, () => { abort.abort(); toggles.forEach(reset=>reset()); instances.delete(root); });
  }
  const scan = scope => { if(scope.matches?.(selector)) mount(scope); scope.querySelectorAll?.(selector).forEach(mount); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true}); else scan(document);
  document.addEventListener('shopify:section:load',event=>scan(event.target));
  document.addEventListener('shopify:section:unload',event=>{ for(const[root,dispose]of instances) if(root===event.target||event.target.contains(root))dispose(); });
})();
