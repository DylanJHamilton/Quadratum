(function () {
  function initHeaderFive(root) {
    if (!root) return;

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
      if (element.hidden) return false;
      if (element.getAttribute('aria-hidden') === 'true') return false;

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

      lastFocusedElement = document.activeElement;

      closeDepartments();

      mobilePanel.hidden = false;
      mobilePanel.setAttribute('aria-hidden', 'false');
      mobileOpenButton.setAttribute('aria-expanded', 'true');

      document.body.classList.add('qtm-header-five-mobile-open');
      document.body.classList.add('qtmHeaderFiveMobileOpen');

      mobilePanel.classList.remove('is-closing');

      window.requestAnimationFrame(function () {
        mobilePanel.classList.add('is-open');

        var focusable = getFocusableElements(mobilePanel);

        if (focusable.length) {
          focusable[0].focus();
        }
      });
    }

    function closeMobileMenu() {
      if (!mobileOpenButton || !mobilePanel || mobilePanel.hidden) return;

      mobileOpenButton.setAttribute('aria-expanded', 'false');
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

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
          lastFocusedElement.focus();
        }
      }, 280);
    }

    if (departmentToggle && departmentPanel) {
      departmentToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDepartments();
      });

      departmentToggle.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          openDepartments();

          var focusable = getFocusableElements(departmentPanel);

          if (focusable.length) {
            focusable[0].focus();
          }
        }
      });

      departmentPanel.addEventListener('click', function (event) {
        event.stopPropagation();
      });

      departmentPanel.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeDepartments();
          departmentToggle.focus();
        }
      });
    }

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        closeDepartments();
      }
    });

    if (mobileOpenButton) {
      mobileOpenButton.addEventListener('click', function (event) {
        event.preventDefault();
        openMobileMenu();
      });
    }

    mobileCloseButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        closeMobileMenu();
      });
    });

    mobileNestedToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var panelId = toggle.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

        if (panel) {
          panel.hidden = isOpen;
        }
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDepartments();

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

      if (window.innerWidth <= 1100) {
        closeDepartments();
      }
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
      root.dataset.qtmHeaderFiveInitialized = 'false';
      initAllHeaderFive();
    }
  });
})();