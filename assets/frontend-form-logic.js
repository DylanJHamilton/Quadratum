/* Quadratum forms. Both legacy asset names intentionally ship this same guarded
   controller; the regression enforces parity while saved hosts use either name. */
(() => {
  'use strict';
  if (window.QuadratumForms) { window.QuadratumForms.init(document); return; }
  const hosts = '[data-q-form-host]', instances = new Map();
  const controls = form => Array.from(form.elements).filter(el => /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName));
  const named = (form, name) => controls(form).filter(el => el.name === name);
  function initForm(form, host, dynamic) {
    if (instances.has(form)) return;
    const listeners = new AbortController(), signal = listeners.signal;
    const on = (el, type, callback, options = {}) => el.addEventListener(type, callback, { ...options, signal });
    const originalNoValidate = form.noValidate;
    const originalDisabled = new Map(controls(form).map(el => [el, el.disabled]));
    const conditional = Array.from(form.querySelectorAll('[data-cond="1"]'));
    const originalConditions = new Map(conditional.map(el => [el, { hidden: el.hidden, classHidden: el.classList.contains('is-hidden') }]));
    const nativeType = named(form, 'form_type')[0]?.value;
    const native = form.dataset.qDestination !== 'custom_endpoint' && (nativeType === 'contact' || nativeType === 'customer');
    const steps = host.dataset.template === 'steps' && !window.Shopify?.designMode
      ? Array.from(form.querySelectorAll('[data-q-step], .q-step')).filter(el => el.childElementCount > 0) : [];
    const stepStates = new Map(steps.map(el => [el, { hidden: el.hidden, inert: el.inert, active: el.classList.contains('is-active') }]));
    const submitWrap = form.querySelector('[data-q-submit]') || form.querySelector('button[type=submit]')?.parentElement;
    const submitHidden = submitWrap?.hidden;
    const legacyNav = host.querySelector('[data-q-steps]'), legacyHidden = legacyNav?.hidden;
    const owned = [], previousTags = new Set();
    let closed = false, index = 0, nav, back, next, count, operation = null, armed = false, widget = null, mount = null;
    let live = form.querySelector('.q-live');
    if (!live) { live = document.createElement('div'); live.className = 'q-live'; form.appendChild(live); owned.push(live); }
    if (!live.hasAttribute('role')) live.setAttribute('role', 'status');
    if (!live.hasAttribute('aria-live')) live.setAttribute('aria-live', live.getAttribute('role') === 'alert' ? 'assertive' : 'polite'); live.tabIndex = -1;
    form.noValidate = true; form.dataset.qValidateInit = '1';
    const current = op => !closed && form.isConnected && operation === op;
    const showMessage = (message, error = false) => { live.textContent = message; live.setAttribute('role', error ? 'alert' : 'status'); live.setAttribute('aria-live', error ? 'assertive' : 'polite'); };
    const errorNode = input => input.closest('[data-q-field]')?.querySelector('.q-error');
    function clearError(input) { input.removeAttribute('aria-invalid'); const node = errorNode(input); if (node) node.textContent = ''; }
    function paint(focus = false) {
      if (steps.length < 2) return;
      steps.forEach((step, i) => { step.hidden = i !== index; step.inert = i !== index; step.classList.toggle('is-active', i === index); });
      if (submitWrap) submitWrap.hidden = index !== steps.length - 1;
      back.hidden = index === 0; next.hidden = index === steps.length - 1;
      count.textContent = 'Step ' + (index + 1) + ' of ' + steps.length;
      if (focus) {
        const target = steps[index].querySelector('h2, h3, legend') || steps[index].querySelector('input:not([type=hidden]):not(:disabled), select:not(:disabled), textarea:not(:disabled)') || steps[index];
        if (target) { if (!/^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) target.tabIndex = -1; target.focus(); }
      }
    }
    function validate(scope = form) {
      const invalid = [];
      for (const input of controls(form)) {
        if (!scope.contains(input) || !input.willValidate) continue;
        clearError(input);
        if (!input.validity.valid) {
          input.setAttribute('aria-invalid', 'true'); const node = errorNode(input);
          if (node) node.textContent = input.validationMessage || 'Please check this field.';
          invalid.push(input);
        }
      }
      if (!invalid.length) return true;
      const step = steps.findIndex(el => el.contains(invalid[0]));
      if (step >= 0) { index = step; paint(); }
      showMessage(host.dataset.msgError || 'Please fix the highlighted fields and try again.', true);
      invalid[0].focus(); return false;
    }
    function evaluateConditions() {
      // Bounded passes allow a dependent field to follow another condition without
      // retaining disabled values. Exact name comparison avoids selector injection.
      for (let pass = 0; pass <= conditional.length; pass++) {
        let changed = false;
        for (const wrap of conditional) {
          let inputs = named(form, wrap.dataset.condField || '');
          if (!inputs.length) inputs = controls(form).filter(el => el.closest('[data-source-name]')?.dataset.sourceName === wrap.dataset.condField);
          const active = inputs.filter(el => !el.disabled);
          const values = active.filter(el => !['radio', 'checkbox'].includes(el.type) || el.checked).map(el => el.value.toLowerCase());
          const expected = (wrap.dataset.condValue || '').toLowerCase();
          const op = wrap.dataset.condOperator;
          let show = !inputs.length || !wrap.dataset.condField;
          if (inputs.length) show = op === 'checked' ? active.some(el => el.checked === true)
            : op === 'contains' ? values.some(value => value.includes(expected))
            : values.some(value => value === expected);
          // A native submission always requires its primary email, even when an
          // older saved field configured a contradictory condition.
          if (native && wrap.querySelector('input[type=email][name="contact[email]"]')) show = true;
          changed ||= wrap.hidden === show; wrap.hidden = !show; wrap.classList.toggle('is-hidden', !show);
          for (const input of controls(form).filter(el => wrap.contains(el))) {
            input.disabled = !show || originalDisabled.get(input) === true;
            if (!show) clearError(input);
          }
        }
        if (!changed) break;
      }
    }
    function setHidden(name, value, create = false) {
      let input = named(form, name).find(el => el.type === 'hidden');
      if (!input && create) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.appendChild(input); owned.push(input); }
      if (input && value !== '' && value != null) input.value = value;
      return input;
    }
    function capture() {
      const query = new URLSearchParams(location.search), values = {};
      for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) values[name] = query.get(name) || '';
      Object.assign(values, { referrer: document.referrer, page_url: location.href, timestamp: new Date().toISOString() });
      for (const [name, value] of Object.entries(values)) {
        setHidden(name, value, !native && host.dataset.qAttribCreate === '1'); setHidden('contact[' + name + ']', value);
      }
      const tags = named(form, 'contact[tags]')[0];
      if (!native || !tags || host.dataset.qPackTags === '0') return;
      const list = tags.value.split(',').map(x => x.trim()).filter(x => x && !previousTags.has(x)); previousTags.clear();
      const add = (name, value) => {
        if (!value) return;
        const tag = name + '=' + String(value).replace(/,/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
        if (!list.includes(tag)) { list.push(tag); previousTags.add(tag); }
      };
      for (const name of ['utm_source', 'utm_medium', 'utm_campaign']) add(name, values[name] || named(form, 'contact[' + name + ']')[0]?.value);
      if (document.referrer) { try { add('ref', new URL(document.referrer).hostname); } catch (_) {} }
      add('page', location.pathname); tags.value = list.join(', ');
    }
    function stopOperation() { operation = null; }
    function clearTokens() {}
    if (steps.length > 1) {
      if (legacyNav) legacyNav.hidden = true;
      nav = document.createElement('div'); nav.className = 'q-steps-actions'; nav.dataset.qStepControls = '1';
      back = document.createElement('button'); back.type = 'button'; back.className = 'q-btn q-btn--ghost'; back.textContent = 'Back';
      next = document.createElement('button'); next.type = 'button'; next.className = 'q-btn q-btn--solid'; next.textContent = 'Next';
      count = document.createElement('span'); count.className = 'q-steps-count'; count.setAttribute('role', 'status');
      nav.append(back, count, next); form.appendChild(nav); owned.push(nav);
      on(back, 'click', () => { index = Math.max(0, index - 1); paint(true); });
      on(next, 'click', () => { if (validate(steps[index])) { index++; paint(true); } });
      paint();
    }
    on(form, 'input', event => { if (operation) { stopOperation(); clearTokens(); showMessage(''); } if (event.target.matches('input, select, textarea')) clearError(event.target); evaluateConditions(); });
    on(form, 'change', () => { if (operation) { stopOperation(); clearTokens(); showMessage(''); } evaluateConditions(); });
    on(form, 'reset', () => { stopOperation(); queueMicrotask(() => { if (closed) return; clearTokens(); controls(form).forEach(clearError); evaluateConditions(); index = 0; paint(); showMessage(''); }); });
    on(form, 'submit', event => {
      if (closed) { event.preventDefault(); return; }
      evaluateConditions();
      if (operation) { event.preventDefault(); return; }
      if (steps.length > 1 && index < steps.length - 1 && !armed) { event.preventDefault(); if (validate(steps[index])) { index++; paint(true); } return; }
      if (!validate()) { event.preventDefault(); return; }
      const trap = named(form, native ? 'contact[hp_field]' : 'hp_field')[0];
      if (trap?.value) { event.preventDefault(); showMessage('This form could not be submitted.', true); return; }
      capture();
      // Shopify owns the native form submission and captcha lifecycle.
    });
    on(window, 'pageshow', () => { stopOperation(); clearTokens(); });
    evaluateConditions(); capture();
    // Dynamic Shopify forms use only the documented native captcha integration.
    if (native && dynamic && typeof window.Shopify?.captcha?.protect === 'function') {
      try { window.Shopify.captcha.protect(form, () => {}); } catch (_) { /* Native form wiring remains owned by Shopify. */ }
    }
    instances.set(form, {
      dispose() {
        closed = true; stopOperation(); clearTokens(); listeners.abort(); form.noValidate = originalNoValidate; delete form.dataset.qValidateInit;
        for (const [wrap, state] of originalConditions) { wrap.hidden = state.hidden; wrap.classList.toggle('is-hidden', state.classHidden); }
        for (const [input, disabled] of originalDisabled) input.disabled = disabled;
        for (const [step, state] of stepStates) { step.hidden = state.hidden; step.inert = state.inert; step.classList.toggle('is-active', state.active); }
        if (submitWrap) submitWrap.hidden = submitHidden; if (legacyNav) legacyNav.hidden = legacyHidden;
        owned.forEach(el => el.remove()); instances.delete(form);
      }
    });
  }
  function init(scope = document, dynamic = false) {
    const found = [...(scope.matches?.(hosts) ? [scope] : []), ...scope.querySelectorAll(hosts)];
    for (const host of found) for (const form of host.querySelectorAll('form.q-form')) if (form.closest(hosts) === host) initForm(form, host, dynamic);
  }
  function dispose(scope) { for (const [form, state] of instances) if (scope === form || scope.contains(form)) state.dispose(); }
  window.QuadratumForms = { init, dispose };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true }); else init();
  document.addEventListener('shopify:section:load', event => init(event.target, true));
  document.addEventListener('shopify:section:unload', event => dispose(event.target));
})();
