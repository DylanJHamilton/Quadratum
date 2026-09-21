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
const globals={settings:Object.assign({},...JSON.parse(f.read('config/settings_schema.json')).map(g=>f.defaults(g.settings))),request:{design_mode:false},routes:{root_url:'/fr/',search_url:'/fr/search',predictive_search_url:'/fr/search/suggest'},form:{}};
const field=(id,type,settings={})=>({id,type:'field',settings:{field_type:type,name_attr:'contact[field]',label:'Field <safe>',...settings},shopify_attributes:'data-editor-block="'+id+'"'});
async function snippet(name,opts={}){return engine.parseAndRender(platform(f.read('snippets/'+name+'.liquid')),{id:'one',settings:{destination:'shopify_contact'},blocks:[],...opts},{globals:{...globals,...opts.globals}});}
async function host(name,opts={}){const{schema,liquid}=f.unpack(name),id=opts.id||'one',blocks=(opts.blocks??schema.presets?.[0]?.blocks??[]).map((b,i)=>({id:b.id||id+'-block-'+i,type:b.type,settings:{...f.defaults(schema.blocks?.find(x=>x.type===b.type)?.settings),...b.settings},shopify_attributes:'data-editor-block="'+i+'"'}));return engine.parseAndRender(platform(liquid),{section:{id,settings:{...f.defaults(schema.settings),...opts.settings},blocks},...opts.data},{globals:{...globals,...opts.globals}});}
module.exports={...f,engine,field,snippet,host};
