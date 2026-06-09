/* ==========================================================================
   Quadratum — Header Two Builder
   Handles block-built mega menus, mobile drawer, mobile submenus,
   account disclosure, sticky hide-on-scroll, and announcement dismiss.
   ========================================================================== */

(function () {
  'use strict';

  var DESKTOP_MQ = window.matchMedia('(min-width: 990px) and (hover: hover) and (pointer: fine)');
  var CLOSE_DELAY = 150;

  function isVisible(element) {
    if (!element) return false;
    if (element.hidden) return false;
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function getFocusable(container) {
    if (!container) return [];

    return Array.prototype.slice.call(
      container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return !el.hasAttribute('disabled') && isVisible(el);
    });
  }

  function initHeader(header) {
    if (!header || header.dataset.qh2bInitialized === 'true') return;
    header.dataset.qh2bInitialized = 'true';

    initMegaMenus(header);
    initMobileDrawer(header);
    initAccount(header);
    initSticky(header);
    initAnnouncement(header);
  }

  function initMegaMenus(header) {
    var items = Array.prototype.slice.call(header.querySelectorAll('[data-qh2b-mega-item]'));
    if (!items.length) return;

    var openItem = null;
    var closeTimer = null;

    function getTrigger(item) {
      return item.querySelector('[data-qh2b-mega-trigger]');
    }

    function getPanel(item) {
      return item.querySelector('[data-qh2b-mega-panel]');
    }

    function open(item) {
      if (!item) return;
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
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(close, CLOSE_DELAY);
    }

    function cancelClose() {
      window.clearTimeout(closeTimer);
    }

    items.forEach(function (item) {
      var trigger = getTrigger(item);
      var panel = getPanel(item);
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (openItem === item) {
          close();
        } else {
          open(item);
        }
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

      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          open(item);
          var focusable = getFocusable(panel);
          if (focusable.length) focusable[0].focus();
        }
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

    if (typeof DESKTOP_MQ.addEventListener === 'function') {
      DESKTOP_MQ.addEventListener('change', onMQChange);
    } else if (typeof DESKTOP_MQ.addListener === 'function') {
      DESKTOP_MQ.addListener(onMQChange);
    }
  }

  function initMobileDrawer(header) {
    var drawer = header.querySelector('[data-qh2b-mobile-drawer]');
    var overlay = header.querySelector('.qh2b__mobile-overlay');
    var openButtons = Array.prototype.slice.call(header.querySelectorAll('[data-qh2b-mobile-open]'));
    var closeButtons = Array.prototype.slice.call(header.querySelectorAll('[data-qh2b-mobile-close]'));

    if (!drawer || !openButtons.length) return;

    var isOpen = false;
    var lastFocused = null;
    var closeTimer = null;

    function setOpenButtons(expanded) {
      openButtons.forEach(function (button) {
        button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    function openDrawer(event) {
      if (event) event.preventDefault();
      if (isOpen) return;

      isOpen = true;
      lastFocused = document.activeElement;

      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      drawer.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');

      if (overlay) overlay.hidden = false;

      document.documentElement.classList.add('qh2b-mobile-open');
      document.body.classList.add('qh2b-mobile-open');
      setOpenButtons(true);

      window.requestAnimationFrame(function () {
        drawer.classList.add('is-open');
        if (overlay) overlay.classList.add('is-open');

        var focusable = getFocusable(drawer);
        if (focusable.length) focusable[0].focus();
      });
    }

    function closeDrawer(event) {
      if (event) event.preventDefault();
      if (!isOpen) return;

      isOpen = false;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (overlay) overlay.classList.remove('is-open');

      document.documentElement.classList.remove('qh2b-mobile-open');
      document.body.classList.remove('qh2b-mobile-open');
      setOpenButtons(false);

      closeTimer = window.setTimeout(function () {
        drawer.hidden = true;
        if (overlay) overlay.hidden = true;
        closeTimer = null;

        if (lastFocused && typeof lastFocused.focus === 'function') {
          lastFocused.focus();
        }
      }, 280);
    }

    openButtons.forEach(function (button) {
      button.addEventListener('click', openDrawer);
    });

    closeButtons.forEach(function (button) {
      button.addEventListener('click', closeDrawer);
    });

    drawer.querySelectorAll('[data-qh2b-mobile-subtoggle]').forEach(function (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();

        var targetId = toggle.getAttribute('aria-controls');
        var target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        target.hidden = expanded;
      });
    });

    drawer.querySelectorAll('[data-qh2b-mobile-system-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        closeDrawer(event);
      }
    });

    drawer.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || !isOpen) return;

      var focusable = getFocusable(drawer);
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
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 989 && isOpen) closeDrawer();
    });
  }

  function initAccount(header) {
    var account = header.querySelector('[data-qh2b-account]');
    if (!account) return;

    document.addEventListener('click', function (event) {
      if (account.open && !account.contains(event.target)) {
        account.open = false;
      }
    });

    account.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && account.open) {
        account.open = false;
        var summary = account.querySelector('summary');
        if (summary) summary.focus();
      }
    });
  }

  function initSticky(header) {
    if (header.dataset.qh2bStickyMode !== 'hide_on_scroll') return;

    var sectionWrap = header.closest('[id^="shopify-section-"]') || header;
    var lastY = window.scrollY;
    var ticking = false;
    var threshold = 80;

    function update() {
      var currentY = window.scrollY;

      if (currentY > lastY && currentY > threshold) {
        sectionWrap.classList.add('qh2b-section-hidden');
      } else if (currentY < lastY) {
        sectionWrap.classList.remove('qh2b-section-hidden');
      }

      lastY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  function initAnnouncement(header) {
    var sectionWrap = header.closest('[id^="shopify-section-"]') || document;
    var announce = sectionWrap.querySelector('[data-qh2b-announce]');
    if (!announce) return;

    var closeButton = announce.querySelector('[data-qh2b-announce-close]');
    var storageKey = 'qh2b-announce-dismissed-' + announce.id;

    try {
      if (window.sessionStorage && sessionStorage.getItem(storageKey) === '1') {
        announce.classList.add('is-dismissed');
      }
    } catch (error) {}

    if (!closeButton) return;

    closeButton.addEventListener('click', function () {
      announce.classList.add('is-dismissed');
      try {
        if (window.sessionStorage) sessionStorage.setItem(storageKey, '1');
      } catch (error) {}
    });
  }

  function boot() {
    document.querySelectorAll('[data-qh2b-header]').forEach(function (header) {
      initHeader(header);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', function (event) {
    if (!event || !event.target) return;

    var header = event.target.querySelector('[data-qh2b-header]');
    if (header) {
      header.dataset.qh2bInitialized = 'false';
      initHeader(header);
    }
  });
})();
