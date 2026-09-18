const assert = require('node:assert/strict');
const fs = require('node:fs');
const {Liquid} = require('liquidjs');
const {JSDOM} = require('jsdom');
const engine = new Liquid({root:['snippets'], extname:'.liquid'});
engine.registerFilter('json', JSON.stringify);
engine.registerFilter('money', value => '$' + (Number(value || 0) / 100).toFixed(2));
const defaults = fields => Object.fromEntries((fields || []).filter(field => field.id).map(field => [field.id, field.default ?? null]));
const globals = Object.assign({}, ...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(group => defaults(group.settings)));
const variants = [{id:10,title:'Small',options:['Small'],price:1000,available:true},{id:20,title:'Large',options:['Large'],price:2000,compare_at_price:2500,available:true}];
const product = {id:1,title:'Fixture product',options:['Size'],options_with_values:[{name:'Size',values:['Small','Large'],selected_value:'Small'}],variants,selected_or_first_available_variant:variants[0],has_only_default_variant:false,available:true,price:1000,url:'/products/fixture',media:[],selling_plan_groups:[]};
function forms(text) {
  return text.replace(/{%-?\s*form\s+[^%]+%}/g, tag => {
    const id = tag.match(/\bid:\s*([\w.]+)/), cls = tag.match(/\bclass:\s*'([^']+)'/);
    return '<form'+(id?' id="{{ '+id[1]+' }}"':'')+(cls?' class="'+cls[1]+'"':'')+'>';
  }).replace(/{%-?\s*endform\s*-?%}/g,'</form>');
}
(async () => {
  const saleLink = await engine.renderFile('cta-sale-link',{label:'Shop',url:'/collections/all?sort_by=price#offers',discount_code:'SAVE 10',auto_apply:true});
  const linkDom = new JSDOM(saleLink,{url:'https://shop.test'});
  const destination = new URL(linkDom.window.document.querySelector('a').href);
  assert.equal(destination.searchParams.get('discount'),'SAVE 10');
  assert.equal(destination.searchParams.get('sort_by'),'price');
  assert.equal(destination.hash,'#offers');
  linkDom.window.close();
  for (const name of ['call-to-action-featured-product','carousel-hero-banner','slideshow-banner','call-to-action-current-sale']) {
    const text = fs.readFileSync('sections/'+name+'.liquid','utf8');
    const start = text.lastIndexOf('{% schema %}');
    const schema = JSON.parse(text.slice(start+12).split('{% endschema %}')[0]);
    for (const preset of schema.presets || [{name:'Defaults'}]) {
      for (const withProduct of [false,true]) {
        let html = '';
        for (const id of ['first','second']) {
          const settings = {...defaults(schema.settings),...preset.settings,...(withProduct?{product}:{} )};
          const blocks = (preset.blocks || []).map((block,index) => ({...block,id:id+'-'+index,settings:{...defaults(schema.blocks?.find(def=>def.type===block.type)?.settings),...block.settings,...(withProduct?{product,...(block.type==='g_countdown'?{end_datetime:'2099-01-01T00:00:00Z'}:{})}:{})}}));
          html += await engine.parseAndRender(forms(text.slice(0,start)), {section:{id,settings,blocks},settings:globals,request:{design_mode:true},shop:{name:'Fixture'},routes:{cart_add_url:'/fr/cart/add',root_url:'/fr/'}});
        }
        const d = new JSDOM(html,{runScripts:'outside-only'});
        if (name === 'call-to-action-current-sale') {
          let timers = 0; d.window.setInterval = () => ++timers;
          d.window.eval(fs.readFileSync('assets/call-to-action-current-sale.js','utf8'));
          d.window.document.dispatchEvent(new d.window.Event('DOMContentLoaded'));
          const countdowns = [...d.window.document.querySelectorAll('[data-cd-end]')];
          assert.equal(timers,withProduct?countdowns.length:0,'actual sale block timers');
          if (!withProduct) countdowns.forEach(node=>assert(node.textContent.includes('Choose an end date')));
        }
        const ids = [...d.window.document.querySelectorAll('[id]')].map(node=>node.id);
        assert.equal(new Set(ids).size,ids.length,name+' duplicate IDs');
        assert(!html.includes('Infinity') && !html.includes('NaN'),name+' invalid arithmetic');
        for (const label of d.window.document.querySelectorAll('label[for]')) assert(d.window.document.getElementById(label.htmlFor),name+' missing label target');
        if (withProduct && name === 'call-to-action-featured-product') {
          assert.equal(d.window.document.querySelectorAll('select[name=id]').length,2);
          assert.equal(d.window.document.querySelectorAll('script[src*="call-to-action-featured-product.js"]').length,2);
        }
        d.window.close();
      }
    }
    console.log('PASS '+name+': actual Liquid presets rendered as two instances, empty/product settings, IDs/labels and finite price output.');
  }
})().catch(error=>{console.error(error);process.exitCode=1});
