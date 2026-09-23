"""Verify the Phase 5 dependency/setting/register closure against the protected baseline."""
import csv
import hashlib
import json
import re
import subprocess
from pathlib import Path

BASELINE = 'd8e2c951d223cd8eac9c9b0adda26977856c405a'
OUTPUT = Path('docs/phase5/validation/final/reconciliation.json')
PREFIXES = ('assets/account-', 'sections/account-', 'snippets/account-',
            'templates/customers/', 'tests/phase5/', 'docs/phase5/')


def git(*args):
    return subprocess.check_output(['git', *args], text=True).splitlines()


def body(path):
    source = Path(path).read_text()
    return re.sub(r'{%-?\s*(comment|schema)\s*-?%}[\s\S]*?{%-?\s*end\1\s*-?%}', '', source)


def dependencies(path):
    source = body(path)
    assets = ['assets/' + name for name in re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url", source)]
    renders = [('snippets/' if kind == 'render' else 'sections/') + name + '.liquid'
               for kind, name in re.findall(r"{%-?\s*(render|section)\s+['\"]([^'\"]+)['\"]", source)]
    return sorted(set(assets + renders))


def expanded_body(path, visited=None):
    visited = set() if visited is None else visited
    if path in visited:
        return ''
    visited.add(path)
    return body(path) + '\n' + '\n'.join(expanded_body(dep, visited)
                                          for dep in dependencies(path) if dep.endswith('.liquid'))


owned = sorted(str(path) for directory in ('sections', 'assets', 'snippets')
               for path in Path(directory).glob('account-*'))
owned += sorted(str(path) for path in Path('templates/customers').glob('*.liquid'))
assert len(owned) == 37, 'Reconcile new account components explicitly'
baseline_paths = git('ls-tree', '-r', '--name-only', BASELINE)
originals = [path for path in baseline_paths if path.startswith(PREFIXES[:4])]
assert len(originals) == 35
assert all(Path(path).exists() for path in originals), 'Original account names/templates must remain'

changed = set(git('diff', '--name-only', BASELINE))
changed.update(git('ls-files', '--others', '--exclude-standard'))
assert all(path.startswith(PREFIXES) for path in changed), 'Unrelated/protected scope changed'

registered = {row['path']: row for row in csv.DictReader(open('docs/phase5/component-register.csv'))}
assert all(path in registered and registered[path]['disposition'].startswith('REVIEWED') for path in owned)

graph = {path: dependencies(path) if path.endswith('.liquid') else [] for path in owned}
external = sorted({dep for deps in graph.values() for dep in deps} - set(owned))
assert external == ['snippets/contrast-text.liquid'], external
assert dependencies(external[0]) == [], 'Review any new transitive direct dependency'
assert external[0] in registered
assert all(Path(dep).is_file() for deps in graph.values() for dep in deps)
consumers = {path: [parent for parent, deps in graph.items() if path in deps] for path in owned}
assert all(consumers[path] for path in owned if path.startswith(('assets/', 'snippets/'))), 'Unowned account asset/snippet'
assert all(consumers[path] for path in owned if path.startswith('sections/') and 'order-tracking' not in path)

settings = []
for path in owned:
    if not path.startswith('sections/'):
        continue
    source = Path(path).read_text()
    schema = json.loads(re.search(r'{% schema %}([\s\S]*?){% endschema %}', source)[1])
    ids = [setting['id'] for setting in schema['settings'] if 'id' in setting]
    referenced = set(re.findall(r'section\.settings\.([a-zA-Z0-9_]+)', expanded_body(path)))
    dead = sorted(set(ids) - referenced)
    assert not dead, (path, dead)
    settings.append({'section': path, 'settings': len(ids), 'unreferenced_settings': dead})
    if 'order-tracking' in path:
        assert schema['presets'], 'Tracking remains an optional merchant-placeable section'

layout = Path('layout/theme.liquid').read_text()
assert '{{ content_for_header }}' in layout, 'Shopify owns CAPTCHA delivery'
assert layout.count('<main ') == 1, 'Layout owns the main landmark'
assert all('<main ' not in body(path) for path in owned if path.startswith('sections/'))

result = {
    'baseline': BASELINE, 'original_components_retained': len(originals),
    'owned_components_reviewed': len(owned), 'direct_shared_dependencies': external,
    'protected_scope_unchanged': True, 'setting_reference_audit': settings,
    'tracking_disposition': 'Optional section preset; no native customer route or carrier/API integration',
    'files': [{'path': path, 'sha256': hashlib.sha256(Path(path).read_bytes()).hexdigest(),
               'dependencies': graph.get(path, []), 'consumers': consumers.get(path, [])}
              for path in sorted(owned + external)]
}
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(result, indent=2) + '\n')
print(f'PASS {len(owned)} owned account components + 1 shared direct dependency; 35 original names retained; '
      'all assets/snippets owned; nine section setting inventories referenced; protected scope unchanged.')
