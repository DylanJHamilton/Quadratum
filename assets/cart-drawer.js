/* Shared cart drawer: delegated controls also survive Theme Editor reloads. */
(() => {
  if (window.QuadratumCartDrawer) return;
  let opener;
  let pending = false;
  let openRequest = 0;
  let previousOverflow = '';
  let refreshVersion = 0, refreshRequest;
  const revealQuantityControls = root => root?.querySelectorAll('[data-qty-decrease], [data-qty-increase]').forEach(button => { button.hidden = false; });
  const drawer = () => document.querySelector('[data-cart-drawer]');
  revealQuantityControls(drawer());
  const cartUrl = () => drawer()?.dataset.cartUrl || '/cart';
  const focusable = root => Array.from(root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')).filter(el => el.getClientRects().length && !el.closest('[hidden], [inert]'));

  function close(restore = true) {
    openRequest += 1;
    const root = drawer();
    if (!root || root.hidden) return;
    root.hidden = true;
    document.documentElement.style.overflow = previousOverflow;
    if (restore && opener?.isConnected) opener.focus();
  }

  function show() {
    const root = drawer();
    if (!root) return;
    if (root.hidden) previousOverflow = document.documentElement.style.overflow;
    root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    (root.querySelector('[data-cart-drawer-close] button, button[data-cart-drawer-close]') || root.querySelector('[data-cart-drawer-panel]'))?.focus();
  }

  async function refresh() {
    const version = ++refreshVersion;
    const active = document.activeElement;
    const ownedFocus = drawer()?.contains(active);
    const focusKey = active?.closest('[data-cart-item]')?.dataset.key;
    const focusSelector = active?.matches('[data-qty-increase]') ? '[data-qty-increase]' : active?.matches('[data-qty-decrease]') ? '[data-qty-decrease]' : active?.matches('[data-cart-remove]') ? '[data-cart-remove]' : '.qtm-cart-line-item__qty-input';
    refreshRequest?.abort(); refreshRequest = new AbortController();
    const response = await fetch(cartUrl(), { credentials: 'same-origin', cache: 'no-store', signal: refreshRequest.signal });
    if (!response.ok) throw new Error('Unable to load your cart.');
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    if (version !== refreshVersion) return;
    const content = html.querySelector('[data-cart-drawer-content]');
    const target = drawer()?.querySelector('[data-cart-drawer-content]');
    if (!content || !target) throw new Error('Unable to load your cart.');
    target.replaceChildren(...content.childNodes);
    revealQuantityControls(drawer());
    const count = target.querySelector('[data-cart-count]')?.textContent;
    if (count != null) document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = count; });
    if (ownedFocus && !drawer()?.hidden && !active.isConnected) {
      const item = [...target.querySelectorAll('[data-cart-item]')].find(el => el.dataset.key === focusKey);
      (item?.querySelector(focusSelector) || drawer().querySelector('button[data-cart-drawer-close], [data-cart-drawer-panel]'))?.focus();
    }
  }

  async function open(trigger) {
    if (!drawer()) { window.location.assign(cartUrl()); return; }
    const request = ++openRequest;
    document.dispatchEvent(new CustomEvent('quadratum:cart:opening'));
    window.dispatchEvent(new CustomEvent('qtm:collection-modal-open', { detail: drawer() }));
    opener = trigger?.isConnected && !trigger.closest('[hidden]') ? trigger : document.activeElement;
    show();
    try {
      await refresh();
      if (request === openRequest && drawer()?.hidden) show();
    } catch (error) {
      if (error.name === 'AbortError') return;
      if (request === openRequest && !drawer()?.hidden) {
        const status = drawer()?.querySelector('[data-cart-drawer-status]');
        if (status) { status.textContent = 'Unable to refresh cart. '; const link = document.createElement('a'); link.href = cartUrl(); link.textContent = 'View cart'; status.append(link); }
      }
    }
  }

  async function updateItem(key, quantity, input) {
    if (pending || !Number.isInteger(quantity) || quantity < 0) return;
    if (quantity === 0 && input?.closest('[data-cart-item]')?.dataset.canRemove === 'false') return;
    if (input && quantity !== 0) {
      const min = Number(input.min || 1), step = Number(input.step || 1);
      if (input.readOnly || quantity < min || (input.max && quantity > Number(input.max)) || (quantity - min) % step !== 0) { input.reportValidity(); return; }
    }
    const root = drawer();
    pending = true;
    root.setAttribute('aria-busy', 'true');
    const status = root.querySelector('[data-cart-drawer-status]');
    if (status) status.textContent = 'Updating cart…';
    const fields = [...root.querySelectorAll('.qtm-cart-line-item__qty-input')].map(field => [field, field.readOnly]);
    const buttons = [...root.querySelectorAll('[data-qty-decrease], [data-qty-increase], [name="checkout"]')].map(button => [button, button.disabled]);
    fields.forEach(([field]) => { field.readOnly = true; });
    buttons.forEach(([button]) => { button.disabled = true; });
    let changed = false;
    try {
      const response = await fetch(root.dataset.changeUrl, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'Unable to update your cart.');
      changed = true;
      if (!root.isConnected || drawer() !== root) return;
      await refresh();
      if (status) status.textContent = quantity === 0 ? 'Item removed from cart.' : 'Cart updated.';
    } catch (error) {
      if (!changed && input) input.value = input.dataset.currentQuantity || input.defaultValue;
      if (status && error.name !== 'AbortError') {
        status.textContent = changed ? 'Cart updated, but the display could not refresh. ' : error.message;
        if (changed) { const link = document.createElement('a'); link.href = cartUrl(); link.textContent = 'View cart'; status.append(link); }
      }
    }
    finally { pending = false; fields.forEach(([field, original]) => { field.readOnly = original; }); buttons.forEach(([button, original]) => { button.disabled = original; }); root.removeAttribute('aria-busy'); }
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-cart-drawer-open]');
    if (trigger) { event.preventDefault(); open(trigger); return; }
    if (!event.target.closest('[data-cart-drawer]')) return;
    if (event.target.closest('[data-cart-drawer-close]')) { close(); return; }
    const control = event.target.closest('[data-qty-decrease], [data-qty-increase], [data-cart-remove]');
    if (!control) return;
    event.preventDefault();
    const item = control.closest('[data-cart-item]');
    const input = item.querySelector('.qtm-cart-line-item__qty-input');
    if (!input || (input.readOnly && !control.matches('[data-cart-remove]'))) return;
    const min = Number(input.min || 1), step = Number(input.step || 1);
    let quantity = control.matches('[data-cart-remove]') ? 0 : input.valueAsNumber + (control.matches('[data-qty-increase]') ? step : -step);
    if (quantity < min) quantity = 0;
    updateItem(item.dataset.key, quantity, input);
  });
  document.addEventListener('change', event => {
    if (event.target.matches('[data-cart-drawer] .qtm-cart-line-item__qty-input')) updateItem(event.target.dataset.key, event.target.valueAsNumber, event.target);
  });
  const submittingForms = new WeakSet();
  document.addEventListener('submit', async event => {
    const form = event.target;
    if (pending && form.closest('[data-cart-drawer]')) { event.preventDefault(); return; }
    if (!form.matches('form[data-cart-drawer-add]') || !window.QuadratumSettings?.cart?.ajaxDrawerEnabled) return;
    if (event.defaultPrevented || event.submitter?.closest('.shopify-payment-button')) return;
    if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); return; }
    event.preventDefault();
    if (submittingForms.has(form)) return;
    submittingForms.add(form);
    let status = form.querySelector('[data-cart-add-status]');
    if (!status) {
      status = document.createElement('p');
      status.dataset.cartAddStatus = '';
      status.setAttribute('role', 'status');
      form.append(status);
    }
    status.textContent = form.dataset.cartAddingMessage || '';
    form.setAttribute('aria-busy', 'true');
    try {
      const url = new URL(form.action, window.location.href);
      url.pathname = url.pathname.replace(/\/add\/?$/, '/add.js');
      const response = await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'Unable to add this item.');
      status.textContent = form.dataset.cartAddedMessage || 'Added to cart.';
      try {
        if (window.QuadratumSettings.cart.openAfterAdd) await open(event.submitter);
        else await refresh();
      } catch {
        // The purchase succeeded. A refresh failure must not suggest submitting the add again.
        const link = document.createElement('a'); link.href = cartUrl(); link.textContent = 'View cart'; status.append(' ', link);
      }
    } catch (error) { status.textContent = error.message; }
    finally { submittingForms.delete(form); form.removeAttribute('aria-busy'); }
  });
  document.addEventListener('keydown', event => {
    const root = drawer();
    if (!root || root.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key !== 'Tab') return;
    const controls = focusable(root);
    const first = controls[0], last = controls[controls.length - 1];
    if (!first) return;
    if (event.shiftKey && (document.activeElement === first || document.activeElement === root.querySelector('[data-cart-drawer-panel]'))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('focusin', event => { const root = drawer(); if (root && !root.hidden && !root.querySelector('[data-cart-drawer-panel]')?.contains(event.target)) root.querySelector('[data-cart-drawer-panel]')?.focus(); });
  window.addEventListener('qtm:collection-modal-open', event => { if (event.detail !== drawer()) close(false); });
  document.addEventListener('shopify:section:unload', event => { if (event.target.contains(drawer())) { close(); refreshVersion += 1; refreshRequest?.abort(); } });
  document.addEventListener('shopify:section:load', () => revealQuantityControls(drawer()));
  window.addEventListener('quadratum:cart:updated', () => {
    if (window.QuadratumSettings?.cart?.openAfterAdd) open();
    else if (drawer() && !drawer().hidden) refresh().catch(() => {});
  });
  window.QuadratumCartDrawer = { open, close, refresh };
})();
