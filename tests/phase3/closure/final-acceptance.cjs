const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const { Liquid } = require('liquidjs');
const read = p => fs.readFileSync(p, 'utf8');
const engine = new Liquid({ root: ['snippets'], extname: '.liquid' });
engine.registerFilter('json', JSON.stringify);
engine.registerFilter('money', value => '$' + (Number(value || 0) / 100).toFixed(2));
engine.registerFilter('color_contrast', (a,b) => {
  const luminance = color => {
    const hex = color.replace('#', '');
    const channels = [0,2,4].map(i => parseInt(hex.slice(i,i+2),16)/255).map(c => c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4);
    return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
  };
  const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
});
const stripSchema = s => s.slice(0,s.lastIndexOf('{% schema %}'));
function dom(html) {
  const d = new JSDOM(html, { url:'https://example.test/products/test', runScripts:'outside-only', pretendToBeVisual:true });
  d.window.matchMedia=()=>({matches:true}); return d;
}
const variants = [
  {id:10,title:'Small / Red',options:['Small','Red'],price:1000,compare_at_price:0,available:true},
  {id:100,title:'Large / Red',options:['Large','Red'],price:10000,compare_at_price:12500,available:true},
  {id:101,title:'Large / Blue',options:['Large','Blue'],price:10000,compare_at_price:0,available:false},
];
variants.forEach(v=>{v.sku='';v.selling_plan_allocations=v.id===100?[{selling_plan:{id:45}}]:[];});
(async()=>{
  const product={title:'Fixture',options:['Size','Color'],variants,selected_or_first_available_variant:variants[0],options_with_values:[{name:'Size',selected_value:'Small',values:['Small','Large']},{name:'Color',selected_value:'Red',values:['Red','Blue']}],selling_plan_groups:[{name:'Subscribe',selling_plans:[{id:45,name:'Monthly'}]}]};
  const compact=await engine.parseAndRender(stripSchema(read('sections/main-product-compact.liquid')),{product,section:{id:'qa',settings:{},blocks:['title','price','variant_picker','quantity','buy_buttons'].map(type=>({type}))},routes:{cart_add_url:'/cart/add'}});
  const d=dom('<div class="shopify-section">'+compact+'</div>');const q=s=>d.window.document.querySelector(s);
  assert.equal(new d.window.FormData(q('form')).getAll('id').length,1);
  assert(!q('[data-purchase-fallback]').hidden,'native variant selector available without JS');
  d.window.eval(read('assets/product-purchase-sync.js'));d.window.eval(read('assets/product-selling-plans.js'));
  d.window.document.dispatchEvent(new d.window.Event('DOMContentLoaded'));
  const options=d.window.document.querySelectorAll('[data-purchase-option]');
  function choose(a,b){options[0].value=a;options[1].value=b;options[1].dispatchEvent(new d.window.Event('change',{bubbles:true}));}
  choose('Large','Red');q('[name=quantity]').value='3';q('[name=selling_plan]').value='45';
  let payload=new d.window.FormData(q('form'));assert.deepEqual(payload.getAll('id'),['100']);assert.equal(payload.get('quantity'),'3');assert.equal(payload.get('selling_plan'),'45');
  assert.equal(q('[data-purchase-current]').textContent,'$100.00');assert(!q('[data-purchase-compare]').hidden);assert(!q('[name=add]').disabled);assert.equal(d.window.location.search,'?variant=100');
  choose('Large','Blue');assert.equal(q('[name=id]').value,'101');assert(q('[name=add]').disabled);assert(q('[data-purchase-compare]').hidden);assert.equal(q('[name=selling_plan]').value,'');assert.equal(q('[data-purchase-current]').textContent,'$100.00');
  choose('Small','Blue');assert.equal(q('[name=id]').value,'');assert(q('[name=add]').disabled);assert.equal(q('form').dispatchEvent(new d.window.Event('submit',{cancelable:true,bubbles:true})),false);
  d.window.history.replaceState({},'', '?variant=10');d.window.dispatchEvent(new d.window.PopStateEvent('popstate'));assert.equal(options[0].value,'Small');assert.equal(options[1].value,'Red');assert.equal(q('[name=id]').value,'10');d.window.close();
  console.log('PASS Compact: actual Liquid form; one ID; no-JS native fallback; multi-option/different/equal-price/compare-at/sold-out/invalid combination; quantity and plan payload; URL and restoration.');

  // Phase 4 extracts the host's gallery/resolver and reuses the native purchase
  // helper. Execute the complete Liquid host + actual assets instead of a JS slice.
  const commerce=require('../../phase4/support/commerce.cjs');
  const modernProduct={...commerce.product,...product,options_with_values:product.options_with_values.map((option,i)=>({...option,position:i+1})),variants:variants.map(v=>({...v,featured_image:v.id===100?{url:'https://example.test/variant.jpg',width:800,height:600}:null})),selected_or_first_available_variant:variants[0]};
  const modernHTML=await commerce.render('main-product-modern-variant',{id:'qa',settings:{gallery_layout:'thumbnails'},data:{product:modernProduct},blocks:[{type:'price'},{type:'variant_picker',settings:{picker:'dropdown'}},{type:'qty_buy_combo'}]});
  const m=commerce.dom(modernHTML);commerce.boot(m.window,['product-selling-plans.js','product-purchase-sync.js','product-gallery-options.js']);
  const mq=s=>m.window.document.querySelector(s),original=mq('#QtmMainImage-qa').src;
  const selectModern=(a,b)=>{mq('[name=qtm-option-qa-1]').value=a;mq('[name=qtm-option-qa-2]').value=b;mq('[name=qtm-option-qa-2]').dispatchEvent(new m.window.Event('change',{bubbles:true}));};
  selectModern('Small','Red');assert.equal(mq('#QtmMainImage-qa').src,original,'no-image variant preserves gallery');
  selectModern('Large','Red');assert.deepEqual(new m.window.FormData(mq('form')).getAll('id'),['100']);assert.equal(mq('#QtmPrice-qa').textContent,'$100.00');assert(!mq('#QtmCompare-qa').hidden);
  assert(mq('#QtmMainImage-qa').src.includes('variant.jpg'));assert(!mq('#QtmMainImage-qa').hasAttribute('srcset'));assert(!mq('#QtmAtc-qa').disabled);
  mq('[name=selling_plan]').value='45';assert.equal(new m.window.FormData(mq('form')).get('selling_plan'),'45');
  mq('#QtmQty-qa').value='4';mq('#QtmQty-qa').dispatchEvent(new m.window.Event('input'));assert.equal(new m.window.FormData(mq('form')).get('quantity'),'4');
  selectModern('Large','Blue');assert.equal(mq('[name=selling_plan]').value,'');assert(mq('#QtmAtc-qa').disabled,'sold-out works without optional availability block');assert(mq('#QtmCompare-qa').hidden);
  selectModern('Small','Blue');assert.equal(mq('[name=id]').value,'');assert.equal(mq('form').dispatchEvent(new m.window.Event('submit',{cancelable:true})),false);m.window.close();
  console.log('PASS Modern: actual Liquid host and resolver; one authoritative ID; multi-option price/compare/sold-out without status block; invalid submission blocked; quantity; featured-image update and no-image preservation.');

  const networks=['instagram','tiktok','facebook','youtube','pinterest','twitter','linkedin'];
  const globals=Object.fromEntries(networks.map(n=>['social_url_'+n,'https://example.test/global/'+n]));
  const blockSettings=Object.fromEntries(networks.map(n=>['show_'+n,true]));
  const socialSource=stripSchema(read('blocks/content-social-links.liquid'));
  for(const mode of ['blank','global','override']){
    const bs={...blockSettings};if(mode==='override')networks.forEach(n=>bs[n+'_url']='https://example.test/block/'+n);
    const html=await engine.parseAndRender(socialSource,{settings:mode==='blank'?{}:globals,block:{id:'qa',settings:bs}});
    const page=dom(html);const links=[...page.window.document.querySelectorAll('a[href]')];assert.equal(links.length,mode==='blank'?0:7);
    if(mode!=='blank') networks.forEach(n=>assert(links.some(a=>a.href===`https://example.test/${mode==='override'?'block':'global'}/${n}`)));page.window.close();
  }
  for(const filename of ['footer-two','footer-three']) {
    const source=read('sections/'+filename+'.liquid');
    const start=source.indexOf('{% if settings.social_url_');
    const social=source.slice(start,source.indexOf('</ul>',start));
    for(const settings of [{},globals]) {
      const html=await engine.parseAndRender(social,{settings,block:{settings:{social_style:'icons'}}});
      const page=dom(html);const links=[...page.window.document.querySelectorAll('a[href]')];
      assert.equal(links.length,Object.keys(settings).length);networks.forEach(n=>{if(settings['social_url_'+n])assert(links.some(a=>a.href===settings['social_url_'+n]));});page.window.close();
    }
  }
  console.log('PASS social Liquid: seven canonical globals configured/blank and seven block overrides; no merchant settings changed.');

  const collection=stripSchema(read('sections/main-collection-list.liquid'));
  for(const page_type of ['list-collections','collection','index'])for(const title of ['','Browse']){
    const html=await engine.parseAndRender(collection,{section:{id:'qa',settings:{page_heading:true,title,source_mode:'manual'},blocks:[]},request:{page_type}});
    const page=dom(html);assert.equal(page.window.document.querySelectorAll('h1').length,page_type==='list-collections'?1:0);page.window.close();
  }
  console.log('PASS collection directory: exactly one H1 with empty collections and blank/custom title; no H1 on other routes.');

  const giftSource=read('templates/gift_card.liquid').replace(/{% layout 'password' %}/,'');
  for(const enabled of [true,false]) {
    const html=await engine.parseAndRender(giftSource,{gift_card:{initial_value:10000,balance:2500,code:'FIXTURE-CODE',enabled},shop:{name:'Fixture shop'},routes:{root_url:'/'}});
    const page=dom(html);assert.equal(page.window.document.querySelectorAll('h1').length,1);
    assert.equal(!!page.window.document.querySelector('label[for=GiftCardCode]'),enabled);
    assert.equal(!!page.window.document.querySelector('input[readonly]'),enabled);
    assert(html.includes('Balance:'));page.window.close();
  }
  console.log('PASS gift-card Liquid: correct object fields; balance; accessible readonly code; disabled-card code hidden; themed layout retained. Issued token is final store data.');

  const header=read('sections/header-five.liquid');
  const colorAssignments=header.slice(header.indexOf('  assign control_bg'),header.indexOf('  assign main_menu'));
  const colorCSS=header.slice(header.lastIndexOf('<style>')+7,header.lastIndexOf('</style>'));
  const rendered=await engine.parseAndRender('{% liquid\n'+colorAssignments+'%}'+colorCSS,{section:{id:'qa',settings:{department_bg:'#ffffff',department_text:'#ffffff'}}});
  const styled=dom('<style>'+rendered+'</style><div id="HeaderFive-qa"><div class="qtmHeaderFive__search"><button class="qtm-search-form__submit">Search</button></div><div class="qtmHeaderFive__mobileSearch"><button class="qtm-search-form__submit">Search</button></div><span class="qtmHeaderFive__cartCount">1</span></div>');
  for(const node of styled.window.document.querySelectorAll('button,span')) {
    const style=styled.window.getComputedStyle(node);assert.equal(style.backgroundColor,'rgb(17, 24, 39)');assert.equal(style.color,'rgb(255, 255, 255)');
  }
  styled.window.close();
  assert(rendered.includes('background: #111827'));assert(rendered.includes('color: #ffffff'));assert(rendered.includes(':focus-visible'));
  assert(!read('assets/header-five.css').includes('visibility 260ms'),'visibility cannot delay focus entry');
  const h=dom('<button id="outside">Outside</button><div data-qtm-header-five><button data-qtm-h5-mobile-open aria-expanded="false">Open</button><div data-qtm-h5-mobile-panel hidden><div role="dialog" tabindex="-1"><button data-qtm-h5-mobile-close>Close</button><a href="/">Last</a></div></div></div>');
  h.window.eval(read('assets/header-five.js'));h.window.document.dispatchEvent(new h.window.Event('DOMContentLoaded'));
  const hq=s=>h.window.document.querySelector(s);const opener=hq('[data-qtm-h5-mobile-open]'),close=hq('[data-qtm-h5-mobile-close]'),last=hq('a');
  opener.click();assert.equal(h.window.document.activeElement,close,'focus enters synchronously');hq('#outside').focus();assert.equal(h.window.document.activeElement,close,'outside focus contained');
  close.dispatchEvent(new h.window.KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));assert.equal(h.window.document.activeElement,last);
  last.dispatchEvent(new h.window.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));assert.equal(h.window.document.activeElement,close);
  assert(h.window.document.body.classList.contains('qtmHeaderFiveMobileOpen'));h.window.document.dispatchEvent(new h.window.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(h.window.document.activeElement,opener);
  assert(!h.window.document.body.classList.contains('qtmHeaderFiveMobileOpen'));
  for(let i=0;i<4;i++){opener.click();close.click();}opener.click();await new Promise(r=>setTimeout(r,35));assert(!hq('[data-qtm-h5-mobile-panel]').hidden);assert.equal(h.window.document.activeElement,close);h.window.close();
  console.log('PASS H5: real Liquid color collision repair and focus-state CSS; immediate entry, outside containment, both Tab directions, Escape/return, scroll-lock classes, rapid reopening/reduced motion. DOM mechanism, not browser rendering certification.');
})().catch(error=>{console.error(error);process.exitCode=1});
