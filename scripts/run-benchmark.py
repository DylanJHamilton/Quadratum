"""Run local Lighthouse with isolated processes and retain redacted audit evidence."""
import argparse
import json
import os
import re
import statistics
import subprocess
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--runs', type=int, default=3)
parser.add_argument('--pages', nargs='+', default=['home', 'product', 'collection'])
parser.add_argument('--output', default='docs/ultima/benchmark-final')
args = parser.parse_args()
cli = ROOT / '.cache/lighthouse/node_modules/lighthouse/cli/index.js'
node = os.environ.get('ULTIMA_AUDIT_NODE', 'node')
assert cli.is_file()
base = urlsplit((ROOT / '.cache/benchmark-preview-url.txt').read_text().strip())
paths = {'home': '/', 'product': '/products/amazing-ice-sunglasses-collection20', 'collection': '/collections/collection20'}
reports = ROOT / args.output
reports.mkdir(parents=True, exist_ok=True)
results = []
for device in ['mobile', 'desktop']:
    for page in args.pages:
        for run in range(1, args.runs + 1):
            query = dict(parse_qsl(base.query)); query['pb'] = '0'
            url = urlunsplit((base.scheme, base.netloc, paths[page], urlencode(query), ''))
            temporary = ROOT / '.cache' / f'lighthouse-{device}-{page}-{run}.json'
            command = [node, str(cli), url, '--only-categories=performance,accessibility', '--output=json', '--output-path=' + str(temporary), '--chrome-flags=--headless --disable-gpu', '--quiet']
            if device == 'desktop':
                command += ['--preset=desktop']
            attempts = []
            for attempt in range(1, 4):
                if temporary.exists():
                    temporary.unlink()
                proc = subprocess.run(command, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=180)
                if not temporary.is_file():
                    raise RuntimeError(f'Lighthouse did not produce {device}/{page}/{run}; exit {proc.returncode}')
                data = json.loads(temporary.read_text(encoding='utf-8'))
                final_path = urlsplit(data.get('finalDisplayedUrl') or data.get('finalUrl') or '').path
                if final_path.rstrip('/') != paths[page].rstrip('/'):
                    raise RuntimeError(f'Benchmark navigation did not reach {page}; refresh the authorized preview link. No score is accepted.')
                scores = {k: round(v['score'] * 100, 1) if v.get('score') is not None else None for k, v in data.get('categories', {}).items()}
                assert set(scores) == {'performance', 'accessibility'}, 'Missing Lighthouse categories'
                errors = {k: a.get('errorMessage') for k, a in data['audits'].items() if a.get('scoreDisplayMode') == 'error'}
                attempts.append({'attempt': attempt, 'scores': scores, 'errors': errors})
                if all(value is not None for value in scores.values()) and not data.get('runtimeError'):
                    break
            # Preview credentials remain in ignored temporary files only.
            raw = json.dumps(data, ensure_ascii=False)
            for key, value in parse_qsl(base.query):
                if key in {'_bt', 'key'}:
                    raw = raw.replace(value, '[REDACTED]').replace(urlencode({key: value}), key + '=[REDACTED]')
            # Shopify can issue additional preview/telemetry query keys during
            # navigation. Do not retain those transient values in public logs.
            raw = re.sub(r'((?:_bt|key|token|signature)=)(?!\[REDACTED\]|%5BREDACTED%5D)([^&\s"<>\\]+)', r'\1[REDACTED]', raw)
            name = f'{device}-{page}-{run}.json'
            (reports / name).write_text(raw + '\n', encoding='utf-8')
            row = {'device': device, 'page': page, 'run': run, 'scores': scores, 'attempts': attempts, 'runtime_error': data.get('runtimeError'), 'report': name}
            results.append(row)
            print(json.dumps(row), flush=True)
            (reports / 'runs.json').write_text(json.dumps(results, indent=2) + '\n')
            if any(value is None for value in scores.values()) or data.get('runtimeError'):
                raise RuntimeError(f'No valid score for {device}/{page}/{run} after three attempts. Evidence saved; matrix not passed.')
summary = {'runs': results, 'medians': {}, 'complete_matrix': set(args.pages) == set(paths) and args.runs >= 3}
for device in ['mobile', 'desktop']:
    per_page = {page: {category: statistics.median(row['scores'][category] for row in results if row['device'] == device and row['page'] == page) for category in ['performance', 'accessibility']} for page in args.pages}
    summary['medians'][device] = per_page
    if set(args.pages) == set(paths):
        summary.setdefault('averages', {})[device] = {c: round(statistics.mean(v[c] for v in per_page.values()), 2) for c in ['performance', 'accessibility']}
summary['thresholds_met'] = summary['complete_matrix'] and all(v['performance'] >= 60 and v['accessibility'] >= 90 for v in summary.get('averages', {}).values())
(reports / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'runs'}))
