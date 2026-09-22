/* Native address forms; local country option enhancement, no external helper dependency. */
(() => {
  'use strict';
  if(window.__qAccountAddresses)return;window.__qAccountAddresses=true;
  const instances=new Map(),selector='[data-qtm-account-addresses]';
  function mount(root){
    if(instances.has(root))return;
    const abort=new AbortController(),on=(el,type,fn)=>el.addEventListener(type,fn,{signal:abort.signal}),cleanups=[];
    let lastAdd=null;
    const add=root.querySelector('[data-qtm-addresses-add-panel]'),adds=[...root.querySelectorAll('[data-qtm-addresses-add-toggle]')];
    const focus=panel=>panel.querySelector('[role="alert"],input:not([type="hidden"]),select,textarea')?.focus();
    const showAdd=(open,move=false)=>{if(!add)return;add.hidden=!open;adds.forEach(b=>b.setAttribute('aria-expanded',String(open)));if(move){if(open)focus(add);else(lastAdd||adds[0])?.focus();}};
    showAdd(!!add?.querySelector('[role="alert"]'));
    for(const b of adds){b.hidden=false;on(b,'click',()=>{lastAdd=b;showAdd(add.hidden,true);});}
    root.querySelectorAll('[data-qtm-addresses-add-close]').forEach(b=>{b.hidden=false;on(b,'click',()=>showAdd(false,true));});
    root.querySelectorAll('[data-qtm-addresses-edit-toggle]').forEach(b=>{
      const panel=[...root.querySelectorAll('[data-qtm-addresses-edit-panel]')].find(x=>x.id===b.getAttribute('aria-controls'));if(!panel)return;
      const show=(open,move=false)=>{panel.hidden=!open;b.setAttribute('aria-expanded',String(open));if(move){if(open)focus(panel);else b.focus();}};
      b.hidden=false;show(!!panel.querySelector('[role="alert"]'));on(b,'click',()=>show(panel.hidden,true));
      panel.querySelectorAll('[data-qtm-addresses-edit-close]').forEach(close=>{close.hidden=false;on(close,'click',()=>show(false,true));});
    });
    root.querySelectorAll('[data-qtm-address-delete-form]').forEach(form=>on(form,'submit',event=>{if(!window.confirm(root.dataset.deleteConfirmMessage||'Delete this address?'))event.preventDefault();}));
    root.querySelectorAll('[data-qtm-address-country]').forEach(country=>{
      const form=country.closest('form'),input=form?.querySelector('[data-qtm-address-province]');if(!input)return;
      const options=[...country.options],initial=options.find(x=>x.dataset.provinces&&[x.value,x.textContent].includes(country.value||country.dataset.default));if(initial)country.value=initial.value;
      // Duplicate fallback option keeps the saved country available without JS; prefer native option data here.
      if(initial){options.forEach(x=>x.defaultSelected=x===initial);initial.selected=true;}
      const container=input.closest('[data-qtm-address-province-container]'),select=document.createElement('select'),inputId=input.id,fieldName=input.name;
      select.id=inputId;select.autocomplete='address-level1';select.hidden=true;input.after(select);
      const paint=(preserve=false)=>{
        let provinces;try{provinces=JSON.parse(country.selectedOptions[0]?.dataset.provinces||'null');}catch(_){provinces=null;}
        select.replaceChildren();if(container)container.hidden=false;
        if(!Array.isArray(provinces)||!provinces.every(x=>Array.isArray(x)&&x.length>=2)){select.hidden=true;select.disabled=true;select.removeAttribute('name');select.removeAttribute('id');input.id=inputId;input.hidden=false;input.disabled=false;input.name=fieldName;return;}
        input.removeAttribute('id');input.hidden=true;input.disabled=true;select.id=inputId;
        if(!provinces.length){if(container)container.hidden=true;select.hidden=true;select.disabled=true;select.removeAttribute('name');return;}
        for(const pair of provinces){if(!Array.isArray(pair)||pair.length<2)continue;const option=document.createElement('option');option.value=String(pair[0]);option.textContent=String(pair[1]);select.append(option);}
        select.hidden=false;select.disabled=false;select.name=fieldName;
        if(preserve){const saved=[...select.options].find(x=>x.value===input.value||x.textContent===input.value);if(saved)select.value=saved.value;}
      };
      paint(true);on(country,'change',()=>paint(false));on(form,'reset',()=>queueMicrotask(()=>{if(!abort.signal.aborted)paint(true);}));
      cleanups.push(()=>{if(container)container.hidden=false;if(!select.disabled)input.value=select.value;select.remove();input.id=inputId;input.hidden=false;input.disabled=false;input.name=fieldName;});
    });
    instances.set(root,()=>{abort.abort();cleanups.forEach(fn=>fn());root.querySelectorAll('[data-qtm-addresses-add-panel],[data-qtm-addresses-edit-panel]').forEach(x=>x.hidden=false);root.querySelectorAll('[data-qtm-addresses-add-toggle],[data-qtm-addresses-add-close],[data-qtm-addresses-edit-toggle],[data-qtm-addresses-edit-close]').forEach(x=>{x.hidden=true;x.setAttribute('aria-expanded','false');});instances.delete(root);});
  }
  const scan=scope=>{if(scope.matches?.(selector))mount(scope);scope.querySelectorAll?.(selector).forEach(mount);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});else scan(document);
  document.addEventListener('shopify:section:load',e=>scan(e.target));
  document.addEventListener('shopify:section:unload',e=>{for(const[root,dispose]of instances)if(root===e.target||e.target.contains(root))dispose();});
})();
