class QuadratumAccountActivatePasswordToggle {
  constructor(activateSectionElement) {
    this.activateSectionElement = activateSectionElement;
    this.passwordToggleButtons = Array.from(
      activateSectionElement.querySelectorAll('[data-qtm-account-activate-password-toggle]')
    );

    this.bindPasswordToggleButtons();
  }

  bindPasswordToggleButtons() {
    this.passwordToggleButtons.forEach((passwordToggleButton) => {
      passwordToggleButton.addEventListener('click', () => {
        this.togglePasswordFieldVisibility(passwordToggleButton);
      });
    });
  }

  togglePasswordFieldVisibility(passwordToggleButton) {
    const passwordFieldWrapper = passwordToggleButton.closest('.qtmAccountActivate__passwordField');
    const passwordInput = passwordFieldWrapper
      ? passwordFieldWrapper.querySelector('[data-qtm-account-activate-password-input]')
      : null;
    const passwordToggleText = passwordToggleButton.querySelector('[data-qtm-account-activate-password-toggle-text]');

    if (!passwordInput) return;

    const passwordIsCurrentlyHidden = passwordInput.type === 'password';
    const nextInputType = passwordIsCurrentlyHidden ? 'text' : 'password';
    const nextButtonLabel = passwordIsCurrentlyHidden
      ? passwordToggleButton.dataset.hideLabel
      : passwordToggleButton.dataset.showLabel;

    passwordInput.type = nextInputType;
    passwordToggleButton.setAttribute('aria-label', nextButtonLabel);

    // Keep the visible toggle text aligned with the accessible button label.
    if (passwordToggleText) {
      passwordToggleText.textContent = passwordIsCurrentlyHidden ? 'Hide' : 'Show';
    }
  }
}

function initializeQuadratumAccountActivateSections() {
  document.querySelectorAll('[data-qtm-account-activate]').forEach((activateSectionElement) => {
    const sectionAlreadyInitialized = activateSectionElement.dataset.qtmAccountActivateInitialized === 'true';

    if (sectionAlreadyInitialized) return;

    activateSectionElement.dataset.qtmAccountActivateInitialized = 'true';

    new QuadratumAccountActivatePasswordToggle(activateSectionElement);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuadratumAccountActivateSections);
} else {
  initializeQuadratumAccountActivateSections();
}

// Re-initialize safely when Shopify Theme Editor reloads this section.
document.addEventListener('shopify:section:load', initializeQuadratumAccountActivateSections);