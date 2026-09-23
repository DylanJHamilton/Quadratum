(() => {
  if(window.qtmMainCartReady)return;window.qtmMainCartReady=true;
  const instances=new WeakMap(),selector='[id^="QtmMainCart-"]';
  const each=(scope,fn)=>{if(scope.matches?.(selector))fn(scope);scope.querySelectorAll(selector).forEach(fn)};
  function init(root){
    if(instances.has(root))return;
    const lifecycle=new AbortController();let pending;
    root.querySelectorAll('[data-qty-decrease],[data-qty-increase]').forEach(button=>button.hidden=false);
    const status=root.querySelector('[data-cart-live-region]');
    const valid=(input,quantity)=>Number.isInteger(quantity)&&(quantity===0?input.closest('[data-cart-item]')?.dataset.canRemove!=='false':quantity>=Number(input.min||1)&&(!input.max||quantity<=Number(input.max))&&(quantity-Number(input.min||1))%Number(input.step||1)===0);
    async function update(input,quantity){
      if(pending||!input?.dataset.key)return;
      if(!valid(input,quantity)){input.reportValidity();if(status)status.textContent='Enter a quantity that meets the product minimum, maximum and increment.';return;}
      const request=new AbortController();pending=request;root.setAttribute('aria-busy','true');if(status)status.textContent='Updating cart…';
      const fields=[...root.querySelectorAll('.qtm-cart-line-item__qty-input')].map(field=>[field,field.readOnly]);
      const buttons=[...root.querySelectorAll('button')].map(button=>[button,button.disabled]);
      fields.forEach(([field])=>field.readOnly=true);buttons.forEach(([button])=>button.disabled=true);
      try{
        const response=await fetch(root.dataset.changeUrl,{method:'POST',credentials:'same-origin',signal:request.signal,headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({id:input.dataset.key,quantity})});
        let result;try{result=await response.json()}catch{}
        if(!response.ok)throw Error(result?.description||'Unable to update cart.');
        if(lifecycle.signal.aborted)return;
        if(status)status.textContent=quantity===0?'Item removed from cart.':'Cart updated.';
        window.location.reload();
      }catch(error){if(!lifecycle.signal.aborted){if(status)status.textContent=error.message;input.value=input.dataset.currentQuantity||input.defaultValue;}}
      finally{if(pending===request)pending=null;fields.forEach(([field,original])=>field.readOnly=original);buttons.forEach(([button,original])=>button.disabled=original);if(!lifecycle.signal.aborted)root.removeAttribute('aria-busy');}
    }
    root.addEventListener('click',event=>{
      const control=event.target.closest('[data-qty-decrease],[data-qty-increase],[data-cart-remove]');if(!control)return;
      const item=control.closest('[data-cart-item]'),input=item?.querySelector('.qtm-cart-line-item__qty-input');if(!input)return;
      const ajax=window.QuadratumSettings?.cart?.ajaxDrawerEnabled===true;
      if(control.matches('[data-cart-remove]')){if(ajax){event.preventDefault();update(input,0);}return;}
      event.preventDefault();if(pending||input.readOnly)return;
      const min=Number(input.min||1),step=Number(input.step||1),current=input.valueAsNumber;
      let quantity=control.matches('[data-qty-increase]')?current+step:current-step;
      if(quantity<min)quantity=ajax?0:min;
      if(!valid(input,quantity))return;
      input.value=String(quantity);if(ajax)update(input,quantity);
    },{signal:lifecycle.signal});
    root.addEventListener('change',event=>{if(event.target.matches('.qtm-cart-line-item__qty-input')&&!event.target.readOnly&&window.QuadratumSettings?.cart?.ajaxDrawerEnabled===true)update(event.target,event.target.valueAsNumber);},{signal:lifecycle.signal});
    root.addEventListener('submit',event=>{if(pending)event.preventDefault();},{signal:lifecycle.signal});
    // Add-on forms use the existing global native/AJAX cart contract; never retry a failed POST via native submission.
    instances.set(root,()=>{lifecycle.abort();pending?.abort()});
  }
  document.addEventListener('shopify:section:load',event=>each(event.target,init));
  document.addEventListener('shopify:section:unload',event=>each(event.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
