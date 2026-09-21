// Shopify form transport/errors are explicit adapters, not endpoint certification.
const f=require('./commerce.cjs'),{Liquid}=require('liquidjs');
function platform(source){
  return source.replace(/{%-?\s*form\s+([^%]+)%}/g,(_,args)=>{
    const expr=args.split(',')[0].trim(),attrs={};
    for(const key of ['id','class','data-shopify-captcha']){
      const hit=args.match(new RegExp('(?:^|,)\\s*'+key+':\\s*(\'[^\']*\'|"[^"]*"|[\\w.]+)'));
      if(hit)attrs[key]='{{ '+hit[1]+' | escape }}';
    }
    return '<form method="post" action="/fr/contact" data-platform-form="{{ '+expr+' }}" '+Object.entries(attrs).map(([k,v])=>k+'="'+v+'"').join(' ')+'><input type="hidden" name="form_type" value="{{ '+expr+' }}">';
  }).replace(/{%-?\s*endform\s*-?%}/g,'</form>').replace(/{%-?\s*stylesheet\s*-?%}/g,'<style>').replace(/{%-?\s*endstylesheet\s*-?%}/g,'</style>');
}
const base=f.engine.options.fs,engine=new Liquid({root:'snippets',extname:'.liquid',fs:{...base,readFile:async p=>platform(await base.readFile(p)),readFileSync:p=>platform(base.readFileSync(p))}});
for(const[name,fn]of Object.entries(f.engine.filters))engine.registerFilter(name,fn);
engine.registerFilter('script_tag',x=>'<script src="'+x+'"></script>');
engine.registerFilter('default_errors',x=>'<ul data-platform-errors>'+Object.keys(x||{}).map(k=>'<li>'+k+'</li>').join('')+'</ul>');
const escape=x=>String(x??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
engine.registerFilter('image_tag',(url,...args)=>{const attrs=Object.fromEntries(args.filter(Array.isArray));return '<img src="'+escape(url)+'" width="800" height="600" '+Object.entries(attrs).filter(([key])=>!['widths','sizes'].includes(key)).map(([key,value])=>key+'="'+escape(value)+'"').join(' ')+'>';});
engine.registerFilter('color_modify',(color,property,value)=>{if(property!=='alpha')throw new Error('Unexpected color adapter');const hex=String(color||'#000000').replace('#','');const full=hex.length===3?hex.split('').map(x=>x+x).join(''):hex;return 'rgba('+[0,2,4].map(i=>parseInt(full.slice(i,i+2),16)||0).join(',')+','+value+')';});
// Native contrast filter adapter for fixture hex colors; Shopify owns real color parsing.
engine.registerFilter('color_contrast',(one,two)=>{const l=color=>{let hex=String(color).replace('#','');if(hex.length===3)hex=hex.split('').map(x=>x+x).join('');const c=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722};const a=l(one),b=l(two);return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)});
const globals={settings:Object.assign({},...JSON.parse(f.read('config/settings_schema.json')).map(g=>f.defaults(g.settings))),request:{design_mode:false},routes:{root_url:'/fr/',search_url:'/fr/search',predictive_search_url:'/fr/search/suggest'},form:{}};
const field=(id,type,settings={})=>({id,type:'field',settings:{field_type:type,name_attr:'contact[field]',label:'Field <safe>',...settings},shopify_attributes:'data-editor-block="'+id+'"'});
async function snippet(name,opts={}){return engine.parseAndRender(platform(f.read('snippets/'+name+'.liquid')),{id:'one',settings:{destination:'shopify_contact'},blocks:[],...opts},{globals:{...globals,...opts.globals}});}
async function host(name,opts={}){const{schema,liquid}=f.unpack(name),id=opts.id||'one',blocks=(opts.blocks??schema.presets?.[0]?.blocks??[]).map((b,i)=>({id:b.id||id+'-block-'+i,type:b.type,settings:{...f.defaults(schema.blocks?.find(x=>x.type===b.type)?.settings),...b.settings},shopify_attributes:'data-editor-block="'+i+'"'}));return engine.parseAndRender(platform(liquid),{section:{id,settings:{...f.defaults(schema.settings),...opts.settings},blocks},...opts.data},{globals:{...globals,...opts.globals}});}
module.exports={...f,engine,field,snippet,host};
