"""Carry authored demo templates into the five preset packages without old runtime code."""
from pathlib import Path
import json,re,copy
ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads(re.sub(r'/\*.*?\*/','',p.read_text(encoding='utf-8-sig'),flags=re.S))
def save(p,d):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
schemas={}
for p in (ROOT/'sections').glob('*.liquid'):
 m=re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}',p.read_text(encoding='utf-8'),re.S)
 if m:schemas[p.stem]=json.loads(m[1])
changes=[];sources=[];skipped=[]
def clean(n,sc,where):
 specs={s['id']:s for s in sc.get('settings',[]) if 'id'in s}
 for k,v in list(n.get('settings',{}).items()):
  s=specs.get(k)
  if not s:continue # Preserve app/legacy metadata; Shopify owns its interpretation.
  if s['type'] in ['select','radio'] and v not in [o['value'] for o in s['options']] and not (isinstance(v,str) and '{{'in v):
   changes.append({'path':where,'setting':k,'old':v,'new':s.get('default')})
   if 'default'in s:n['settings'][k]=s['default']
   else:del n['settings'][k]
 for key,b in n.get('blocks',{}).items():
  bsc=next((x for x in sc.get('blocks',[]) if x['type']==b['type']),{})
  clean(b,bsc,where+'/'+key)
mapping={
 'morrow':{'about':'morrow-about','contact':'morrow-contact','customer-care':'morrow-support'},
 'northstar':{'about':'northstar-about','contact':'northstar-contact','customer-care':'northstar-support'},
 'vantier':{'about':'vantier-about','contact':'vantier-contact','customer-care':'vantier-client-services'},
 'kinvar':{'about':'about','contact':'contact','customer-care':'customer-care'}}
for brand,aliases in mapping.items():
 source=ROOT/('demos/'+brand+'/templates' if brand!='kinvar' else 'demos/kinvar/installed-20261017/templates')
 for p in source.glob('*.json'):
  if p.name=='index.json' or any(x in p.name for x in ['section-test','landing','playground']):continue
  # Retain authored brand-specific pages and the native resource templates.
  if p.name.startswith('page.') and p.name not in ['page.json','page.about.json','page.contact.json','page.customer-care.json','page.routine-finder.json'] and not p.name.startswith('page.'+brand+'-'):continue
  d=read(p)
  missing=[s['type'] for s in d.get('sections',{}).values() if s['type'] not in schemas]
  if missing and brand=='morrow' and p.name=='page.morrow-collections.json':
   for key,n in list(d['sections'].items()):
    if n['type']=='morrow-cat-collections':
     blocks={bid:{'type':'collection','settings':{'collection':b['settings']['link'].split('/')[-1],'subtitle':b['settings']['title'],'cta_label':'Explore collection'}} for bid,b in n.get('blocks',{}).items()}
     d['sections'][key]={'type':'featured-content-collection-spotlight','settings':{'heading':n['settings']['heading']},'blocks':blocks,'block_order':list(blocks)}
    elif n['type']=='morrow-cat-catalog':
     d['sections'][key]={'type':'feeds-product-grid','settings':{'heading':'Small discoveries. Big cat energy.','source_mode':'collection','collection':'morrow-play'}}
   changes.append({'path':str(p.relative_to(ROOT)),'replacement':'Shared collection spotlight and product feed replace demo-only sections'})
   missing=[]
  if missing:
   skipped.append({'source':str(p.relative_to(ROOT)),'reason':'Demo-only sections absent from repaired runtime','sections':missing});continue
  for key,s in d.get('sections',{}).items():
   clean(s,schemas[s['type']],brand+'/'+p.name+'/'+key)
  dest=ROOT/'listings'/brand/'templates'/p.name;save(dest,d)
  sources.append({'preset':brand,'source':str(p.relative_to(ROOT)),'destination':str(dest.relative_to(ROOT))})
 for dest,source_suffix in aliases.items():
  src=ROOT/'listings'/brand/'templates'/('page.'+source_suffix+'.json')
  save(ROOT/'listings'/brand/'templates'/('page.'+dest+'.json'),read(src))
 # Native source pages provide the brand-specific service/guide experience.
 guides={'morrow':('morrow-support','morrow-about'),'northstar':('northstar-build-and-burn-in','northstar-support'),'vantier':('vantier-client-services','vantier-fit-guide'),'kinvar':('customer-care','routine-finder')}[brand]
 for destination,source_suffix in [('services',guides[0]),('buying-guide',guides[1]),('care-guide',guides[0]),('why-choose-us',aliases['about'])]:
  save(ROOT/'listings'/brand/'templates'/('page.'+destination+'.json'),read(ROOT/'listings'/brand/'templates'/('page.'+source_suffix+'.json')))
 # Keep shared alternative layouts resource-driven, and remove ARC-only upsells.
 cart=read(ROOT/'templates/cart.json');main=next(iter(cart['sections'].values()));main.pop('blocks',None);main.pop('block_order',None)
 main['settings'].update({'continue_shopping_url':'/collections/all','addons_position':'hidden'})
 save(ROOT/'listings'/brand/'templates/cart.json',cart)
save(ROOT/'docs/ultima/preset-page-recovery.json',{'templates':sources,'option_normalizations':changes,'excluded_demo_only_templates':skipped,'note':'Uses repaired shared ULTIMA runtime; original demo source snapshots retained in demos. Preset installs still require brand resource assignments and preview acceptance.'})
print('Recovered',len(sources),'preset template configurations;',len(changes),'option normalizations.')
