class QtmAccountTracking {
  constructor(root) {
    this.root = root;
    this.form = root.querySelector('[data-qtm-tracking-form]');
    this.orderInput = root.querySelector('[data-qtm-tracking-order-number]');
    this.emailInput = root.querySelector('[data-qtm-tracking-email]');
    this.trackingInput = root.querySelector('[data-qtm-tracking-number]');
    this.message = root.querySelector('[data-qtm-tracking-message]');
    this.submit = root.querySelector('[data-qtm-tracking-submit]');
    this.results = root.querySelector('[data-qtm-tracking-results]');
    this.status = root.querySelector('[data-qtm-tracking-status]');
    this.statusBadge = root.querySelector('[data-qtm-tracking-status-badge]');
    this.carrier = root.querySelector('[data-qtm-tracking-carrier]');
    this.shipment = root.querySelector('[data-qtm-tracking-shipment]');
    this.timeline = root.querySelector('[data-qtm-tracking-timeline]');
    this.steps = Array.from(root.querySelectorAll('[data-qtm-tracking-step]'));

    this.bindEvents();
    this.prefillFromQueryString();
  }

  bindEvents() {
    if (!this.form) return;

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    [this.orderInput, this.emailInput, this.trackingInput].forEach((input) => {
      if (!input) return;

      input.addEventListener('input', () => {
        input.removeAttribute('aria-invalid');

        if (this.message) {
          this.message.hidden = true;
          this.message.textContent = '';
        }
      });
    });
  }

  prefillFromQueryString() {
    if (!this.orderInput) return;

    const params = new URLSearchParams(window.location.search);
    const orderValue = params.get('order');

    if (orderValue) {
      this.orderInput.value = orderValue;
    }
  }

  handleSubmit() {
    const orderValue = this.orderInput ? this.orderInput.value.trim() : '';
    const emailValue = this.emailInput ? this.emailInput.value.trim() : '';
    const trackingValue = this.trackingInput ? this.trackingInput.value.trim() : '';

    const hasOrder = orderValue.length > 0;
    const hasEmail = this.isValidEmail(emailValue);

    if (!hasOrder || !hasEmail) {
      this.showError('Please enter a valid order number and email address.');

      if (this.orderInput) {
        this.orderInput.toggleAttribute('aria-invalid', !hasOrder);
      }

      if (this.emailInput) {
        this.emailInput.toggleAttribute('aria-invalid', !hasEmail);
      }

      return;
    }

    this.setLoading(true);

    window.setTimeout(() => {
      this.setLoading(false);
      this.showDemoStatus(orderValue, trackingValue);
    }, 450);
  }

  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  showError(text) {
    if (!this.message) return;

    this.message.textContent = text;
    this.message.hidden = false;
  }

  setLoading(isLoading) {
    if (!this.submit) return;

    this.submit.disabled = isLoading;
    this.submit.textContent = isLoading ? 'Checking...' : 'Check tracking status';
  }

  showDemoStatus(orderValue, trackingValue) {
    if (this.message) {
      this.message.hidden = true;
      this.message.textContent = '';
    }

    if (this.status) {
      this.status.textContent = `Demo tracking view loaded for ${orderValue}. Live carrier data can be connected through QuadratumLink.`;
    }

    if (this.statusBadge) {
      this.statusBadge.textContent = 'Processing';
      this.statusBadge.classList.add('is-active');
    }

    if (this.carrier) {
      this.carrier.textContent = 'QuadratumLink carrier placeholder';
    }

    if (this.shipment) {
      this.shipment.textContent = trackingValue || 'Tracking number pending';
    }

    this.setTimelineState('processing');

    if (this.results) {
      this.results.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  setTimelineState(currentStep) {
    if (!this.steps.length) return;

    const order = ['received', 'processing', 'shipped', 'out-for-delivery', 'delivered'];
    const currentIndex = order.indexOf(currentStep);

    this.steps.forEach((step) => {
      const stepName = step.dataset.qtmTrackingStep;
      const stepIndex = order.indexOf(stepName);
      const isActive = stepIndex <= currentIndex;
      const isCurrent = stepIndex === currentIndex;

      step.classList.toggle('is-active', isActive);
      step.classList.toggle('is-current', isCurrent);

      if (isCurrent) {
        step.setAttribute('aria-current', 'step');
      } else {
        step.removeAttribute('aria-current');
      }
    });
  }
}

function initQtmAccountTracking() {
  document.querySelectorAll('[data-qtm-order-tracking]').forEach((root) => {
    if (root.dataset.qtmOrderTrackingInitialized === 'true') return;

    root.dataset.qtmOrderTrackingInitialized = 'true';
    new QtmAccountTracking(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQtmAccountTracking);
} else {
  initQtmAccountTracking();
}

document.addEventListener('shopify:section:load', initQtmAccountTracking);