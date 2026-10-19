"""Populate a separate benchmark copy through settings only; preserve runtime bytes."""
import csv
import hashlib
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'docs/ultima/submission-stage-quadratum.json').read_text())
source = Path(manifest['output'])
target = ROOT / '.cache/ultima-benchmark'
target.mkdir(parents=True, exist_ok=True)
assert target.resolve().is_relative_to((ROOT / '.cache').resolve())
for folder in ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates']:
    # This directory is a generated benchmark copy. Remove stale generated files
    # when packaging exclusions change; do not retain an older implementation.
    if (target / folder).exists():
        for old in (target / folder).rglob('*'):
            if old.is_file() and not (source / folder / old.relative_to(target / folder)).exists():
                assert old.resolve().is_relative_to(target.resolve())
                old.unlink()
    shutil.copytree(source / folder, target / folder, dirs_exist_ok=True)

rows = list(csv.DictReader((ROOT / '.cache/theme-performance-shop-product-data.csv').open(encoding='utf-8-sig')))
products = list(dict.fromkeys(r['Handle'] for r in rows))
collections = list(dict.fromkeys(r['Collection'] for r in rows))
changes = []
cursor = {'image_picker': 0, 'product': 0, 'collection': 0, 'article': 0}
articles = ['news/choosing-an-everyday-carry', 'news/a-place-for-every-essential', 'news/taking-care-of-the-things-you-use']

def schema(path):
    match = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', path.read_text(encoding='utf-8-sig'), re.S)
    return json.loads(match[1]) if match else {}

sections = {p.stem: schema(p) for p in (target / 'sections').glob('*.liquid')}
blocks = {p.stem: schema(p) for p in (target / 'blocks').glob('*.liquid')}

def populate(node, definition, where):
    values = node.setdefault('settings', {})
    for field in definition.get('settings', []):
        key, kind = field.get('id'), field['type']
        if not key:
            continue
        value = values.get(key)
        if kind in cursor:
            # Fill existing resource controls, leaving optional absent controls alone.
            if key not in values:
                continue
            index = cursor[kind]
            cursor[kind] += 1
            if kind == 'image_picker':
                value = f'shopify://shop_images/benchmark-{index % 6 + 1}.jpg'
            elif kind == 'product':
                value = products[(index * 20) % len(products)]
            elif kind == 'article':
                value = articles[index % len(articles)]
            else:
                value = collections[index % len(collections)]
        elif kind == 'url':
            # Resource and integration endpoints are not storefront navigation.
            # Do not invent values for optional controls absent from the preset.
            if key not in values or any(token in key for token in ['video', 'embed', 'action', 'endpoint', 'webhook', 'social']):
                continue
            if 'product' in key or 'cta1' in key or 'primary' in key:
                value = '/products/' + products[0]
            else:
                value = '/collections/all'
        elif kind == 'blog':
            value = 'news'
        elif kind == 'liquid' and isinstance(value, str):
            value = re.sub(r'/products/[\w-]+', '/products/' + products[0], value)
            value = re.sub(r'/collections/[\w-]+', '/collections/all', value)
        if value is not None and value != values.get(key):
            changes.append({'path': where + '/' + key, 'value': value})
            values[key] = value
    for key, child in node.get('blocks', {}).items():
        allowed = next((b for b in definition.get('blocks', []) if b.get('type') == child['type']), None)
        definition_child = allowed if allowed and 'settings' in allowed else blocks.get(child['type'], allowed or {})
        populate(child, definition_child, where + '/blocks/' + key)

for path in [target / 'templates/index.json', *(target / 'sections').glob('*.json')]:
    data = json.loads(path.read_text(encoding='utf-8-sig'))
    for key, node in data.get('sections', {}).items():
        populate(node, sections.get(node['type'], {}), path.relative_to(target).as_posix() + '/' + key)
        if node['type'] == 'featured-content-blog-spotlight':
            node['settings']['view_all_link'] = '/blogs/news'
            node['settings']['subheading'] = '<p>Practical notes on choosing, organizing, and caring for everyday essentials.</p>'
    path.write_text(json.dumps(data, indent=2) + '\n', encoding='utf-8')

# Runtime parity is mandatory: configuration is the only benchmark-specific change.
runtime = []
for folder in ['assets', 'blocks', 'layout', 'locales', 'sections', 'snippets']:
    for path in (source / folder).rglob('*'):
        if path.is_file() and path.suffix != '.json':
            rel = path.relative_to(source)
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            assert hashlib.sha256((target / rel).read_bytes()).hexdigest() == digest, rel
            runtime.append({'path': rel.as_posix(), 'sha256': digest})
evidence = {'store': 'quadratum-benchmark.myshopify.com', 'theme_id': 188064661674,
            'source': str(source), 'target': str(target), 'dataset': 'https://shopify.dev/csv/theme-performance-shop-product-data.csv',
            'dataset_sha256': hashlib.sha256((ROOT / '.cache/theme-performance-shop-product-data.csv').read_bytes()).hexdigest(),
            'products': len(products), 'variants': len(rows), 'collections': len(collections),
            'configuration_changes': changes, 'runtime_parity': runtime, 'scores': None}
(ROOT / 'docs/ultima/benchmark-setup.json').write_text(json.dumps(evidence, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: evidence[k] for k in ['target', 'products', 'variants', 'collections']}))
