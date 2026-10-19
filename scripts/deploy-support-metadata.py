"""Update only support metadata in the explicitly identified unpublished QA themes."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / 'docs/ultima'
CLI = ['node', 'C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js']
URL = json.loads((REPORTS / 'support-delivery-20261019.json').read_text())['public_url']
stores = json.loads((REPORTS / 'preset-demo-stores.json').read_text())['stores']
jobs = [(s['store'], s['theme_upload']['theme']['id'], Path(s['candidate'])) for s in stores]
jobs.append(('quadratum-benchmark.myshopify.com', 188064661674, ROOT / '.cache/ultima-benchmark'))
results = []
for store, theme_id, folder in jobs:
    listing = subprocess.run(CLI + ['theme', 'list', '--store', store, '--json'], capture_output=True, text=True, encoding='utf-8', timeout=120, check=True)
    actual = next(t for t in json.loads(listing.stdout) if int(t['id']) == int(theme_id))
    assert actual['role'] == 'unpublished', f'Refuse to update published theme: {store}'
    path = folder / 'config/settings_schema.json'
    raw = path.read_bytes()
    schema = json.loads(raw.decode('utf-8-sig'))
    info = next(g for g in schema if g.get('name') == 'theme_info')
    old = info['theme_support_url']
    # Preserve every other byte and all preset-specific metadata.
    path.write_bytes(raw.replace(old.encode(), URL.encode(), 1))
    push = subprocess.run(CLI + ['theme', 'push', '--store', store, '--theme', str(theme_id), '--path', str(folder), '--only', 'config/settings_schema.json', '--nodelete', '--no-input', '--json'], capture_output=True, text=True, encoding='utf-8', timeout=180)
    result = {'store': store, 'theme_id': theme_id, 'role': actual['role'], 'file': 'config/settings_schema.json', 'support_url': URL, 'success': push.returncode == 0}
    if push.returncode:
        (ROOT / '.cache/support-metadata-error.log').write_text(push.stdout + push.stderr)
    results.append(result)
    (REPORTS / 'support-metadata-deployment-20261019.json').write_text(json.dumps(results, indent=2) + '\n')
    print(json.dumps(result), flush=True)
    if push.returncode:
        raise SystemExit(push.returncode)
