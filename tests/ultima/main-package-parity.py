"""The Main candidate must preserve every deployable source byte and layout."""
import hashlib,json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
result=subprocess.run([sys.executable,str(ROOT/'scripts/build-submission-candidate.py')],cwd=ROOT,capture_output=True,text=True,check=True)
stage=Path(result.stdout.strip())
manifest=json.loads((ROOT/'docs/ultima/submission-stage-quadratum.json').read_text())
assert manifest['source_parity']
for name,digest in manifest['files'].items():
    assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
    assert hashlib.sha256((stage/name).read_bytes()).hexdigest()==digest,name
for name in ['templates/index.json','templates/page.brands.json','templates/page.explore.json','templates/page.documentation.json','sections/header-group.json','sections/footer-group.json','sections/showroom-campaign.liquid','sections/editorial-story.liquid','sections/commerce-showcase.liquid','assets/quadratum-logo-ink.png','assets/quadratum-obsidian.png']:
    assert name in manifest['files'],name
    assert (ROOT/name).read_bytes()==(stage/name).read_bytes(),name
for path in (ROOT/'listings/quadratum/templates').glob('*.json'):
    source=ROOT/'templates'/path.name
    if source.exists(): assert path.read_bytes()==source.read_bytes(),path.name
for name in ['header-group.json','footer-group.json']:
    assert (ROOT/'sections'/name).read_bytes()==(ROOT/'listings/quadratum/sections'/name).read_bytes(),name
data=json.loads((stage/'config/settings_data.json').read_text(encoding='utf-8-sig'))
assert data['current']==data['presets']['Quadratum']
assert set(data['presets'])=={'Quadratum','Morrow','Northstar','Kinvar','Vantier'}
assert json.loads((stage/'templates/index.json').read_text())['sections']['campaign']['type']=='showroom-campaign'
print('PASS Main byte parity: '+str(len(manifest['files']))+' files; branded layouts, navigation, artwork and matching Quadratum preset retained.')
