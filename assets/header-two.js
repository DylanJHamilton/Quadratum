/* ========================================================================== 
   Quadratum — Header Two (Mega Commerce Header)
   Production interaction layer.
   ========================================================================== */

(function () {
  'use strict';

  var DESKTOP_MQ = window.matchMedia('(min-width: 990px) and (hover: hover) and (pointer: fine)');
  var HOVER_CLOSE_DELAY = 160;
  var DRAWER_TRANSITION_MS = 280;

  function isVisible(element) {
    if (!element || element.hidden) return false;
    if (element.getAttribute('aria-hidden') === 'true') return false;
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function getFocusable(container) {
    if (!container) return [];
    return Array.prototype.slice.call(
      container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')
    ).filter(function (element) {
      return !element.hasAttribute('disabled') && isVisible(element);
    });
  }

  function initHeaderTwo(header) {
    if (!header || header.dataset.qh2Initialized === 'true') return;
    header.dataset.qh2Initialized = 'true';

    initDesktopMenus(header);
    initMobileDrawer(header);
    initAccountDisclosure(header);
    initStickyBehavior(header);
    initAnnouncement(header);
  }

  function initDesktopMenus(header) {
    var items = header.querySelectorAll('[data-qh2-menu-item]');
    if (!items.length) return;

    var openItem = null;
    var closeTimer = null;

    function getTrigger(item) {
      return item.querySelector('[data-qh2-menu-trigger]');
    }

    function getPanel(item) {
      return item.querySelector('[data-qh2-menu-panel]');
    }

    function open(item) {
      if (openItem === item) return;
      close();

      var trigger = getTrigger(item);
      var panel = getPanel(item);
      if (!trigger || !panel) return;

      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      item.classList.add('is-open');
      openItem = item;
    }

    function close() {
      if (!openItem) return;
      var trigger = getTrigger(openItem);
      var panel = getPanel(openItem);
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
      openItem.classList.remove('is-open');
      openItem = null;
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, HOVER_CLOSE_DELAY);
    }

    function cancelClose() {
      clearTimeout(closeTimer);
    }

    items.forEach(function (item) {
      var trigger = getTrigger(item);
      var panel = getPanel(item);
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        if (openItem === item) close();
        else open(item);
      });

      item.addEventListener('mouseenter', function () {
        if (!DESKTOP_MQ.matches) return;
        cancelClose();
        open(item);
      });

      item.addEventListener('mouseleave', function () {
        if (!DESKTOP_MQ.matches) return;
        scheduleClose();
      });

      item.addEventListener('focusout', function (event) {
        if (openItem !== item) return;
        if (!item.contains(event.relatedTarget)) close();
      });
    });

    header.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !openItem) return;
      var trigger = getTrigger(openItem);
      close();
      if (trigger) trigger.focus();
    });

    document.addEventListener('click', function (event) {
      if (openItem && !header.contains(event.target)) close();
    });

    function onMQChange() {
      if (!DESKTOP_MQ.matches) close();
    }

    if (typeof DESKTOP_MQ.addEventListener === 'function') DESKTOP_MQ.addEventListener('change', onMQChange);
    else if (typeof DESKTOP_MQ.addListener === 'function') DESKTOP_MQ.addListener(onMQChange);
  }

  function initMobileDrawer(header) {
    var drawer = header.querySelector('[data-qh2-drawer]');
    var overlay = header.querySelector('[data-qh2-drawer-overlay]');
    var openers = header.querySelectorAll('[data-header-two-mobile-open]');
    if (!drawer || !openers.length) return;

    var lastFocused = null;
    var isOpen = false;
    var closeTimer = null;

    function setOpenerState(expanded) {
      openers.forEach(function (btn) {
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    function lockScroll() {
      document.documentElement.classList.add('qh2-mobile-open');
      document.body.classList.add('qh2-mobile-open');
    }

    function unlockScroll() {
      document.documentElement.classList.remove('qh2-mobile-open');
      document.body.classList.remove('qh2-mobile-open');
    }

    function openDrawer(event) {
      if (event) event.preventDefault();
      if (isOpen) return;
      isOpen = true;
      lastFocused = document.activeElement;

      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      drawer.classList.remove('is-closing');
      if (overlay) overlay.classList.remove('is-closing');

      if (overlay) {
        overlay.hidden = false;
        overlay.setAttribute('aria-hidden', 'false');
      }

      drawer.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');
      lockScroll();
      setOpenerState(true);

      requestAnimationFrame(function () {
        if (overlay) overlay.classList.add('is-open');
        drawer.classList.add('is-open');

        var closeBtn = drawer.querySelector('[data-header-two-mobile-close]');
        var focusables = getFocusable(drawer);
        if (closeBtn) closeBtn.focus();
        else if (focusables.length) focusables[0].focus();
      });
    }

    function closeDrawer(event) {
      if (event) event.preventDefault();
      if (!isOpen) return;
      isOpen = false;

      drawer.classList.remove('is-open');
      drawer.classList.add('is-closing');
      drawer.setAttribute('aria-hidden', 'true');

      if (overlay) {
        overlay.classList.remove('is-open');
        overlay.classList.add('is-closing');
        overlay.setAttribute('aria-hidden', 'true');
      }

      unlockScroll();
      setOpenerState(false);

      closeTimer = setTimeout(function () {
        drawer.hidden = true;
        drawer.classList.remove('is-closing');
        if (overlay) {
          overlay.hidden = true;
          overlay.classList.remove('is-closing');
        }
        closeTimer = null;

        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      }, DRAWER_TRANSITION_MS);
    }

    openers.forEach(function (btn) {
      btn.addEventListener('click', openDrawer);
    });

    header.querySelectorAll('[data-header-two-mobile-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });

    drawer.querySelectorAll('[data-cart-drawer-open], [data-search-popup-open]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        if (isOpen) closeDrawer();
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) closeDrawer(event);
    });

    drawer.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || !isOpen) return;
      var focusables = getFocusable(drawer);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    drawer.querySelectorAll('[data-qh2-sub-toggle]').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var targetId = toggle.getAttribute('aria-controls');
        var target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        target.hidden = expanded;
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 989 && isOpen) closeDrawer();
    });
  }

  function initAccountDisclosure(header) {
    var account = header.querySelector('[data-qtm-hm-account]');
    if (!account) return;

    document.addEventListener('click', function (event) {
      if (account.open && !account.contains(event.target)) account.open = false;
    });

    account.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && account.open) {
        account.open = false;
        var summary = account.querySelector('summary');
        if (summary) summary.focus();
      }
    });
  }

  function initStickyBehavior(header) {
    if (header.dataset.qh2StickyMode !== 'hide_on_scroll') return;
    var sectionWrap = header.closest('[id^="shopify-section-"]') || header;
    var lastY = window.scrollY;
    var ticking = false;
    var THRESHOLD = 80;

    function onScroll() {
      var currentY = window.scrollY;
      if (currentY > lastY && currentY > THRESHOLD) sectionWrap.classList.add('qh2-section-hidden');
      else if (currentY < lastY) sectionWrap.classList.remove('qh2-section-hidden');
      lastY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
  }

  function initAnnouncement(header) {
    var sectionWrap = header.closest('[id^="shopify-section-"]') || document;
    var announce = sectionWrap.querySelector('[data-qh2-announce]');
    if (!announce) return;
    var storageKey = 'qh2-announce-dismissed-' + announce.id;

    try {
      if (window.sessionStorage && sessionStorage.getItem(storageKey) === '1') announce.classList.add('is-dismissed');
    } catch (e) {}

    var closeBtn = announce.querySelector('[data-qh2-announce-close]');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', function () {
      announce.classList.add('is-dismissed');
      try {
        if (window.sessionStorage) sessionStorage.setItem(storageKey, '1');
      } catch (e) {}
    });
  }

  function boot() {
    document.querySelectorAll('[data-qh2-header]').forEach(initHeaderTwo);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  document.addEventListener('shopify:section:load', function (event) {
    var header = event.target.querySelector('[data-qh2-header]');
    if (header) {
      header.dataset.qh2Initialized = 'false';
      initHeaderTwo(header);
    }
  });
})();
