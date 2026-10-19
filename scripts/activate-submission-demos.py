"""Upload and activate the five owner-approved submission demos; no plan changes."""
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
CLI=['node','C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js']
KNOWN={'Quadratum':('quadratum-demo-980pmuvq.myshopify.com',167948386559),
       'Morrow':('morrow-demo-n1g8xt1c.myshopify.com',191948652834),
       'Northstar':('northstar-demo-sueaj95b.myshopify.com',189365387509),
       'Kinvar':('kinvar-demo-ccn6f2iz.myshopify.com',159760908426),
       'Vantier':('vantier-demo-8tsefjs7.myshopify.com',186251051231)}
stages=json.loads((ROOT/'docs/ultima/independent-demo-config-20261019.json').read_text())
report=ROOT/'docs/ultima/demo-activation-20261019.json'
results=[]
def run(args, timeout=300):
    result=subprocess.run(CLI+args,cwd=ROOT,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=timeout)
    if result.returncode:
        (ROOT/'.cache/demo-activation-error.log').write_text(result.stdout+result.stderr,encoding='utf-8')
        raise RuntimeError('Shopify CLI failed; inspect the local error log.')
    return result.stdout
for stage in stages:
    name=stage['preset']; domain,theme_id=KNOWN[name]
    target=Path(stage['demo_stage']).resolve()
    assert target.parent==(ROOT/'.cache/independent-demo-config').resolve()
    assert stage['runtime_parity']=='PASS' and not stage['unresolved']
    themes=json.loads(run(['theme','list','--store',domain,'--json']))
    actual=next(t for t in themes if int(t['id'])==theme_id)
    assert actual['role']=='unpublished', f'{name}: review active role before redeploying'
    previous=next(t for t in themes if t['role']=='live')
    print(name+': uploading verified merchant runtime and matching demo content',flush=True)
    run(['theme','push','--store',domain,'--theme',str(theme_id),'--path',str(target),'--no-input','--json'])
    print(name+': activating existing demo theme',flush=True)
    run(['theme','publish','--store',domain,'--theme',str(theme_id),'--force','--no-input'])
    verified=json.loads(run(['theme','list','--store',domain,'--json']))
    assert next(t for t in verified if int(t['id'])==theme_id)['role']=='live'
    files={p.relative_to(target).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in target.rglob('*') if p.is_file()}
    results.append({'preset':name,'store':domain,'theme_id':theme_id,'role':'main','previous_theme_id':previous['id'],'previous_theme_retained':True,'activated_utc':datetime.now(timezone.utc).isoformat(),'runtime_parity':'PASS','files':files,'billing_or_password_changed':False})
    report.write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
    print(name+': confirmed published; no billing or password change',flush=True)
