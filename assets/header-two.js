/* ==========================================================================
   Quadratum — Header Two Builder
   Handles block-built mega menus, mobile drawer, mobile submenus,
   account disclosure, sticky hide-on-scroll, and announcement dismiss.
   ========================================================================== */

(function () {
  'use strict';
  if (window.qtmHeaderTwoBound) return;
  window.qtmHeaderTwoBound = true;
  const lifecycles = new WeakMap();
  function on(header, target, type, listener, options) {
    target.addEventListener(type, listener, Object.assign({}, options, {signal:lifecycles.get(header).signal}));
  }

  var DESKTOP_MQ = window.matchMedia('(min-width: 990px) and (hover: hover) and (pointer: fine)');
  var CLOSE_DELAY = 150;

  function isVisible(element) {
    if (!element) return false;
    if (element.closest('[hidden], [aria-hidden="true"]')) return false;
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
    lifecycles.set(header, new AbortController());
    on(header, document, 'shopify:section:unload', function(event) {
      if (!event.target.contains(header)) return;
      header.dispatchEvent(new Event('qtm:header-destroy'));
      lifecycles.get(header).abort();
      delete header.dataset.qh2bInitialized;
    });

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

    on(header, header, 'qtm:header-destroy', function() { window.clearTimeout(closeTimer); close(); });

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

      on(header, trigger, 'click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (openItem === item) {
          close();
        } else {
          open(item);
        }
      });

      on(header, item, 'mouseenter', function () {
        if (!DESKTOP_MQ.matches) return;
        cancelClose();
        open(item);
      });

      on(header, item, 'mouseleave', function () {
        if (!DESKTOP_MQ.matches) return;
        scheduleClose();
      });

      on(header, item, 'focusout', function (event) {
        if (openItem !== item) return;
        if (!item.contains(event.relatedTarget)) close();
      });

      on(header, trigger, 'keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          open(item);
          var focusable = getFocusable(panel);
          if (focusable.length) focusable[0].focus();
        }
      });
    });

    on(header, header, 'keydown', function (event) {
      if (event.key !== 'Escape' || !openItem) return;
      var trigger = getTrigger(openItem);
      close();
      if (trigger) trigger.focus();
    });

    on(header, document, 'click', function (event) {
      if (openItem && !header.contains(event.target)) close();
    });

    function onMQChange() {
      if (!DESKTOP_MQ.matches) close();
    }

    if (typeof DESKTOP_MQ.addEventListener === 'function') {
      on(header, DESKTOP_MQ, 'change', onMQChange);
    } else if (typeof DESKTOP_MQ.addListener === 'function') {
      DESKTOP_MQ.addListener(onMQChange);
      on(header, header, 'qtm:header-destroy', function() {
        if (typeof DESKTOP_MQ.removeListener === 'function') DESKTOP_MQ.removeListener(onMQChange);
      });
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

    on(header, header, 'qtm:header-destroy', function() { closeDrawer(); window.clearTimeout(closeTimer); drawer.hidden = true; if (overlay) overlay.hidden = true; });
    on(header, document, 'qtm:header-mobile-open', function(event) { if (event.detail !== header) closeDrawer(); });
    on(header, document, 'focusin', function(event) {
      if (isOpen && header.isConnected && !drawer.contains(event.target)) (getFocusable(drawer)[0] || drawer).focus();
    });

    function setOpenButtons(expanded) {
      openButtons.forEach(function (button) {
        button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    function openDrawer(event) {
      if (event) event.preventDefault();
      if (isOpen) return;

      document.dispatchEvent(new CustomEvent('qtm:header-mobile-open', {detail:header}));
      isOpen = true;
      lastFocused = event?.currentTarget || openButtons[0];

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

      drawer.classList.add('is-open');
      (getFocusable(drawer)[0] || drawer).focus();
      window.requestAnimationFrame(function () {
        if (!isOpen || !header.isConnected) return;
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
      if (lastFocused?.isConnected) lastFocused.focus();
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

      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
    }

    openButtons.forEach(function (button) {
      on(header, button, 'click', openDrawer);
    });

    closeButtons.forEach(function (button) {
      on(header, button, 'click', closeDrawer);
    });

    drawer.querySelectorAll('[data-qh2b-mobile-subtoggle]').forEach(function (toggle) {
      on(header, toggle, 'click', function (event) {
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
      on(header, button, 'click', function () {
        closeDrawer();
      });
    });

    on(header, document, 'keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        closeDrawer(event);
      }
    });

    on(header, drawer, 'keydown', function (event) {
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

    on(header, window, 'resize', function () {
      if (window.innerWidth > 989 && isOpen) closeDrawer();
    });
  }

  function initAccount(header) {
    var account = header.querySelector('[data-qh2b-account]');
    if (!account) return;

    on(header, document, 'click', function (event) {
      if (account.open && !account.contains(event.target)) {
        account.open = false;
      }
    });

    on(header, account, 'keydown', function (event) {
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
    var frame = null;
    var threshold = 80;

    on(header, header, 'qtm:header-destroy', function() {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      ticking = false;
      sectionWrap.classList.remove('qh2b-section-hidden');
    });

    function update() {
      frame = null;
      var currentY = window.scrollY;

      if (currentY > lastY && currentY > threshold) {
        sectionWrap.classList.add('qh2b-section-hidden');
      } else if (currentY < lastY) {
        sectionWrap.classList.remove('qh2b-section-hidden');
      }

      lastY = currentY;
      ticking = false;
    }

    on(header, window, 'scroll', function () {
      if (!ticking) {
        ticking = true;
        frame = window.requestAnimationFrame(update);
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

    on(header, closeButton, 'click', function () {
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
      initHeader(header);
    }
  });
})();
