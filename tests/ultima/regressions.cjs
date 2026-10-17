// Render the actual section sources with explicit Shopify object/filter adapters.
// Browser geometry checks cover the reported mobile defects; they do not certify Shopify services.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const f = require('../phase4/support/commerce.cjs');
const results = [];
const photo = f.photo();
const longCopy = 'Detailed product information that must remain readable on a narrow phone screen. '.repeat(12);
async function markup(name, settings = {}, blocks) {
  return '<div id="shopify-section-one">' + await f.render(name, {id:'one', settings, blocks,
    data:{shop:{name:'Fixture shop'}, linklists:{}, localization:{available_countries:[],available_languages:[]}}}) + '</div>';
}
(async () => {
  const browser = await chromium.launch({channel:process.env.ULTIMA_BROWSER_CHANNEL || 'chrome', headless:true});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844}});
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith('/assets/')) {
        const path = '.' + url.pathname;
        if(fs.existsSync(path)) return route.fulfill({body:fs.readFileSync(path),contentType:path.endsWith('.js')?'text/javascript':'text/css'});
      }
      return route.fulfill({body:'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#777"/></svg>',contentType:'image/svg+xml'});
    });
    async function show(html,width=390) {
      await page.setViewportSize({width,height:844});
      await page.setContent('<base href="https://fixture.test/"><style>*{box-sizing:border-box}body{margin:0}:root{--fs-h2:3.25rem}</style>'+html);
      await page.evaluate(()=>document.fonts.ready);
    }
    for(const first of [true,false]) {
      await show(await markup('split-content-dynamic',{image:photo,mobile_presentation:'stack',mobile_image_first:first,min_height:'min-h-[40vh]',heading:'A long mobile heading',subheading:longCopy}));
      const boxes = await page.evaluate(()=>{
        const r=s=>{const b=document.querySelector(s).getBoundingClientRect();return {top:b.top,bottom:b.bottom,height:b.height}};
        return {image:r('.q-split-content .q-img'),panel:r('.q-content-side'),copy:r('.q-inner')};
      });
      assert(first ? boxes.image.bottom <= boxes.panel.top+1 : boxes.panel.bottom <= boxes.image.top+1,'stacked image and text overlap');
      assert(boxes.copy.top >= boxes.panel.top-1 && boxes.copy.bottom <= boxes.panel.bottom+1,'copy escapes its panel');
      results.push({check:'split mobile content sizing',imageFirst:first,pass:true});
    }
    for(const transition of ['slide','fade']) for(const layout of ['hero','split']) {
      await show(await markup('slideshow-banner',{transition,layout_mode:layout,autoplay:false},[{type:'slide',settings:{background_image:photo,heading:'Long heading',subheading:longCopy}}]));
      const boxes=await page.evaluate(()=>{
        const img=document.querySelector('.qsl__img').getBoundingClientRect();
        const media=document.querySelector('.qsl-split__media,.qsl__bg').getBoundingClientRect();
        const slide=document.querySelector('.qsl__slide').getBoundingClientRect();
        const stack=document.querySelector('.qsl__stack').getBoundingClientRect();
        return {imageHeight:img.height,mediaHeight:media.height,slideBottom:slide.bottom,copyBottom:stack.bottom};
      });
      assert(Math.abs(boxes.imageHeight-boxes.mediaHeight)<2,'slideshow image does not cover media');
      assert(boxes.copyBottom<=boxes.slideBottom+1,'slideshow clips long content');
      results.push({check:'slideshow sizing',transition,layout,pass:true});
    }
    const footer = await markup('footer-five',{footer_layout:'department_hub',columns_desktop:5,columns_tablet:2,mobile_layout:'stacked'});
    for(const [width,count] of [[390,1],[800,2],[1280,5]]) {
      await show(footer,width);
      const actual=await page.locator('.qf5__grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
      assert.equal(actual,count,'Footer Five columns at '+width);
      results.push({check:'footer responsive columns',width,columns:actual,pass:true});
    }
    for(const name of ['feeds-product-grid','feeds-collection-grid']) {
      await show(await markup(name,{heading:'Heading',show_header:true}));
      assert.equal(await page.locator('.q-feed__heading').evaluate(el=>getComputedStyle(el).fontSize),'52px');
      results.push({check:'global heading scale',section:name,pass:true});
    }
    await show(await markup('interactive-content-helper-team-members-grid',{title:'People',subtitle:'Our team',name_color:'#ffffff',bio_color:'#ffffff',heading_color:'#112233',subheading_color:'#334455'}));
    assert.equal(await page.locator('.q-people__title').evaluate(el=>getComputedStyle(el).color),'rgb(17, 34, 51)');
    results.push({check:'team heading independent of card text',pass:true});
    for(const name of ['sub-banner-modern','sub-banner-split','sub-banner-breadcrumb']) {
      const html=await markup(name,{},[{type:'button',settings:{label:'Explore products',link:'/collections/all',aria_label:'Learn more'}}]);
      const d=f.dom(html);
      const button=[...d.window.document.querySelectorAll('a')].find(el=>el.textContent.trim()==='Explore products');
      assert(button,name+' fixture button'); assert.equal(button.getAttribute('aria-label'),'Explore products'); d.window.close();
      results.push({check:'legacy accessible name follows visible CTA',section:name,pass:true});
    }
    for(const [min,max] of [[0,900000],[2500,null],[null,900000]]) {
      const html=await f.render('main-collection-classic',{data:{collection:{title:'Products',url:'/collections/all',products:[],products_count:0,filters:[{type:'price_range',label:'Price',min_value:{value:min},max_value:{value:max},range_max:900000,url_to_remove:'/collections/all'}]},paginate:{pages:1,current_page:1}}});
      const d=f.dom(html),chip=d.window.document.querySelector('.main-collection-classic__chip');
      assert(chip,'active price range chip');
      assert(chip.textContent.includes('$'+((min||0)/100).toFixed(2)+' USD'));
      assert(chip.textContent.includes(max===null?'∞':'$'+(max/100).toFixed(2)+' USD'));
      d.window.close();results.push({check:'formatted price bounds',min,max,pass:true});
    }
    for(const [name,settings,selector] of [
      ['hero-banner',{},'.q-bleed'],
      ['boxed-content-banner',{layout_variant:'panel'},'.q-boxed-hero']
    ]) {
      await show('<style>html{overflow-y:scroll}</style>'+await markup(name,settings),1024);
      const widths=await page.locator(selector).evaluate(el=>({width:el.getBoundingClientRect().width,viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
      assert(widths.width<=widths.viewport+1 && widths.scroll<=widths.viewport+1,'full width overflow in '+name);
      results.push({check:'full width with scrollbar',section:name,pass:true});
    }
    await show(await markup('feeds-product-grid',{show_header:true,layout_mode:'carousel',carousel_nav:true,source_mode:'manual',manual_products:[f.product]}));
    const colors=await page.locator('.q-feed__carousel-btn').first().evaluate(el=>({text:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
    assert.equal(colors.text,'rgb(17, 17, 17)');assert.equal(colors.bg,'rgb(255, 255, 255)');
    results.push({check:'carousel button explicit contrast',pass:true});
    fs.mkdirSync('docs/ultima',{recursive:true});
    fs.writeFileSync('docs/ultima/regressions.json',JSON.stringify({scope:'Local Chromium with Shopify adapters',results},null,2)+'\n');
    console.log('PASS '+results.length+' ULTIMA browser/render regressions');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
