class QuadratumAccountResetPasswordToggle {
  constructor(resetPasswordSectionElement) {
    this.resetPasswordSectionElement = resetPasswordSectionElement;
    this.passwordToggleButtons = Array.from(
      resetPasswordSectionElement.querySelectorAll('[data-qtm-account-reset-password-toggle]')
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
    const passwordFieldWrapper = passwordToggleButton.closest('.qtmAccountResetPassword__passwordField');
    const passwordInput = passwordFieldWrapper
      ? passwordFieldWrapper.querySelector('[data-qtm-account-reset-password-input]')
      : null;
    const passwordToggleText = passwordToggleButton.querySelector('[data-qtm-account-reset-password-toggle-text]');

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

function initializeQuadratumAccountResetPasswordSections() {
  document.querySelectorAll('[data-qtm-account-reset-password]').forEach((resetPasswordSectionElement) => {
    const sectionAlreadyInitialized =
      resetPasswordSectionElement.dataset.qtmAccountResetPasswordInitialized === 'true';

    if (sectionAlreadyInitialized) return;

    resetPasswordSectionElement.dataset.qtmAccountResetPasswordInitialized = 'true';
    new QuadratumAccountResetPasswordToggle(resetPasswordSectionElement);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuadratumAccountResetPasswordSections);
} else {
  initializeQuadratumAccountResetPasswordSections();
}

// Re-initialize safely when Shopify Theme Editor reloads this section.
document.addEventListener('shopify:section:load', initializeQuadratumAccountResetPasswordSections);