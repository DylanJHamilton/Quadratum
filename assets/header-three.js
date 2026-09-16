(function () {
  if (window.qtmHeaderThreeBound) return;
  window.qtmHeaderThreeBound = true;
  function initHeaderThree(root) {
    if (!root) return;
    var lifecycle = new AbortController();
    function on(target, type, listener, options) {
      target.addEventListener(type, listener, Object.assign({}, options, { signal: lifecycle.signal }));
    }

    var transparentUntilScroll = root.getAttribute('data-transparent-until-scroll') === 'true';
    var mobileOpenButton = root.querySelector('[data-qtm-h3-mobile-open]');
    var mobilePanel = root.querySelector('[data-qtm-h3-mobile-panel]');
    var mobileCloseButtons = root.querySelectorAll('[data-qtm-h3-mobile-close]');
    var dropdownButtons = root.querySelectorAll('[data-qtm-h3-dropdown-toggle]');
    var lastFocusedElement = null;
    var mobileCloseTimer = null;

    function setScrolledState() {
      if (!transparentUntilScroll) return;

      if (window.scrollY > 12) {
        root.classList.add('qtmHeaderThree--isScrolled');
      } else {
        root.classList.remove('qtmHeaderThree--isScrolled');
      }
    }

    function closeDropdowns(exceptButton) {
      dropdownButtons.forEach(function (button) {
        if (exceptButton && button === exceptButton) return;

        var panelId = button.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;

        button.setAttribute('aria-expanded', 'false');

        if (panel) {
          panel.hidden = true;
        }
      });
    }

    function toggleDropdown(button) {
      var panelId = button.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      var isOpen = button.getAttribute('aria-expanded') === 'true';

      closeDropdowns(button);

      button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

      if (panel) {
        panel.hidden = isOpen;
      }
    }

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
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (element) {
        return !element.hasAttribute('disabled') && isVisible(element);
      });
    }

    function openMobileMenu(event) {
      if (event) event.preventDefault();
      if (!mobilePanel || !mobileOpenButton) return;

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
        mobileCloseTimer = null;
      }

      lastFocusedElement = mobileOpenButton;

      closeDropdowns();

      document.dispatchEvent(new CustomEvent('qtm:header-mobile-open', {detail:root}));
      mobilePanel.hidden = false;
      mobilePanel.setAttribute('aria-hidden', 'false');
      mobileOpenButton.setAttribute('aria-expanded', 'true');

      document.documentElement.classList.add('qtmHeaderThreeMobileOpen');
      document.body.classList.add('qtmHeaderThreeMobileOpen');
      document.body.classList.add('qtm-header-three-mobile-open');

      mobilePanel.classList.remove('is-closing');
      mobilePanel.classList.add('is-open');
      var target = mobilePanel.querySelector('button[data-qtm-h3-mobile-close]') || mobilePanel.querySelector('[role=dialog]');
      if (target) target.focus({ preventScroll: true });

      window.requestAnimationFrame(function () {
        if (mobilePanel.hidden || mobileOpenButton.getAttribute('aria-expanded') !== 'true') return;

        var focusable = getFocusableElements(mobilePanel);

        if (focusable.length) {
          focusable[0].focus();
        }
      });
    }

    function closeMobileMenu(event) {
      if (event) event.preventDefault();
      if (!mobilePanel || !mobileOpenButton || mobilePanel.hidden) return;

      mobileOpenButton.setAttribute('aria-expanded', 'false');
      if (lastFocusedElement && lastFocusedElement.isConnected) lastFocusedElement.focus({ preventScroll: true });
      mobilePanel.setAttribute('aria-hidden', 'true');

      mobilePanel.classList.remove('is-open');
      mobilePanel.classList.add('is-closing');

      document.documentElement.classList.remove('qtmHeaderThreeMobileOpen');
      document.body.classList.remove('qtmHeaderThreeMobileOpen');
      document.body.classList.remove('qtm-header-three-mobile-open');

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
      }

      mobileCloseTimer = window.setTimeout(function () {
        mobilePanel.hidden = true;
        mobilePanel.classList.remove('is-closing');
        mobileCloseTimer = null;

      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
    }

    if (transparentUntilScroll) {
      setScrolledState();
      on(window, 'scroll', setScrolledState, { passive: true });
    } else {
      root.classList.add('qtmHeaderThree--isScrolled');
    }

    dropdownButtons.forEach(function (button) {
      on(button, 'click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDropdown(button);
      });

      on(button, 'keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (button.getAttribute('aria-expanded') !== 'true') toggleDropdown(button);

          var panelId = button.getAttribute('aria-controls');
          var panel = panelId ? document.getElementById(panelId) : null;
          var focusable = getFocusableElements(panel);

          if (focusable.length) {
            focusable[0].focus();
          }
        }
      });
    });

    on(document, 'click', function (event) {
      if (!root.contains(event.target)) {
        closeDropdowns();
      }
    });

    if (mobileOpenButton) {
      on(mobileOpenButton, 'click', openMobileMenu);
    }

    mobileCloseButtons.forEach(function (button) {
      on(button, 'click', closeMobileMenu);
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
        var expanded = root.querySelector('[data-qtm-h3-dropdown-toggle][aria-expanded="true"]');
        if (expanded && root.contains(document.activeElement)) expanded.focus();
        closeDropdowns();

        if (mobilePanel && !mobilePanel.hidden) {
          closeMobileMenu(event);
        }
      }

      if (event.key === 'Tab' && mobilePanel && mobileOpenButton.getAttribute('aria-expanded') === 'true') {
        var focusable = getFocusableElements(mobilePanel);

        if (!focusable.length) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
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
    });
    on(document, 'shopify:section:unload', function (event) {
      if (!event.target.contains(root)) return;
      if (mobilePanel && !mobilePanel.hidden) closeMobileMenu();
      window.clearTimeout(mobileCloseTimer);
      if (mobilePanel) mobilePanel.hidden = true;
      lifecycle.abort();
      delete root.dataset.qtmHeaderThreeInitialized;
    });
  }

  function initAllHeaderThree() {
    var headers = document.querySelectorAll('[data-qtm-header-three]');

    headers.forEach(function (root) {
      if (root.dataset.qtmHeaderThreeInitialized === 'true') return;
      root.dataset.qtmHeaderThreeInitialized = 'true';
      initHeaderThree(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllHeaderThree);
  } else {
    initAllHeaderThree();
  }

  document.addEventListener('shopify:section:load', function (event) {
    if (!event || !event.target) return;

    var root = event.target.querySelector('[data-qtm-header-three]');

    if (root) {
      initAllHeaderThree();
    }
  });
})();