(function () {
  function initSearchPopup() {
    var popup = document.getElementById('QtmSearchPopup');
    if (!popup || popup.dataset.qtmPopupReady === 'true') return;

    popup.dataset.qtmPopupReady = 'true';

    var dialog = popup.querySelector('.qtm-search-popup__dialog');
    var input = popup.querySelector('input[type="search"]');
    var lastTrigger = null;

    function openPopup(trigger) {
      lastTrigger = trigger || document.activeElement;
      popup.hidden = false;
      popup.setAttribute('aria-hidden', 'false');
      document.body.classList.add('qtm-search-popup-open');

      window.setTimeout(function () {
        if (input) input.focus();
      }, 20);
    }

    function closePopup() {
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

    document.addEventListener('keydown', function (event) {
      if (popup.hidden) return;

      if (event.key === 'Escape') {
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