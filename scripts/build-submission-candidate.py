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
from submission_portability import sanitize

ROOT = Path(__file__).resolve().parents[1]
PRESETS = ['Quadratum', 'Morrow', 'Northstar', 'Kinvar', 'Vantier']
SHOWROOM_SECTIONS = {'showroom-campaign.liquid', 'editorial-story.liquid', 'commerce-showcase.liquid', 'builder-reference.liquid', 'documentation-hub.liquid', 'theme-support.liquid'}
DEVELOPMENT_SECTIONS = {'main-product-master.liquid'}  # Legacy laboratory host; no merchant template uses it.
# Historical alternatives have no callers in the merchant runtime. Keep their
# source history, but do not ship unused implementations to merchants.
UNUSED_SNIPPETS = set('boxed-content-media cart-progress-bar collection-modern-empty-state collection-modern-pagination collection-modern-product-card collection-modern-quick-filters collection-modern-sort collection-modern-toolbar collection-simple-grid fp-hero-content-proxy fp-hero-media-proxy header-two-account header-two-actions header-two-cart header-two-logo header-two-mega-menu header-two-mobile-menu header-two-search icon-sprite pb-bundle-card q-banner-base q-disclosure q-nav q-social-pinterest-thumb q-spacing qtm-content-block-wrapper-end search-controller section-collection-modern-facets section-collection-modern-sort utility-404'.split())
SHOWROOM_ASSETS = {'documentation-hub.css', 'documentation-hub.js', 'showroom-preview.js', 'quadratum-builder-index.json', 'showroom-campaign.css', 'showroom-motion.js', 'editorial-story.css', 'commerce-showcase.css', 'quadratum-builder-manifest.json', 'quadratum-obsidian.png', 'quadratum-porcelain.png', 'quadratum-logo-ink.png', 'quadratum-logo-white.png'}
EXCLUDED_TEMPLATES = {'page.features.json', 'page.brands.json', 'page.explore.json', 'page.section-library.json', 'page.block-library.json', 'page.dynamic-section-test.json', 'page.playground.liquid', 'product.product-section-test.json', 'page.agencies.json', 'page.ecosystem.json', 'page.products.json', 'page.collections.json', 'page.editorial.json', 'page.documentation.json', 'page.release-status.json', 'page.builder-reference.json', 'page.lookbook.json', 'page.journal.json', 'page.proportion.json', 'page.finishing-details.json'}

parser = argparse.ArgumentParser()
parser.add_argument('--preset', choices=PRESETS, default='Quadratum')
args = parser.parse_args()
stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
output = ROOT / '.cache' / 'ultima-submission' / (args.preset.lower() + '-' + stamp)
output.mkdir(parents=True, exist_ok=False)
excluded = []

# Fail closed if a later change starts using one of these legacy snippets.
for folder in ['assets', 'blocks', 'sections', 'snippets', 'layout', 'templates', 'config', 'listings']:
    for file in (ROOT / folder).rglob('*'):
        if not file.is_file() or file.suffix not in {'.liquid', '.json', '.js'} or (folder == 'snippets' and file.stem in UNUSED_SNIPPETS):
            continue
        content = file.read_text(encoding='utf-8-sig')
        for used in re.findall(r"(?:render|include)\s+['\"]([^'\"]+)['\"]", content):
            assert used not in UNUSED_SNIPPETS, ('Legacy snippet now has a caller; review the exclusion', str(file), used)

def copy_folder(folder, target):
    for path in (ROOT / folder).rglob('*'):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT / folder)
        if folder == 'snippets' and path.stem in UNUSED_SNIPPETS:
            excluded.append(str(path.relative_to(ROOT)))
            continue
        if path.name == '.gitkeep' or (folder == 'snippets' and path.name == 'documentation-index.liquid') or (folder == 'assets' and (path.name in SHOWROOM_ASSETS or path.name.startswith('q-doc-') or path.name == 'icons.svg' or 'icons' in rel.parts)) or (folder == 'sections' and path.name in SHOWROOM_SECTIONS | DEVELOPMENT_SECTIONS) or (folder == 'templates' and (path.name in EXCLUDED_TEMPLATES or path.name.startswith('collection.quadratum-'))) or (folder == 'config' and path.name == 'markets.json'):
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
schema_match = re.search(r'{% schema %}(.*?){% endschema %}', text, re.S)
header_schema = json.loads(schema_match[1])
assert sum(item.get('id') == 'use_quadratum_mark' for item in header_schema['settings']) == 1
header_schema['settings'] = [item for item in header_schema['settings'] if item.get('id') != 'use_quadratum_mark']
text = text[:schema_match.start(1)] + '\n' + json.dumps(header_schema, indent=2) + '\n' + text[schema_match.end(1):]
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

portability_changes = sanitize(output)
manifest = {'status': 'CANDIDATE — NOT CLEARED FOR SUBMISSION', 'preset': args.preset, 'source_head': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(), 'includes_working_tree': True, 'merchant_template_source': 'aa7a4e7e (configuration only; current runtime retained)', 'output': str(output), 'excluded': excluded, 'portability_changes': portability_changes, 'files': {str(path.relative_to(output)): hashlib.sha256(path.read_bytes()).hexdigest() for path in sorted(output.rglob('*')) if path.is_file()}}
report = ROOT / 'docs/ultima' / ('submission-stage-' + args.preset.lower() + '.json')
report.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(output)
