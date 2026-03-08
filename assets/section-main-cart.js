document.addEventListener('DOMContentLoaded', () => {
  const cartSections = document.querySelectorAll('[id^="QtmMainCart-"]');
  if (!cartSections.length) return;

  cartSections.forEach((section) => {
    initMainCart(section);
  });
});

function initMainCart(section) {
  bindQuantityControls(section);
  bindRemoveButtons(section);
  bindAddonForms(section);
}

function bindQuantityControls(section) {
  const items = section.querySelectorAll('[data-cart-item]');

  items.forEach((item) => {
    const input = item.querySelector('.qtm-cart-line-item__qty-input');
    const decrease = item.querySelector('[data-qty-decrease]');
    const increase = item.querySelector('[data-qty-increase]');

    if (!input) return;

    let changeTimeout;

    if (decrease) {
      decrease.addEventListener('click', () => {
        const current = parseInt(input.value || '0', 10);
        const next = Math.max(0, current - 1);
        input.value = String(next);
        updateLineItem(section, input.dataset.key, next);
      });
    }

    if (increase) {
      increase.addEventListener('click', () => {
        const current = parseInt(input.value || '0', 10);
        const next = Math.max(0, current + 1);
        input.value = String(next);
        updateLineItem(section, input.dataset.key, next);
      });
    }

    input.addEventListener('change', () => {
      const next = sanitizeQuantity(input.value);
      input.value = String(next);
      updateLineItem(section, input.dataset.key, next);
    });

    input.addEventListener('input', () => {
      window.clearTimeout(changeTimeout);
      changeTimeout = window.setTimeout(() => {
        const next = sanitizeQuantity(input.value);
        input.value = String(next);
        updateLineItem(section, input.dataset.key, next);
      }, 500);
    });
  });
}

function bindRemoveButtons(section) {
  const removeButtons = section.querySelectorAll('[data-cart-remove]');

  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const key = button.dataset.key;
      updateLineItem(section, key, 0);
    });
  });
}

function bindAddonForms(section) {
  const addonForms = section.querySelectorAll('[data-addon-form]');

  addonForms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: new FormData(form)
        });

        if (!response.ok) throw new Error('Add-on request failed');

        announce(section, 'Item added to cart');
        window.location.reload();
      } catch (error) {
        form.submit();
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });
}

async function updateLineItem(section, key, quantity) {
  if (!key) {
    window.location.href = '/cart';
    return;
  }

  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        id: key,
        quantity: quantity
      })
    });

    if (!response.ok) throw new Error('Cart update failed');

    if (quantity === 0) {
      announce(section, 'Item removed from cart');
    } else {
      announce(section, 'Cart updated');
    }

    window.location.reload();
  } catch (error) {
    window.location.href = '/cart';
  }
}

function sanitizeQuantity(value) {
  const parsed = parseInt(value || '0', 10);
  if (Number.isNaN(parsed) || parsed < 0) return 0;
  return parsed;
}

function announce(section, message) {
  const liveRegion = section.querySelector('[data-cart-live-region]');
  if (!liveRegion) return;

  liveRegion.textContent = '';
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
}