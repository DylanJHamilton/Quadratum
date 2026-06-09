(() => {
  const STORAGE_KEY = 'qtm_global_popup_seen';
  const SESSION_KEY = 'qtm_global_popup_seen_session';

  let popup = null;
  let dialog = null;
  let config = {};
  let openedThisPage = false;
  let lastFocusedElement = null;
  let eventsBound = false;

  function isThemeEditor() {
    return Boolean(
      (window.Shopify && window.Shopify.designMode) ||
      document.documentElement.classList.contains('shopify-design-mode') ||
      window.location.href.includes('preview_theme_id') ||
      window.location.href.includes('_ab=')
    );
  }

  function getPopup() {
    return document.getElementById('QuadratumGlobalPopup') || document.querySelector('[data-qtm-popup]');
  }

  function getBoolean(value) {
    return value === true || value === 'true';
  }

  function getConfig() {
    const globalConfig =
      window.QuadratumSettings && window.QuadratumSettings.popups
        ? window.QuadratumSettings.popups
        : {};

    return {
      enabled: getBoolean(popup?.dataset.popupEnabled) || getBoolean(globalConfig.enabled),
      type: popup?.dataset.popupType || globalConfig.type || 'newsletter',
      trigger: popup?.dataset.popupTrigger || globalConfig.trigger || 'delay',
      frequency: popup?.dataset.popupFrequency || globalConfig.frequency || 'always',
      delaySeconds: Number(popup?.dataset.popupDelay || globalConfig.delaySeconds || 0),
      scrollPercent: Number(popup?.dataset.popupScroll || globalConfig.scrollPercent || 45),
      showOnMobile: getBoolean(popup?.dataset.popupMobile) || getBoolean(globalConfig.showOnMobile),
      showOnDesktop: getBoolean(popup?.dataset.popupDesktop) || getBoolean(globalConfig.showOnDesktop),
      overlayClickClose: getBoolean(popup?.dataset.popupOverlayClose) || getBoolean(globalConfig.overlayClickClose),
      editorPreview: getBoolean(popup?.dataset.popupEditorPreview) || getBoolean(globalConfig.editorPreview)
    };
  }

  function isMobile() {
    return window.matchMedia('(max-width: 749px)').matches;
  }

  function shouldShowForDevice() {
    if (isThemeEditor() && config.editorPreview) return true;
    return isMobile() ? config.showOnMobile : config.showOnDesktop;
  }

  function shouldShowByFrequency() {
    if (isThemeEditor() && config.editorPreview) return true;

    if (config.frequency === 'always') {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      return true;
    }

    if (config.frequency === 'once_per_session') {
      return sessionStorage.getItem(SESSION_KEY) !== 'true';
    }

    const lastSeen = Number(localStorage.getItem(STORAGE_KEY) || 0);

    if (!lastSeen) return true;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;

    if (config.frequency === 'once_per_day') return now - lastSeen > oneDay;
    if (config.frequency === 'once_per_week') return now - lastSeen > oneWeek;

    return true;
  }

  function markSeen() {
    if (isThemeEditor() && config.editorPreview) return;
    if (config.frequency === 'always') return;

    if (config.frequency === 'once_per_session') {
      sessionStorage.setItem(SESSION_KEY, 'true');
      return;
    }

    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }

  function getFocusableElements() {
    if (!dialog) return [];

    return Array.from(
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => {
      return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    });
  }

  function applyCenteredPopupStyles() {
    if (!popup) return;

    popup.style.cssText = `
      position: fixed !important;
      inset: 0 !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      z-index: 999999 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      margin: 0 !important;
      padding: 24px !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      overflow: hidden !important;
      transform: none !important;
      background: transparent !important;
    `;

    if (dialog) {
      dialog.style.cssText = `
        position: relative !important;
        inset: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        z-index: 2 !important;
        display: grid !important;
        grid-template-columns: 1fr !important;
        width: min(680px, calc(100vw - 48px)) !important;
        max-width: 680px !important;
        min-width: 0 !important;
        height: auto !important;
        max-height: calc(100vh - 48px) !important;
        max-height: calc(100dvh - 48px) !important;
        margin: auto !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        border-radius: 28px !important;
        background: #ffffff !important;
        color: #111111 !important;
        box-shadow: 0 34px 100px rgba(0, 0, 0, 0.34) !important;
        transform: none !important;
      `;
    }

    const overlay = popup.querySelector('[data-qtm-popup-overlay]');
    const media = popup.querySelector('.qtm-popup__media');
    const image = popup.querySelector('.qtm-popup__image');
    const content = popup.querySelector('.qtm-popup__content');
    const heading = popup.querySelector('.qtm-popup__heading');
    const text = popup.querySelector('.qtm-popup__text');
    const newsletterRow = popup.querySelector('.qtm-popup__newsletter-row');
    const input = popup.querySelector('.qtm-popup__input');
    const submit = popup.querySelector('.qtm-popup__submit');
    const actions = popup.querySelector('.qtm-popup__actions');
    const buttons = popup.querySelectorAll('.qtm-popup__button');
    const close = popup.querySelector('.qtm-popup__close');

    if (overlay) {
      overlay.style.cssText = `
        position: absolute !important;
        inset: 0 !important;
        z-index: 1 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: rgba(10, 12, 18, 0.66) !important;
        cursor: pointer !important;
      `;
    }

    if (media) {
      media.style.cssText = `
        width: 100% !important;
        height: auto !important;
        max-height: 280px !important;
        min-height: 0 !important;
        overflow: hidden !important;
        background: #f4f1eb !important;
      `;
    }

    if (image) {
      image.style.cssText = `
        display: block !important;
        width: 100% !important;
        height: 280px !important;
        min-height: 0 !important;
        max-height: 280px !important;
        object-fit: cover !important;
        object-position: center !important;
      `;
    }

    if (content) {
      content.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        gap: 16px !important;
        width: 100% !important;
        min-width: 0 !important;
        padding: 32px 34px 34px !important;
        background: #ffffff !important;
        color: #111111 !important;
      `;
    }

    if (heading) {
      heading.style.cssText = `
        margin: 0 !important;
        max-width: none !important;
        color: #111111 !important;
        font-size: clamp(30px, 5vw, 44px) !important;
        font-weight: 850 !important;
        line-height: 1 !important;
        letter-spacing: -0.05em !important;
      `;
    }

    if (text) {
      text.style.cssText = `
        margin: 0 !important;
        max-width: 54ch !important;
        color: rgba(17, 17, 17, 0.68) !important;
        font-size: 15.5px !important;
        line-height: 1.6 !important;
      `;
    }

    if (newsletterRow) {
      newsletterRow.style.cssText = `
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 6px !important;
        border: 1px solid rgba(17, 17, 17, 0.12) !important;
        border-radius: 999px !important;
        background: #ffffff !important;
        box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06) !important;
      `;
    }

    if (input) {
      input.style.cssText = `
        width: 100% !important;
        min-width: 0 !important;
        height: 44px !important;
        margin: 0 !important;
        padding: 0 14px !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: transparent !important;
        color: #111111 !important;
        font-size: 15px !important;
        line-height: 1 !important;
        outline: none !important;
        box-shadow: none !important;
      `;
    }

    if (submit) {
      submit.style.cssText = `
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 44px !important;
        margin: 0 !important;
        padding: 0 18px !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: #111111 !important;
        color: #ffffff !important;
        font-size: 14px !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      `;
    }

    if (actions) {
      actions.style.cssText = `
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 10px !important;
        width: 100% !important;
        margin-top: 4px !important;
      `;
    }

    buttons.forEach((button) => {
      const isSecondary = button.classList.contains('qtm-popup__button--secondary');

      button.style.cssText = `
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 46px !important;
        margin: 0 !important;
        padding: 0 18px !important;
        border: 1px solid ${isSecondary ? 'rgba(17, 17, 17, 0.14)' : '#111111'} !important;
        border-radius: 999px !important;
        background: ${isSecondary ? 'rgba(17, 17, 17, 0.04)' : '#111111'} !important;
        color: ${isSecondary ? '#111111' : '#ffffff'} !important;
        font-size: 14px !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        text-align: center !important;
        text-decoration: none !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      `;
    });

    if (close) {
      close.style.cssText = `
        position: absolute !important;
        top: 14px !important;
        right: 14px !important;
        z-index: 5 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 1px solid rgba(17, 17, 17, 0.1) !important;
        border-radius: 999px !important;
        background: rgba(255, 255, 255, 0.9) !important;
        color: #111111 !important;
        font-size: 22px !important;
        font-weight: 400 !important;
        line-height: 1 !important;
        cursor: pointer !important;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1) !important;
      `;
    }

    if (window.matchMedia('(max-width: 749px)').matches) {
      popup.style.padding = '14px';

      if (dialog) {
        dialog.style.width = 'calc(100vw - 28px)';
        dialog.style.maxWidth = 'calc(100vw - 28px)';
        dialog.style.maxHeight = 'calc(100dvh - 28px)';
        dialog.style.borderRadius = '22px';
      }

      if (media) {
        media.style.maxHeight = '220px';
      }

      if (image) {
        image.style.height = '220px';
        image.style.maxHeight = '220px';
      }

      if (content) {
        content.style.padding = '28px 22px 24px';
      }

      if (newsletterRow) {
        newsletterRow.style.gridTemplateColumns = '1fr';
        newsletterRow.style.borderRadius = '22px';
      }

      if (submit) {
        submit.style.width = '100%';
      }

      if (actions) {
        actions.style.display = 'grid';
        actions.style.gridTemplateColumns = '1fr';
      }

      buttons.forEach((button) => {
        button.style.width = '100%';
      });
    }
  }

  function clearInlinePopupStyles() {
    if (!popup) return;

    popup.removeAttribute('style');

    if (dialog) {
      dialog.removeAttribute('style');
    }

    const styledElements = popup.querySelectorAll(
      '[data-qtm-popup-overlay], .qtm-popup__media, .qtm-popup__image, .qtm-popup__content, .qtm-popup__heading, .qtm-popup__text, .qtm-popup__newsletter-row, .qtm-popup__input, .qtm-popup__submit, .qtm-popup__actions, .qtm-popup__button, .qtm-popup__close'
    );

    styledElements.forEach((element) => {
      element.removeAttribute('style');
    });
  }

  function physicallyShowPopup() {
    if (!popup) return false;

    popup.hidden = false;
    popup.removeAttribute('hidden');
    popup.setAttribute('aria-hidden', 'false');
    popup.classList.add('is-visible');

    applyCenteredPopupStyles();

    document.documentElement.classList.add('qtm-popup-open');
    document.body.classList.add('qtm-popup-open');

    window.requestAnimationFrame(() => {
      const focusable = getFocusableElements();

      if (focusable.length) {
        focusable[0].focus();
      } else if (dialog) {
        dialog.focus();
      }
    });

    return true;
  }

  function physicallyHidePopup() {
    if (!popup) return false;

    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');

    document.documentElement.classList.remove('qtm-popup-open');
    document.body.classList.remove('qtm-popup-open');

    window.setTimeout(() => {
      popup.hidden = true;
      popup.setAttribute('hidden', '');
      clearInlinePopupStyles();
    }, 220);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }

    return true;
  }

  function openPopup(force = false) {
    if (!popup) {
      popup = getPopup();

      if (!popup) return false;

      dialog = popup.querySelector('[data-qtm-popup-dialog]') || popup.querySelector('[role="dialog"]');
      config = getConfig();
    }

    if (!force) {
      if (openedThisPage && config.frequency !== 'always' && !(isThemeEditor() && config.editorPreview)) return false;
      if (!config.enabled && !(isThemeEditor() && config.editorPreview)) return false;
      if (!shouldShowForDevice()) return false;
      if (!shouldShowByFrequency()) return false;
    }

    openedThisPage = true;
    lastFocusedElement = document.activeElement;

    physicallyShowPopup();
    markSeen();

    document.addEventListener('keydown', handleKeydown);

    return true;
  }

  function closePopup() {
    document.removeEventListener('keydown', handleKeydown);
    return physicallyHidePopup();
  }

  function resetPopup() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    openedThisPage = false;
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closePopup();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setupEvents() {
    if (!popup || eventsBound) return;

    eventsBound = true;

    popup.querySelectorAll('[data-qtm-popup-close]').forEach((button) => {
      button.addEventListener('click', closePopup);
    });

    const overlay = popup.querySelector('[data-qtm-popup-overlay]');

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (config.overlayClickClose || isThemeEditor()) {
          closePopup();
        }
      });
    }

    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-qtm-popup-open]');

      if (!opener) return;

      event.preventDefault();
      openPopup(true);
    });
  }

  function setupAutoTrigger() {
    if (!popup) return;

    if (isThemeEditor() && config.editorPreview) {
      window.setTimeout(() => openPopup(true), 100);
      window.setTimeout(() => openPopup(true), 600);
      window.setTimeout(() => openPopup(true), 1300);
      return;
    }

    if (!config.enabled) return;
    if (!shouldShowForDevice()) return;
    if (config.trigger === 'manual') return;

    if (config.trigger === 'scroll') {
      const onScroll = () => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const scrollHeight = Math.max(doc.scrollHeight - window.innerHeight, 1);
        const progress = (scrollTop / scrollHeight) * 100;

        if (progress >= config.scrollPercent) {
          window.removeEventListener('scroll', onScroll);
          openPopup(false);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return;
    }

    if (config.trigger === 'exit_intent') {
      if (isMobile()) return;

      const onMouseOut = (event) => {
        if (event.clientY > 8) return;

        document.removeEventListener('mouseout', onMouseOut);
        openPopup(false);
      };

      document.addEventListener('mouseout', onMouseOut);
      return;
    }

    if (config.trigger === 'first_visit') {
      if (!localStorage.getItem(STORAGE_KEY)) {
        window.setTimeout(() => openPopup(false), config.delaySeconds * 1000);
      }

      return;
    }

    window.setTimeout(() => openPopup(false), config.delaySeconds * 1000);
  }

  function boot() {
    popup = getPopup();

    window.QuadratumPopup = {
      open: () => openPopup(true),
      close: closePopup,
      reset: resetPopup
    };

    if (!popup) return;

    dialog = popup.querySelector('[data-qtm-popup-dialog]') || popup.querySelector('[role="dialog"]');
    config = getConfig();

    resetPopup();
    setupEvents();
    setupAutoTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', boot);
  document.addEventListener('shopify:section:select', boot);
  document.addEventListener('shopify:block:select', boot);
})();