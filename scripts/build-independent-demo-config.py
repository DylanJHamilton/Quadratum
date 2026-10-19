"""Restore matching-store demo resources over a clean, tested merchant candidate.

This creates an isolated demo stage. It never edits the merchant package, source
fixtures, live theme or a store. Deployment is a separate, role-guarded step.
"""
import copy
import csv
import hashlib
import json
import re
import shutil
from pathlib import Path
from submission_portability import read, schema, RESOURCES, DEMO_COPY

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '.cache/independent-demo-config'
PRESETS = ['Quadratum', 'Morrow', 'Northstar', 'Kinvar', 'Vantier']
ALIASES = {
    'quadratum': {'all-products': 'all'},
    'morrow': {'morrow-play': 'play', 'morrow-rest': 'rest',
               'morrow-feeding': 'feeding', 'morrow-care': 'care'},
    'northstar': {}, 'kinvar': {}, 'vantier': {},
}
GLOBAL = {'settings': [f for group in read(ROOT/'config/settings_schema.json')
                      for f in group.get('settings', [])]}
SECTIONS = {p.stem: schema(p) for p in (ROOT/'sections').glob('*.liquid')}
BLOCKS = {p.stem: schema(p) for p in (ROOT/'blocks').glob('*.liquid')}
SOURCE_GLOBAL = read(ROOT/'config/settings_data.json')['presets']
PAGE_VIEWS = {
    'quadratum': {'about-arc-form': 'about', 'workday-system': 'workday-system', 'contact': 'contact'},
    'morrow': {'morrow-about': 'morrow-about', 'morrow-collections': 'morrow-collections', 'contact-morrow-cat-co': 'morrow-contact', 'morrow-support': 'morrow-support'},
    'northstar': {name: name for name in ['northstar-about', 'northstar-support', 'northstar-contact', 'northstar-build-and-burn-in']},
    'kinvar': {'kinvar-about': 'about', 'kinvar-customer-care': 'customer-care', 'kinvar-contact': 'contact', 'kinvar-routine-finder': 'routine-finder'},
    'vantier': {name: name for name in ['vantier-about', 'vantier-client-services', 'vantier-contact', 'vantier-fit-guide', 'vantier-edits']},
}
ARTICLE_ALIASES = {'news/another-blog': 'news/a-calmer-connected-desk', 'news/another-one-bites-the-blog': 'news/carry-the-workday', 'news/sample-blog-post': 'news/choosing-everyday-eyewear', 'vantier-journal/building-an-evening-look': 'vantier-journal/coordinates-not-sets'}


