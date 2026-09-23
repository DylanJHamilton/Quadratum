const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const {Liquid} = require('liquidjs');
const read = path => fs.readFileSync(path,'utf8');
const engine = new Liquid({root:['snippets'],extname:'.liquid'});
engine.registerFilter('image_url', image => {
  assert(image && typeof image === 'object','image_url must receive an image object');
  return '/fixture.jpg';
});
engine.registerFilter('money', cents => '$'+(Number(cents)/100).toFixed(2));
const defaults = fields => Object.fromEntries((fields || []).filter(field=>field.id).map(field=>[field.id,field.default ?? null]));
(async () => {
  const source = read('sections/multipurpose-hero-banner.liquid');
  const start = source.lastIndexOf('{% schema %}');
  const schema = JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
  const product = {id:12,title:'Selected product',price:2500,url:'/products/selected'};
  for (const preset of schema.presets) {
    const blocks = (preset.blocks || []).map((block,index)=>({...block,id:'block-'+index,settings:{...defaults(schema.blocks.find(def=>def.type===block.type)?.settings),...block.settings}}));
    for (const block of blocks) {
      if (block.type === 'slide') { block.settings.image=null; block.settings.mobile_image=null; block.settings.featured_product=product; }
      if (block.type === 'product') block.settings.product=product;
    }
    const html = await engine.parseAndRender(source.slice(0,start),{section:{id:'fixture',settings:{...defaults(schema.settings),...preset.settings},blocks}});
    const d = new JSDOM(html);
    assert(d.window.document.querySelector('a[href="/products/selected"]'),'product picker object renders without all_products fixture');
    for (const image of d.window.document.images) assert(image.getAttribute('src'),'no blank image URLs');
    d.window.close();
  }
  const emptyHtml = await engine.parseAndRender(source.slice(0,start),{section:{id:'empty',settings:defaults(schema.settings),blocks:[]},request:{design_mode:false}});
  const emptyDom = new JSDOM(emptyHtml);
  assert(emptyDom.window.document.querySelector('.q-multipurpose-banner').hidden,'no empty storefront banner when all slides are removed');
  emptyDom.window.close();
  console.log('PASS Multipurpose actual presets: empty image pickers never call image_url; selected product objects render links without a handle map.');

  const markup = mode => `<div id="host"><section class="q-multipurpose-banner" data-mode="${mode}" data-autoplay="true"><div class="q-mpb-slide active"><video autoplay></video><iframe data-mpb-video-src="https://www.youtube.com/embed/fixture"></iframe></div><div class="q-mpb-slide"><video autoplay></video><iframe data-mpb-video-src="https://www.youtube.com/embed/second"></iframe></div><button class="q-mpb-arrow-next">Next</button><button data-mpb-pause>Pause</button></section></div>`;
  for (const mode of ['static','slideshow']) {
    const d = new JSDOM(markup(mode),{runScripts:'outside-only',pretendToBeVisual:true});
    const w=d.window; const motion=new w.EventTarget();motion.matches=false;w.matchMedia=()=>motion;
    const timers=new Map();let serial=0;w.setTimeout=fn=>{timers.set(++serial,fn);return serial};w.clearTimeout=id=>timers.delete(id);
    const videos=[...w.document.querySelectorAll('video')];videos.forEach(video=>{video.play=()=>{video.dataset.playing='true';return Promise.resolve()};video.pause=()=>{video.dataset.playing='false'}});
    w.eval(read('assets/multipurpose-hero-banner.js'));w.eval(read('assets/multipurpose-hero-banner.js'));w.QuadratumMultipurposeBanner.init();
    assert.equal(videos[0].dataset.playing,'true');assert.equal(videos[1].dataset.playing,'false');
    assert.equal(w.document.querySelectorAll('iframe[src]').length,1);
    assert.equal(timers.size,mode==='static'?0:1);
    motion.matches=true;motion.dispatchEvent(new w.Event('change'));
    assert.equal(timers.size,0);assert.equal(w.document.querySelectorAll('iframe[src]').length,0);assert(videos.every(video=>video.dataset.playing==='false'));
    motion.matches=false;motion.dispatchEvent(new w.Event('change'));
    const root=w.document.querySelector('section');root.querySelector('.q-mpb-arrow-next').click();
    assert.equal(videos[0].dataset.playing,'false');assert.equal(videos[1].dataset.playing,'true');
    Object.defineProperty(w.document,'hidden',{configurable:true,value:true});w.document.dispatchEvent(new w.Event('visibilitychange'));
    assert.equal(timers.size,0);assert(videos.every(video=>video.dataset.playing==='false'));
    root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(w.document.querySelectorAll('iframe[src]').length,0);
    Object.defineProperty(w.document,'hidden',{configurable:true,value:false});
    root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert.equal(timers.size,mode==='static'?0:1);
    assert.equal(root.querySelectorAll('.q-mpb-slide.active').length,1,'reload resets previous active slide');
    d.window.close();
  }
  console.log('PASS Multipurpose media: static/slideshow initialization, duplicate execution, inactive videos/iframes, reduced motion, hidden document, root unload/reload and timer cleanup.');
})().catch(error=>{console.error(error);process.exitCode=1});
