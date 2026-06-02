class QuadratumAccountAddressesSection {
  constructor(addressesSectionElement) {
    this.addressesSectionElement = addressesSectionElement;
    this.deleteConfirmMessage =
      addressesSectionElement.dataset.deleteConfirmMessage ||
      'Are you sure you want to delete this address?';

    this.addAddressPanel = addressesSectionElement.querySelector('[data-qtm-addresses-add-panel]');
    this.addAddressToggleButtons = Array.from(addressesSectionElement.querySelectorAll('[data-qtm-addresses-add-toggle]'));
    this.addAddressCloseButton = addressesSectionElement.querySelector('[data-qtm-addresses-add-close]');

    this.editAddressToggleButtons = Array.from(addressesSectionElement.querySelectorAll('[data-qtm-addresses-edit-toggle]'));
    this.editAddressCloseButtons = Array.from(addressesSectionElement.querySelectorAll('[data-qtm-addresses-edit-close]'));
    this.deleteAddressButtons = Array.from(addressesSectionElement.querySelectorAll('[data-qtm-address-delete-button]'));

    this.bindAddAddressEvents();
    this.bindEditAddressEvents();
    this.bindDeleteAddressEvents();
    this.initializeCountryProvinceSelectors();
  }

  bindAddAddressEvents() {
    this.addAddressToggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener('click', () => {
        this.openAddAddressPanel(toggleButton);
      });
    });

    if (this.addAddressCloseButton) {
      this.addAddressCloseButton.addEventListener('click', () => {
        this.closeAddAddressPanel();
      });
    }
  }

  bindEditAddressEvents() {
    this.editAddressToggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener('click', () => {
        const editPanelId = toggleButton.getAttribute('aria-controls');
        const editPanel = this.addressesSectionElement.querySelector(`#${CSS.escape(editPanelId)}`);

        if (!editPanel) return;

        const panelIsOpening = editPanel.hidden;
        editPanel.hidden = !panelIsOpening;
        toggleButton.setAttribute('aria-expanded', panelIsOpening ? 'true' : 'false');

        if (panelIsOpening) {
          this.focusFirstFieldInsidePanel(editPanel);
        }
      });
    });

    this.editAddressCloseButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', () => {
        const editPanel = closeButton.closest('[data-qtm-addresses-edit-panel]');
        if (!editPanel) return;

        this.closeEditAddressPanel(editPanel);
      });
    });
  }

  bindDeleteAddressEvents() {
    this.deleteAddressButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const deleteUrl = deleteButton.dataset.deleteUrl;

        if (!deleteUrl) return;

        const deleteWasConfirmed = window.confirm(this.deleteConfirmMessage);

        if (!deleteWasConfirmed) return;

        this.submitNativeShopifyDeleteForm(deleteUrl);
      });
    });
  }

  openAddAddressPanel(triggerButton) {
    if (!this.addAddressPanel) return;

    this.addAddressPanel.hidden = false;

    this.addAddressToggleButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'true');
    });

    this.focusFirstFieldInsidePanel(this.addAddressPanel);

    if (triggerButton) {
      this.addAddressPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  closeAddAddressPanel() {
    if (!this.addAddressPanel) return;

    this.addAddressPanel.hidden = true;

    this.addAddressToggleButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });
  }

  closeEditAddressPanel(editPanel) {
    editPanel.hidden = true;

    const editPanelId = editPanel.id;
    const editToggleButton = this.addressesSectionElement.querySelector(`[aria-controls="${CSS.escape(editPanelId)}"]`);

    if (editToggleButton) {
      editToggleButton.setAttribute('aria-expanded', 'false');
      editToggleButton.focus();
    }
  }

  focusFirstFieldInsidePanel(panelElement) {
    const firstFocusableField = panelElement.querySelector('input, select, textarea, button');

    if (firstFocusableField) {
      firstFocusableField.focus();
    }
  }

  submitNativeShopifyDeleteForm(deleteUrl) {
    const deleteForm = document.createElement('form');
    const methodOverrideInput = document.createElement('input');

    deleteForm.method = 'post';
    deleteForm.action = deleteUrl;
    deleteForm.style.display = 'none';

    methodOverrideInput.type = 'hidden';
    methodOverrideInput.name = '_method';
    methodOverrideInput.value = 'delete';

    deleteForm.appendChild(methodOverrideInput);
    document.body.appendChild(deleteForm);

    // Shopify address deletion uses a POST request with a _method=delete override.
    deleteForm.submit();
  }

  initializeCountryProvinceSelectors() {
    const countrySelectElements = Array.from(this.addressesSectionElement.querySelectorAll('[data-qtm-address-country]'));

    countrySelectElements.forEach((countrySelectElement) => {
      const countrySelectId = countrySelectElement.id;
      const provinceSelectElement = this.findProvinceSelectForCountrySelect(countrySelectElement);

      if (!countrySelectId || !provinceSelectElement || !window.Shopify || !Shopify.CountryProvinceSelector) return;

      const provinceContainerElement = provinceSelectElement.closest('[data-qtm-address-province-container]');

      // Shopify's CountryProvinceSelector populates the province/state dropdown
      // based on the selected country and the data-default attributes rendered by Liquid.
      new Shopify.CountryProvinceSelector(
        countrySelectId,
        provinceSelectElement.id,
        {
          hideElement: provinceContainerElement ? provinceContainerElement.id : null
        }
      );
    });
  }

  findProvinceSelectForCountrySelect(countrySelectElement) {
    const formElement = countrySelectElement.closest('form');

    if (!formElement) return null;

    return formElement.querySelector('[data-qtm-address-province]');
  }
}

function initializeQuadratumAccountAddressesSections() {
  document.querySelectorAll('[data-qtm-account-addresses]').forEach((addressesSectionElement) => {
    const sectionAlreadyInitialized = addressesSectionElement.dataset.qtmAccountAddressesInitialized === 'true';

    if (sectionAlreadyInitialized) return;

    addressesSectionElement.dataset.qtmAccountAddressesInitialized = 'true';
    new QuadratumAccountAddressesSection(addressesSectionElement);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuadratumAccountAddressesSections);
} else {
  initializeQuadratumAccountAddressesSections();
}

// Re-initialize safely when Shopify Theme Editor reloads this section.
document.addEventListener('shopify:section:load', initializeQuadratumAccountAddressesSections);