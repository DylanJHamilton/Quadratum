/* Quadratum — Quote/Form Validator + Data Capture (v2.2)
   - Validation + conditional logic + steps
   - Captcha: Turnstile / reCAPTCHA v3 (invisible)
   - Attribution capture: utm_* + referrer + page_url + timestamp
   - Shopify persistence (customer/contact form): packs key metadata into contact[tags]
*/
(function () {
  "use strict";

  function isEl(node) {
    return !!(node && node.nodeType === 1);
  }

  function getContainer(root, form) {
    // Prefer section wrapper (so we can find .q-step / .q-live / etc. even if root is <form>)
    if (root && root.matches && root.matches(".q-cta-quote-form, .q-cta-newsletter")) return root;
    if (form && form.closest) {
      return form.closest(".q-cta-quote-form, .q-cta-newsletter") || root || form;
    }
    return root || form;
  }

  function getFormFromRoot(root) {
    if (!isEl(root)) return null;
    if (root.tagName === "FORM") return root;
    return root.querySelector("form.q-form") || root.querySelector(".q-form");
  }

  function init(root) {
    if (!isEl(root)) return;

    // Root can be wrapper OR <form>
    var form = getFormFromRoot(root);
    if (!form) return;

    // Prevent double init (key off the form, not the wrapper)
    if (form.dataset && form.dataset.qValidateInit === "1") return;
    if (form.dataset) form.dataset.qValidateInit = "1";

    var container = getContainer(root, form);

    function errEl(input) {
      var id = input.id || "";
      if (id) {
        // exact match first
        var el = container.querySelector("#" + id + "-err");
        if (el) return el;
        // radio group fallback: strip trailing -<n> from id (e.g., qf-123-1 -> qf-123-err)
        var base = id.replace(/-\d+$/, "");
        el = container.querySelector("#" + base + "-err");
        if (el) return el;
      }
      // last resort: the wrapper's .q-error
      var wrap = input.closest ? input.closest("[data-q-field]") : null;
      return wrap ? wrap.querySelector(".q-error") : null;
    }

    function setError(input, msg) {
      input.setAttribute("aria-invalid", "true");
      var e = errEl(input);
      if (e) e.textContent = msg || "";
    }

    function clearError(input) {
      input.removeAttribute("aria-invalid");
      var e = errEl(input);
      if (e) e.textContent = "";
    }

    function isRequired(wrap, input) {
      return (wrap.getAttribute("data-required") === "true") || input.hasAttribute("required");
    }

    function ensureCaptchaFields() {
      var t = form.querySelector('input[name="cf-turnstile-response"]');
      if (!t) {
        t = document.createElement("input");
        t.type = "hidden";
        t.name = "cf-turnstile-response";
        form.appendChild(t);
      }
      var r = form.querySelector('input[name="g-recaptcha-response"]');
      if (!r) {
        r = document.createElement("input");
        r.type = "hidden";
        r.name = "g-recaptcha-response";
        form.appendChild(r);
      }
    }

    function validateScope(scope) {
      var ok = true;
      var wraps = Array.prototype.slice.call(form.querySelectorAll("[data-q-field]"));
      var validatedRadioNames = new Set();

      for (var i = 0; i < wraps.length; i++) {
        var w = wraps[i];
        if (scope && !scope.contains(w)) continue;
        if (w.classList.contains("is-hidden")) continue;

        var input = w.querySelector("input, textarea, select");
        if (!input) continue;

        clearError(input);

        var required = isRequired(w, input);
        var invalid = false;

        if (input.type === "radio") {
          var name = input.name || "";
          if (validatedRadioNames.has(name)) continue;
          validatedRadioNames.add(name);

          var group = form.querySelectorAll('input[type="radio"][name="' + name + '"]');
          var anyChecked = Array.prototype.slice.call(group).some(function (r) { return r.checked; });
          invalid = required && !anyChecked;

          if (invalid) {
            var first = group[0];
            if (first) {
              var e1 = errEl(first);
              if (!e1 || !e1.textContent) setError(first, "This field is required.");
              if (ok && first.focus) first.focus({ preventScroll: false });
            }
            ok = false;
          }
          continue;
        }

        if (input.type === "checkbox") {
          invalid = required && !input.checked;
        } else if (input.tagName === "SELECT") {
          invalid = required && (input.value === "" || input.value == null);
        } else {
          var val = (input.value || "").trim();
          invalid = required && val === "";

          if (!invalid && input.type === "email" && val) {
            invalid = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
            if (invalid) setError(input, "Enter a valid email");
          }
          if (!invalid && input.type === "tel" && val) {
            invalid = !/^[0-9+()\-.\s]{7,}$/.test(val);
            if (invalid) setError(input, "Enter a valid phone");
          }
          if (!invalid && input.type === "url" && val) {
            try { new URL(val); } catch (e2) { invalid = true; setError(input, "Enter a valid URL"); }
          }
        }

        if (invalid) {
          var e2 = errEl(input);
          if (!e2 || !e2.textContent) setError(input, "This field is required.");
          if (ok && input.focus) input.focus({ preventScroll: false });
          ok = false;
        }
      }

      return ok;
    }

    // -----------------------------
    // Data capture helpers
    // -----------------------------
    var qs = new URLSearchParams(location.search);

    function setHidden(name, value) {
      var el = form.querySelector('[name="' + name + '"]');
      if (el) el.value = value || "";
    }

    function getHidden(name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el ? (el.value || "") : "";
    }

    function sanitizeTagValue(val) {
      // Shopify tags cannot contain commas reliably (tags are comma-separated).
      // Keep it compact + safe.
      return String(val || "")
        .replace(/,/g, " ")   // no commas
        .replace(/\s+/g, " ") // collapse whitespace
        .trim()
        .slice(0, 80);        // keep tags short
    }

    function parseTags(str) {
      return String(str || "")
        .split(",")
        .map(function (t) { return t.trim(); })
        .filter(Boolean);
    }

    function uniqPush(list, tag) {
      var t = String(tag || "").trim();
      if (!t) return;
      if (list.indexOf(t) === -1) list.push(t);
    }

    function isShopifyCustomerForm() {
      var ft = form.querySelector('input[name="form_type"]');
      var fv = ft ? (ft.value || "").toLowerCase() : "";
      if (fv === "customer") return true;
      return !!form.querySelector('input[name="contact[tags]"]');
    }

    function ensureShopifyTagsInput() {
      var tagsInput = form.querySelector('input[name="contact[tags]"]');
      if (tagsInput) return tagsInput;
      // Create it if we’re in a Shopify form; harmless if unused
      var ft = form.querySelector('input[name="form_type"]');
      var fv = ft ? (ft.value || "").toLowerCase() : "";
      if (fv !== "customer") return null;
      tagsInput = document.createElement("input");
      tagsInput.type = "hidden";
      tagsInput.name = "contact[tags]";
      form.appendChild(tagsInput);
      return tagsInput;
    }

    function captureAttribution() {
      setHidden("utm_source", qs.get("utm_source") || "");
      setHidden("utm_medium", qs.get("utm_medium") || "");
      setHidden("utm_campaign", qs.get("utm_campaign") || "");
      setHidden("referrer", document.referrer || "");
      setHidden("page_url", location.href || "");
      setHidden("timestamp", (new Date()).toISOString());

      // bracketed names (safe to support)
      setHidden("contact[utm_source]", qs.get("utm_source") || "");
      setHidden("contact[utm_medium]", qs.get("utm_medium") || "");
      setHidden("contact[utm_campaign]", qs.get("utm_campaign") || "");
      setHidden("contact[referrer]", document.referrer || "");
      setHidden("contact[page_url]", location.href || "");
      setHidden("contact[timestamp]", (new Date()).toISOString());
    }

    function packShopifyTags() {
      var tagsInput = ensureShopifyTagsInput() || form.querySelector('input[name="contact[tags]"]');
      if (!tagsInput) return;

      var tags = parseTags(tagsInput.value);

      var utm_source = qs.get("utm_source") || getHidden("utm_source");
      var utm_medium = qs.get("utm_medium") || getHidden("utm_medium");
      var utm_campaign = qs.get("utm_campaign") || getHidden("utm_campaign");
      var referrer = getHidden("referrer") || document.referrer || "";

      if (utm_source) uniqPush(tags, "utm_source=" + sanitizeTagValue(utm_source));
      if (utm_medium) uniqPush(tags, "utm_medium=" + sanitizeTagValue(utm_medium));
      if (utm_campaign) uniqPush(tags, "utm_campaign=" + sanitizeTagValue(utm_campaign));

      if (referrer) {
        try {
          var u = new URL(referrer);
          uniqPush(tags, "ref=" + sanitizeTagValue(u.hostname));
        } catch (_e) {
          uniqPush(tags, "ref=" + sanitizeTagValue(referrer));
        }
      }

      try {
        var page = new URL(location.href);
        uniqPush(tags, "page=" + sanitizeTagValue(page.pathname));
      } catch (_e2) {}

      var productHandle =
        (container && container.getAttribute && container.getAttribute("data-product-handle")) ||
        getHidden("product_handle") ||
        "";

      var variantId = getHidden("variant_id") || "";
      var variantLabel = getHidden("variant_label") || "";

      if (productHandle) uniqPush(tags, "product=" + sanitizeTagValue(productHandle));
      if (variantId) uniqPush(tags, "variant_id=" + sanitizeTagValue(variantId));
      if (variantLabel) uniqPush(tags, "variant=" + sanitizeTagValue(variantLabel));

      tagsInput.value = tags.join(", ");
    }

    function bindVariantFromDOM() {
      var id = "";
      var label = "";

      var selectId = document.querySelector('select[name="id"]');
      if (selectId && selectId.value) {
        id = selectId.value;
        label = (selectId.options && selectId.selectedIndex >= 0)
          ? (selectId.options[selectId.selectedIndex].text || "")
          : "";
      }

      if (!id) {
        var hiddenId = document.querySelector('input[name="id"]');
        if (hiddenId && hiddenId.value) id = hiddenId.value;
      }

      if (!id) {
        var chosen = document.querySelector('[data-variant-id].is-selected,[data-variant-id][aria-checked="true"]');
        if (chosen) {
          id = chosen.getAttribute("data-variant-id") || "";
          label = chosen.getAttribute("data-variant-label") || (chosen.textContent || "").trim();
        }
      }

      return { id: id, label: label };
    }

    function wireVariantPickerIfPresent() {
      var picker = container.querySelector("[data-variant-picker]");
      if (!picker) return;

      picker.addEventListener("change", function () {
        var id = picker.value || "";
        var label = "";
        if (picker.options && picker.selectedIndex >= 0) {
          label = picker.options[picker.selectedIndex].text || "";
        }
        setHidden("variant_id", id);
        setHidden("variant_label", label);
      }, { passive: true });
    }

    // Initial capture
    captureAttribution();

    // Initial variant bind (only sets if hidden inputs exist)
    var v = bindVariantFromDOM();
    if (v.id) {
      if (form.querySelector('[name="variant_id"]')) setHidden("variant_id", v.id);
      if (form.querySelector('[name="variant_label"]')) setHidden("variant_label", v.label || "");
    }
    wireVariantPickerIfPresent();

    // -----------------------------
    // Conditional logic
    // -----------------------------
    function evalConds() {
      Array.prototype.slice.call(form.querySelectorAll('[data-cond="1"]')).forEach(function (w) {
        var field = w.getAttribute("data-cond-field") || "";
        var op = w.getAttribute("data-cond-operator") || "equals";
        var val = (w.getAttribute("data-cond-value") || "").toLowerCase();

        if (!field) { w.classList.remove("is-hidden"); return; }

        var ctrls = form.querySelectorAll('[name="' + field + '"]');
        if (!ctrls.length) { w.classList.remove("is-hidden"); return; }

        var current = "";
        Array.prototype.slice.call(ctrls).forEach(function (el) {
          if ((el.type === "radio" || el.type === "checkbox") && el.checked) current = (el.value || "").toLowerCase();
          else if (el.tagName === "SELECT") current = (el.value || "").toLowerCase();
          else if (el.type !== "radio" && el.type !== "checkbox") current = (el.value || "").toLowerCase();
        });

        var show = true;
        if (op === "equals") show = current === val;
        else if (op === "contains") show = current.indexOf(val) >= 0;
        else if (op === "checked") show = current === "on" || current === "yes" || current === "true";

        w.classList.toggle("is-hidden", !show);
      });
    }

    form.addEventListener("input", evalConds, { passive: true });
    form.addEventListener("change", evalConds, { passive: true });
    form.addEventListener("click", function (e) {
      var t = e.target;
      if (t && (t.type === "radio" || t.type === "checkbox")) evalConds();
    }, { passive: true });
    evalConds();

    // -----------------------------
    // Steps
    // -----------------------------
    var isSteps = (container.getAttribute && container.getAttribute("data-template") === "steps")
      || (form.getAttribute && form.getAttribute("data-template") === "steps");

    var steps = isSteps ? Array.prototype.slice.call(container.querySelectorAll(".q-step")) : [];
    var idx = 0;

    function paintSteps() {
      if (!isSteps) return;
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); });

      var fill = container.querySelector(".q-steps-fill");
      var count = container.querySelector(".q-steps-count");
      if (fill) fill.style.width = ((idx + 1) / Math.max(steps.length, 1) * 100).toFixed(1) + "%";
      if (count) count.textContent = (idx + 1) + " / " + steps.length;

      var submitBtn = form.querySelector('button[type="submit"]');
      var submitWrap = submitBtn ? (submitBtn.closest ? submitBtn.closest("div") : submitBtn.parentNode) : null;

      var bar = container.querySelector(".q-steps-actions");
      if (!bar) {
        bar = document.createElement("div");
        bar.className = "q-steps-actions";
        var anchor = container.querySelector("[data-q-steps]");
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor);
        else if (form.parentNode) form.parentNode.appendChild(bar);
      }
      bar.innerHTML = "";

      if (idx > 0) {
        var back = document.createElement("button");
        back.type = "button";
        back.className = "q-btn q-btn--ghost";
        back.textContent = "Back";
        back.addEventListener("click", function () {
          idx = Math.max(0, idx - 1);
          paintSteps();
        });
        bar.appendChild(back);
      }

      if (idx < steps.length - 1) {
        var next = document.createElement("button");
        next.type = "button";
        next.className = "q-btn " + (container.getAttribute("data-btn-variant") || "q-btn--solid");
        next.textContent = "Next";
        next.addEventListener("click", function () {
          if (validateScope(steps[idx])) {
            idx = Math.min(steps.length - 1, idx + 1);
            paintSteps();
          }
        });
        bar.appendChild(next);
        if (submitWrap && submitWrap.style) submitWrap.style.display = "none";
      } else {
        if (submitWrap && submitWrap.style) submitWrap.style.display = "";
      }
    }

    paintSteps();

    // -----------------------------
    // Submit (and optional captcha)
    // -----------------------------
    var submitting = false;

    function ensureTurnstileMount() {
      var mount = container.querySelector("[data-q-turnstile-mount]");
      if (mount) return mount;

      mount = document.createElement("div");
      mount.setAttribute("data-q-turnstile-mount", "1");
      mount.style.position = "absolute";
      mount.style.width = "1px";
      mount.style.height = "1px";
      mount.style.overflow = "hidden";
      mount.style.left = "-9999px";
      mount.style.top = "0";
      container.appendChild(mount);
      return mount;
    }

    form.addEventListener("submit", function (e) {
      var scope = (isSteps && steps[idx]) ? steps[idx] : null;

      // Refresh attribution at submit-time
      captureAttribution();

      // Shopify-mode: pack metadata into tags so it persists
      if (isShopifyCustomerForm()) {
        packShopifyTags();
      }

      if (!validateScope(scope)) {
        var live = container.querySelector(".q-live");
        if (live) {
          live.innerHTML = '<span class="bad">' +
            (container.getAttribute("data-msg-error") || "Please fix the highlighted fields and try again.") +
            "</span>";
        }
        e.preventDefault();
        return;
      }

      if (submitting) { e.preventDefault(); return; }
      submitting = true;

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.setAttribute("aria-busy", "true"); }

      var mode = (container.getAttribute("data-captcha") || "none");
      var siteKey = (container.getAttribute("data-captcha-key") || "");

      if (mode === "turnstile" && siteKey && typeof window.turnstile !== "undefined") {
        e.preventDefault();
        ensureCaptchaFields();

        var mount = ensureTurnstileMount();
        mount.innerHTML = "";

        window.turnstile.render(mount, {
          sitekey: siteKey,
          size: "invisible",
          callback: function (token) {
            var hidden = form.querySelector('[name="cf-turnstile-response"]');
            if (hidden) hidden.value = token;
            form.submit();
          }
        });
      } else if (mode === "recaptcha_v3" && siteKey && typeof window.grecaptcha !== "undefined") {
        e.preventDefault();
        ensureCaptchaFields();
        window.grecaptcha.ready(function () {
          window.grecaptcha.execute(siteKey, { action: "submit" }).then(function (token) {
            var hidden = form.querySelector('[name="g-recaptcha-response"]');
            if (hidden) hidden.value = token;
            form.submit();
          });
        });
      }

      setTimeout(function () {
        submitting = false;
        if (btn) {
          btn.disabled = false;
          btn.removeAttribute("aria-busy");
        }
      }, 5000);
    }, false);
  }

  function boot(root) {
    var scope = isEl(root) ? root : document;
    // Init wrappers + direct forms (some sections may pass the form element)
    var nodes = scope.querySelectorAll(
      ".q-cta-quote-form, .q-cta-newsletter, form.q-form, .q-form[data-template], .q-form.q-form--quote-full"
    );
    Array.prototype.forEach.call(nodes, function (n) { init(n); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { boot(document); });
  else boot(document);

  // Shopify Theme Editor support
  document.addEventListener("shopify:section:load", function (e) { boot(e.target); });
  document.addEventListener("shopify:section:select", function (e) { boot(e.target); });
})();
