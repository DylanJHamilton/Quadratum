/* Merchant-configured redirect only. Never fabricates a shipment status. */
(() => {
  'use strict';
  if(window.__qAccountTracking)return;window.__qAccountTracking=true;
  const instances=new Map(),selector='[data-qtm-order-tracking]';
  const safe=value=>{const s=(value||'').trim();if(!(s.startsWith('https://')||s.startsWith('/'))||/[\\\r\n\t]/.test(s)||s.startsWith('//'))return null;try{const u=new URL(s,location.origin);return u.protocol==='https:'||(s.startsWith('/')&&u.origin===location.origin)?u:null;}catch(_){return null;}};
  function mount(root){
    if(instances.has(root))return;
    const form=root.querySelector('[data-qtm-tracking-form]'),note=root.querySelector('[data-qtm-tracking-unavailable]'),message=root.querySelector('[data-qtm-tracking-message]'),pattern=root.dataset.providerUrl||'';
    if(!form||!safe(pattern.replaceAll('{order}','test').replaceAll('{email}','test').replaceAll('{tracking}','test')))return;
    const abort=new AbortController();form.hidden=false;if(note)note.hidden=true;
    form.addEventListener('submit',event=>{
      event.preventDefault();message.hidden=true;
      if(!form.reportValidity())return;
      const values={order:form.elements.namedItem('order_number').value.trim(),email:form.elements.namedItem('email').value.trim(),tracking:form.elements.namedItem('tracking_number')?.value.trim()||''};
      if(!values.order){message.textContent='Enter an order number.';message.hidden=false;form.elements.namedItem('order_number').focus();return;}
      let expanded=pattern;for(const[key,value]of Object.entries(values))expanded=expanded.replaceAll('{'+key+'}',encodeURIComponent(value));
      const url=safe(expanded);if(!url){message.textContent='Tracking is unavailable. Please contact the store.';message.hidden=false;return;}
      for(const[key,value]of Object.entries(values))if(value&&!pattern.includes('{'+key+'}'))url.searchParams.set(key,value);
      location.assign(url.href);
    },{signal:abort.signal});
    instances.set(root,()=>{abort.abort();form.hidden=true;if(note)note.hidden=false;message.hidden=true;instances.delete(root);});
  }
  const scan=scope=>{if(scope.matches?.(selector))mount(scope);scope.querySelectorAll?.(selector).forEach(mount);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});else scan(document);
  document.addEventListener('shopify:section:load',e=>scan(e.target));
  document.addEventListener('shopify:section:unload',e=>{for(const[root,dispose]of instances)if(root===e.target||e.target.contains(root))dispose();});
})();
