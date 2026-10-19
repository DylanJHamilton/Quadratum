"""Inspect all five staged packages for store and showroom leakage."""
import json, re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
FORBIDDEN=re.compile(r'Quadratum|ChatGPT|Claude|brand worlds|theme demo|concept(?:ual)? store|fictional|no inventory|checkout is disabled|nothing is (?:offered|sold|charged)|not offered for (?:purchase|sale)|preview_theme_id|shopify://',re.I)
rows=[]

def check_values(value,where):
    if isinstance(value,dict):
        for key,child in value.items():check_values(child,where+'/'+key)
    elif isinstance(value,list):
        for index,child in enumerate(value):check_values(child,where+'/'+str(index))
    elif isinstance(value,str):
        assert not FORBIDDEN.search(value),(where,value)

def nodes(value,where):
    if isinstance(value,dict):
        if 'settings' in value:check_values(value['settings'],where+'/settings')
        for key,child in value.items():
            if key!='settings':nodes(child,where+'/'+key)
    elif isinstance(value,list):
        for index,child in enumerate(value):nodes(child,where+'/'+str(index))

for preset in ['quadratum','morrow','northstar','kinvar','vantier']:
    manifest=json.loads((ROOT/'docs/ultima'/('submission-stage-'+preset+'.json')).read_text())
    stage=Path(manifest['output'])
    assert 'ultima-submission' in stage.parts
    paths=[*(stage/'templates').rglob('*.json'),*(stage/'sections').glob('*.json'),*(stage/'listings').rglob('*.json')]
    for path in paths:nodes(json.loads(path.read_text()),str(path.relative_to(stage)))
    data=json.loads((stage/'config/settings_data.json').read_text())
    assert set(data['presets'])=={'Quadratum','Morrow','Northstar','Kinvar','Vantier'}
    check_values(data['current'],'current')
    for name,settings in data['presets'].items():check_values(settings,'preset/'+name)
    assert not list((stage/'assets').glob('q-doc-*'))
    assert not (stage/'templates/page.brands.json').exists()
    assert data['presets']['Quadratum']['popup_button_url']=='/collections/all'
    rows.append({'preset':preset,'passed':True,'json_templates_checked':len(paths),'path':str(stage)})
(ROOT/'docs/ultima/checklist-portability-20261018.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
print('PASS five staged packages: no showroom promotion, fictional-store claims, preview URLs or store resource references in saved settings; five presets retained.')
