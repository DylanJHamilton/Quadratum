const assert=require('node:assert/strict'),fs=require('node:fs'),f=require('../phase4/support/commerce.cjs');
(async()=>{
  const data=JSON.parse(f.read('docs/ultima/documentation-coverage-20261018.json'));
  assert.equal(data.module_files.length,data.modules);
  let count=0;
  for(const file of data.module_files){const module=JSON.parse(f.read('assets/'+file));assert(module.steps.length);for(const control of [...module.settings,...module.blocks.flatMap(b=>b.settings||[])])if(control.id){assert(control.label&&control.how,file+': every control has instructions');count++;}}
  assert.equal(count,data.documented_controls);
  let d=f.dom(await f.render('documentation-hub')),w=d.window,doc=w.document,requests=[];
  w.fetch=async(url,{signal})=>{requests.push({url,signal});return{ok:true,json:async()=>JSON.parse(f.read(url.replace(/^\/assets\//,'assets/')))}};
  f.boot(w,['documentation-hub.js']);assert.equal(doc.querySelectorAll('[data-doc-list] a').length,data.modules);
  doc.querySelector('[data-doc-search]').value='Main search';doc.querySelector('[data-doc-search]').dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(doc.querySelectorAll('[data-doc-list] a').length,1);
  doc.querySelector('[data-doc-list] a').click();await f.drain();assert(doc.querySelector('[data-doc-guide]').hidden);assert(doc.querySelector('[data-doc-detail]').textContent.includes('Product filters'));assert.equal(requests.length,1);
  doc.querySelector('[data-doc-start]').click();assert(!doc.querySelector('[data-doc-guide]').hidden);
  doc.querySelector('[data-doc-search]').value='';doc.querySelector('[data-doc-type]').value='settings';doc.querySelector('[data-doc-type]').dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(doc.querySelectorAll('[data-doc-list] a').length,data.theme_setting_groups);
  const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);
  doc.querySelector('[data-documentation-hub]').dispatchEvent(new w.CustomEvent('shopify:section:unload',{bubbles:true}));doc.querySelector('[data-documentation-hub]').dispatchEvent(new w.CustomEvent('shopify:section:load',{bubbles:true}));assert.equal(doc.querySelectorAll('[data-doc-list] a').length,data.theme_setting_groups);
  d.window.close();
  d=f.dom(await f.render('theme-support'));for(const field of d.window.document.querySelectorAll('input:not([type=hidden]),textarea,select'))assert(d.window.document.querySelector(`label[for="${field.id}"]`));assert(!d.window.document.querySelector('[type=file]'),'native contact form does not pretend to accept unsupported attachments');d.window.close();
  console.log('PASS documentation: every schema control mapped to instructions; searchable and filtered catalog; on-demand guide loading; native links, guide return, unique controls, duplicate boot/editor reload; labeled native support fields. Email delivery/public availability are separate gates.');
})().catch(e=>{console.error(e);process.exitCode=1;});
