(function () {
  if (window.qtmHeaderFourBound) return;
  window.qtmHeaderFourBound = true;
  function initHeaderFour(root) {
    if (!root) return;
    var lifecycle = new AbortController();
    function on(target, type, listener, options) {
      target.addEventListener(type, listener, Object.assign({}, options, { signal: lifecycle.signal }));
    }

    var mobileOpen = root.querySelector('[data-qtm-h4-mobile-open]');
    var mobilePanel = root.querySelector('[data-qtm-h4-mobile-panel]');
    var mobileCloseButtons = root.querySelectorAll('[data-qtm-h4-mobile-close]');
    var countdowns = root.querySelectorAll('[data-qtm-h4-countdown]');
    var announcementAutoRotate = root.getAttribute('data-announcement-auto-rotate') === 'true';
    var announcementSlides = root.querySelectorAll('[data-qtm-h4-announcement-slide]');
    var stickyMode = root.getAttribute('data-sticky-mode');
    var lastScrollY = window.scrollY;
    var lastFocusedElement = null;
    var mobileCloseTimer = null;
    var countdownTimer = null;
    var announcementTimer = null;

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

    function openMobileMenu(event) {
      if (event) event.preventDefault();
      if (!mobilePanel || !mobileOpen) return;

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
        mobileCloseTimer = null;
      }

      lastFocusedElement = mobileOpen;

      document.dispatchEvent(new CustomEvent('qtm:header-mobile-open', {detail:root}));
      mobilePanel.hidden = false;
      mobilePanel.setAttribute('aria-hidden', 'false');
      mobileOpen.setAttribute('aria-expanded', 'true');

      document.body.classList.add('qtmHeaderFourMobileOpen');
      document.body.classList.add('qtm-header-four-mobile-open');

      mobilePanel.classList.remove('is-closing');
      mobilePanel.classList.add('is-open');
      var target = mobilePanel.querySelector('button[data-qtm-h4-mobile-close]') || mobilePanel.querySelector('[role=dialog]');
      if (target) target.focus({ preventScroll: true });

      window.requestAnimationFrame(function () {
        if (mobilePanel.hidden || mobileOpen.getAttribute('aria-expanded') !== 'true') return;

        var focusable = getFocusableElements(mobilePanel);

        if (focusable.length) {
          focusable[0].focus();
        }
      });
    }

    function closeMobileMenu(event, restoreFocus = true) {
      if (!mobilePanel || !mobileOpen || mobilePanel.hidden || mobileOpen.getAttribute('aria-expanded') !== 'true') return;
      if (event) event.preventDefault();

      mobileOpen.setAttribute('aria-expanded', 'false');
      if (restoreFocus && lastFocusedElement && lastFocusedElement.isConnected) lastFocusedElement.focus({ preventScroll: true });
      mobilePanel.setAttribute('aria-hidden', 'true');

      mobilePanel.classList.remove('is-open');
      mobilePanel.classList.add('is-closing');

      document.body.classList.remove('qtmHeaderFourMobileOpen');
      document.body.classList.remove('qtm-header-four-mobile-open');

      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
      }

      mobileCloseTimer = window.setTimeout(function () {
        mobilePanel.hidden = true;
        mobilePanel.classList.remove('is-closing');
        mobileCloseTimer = null;

      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
    }

    function padNumber(number) {
      return String(number).padStart(2, '0');
    }

    function updateCountdown(countdown) {
      var endValue = countdown.getAttribute('data-end');
      var expiredMessage = countdown.getAttribute('data-expired-message') || 'This offer has ended';

      if (!endValue) return;

      var endDate = new Date(endValue).getTime();

      if (Number.isNaN(endDate)) return;

      var now = Date.now();
      var distance = endDate - now;

      var daysEl = countdown.querySelector('[data-qtm-h4-days]');
      var hoursEl = countdown.querySelector('[data-qtm-h4-hours]');
      var minutesEl = countdown.querySelector('[data-qtm-h4-minutes]');
      var secondsEl = countdown.querySelector('[data-qtm-h4-seconds]');
      var expiredEl = countdown.querySelector('[data-qtm-h4-countdown-expired]');
      var unitsEl = countdown.querySelector('.qtmHeaderFour__countdownUnits');

      if (distance <= 0) {
        if (unitsEl) unitsEl.hidden = true;
        if (expiredEl) {
          expiredEl.hidden = false;
          expiredEl.textContent = expiredMessage;
        }
        return;
      }

      if (unitsEl) unitsEl.hidden = false;
      if (expiredEl) expiredEl.hidden = true;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((distance / (1000 * 60)) % 60);
      var seconds = Math.floor((distance / 1000) % 60);

      if (daysEl) daysEl.textContent = padNumber(days);
      if (hoursEl) hoursEl.textContent = padNumber(hours);
      if (minutesEl) minutesEl.textContent = padNumber(minutes);
      if (secondsEl) secondsEl.textContent = padNumber(seconds);
    }

    function initCountdowns() {
      if (!countdowns.length) return;

      countdowns.forEach(updateCountdown);

      if (countdownTimer) {
        window.clearInterval(countdownTimer);
      }

      countdownTimer = window.setInterval(function () {
        countdowns.forEach(updateCountdown);
      }, 1000);
    }

    function initAnnouncementRotation() {
      if (!announcementAutoRotate || announcementSlides.length <= 1) return;

      var index = 0;
      var pauseButton = root.querySelector('[data-qtm-h4-announcement-pause]');
      var paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var hovered = false;
      var region = root.querySelector('[data-qtm-h4-announcements]');
      function updatePauseButton() {
        if (!pauseButton) return;
        pauseButton.hidden = false;
        pauseButton.setAttribute('aria-pressed', String(paused));
        pauseButton.textContent = paused ? 'Resume announcements' : 'Pause announcements';
      }
      if (pauseButton) on(pauseButton, 'click', function() { paused = !paused; updatePauseButton(); });
      if (region) {
        on(region, 'mouseenter', function() { hovered = true; });
        on(region, 'mouseleave', function() { hovered = false; });
      }
      updatePauseButton();

      if (announcementTimer) {
        window.clearInterval(announcementTimer);
      }

      announcementTimer = window.setInterval(function () {
        if (paused || hovered || document.hidden || (region && region.contains(document.activeElement))) return;
        announcementSlides[index].classList.add('is-hidden');
        index = (index + 1) % announcementSlides.length;
        announcementSlides[index].classList.remove('is-hidden');
      }, 4200);
    }

    function handleStickyScroll() {
      if (stickyMode !== 'hide_on_scroll') return;
      if (mobilePanel && !mobilePanel.hidden) return;

      var currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        root.classList.add('qtmHeaderFour--hidden');
      } else {
        root.classList.remove('qtmHeaderFour--hidden');
      }

      lastScrollY = currentScrollY;
    }

    if (mobileOpen) {
      on(mobileOpen, 'click', openMobileMenu);
    }

    mobileCloseButtons.forEach(function (button) {
      on(button, 'click', closeMobileMenu);
    });

    root.querySelectorAll('shopify-account').forEach(function(account) {
      on(account, 'open', function() { closeMobileMenu(null, false); });
    });
    on(document, 'qtm:header-mobile-open', function(event) { if (event.detail !== root) closeMobileMenu(); });
    on(root, 'click', function(event) {
      if (mobilePanel && mobilePanel.contains(event.target) && event.target.closest('[data-search-popup-open], [data-cart-drawer-open]')) closeMobileMenu();
    });
    on(document, 'focusin', function (event) {
      if (!root.isConnected || !mobilePanel || !mobileOpen || mobileOpen.getAttribute('aria-expanded') !== 'true') return;
      if (!mobilePanel.contains(event.target)) {
        var target = getFocusableElements(mobilePanel)[0] || mobilePanel.querySelector('[role=dialog]');
        if (target) target.focus({ preventScroll: true });
      }
    });

    on(document, 'keydown', function (event) {
      if (event.key === 'Escape' && mobilePanel && !mobilePanel.hidden) {
        closeMobileMenu(event);
      }

      if (event.key === 'Tab' && mobilePanel && mobileOpen.getAttribute('aria-expanded') === 'true') {
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

    on(window, 'scroll', handleStickyScroll, { passive: true });

    initCountdowns();
    initAnnouncementRotation();
    on(document, 'shopify:section:unload', function (event) {
      if (!event.target.contains(root)) return;
      if (mobilePanel && !mobilePanel.hidden) closeMobileMenu();
      window.clearTimeout(mobileCloseTimer);
      if (mobilePanel) mobilePanel.hidden = true;
      lifecycle.abort();
      delete root.dataset.qtmHeaderFourInitialized;
      window.clearInterval(countdownTimer);
      window.clearInterval(announcementTimer);
    });
  }

  function initAllHeaderFour() {
    var headers = document.querySelectorAll('[data-qtm-header-four]');

    headers.forEach(function (root) {
      if (root.dataset.qtmHeaderFourInitialized === 'true') return;

      root.dataset.qtmHeaderFourInitialized = 'true';
      initHeaderFour(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllHeaderFour);
  } else {
    initAllHeaderFour();
  }

  document.addEventListener('shopify:section:load', function (event) {
    if (!event || !event.target) return;

    var root = event.target.querySelector('[data-qtm-header-four]');

    if (root) {
      initAllHeaderFour();
    }
  });
})();