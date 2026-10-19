"""Install current merchant candidates as unpublished themes in the five free demos."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLI = ['node', 'C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js']
report = ROOT / 'docs/ultima/preset-demo-stores.json'
data = json.loads(report.read_text())
for store in data['stores']:
    name = store['preset']
    stage = json.loads((ROOT / 'docs/ultima' / f'submission-stage-{name.lower()}.json').read_text())
    title = name + ' — ULTIMA Submission Demo'
    result = subprocess.run(CLI + ['theme', 'list', '--store', store['store'], '--json'], capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=120)
    if result.returncode:
        (ROOT / '.cache' / f'demo-{name.lower()}-error.log').write_text(result.stdout + result.stderr, encoding='utf-8')
        print(name + ': theme access needs attention; details saved locally.', flush=True)
        continue
    themes = json.loads(result.stdout)
    existing = [theme for theme in themes if theme['name'] == title]
    assert len(existing) <= 1, 'Ambiguous demo theme; stop before uploading'
    flags = ['--theme', str(existing[0]['id'])] if existing else ['--unpublished', '--theme', title]
    if existing:
        assert existing[0]['role'] != 'main', 'Never update a published theme here'
    result = subprocess.run(CLI + ['theme', 'push', '--store', store['store'], '--path', stage['output'], *flags, '--json', '--no-input', '--nodelete'], capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=300)
    (ROOT / '.cache' / f'demo-{name.lower()}-upload.json').write_text(result.stdout, encoding='utf-8')
    if result.returncode:
        (ROOT / '.cache' / f'demo-{name.lower()}-error.log').write_text(result.stderr, encoding='utf-8')
        print(name + ': upload did not finish; inspect existing themes before retrying.', flush=True)
        continue
    uploaded = json.loads(result.stdout)
    store['theme_upload'] = uploaded
    store['candidate'] = stage['output']
    store['status'] = 'Unpublished merchant candidate uploaded; catalog, demo configuration and payment acceptance pending'
    report.write_text(json.dumps(data, indent=2) + '\n')
    print(name + ': unpublished candidate uploaded.', flush=True)
