"""Check preset group order, useful menus and portable header insertion defaults."""
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('portability', ROOT/'scripts/submission_portability.py')
portability = importlib.util.module_from_spec(spec)
spec.loader.exec_module(portability)
checked = 0
for path in (ROOT/'listings').rglob('*.json'):
    data = portability.read(path)
    def check(node):
        global checked
        if isinstance(node, dict):
            blocks = node.get('blocks')
            if isinstance(blocks, dict) and blocks:
                assert set(node.get('block_order', [])) == set(blocks), path
                assert len(node['block_order']) == len(blocks), path
                checked += 1
            for child in node.values():
                check(child)
        elif isinstance(node, list):
            for child in node:
                check(child)
    check(data)
for brand in ['quadratum', 'northstar']:
    header = portability.read(ROOT/f'listings/{brand}/sections/header-group.json')['sections']['header-two']
    assert header['settings']['show_account']
    for block in header['blocks'].values():
        if block['type'] == 'mega_menu':
            assert block['settings'].get('label'), brand
for brand in ['morrow', 'vantier']:
    header = portability.read(ROOT/f'listings/{brand}/sections/header-group.json')['sections']['header-one']
    assert header['settings']['show_account_icon'] and header['settings']['show_mobile_account_link']
header_schema = portability.schema(ROOT/'sections/header-two.liquid')
assert portability.read(ROOT/'listings/kinvar/sections/header-group.json')['sections']['header']['settings']['show_account']
mega = next(b for b in header_schema['blocks'] if b['type'] == 'mega_menu')
for field in mega['settings']:
    if field.get('id', '').endswith('_links'):
        for line in field.get('default', '').splitlines():
            assert line.split('|')[1].strip() in portability.SAFE_URLS, field
print(f'PASS {checked} ordered block groups; all five preset header configurations enable accounts; mega-menu insertion defaults use portable destinations.')
