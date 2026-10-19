"""Rebuild and inspect every preset; this does not certify Theme Store acceptance."""
import collections, concurrent.futures, hashlib, json, shutil, subprocess, tempfile, time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / 'docs/ultima'
CLI = shutil.which('shopify')
if not CLI:
    raise SystemExit('Shopify CLI is required.')

def run(args):
    return subprocess.run(args, cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace')

def source_snapshot():
    """Check exact theme sources without recursively indexing prior build caches."""
    parent = ROOT / '.cache/ultima-source-check'
    parent.mkdir(parents=True, exist_ok=True)
    target = Path(tempfile.mkdtemp(prefix='source-', dir=parent))
    inventory = {}
    for folder in ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates', 'listings']:
        if (ROOT / folder).is_dir():
            shutil.copytree(ROOT / folder, target / folder)
            for file in sorted((ROOT / folder).rglob('*')):
                if file.is_file():
                    relative = file.relative_to(ROOT)
                    digest = hashlib.sha256(file.read_bytes()).hexdigest()
                    assert digest == hashlib.sha256((target / relative).read_bytes()).hexdigest(), relative
                    inventory[relative.as_posix()] = digest
    for name in ['.theme-check.yml', '.shopifyignore']:
        if (ROOT / name).is_file():
            shutil.copy2(ROOT / name, target / name)
    evidence = {'source': str(ROOT), 'snapshot': str(target), 'method': 'Byte-identical copies of every file in all eight theme directories plus listings. Repository engineering files and prior build caches are outside the scan. No Theme Check rules suppressed.', 'file_count': len(inventory), 'sha256': inventory}
    (REPORTS / 'checklist-source-snapshot-20261018.json').write_text(json.dumps(evidence, indent=2), encoding='utf-8')
    return target

def check(name, path):
    start = time.monotonic()
    result = run([CLI, 'theme', 'check', '--path', str(path), '--output', 'json'])
    try:
        diagnostics = json.loads(result.stdout)
    except ValueError:
        raise RuntimeError((result.stdout + result.stderr)[-4000:])
    (REPORTS / f'checklist-theme-check-{name}.json').write_text(json.dumps(diagnostics, indent=2), encoding='utf-8')
    offenses = [dict(item, path=file['path']) for file in diagnostics for item in file.get('offenses', [])]
    settings = run(['python', 'scripts/validate-settings.py', '--root', str(path), '--json'])
    (REPORTS / f'checklist-settings-{name}.json').write_text(settings.stdout, encoding='utf-8')
    row = {'name': name, 'path': str(path), 'errors': sum(i['severity'] == 'error' for i in offenses), 'warnings': sum(i['severity'] == 'warning' for i in offenses), 'categories': dict(collections.Counter(i['check'] for i in offenses)), 'settings_passed': settings.returncode == 0, 'seconds': round(time.monotonic() - start, 1), 'error_details': [i for i in offenses if i['severity'] == 'error']}
    if name == 'source':
        row.update(path=str(ROOT), scan_path=str(path), snapshot_evidence='checklist-source-snapshot-20261018.json')
    print(json.dumps(row), flush=True)
    return row

if __name__ == '__main__':
    jobs = [('source', source_snapshot())]
    for name in ['Quadratum', 'Morrow', 'Northstar', 'Kinvar', 'Vantier']:
        built = run(['python', 'scripts/build-submission-candidate.py', '--preset', name])
        if built.returncode:
            raise RuntimeError(built.stdout + built.stderr)
        jobs.append((name.lower(), Path(built.stdout.strip())))
    print('Checking source and five fresh merchant candidates', flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        rows = list(pool.map(lambda item: check(*item), jobs))
    (REPORTS / 'checklist-package-results-20261018.json').write_text(json.dumps(rows, indent=2), encoding='utf-8')
    raise SystemExit(1 if any(row['errors'] or not row['settings_passed'] for row in rows) else 0)
