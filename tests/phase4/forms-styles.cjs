const assert=require('node:assert/strict'),postcss=require('postcss'),f=require('./support/forms.cjs');
const names=['call-to-action-quote-form','call-to-action-newsletter-form','form-quote-full','form-compact','form-support-request','form-newsletter','form-waitlist','form-search','3rd-party-bulk-ordering','3rd-party-crm-lead-capture-form'];
const files=['assets/forms-sections.css','assets/call-to-action-quote-form.css'];
const sources=files.map(file=>f.read(file)),asts=sources.map(source=>postcss.parse(source));
const product={...f.product,variants_count:3};
(async()=>{
 const html=await Promise.all(names.map((name,i)=>f.host(name,{id:'styles-'+i,data:{product},settings:{show_first_name:true}})));
 let checks=0;
 for(const ordered of [sources,[...sources].reverse()]){
  // Both assets appear after each host's inline rules, as happens with later inserted sections.
  const d=f.dom(html.join('')+'<style>'+ordered.join('\n')+'</style>'),w=d.window,doc=w.document;
  for(let i=0;i<names.length;i++){
   const root=doc.getElementById('styles-'+i)||doc.getElementById('section-styles-'+i)||doc.querySelector('[data-section-id="styles-'+i+'"]')||doc.querySelector('#q-crm-lead-styles-'+i)||doc.querySelector('#shopify-section-styles-'+i);
   // Find each actual rendered form by its descendants when a legacy host uses its own ID pattern.
   const form=root?.querySelector('form')||[...doc.querySelectorAll('form')].find(form=>form.id.includes('styles-'+i)||[...form.querySelectorAll('[id]')].some(el=>el.id.includes('styles-'+i)));
   assert(form,names[i]+' renders a form');
   for(const input of form.querySelectorAll('input[type=checkbox],input[type=radio]')){assert.notEqual(w.getComputedStyle(input).width,'100%',names[i]+' native choice control');checks++;}
   for(const input of form.querySelectorAll('input.q-input:not([type=checkbox]):not([type=radio]),select.q-select,textarea.q-textarea')){assert.equal(w.getComputedStyle(input).boxSizing,'border-box',names[i]+' bounded text control');checks++;}
   for(const field of form.querySelectorAll('.q-field')){assert.notEqual(w.getComputedStyle(field).minWidth,'220px',names[i]+' no fixed minimum field width');checks++;}
  }
  // Generic forms rules must not cross into CTA hosts, even if loaded last.
  for(const root of doc.querySelectorAll('section.q-cta-quote-form:not(.q-form)'))asts[0].walkRules(rule=>{for(const selector of rule.selectors){if(selector.includes('::'))continue;const hits=[...root.querySelectorAll(selector)];assert.equal(hits.length,0,'shared stylesheet crossed CTA scope: '+selector);}});
  for(const root of doc.querySelectorAll('section.q-form'))asts[1].walkRules(rule=>{for(const selector of rule.selectors){if(selector.includes('::'))continue;const hits=[...root.querySelectorAll(selector)];assert.equal(hits.length,0,'CTA stylesheet crossed shared-form scope: '+selector);}});
  // Legacy Bulk Ordering uses DIV.q-input wrappers; only its native control may receive text-input chrome.
  for(const wrapper of doc.querySelectorAll('.q-form--bulk-order div.q-input'))asts[0].walkRules(rule=>{if(!rule.nodes.some(d=>d.prop==='border'&&d.value.includes('solid')))return;for(const selector of rule.selectors){if(selector.includes('::'))continue;assert(!wrapper.matches(selector),'text-input chrome matched wrapper: '+selector)}});
  d.window.close();
 }
 // Native hidden field payload remains submitted while its layout row is absent.
 const d=f.dom(await f.host('form-newsletter',{blocks:[f.field('email','email'),f.field('metadata','hidden',{name_attr:'source_code',default_value:'kept'})]})+'<style>'+sources.join('\n')+'</style>');const input=d.window.document.querySelector('[name="contact[source_code]"]');assert.equal(d.window.getComputedStyle(input.parentElement).display,'none');assert.equal(new d.window.FormData(input.form).get('contact[source_code]'),'kept');d.window.close();
 // Forced-colour fallback restores the browser's select affordance even for the CTA custom chevron.
 for(const ast of asts){let nativeSelect=false;ast.walkAtRules('media',media=>{if(!media.params.includes('forced-colors'))return;media.walkDecls('appearance',decl=>{if(decl.value==='auto'&&decl.important)nativeSelect=true})});assert(nativeSelect);}
 console.log('PASS shared forms CSS: '+checks+' actual consumer control/field checks across both asset orders, all eight form hosts plus legacy Bulk/CRM; CTA scope isolation, native choice sizing, wrapper chrome exclusion, hidden payload layout and forced-colour select fallback. JSDOM/source checks are not pixel/browser certification; full B7 host reviews remain pending.');
})().catch(e=>{console.error(e);process.exit(1)});
