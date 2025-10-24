/* Quadratum — Quote Form Validator (v2) */
(function () {
  function init(root) {
    if (!root || root.dataset.qValidateInit === '1') return;

    // Support old + new root classes
    // (sections may use .q-cta-quote-form OR .q-form.q-form--quote-*)
    const form = root.querySelector('.q-form');
    if (!form) return;
    root.dataset.qValidateInit = '1';

    function errEl(input) {
      const id = input.id || '';
      if (id) {
        // exact match first
        let el = root.querySelector('#' + id + '-err');
        if (el) return el;
        // radio group fallback: strip trailing -<n> from id (e.g., qf-123-1 -> qf-123-err)
        const base = id.replace(/-\d+$/, '');
        el = root.querySelector('#' + base + '-err');
        if (el) return el;
      }
      // last resort: the wrapper's .q-error
      const wrap = input.closest('[data-q-field]');
      return wrap ? wrap.querySelector('.q-error') : null;
    }

    function setError(input, msg) {
      input.setAttribute('aria-invalid', 'true');
      const e = errEl(input);
      if (e) e.textContent = msg || '';
    }
    function clearError(input) {
      input.removeAttribute('aria-invalid');
      const e = errEl(input);
      if (e) e.textContent = '';
    }

    function isRequired(wrap, input) {
      return (wrap.getAttribute('data-required') === 'true') || input.hasAttribute('required');
    }

    function ensureCaptchaFields() {
      let t = form.querySelector('input[name="cf-turnstile-response"]');
      if (!t) { t = document.createElement('input'); t.type = 'hidden'; t.name = 'cf-turnstile-response'; form.appendChild(t); }
      let r = form.querySelector('input[name="g-recaptcha-response"]');
      if (!r) { r = document.createElement('input'); r.type = 'hidden'; r.name = 'g-recaptcha-response'; form.appendChild(r); }
    }

    function validateScope(scope) {
      let ok = true;
      const wraps = Array.from(form.querySelectorAll('[data-q-field]'));
      const validatedRadioNames = new Set();

      for (const w of wraps) {
        if (scope && !scope.contains(w)) continue;
        if (w.classList.contains('is-hidden')) continue;

        const input = w.querySelector('input, textarea, select');
        if (!input) continue;

        clearError(input);

        const required = isRequired(w, input);
        let invalid = false;

        if (input.type === 'radio') {
          const name = input.name || '';
          if (validatedRadioNames.has(name)) continue;
          validatedRadioNames.add(name);

          const group = form.querySelectorAll('input[type="radio"][name="' + name + '"]');
          const anyChecked = Array.from(group).some(r => r.checked);
          invalid = required && !anyChecked;

          if (invalid) {
            const first = group[0];
            if (first) {
              if (!errEl(first)?.textContent) setError(first, 'This field is required.');
              if (ok) first.focus({ preventScroll: false });
            }
            ok = false;
          }
          continue;
        }

        if (input.type === 'checkbox') {
          invalid = required && !input.checked;
        } else if (input.tagName === 'SELECT') {
          invalid = required && (input.value === '' || input.value == null);
        } else {
          const val = (input.value || '').trim();
          invalid = required && val === '';

          if (!invalid && input.type === 'email' && val) {
            invalid = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
            if (invalid) setError(input, 'Enter a valid email');
          }
          if (!invalid && input.type === 'tel' && val) {
            invalid = !/^[0-9+()\-.\s]{7,}$/.test(val);
            if (invalid) setError(input, 'Enter a valid phone');
          }
          if (!invalid && input.type === 'url' && val) {
            try { new URL(val); } catch (e) { invalid = true; setError(input, 'Enter a valid URL'); }
          }
        }

        if (invalid) {
          if (!errEl(input)?.textContent) setError(input, 'This field is required.');
          if (ok) input.focus({ preventScroll: false });
          ok = false;
        }
      }
      return ok;
    }

    // Conditional logic
    function evalConds() {
      Array.from(form.querySelectorAll('[data-cond="1"]')).forEach(w => {
        const field = w.getAttribute('data-cond-field') || '';
        const op = w.getAttribute('data-cond-operator') || 'equals';
        const val = (w.getAttribute('data-cond-value') || '').toLowerCase();
        if (!field) { w.classList.remove('is-hidden'); return; }
        const ctrls = form.querySelectorAll('[name="' + field + '"]');
        if (!ctrls.length) { w.classList.remove('is-hidden'); return; }
        let current = '';
        ctrls.forEach(el => {
          if ((el.type === 'radio' || el.type === 'checkbox') && el.checked) current = (el.value || '').toLowerCase();
          else if (el.tagName === 'SELECT') current = (el.value || '').toLowerCase();
          else if (el.type !== 'radio' && el.type !== 'checkbox') current = (el.value || '').toLowerCase();
        });
        let show = true;
        if (op === 'equals') show = current === val;
        else if (op === 'contains') show = current.indexOf(val) >= 0;
        else if (op === 'checked') show = current === 'on' || current === 'yes' || current === 'true';
        w.classList.toggle('is-hidden', !show);
      });
    }
    form.addEventListener('input', evalConds, { passive: true });
    form.addEventListener('change', evalConds, { passive: true });
    form.addEventListener('click', function(e){
      const t = e.target;
      if (t && (t.type === 'radio' || t.type === 'checkbox')) evalConds();
    }, { passive: true });
    evalConds();

    // Steps
    const isSteps = root.getAttribute('data-template') === 'steps';
    const steps = isSteps ? Array.from(root.querySelectorAll('.q-step')) : [];
    let idx = 0;
    function paintSteps() {
      if (!isSteps) return;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === idx));
      const fill = root.querySelector('.q-steps-fill');
      const count = root.querySelector('.q-steps-count');
      if (fill) fill.style.width = ((idx + 1) / Math.max(steps.length, 1) * 100).toFixed(1) + '%';
      if (count) count.textContent = (idx + 1) + ' / ' + steps.length;

      const submitWrap = form.querySelector('button[type="submit"]')?.closest('div');
      let bar = root.querySelector('.q-steps-actions');
      if (!bar) { bar = document.createElement('div'); bar.className = 'q-steps-actions'; form.parentNode.insertBefore(bar, root.querySelector('[data-q-steps]')); }
      bar.innerHTML = '';

      if (idx > 0) {
        const back = document.createElement('button');
        back.type = 'button'; back.className = 'q-btn q-btn--ghost'; back.textContent = 'Back';
        back.addEventListener('click', () => { idx = Math.max(0, idx - 1); paintSteps(); });
        bar.appendChild(back);
      }
      if (idx < steps.length - 1) {
        const next = document.createElement('button');
        next.type = 'button'; next.className = 'q-btn ' + (root.getAttribute('data-btn-variant') || 'q-btn--solid');
        next.textContent = 'Next';
        next.addEventListener('click', () => { if (validateScope(steps[idx])) { idx = Math.min(steps.length - 1, idx + 1); paintSteps(); } });
        bar.appendChild(next);
        if (submitWrap) submitWrap.style.display = 'none';
      } else {
        if (submitWrap) submitWrap.style.display = '';
      }
    }
    paintSteps();

    // Submit (and optional captcha)
    let submitting = false;
    form.addEventListener('submit', function (e) {
      const scope = isSteps ? steps[idx] : null;
      if (!validateScope(scope)) {
        const live = root.querySelector('.q-live');
        if (live) live.innerHTML = '<span class="bad">' + (root.getAttribute('data-msg-error') || 'Please fix the highlighted fields and try again.') + '</span>';
        e.preventDefault();
        return;
      }

      if (submitting) { e.preventDefault(); return; }
      submitting = true;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }

      const mode = root.getAttribute('data-captcha') || 'none';
      const siteKey = root.getAttribute('data-captcha-key') || '';

      if (mode === 'turnstile' && siteKey && typeof turnstile !== 'undefined') {
        e.preventDefault();
        ensureCaptchaFields();
        turnstile.render(document.createElement('div'), {
          sitekey: siteKey,
          size: 'invisible',
          callback: function (token) {
            const hidden = form.querySelector('[name="cf-turnstile-response"]'); if (hidden) hidden.value = token;
            form.submit();
          }
        });
      } else if (mode === 'recaptcha_v3' && siteKey && typeof grecaptcha !== 'undefined') {
        e.preventDefault();
        ensureCaptchaFields();
        grecaptcha.ready(function () {
          grecaptcha.execute(siteKey, { action: 'submit' }).then(function (token) {
            const hidden = form.querySelector('[name="g-recaptcha-response"]'); if (hidden) hidden.value = token;
            form.submit();
          });
        });
      }
      setTimeout(function(){ submitting = false; if (btn){ btn.disabled = false; btn.removeAttribute('aria-busy'); } }, 5000);
    }, false);
  }

  function boot() {
    // Boot on both the legacy and new classes
    document.querySelectorAll('.q-cta-quote-form, .q-form.q-form--quote-full, .q-form[data-template]')
      .forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  document.addEventListener('shopify:section:load', e => {
    const r = e.target.closest('.q-cta-quote-form, .q-form.q-form--quote-full');
    if (r) init(r);
  });
  document.addEventListener('shopify:section:select', e => {
    const r = e.target.closest('.q-cta-quote-form, .q-form.q-form--quote-full');
    if (r) init(r);
  });
})();
