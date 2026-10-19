"""Apply reviewed runtime corrections only to the five activated demo themes."""
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLI = ['node', 'C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js']
records = json.loads((ROOT/'docs/ultima/demo-activation-20261019.json').read_text())
stages = json.loads((ROOT/'docs/ultima/independent-demo-config-20261019.json').read_text())
changed = ['assets/header-one.js', 'sections/header-one.liquid', 'locales/en.default.json', 'listings/northstar/templates/index.json', 'listings/morrow/templates/index.json']
results = []
for record in records:
    stage = next(s for s in stages if s['preset'] == record['preset'])
    path = Path(stage['demo_stage']).resolve()
    assert path.parent == (ROOT/'.cache/independent-demo-config').resolve()
    assert stage['runtime_parity'] == 'PASS' and not stage['unresolved']
    response = subprocess.run(CLI+['theme','list','--store',record['store'],'--json'], capture_output=True, text=True, check=True)
    theme = next(t for t in json.loads(response.stdout) if t['id'] == record['theme_id'])
    assert theme['role'] == 'live'
    files = changed + (['templates/index.json'] if record['preset'] in {'Northstar', 'Morrow'} else [])
    args = ['theme','push','--store',record['store'],'--theme',str(record['theme_id']),'--path',str(path),'--allow-live','--nodelete','--no-input','--json']
    for name in files:
        args += ['--only', name]
    result = subprocess.run(CLI+args,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=180)
    if result.returncode:
        (ROOT/'.cache/demo-runtime-update-error.log').write_text(result.stdout+result.stderr,encoding='utf-8')
        raise RuntimeError(record['preset']+': upload failed; see local error log')
    results.append({'preset':record['preset'],'theme_id':record['theme_id'],'store':record['store'],'uploaded_utc':datetime.now(timezone.utc).isoformat(),'files':{n:hashlib.sha256((path/n).read_bytes()).hexdigest() for n in files}})
    (ROOT/'docs/ultima/demo-runtime-update-20261019.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
    print(record['preset']+': corrected drawer controls and bundled icon configuration uploaded',flush=True)
