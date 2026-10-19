"""Build a verified merchant ZIP from committed Main, never from working files."""
import hashlib
import io
import json
import shutil
import subprocess
import sys
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FOLDERS = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates', 'listings']

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)

assert git('branch', '--show-current').decode().strip() == 'main', 'Package from Main only.'
commit = git('rev-parse', 'HEAD').decode().strip()
assert not git('status', '--porcelain', '--', *FOLDERS, 'scripts'), 'Commit source changes first.'
cache = ROOT / '.cache' / 'main-release'
cache.mkdir(parents=True, exist_ok=True)
source = Path(tempfile.mkdtemp(prefix=commit[:12]+'-', dir=cache))
archive = git('archive', '--format=zip', commit, *FOLDERS, 'scripts')
with zipfile.ZipFile(io.BytesIO(archive)) as zipped:
    assert all(not Path(n).is_absolute() and '..' not in Path(n).parts for n in zipped.namelist())
    zipped.extractall(source)
(source / 'docs/ultima').mkdir(parents=True)
build = subprocess.run([sys.executable, str(source/'scripts/build-submission-candidate.py')], cwd=source, capture_output=True, text=True, check=True)
stage = Path(build.stdout.strip())
cli = shutil.which('shopify')
assert cli, 'Shopify CLI required.'
checked = subprocess.run([cli, 'theme', 'check', '--path', str(stage), '--output', 'json'], capture_output=True, text=True, encoding='utf-8', errors='replace')
diagnostics = json.loads(checked.stdout)
offenses = [o for f in diagnostics for o in f.get('offenses', [])]
errors = [o for o in offenses if o['severity'] == 'error']
assert not errors, errors
settings = subprocess.run([sys.executable, str(source/'scripts/validate-settings.py'), '--root', str(stage), '--json'], capture_output=True, text=True, check=True)
data = json.loads((stage/'config/settings_data.json').read_text(encoding='utf-8'))
assert set(data['presets']) == {'Quadratum', 'Morrow', 'Northstar', 'Kinvar', 'Vantier'}
schema = json.loads((stage/'config/settings_schema.json').read_text(encoding='utf-8'))
version = next(s['theme_version'] for s in schema if 'theme_version' in s)
release = ROOT / 'release' / (version+'-'+commit[:12])
release.mkdir(parents=True, exist_ok=False)
destination = release / ('Quadratum-'+version+'.zip')
files = {}
with zipfile.ZipFile(destination, 'x', zipfile.ZIP_DEFLATED, compresslevel=9) as zipped:
    for path in sorted(stage.rglob('*')):
        if not path.is_file():
            continue
        relative = path.relative_to(stage).as_posix()
        assert relative.split('/')[0] in FOLDERS, relative
        contents = path.read_bytes()
        info = zipfile.ZipInfo(relative, date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        zipped.writestr(info, contents)
        files[relative] = hashlib.sha256(contents).hexdigest()
with zipfile.ZipFile(destination) as zipped:
    assert zipped.testzip() is None
    assert {n: hashlib.sha256(zipped.read(n)).hexdigest() for n in zipped.namelist()} == files
manifest = {'created_utc': datetime.now(timezone.utc).isoformat(), 'source_branch': 'main', 'source_commit': commit, 'source_method': 'git archive of committed Main; working files excluded', 'version': version, 'presets': list(data['presets']), 'zip': destination.name, 'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(), 'bytes': destination.stat().st_size, 'file_count': len(files), 'theme_check_errors': 0, 'theme_check_warnings': sum(o['severity']=='warning' for o in offenses), 'settings_validation': 'PASS', 'zip_integrity': 'PASS', 'shopify_approval': 'Not submitted or approved; packaging and automated checks do not certify acceptance.', 'files': files}
(release/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
(release/'theme-check.json').write_text(json.dumps(diagnostics, indent=2)+'\n', encoding='utf-8')
(release/'settings-validation.json').write_text(settings.stdout, encoding='utf-8')
print(json.dumps({k:v for k,v in manifest.items() if k!='files'}, indent=2))
print(destination)
