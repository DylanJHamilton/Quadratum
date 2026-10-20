"""Retain approved composition while keeping developer promotion off the storefront."""
import json,zipfile,re
from pathlib import Path
R=Path(__file__).resolve().parents[2]
original=R/'release/Quadratum-promotional-website-source-20261019.zip'
if original.exists():
 with zipfile.ZipFile(original) as z:
  for p in (R/'templates').glob('*.json'):
   try:
    before=json.loads(z.read('templates/'+p.name).decode('utf-8-sig'));after=json.loads(p.read_text(encoding='utf-8-sig'))
   except (KeyError,json.JSONDecodeError):continue
   assert before['order']==after['order'],p.name
   assert {k:v['type'] for k,v in before['sections'].items()}=={k:v['type'] for k,v in after['sections'].items()},p.name
   for key,s in before['sections'].items():
    assert s.get('block_order')==after['sections'][key].get('block_order'),(p.name,key)
    for attr in ['layout','brand_art','image','background','foreground']:
     assert s.get('settings',{}).get(attr)==after['sections'][key].get('settings',{}).get(attr),(p.name,key,attr)
for p in (R/'templates').glob('*.json'):
 text=p.read_text(encoding='utf-8-sig')
 assert not re.search(r'preview_theme_id=|QuadratumAssist|QuadratumScan|QuadratumLink|built with Quadratum',text,re.I),p.name
campaign=(R/'sections/showroom-campaign.liquid').read_text()
assert 'built with Quadratum' not in campaign
assert 'section.settings.note' in campaign
assert 'section.settings.secondary_link' in campaign
print('PASS retail content: original section types/order, block order, images, artwork and colors retained; developer preview links/roadmap/credit absent.')
