import hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[2]
base='bcb6f48440241356c34ffb6d31afa8441e54bdb2'
def git(*args):return subprocess.check_output(['git',*args],cwd=root)
errors=[];counts={}
for folder in ['sections','blocks']:
 paths=list((root/folder).glob('*.liquid'));counts[folder]=len(paths)
 for p in paths:
  s=p.read_text();m=list(re.finditer(r'{%\s*schema\s*%}',s))
  if m:
   try:json.loads(s[m[-1].end():].split('{% endschema %}')[0])
   except Exception as e:errors.append(str(p.relative_to(root))+': '+str(e))
assert counts=={'sections':150,'blocks':102},counts
assert git('show',base+':config/settings_data.json')==(root/'config/settings_data.json').read_bytes(),'Merchant settings changed'
assert not git('diff','--name-only','--diff-filter=D',base).strip(),'Unexpected deletions'
protected=['sections/main-product-simple.liquid','sections/main-product-compact.liquid','sections/collection-modern-quick-view.liquid','assets/section-collection-modern-quick-view.js','sections/block-section.liquid','sections/product-block-section.liquid','blocks/layout-row.liquid','blocks/layout-column.liquid','blocks/product-layout-row.liquid','blocks/product-layout-column.liquid','sections/interactive-content-pricing-data-table.liquid']
# The quick-view asset's exact filename is taken from the preserved baseline.
protected=[p for p in protected if p!='assets/section-collection-modern-quick-view.js']
protected += ['assets/q-quick-view.js', 'assets/q-quick-view.css']
protected += ['sections/'+kind+'-'+number+'.liquid' for kind in ['header','footer'] for number in ['one','two','three','four','five']]
for p in protected:assert (root/p).is_file(),p
for p in (root/'assets').glob('*.js'):
 result=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
 if result.returncode:errors.append(str(p.relative_to(root))+': JavaScript syntax error')
result={'base':base,'source_commit':git('rev-parse','HEAD').decode().strip(),'counts':counts,'merchant_settings_sha256':hashlib.sha256((root/'config/settings_data.json').read_bytes()).hexdigest(),'merchant_settings_unchanged':True,'deletions':0,'protected_files':protected,'errors':errors}
print(json.dumps(result,indent=2))
if errors:raise SystemExit(1)
