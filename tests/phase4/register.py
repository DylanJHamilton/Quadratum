"""Inventory components and trace literal dependencies; never infer release readiness."""
from pathlib import Path
import csv,json,re,hashlib,collections
ROOT=Path(__file__).resolve().parents[2]
SCHEMA=re.compile(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}',re.S)
def family(name):
 if name in ['blog-card', 'section-main-blog-single']:return '3 Collection / Discovery'
 if name in ['forms-sections', 'frontend-form-logic', 'frontend-form-logic-form-sections']:return '6 Forms / Conversion'
 if name in ['card-product', 'icon-social', 'q-social-micro-post-card', 'q-social-pinterest-card', 'q-social-pinterest-thumb', 'q-social-profile-icon']:return '7 Social / Third Party / Utilities'
 if name in ['qtm-content-block-wrapper-end', 'qtm-content-block-wrapper-start', 'qtm-content-blocks', 'qtm-content-blocks-engine', 'qtm-product-block-metadata', 'qtm-product-block-commerce', 'qtm-product-block-data', 'qtm-product-block-variant', 'qtm-product-information-value', 'qtm-block-metafield', 'qtm-block-panels', 'qtm-block-deadline', 'qtm-product-block-utilities', 'qtm-block-product-media', 'qtm-product-block-gallery', 'qtm-block-product-card', 'qtm-block-product-cards', 'qtm-block-bundle-item', 'qtm-block-bundles', 'qtm-block-navigation', 'qtm-block-comparison-value', 'qtm-block-location-info', 'qtm-block-visual-media', 'qtm-block-collection-card']:return '8 Theme Blocks'
 if name in ['boxed-content-media', 'contrast-text', 'icon-sprite', 'icons', 'q-base.css', 'q-disclosure', 'q-spacing', 'qtm-section-surfaces', 'quadratum-tokens', 'section-slideshow', 'styles', 'tailwind', 'theme', 'theme-tokens', 'utilities', 'worm']:return '9 Snippet / Asset Closure'
 if name == 'global-theme-vars':return '1 Global / Structural'
 if name in ['pb-bundle-card','interactive-content-helper-product-slider']:return '4 Product / Commerce'
 if name.startswith(('header','footer')) or name in ['global-popup','search-popup','search-controller','q-nav','search-form-static','search-form-predictive','predictive-search']:return '1 Global / Structural'
 if name.startswith(('form-','call-to-action-newsletter','call-to-action-quote')):return '6 Forms / Conversion'
 if name.startswith(('3rd-party','social-media','maps-','account-')):return '7 Social / Third Party / Utilities'
 if name.startswith(('main-product','product-','feeds-product','featured-content-product','main-cart','section-main-cart','cart-','q-quick-view','section-product-')):return '4 Product / Commerce'
 if 'collection' in name or name.startswith(('main-search','feeds-','main-blog')):return '3 Collection / Discovery'
 if any(x in name for x in ['banner','call-to-action','hero']):return '2 Hero / Banner / CTA'
 return '5 Content / Interactive'
files=[p for d in ['sections','blocks','snippets','assets'] for p in sorted((ROOT/d).rglob('*')) if p.suffix in ['.liquid','.js','.css','.svg'] and 'icons' not in p.relative_to(ROOT).parts]
rows=[];consumers=collections.defaultdict(list);sources={}
context_files=[p for d in ['layout','templates','config'] for p in (ROOT/d).rglob('*') if p.suffix in ['.liquid','.json']]
for p in files+context_files:
 name=str(p.relative_to(ROOT));s=p.read_text()
 if p in files:sources[name]=s
 trace=re.sub(r'{%-?\s*comment\s*-?%}.*?{%-?\s*endcomment\s*-?%}', '', s, flags=re.S)
 for section in re.findall(r"(?:section\s+['\"]|\"type\"\s*:\s*\")([\w-]+)",trace):consumers['sections/'+section+'.liquid'].append(name)
 for ref in re.findall(r"(?:render|include)\s+['\"]([^'\"]+)['\"]",trace):consumers['snippets/'+ref+'.liquid'].append(name)
 for ref in re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url",trace):consumers['assets/'+ref].append(name)
for name,s in sources.items():
 p=Path(name);starts=list(re.finditer(r'{%-?\s*schema\s*-?%}',s));matches=list(SCHEMA.finditer(s,starts[-1].start())) if starts else [];schema={};valid='N/A'
 if matches:
  try:schema=json.loads(matches[-1][1]);valid='YES'
  except Exception as e:valid='ERROR: '+str(e)
 trace=re.sub(r'{%-?\s*comment\s*-?%}.*?{%-?\s*endcomment\s*-?%}', '', s, flags=re.S)
 dependencies=sorted(set('snippets/'+v+'.liquid' for v in re.findall(r"(?:render|include)\s+['\"]([^'\"]+)['\"]",trace)))
 assets=sorted(set(re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url",trace)))
 rows.append({'Type':p.parts[0],'Component':p.stem,'File':name,'Family':family(p.stem) if p.parts[0]!='blocks' else '8 Theme Blocks','Dependencies':';'.join(dependencies),'CSS Asset':';'.join(a for a in assets if '.css' in a),'JS Asset':';'.join(a for a in assets if '.js' in a),'Consumers':';'.join(sorted(set(consumers[name]))),'Schema Valid':valid,'Settings Reviewed':'PENDING','Preset Reviewed':'PENDING' if schema.get('presets') else 'N/A','Responsive Reviewed':'PENDING','Accessibility Reviewed':'PENDING','Multi-Instance Reviewed':'PENDING','Theme Editor Reviewed':'PENDING','Theme Check Reviewed':'PENDING','Final Disposition':'NOT REVIEWED','Changes':'','Live Verification Needed':'Not yet assessed','Notes':'Literal dependency trace only; dynamic consumers require review.','SHA256':hashlib.sha256((ROOT/name).read_bytes()).hexdigest()})
path=ROOT/'docs/phase4/component-register.csv'
if path.exists():
 previous={r['File']:r for r in csv.DictReader(path.open())}
 for row in rows:
  if row['File'] in previous:
   for k in ['Family','Settings Reviewed','Preset Reviewed','Responsive Reviewed','Accessibility Reviewed','Multi-Instance Reviewed','Theme Editor Reviewed','Theme Check Reviewed','Final Disposition','Changes','Live Verification Needed','Notes']:row[k]=previous[row['File']][k]
hashes=[{'path':row['File'],'sha256':row.pop('SHA256')} for row in rows]
(path.parent/'component-source-hashes.json').write_text(json.dumps(hashes,indent=2)+'\n')
with path.open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=rows[0],lineterminator="\n");w.writeheader();w.writerows(rows)
print(json.dumps({'components':len(rows),'types':dict(collections.Counter(r['Type'] for r in rows)),'schema_errors':[r['File'] for r in rows if r['Schema Valid'].startswith('ERROR')],'reviewed':sum(r['Final Disposition']!='NOT REVIEWED' for r in rows)},indent=2))
