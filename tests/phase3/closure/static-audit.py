import json,re,pathlib,subprocess,hashlib,collections
root=pathlib.Path('.')
def read(p): return p.read_text()
def parse(s):return json.loads(re.sub(r'/\*.*?\*/','',s,flags=re.S))
errors=[];warnings=[]
required=['product.json','page.json','list-collections.json','gift_card.liquid','password.liquid']+['customers/'+x+'.liquid' for x in ['login','register','account','order','addresses','activate_account','reset_password']]
for file in required:
 if not (root/'templates'/file).is_file():errors.append('Missing template '+file)
assert (root/'layout/password.liquid').is_file()
for p in [*root.glob('templates/**/*.json'),*root.glob('config/*.json'),*root.glob('locales/*.json')]:
 try:d=parse(read(p))
 except Exception as e:errors.append(f'{p}: {e}');continue
 if 'templates' in p.parts:
  for sec in d.get('sections',{}).values():
   if not (root/'sections'/(sec['type']+'.liquid')).exists():errors.append(f'{p}: missing section {sec["type"]}')
  if len(d.get('order',[]))!=len(set(d.get('order',[]))):errors.append(f'{p}: duplicate section order')
  for id in d.get('order',[]):
   if id not in d.get('sections',{}):errors.append(f'{p}: invalid order ID {id}')
for file in required:
 stem=str(pathlib.Path(file).with_suffix(''))
 if (root/'templates'/(stem+'.json')).exists() and (root/'templates'/(stem+'.liquid')).exists():errors.append('Duplicate template '+stem)
locale=parse(read(root/'locales/en.default.json'))
def key_exists(key):
 cur=locale
 for part in key.split('.'):
  if not isinstance(cur,dict) or part not in cur:return False
  cur=cur[part]
 return True
keys=set();missing_assets=set();api=set()
for folder in ['sections','snippets','blocks','layout','templates','assets']:
 for p in (root/folder).rglob('*'):
  if not p.is_file() or p.suffix not in ['.liquid','.js','.css']:continue
  text=read(p)
  text=re.sub(r'{%-?\s*comment\s*-?%}.*?{%-?\s*endcomment\s*-?%}','',text,flags=re.S)
  for key in re.findall(r"['\"]([\w.]+)['\"]\s*\|\s*t\b",text):keys.add(key)
  for asset in re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url",text):
   if not (root/'assets'/asset).exists() and not (root/'assets'/(asset+'.liquid')).exists():missing_assets.add((str(p),asset))
  for name in re.findall(r'section_id=([a-zA-Z][\w-]+)',text):api.add((str(p),name))
for key in sorted(keys):
 if not key_exists(key):errors.append('Missing translation '+key)
for path,name in sorted(api):
 if not (root/'sections'/(name+'.liquid')).exists():warnings.append({'path':path,'section_rendering_target':name,'status':'unresolved reference'})
for p in ['sections/footer-two.liquid','sections/footer-three.liquid','blocks/content-social-links.liquid']:
 if re.search(r'settings.social_\w+_link\b',read(root/p)):errors.append('Legacy social IDs '+p)
assert (root/'assets/worm.svg').stat().st_size>0
assert '127.0.0.1' not in read(root/'sections/call-to-action-icon-list.liquid')
assert '"show_count"' not in read(root/'sections/main-blog-collection.liquid')
assert "section_id=product-wishlist-card-renderer" in read(root/'assets/section-product-wishlist.js')
assert "render 'product-card'" in read(root/'sections/product-wishlist-card-renderer.liquid')
assert "render 'search-form-predictive'" in read(root/'sections/header-five.liquid')
protected=root/'config/settings_data.json'
assert protected.read_bytes()==subprocess.check_output(['git','show','8c72025:config/settings_data.json'])
assert not subprocess.check_output(['git','diff','--name-only','--diff-filter=D','8c72025']).strip()
result={'errors':errors,'translation_keys':sorted(keys),'missing_assets':sorted(missing_assets),'section_rendering_references':sorted(api),'reference_warnings':warnings,'required_template_paths':13,'sections':len(list(root.glob('sections/*.liquid'))),'blocks':len(list(root.glob('blocks/*.liquid'))),'merchant_state_sha256':hashlib.sha256(protected.read_bytes()).hexdigest(),'merchant_state_unchanged':True,'unauthorized_deletions':0}
print(json.dumps(result,indent=2))
if errors or missing_assets:raise SystemExit(1)
