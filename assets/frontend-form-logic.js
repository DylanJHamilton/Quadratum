/* Quadratum — Frontend Form Logic (Validator + Steps + Captcha + Optional Attribution)
   Shared file: designed to be backward-safe across multiple sections/forms.

   Fixes / adds:
   - Supports init when root IS the form (.q-form) or contains it
   - Better error target resolution (radio groups + wrapper .q-error fallback)
   - Turnstile render mount is attached to DOM (fixes “silent” captcha failures)
   - Boots on more selectors (legacy + new)
   - Optional attribution capture:
       - fills hidden inputs if they exist
       - can CREATE hidden inputs if root has data-q-attrib-create="1"
   - Optional Shopify tag packing:
       - if contact[tags] exists, can append UTM/ref/page/path
       - enabled by default when contact[tags] exists; can disable via data-q-pack-tags="0"
*/

(function () {
  function closestWrap(node) {
    if (!node || !node.closest) return null;
    return node.closest('.q-cta-quote-form, .q-cta-newsletter, [data-q-form-wrap="1"]');
  }

  function init(root) {
    if (!root) return;

    // If root is the form itself, use it. Otherwise find child .q-form
    const form = (root.matches && root.matches('.q-form')) ? root : root.querySelector('.q-form');
    if (!form) return;

    // Prefer a wrapper for config + error lookup when present
    const wrap = closestWrap(form) || closestWrap(root) || root;

    // Prevent double init on the FORM (important: wrapper+form selectors can overlap)
    if (form.dataset.qValidateInit === '1') return;
    form.dataset.qValidateInit = '1';

    // ---------------------------
    // Error handling
    // ---------------------------
    function errEl(input) {
      const id = input.id || '';
      if (id) {
        // exact match first
        let el = wrap.querySelector('#' + id + '-err');
        if (el) return el;

        // radio group fallback: strip trailing -<n> from id (e.g., qf-123-1 -> qf-123-err)
        const base = id.replace(/-\d+$/, '');
        el = wrap.querySelector('#' + base + '-err');
        if (el) return el;
      }
      // last resort: wrapper's .q-error
      const w = input.closest('[data-q-field]');
      return w ? w.querySelector('.q-error') : null;
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

    function isRequired(wrapEl, input) {
      return (wrapEl.getAttribute('data-required') === 'true') || input.hasAttribute('required');
    }

    // ---------------------------
    // Captcha helpers
    // ---------------------------
    function ensureCaptchaFields() {
      let t = form.querySelector('input[name="cf-turnstile-response"]');
      if (!t) { t = document.createElement('input'); t.type = 'hidden'; t.name = 'cf-turnstile-response'; form.appendChild(t); }
      let r = form.querySelector('input[name="g-recaptcha-response"]');
      if (!r) { r = document.createElement('input'); r.type = 'hidden'; r.name = 'g-recaptcha-response'; form.appendChild(r); }
    }

    function ensureTurnstileMount() {
      // Turnstile must render into an element that exists in the DOM
      let mount = wrap.querySelector('[data-q-turnstile-mount]');
      if (mount) return mount;

      mount = document.createElement('div');
      mount.setAttribute('data-q-turnstile-mount', '1');
      mount.style.position = 'absolute';
      mount.style.width = '1px';
      mount.style.height = '1px';
      mount.style.overflow = 'hidden';
      mount.style.left = '-9999px';
      mount.style.top = '0';

      wrap.appendChild(mount);
      return mount;
    }

    // ---------------------------
    // Optional attribution capture
    // ---------------------------
    const qs = new URLSearchParams(window.location.search);
    const ATTRIB_CREATE = (wrap.getAttribute('data-q-attrib-create') === '1');

    function ensureHidden(name) {
      let el = form.querySelector('input[name="' + name + '"]');
      if (!el && ATTRIB_CREATE) {
        el = document.createElement('input');
        el.type = 'hidden';
        el.name = name;
        form.appendChild(el);
      }
      return el;
    }

    function setHiddenIfPresent(name, value) {
      const el = ensureHidden(name);
      if (el) el.value = value || '';
    }

    function captureAttribution() {
      const utm_source = qs.get('utm_source') || '';
      const utm_medium = qs.get('utm_medium') || '';
      const utm_campaign = qs.get('utm_campaign') || '';
      const utm_content = qs.get('utm_content') || '';
      const utm_term = qs.get('utm_term') || '';

      const referrer = document.referrer || '';
      const page_url = window.location.href || '';
      const timestamp = (new Date()).toISOString();

      // Common plain names
      setHiddenIfPresent('utm_source', utm_source);
      setHiddenIfPresent('utm_medium', utm_medium);
      setHiddenIfPresent('utm_campaign', utm_campaign);
      setHiddenIfPresent('utm_content', utm_content);
      setHiddenIfPresent('utm_term', utm_term);
      setHiddenIfPresent('referrer', referrer);
      setHiddenIfPresent('page_url', page_url);
      setHiddenIfPresent('timestamp', timestamp);

      // Shopify/contact-style names
      setHiddenIfPresent('contact[utm_source]', utm_source);
      setHiddenIfPresent('contact[utm_medium]', utm_medium);
      setHiddenIfPresent('contact[utm_campaign]', utm_campaign);
      setHiddenIfPresent('contact[utm_content]', utm_content);
      setHiddenIfPresent('contact[utm_term]', utm_term);
      setHiddenIfPresent('contact[referrer]', referrer);
      setHiddenIfPresent('contact[page_url]', page_url);
      setHiddenIfPresent('contact[timestamp]', timestamp);
    }

    // Optional: pack into Shopify tags (persistable)
    function sanitizeTagValue(val) {
      return String(val || '')
        .replace(/,/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80);
    }

    function parseTags(str) {
      return String(str || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
    }

    function uniqPush(list, tag) {
      const t = String(tag || '').trim();
      if (!t) return;
      if (list.indexOf(t) === -1) list.push(t);
    }

    function packShopifyTags() {
      const disablePack = (wrap.getAttribute('data-q-pack-tags') === '0');
      if (disablePack) return;

      const tagsInput = form.querySelector('input[name="contact[tags]"]');
      if (!tagsInput) return;

      const tags = parseTags(tagsInput.value);

      const utm_source = qs.get('utm_source') || '';
      const utm_medium = qs.get('utm_medium') || '';
      const utm_campaign = qs.get('utm_campaign') || '';
      const referrer = document.referrer || '';

      if (utm_source) uniqPush(tags, 'utm_source=' + sanitizeTagValue(utm_source));
      if (utm_medium) uniqPush(tags, 'utm_medium=' + sanitizeTagValue(utm_medium));
      if (utm_campaign) uniqPush(tags, 'utm_campaign=' + sanitizeTagValue(utm_campaign));

      if (referrer) {
        try {
          const u = new URL(referrer);
          uniqPush(tags, 'ref=' + sanitizeTagValue(u.hostname));
        } catch (_e) {
          uniqPush(tags, 'ref=' + sanitizeTagValue(referrer));
        }
      }

      try {
        const page = new URL(window.location.href);
        uniqPush(tags, 'page=' + sanitizeTagValue(page.pathname));
      } catch (_e2) {}

      tagsInput.value = tags.join(', ');
    }

    // Capture once on init
    captureAttribution();

    // ---------------------------
    // Known breaker guard: missing email on newsletter/customer forms
    // ---------------------------
    (function guardEmail() {
      const hasShopifyCustomerForm =
        !!form.querySelector('input[name="form_type"][value="customer"]') ||
        !!form.querySelector('input[name="contact[tags]"]');

      if (!hasShopifyCustomerForm) return;

      const emailEl = form.querySelector('input[type="email"][name="contact[email]"], input[type="email"][name="email"], input[name="contact[email]"]');
      if (!emailEl) {
        // Don’t hard-block rendering; but warn loudly and show message if user tries submit
        console.warn('[Quadratum Forms] This form looks like a Shopify newsletter/customer form but has no email input. Add an Email field block.');
        wrap.setAttribute('data-q-missing-email', '1');
      }
    })();

    // ---------------------------
    // Validation
    // ---------------------------
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
              if (!(errEl(first) && errEl(first).textContent)) setError(first, 'This field is required.');
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
          if (!(errEl(input) && errEl(input).textContent)) setError(input, 'This field is required.');
          if (ok) input.focus({ preventScroll: false });
          ok = false;
        }
      }

      // Missing email guard (treat as invalid on submit)
      if (wrap.getAttribute('data-q-missing-email') === '1') {
        ok = false;
        const live = wrap.querySelector('.q-live');
        if (live) live.innerHTML = '<span class="bad">This form is missing an Email field. Add an Email block and try again.</span>';
      }

      return ok;
    }

    // ---------------------------
    // Conditional logic
    // ---------------------------
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
    form.addEventListener('click', function (e) {
      const t = e.target;
      if (t && (t.type === 'radio' || t.type === 'checkbox')) evalConds();
    }, { passive: true });
    evalConds();

    // ---------------------------
    // Steps
    // ---------------------------
    const isSteps = (wrap.getAttribute('data-template') === 'steps');
    const steps = isSteps ? Array.from(wrap.querySelectorAll('.q-step')) : [];
    let idx = 0;

    function paintSteps() {
      if (!isSteps) return;

      steps.forEach((s, k) => s.classList.toggle('is-active', k === idx));

      const fill = wrap.querySelector('.q-steps-fill');
      const count = wrap.querySelector('.q-steps-count');

      if (fill) fill.style.width = ((idx + 1) / Math.max(steps.length, 1) * 100).toFixed(1) + '%';
      if (count) count.textContent = (idx + 1) + ' / ' + steps.length;

      const submitWrap = form.querySelector('button[type="submit"]')?.closest('div');
      let bar = wrap.querySelector('.q-steps-actions');

      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'q-steps-actions';
        const anchor = wrap.querySelector('[data-q-steps]') || form;
        anchor.parentNode.insertBefore(bar, anchor);
      }

      bar.innerHTML = '';

      if (idx > 0) {
        const back = document.createElement('button');
        back.type = 'button';
        back.className = 'q-btn q-btn--ghost';
        back.textContent = 'Back';
        back.addEventListener('click', () => { idx = Math.max(0, idx - 1); paintSteps(); });
        bar.appendChild(back);
      }

      if (idx < steps.length - 1) {
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'q-btn ' + (wrap.getAttribute('data-btn-variant') || 'q-btn--solid');
        next.textContent = 'Next';
        next.addEventListener('click', () => {
          if (validateScope(steps[idx])) {
            idx = Math.min(steps.length - 1, idx + 1);
            paintSteps();
          }
        });
        bar.appendChild(next);
        if (submitWrap) submitWrap.style.display = 'none';
      } else {
        if (submitWrap) submitWrap.style.display = '';
      }
    }

    paintSteps();

    // ---------------------------
    // Submit (and optional captcha)
    // ---------------------------
    let submitting = false;

    form.addEventListener('submit', function (e) {
      // refresh attribution right before submit
      captureAttribution();
      packShopifyTags();

      const scope = isSteps ? steps[idx] : null;

      if (!validateScope(scope)) {
        const live = wrap.querySelector('.q-live');
        if (live) live.innerHTML = '<span class="bad">' + (wrap.getAttribute('data-msg-error') || 'Please fix the highlighted fields and try again.') + '</span>';
        e.preventDefault();
        return;
      }

      if (submitting) { e.preventDefault(); return; }
      submitting = true;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }

      const mode = wrap.getAttribute('data-captcha') || 'none';
      const siteKey = wrap.getAttribute('data-captcha-key') || '';

      if (mode === 'turnstile' && siteKey && typeof turnstile !== 'undefined') {
        e.preventDefault();
        ensureCaptchaFields();

        const mount = ensureTurnstileMount();
        mount.innerHTML = '';

        turnstile.render(mount, {
          sitekey: siteKey,
          size: 'invisible',
          callback: function (token) {
            const hidden = form.querySelector('[name="cf-turnstile-response"]');
            if (hidden) hidden.value = token;
            form.submit();
          }
        });
      } else if (mode === 'recaptcha_v3' && siteKey && typeof grecaptcha !== 'undefined') {
        e.preventDefault();
        ensureCaptchaFields();

        grecaptcha.ready(function () {
          grecaptcha.execute(siteKey, { action: 'submit' }).then(function (token) {
            const hidden = form.querySelector('[name="g-recaptcha-response"]');
            if (hidden) hidden.value = token;
            form.submit();
          });
        });
      }

      setTimeout(function () {
        submitting = false;
        if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
      }, 5000);
    }, false);
  }

  function boot() {
    // Shared boot selectors (legacy + newer form roots)
    document
      .querySelectorAll('.q-cta-quote-form, .q-cta-newsletter, .q-form.q-form--quote-full, .q-form[data-template], .q-form')
      .forEach(init);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // Shopify theme editor support
  document.addEventListener('shopify:section:load', e => {
    const r = e.target.closest('.q-cta-quote-form, .q-cta-newsletter, .q-form.q-form--quote-full, .q-form[data-template], .q-form');
    if (r) init(r);
  });

  document.addEventListener('shopify:section:select', e => {
    const r = e.target.closest('.q-cta-quote-form, .q-cta-newsletter, .q-form.q-form--quote-full, .q-form[data-template], .q-form');
    if (r) init(r);
  });
})();
