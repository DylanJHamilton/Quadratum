(() => {
  if (window.qtmHeaderOneBound) return;
  window.qtmHeaderOneBound = true;
  function init(root) {

      if (!root || root.dataset.qh1Initialized === 'true') return;
      root.dataset.qh1Initialized = 'true';
      const lifecycle = new AbortController();
      function on(target, type, handler, options) {
        target.addEventListener(type, handler, Object.assign({}, options, {signal:lifecycle.signal}));
      }

      var toggle = root.querySelector('[data-qh1-mobile-toggle]');
      var panel = root.querySelector('[data-qh1-mobile-panel]');
      var overlay = root.querySelector('[data-qh1-mobile-close]');
      var dropdownToggles = root.querySelectorAll('[data-qh1-dropdown-toggle]');
      var mobileSubtoggles = root.querySelectorAll('[data-qh1-mobile-subtoggle]');
      var lastFocusedElement = null;

      function getFocusableElements(container) {
        if (!container) return [];

        return Array.prototype.slice.call(
          container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
        ).filter(function(element) {
          const style = getComputedStyle(element);
          return !element.closest('[hidden], [aria-hidden="true"]') && style.display !== 'none' && style.visibility !== 'hidden';
        });
      }

      function closeDropdowns(exceptButton) {
        dropdownToggles.forEach(function(button) {
          if (exceptButton && button === exceptButton) return;

          var panelId = button.getAttribute('aria-controls');
          var dropdown = panelId ? document.getElementById(panelId) : null;

          button.setAttribute('aria-expanded', 'false');
          if (dropdown) dropdown.hidden = true;
        });
      }

      function toggleDropdown(button) {
        var panelId = button.getAttribute('aria-controls');
        var dropdown = panelId ? document.getElementById(panelId) : null;
        var isOpen = button.getAttribute('aria-expanded') === 'true';

        closeDropdowns(button);

        button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (dropdown) dropdown.hidden = isOpen;
      }

      function setOpen(isOpen) {
        if (!toggle || !panel || (!isOpen && panel.hidden)) return;

        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

        if (isOpen) {
          document.dispatchEvent(new CustomEvent('qtm:header-mobile-open', {detail:root}));
          lastFocusedElement = toggle;
          panel.hidden = false;
          panel.classList.add('is-open');
          if (overlay) overlay.classList.add('is-open');
          document.documentElement.classList.add('qh1-mobile-open');
          document.body.classList.add('qh1-mobile-open');

          var focusable = getFocusableElements(panel);
          if (focusable.length && root.classList.contains('q-header-one--mobile-drawer_like')) {
            focusable[0].focus();
          }
        } else {
          panel.hidden = true;
          panel.classList.remove('is-open');
          if (overlay) overlay.classList.remove('is-open');
          document.documentElement.classList.remove('qh1-mobile-open');
          document.body.classList.remove('qh1-mobile-open');

          if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
          }
        }
      }

      dropdownToggles.forEach(function(button) {
        on(button, 'click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          toggleDropdown(button);
        });
      });

      mobileSubtoggles.forEach(function(button) {
        on(button, 'click', function() {
          var targetId = button.getAttribute('aria-controls');
          var target = targetId ? document.getElementById(targetId) : null;
          if (!target) return;

          var isOpen = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
          target.hidden = isOpen;
        });
      });

      on(document, 'click', function(event) {
        if (!root.contains(event.target)) {
          closeDropdowns();
        }
      });

      if (toggle) {
        on(toggle, 'click', function() {
          var isOpen = toggle.getAttribute('aria-expanded') === 'true';
          setOpen(!isOpen);
        });
      }

      if (overlay) {
        on(overlay, 'click', function() {
          setOpen(false);
        });
      }

      on(document, 'keydown', function(event) {
        if (event.key === 'Escape') {
          var expanded = root.querySelector('[data-qh1-dropdown-toggle][aria-expanded="true"]');
          if (expanded && root.contains(document.activeElement)) expanded.focus();
          closeDropdowns();
          if (panel && !panel.hidden) setOpen(false);
        }

        if (event.key === 'Tab' && panel && !panel.hidden && root.classList.contains('q-header-one--mobile-drawer_like')) {
          var focusable = getFocusableElements(panel);
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

      on(window, 'resize', function() {
        if (window.innerWidth > 989) {
          setOpen(false);
        }
      });

      root.querySelectorAll('[data-cart-drawer-open], [data-search-popup-open]').forEach(function(trigger) {
        on(trigger, 'click', function() {
          if (panel && !panel.hidden) setOpen(false);
        });
      });

      on(document, 'qtm:header-mobile-open', function(event) { if (event.detail !== root) setOpen(false); });
      on(document, 'focusin', function(event) {
        if (!root.isConnected || !panel || panel.hidden || !root.classList.contains('q-header-one--mobile-drawer_like') || panel.contains(event.target)) return;
        const target = getFocusableElements(panel)[0] || panel;
        target.focus();
      });
      on(document, 'shopify:section:unload', function(event) {
        if (!event.target.contains(root)) return;
        setOpen(false); lifecycle.abort(); delete root.dataset.qh1Initialized;
      });
      setOpen(false);
    
  }
  function boot(scope=document) { scope.querySelectorAll('[data-qtm-header-one]').forEach(init); }
  document.addEventListener('shopify:section:load', event => boot(event.target));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot()); else boot();
})();
