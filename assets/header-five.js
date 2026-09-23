(function () {
  if (window.qtmHeaderFiveBound) return;
  window.qtmHeaderFiveBound = true;
  function initHeaderFive(root) {
    if (!root) return;
    var lifecycle = new AbortController();
    function on(target, type, listener, options) {
      target.addEventListener(type, listener, Object.assign({}, options, { signal: lifecycle.signal }));
    }

    var departmentToggle = root.querySelector('[data-qtm-h5-departments-toggle]');
    var departmentPanel = root.querySelector('[data-qtm-h5-departments-panel]');
    var mobileOpenButton = root.querySelector('[data-qtm-h5-mobile-open]');
    var mobilePanel = root.querySelector('[data-qtm-h5-mobile-panel]');
    var mobileCloseButtons = root.querySelectorAll('[data-qtm-h5-mobile-close]');
    var mobileNestedToggles = root.querySelectorAll('[data-qtm-h5-mobile-nested-toggle]');
    var lastFocusedElement = null;
    var mobileCloseTimer = null;

    function isVisible(element) {
      if (!element) return false;
      if (element.closest('[hidden], [aria-hidden="true"]')) return false;
      if (element.getAttribute('aria-hidden') === 'true') return false;
      var closedDetails = element.closest('details:not([open])');
      if (closedDetails && element !== closedDetails.querySelector('summary')) return false;

      var style = window.getComputedStyle(element);

      return style.display !== 'none' && style.visibility !== 'hidden';
    }

    function getFocusableElements(container) {
      if (!container) return [];

      return Array.prototype.slice.call(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (element) {
        return isVisible(element);
      });
    }

    function openDepartments() {
      if (!departmentToggle || !departmentPanel) return;

      departmentToggle.setAttribute('aria-expanded', 'true');
      departmentPanel.hidden = false;
      root.classList.add('qtmHeaderFive--departmentsOpen');
    }

    function closeDepartments() {
      if (!departmentToggle || !departmentPanel) return;

      departmentToggle.setAttribute('aria-expanded', 'false');
      departmentPanel.hidden = true;
      root.classList.remove('qtmHeaderFive--departmentsOpen');
    }

    function toggleDepartments() {
      if (!departmentToggle || !departmentPanel) return;

      var isOpen = departmentToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeDepartments();
      } else {
        openDepartments();
      }
    }

    function openMobileMenu() {
      if (!mobileOpenButton || !mobilePanel) return;

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
        mobileCloseTimer = null;
      }

      lastFocusedElement = mobileOpenButton;

      closeDepartments();

      document.dispatchEvent(new CustomEvent('qtm:header-mobile-open', {detail:root}));
      mobilePanel.hidden = false;
      mobilePanel.setAttribute('aria-hidden', 'false');
      mobileOpenButton.setAttribute('aria-expanded', 'true');

      document.body.classList.add('qtm-header-five-mobile-open');
      document.body.classList.add('qtmHeaderFiveMobileOpen');

      mobilePanel.classList.remove('is-closing');
      mobilePanel.classList.add('is-open');
      // Visibility must be applied before focus; it must not wait for a transition.
      var target = mobilePanel.querySelector('button[data-qtm-h5-mobile-close]') || mobilePanel.querySelector('[role=dialog]');
      if (target) target.focus({ preventScroll: true });

      window.requestAnimationFrame(function () {
        if (mobilePanel.hidden || mobileOpenButton.getAttribute('aria-expanded') !== 'true') return;
        var target = mobilePanel.querySelector('button[data-qtm-h5-mobile-close]') || mobilePanel.querySelector('[role=dialog]');
        if (target && !mobilePanel.contains(document.activeElement)) target.focus({ preventScroll: true });
      });
    }

    function closeMobileMenu(event, restoreFocus = true) {
      if (!mobilePanel || !mobileOpenButton || mobilePanel.hidden || mobileOpenButton.getAttribute('aria-expanded') !== 'true') return;
      if (event) event.preventDefault();

      mobileOpenButton.setAttribute('aria-expanded', 'false');
      if (restoreFocus && lastFocusedElement && lastFocusedElement.isConnected) lastFocusedElement.focus({ preventScroll: true });
      mobilePanel.setAttribute('aria-hidden', 'true');

      mobilePanel.classList.remove('is-open');
      mobilePanel.classList.add('is-closing');

      document.body.classList.remove('qtm-header-five-mobile-open');
      document.body.classList.remove('qtmHeaderFiveMobileOpen');

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
      }

      mobileCloseTimer = window.setTimeout(function () {
        mobilePanel.hidden = true;
        mobilePanel.classList.remove('is-closing');
        mobileCloseTimer = null;


      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
    }

    if (departmentToggle && departmentPanel) {
      on(departmentToggle, 'click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDepartments();
      });

      on(departmentToggle, 'keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          openDepartments();

          var focusable = getFocusableElements(departmentPanel);

          if (focusable.length) {
            focusable[0].focus();
          }
        }
      });

      on(departmentPanel, 'click', function (event) {
        event.stopPropagation();
      });

      on(departmentPanel, 'keydown', function (event) {
        if (event.key === 'Escape') {
          closeDepartments();
          departmentToggle.focus();
        }
      });
    }

    on(document, 'click', function (event) {
      if (!root.contains(event.target)) {
        closeDepartments();
      }
    });

    if (mobileOpenButton) {
      on(mobileOpenButton, 'click', function (event) {
        event.preventDefault();
        openMobileMenu();
      });
    }

    mobileCloseButtons.forEach(function (button) {
      on(button, 'click', function (event) {
        event.preventDefault();
        closeMobileMenu();
      });
    });

    mobileNestedToggles.forEach(function (toggle) {
      on(toggle, 'click', function () {
        var panelId = toggle.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

        if (panel) {
          panel.hidden = isOpen;
        }
      });
    });

    root.querySelectorAll('shopify-account').forEach(function(account) {
      on(account, 'open', function() { closeMobileMenu(null, false); });
    });
    on(document, 'qtm:header-mobile-open', function(event) { if (event.detail !== root) closeMobileMenu(); });
    on(root, 'click', function(event) {
      if (mobilePanel && mobilePanel.contains(event.target) && event.target.closest('[data-search-popup-open], [data-cart-drawer-open]')) closeMobileMenu();
    });
    on(document, 'focusin', function (event) {
      if (!root.isConnected || !mobilePanel || !mobileOpenButton || mobileOpenButton.getAttribute('aria-expanded') !== 'true') return;
      if (!mobilePanel.contains(event.target)) {
        var target = getFocusableElements(mobilePanel)[0] || mobilePanel.querySelector('[role=dialog]');
        if (target) target.focus({ preventScroll: true });
      }
    });

    on(document, 'keydown', function (event) {
      if (event.key === 'Escape') {
        closeDepartments();

        if (mobilePanel && !mobilePanel.hidden) {
          closeMobileMenu();
        }
      }

      if (event.key === 'Tab' && mobilePanel && mobileOpenButton.getAttribute('aria-expanded') === 'true') {
        var focusable = getFocusableElements(mobilePanel);

        if (!focusable.length) {
          event.preventDefault();
          var dialog = mobilePanel.querySelector('[role=dialog]');
          if (dialog) dialog.focus();
          return;
        }

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (!mobilePanel.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    on(window, 'resize', function () {
      if (window.innerWidth > 1100 && mobilePanel && !mobilePanel.hidden) {
        closeMobileMenu();
      }

      if (window.innerWidth <= 1100) {
        closeDepartments();
      }
    });
    on(document, 'shopify:section:unload', function (event) {
      if (!event.target.contains(root)) return;
      if (mobilePanel && !mobilePanel.hidden) closeMobileMenu();
      window.clearTimeout(mobileCloseTimer);
      if (mobilePanel) mobilePanel.hidden = true;
      lifecycle.abort();
      delete root.dataset.qtmHeaderFiveInitialized;
    });
  }

  function initAllHeaderFive() {
    var headers = document.querySelectorAll('[data-qtm-header-five]');

    headers.forEach(function (root) {
      if (root.dataset.qtmHeaderFiveInitialized === 'true') return;

      root.dataset.qtmHeaderFiveInitialized = 'true';
      initHeaderFive(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllHeaderFive);
  } else {
    initAllHeaderFive();
  }

  document.addEventListener('shopify:section:load', function (event) {
    if (!event || !event.target) return;

    var root = event.target.querySelector('[data-qtm-header-five]');

    if (root) {
      initAllHeaderFive();
    }
  });
})();