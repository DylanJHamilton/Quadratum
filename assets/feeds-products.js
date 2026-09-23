(() => {
  if (window.qtmProductFeedsReady) return;
  window.qtmProductFeedsReady = true;
  const instances = new WeakMap(), selector = '[data-feed="product-grid"]';
  const each = (scope, fn) => { if (scope.matches?.(selector)) fn(scope); scope.querySelectorAll(selector).forEach(fn); };
  function init(root) {
    if (instances.has(root)) return;
    const controller = new AbortController(), signal = controller.signal;
    const grid = root.querySelector('[data-feed-grid]');
    if (!grid) return;
    let pending, observer, activeURL = new URL(root.dataset.sourceUrl || location.href, location.href);
    const desktop = matchMedia('(min-width: 990px)'), reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const listen = (target, type, fn) => target?.addEventListener(type, fn, { signal });
    const layout = () => (desktop.matches ? root.dataset.layoutDesktop : root.dataset.layoutMobile) || 'grid';
    function carousel() {
      const enabled = layout() === 'carousel';
      grid.classList.toggle('q-snap--off', enabled && root.dataset.carouselSnap === 'false');
      grid.classList.toggle('q-scrollbar--hidden', enabled && root.dataset.carouselHideScrollbar === 'true');
      const overflow = enabled && grid.scrollWidth > grid.clientWidth + 1;
      const prev = root.querySelector('[data-carousel-prev]'), next = root.querySelector('[data-carousel-next]');
      if (prev) prev.disabled = !overflow || grid.scrollLeft <= 1;
      if (next) next.disabled = !overflow || grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    }
    function pagination() {
      const next = root.querySelector('[data-next-link]');
      const load = root.querySelector('[data-load-more]');
      if (load) { load.hidden = false; load.disabled = !next || Boolean(pending); load.setAttribute('aria-disabled', String(load.disabled)); }
      observer?.disconnect();
      const sentinel = root.querySelector('[data-infinite-sentinel]');
      if (next && sentinel && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) request(next.href, true); }, { rootMargin: '200px 0px' });
        observer.observe(sentinel);
      }
    }
    async function request(href, append) {
      if (append && pending) return;
      pending?.abort();
      const current = new AbortController(); pending = current;
      const url = new URL(href, activeURL);
      if (url.origin !== location.origin) { pending = null; return; }
      url.searchParams.set('section_id', root.dataset.sectionId);
      grid.setAttribute('aria-busy', 'true'); pagination();
      try {
        const response = await fetch(url, { credentials: 'same-origin', signal: current.signal });
        if (!response.ok) throw new Error('Products unavailable');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        if (signal.aborted || current.signal.aborted || pending !== current) return;
        const incoming = [...doc.querySelectorAll(selector)].find(node => node.dataset.sectionId === root.dataset.sectionId);
        const nextGrid = incoming?.querySelector('[data-feed-grid]');
        if (!nextGrid) throw new Error('Products unavailable');
        const items = [...nextGrid.querySelectorAll('[data-feed-item]')].map(node => document.importNode(node, true));
        if (append) grid.append(...items); else grid.replaceChildren(...items);
        const nav = root.querySelector('[data-feed-pagination]'), nextNav = incoming.querySelector('[data-feed-pagination]');
        if (nav) nav.replaceChildren(...(nextNav ? [...nextNav.childNodes].map(node => document.importNode(node, true)) : []));
        activeURL = url;
        const status = root.querySelector('[data-feed-status]'); if (status) status.textContent = `${items.length} products ${append ? 'added' : 'loaded'}.`;
        carousel();
      } catch (error) {
        if (!current.signal.aborted && !signal.aborted) {
          const status = root.querySelector('[data-feed-status]'); if (status) status.textContent = 'Unable to load products. Try again or use the page links.';
          // Stop automatic retries; the native page links remain available.
          observer?.disconnect();
        }
      } finally {
        if (pending === current && !signal.aborted) { pending = null; grid.setAttribute('aria-busy', 'false'); const load=root.querySelector('[data-load-more]'); if(load) {load.disabled=!root.querySelector('[data-next-link]');load.setAttribute('aria-disabled',String(load.disabled));} }
      }
      if (!signal.aborted && !current.signal.aborted && activeURL.href === url.href) pagination();
    }
    listen(root, 'click', event => {
      if (event.target.closest('[data-load-more]')) { const next=root.querySelector('[data-next-link]'); if(next) request(next.href,true); return; }
      const button=event.target.closest('[data-carousel-prev], [data-carousel-next]');
      if (!button || layout() !== 'carousel') return;
      const gap=parseFloat(getComputedStyle(grid).columnGap)||0;
      const width=root.dataset.carouselScroll==='card' ? (grid.querySelector('[data-feed-item]')?.getBoundingClientRect().width||grid.clientWidth)+gap : grid.clientWidth;
      grid.scrollBy({ left:width*(button.matches('[data-carousel-prev]')?-1:1), behavior:reduced.matches?'auto':'smooth' });
    });
    const sort = root.querySelector('[data-sort-select]');
    if (sort && root.dataset.canPaginate === 'true') {
      root.querySelector('[data-sort-submit]')?.setAttribute('hidden','');
      listen(sort,'change',()=>{const url=new URL(root.dataset.sourceUrl,location.href);if(sort.value)url.searchParams.set('sort_by',sort.value);request(url,false)});
    }
    const count=root.querySelector('[data-filter-count]');
    if(count){const total=[...new URL(location.href).searchParams.keys()].filter(key=>key.startsWith('filter.')).length;count.textContent=String(total);count.hidden=total===0;}
    listen(grid,'scroll',carousel);listen(window,'resize',carousel);listen(desktop,'change',carousel);
    instances.set(root,()=>{controller.abort();pending?.abort();observer?.disconnect();});
    carousel();pagination();
    if(root.dataset.canPaginate==='true' && root.dataset.sortBy && activeURL.pathname){const url=new URL(activeURL);url.searchParams.set('sort_by',root.dataset.sortBy);request(url,false);}
  }
  const boot=scope=>each(scope,init);
  document.addEventListener('shopify:section:load',event=>boot(event.target));
  document.addEventListener('shopify:section:unload',event=>each(event.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>boot(document),{once:true});else boot(document);
})();
