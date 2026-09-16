/* Shared cart drawer: delegated controls also survive Theme Editor reloads. */
(() => {
  if (window.QuadratumCartDrawer) return;
  let opener;
  let pending = false;
  let openRequest = 0;
  let previousOverflow = '';
  const drawer = () => document.querySelector('[data-cart-drawer]');
  const cartUrl = () => drawer()?.dataset.cartUrl || '/cart';
  const focusable = root => Array.from(root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')).filter(el => el.getClientRects().length && !el.closest('[hidden], [inert]'));

  function close() {
    openRequest += 1;
    const root = drawer();
    if (!root || root.hidden) return;
    root.hidden = true;
    document.documentElement.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus();
  }

  function show() {
    const root = drawer();
    if (!root) return;
    if (root.hidden) previousOverflow = document.documentElement.style.overflow;
    root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    root.querySelector('[data-cart-drawer-close] button, button[data-cart-drawer-close]')?.focus();
  }

  async function refresh() {
    const response = await fetch(cartUrl(), { credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load your cart.');
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    const content = html.querySelector('[data-cart-drawer-content]');
    const target = drawer()?.querySelector('[data-cart-drawer-content]');
    if (!content || !target) throw new Error('Unable to load your cart.');
    target.replaceChildren(...content.childNodes);
    const count = target.querySelector('[data-cart-count]')?.textContent;
    if (count != null) document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = count; });
  }

  async function open(trigger) {
    if (!drawer()) { window.location.assign(cartUrl()); return; }
    const request = ++openRequest;
    opener = trigger || document.activeElement;
    show();
    try {
      await refresh();
      if (request === openRequest) show();
    } catch {
      if (request === openRequest) window.location.assign(cartUrl());
    }
  }

  async function updateItem(key, quantity) {
    if (pending || !Number.isInteger(quantity) || quantity < 0) return;
    const root = drawer();
    pending = true;
    root.setAttribute('aria-busy', 'true');
    const status = root.querySelector('[data-cart-drawer-status]');
    status.textContent = '';
    try {
      const response = await fetch(root.dataset.changeUrl, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'Unable to update your cart.');
      await refresh();
      if (!root.hidden) show();
    } catch (error) { status.textContent = error.message; }
    finally { pending = false; root.removeAttribute('aria-busy'); }
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
    const quantity = control.matches('[data-cart-remove]') ? 0 : Math.max(0, Number(input.value) + (control.matches('[data-qty-increase]') ? 1 : -1));
    updateItem(item.dataset.key, quantity);
  });
  document.addEventListener('change', event => {
    if (event.target.matches('[data-cart-drawer] .qtm-cart-line-item__qty-input')) updateItem(event.target.dataset.key, Number(event.target.value));
  });
  const submittingForms = new WeakSet();
  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!form.matches('form[data-cart-drawer-add]') || !window.QuadratumSettings?.cart?.ajaxDrawerEnabled) return;
    if (event.defaultPrevented || event.submitter?.closest('.shopify-payment-button')) return;
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
    status.textContent = '';
    form.setAttribute('aria-busy', 'true');
    try {
      const url = new URL(form.action, window.location.href);
      url.pathname = url.pathname.replace(/\/add\/?$/, '/add.js');
      const response = await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'Unable to add this item.');
      status.textContent = 'Added to cart.';
      if (window.QuadratumSettings.cart.openAfterAdd) await open(event.submitter);
      else await refresh();
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
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('quadratum:cart:updated', () => {
    if (window.QuadratumSettings?.cart?.openAfterAdd) open();
    else if (drawer() && !drawer().hidden) refresh().catch(() => {});
  });
  window.QuadratumCartDrawer = { open, close, refresh };
})();
