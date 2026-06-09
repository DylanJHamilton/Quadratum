(() => {
  const STORAGE_KEY = 'qtm_global_popup_seen';
  const SESSION_KEY = 'qtm_global_popup_seen_session';

  let popup = null;
  let dialog = null;
  let config = {};
  let openedThisPage = false;
  let lastFocusedElement = null;

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

  function physicallyShowPopup() {
    if (!popup) return false;

    popup.hidden = false;
    popup.removeAttribute('hidden');
    popup.setAttribute('aria-hidden', 'false');
    popup.classList.add('is-visible');

    popup.style.display = 'flex';
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    popup.style.pointerEvents = 'auto';
    popup.style.position = 'fixed';
    popup.style.inset = '0';
    popup.style.zIndex = '999999';

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

    popup.style.opacity = '';
    popup.style.visibility = '';
    popup.style.pointerEvents = '';
    popup.style.display = '';
    popup.style.position = '';
    popup.style.inset = '';
    popup.style.zIndex = '';

    window.setTimeout(() => {
      popup.hidden = true;
      popup.setAttribute('hidden', '');
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
    if (!popup) return;

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