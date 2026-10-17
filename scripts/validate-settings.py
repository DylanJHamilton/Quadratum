"""Validate saved range settings against section, block and theme schemas."""
import json,re,sys
from pathlib import Path
from decimal import Decimal
ROOT=Path(sys.argv[sys.argv.index('--root')+1]) if '--root' in sys.argv else Path(__file__).resolve().parents[1]
errors=[]
def read(p):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(r'^\s*/\*.*?\*/','',s,flags=re.S);return json.loads(s)
def schema(p):
 m=re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}',p.read_text(encoding='utf-8-sig'),re.S)
 return json.loads(m[1]) if m else {}
sections={p.stem:schema(p) for p in (ROOT/'sections').glob('*.liquid')}
blocks={p.stem:schema(p) for p in (ROOT/'blocks').glob('*.liquid')}
global_schema={'settings':[s for group in read(ROOT/'config/settings_schema.json') for s in group.get('settings',[])]}

def unique_ids(sc,where):
 seen=set()
 for setting in sc.get('settings',[]):
  key=setting.get('id')
  if key is None:continue
  if key in seen:errors.append({'path':where,'error':'Duplicate setting ID','setting':key})
  seen.add(key)
 for block in sc.get('blocks',[]):unique_ids(block,where+'/blocks/'+block.get('type','unknown'))
for key,sc in sections.items():unique_ids(sc,'sections/'+key+'.liquid')
for key,sc in blocks.items():unique_ids(sc,'blocks/'+key+'.liquid')
unique_ids(global_schema,'config/settings_schema.json')
def check(values,sc,where):
 for setting in sc.get('settings',[]):
  key=setting.get('id');v=values.get(key)
  if setting.get('type') in ['select','radio'] and v is not None and not (isinstance(v,str) and '{{' in v):
   allowed=[option['value'] for option in setting.get('options',[])]
   if v not in allowed:errors.append({'path':where,'setting':key,'value':v,'error':'Invalid option','allowed':allowed})
  if setting.get('type')!='range' or v is None or (isinstance(v,str) and '{{' in v):continue
  try:
   n=Decimal(str(v));lo=Decimal(str(setting['min']));hi=Decimal(str(setting['max']));step=Decimal(str(setting.get('step',1)))
   valid=lo<=n<=hi and (n-lo)%step==0
  except Exception:valid=False
  if not valid:errors.append({'path':where,'setting':key,'value':v,'min':setting['min'],'max':setting['max'],'step':setting.get('step',1)})
def node(n,sc,where):
 check(n.get('settings',{}),sc,where)
 for key,b in n.get('blocks',{}).items():
  own=next((x for x in sc.get('blocks',[]) if x.get('type')==b.get('type')),None)
  node(b,own or blocks.get(b.get('type'),{}),where+'/blocks/'+key)
def template(data,where):
 for key,n in data.get('sections',{}).items():node(n,sections.get(n.get('type',key),{}),where+'/sections/'+key)
for p in list((ROOT/'templates').rglob('*.json'))+list((ROOT/'listings').rglob('*.json'))+list((ROOT/'sections').glob('*.json')):
 template(read(p),p.relative_to(ROOT).as_posix())
data=read(ROOT/'config/settings_data.json')
for key,values in [('current',data.get('current',{})),*data.get('presets',{}).items()]:
 if isinstance(values,dict):check(values,global_schema,'config/settings_data.json/'+key);template(values,'config/settings_data.json/'+key)
if '--json' in sys.argv:print(json.dumps(errors,indent=2))
else:
 for e in errors: print(json.dumps(e))
 print(f'{len(errors)} schema/settings validation errors')
sys.exit(bool(errors))
