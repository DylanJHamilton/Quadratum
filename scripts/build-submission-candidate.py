"""Stage a review candidate; never publish, overwrite a prior stage, or claim readiness.

The root is the branded showroom. The Quadratum listing supplies the retail
install. Other listings supply their merchant templates over the shared runtime.
"""
import argparse
import hashlib
import json
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRESETS = ['Quadratum', 'Morrow', 'Northstar', 'Kinvar', 'Vantier']
SHOWROOM_SECTIONS = {'editorial-story.liquid', 'commerce-showcase.liquid', 'builder-reference.liquid'}
DEVELOPMENT_SECTIONS = {'main-product-master.liquid'}  # Legacy laboratory host; no merchant template uses it.
SHOWROOM_ASSETS = {'editorial-story.css', 'commerce-showcase.css', 'quadratum-builder-manifest.json', 'quadratum-obsidian.png', 'quadratum-porcelain.png', 'quadratum-logo-ink.png', 'quadratum-logo-white.png'}
EXCLUDED_TEMPLATES = {'page.features.json', 'page.brands.json', 'page.explore.json', 'page.section-library.json', 'page.block-library.json', 'page.dynamic-section-test.json', 'page.playground.liquid', 'product.product-section-test.json', 'page.agencies.json', 'page.ecosystem.json', 'page.products.json', 'page.collections.json', 'page.editorial.json', 'page.documentation.json', 'page.release-status.json', 'page.builder-reference.json', 'page.lookbook.json', 'page.journal.json', 'page.proportion.json', 'page.finishing-details.json'}

parser = argparse.ArgumentParser()
parser.add_argument('--preset', choices=PRESETS, default='Quadratum')
args = parser.parse_args()
stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
output = ROOT / '.cache' / 'ultima-submission' / (args.preset.lower() + '-' + stamp)
output.mkdir(parents=True, exist_ok=False)
excluded = []

def copy_folder(folder, target):
    for path in (ROOT / folder).rglob('*'):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT / folder)
        if path.name == '.gitkeep' or (folder == 'assets' and (path.name in SHOWROOM_ASSETS or path.name == 'icons.svg' or 'icons' in rel.parts)) or (folder == 'sections' and path.name in SHOWROOM_SECTIONS | DEVELOPMENT_SECTIONS) or (folder == 'templates' and (path.name in EXCLUDED_TEMPLATES or path.name.startswith('collection.quadratum-'))) or (folder == 'config' and path.name == 'markets.json'):
            excluded.append(str(path.relative_to(ROOT)))
            continue
        destination = target / rel
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, destination)

for folder in ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates']:
    copy_folder(folder, output / folder)

for preset in PRESETS:
    listing = ROOT / 'listings' / preset.lower()
    if not (listing / 'templates/index.json').is_file():
        raise SystemExit(f'Missing homepage for {preset}')
    for folder in ['templates', 'sections']:
        for path in (listing / folder).glob('*.json'):
            if path.name in EXCLUDED_TEMPLATES:
                continue
            dest = output / 'listings' / preset.lower() / folder / path.name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, dest)

# Replace only parent merchant content, retaining current runtime improvements.
for preset in ['quadratum', args.preset.lower()]:
    for folder in ['templates', 'sections']:
        for path in (output / 'listings' / preset / folder).glob('*.json'):
            shutil.copy2(path, output / folder / path.name)

settings = json.loads((output / 'config/settings_data.json').read_text(encoding='utf-8'))
assert list(settings['presets']) == PRESETS or set(settings['presets']) == set(PRESETS)
settings['current'] = settings['presets'][args.preset]
(output / 'config/settings_data.json').write_text(json.dumps(settings, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# The explicit showroom logo switch has no place in a merchant install.
header = output / 'sections/header-two.liquid'
text = header.read_text(encoding='utf-8')
text, count = re.subn(r'{% if section.settings.use_quadratum_mark %}.*?{% else %}(.*?){% endif %}', r'\1', text, flags=re.S)
assert count == 2, 'Header logo transform changed; review the source before staging.'
text, count = re.subn(r'\s*\{"type":"checkbox","id":"use_quadratum_mark"[^\n]*\},', '', text)
assert count == 1
header.write_text(text, encoding='utf-8')

# Fail on an orphaned showroom template or a missing section after overlay.
for template in (output / 'templates').glob('*.json'):
    data = json.loads(re.sub(r'/\*.*?\*/', '', template.read_text(encoding='utf-8-sig'), flags=re.S))
    removed = {key for key, section in data.get('sections', {}).items() if section['type'] + '.liquid' in SHOWROOM_SECTIONS}
    if removed:
        data['sections'] = {key: value for key, value in data['sections'].items() if key not in removed}
        data['order'] = [key for key in data['order'] if key not in removed]
        assert data['order'], ('Empty merchant template', template.name)
        template.write_text(json.dumps(data, indent=2) + '\n', encoding='utf-8')
    for section in data.get('sections', {}).values():
        assert (output / 'sections' / (section['type'] + '.liquid')).is_file(), (template.name, section['type'])

manifest = {'status': 'CANDIDATE — NOT CLEARED FOR SUBMISSION', 'preset': args.preset, 'source_head': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(), 'includes_working_tree': True, 'merchant_template_source': 'aa7a4e7e (configuration only; current runtime retained)', 'output': str(output), 'excluded': excluded, 'files': {str(path.relative_to(output)): hashlib.sha256(path.read_bytes()).hexdigest() for path in sorted(output.rglob('*')) if path.is_file()}}
report = ROOT / 'docs/ultima' / ('submission-stage-' + args.preset.lower() + '.json')
report.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(output)
