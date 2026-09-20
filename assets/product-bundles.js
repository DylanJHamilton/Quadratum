(() => {
  if(window.qtmBundlesReady)return;window.qtmBundlesReady=true;
  const instances=new WeakMap(),selector='[data-product-bundles]';
  const each=(scope,fn)=>{if(scope.matches?.(selector))fn(scope);scope.querySelectorAll(selector).forEach(fn)};
  function init(root){
    if(instances.has(root))return;
    const lifecycle=new AbortController();let busy=false,pending;
    const node=name=>root.querySelector(`[id="Qtm${name}-${root.dataset.sectionId}"]`);
    const btn=node('BundleAdd'),ok=node('MsgOk'),error=node('MsgErr'),cards=[...root.querySelectorAll('.qtm-item[data-variant-id]')];
    if(!btn)return;
    function money(cents){
      const format=root.dataset.moneyFormat||'',currency=root.dataset.currency||root.dataset.baseCurrency||'USD';
      const token=format.match(/\{\{\s*(amount(?:_\w+)?)\s*\}\}/);
      if(currency===root.dataset.baseCurrency && token){
        const style=token[1],decimals=style.includes('no_decimals')?0:2;
        const group=style.includes('space')?' ':style.includes('comma_separator')?'.':style.includes('apostrophe')?"'":',';
        const separator=style.includes('comma_separator')||style==='amount_with_space_separator'?',':'.';
        const parts=(cents/100).toFixed(decimals).split('.');parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,group);
        return format.replace(token[0],parts.join(separator))+(root.dataset.showCurrency==='true'?' '+currency:'');
      }
      return new Intl.NumberFormat(document.documentElement.lang||undefined,{style:'currency',currency,currencyDisplay:root.dataset.showCurrency==='true'?'code':'symbol'}).format(cents/100);
    }
    function message(target,text){if(ok)ok.style.display='none';if(error)error.style.display='none';if(target){target.textContent=text;target.style.display=text?'block':'none';}}
    function items(){return cards.map(card=>{
      const input=card.querySelector('.qtm-item-qty'),include=card.querySelector('.qtm-include'),available=card.dataset.available==='true',requires=card.dataset.requiresPlan==='true';
      const min=Number(card.dataset.min),max=card.dataset.max?Number(card.dataset.max):Infinity,step=Number(card.dataset.step),qty=Number(input?input.value:card.dataset.qty);
      const included=!requires&&!(root.dataset.disableUnavailable==='true'&&!available)&&(card.dataset.optional!=='true'||Boolean(include?.checked));
      const valid=/^\d+$/.test(card.dataset.variantId)&&available&&Number.isInteger(qty)&&qty>=min&&qty<=max&&step>0&&(qty-min)%step===0;
      return{card,input,id:card.dataset.variantId,quantity:qty,min,max,step,included,valid,price:Number(card.dataset.price),compare:Number(card.dataset.compare)||0};
    });}
    function selected(){
      const list=items().filter(item=>item.included),groups=new Map();
      for(const item of list){if(!groups.has(item.id))groups.set(item.id,{...item});else groups.get(item.id).quantity+=item.quantity;}
      const valid=list.every(item=>item.valid&&Number.isFinite(item.price))&&[...groups.values()].every(item=>item.quantity<=item.max&&(item.quantity-item.min)%item.step===0);
      return{list,groups,valid};
    }
    function draw(){
      const {list,valid}=selected();let count=0,total=0,compare=0;
      for(const item of list){if(!item.valid)continue;count+=item.quantity;total+=item.price*item.quantity;compare+=Math.max(item.compare,item.price)*item.quantity;}
      const countNode=node('BundleCount'),subtotal=node('BundleSubtotal'),compareNode=node('BundleCompare'),savings=node('BundleSavings');
      if(countNode)countNode.textContent=String(count);if(subtotal)subtotal.textContent=money(total);if(compareNode)compareNode.textContent=money(compare);
      if(savings)savings.textContent=compare>total?(root.dataset.savingsPrefix||'')+money(compare-total):(root.dataset.savingsDefault||'');
      btn.disabled=busy||!count||!valid;
      if(!busy)message(error,!valid?'Choose available items and quantities that meet their minimum, maximum and increment.':'');
    }
    for(const card of cards){
      const unavailable=card.dataset.available!=='true',requires=card.dataset.requiresPlan==='true';
      if(requires||(unavailable&&root.dataset.disableUnavailable==='true')){
        const include=card.querySelector('.qtm-include');if(include){include.checked=false;include.disabled=true;}
        const qty=card.querySelector('.qtm-item-qty');if(qty)qty.disabled=true;card.style.opacity='.65';
      }
    }
    root.querySelector('[data-bundle-summary]')?.removeAttribute('hidden');btn.hidden=false;
    root.addEventListener('input',draw,{signal:lifecycle.signal});root.addEventListener('change',draw,{signal:lifecycle.signal});
    btn.addEventListener('click',async()=>{
      if(busy)return;
      const {list,groups,valid}=selected();
      if(!list.length||!valid){message(error,root.dataset.noItems||'Choose available bundle items.');list.find(item=>!item.valid)?.input?.reportValidity();return;}
      busy=true;btn.disabled=true;root.setAttribute('aria-busy','true');message(error,'');
      const request=new AbortController();pending=request;
      try{
        const response=await fetch(root.dataset.addUrl,{method:'POST',credentials:'same-origin',signal:request.signal,headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({items:[...groups.values()].map(item=>({id:item.id,quantity:item.quantity}))})});
        let result;try{result=await response.json()}catch{}
        if(!response.ok)throw Error(result?.description||root.dataset.error||'Unable to add bundle.');
        if(lifecycle.signal.aborted)return;
        message(ok,root.dataset.success||'Added to cart.');
        const cart=window.QuadratumSettings?.cart;
        if(root.dataset.redirect==='true'||!cart?.ajaxDrawerEnabled){location.assign(root.dataset.cartUrl);return;}
        // A successful add must not be reported as a failed purchase if refreshing the drawer fails.
        try { if(cart.openAfterAdd)await window.QuadratumCartDrawer?.open(btn);else await window.QuadratumCartDrawer?.refresh(); }
        catch { const link=document.createElement('a');link.href=root.dataset.cartUrl;link.textContent='View cart';ok?.append(' ',link); }
      }catch(e){if(!lifecycle.signal.aborted)message(error,e.message||root.dataset.error);}
      finally{busy=false;if(!lifecycle.signal.aborted){root.removeAttribute('aria-busy');btn.disabled=!selected().valid||!selected().list.length;}}
    },{signal:lifecycle.signal});
    instances.set(root,()=>{lifecycle.abort();pending?.abort()});draw();
  }
  document.addEventListener('shopify:section:load',event=>each(event.target,init));
  document.addEventListener('shopify:section:unload',event=>each(event.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
