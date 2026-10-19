"""Deploy verified demo configuration only to the five known unpublished themes."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT/'docs/ultima'
CLI = ['node', 'C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js']
stores = json.loads((REPORTS/'preset-demo-stores.json').read_text())['stores']
parser = argparse.ArgumentParser()
parser.add_argument('--preset', choices=[s['preset'] for s in stores])
args = parser.parse_args()
if args.preset:
    stores = [s for s in stores if s['preset'] == args.preset]
stages = {s['preset']: s for s in json.loads((REPORTS/'independent-demo-config-20261019.json').read_text())}
report_path = REPORTS/'independent-demo-deployment-20261019.json'
results = json.loads(report_path.read_text()) if report_path.exists() else []
for store in stores:
    name, domain = store['preset'], store['store']
    theme_id = int(store['theme_upload']['theme']['id'])
    stage = stages[name]
    assert stage['runtime_parity'] == 'PASS' and not stage['unresolved'], name
    target = Path(stage['demo_stage'])
    assert target.resolve().parent == (ROOT/'.cache/independent-demo-config').resolve()
    listing = subprocess.run(CLI+['theme', 'list', '--store', domain, '--json'], capture_output=True, text=True, encoding='utf-8', timeout=120, check=True)
    actual = next(t for t in json.loads(listing.stdout) if int(t['id']) == theme_id)
    assert actual['role'] == 'unpublished', f'Refuse published theme: {domain}'
    # Header renderer is unchanged. The file includes corrected insertion
    # defaults in its schema, which must accompany the JSON configuration.
    files = [p.relative_to(target).as_posix() for folder in ['config', 'templates', 'sections'] for p in (target/folder).glob('*.json')]
    files.append('sections/header-two.liquid')
    args = CLI+['theme', 'push', '--store', domain, '--theme', str(theme_id), '--path', str(target), '--nodelete', '--no-input', '--json']
    for file in files:
        args += ['--only', file]
    pushed = subprocess.run(args, capture_output=True, text=True, encoding='utf-8', timeout=300)
    result = {'preset': name, 'store': domain, 'theme_id': theme_id, 'role': actual['role'], 'success': pushed.returncode == 0, 'files': {f: hashlib.sha256((target/f).read_bytes()).hexdigest() for f in files}, 'scope': 'JSON configuration plus header schema defaults; no deletion or publication'}
    results = [r for r in results if r['preset'] != name] + [result]
    report_path.write_text(json.dumps(results, indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k != 'files'}), flush=True)
    if pushed.returncode:
        (ROOT/'.cache/independent-demo-deployment-error.log').write_text(pushed.stdout+pushed.stderr)
        raise SystemExit(pushed.returncode)
