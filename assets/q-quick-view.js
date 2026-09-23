/* Global Quick View reuses the native purchase fragment and purchase controllers. */
(() => {
  if (window.qtmQuickViewReady) return;
  window.qtmQuickViewReady = true;
  const host = document.getElementById('q-qv');
  if (!host) return;
  const panel = host.querySelector('.q-qv__panel');
  const content = host.querySelector('[data-qv-content]');
  let request, opener, previousOverflow = '';
  const clear = () => {
    window.qtmProductPurchaseSync?.dispose?.(content);
    window.qtmSellingPlans?.dispose?.(content);
    content.replaceChildren();
  };
  function close() {
    request?.abort(); request = null;
    if (host.hidden) return;
    clear();
    host.hidden = true;
    host.setAttribute('aria-hidden', 'true');
    host.removeAttribute('aria-busy');
    document.documentElement.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus();
  }
  const controls = () => [...panel.querySelectorAll('a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), [tabindex="0"]')].filter(node => !node.closest('[hidden], [inert]') && node.type !== 'hidden');
  document.addEventListener('click', async event => {
    if (event.target.closest('#q-qv [data-qv-close]')) { close(); return; }
    const trigger = event.target.closest('[data-quick-view]');
    if (!trigger) return;
    const handle = trigger.dataset.productHandle || '';
    if (!/^[\p{L}\p{N}][\p{L}\p{N}_-]*$/u.test(handle)) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('qtm:collection-modal-open', { detail: host }));
    request?.abort(); clear();
    const pending = new AbortController(); request = pending;
    opener = trigger;
    if (host.hidden) previousOverflow = document.documentElement.style.overflow;
    host.dataset.mode = (trigger.dataset.quickViewMode || trigger.closest('[data-quick-view-mode]')?.dataset.quickViewMode) === 'modal' ? 'modal' : 'drawer';
    host.hidden = false; host.setAttribute('aria-hidden', 'false'); host.setAttribute('aria-busy', 'true');
    document.documentElement.style.overflow = 'hidden';
    const status = document.createElement('p'); status.setAttribute('role', 'status'); status.textContent = 'Loading product…'; content.append(status);
    panel.focus();
    const base = window.Shopify?.routes?.root || host.dataset.rootUrl || '/';
    const url = new URL(`${base.replace(/\/?$/, '/')}products/${encodeURIComponent(handle)}`, window.location.origin);
    url.searchParams.set('section_id', 'collection-modern-quick-view');
    try {
      const response = await fetch(url, { credentials: 'same-origin', signal: pending.signal });
      if (!response.ok) throw new Error('Product unavailable');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (pending.signal.aborted || request !== pending) return;
      const template = doc.querySelector('template[data-global-qv-product]');
      if (!template?.content.querySelector('[data-product-purchase-sync]')) throw new Error('Product unavailable');
      content.replaceChildren(document.importNode(template.content, true));
      window.qtmSellingPlans?.boot?.(content);
      window.qtmProductPurchaseSync?.boot?.(content);
    } catch (error) {
      if (pending.signal.aborted || request !== pending) return;
      status.textContent = 'Unable to load Quick View. ';
      const link = document.createElement('a'); url.searchParams.delete('section_id'); link.href = url.href; link.textContent = 'View full product'; status.append(link);
    } finally {
      if (request === pending && !pending.signal.aborted) host.removeAttribute('aria-busy');
    }
  });
  document.addEventListener('keydown', event => {
    if (host.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const items = controls(), first = items[0], last = items[items.length - 1];
    if (!first) { event.preventDefault(); panel.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel || !panel.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('focusin', event => { if (!host.hidden && !panel.contains(event.target)) panel.focus(); });
  document.addEventListener('quadratum:cart:opening', close);
  window.addEventListener('qtm:collection-modal-open', event => { if (event.detail !== host) close(); });
  document.addEventListener('shopify:section:unload', event => { if (event.target.contains(opener) || event.target.contains(host)) close(); });
})();