def build(name):
    brand = name.lower()
    candidate = Path(read(ROOT/f'docs/ultima/submission-stage-{brand}.json')['output'])
    target = OUT/brand
    # Re-running overlays only known candidate files; no recursive deletion.
    shutil.copytree(candidate, target, dirs_exist_ok=True)
    rows = list(csv.DictReader((ROOT/f'.cache/demo-catalogs/{brand}-original.csv').open(encoding='utf-8-sig')))
    products = {row['Handle'] for row in rows}
    changes, unresolved = [], []
    aliases = ALIASES[brand]

    def transform(value):
        if isinstance(value, list):
            return [transform(v) for v in value]
        if not isinstance(value, str):
            return value
        if 'Checkout is disabled and nothing is charged.' in value:
            return value.replace('Checkout is disabled and nothing is charged.', 'Test checkout only. No real payment is accepted.')
        for old, new in aliases.items():
            if value == old:
                value = new
            value = re.sub(r'((?:shopify://|/)collections/)'+re.escape(old)+r'(?=[/?#\s"\']|$)', r'\g<1>'+new, value)
        if 'furniture_banner.webp' in value:
            return ''
        if '.example' in value:
            return ''
        for old, new in ARTICLE_ALIASES.items():
            value = value.replace(old, new)
        # Theme templates cannot yet be assigned through the store's published
        # Horizon template picker. Explicit views select the installed ULTIMA
        # page layouts without publishing or changing the live theme.
        for handle, view in PAGE_VIEWS[brand].items():
            value = re.sub(r'(/pages/'+re.escape(handle)+r')(?=[\s\"\'<>#]|$)', r'\1?view='+view, value)
        value = re.sub(r'/pages/features(?:\?[^\s\"\'<>]*)?', '/collections/all', value)
        return value

    def restore_settings(dest, source, definition, where):
        fields = {f['id']: f for f in definition.get('settings', []) if 'id' in f}
        for key, original in source.items():
            if key not in fields or key not in dest:
                continue
            kind = fields[key]['type']
            if kind not in RESOURCES | {'url', 'link_list'} and not (
                isinstance(original, str) and ('shopify://' in original or '<a ' in original
                or '/collections/' in original or '/pages/' in original
                or '/blogs/' in original or DEMO_COPY.search(original))):
                continue
            value = transform(original)
            if kind == 'product' and value and value not in products:
                unresolved.append({'path': where+'/'+key, 'type': kind, 'value': value})
                continue
            if kind == 'product_list':
                value = [v for v in value if v in products]
            if kind in {'collection', 'collection_list'}:
                # Unconfigured inherited laboratory fixtures are not demo resources.
                invalid = {'automated-collection', 'frontpage', 'hydrogen'}
                value = [v for v in value if v not in invalid] if isinstance(value, list) else ('' if value in invalid else value)
            if kind == 'link_list':
                # Native menus will be created in each destination store.
                value = ('customer-account-main-menu' if 'customer-account' in original
                         else 'kinvar-company' if brand == 'kinvar' and original == 'kinvar-footer-company'
                         else '' if original.endswith('-legal')
                         else 'main-menu' if re.search(r'main|departments|categories|shop', original)
                         else 'footer' if 'footer' in where.lower() or 'footer' in key
                         else 'main-menu')
            if value != dest[key]:
                dest[key] = value
                changes.append({'path': where+'/'+key, 'type': kind})

    def node(dest, source, definition, where):
        restore_settings(dest.get('settings', {}), source.get('settings', {}), definition, where+'/settings')
        src_blocks = source.get('blocks', {})
        dst_blocks = dest.get('blocks', {})
        for key, child in (enumerate(dst_blocks) if isinstance(dst_blocks, list) else dst_blocks.items()):
            src = src_blocks[key] if isinstance(src_blocks, list) and key < len(src_blocks) else src_blocks.get(key, {}) if isinstance(src_blocks, dict) else {}
            own = next((b for b in definition.get('blocks', []) if b.get('type') == child.get('type')), None)
            child_definition = own if own and 'settings' in own else BLOCKS.get(child.get('type'), own or {})
            node(child, src, child_definition, where+'/blocks/'+str(key))

    for folder in ['templates', 'sections']:
        for source_path in (ROOT/'listings'/brand/folder).glob('*.json'):
            dest_path = target/folder/source_path.name
            if not dest_path.exists():
                continue
            source, dest = read(source_path), read(dest_path)
            for key, section in dest.get('sections', {}).items():
                src = source.get('sections', {}).get(key)
                if src and src.get('type') == section.get('type'):
                    node(section, src, SECTIONS.get(section['type'], {}), f'{folder}/{source_path.name}/sections/{key}')
                if brand == 'morrow' and key == 'morrow_collections':
                    # These four pickers were empty in the historical layout.
                    # Bind only the demo overlay to its verified native catalog.
                    for block, handle in zip(section.get('blocks', {}).values(), ['play', 'rest', 'feeding', 'care']):
                        block['settings']['collection'] = handle
            dest_path.write_text(json.dumps(dest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

    settings_path = target/'config/settings_data.json'
    settings = read(settings_path)
    restore_settings(settings['current'], SOURCE_GLOBAL[name], GLOBAL, 'config/settings_data.json/current')
    settings_path.write_text(json.dumps(settings, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

    # Shared renderer parity is a release invariant. Demo changes are JSON only.
    runtime = [p for folder in ['assets', 'blocks', 'layout', 'locales', 'snippets', 'sections']
               for p in (candidate/folder).rglob('*') if p.is_file() and not (folder == 'sections' and p.suffix == '.json')]
    assert all(p.read_bytes() == (target/p.relative_to(candidate)).read_bytes() for p in runtime)
    return {'preset': name, 'candidate': str(candidate), 'demo_stage': str(target),
            'restored_settings': len(changes), 'changes': changes, 'unresolved': unresolved,
            'runtime_parity': 'PASS', 'runtime_files_compared': len(runtime),
            'status': 'STAGED; native resources and storefront acceptance still required'}


if __name__ == '__main__':
    reports = [build(name) for name in PRESETS]
    (ROOT/'docs/ultima/independent-demo-config-20261019.json').write_text(json.dumps(reports, indent=2)+'\n')
    for report in reports:
        print(report['preset'], report['restored_settings'], 'settings restored;', len(report['unresolved']), 'unresolved product references; renderer parity PASS')
