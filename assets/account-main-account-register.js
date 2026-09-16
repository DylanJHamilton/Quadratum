// Delegation keeps the existing password control working after section reloads.
(() => {
  if (window.QuadratumRegisterToggleLoaded) return;
  window.QuadratumRegisterToggleLoaded = true;
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-qtm-account-register-password-toggle]');
    if (!button) return;
    const input = button.closest('.qtmAccountRegister__passwordField')?.querySelector('[data-qtm-account-register-password-input]');
    if (!input) return;
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(reveal));
    button.setAttribute('aria-label', (reveal ? button.dataset.hideLabel : button.dataset.showLabel) || (reveal ? 'Hide password' : 'Show password'));
    const label = button.querySelector('[data-qtm-account-register-password-toggle-text]');
    if (label) label.textContent = reveal ? 'Hide' : 'Show';
  });
})();
