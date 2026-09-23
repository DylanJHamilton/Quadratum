/* Enhance native address forms; Shopify owns persistence and validation. */
(() => {
  'use strict';
  if (window.__qAccountAddresses) return;
  window.__qAccountAddresses = true;

  const instances = new Map();
  const selector = '[data-qtm-account-addresses]';

  function enhanceCountry(country, listen, signal) {
    const form = country.closest('form');
    const input = form?.querySelector('[data-qtm-address-province]');
    if (!input) return () => {};
    const options = [...country.options];
    const initial = options.find(option => option.dataset.provinces &&
      [option.value, option.textContent].includes(country.value || country.dataset.default));
    // Keep the saved-country fallback for no-JS; prefer Shopify's metadata option.
    if (initial) {
      options.forEach(option => { option.defaultSelected = option === initial; });
      initial.selected = true;
    }

    const container = input.closest('[data-qtm-address-province-container]');
    const select = document.createElement('select');
    const inputId = input.id;
    const fieldName = input.name;
    select.autocomplete = 'address-level1';
    select.hidden = true;
    select.disabled = true;
    for (const name of ['aria-describedby', 'aria-invalid', 'aria-label', 'aria-labelledby', 'required']) {
      if (input.hasAttribute(name)) select.setAttribute(name, input.getAttribute(name));
    }
    input.after(select);

    function paint(preserve = false) {
      let provinces = null;
      try {
        const selected = country.options[country.selectedIndex];
        const metadata = selected?.dataset.provinces ? selected :
          [...country.options].find(option => option.dataset.provinces && option.value === selected?.value);
        provinces = JSON.parse(metadata?.dataset.provinces || 'null');
      } catch (_) {
        // Unrecognized country metadata retains the native text field.
      }
      if (!preserve) input.value = '';
      select.replaceChildren();
      select.hidden = true;
      select.disabled = true;
      select.removeAttribute('name');
      select.removeAttribute('id');
      input.id = inputId;
      input.hidden = false;
      input.disabled = false;
      input.name = fieldName;
      if (container) container.hidden = false;

      if (!Array.isArray(provinces) || !provinces.every(pair => Array.isArray(pair) &&
        pair.length >= 2 && pair.every(value => typeof value === 'string'))) return;

      input.removeAttribute('id');
      input.hidden = true;
      input.disabled = true;
      select.id = inputId;
      if (!provinces.length) {
        if (container) container.hidden = true;
        return;
      }

      select.append(new Option('Select province/state', ''));
      for (const [value, label] of provinces) select.append(new Option(label, value));
      select.hidden = false;
      select.disabled = false;
      select.name = fieldName;
      if (preserve && input.value) {
        const saved = [...select.options].find(option => option.value === input.value || option.textContent === input.value);
        if (saved) select.value = saved.value;
        else {
          // Preserve a rejected or historical value so server feedback is not silently erased.
          select.append(new Option(input.value, input.value));
          select.value = input.value;
        }
      }
    }

    paint(true);
    listen(country, 'change', () => paint(false));
    listen(select, 'change', () => { input.value = select.value; });
    listen(form, 'reset', () => queueMicrotask(() => { if (!signal.aborted) paint(true); }));

    return () => {
      if (container) container.hidden = false;
      if (!select.disabled) input.value = select.value;
      select.remove();
      input.id = inputId;
      input.hidden = false;
      input.disabled = false;
      input.name = fieldName;
    };
  }

  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController();
    const listen = (element, type, handler) => element.addEventListener(type, handler, { signal: abort.signal });
    const cleanups = [];
    const focusPanel = panel => panel.querySelector('[role="alert"], input:not([type="hidden"]):not([hidden]), select:not([hidden]), textarea')?.focus();
    const add = root.querySelector('[data-qtm-addresses-add-panel]');
    const addButtons = [...root.querySelectorAll('[data-qtm-addresses-add-toggle]')];
    let lastAddButton = null;

    function showAdd(open, moveFocus = false) {
      if (!add) return;
      add.hidden = !open;
      addButtons.forEach(button => button.setAttribute('aria-expanded', String(open)));
      if (moveFocus) {
        if (open) focusPanel(add);
        else (lastAddButton || addButtons[0])?.focus();
      }
    }

    showAdd(Boolean(add?.querySelector('[role="alert"]')));
    for (const button of addButtons) {
      button.hidden = false;
      listen(button, 'click', () => { lastAddButton = button; showAdd(add.hidden, true); });
    }
    root.querySelectorAll('[data-qtm-addresses-add-close]').forEach(button => {
      button.hidden = false;
      listen(button, 'click', () => showAdd(false, true));
    });
    if (add) listen(add, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); showAdd(false, true); }
    });

    root.querySelectorAll('[data-qtm-addresses-edit-toggle]').forEach(button => {
      const panel = [...root.querySelectorAll('[data-qtm-addresses-edit-panel]')]
        .find(candidate => candidate.id === button.getAttribute('aria-controls'));
      if (!panel) return;
      function showEdit(open, moveFocus = false) {
        panel.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
        if (moveFocus) {
          if (open) focusPanel(panel);
          else button.focus();
        }
      }
      button.hidden = false;
      showEdit(Boolean(panel.querySelector('[role="alert"]')));
      listen(button, 'click', () => showEdit(panel.hidden, true));
      panel.querySelectorAll('[data-qtm-addresses-edit-close]').forEach(close => {
        close.hidden = false;
        listen(close, 'click', () => showEdit(false, true));
      });
      listen(panel, 'keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); showEdit(false, true); }
      });
    });

    root.querySelectorAll('[data-qtm-address-delete-form]').forEach(form => {
      listen(form, 'submit', event => {
        if (!window.confirm(root.dataset.deleteConfirmMessage || 'Delete this address?')) event.preventDefault();
      });
    });
    root.querySelectorAll('[data-qtm-address-country]').forEach(country => {
      cleanups.push(enhanceCountry(country, listen, abort.signal));
    });
    if (document.activeElement === document.body) root.querySelector('[role="alert"]')?.focus();

    function dispose() {
      abort.abort();
      cleanups.forEach(cleanup => cleanup());
      root.querySelectorAll('[data-qtm-addresses-add-panel], [data-qtm-addresses-edit-panel]').forEach(panel => { panel.hidden = false; });
      root.querySelectorAll('[data-qtm-addresses-add-toggle], [data-qtm-addresses-edit-toggle]').forEach(button => {
        button.hidden = true;
        button.setAttribute('aria-expanded', 'false');
      });
      root.querySelectorAll('[data-qtm-addresses-add-close], [data-qtm-addresses-edit-close]').forEach(button => { button.hidden = true; });
      instances.delete(root);
    }
    instances.set(root, dispose);
  }

  function scan(scope) {
    if (scope.matches?.(selector)) mount(scope);
    scope.querySelectorAll?.(selector).forEach(mount);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
  } else {
    scan(document);
  }
  document.addEventListener('shopify:section:load', event => scan(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of instances) {
      if (root === event.target || event.target.contains(root)) dispose();
    }
  });
})();
