"""Repeat the established regression suites and retain every result."""
import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
env = dict(os.environ, NODE_PATH=str(ROOT / 'tests/phase3/node_modules'))
prior = json.loads((ROOT / 'docs/ultima/checklist-suites-20261018.json').read_text())
results = []
for row in prior:
    suite = row['suite']
    result = subprocess.run(['node', suite], cwd=ROOT, env=env, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=120)
    results.append({'suite': suite, 'passed': result.returncode == 0, 'output': result.stdout + result.stderr})
    print(('PASS ' if result.returncode == 0 else 'FAIL ') + suite, flush=True)
    (ROOT / 'docs/ultima/release-regression-20261019.json').write_text(json.dumps(results, indent=2) + '\n', encoding='utf-8')
raise SystemExit(0 if all(row['passed'] for row in results) else 1)
