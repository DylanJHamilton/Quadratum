// Actual source markup/styles/controllers in a local intercepted browser; no Shopify service calls.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),axe=require('axe-core'),f=require('./support.cjs');
const out=process.env.PHASE6_BROWSER_OUTPUT || '/tmp/quadratum-phase6-browser';fs.mkdirSync(out,{recursive:true});
const report=process.env.PHASE6_BROWSER_REPORT || 'docs/phase6/validation/checkpoint-f/browser-results.json';fs.mkdirSync(path.dirname(report),{recursive:true});
async function fixture(settings={},kind='popup',direction='ltr'){
 const global={...f.defaults,...settings},context={settings:global,routes:{root_url:'/fr/',cart_url:'/fr/cart',all_products_collection_url:'/fr/collections/all'},cart:{items:[],item_count:0,total_price:0},section_id:'fixture',localization:{available_countries:[{iso_code:'US',name:'United States',currency:{iso_code:'USD'}},{iso_code:'CA',name:'Canada',currency:{iso_code:'CAD'}}],available_languages:[{iso_code:'en',endonym_name:'English'},{iso_code:'ar',endonym_name:'العربية'}],country:{iso_code:'US'},language:{iso_code:'en'}}};
 const tokens=await f.engine.renderFile('global-theme-vars',context,{globals:context});
 let content,script;
 if(kind==='popup'){content=await f.popup(settings);script='global-popup.js';}
 else{content=await f.engine.renderFile('cart-drawer',context,{globals:context});script='cart-drawer.js';}
 const localization=await f.engine.renderFile('global-localization',context,{globals:context});
 const prelude='window.Shopify={customerPrivacy:{preferencesProcessingAllowed:()=>true}};window.QuadratumSettings={cart:{url:"/fr/cart",ajaxDrawerEnabled:true,headerTriggerEnabled:true}};';
 return '<!doctype html><html lang="en" dir="'+direction+'" data-theme="'+(settings.color_scheme||'default')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Phase 6 source fixture</title><link rel="stylesheet" href="/assets/theme.css">'+tokens+'<link rel="stylesheet" href="/assets/styles.css"><link rel="stylesheet" href="/assets/cart-drawer.css"><style>body{margin:0}main,footer{padding:16px;overflow-wrap:anywhere}:root{--font-body:Arial,sans-serif;--font-head:Arial,sans-serif}</style></head><body><main id="main"><h1>Store fixture</h1><button id="open" data-qtm-popup-open>Open promotion</button><a id="cart-open" href="/fr/cart" data-cart-drawer-open>Open cart</a><button id="outside">Outside</button><p>Theme settings source fixture.</p></main><footer>'+localization+'</footer>'+content+'<script>'+prelude+'</script><script src="/assets/'+script+'"></script></body></html>';
}
async function load(page,html){
 await page.route('**/*',route=>{const url=new URL(route.request().url());
  if(url.pathname==='/fixture')return route.fulfill({contentType:'text/html',body:html});
  if(url.pathname.startsWith('/assets/')){const p=path.join('assets',path.basename(url.pathname));if(fs.existsSync(p))return route.fulfill({contentType:p.endsWith('.css')?'text/css':'application/javascript',body:fs.readFileSync(p)});}
  if(url.pathname.includes('image'))return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#dbeafe"/></svg>'});
  return route.abort();});
 await page.goto('https://shop.test/fixture',{waitUntil:'load'});
}
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});const results=[];
 try{
  const placements=['center','top','bottom','bottom_right','bottom_left','right_drawer','left_drawer','fullscreen'];
  const cases=placements.flatMap(placement=>[320,1440].map(width=>({name:placement,width,settings:{popup_placement:placement}})));
  for(const style of ['editorial','minimal','commerce'])for(const image of ['top','left','right','hidden'])cases.push({name:style+'-'+image,width:image==='left'?320:1024,settings:{popup_style:style,popup_image_position:image,popup_image:{url:'/image.svg',width:800,height:600},popup_width:320,popup_padding:64,popup_heading:'LongPopupHeadingWithNoSpaces'.repeat(3)}});
  for(const animation of ['fade','slide_up','slide_down','slide_left','slide_right','zoom','none'])cases.push({name:'animation-'+animation,width:768,reduce:true,direction:'rtl',settings:{popup_animation:animation,popup_overlay_opacity:0,popup_radius:0,popup_width:960,popup_bg:'#103040',popup_text_color:'#ffffff',popup_heading_color:'#ffffff',popup_button_bg:'#ffffff',popup_button_text:'#103040'}});
  for(const c of cases){
   const page=await browser.newPage({viewport:{width:c.width,height:900},reducedMotion:c.reduce?'reduce':'no-preference'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await load(page,await fixture(c.settings,'popup',c.direction||'ltr'));
   await page.locator('#open').focus();await page.keyboard.press('Enter');await page.waitForTimeout(250);
   const root=page.locator('#QuadratumGlobalPopup'),dialog=root.locator('[role="dialog"]');assert(await dialog.isVisible(),c.name);
   assert(await root.evaluate(el=>el.contains(document.activeElement)),c.name+' focus '+JSON.stringify(errors));
   await page.locator('#outside').evaluate(el=>el.focus());assert(await root.evaluate(el=>el.contains(document.activeElement)),c.name+' containment');
   const focusable=dialog.locator('a[href],button:not([disabled]),input:not([type="hidden"])');await focusable.last().focus();await page.keyboard.press('Tab');assert(await focusable.first().evaluate(el=>el===document.activeElement));await page.keyboard.press('Shift+Tab');assert(await focusable.last().evaluate(el=>el===document.activeElement));
   assert.equal(await dialog.locator('form').evaluate(el=>el.checkValidity()),false,'signup requires confirmation/email');
   const rect=await dialog.boundingBox(),geometry=await dialog.evaluate(el=>({scroll:el.scrollWidth,width:el.clientWidth,radius:getComputedStyle(el).borderRadius,transform:getComputedStyle(el).transform,color:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
   assert(rect.x>=-1&&rect.y>=-1&&rect.x+rect.width<=c.width+1&&rect.y+rect.height<=901,c.name+' containment geometry');assert(geometry.scroll<=geometry.width+1,c.name+' inner overflow');
   if(c.name==='top')assert(rect.y<=25);if(c.name==='bottom')assert(rect.y+rect.height>=875);
   if(c.name==='right_drawer')assert(rect.x+rect.width>=c.width-1);if(c.name==='left_drawer')assert(rect.x<=1);
   if(c.name==='bottom_right')assert(rect.x+rect.width>=c.width-25);if(c.name==='bottom_left')assert(rect.x<=25);
   if(c.name==='fullscreen')assert.equal(Math.round(rect.width),c.width);
   if(c.reduce){assert.equal(geometry.transform,'none');assert.equal(geometry.radius,'0px');assert.equal(geometry.bg,'rgb(16, 48, 64)');assert.equal(await root.locator('[data-qtm-popup-overlay]').evaluate(el=>getComputedStyle(el).opacity),'0');}
   await page.addScriptTag({content:axe.source});const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
   results.push({name:c.name,width:c.width,direction:c.direction||'ltr',rect,geometry,errors,violations});
   if(['center','editorial-left','animation-zoom'].includes(c.name))await page.screenshot({path:path.join(out,c.name+'-'+c.width+'.png'),fullPage:true});
   await page.keyboard.press('Escape');assert(await page.locator('#open').evaluate(el=>el===document.activeElement));assert.equal(await page.locator('#main').evaluate(el=>el.inert),false);
   await page.locator('#open').click();await page.evaluate(()=>{QuadratumPopup.close();QuadratumPopup.open()});await page.waitForTimeout(240);assert(await dialog.isVisible(),'reopen');await page.close();
  }
  for(const width of [320,768,1440])for(const direction of ['ltr','rtl']){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await load(page,await fixture({cart_drawer_width:width===320?760:440,cart_drawer_overlay_opacity:0,currency_selector_enable:true,locale_selector_enable:true,language_switcher_style:'icon',color_scheme:direction==='rtl'?'dark':'default'},'commerce',direction));
   const overflow=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth}));assert(overflow.document<=width+1);
   const form=page.locator('.qtm-global-localization form');assert.equal(await page.locator('[name="country_code"]').count(),1);assert.equal(await page.locator('[name="locale_code"]').count(),1);
   await page.locator('#cart-open').click();await page.waitForTimeout(50);const drawer=page.locator('[data-cart-drawer-panel]');assert(await drawer.isVisible());const rect=await drawer.boundingBox();assert(rect.width<=width+1);
   await page.addScriptTag({content:axe.source});const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
   results.push({name:'commerce-localization',width,direction,overflow,rect,errors,violations});if(width===320)await page.screenshot({path:path.join(out,'commerce-'+direction+'.png'),fullPage:true});await page.close();
  }
 }finally{await browser.close();fs.writeFileSync(report,JSON.stringify({fixture_only:true,cases:results.length,results},null,2)+'\n');}
 const failed=results.filter(r=>r.errors.length||r.violations.length);if(failed.length){console.error(JSON.stringify(failed,null,2));process.exitCode=1;}else console.log('PASS '+results.length+' Chromium/axe fixtures: eight placements; all styles/image positions; 320/768/1024/1440px; reduced motion, RTL, exact colors/zero settings, keyboard/focus/reopen, native confirmation and commerce/localization. External requests intercepted; no Shopify certification.');
})().catch(e=>{console.error(e);process.exitCode=1;});
