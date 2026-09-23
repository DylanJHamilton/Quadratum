const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
const cards = 'interactive-content-helper-cards', portfolio = 'interactive-content-helper-portfolio-grid';
const escape = x => String(x ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
f.engine.registerFilter('image_tag', (src, ...args) => { const values = Object.fromEntries(args.filter(Array.isArray)); return `<img src="${escape(src)}" width="800" height="600" class="${escape(values.class)}" alt="${escape(values.alt)}">`; });
const samples = {
 [cards]: [0, 1, 2].map(i => ({type:'card',settings:{title:'Card <'+i+'>',subtitle:'Subtitle <safe>',body:'<p>Read <a href="/fr/pages/inside">inside</a></p>',icon:'<icon>',image:f.photo(),badge:'Badge <safe>',cta_label:'Read <safe>',cta_url:'/fr/pages/card?a=1&b=2',back_title:'Back <safe>',back_body:'<p>Back <a href="/fr/pages/back-inner">inside</a></p>',back_cta_label:'Back link',back_cta_url:'/fr/pages/back',phase_label:'Phase <safe>',step_number:'<1>'}})),
 [portfolio]: [0, 1, 2].map(i => ({type:'project',settings:{title:'Project <'+i+'>',image:f.photo(),category:i?'Design':' design ',short_description:'<p>Details <a href="/fr/pages/inside">inside</a></p>',project_url:'/fr/pages/project?a=1&b=2'}}))
};
async function markup(name, settings={}, blocks=samples[name], id='one', design=false) {
 return '<div id="shopify-section-'+id+'">'+await f.render(name,{id,settings,blocks,data:{request:{design_mode:design}}})+'</div>';
}
function inspect(html, fn) { const d=f.dom(html);try{fn(d.window.document);}finally{d.window.close();} }
function scope(doc, prefix) {
 const walk=rules=>{for(const r of rules){if(r.selectorText) for(const selector of r.selectorText.split(/,(?![^()]*\))/)) assert.ok(selector.trim().startsWith(prefix),selector);if(r.cssRules)walk(r.cssRules);}};
 for(const sheet of doc.styleSheets)walk(sheet.cssRules);
}
function harness(html, options={}) {
 const d=f.dom(html),w=d.window,queries=new Map();
 w.Shopify={designMode:!!options.design};
 w.matchMedia=q=>{
  if(!queries.has(q))queries.set(q,{matches:q.includes('749')?!!options.mobile:q.includes('reduce')?!!options.reduced:!!options.hover,listeners:new Set(),addEventListener(_,fn){this.listeners.add(fn)},removeEventListener(_,fn){this.listeners.delete(fn)},set(value){this.matches=value;for(const fn of this.listeners)fn();}});
  return queries.get(q);
 };
 f.boot(w,['interactive-content-cards.js']);return {d,w,queries};
}
(async()=>{
 for(const name of [cards,portfolio]){
  const schema=f.unpack(name).schema;
  for(const preset of schema.presets) inspect(await markup(name,preset.settings,preset.blocks||[],'preset',true),doc=>assert.ok(doc.querySelector('section,[role=status]')));
  for(const setting of schema.settings){
   const values=setting.options?.map(x=>x.value)||(setting.type==='range'?[setting.min,setting.max]:setting.type==='checkbox'?[false,true]:[]);
   for(const value of values)inspect(await markup(name,{[setting.id]:value}),doc=>{assert.ok(doc.querySelector('section'));assert.doesNotMatch(doc.body.innerHTML,/Liquid error|NaN|undefined/);});
  }
  for(const blocks of [[],[{type:'unrelated',settings:{}}]]){
   inspect(await markup(name,{},blocks),doc=>assert.equal(doc.querySelector('section'),null));
   inspect(await markup(name,{},blocks,'empty',true),doc=>assert.ok(doc.querySelector('[role=status]')));
  }
  inspect(await markup(name,{},undefined,'first')+await markup(name,{},undefined,'second'),doc=>{const ids=[...doc.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length);});
 }
 for(const layout of ['grid','row','stacked_timeline'])for(const variant of ['icon_card','image_box','flip_box','stacked_card'])for(const click of ['cta_only','whole_card_if_link']) inspect(await markup(cards,{layout_mode:layout,card_variant:variant,card_click_behavior:click}),doc=>{
  assert.equal(doc.querySelectorAll('.q-ce__card').length,3,'one native card per block, no parser split from nested anchors');
  assert.equal(doc.querySelectorAll('.q-ce__body a').length,3);assert.equal(doc.querySelector('a a,a button'),null);assert.equal(doc.querySelectorAll('a.q-ce__card').length,0,'rich-text links keep their own valid destinations');
  assert.equal(doc.querySelector('h3').textContent,'Card <0>'); if(doc.querySelector('.q-ce__icon'))assert.equal(doc.querySelector('.q-ce__icon').textContent,'<icon>');
  if(variant==='flip_box'){assert.equal(doc.querySelectorAll('.q-ce__flipbtn').length,3);assert.equal(doc.querySelectorAll('.q-ce__back a').length,6);assert.equal(doc.querySelector('[inert],[hidden]'),null,'no-JS faces remain available');}
  if(layout==='row')assert.equal(doc.querySelector('.q-ce__rail').tabIndex,0);
  if(variant==='image_box')assert.equal(doc.querySelector('img').alt,'Photo <safe>');scope(doc,'#q-ce-one');
 });
 inspect(await markup(cards,{card_click_behavior:'whole_card_if_link'},[{type:'card',settings:{body:'<p>Plain body</p>',cta_url:'/fr/pages/card',cta_label:'Go'}}]),doc=>assert.equal(doc.querySelectorAll('a.q-ce__card').length,1));
 inspect(await markup(cards,{show_header:true,heading:'',subheading:'',use_custom_colors:true,color_text:'#123456',card_shadow:0,columns_mobile:3}),doc=>{assert.equal(doc.querySelector('header'),null);assert.equal(doc.querySelector('.q-ce').style.getPropertyValue('--q-ce-text').trim(),'#123456');assert.equal(doc.querySelector('.q-ce').style.getPropertyValue('--q-ce-shadow').trim(),'0');assert.equal(doc.querySelector('.q-ce__rail').style.getPropertyValue('--q-ce-cols-m').trim(),'3');});
 for(const layout of ['grid','masonry'])inspect(await markup(portfolio,{layout,show_category_filters:true,show_view_more_button:true,view_more_url:'/fr/pages/work?a=1&b=2'}),doc=>{
  assert.equal(doc.querySelectorAll('.q-portfolio__card').length,3);assert.equal(doc.querySelectorAll('.q-portfolio__project-link').length,3);assert.equal(doc.querySelectorAll('.q-portfolio__desc a').length,3);assert.equal(doc.querySelector('a a'),null);assert.equal(doc.querySelector('.q-portfolio__project-link').getAttribute('href'),'/fr/pages/project?a=1&b=2');
  assert.equal(doc.querySelectorAll('.q-portfolio__chip').length,1);assert.equal(doc.querySelector('img').alt,'Photo <safe>');assert.equal(doc.querySelector('h3').textContent,'Project <0>');scope(doc,'#q-portfolio-one');
 });
 inspect(await markup(portfolio,{category_opacity:3,pad_y:0,shadow_strength:0,use_custom_colors:true,card_bg:'#123456'},[{type:'project',settings:{title:'',project_url:'/fr/pages/one',image:'',short_description:'',category:''}}]),doc=>{assert.equal(doc.querySelector('.q-portfolio__project-link').textContent,'View project');const s=doc.querySelector('.q-portfolio').style;assert.equal(s.getPropertyValue('--q-portfolio-cat-opacity').trim(),'1');assert.equal(s.getPropertyValue('--q-portfolio-pad-y').trim(),'0px');assert.equal(s.getPropertyValue('--q-portfolio-card-shadow').trim(),'0');assert.equal(s.getPropertyValue('--q-portfolio-cols-d').trim(),'1');assert.equal(s.getPropertyValue('--q-portfolio-card-bg').trim(),'#123456');});
 assert.equal(f.unpack(portfolio).schema.settings.some(s=>s.type==='color_scheme'),false,'no unbacked scheme control');
 const html=await markup(cards,{card_variant:'flip_box',flip_trigger:'click',flip_mobile_fallback:'stack_back_content'});
 let h=harness(html),doc=h.w.document,card=doc.querySelector('.q-ce__card'),button=card.querySelector('button'),front=card.querySelector('.q-ce__front'),back=card.querySelector('.q-ce__back');
 assert.equal(back.inert,true);assert.equal(front.inert,false);assert.equal(button.getAttribute('aria-controls'),back.id);button.click();assert.equal(back.inert,false);assert.equal(front.inert,true);assert.equal(button.getAttribute('aria-expanded'),'true');
 const backLink=back.querySelector('a');backLink.focus();backLink.dispatchEvent(new h.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(doc.activeElement,button);assert.equal(back.inert,true);
 h.queries.get('(max-width: 749px)').set(true);assert.equal(card.classList.contains('q-ce__card--enhanced'),false);assert.equal(front.inert,false);assert.equal(back.inert,false);h.queries.get('(max-width: 749px)').set(false);assert.equal(back.inert,true);h.queries.get('(prefers-reduced-motion: reduce)').set(true);assert.equal(back.inert,false);h.d.window.close();
 for(const opts of [{mobile:true},{reduced:true},{design:true}]){h=harness(html,opts);assert.equal(h.w.document.querySelector('.q-ce__card--enhanced'),null);assert.equal(h.w.document.querySelector('[aria-hidden="true"].q-ce__back'),null);h.d.window.close();}
 h=harness(await markup(cards,{card_variant:'flip_box',flip_trigger:'hover',flip_mobile_fallback:'enable_flip'}),{hover:true,mobile:true});card=h.w.document.querySelector('.q-ce__card');card.dispatchEvent(new h.w.Event('pointerenter'));assert.ok(card.classList.contains('is-flipped'));card.querySelector('.q-ce__back a').focus();card.dispatchEvent(new h.w.Event('pointerleave'));assert.ok(card.classList.contains('is-flipped'),'do not hide focused links');card.querySelector('button').click();assert.equal(card.classList.contains('is-flipped'),false);h.d.window.close();
 h=harness(html+await markup(cards,{card_variant:'flip_box'},undefined,'two'));doc=h.w.document;const root=doc.getElementById('shopify-section-one');const old=root.querySelector('button');root.dispatchEvent(new h.w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(root.querySelector('.q-ce__card--enhanced'),null);assert.equal(doc.querySelectorAll('.q-ce__card--enhanced').length,3);old.click();assert.equal(old.getAttribute('aria-expanded'),'false');root.dispatchEvent(new h.w.CustomEvent('shopify:section:load',{bubbles:true}));old.click();assert.equal(old.getAttribute('aria-expanded'),'true','duplicate boot and reload attach exactly one click handler');for(const query of h.queries.values())assert.ok(query.listeners.size<=2);h.d.window.close();
 console.log('PASS native Cards/Portfolio settings and preset endpoints, all layout/variant/link combinations, named empty states, RTE destinations, native images, custom colors/zero values, scoped bounds, unique identities, no-JS faces, keyboard flip/focus/inert state, hover/mobile/reduced-motion/editor fallback and disposable multiple-instance reload. Browser and Shopify acceptance remain queued.');
})().catch(error=>{console.error(error);process.exitCode=1;});
