(function () {
  function initSearchPopup() {
    var popup = document.getElementById('QtmSearchPopup');
    if (!popup || popup.dataset.qtmPopupReady === 'true') return;

    popup.dataset.qtmPopupReady = 'true';

    var dialog = popup.querySelector('.qtm-search-popup__dialog');
    var input = popup.querySelector('input[type="search"]');
    var lastTrigger = null;
    var focusTimer = null;

    function openPopup(trigger) {
      lastTrigger = trigger || document.activeElement;
      popup.hidden = false;
      popup.setAttribute('aria-hidden', 'false');
      document.body.classList.add('qtm-search-popup-open');

      window.clearTimeout(focusTimer);
      focusTimer = window.setTimeout(function () {
        if (!popup.hidden && input) input.focus();
      }, 20);
    }

    function closePopup() {
      window.clearTimeout(focusTimer);
      popup.dispatchEvent(new CustomEvent('qtm:search-close', { bubbles: true }));
      popup.hidden = true;
      popup.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('qtm-search-popup-open');

      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
    }

    document.addEventListener('click', function (event) {
      var openTrigger = event.target.closest('[data-search-popup-open]');
      if (openTrigger) {
        event.preventDefault();
        openPopup(openTrigger);
        return;
      }

      var closeTrigger = event.target.closest('[data-search-popup-close]');
      if (closeTrigger) {
        event.preventDefault();
        closePopup();
        return;
      }

      if (!popup.hidden && dialog && !dialog.contains(event.target)) {
        closePopup();
      }
    });

    function focusable() {
      return Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function (element) {
        return !element.closest('[hidden], [aria-hidden="true"]');
      });
    }
    document.addEventListener('focusin', function (event) {
      if (!popup.hidden && dialog && !dialog.contains(event.target)) {
        var target = input || focusable()[0];
        if (target) target.focus();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (popup.hidden) return;

      if (event.key === 'Tab' && dialog) {
        var controls = focusable();
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (first && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (last && !event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        closePopup();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchPopup);
  } else {
    initSearchPopup();
  }
})();