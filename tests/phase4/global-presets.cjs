const assert=require('node:assert/strict'),fs=require('node:fs');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
// Apply the existing native-form adapter to nested localization helpers as well.
const baseFS=new Liquid().options.fs;
const engine=new Liquid({root:['snippets'],extname:'.liquid',fs:{...baseFS,readFile:async p=>platformForms(await baseFS.readFile(p)),readFileSync:p=>platformForms(baseFS.readFileSync(p))}});
engine.registerFilter('json',JSON.stringify);
engine.registerFilter('color_contrast',()=>21);
const read=p=>fs.readFileSync(p,'utf8');
const defaults=fields=>Object.fromEntries((fields||[]).filter(f=>f.id).map(f=>[f.id,f.default??null]));
const globals=Object.assign({},...JSON.parse(read('config/settings_schema.json')).map(group=>defaults(group.settings)));
function unpack(text){const start=text.lastIndexOf('{% schema %}');if(start<0)return null;return {schema:JSON.parse(text.slice(start+12).split('{% endschema %}')[0]),liquid:text.slice(0,start)};}
function platformForms(text){return text.replace(/{%-?\s*form\s+[^%]+%}/g,tag=>{const id=tag.match(/\bid:\s*([\w.]+)/);return '<form'+(id?' id="{{ '+id[1]+' }}"':'')+'>';}).replace(/{%-?\s*endform\s*-?%}/g,'</form>');}
(async()=>{
 let count=0;
 for(const family of ['header','footer'])for(const word of ['one','two','three','four','five']){
  const file='sections/'+family+'-'+word+'.liquid';const {schema,liquid}=unpack(read(file));
  for(const preset of schema.presets?.length?schema.presets:[{name:'Defaults'}]){
   let html='';
   for(const id of ['first','second']){
    const settings={...defaults(schema.settings),...preset.settings};
    const blocks=(preset.blocks||[]).map((block,index)=>({...block,id:id+'-block-'+index,settings:{...defaults(schema.blocks?.find(b=>b.type===block.type)?.settings),...block.settings}}));
    html+=await engine.parseAndRender(platformForms(liquid),{section:{id,settings,blocks},settings:globals,shop:{name:'Long merchant business name for layout review'},request:{design_mode:true},cart:{item_count:0,total_price:0},routes:{root_url:'/',search_url:'/search',cart_url:'/cart',account_url:'/account',account_login_url:'/account/login'},localization:{available_countries:[],available_languages:[]}});
   }
   const d=new JSDOM(html);const nodes=[...d.window.document.querySelectorAll('[id]')];
   const ids=nodes.map(n=>n.id);assert.equal(new Set(ids).size,ids.length,file+' '+preset.name+' duplicate IDs');
   for(const label of d.window.document.querySelectorAll('label[for]'))assert(d.window.document.getElementById(label.htmlFor),file+' missing label target '+label.htmlFor);
   for(const control of d.window.document.querySelectorAll('input[type=email]'))assert(control.required,file+' newsletter requires email');
   d.window.close();count++;
  }
 }
 console.log('PASS '+count+' header/footer default/preset compositions rendered twice: valid Liquid branches, unique IDs, existing label targets and required newsletter emails. Shopify form tags are fixture adapters; visual browser acceptance remains separate.');
})().catch(e=>{console.error(e);process.exitCode=1});
