"""Prepare one preset's install state for the isolated QA draft; never edits root settings."""
from pathlib import Path
import argparse,json,shutil
p=argparse.ArgumentParser();p.add_argument('preset',choices=['Quadratum','Morrow','Northstar','Kinvar','Vantier']);a=p.parse_args()
root=Path(__file__).resolve().parents[1];out=root/'.cache'/'ultima-preset'/a.preset.lower();out.mkdir(parents=True,exist_ok=True)
for folder in ['config','templates','sections','layout','assets','locales','snippets','blocks']:
 (out/folder).mkdir(exist_ok=True)
 for f in (root/folder).glob('*'):
  if f.is_file() and f.name not in ['icons.svg','.gitkeep']: shutil.copy2(f,out/folder/f.name)
for f in (root/'templates').glob('*'):
 if f.is_file():shutil.copy2(f,out/'templates'/f.name)
for f in (root/'listings'/a.preset.lower()/'templates').glob('*.json'):shutil.copy2(f,out/'templates'/f.name)
for f in (root/'listings'/a.preset.lower()/'sections').glob('*.json'):shutil.copy2(f,out/'sections'/f.name)
shutil.copy2(root/'config/settings_schema.json',out/'config/settings_schema.json')
data=json.loads((root/'config/settings_data.json').read_text(encoding='utf-8'));data['current']=data['presets'][a.preset]
(out/'config/settings_data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
shutil.copy2(root/'layout/theme.liquid',out/'layout/theme.liquid')
print(out)
