/* Shopify owns authentication. This controller only enhances existing forms. */
(() => {
  'use strict';
  if (window.__qAccountLogin) return;
  window.__qAccountLogin = true;

  const selector = '[data-account-main-account-login]';
  const instances = new Map();

  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController();
    const listen = (element, type, handler) => element?.addEventListener(type, handler, { signal: abort.signal });
    const login = root.querySelector('[data-account-main-account-login-panel="login"]');
    const recovery = root.querySelector('[data-account-main-account-login-panel="recover"]') ||
      root.querySelector('[data-account-main-account-login-recover-inline]');
    const trigger = root.querySelector('[data-account-main-account-login-recover-trigger]');
    const back = root.querySelector('[data-account-main-account-login-login-trigger]');
    const mode = root.dataset.recoverDisplay;

    function showRecovery(open, focus = false) {
      if (!recovery) return;
      recovery.hidden = mode === 'inline' ? false : !open;
      if (login) login.hidden = mode === 'panel' && open;
      trigger?.setAttribute('aria-expanded', String(open));
      if (focus) {
        const target = open ? recovery.querySelector('[role="alert"], [role="status"], input:not([type="hidden"])') :
          trigger || login?.querySelector('input:not([type="hidden"])');
        target?.focus();
      }
    }

    function openFromHash() {
      if (recovery && (location.hash === '#recover' || location.hash === '#' + recovery.id)) {
        showRecovery(true, true);
      }
    }

    if (trigger) trigger.hidden = false;
    if (back) back.hidden = false;
    const recoveryMessage = recovery?.querySelector('[role="alert"], [role="status"]');
    showRecovery(Boolean(recoveryMessage));
    openFromHash();
    listen(window, 'hashchange', openFromHash);
    listen(trigger, 'click', () => showRecovery(recovery.hidden, true));
    listen(back, 'click', () => showRecovery(false, true));

    const resets = [];
    root.querySelectorAll('[data-account-main-account-login-password-toggle]').forEach(button => {
      const input = button.closest('.account-main-account-login__password-wrap')?.querySelector('input');
      if (!input) return;
      const text = button.querySelector('[data-account-main-account-login-password-toggle-text]');

      function setVisibility(reveal) {
        input.type = reveal ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(reveal));
        button.setAttribute('aria-controls', input.id);
        button.setAttribute('aria-label', (reveal ? button.dataset.hideLabel : button.dataset.showLabel) ||
          (reveal ? 'Hide password' : 'Show password'));
        if (text) text.textContent = (reveal ? button.dataset.hideText : button.dataset.showText) || (reveal ? 'Hide' : 'Show');
      }

      setVisibility(false);
      button.hidden = false;
      listen(button, 'click', () => setVisibility(input.type === 'password'));
      resets.push(() => { setVisibility(false); button.hidden = true; });
    });

    const message = recoveryMessage || login?.querySelector('[role="alert"]');
    if (document.activeElement === document.body) message?.focus();

    function dispose() {
      abort.abort();
      resets.forEach(reset => reset());
      if (login) login.hidden = false;
      if (recovery) recovery.hidden = false;
      if (trigger) {
        trigger.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
      if (back) back.hidden = true;
      instances.delete(root);
    }
    instances.set(root, dispose);
  }

  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  } else {
    scan(document);
  }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) {
      if (root === event.target || event.target.contains(root)) dispose();
    }
  });
})();
