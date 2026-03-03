/* Quadratum — Collection Modern JS (scoped, no globals) */
(() => {
  function qs(root, sel){ return root.querySelector(sel); }
  function qsa(root, sel){ return Array.from(root.querySelectorAll(sel)); }

  function getKey(root, suffix){
    const id = root.getAttribute('data-section-id') || 'x';
    const path = window.location.pathname || '';
    return `qcm:${suffix}:${id}:${path}`;
  }

  function setPressed(btn, pressed){
    btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  function init(root){
    if (!root) return;

    // ===== Default view mode (from setting)
    const defaultView = root.getAttribute('data-default-view') || 'grid';
    if (!root.dataset.viewMode) root.dataset.viewMode = defaultView;

    // ===== Undo last navigation (safe)
    try{
      const undo = qs(root, '[data-qcm-undo]');
      const prevKey = getKey(root, 'prevUrl');
      const cur = window.location.href;
      const prev = sessionStorage.getItem(prevKey);
      sessionStorage.setItem(prevKey, cur);

      if (undo && prev && prev !== cur){
        undo.href = prev;
        undo.hidden = false;
      }
    }catch(e){}

    // ===== Layout controls (view + columns + persist)
    const viewWrap = qs(root, '[data-qcm-view]');
    if (viewWrap){
      const viewKey = getKey(root, 'view');
      const colsKey = getKey(root, 'colsD');

      const savedView = localStorage.getItem(viewKey) || defaultView;

      function applyView(mode){
        root.dataset.viewMode = mode;
        qsa(viewWrap, '[data-qcm-view-mode]').forEach(b => {
          const on = b.getAttribute('data-qcm-view-mode') === mode;
          setPressed(b, on);
          b.classList.toggle('is-active', on);
        });
      }

      function getCols(){
        const min = Number(root.getAttribute('data-cols-min')) || 2;
        const max = Number(root.getAttribute('data-cols-max')) || 6;
        const current = Number(localStorage.getItem(colsKey) || root.style.getPropertyValue('--qcm-cols-d') || 4);
        return { min, max, current };
      }

      function applyCols(d){
        root.style.setProperty('--qcm-cols-d', String(d));
        const out = qs(viewWrap, '[data-qcm-cols-val]');
        if (out) out.textContent = `${d} cols`;
      }

      applyView(savedView);

      const colsMin = root.getAttribute('data-cols-min');
      const colsMax = root.getAttribute('data-cols-max');
      if (colsMin && colsMax){
        const { current, min, max } = getCols();
        applyCols(Math.max(min, Math.min(max, current)));
      }

      viewWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qcm-view-mode],[data-qcm-cols-step]');
        if (!btn) return;

        const mode = btn.getAttribute('data-qcm-view-mode');
        if (mode){
          localStorage.setItem(viewKey, mode);
          applyView(mode);
          return;
        }

        const step = btn.getAttribute('data-qcm-cols-step');
        if (step){
          const { current, min, max } = getCols();
          const next = Math.max(min, Math.min(max, current + Number(step)));
          localStorage.setItem(colsKey, String(next));
          applyCols(next);
        }
      });
    }

    // ===== Search within results (client-side filter)
    const searchInput = qs(root, '[data-qcm-searchwithin]');
    if (searchInput){
      const items = qsa(root, '[data-qcm-item]');
      searchInput.addEventListener('input', () => {
        const q = (searchInput.value || '').trim().toLowerCase();
        items.forEach(item => {
          const t = item.innerText ? item.innerText.toLowerCase() : '';
          item.hidden = q && !t.includes(q);
        });
      });
    }

    // ===== Highlight search terms (safe)
    const qParam = new URLSearchParams(window.location.search).get('q') || '';
    if (qParam){
      const terms = qParam.split(/\s+/).map(s => s.trim()).filter(Boolean).slice(0, 6);
      if (terms.length){
        const titles = qsa(root, '[data-qcm-title]');
        titles.forEach(el => {
          const txt = el.textContent || '';
          let html = txt;
          terms.forEach(t => {
            const safe = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(`(${safe})`, 'ig');
            html = html.replace(re, '<mark class="qcm__mark">$1</mark>');
          });
          el.innerHTML = html;
        });
      }
    }

    // ===== Compare tray (modern card only)
    const compareWrap = qs(root, '[data-qcm-compare]');
    const enableCompare = root.querySelector('[data-qcm-compare-toggle]') && compareWrap;
    if (enableCompare){
      const key = getKey(root, 'compare');
      const selected = new Set(JSON.parse(localStorage.getItem(key) || '[]'));

      const countEl = qs(compareWrap, '[data-qcm-compare-count]');
      function sync(){
        localStorage.setItem(key, JSON.stringify(Array.from(selected)));
        if (countEl) countEl.textContent = String(selected.size);
        compareWrap.hidden = selected.size === 0;

        qsa(root, '[data-qcm-compare-toggle]').forEach(btn => {
          const card = btn.closest('[data-qcmc]');
          if (!card) return;
          const handle = card.getAttribute('data-handle');
          const on = selected.has(handle);
          btn.classList.toggle('is-active', on);
          btn.setAttribute('aria-pressed', on ? 'true' : 'false');
          btn.textContent = on ? 'Selected' : 'Select';
        });
      }
      sync();

      root.addEventListener('click', (e) => {
        const toggle = e.target.closest('[data-qcm-compare-toggle]');
        if (toggle){
          const card = toggle.closest('[data-qcmc]');
          if (!card) return;
          const handle = card.getAttribute('data-handle');
          if (!handle) return;
          if (selected.has(handle)) selected.delete(handle); else selected.add(handle);
          sync();
          return;
        }
      });

      const clear = qs(compareWrap, '[data-qcm-compare-clear]');
      if (clear){
        clear.addEventListener('click', () => { selected.clear(); sync(); });
      }

      const open = qs(compareWrap, '[data-qcm-compare-open]');
      if (open){
        open.addEventListener('click', () => {
          alert(`Compare selected:\n\n${Array.from(selected).join('\n')}`);
        });
      }
    }

    // ===== Quick add (single variant only)
    root.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-qcm-quickadd]');
      if (!btn) return;

      const card = btn.closest('[data-qcmc]');
      if (!card) return;

      const variantId = card.getAttribute('data-variant-id');
      if (!variantId) return;

      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = 'Adding…';

      try{
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: Number(variantId), quantity: 1 })
        });
        if (!res.ok) throw new Error('add failed');

        btn.textContent = 'Added ✓';
        setTimeout(() => { btn.textContent = prev; btn.disabled = false; }, 1200);
      }catch(err){
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = prev; btn.disabled = false; }, 1200);
      }
    });

    // ===== Quick View (safe v1: content-lite + link out)
    root.addEventListener('click', async (e) => {
      const qv = e.target.closest('[data-qcm-quickview]');
      if (!qv) return;

      const card = qv.closest('[data-qcmc]');
      if (!card) return;

      const handle = card.getAttribute('data-handle');
      if (!handle) return;

      let modal = qs(root, '[data-qcm-qv]');
      if (!modal){
        modal = document.createElement('div');
        modal.className = 'qcm__qv';
        modal.setAttribute('data-qcm-qv', '');
        modal.innerHTML = `
          <div class="qcm__qvBack" data-qcm-qv-close></div>
          <div class="qcm__qvPanel" role="dialog" aria-modal="true" aria-label="Quick view">
            <button class="qcm__qvClose" type="button" data-qcm-qv-close aria-label="Close">×</button>
            <div class="qcm__qvBody" data-qcm-qv-body>Loading…</div>
          </div>
        `;
        root.appendChild(modal);
      }

      const body = qs(modal, '[data-qcm-qv-body]');
      modal.classList.add('is-open');
      if (body) body.textContent = 'Loading…';

      try{
        const res = await fetch(`/products/${handle}.js`, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error('fetch failed');
        const p = await res.json();

        const img = (p.images && p.images[0]) ? p.images[0] : '';
        const title = p.title || 'Product';
        const url = p.url || `/products/${handle}`;
        const price = (p.price != null) ? (p.price/100).toFixed(2) : '';

        body.innerHTML = `
          ${img ? `<img class="qcm__qvImg" src="${img}" alt="">` : ``}
          <h3 class="qcm__qvTitle">${title}</h3>
          ${price ? `<div class="qcm__qvPrice">$${price}</div>` : ``}
          <a class="qcm__btn" href="${url}">View full details</a>
        `;
      }catch(err){
        if (body) body.textContent = 'Could not load quick view.';
      }
    });

    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-qcm-qv-close]')){
        const modal = qs(root, '[data-qcm-qv]');
        if (modal) modal.classList.remove('is-open');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.q-collection-modern').forEach(init);
  });
})();