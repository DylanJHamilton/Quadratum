(() => {
  if (window.qtmDocumentation) return;
  const instances = new WeakMap();
  const make = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  function init(root) {
    if (instances.has(root)) return;
    let index;
    try { index = JSON.parse(root.querySelector('[data-doc-index]').textContent); } catch { return; }
    const controller = new AbortController();
    const search = root.querySelector('[data-doc-search]');
    const type = root.querySelector('[data-doc-type]');
    const list = root.querySelector('[data-doc-list]');
    const count = root.querySelector('[data-doc-count]');
    const detail = root.querySelector('[data-doc-detail]');
    const guide = root.querySelector('[data-doc-guide]');
    const cache = new Map();
    let pending, revision = 0;
    const listen = (target, event, fn) => target.addEventListener(event, fn, {signal:controller.signal});
    function filter() {
      const query = search.value.trim().toLowerCase();
      const items = index.filter(item => (type.value === 'all' || item.kind === type.value) && `${item.name} ${item.category} ${item.keywords}`.toLowerCase().includes(query));
      list.replaceChildren();
      for (const item of items) {
        const a = make('a', item.name);
        a.href = '#doc-' + item.slug;
        a.dataset.docSlug = item.slug;
        a.append(make('small', `${item.kind === 'settings' ? 'Theme Settings' : item.kind} · ${item.count} controls`));
        list.append(a);
      }
      count.textContent = `${items.length} matching guides`;
    }
    function fields(settings, host) {
      let group = host;
      for (const setting of settings || []) {
        if (setting.type === 'header') {
          group = make('div', undefined, 'q-docs__control-group');
          group.append(make('h4', setting.content));host.append(group);continue;
        }
        if (setting.type === 'paragraph') { group.append(make('p',setting.content));continue; }
        const row = make('details', undefined, 'q-docs__control');
        row.append(make('summary', setting.label || setting.id));
        row.append(make('p', setting.how));
        if (setting.info) row.append(make('p', setting.info, 'q-docs__note'));
        if (setting.default !== undefined) row.append(make('p','Default: '+(typeof setting.default === 'object' ? JSON.stringify(setting.default) : String(setting.default))));
        if (setting.min !== undefined) row.append(make('p',`Range: ${setting.min}–${setting.max}${setting.unit ? ' '+setting.unit : ''}. Step: ${setting.step ?? 1}.`));
        if (setting.options) { const ul=make('ul');setting.options.forEach(o=>ul.append(make('li',o.label)));row.append(ul); }
        if (setting.visible_if) row.append(make('p','This control appears only when its related editor option is active.'));
        const technical=make('details',undefined,'q-docs__technical');technical.append(make('summary','Setting reference'));technical.append(make('code',`${setting.id} · ${setting.type}`));
        if (setting.options) technical.append(make('pre',setting.options.map(o=>`${o.label}: ${o.value}`).join('\n')));
        row.append(technical);group.append(row);
      }
    }
    function render(data) {
      detail.replaceChildren(make('p',data.category,'q-docs__eyebrow'),make('h2',data.name));
      const steps=make('ol');data.steps.forEach(step=>steps.append(make('li',step)));detail.append(steps);
      if (data.available_in?.length) { const d=make('details');d.append(make('summary','Compatible sections'));d.append(make('p',data.available_in.join(' · ')));detail.append(d); }
      if (data.enabled_on || data.disabled_on) detail.append(make('p','Template availability: '+JSON.stringify({enabled:data.enabled_on,disabled:data.disabled_on})));
      if (data.max_blocks) detail.append(make('p',`This section supports up to ${data.max_blocks} blocks.`));
      if (data.presets?.length) detail.append(make('p','Starting layouts: '+data.presets.map(p=>p.name).join(' · ')));
      detail.append(make('h3',data.kind==='settings'?'Theme controls':'Controls'));
      if (!data.settings?.length) detail.append(make('p','This component uses its content or child blocks instead of separate section controls.'));
      fields(data.settings,detail);
      if (data.blocks?.length) {
        detail.append(make('h3','Blocks you can add'));
        for (const block of data.blocks) {
          const box=make('details');box.append(make('summary',block.name || (block.type==='@app'?'App block':block.type)));
          if (block.type==='@app') box.append(make('p','Select a compatible installed app’s block. The app owns its settings and service. Review its behavior separately.'));
          else if (block.type==='@theme') box.append(make('p','This host accepts compatible theme blocks. Use the Blocks filter to find their individual guides.'));
          else {
            const item=index.find(i=>i.slug==='block-'+block.type);
            if (item) {const a=make('a','Open '+item.name+' guide');a.href='#doc-'+item.slug;a.dataset.docSlug=item.slug;box.append(a);}
            fields(block.settings,box);
          }
          detail.append(box);
        }
      }
      const ref=make('details');ref.append(make('summary','File reference for connected builders'));ref.append(make('code',data.file));detail.append(ref);
    }
    async function open(slug, focus = false) {
      const item=index.find(entry=>entry.slug===slug);
      if (!item) return;
      const current=++revision;
      pending?.abort();pending=new AbortController();
      guide.hidden=true;detail.hidden=false;detail.setAttribute('aria-busy','true');
      detail.replaceChildren(make('p','Loading '+item.name+'…'));
      try {
        let data=cache.get(slug);
        if (!data) {const response=await fetch(item.url,{signal:pending.signal,credentials:'same-origin'});if(!response.ok)throw new Error('unavailable');data=await response.json();cache.set(slug,data);}
        if(current!==revision)return;
        render(data);
      } catch(error) {
        if(error.name==='AbortError'||current!==revision)return;
        detail.replaceChildren(make('h2',item.name),make('p','This guide could not load. Check your connection and try again.'));
        const retry=make('button','Try again');retry.type='button';retry.dataset.docSlug=slug;detail.append(retry);
      } finally {
        if(current===revision){detail.removeAttribute('aria-busy');if(focus){detail.focus();detail.scrollIntoView({block:'start'});}}
      }
    }
    function showGuide() { ++revision;pending?.abort();guide.hidden=false;detail.hidden=true; }
    listen(root,'click',event=>{
      const link=event.target.closest('[data-doc-slug]');
      if(link){event.preventDefault();history.replaceState(history.state,'','#doc-'+link.dataset.docSlug);open(link.dataset.docSlug,true);}
      if(event.target.closest('[data-doc-start]')){event.preventDefault();history.replaceState(history.state,'','#start');showGuide();guide.scrollIntoView({block:'start'});}
    });
    listen(search,'input',filter);listen(type,'change',filter);
    listen(window,'hashchange',()=>location.hash.startsWith('#doc-')?open(location.hash.slice(5)):showGuide());
    instances.set(root,()=>{++revision;controller.abort();pending?.abort();});
    filter();if(location.hash.startsWith('#doc-'))open(location.hash.slice(5));
  }
  function each(scope,fn){if(scope.matches?.('[data-documentation-hub]'))fn(scope);scope.querySelectorAll('[data-documentation-hub]').forEach(fn);}
  window.qtmDocumentation={boot:scope=>each(scope||document,init)};
  document.addEventListener('shopify:section:load',e=>each(e.target,init));
  document.addEventListener('shopify:section:unload',e=>each(e.target,root=>{instances.get(root)?.();instances.delete(root);}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
