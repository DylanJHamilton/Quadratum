(() => {
  const popup = document.querySelector('[data-qtm-popup]');
  if (!popup) return;

  const dialog = popup.querySelector('[data-qtm-popup-dialog]');
  const closeButtons = popup.querySelectorAll('[data-qtm-popup-close]');
  const overlay = popup.querySelector('[data-qtm-popup-overlay]');

  const config = window.QuadratumSettings?.popups || {};
  const trigger = popup.dataset.popupTrigger || config.trigger || 'delay';
  const frequency = popup.dataset.popupFrequency || config.frequency || 'once_per_session';
  const delaySeconds = Number(popup.dataset.popupDelay || config.delaySeconds || 0);
  const scrollPercent = Number(popup.dataset.popupScroll || config.scrollPercent || 45);
  const showOnMobile = popup.dataset.popupMobile === 'true';
  const showOnDesktop = popup.dataset.popupDesktop === 'true';
  const overlayClickClose = popup.dataset.popupOverlayClose === 'true';

  const frequencyKey = 'qtm_global_popup_seen';
  const sessionKey = 'qtm_global_popup_seen_session';
  const mobileQuery = window.matchMedia('(max-width: 749px)');
  let lastFocusedElement = null;
  let hasOpened = false;

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function shouldRespectDevice() {
    return mobileQuery.matches ? showOnMobile : showOnDesktop;
  }

  function now() {
    return Date.now();
  }

  function oneDay() {
    return 24 * 60 * 60 * 1000;
  }

  function oneWeek() {
    return 7 * oneDay();
  }

  function getStoredTimestamp() {
    const value = localStorage.getItem(frequencyKey);
    return value ? Number(value) : 0;
  }

  function shouldShowByFrequency() {
    if (frequency === 'always') return true;

    if (frequency === 'once_per_session') {
      return sessionStorage.getItem(sessionKey) !== 'true';
    }

    const lastSeen = getStoredTimestamp();
    if (!lastSeen) return true;

    if (frequency === 'once_per_day') {
      return now() - lastSeen > oneDay();
    }

    if (frequency === 'once_per_week') {
      return now() - lastSeen > oneWeek();
    }

    return true;
  }

  function markSeen() {
    if (frequency === 'once_per_session') {
      sessionStorage.setItem(sessionKey, 'true');
      return;
    }

    if (frequency !== 'always') {
      localStorage.setItem(frequencyKey, String(now()));
    }
  }

  function getFocusableElements() {
    if (!dialog) return [];
    return Array.from(dialog.querySelectorAll(focusableSelector)).filter((element) => {
      return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    });
  }

  function trapFocus(event) {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (!focusableElements.length) {
      event.preventDefault();
      dialog?.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openPopup(force = false) {
    if (hasOpened && !force) return;
    if (!force && !shouldRespectDevice()) return;
    if (!force && !shouldShowByFrequency()) return;

    hasOpened = true;
    lastFocusedElement = document.activeElement;

    popup.hidden = false;
    popup.setAttribute('aria-hidden', 'false');
    document.body.classList.add('qtm-popup-open');

    requestAnimationFrame(() => {
      popup.classList.add('is-visible');
      const focusableElements = getFocusableElements();
      if (focusableElements.length) {
        focusableElements[0].focus();
      } else {
        dialog?.focus();
      }
    });

    document.addEventListener('keydown', handleKeydown);
    markSeen();
  }

  function closePopup() {
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('qtm-popup-open');
    document.removeEventListener('keydown', handleKeydown);

    window.setTimeout(() => {
      popup.hidden = true;
    }, 220);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closePopup();
      return;
    }

    trapFocus(event);
  }

  function bindCloseEvents() {
    closeButtons.forEach((button) => {
      button.addEventListener('click', closePopup);
    });

    if (overlay && overlayClickClose) {
      overlay.addEventListener('click', closePopup);
    }
  }

  function bindManualTriggers() {
    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-qtm-popup-open]');
      if (!opener) return;

      event.preventDefault();
      openPopup(true);
    });
  }

  function setupDelayTrigger() {
    window.setTimeout(() => openPopup(false), delaySeconds * 1000);
  }

  function setupScrollTrigger() {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = (scrollTop / scrollHeight) * 100;

      if (progress >= scrollPercent) {
        window.removeEventListener('scroll', onScroll);
        openPopup(false);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupExitIntentTrigger() {
    function onMouseOut(event) {
      if (event.clientY > 8) return;
      document.removeEventListener('mouseout', onMouseOut);
      openPopup(false);
    }

    if (!mobileQuery.matches) {
      document.addEventListener('mouseout', onMouseOut);
    }
  }

  function setupFirstVisitTrigger() {
    if (!localStorage.getItem(frequencyKey)) {
      setupDelayTrigger();
    }
  }

  function setupTrigger() {
    if (!shouldRespectDevice()) return;

    if (trigger === 'manual') return;

    if (trigger === 'scroll') {
      setupScrollTrigger();
      return;
    }

    if (trigger === 'exit_intent') {
      setupExitIntentTrigger();
      return;
    }

    if (trigger === 'first_visit') {
      setupFirstVisitTrigger();
      return;
    }

    setupDelayTrigger();
  }

  bindCloseEvents();
  bindManualTriggers();
  setupTrigger();

  window.QuadratumPopup = {
    open: () => openPopup(true),
    close: closePopup
  };
})();
