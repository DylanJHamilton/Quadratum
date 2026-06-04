(function () {
  function initHeaderThree(root) {
    if (!root) return;

    var transparentUntilScroll = root.getAttribute('data-transparent-until-scroll') === 'true';
    var mobileOpenButton = root.querySelector('[data-qtm-h3-mobile-open]');
    var mobilePanel = root.querySelector('[data-qtm-h3-mobile-panel]');
    var mobileCloseButtons = root.querySelectorAll('[data-qtm-h3-mobile-close]');
    var dropdownButtons = root.querySelectorAll('[data-qtm-h3-dropdown-toggle]');
    var lastFocusedElement = null;

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

    function getFocusableElements(container) {
      if (!container) return [];

      return Array.prototype.slice.call(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (element) {
        return !element.hasAttribute('disabled') && element.offsetParent !== null;
      });
    }

    function openMobileMenu() {
      if (!mobilePanel || !mobileOpenButton) return;

      lastFocusedElement = document.activeElement;

      mobilePanel.hidden = false;
      mobilePanel.setAttribute('aria-hidden', 'false');
      mobileOpenButton.setAttribute('aria-expanded', 'true');
      document.body.classList.add('qtmHeaderThreeMobileOpen');

      var focusable = getFocusableElements(mobilePanel);

      if (focusable.length) {
        focusable[0].focus();
      }
    }

    function closeMobileMenu() {
      if (!mobilePanel || !mobileOpenButton) return;

      mobilePanel.hidden = true;
      mobilePanel.setAttribute('aria-hidden', 'true');
      mobileOpenButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('qtmHeaderThreeMobileOpen');

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    if (transparentUntilScroll) {
      setScrolledState();
      window.addEventListener('scroll', setScrolledState, { passive: true });
    } else {
      root.classList.add('qtmHeaderThree--isScrolled');
    }

    dropdownButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDropdown(button);
      });

      button.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          toggleDropdown(button);

          var panelId = button.getAttribute('aria-controls');
          var panel = panelId ? document.getElementById(panelId) : null;
          var focusable = getFocusableElements(panel);

          if (focusable.length) {
            focusable[0].focus();
          }
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        closeDropdowns();
      }
    });

    if (mobileOpenButton) {
      mobileOpenButton.addEventListener('click', openMobileMenu);
    }

    mobileCloseButtons.forEach(function (button) {
      button.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDropdowns();

        if (mobilePanel && !mobilePanel.hidden) {
          closeMobileMenu();
        }
      }

      if (event.key === 'Tab' && mobilePanel && !mobilePanel.hidden) {
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

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100 && mobilePanel && !mobilePanel.hidden) {
        closeMobileMenu();
      }
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
      root.dataset.qtmHeaderThreeInitialized = 'false';
      initAllHeaderThree();
    }
  });
})();