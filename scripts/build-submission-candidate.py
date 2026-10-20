"""Copy Main theme files unchanged. Release packaging must never redesign the theme."""
import argparse,hashlib,json,re,shutil,subprocess
from datetime import datetime, timezone
from pathlib import Path
from submission_native_services import apply as validate_native_services
ROOT=Path(__file__).resolve().parents[1]
PRESETS=['Quadratum','Morrow','Northstar','Kinvar','Vantier']
FOLDERS=['assets','blocks','config','layout','locales','sections','snippets','templates','listings']
def distributable(relative):
    # Exclude compiled icon inputs and Shopify's prohibited store markets file only.
    return relative.name != '.gitkeep' and relative.as_posix() not in {'assets/icons.svg','config/markets.json'} and not (relative.parts[0]=='assets' and len(relative.parts)>2)
parser=argparse.ArgumentParser()
parser.add_argument('--preset',choices=PRESETS,default='Quadratum')
parser.add_argument('--source-commit')
args=parser.parse_args()
if args.source_commit: assert re.fullmatch(r'[0-9a-f]{40}',args.source_commit)
output=ROOT/'.cache/ultima-submission'/(args.preset.lower()+'-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ'))
output.mkdir(parents=True,exist_ok=False)
excluded=[];source_files={}
for folder in FOLDERS:
    for path in sorted((ROOT/folder).rglob('*')):
        if not path.is_file(): continue
        relative=path.relative_to(ROOT)
        if not distributable(relative):
            excluded.append(relative.as_posix());continue
        destination=output/relative;destination.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(path,destination)
        source_files[relative.as_posix()]=hashlib.sha256(path.read_bytes()).hexdigest()
assert not validate_native_services(output),'Compliance corrections must already be in Main.'
if args.preset!='Quadratum':
    # Explicit alternative-preset preview fixture; never used by release packaging.
    for folder in ['templates','sections']:
        for path in (output/'listings'/args.preset.lower()/folder).glob('*.json'):
            shutil.copy2(path,output/folder/path.name)
    path=output/'config/settings_data.json';settings=json.loads(path.read_text(encoding='utf-8-sig'))
    settings['current']=settings['presets'][args.preset]
    path.write_text(json.dumps(settings,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
files={p.relative_to(output).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(output.rglob('*')) if p.is_file()}
if args.preset=='Quadratum': assert files==source_files,'Main package was rewritten or lost files.'
manifest={'status':'SOURCE-IDENTICAL CANDIDATE - ACCEPTANCE CHECKS SEPARATE','preset':args.preset,'source_head':args.source_commit or subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'includes_working_tree':not bool(args.source_commit),'output':str(output),'source_parity':args.preset=='Quadratum','excluded':excluded,'files':files}
report=ROOT/'docs/ultima'/('submission-stage-'+args.preset.lower()+'.json');report.parent.mkdir(parents=True,exist_ok=True)
report.write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(output)
