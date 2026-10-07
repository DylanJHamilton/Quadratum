/* Collection comparison built from server-rendered product data. */
(() => {
  if (customElements.get('q-collection-compare')) return;
  customElements.define('q-collection-compare', class extends HTMLElement {
    connectedCallback() {
      const root = this.closest('section'); if (!root) return;
      this.life?.abort(); this.life = new AbortController();
      const on = (el,type,fn) => el.addEventListener(type,fn,{signal:this.life.signal});
      const selected = new Map(), limit = Math.max(2,Math.min(4,Number(this.dataset.limit)||3));
      const tray = this.querySelector('[data-qcm-compare]'), dialog = this.querySelector('dialog');
      const open = this.querySelector('[data-qcm-compare-open]'), status = this.querySelector('[data-qcm-compare-status]');
      const update = () => {
        root.querySelectorAll('[data-qcm-compare-toggle]').forEach(input => { input.closest('label').hidden = false; input.checked = selected.has(input.value); });
        tray.hidden = selected.size === 0; open.disabled = selected.size < 2;
        this.querySelector('[data-qcm-compare-count]').textContent = selected.size;
        const links = this.querySelector('[data-qcm-selected-links]'); links.replaceChildren();
        selected.forEach(p => { const link = document.createElement('a'); link.href=p.url; link.textContent=p.title; links.append(link); });
      };
      on(root,'change',event => {
        const input=event.target.closest('[data-qcm-compare-toggle]'); if (!input) return;
        if (!input.checked) selected.delete(input.value);
        else if (selected.size >= limit) { input.checked=false; status.textContent=`Compare up to ${limit} products. Remove one before adding another.`; return; }
        else {
          try { const data=JSON.parse(input.closest('.q-product-card').querySelector('[data-qcm-product]').textContent); selected.set(input.value,data); }
          catch { input.checked=false; status.textContent='This product could not be added to comparison.'; return; }
        }
        status.textContent=`${selected.size} products selected.`; update();
      });
      on(this.querySelector('[data-qcm-compare-clear]'),'click',()=>{selected.clear();update();status.textContent='Comparison cleared.';root.querySelector('[data-qcm-compare-toggle]')?.focus();});
      on(this.querySelector('[data-qcm-compare-close]'),'click',()=>dialog.close());
      on(dialog,'close',()=>open.focus());
      on(open,'click',()=>{
        if(selected.size<2)return;
        const products=[...selected.values()],head=dialog.querySelector('thead'),body=dialog.querySelector('tbody');head.replaceChildren();body.replaceChildren();
        const row=document.createElement('tr'),blank=document.createElement('th');blank.textContent='Product';blank.scope='col';row.append(blank);
        products.forEach(p=>{const th=document.createElement('th');th.scope='col';if(p.image){const img=document.createElement('img');img.src=p.image;img.alt=p.title;th.append(img);}const a=document.createElement('a');a.href=p.url;a.textContent=p.title;th.append(a);row.append(th);});head.append(row);
        const addRow=(label,values)=>{const tr=document.createElement('tr'),th=document.createElement('th');th.scope='row';th.textContent=label;tr.append(th);values.forEach(v=>{const td=document.createElement('td');td.textContent=typeof v==='object'?JSON.stringify(v):String(v||'—');tr.append(td);});body.append(tr);};
        addRow('Price',products.map(p=>p.price));addRow('Product type',products.map(p=>p.type));
        const options=(products[0].options||[]).filter(o=>o.name!=='Title'&&products.every(p=>(p.options||[]).some(x=>x.name===o.name)));
        options.forEach(o=>addRow(o.name,products.map(p=>p.options.find(x=>x.name===o.name).values.join(', '))));
        Object.keys(products[0].specs||{}).filter(Boolean).slice(0,3).forEach(key=>addRow(key.replace(/_/g,' '),products.map(p=>p.specs?.[key])));
        dialog.showModal();this.querySelector('[data-qcm-compare-close]').focus();
      });
      this.observer=new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('[data-qcm-compare-toggle]')||n.querySelector?.('[data-qcm-compare-toggle]')))))update();});
      this.observer.observe(root,{childList:true,subtree:true}); update();
    }
    disconnectedCallback(){this.life?.abort();this.observer?.disconnect();this.querySelector('dialog')?.close();}
  });
})();
