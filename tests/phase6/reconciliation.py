#!/usr/bin/env python3
"""Final compatibility, scope and count evidence. Run inventory --final first."""
from pathlib import Path
import collections
import hashlib
import json
import re
import subprocess

BASE = '47664f217cc150b64d68158b3babd38bac2885d6'
OUT = Path('docs/phase6/validation/checkpoint-g')
before = lambda file: subprocess.check_output(['git', 'show', BASE+':'+file])
digest = lambda value: hashlib.sha256(value).hexdigest()
flat = lambda groups: {s['id']: s for g in groups for s in g.get('settings', []) if 'id' in s}
a = flat(json.loads(before('config/settings_schema.json')))
b = flat(json.loads(Path('config/settings_schema.json').read_text()))
inventory = json.loads(Path('docs/phase6/settings-inventory.json').read_text())
rows = {row['id']: row for row in inventory['settings']}
assert not inventory['schema_errors'] and not inventory['final_contract_errors']
assert not (a.keys() - b.keys()), 'No original setting may be removed'
for key in a:
    assert a[key]['type'] == b[key]['type'], key+': type changed'
    assert [o['value'] for o in a[key].get('options', [])] == [o['value'] for o in b[key].get('options', [])], key+': option values changed'
    for field in ['min', 'max', 'step']:
        assert a[key].get(field) == b[key].get(field), key+': range contract changed'
data_before = before('config/settings_data.json')
data_after = Path('config/settings_data.json').read_bytes()
assert data_before == data_after, 'Merchant state must remain byte-identical for this closure'
deprecated = {key for key in b if rows[key]['status'] == 'DEPRECATED'}
schema_changes = {key for key in a.keys() & b.keys() if a[key] != b[key]}
diff = subprocess.check_output(['git', 'diff', '--ignore-space-at-eol', BASE, '--', 'layout', 'sections', 'snippets', 'blocks', 'assets'], text=True)
changed_lines = '\n'.join(line[1:] for line in diff.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---')))
direct_bindings = set(re.findall(r'\b(?:settings|g|t)\.([a-z_]\w*)', changed_lines)) & a.keys()
# Controller/CSS or aliased-condition repairs do not repeat the original setting ID on an edited line.
indirect_repairs = {
    'popup_enable': 'Manual opening now respects the enabled gate.',
    'popup_show_on_mobile': 'Manual opening now respects mobile eligibility.',
    'popup_show_on_desktop': 'Manual opening now respects desktop eligibility.',
    'popup_overlay_click_close': 'Overlay remains non-focusable; configured dismissal and Escape are independent.',
    'popup_image_position': 'Shared width, image stacking and no-image/minimal column behavior are reconciled.',
    'notfound_show_search': 'Aliased condition also requires at least one native searchable source.'
}
repaired = (schema_changes | direct_bindings | indirect_repairs.keys()) - deprecated
changed_files = subprocess.check_output(['git', 'diff', '--name-only', BASE], text=True).splitlines()
runtime = [p for p in changed_files if p.split('/')[0] in {'assets','layout','sections','snippets','blocks','templates','config'}]
assert not any(p.startswith('templates/customers/') or '/account-main-account-' in p for p in runtime), 'Account implementations remain intact'
assert not any(p.startswith('templates/') for p in runtime), 'No template/preset migrations'
explicit_dependencies = {
    'assets/cart-drawer.css': 'Drawer presentation variables from cart-drawer.liquid.',
    'assets/global-popup.js': 'Popup DOM settings, lifecycle and frequency policy.',
    'assets/global-quick-view.js': 'Collection drawer context for the shared commerce trigger gate.',
    'snippets/form-dispatch.liquid': 'Custom endpoint and resolved global form integration parameters from the nine form hosts; validates endpoints.',
    'snippets/q-quick-view-product.liquid': 'Collection context consumed by the global cart drawer trigger policy.',
    'config/settings_schema.json': 'Canonical global merchant schema and theme metadata.'
}
scope = []
for path in runtime:
    ids = sorted(row['id'] for row in rows.values() if any(edge['path']==path for edge in row['consumers']))
    assert ids or path in explicit_dependencies, 'Unexplained runtime scope: '+path
    scope.append({'path': path, 'global_dependencies': ids, 'direct_dependency': explicit_dependencies.get(path)})
read_report = lambda path: json.loads(Path(path).read_text())
regressions = read_report(OUT/'regressions/results.json')
targeted = read_report(OUT/'targeted-results.json')
assert len(regressions) == len({r['test'] for r in regressions}) == 112
assert all(r['exit_code'] == 0 and Path(r['log']).stat().st_size for r in regressions)
assert len(targeted) == len({r['suite'] for r in targeted}) == 13
assert all(r['exit_code'] == 0 for r in targeted)
popup = read_report('docs/phase6/validation/checkpoint-f/browser-results.json')
headers = read_report(OUT/'header-browser/browser.json')
accounts = read_report(OUT/'account-browser-results.json')
assert popup['cases'] == len(popup['results']) == 41
assert len(headers['cases']) == 72 and not headers['errors']
assert len(headers['accessibility']) == 20 and all(not r['violations'] for r in headers['accessibility'])
assert len(headers['keyboard']) == 15 and len(headers['lifecycle']) == 5
assert len(accounts) == 63
assert all(not r['errors'] and not r['violations'] for r in popup['results'] + accounts)
theme_check = read_report(OUT/'theme-check.json')
theme_counts = dict(collections.Counter(o['severity'] for file in theme_check for o in file['offenses']))
theme_counts.setdefault('error', 0)
assert theme_counts == {'warning':517, 'error':0}
validation = {
    'recorded_reports_verified':True,
    'phase3_phase4_suites_passed':len(regressions),
    'phase5_phase6_targeted_suites_passed':len(targeted),
    'browser_fixtures_passed':popup['cases']+len(headers['cases'])+len(accounts),
    'browser_fixtures':{'popup_commerce_localization':popup['cases'], 'headers':len(headers['cases']), 'accounts':len(accounts)},
    'header_additional_checks':{'accessibility':20,'keyboard':15,'lifecycle':5},
    'theme_check':{'cli_version':'4.8.0','baseline':{'error':0,'warning':510},'final':theme_counts},
    'live_shopify_certification':False,
    'live_qa_and_owner_decisions':'docs/phase6/owner-review.md'
}
report = {
    'baseline': BASE,
    'reviewed_groups': inventory['schema_groups'], 'baseline_settings':len(a), 'final_settings':len(b),
    'theme_metadata_added':True,
    'counts': {'added':len(b.keys()-a.keys()), 'repaired_or_clarified':len(repaired), 'deprecated':len(deprecated), 'removed':0},
    'count_definition':'Disjoint IDs: added settings; existing nondeprecated settings with schema/help/default or direct/indirect consumer repairs; retained deprecated settings; removed settings. A repair may clarify scope rather than change runtime behavior.',
    'added':sorted(b.keys()-a.keys()), 'repaired_or_clarified':sorted(repaired), 'deprecated':sorted(deprecated), 'removed':[],
    'indirect_repairs':indirect_repairs,
    'schema_metadata_or_default_changes':sorted(schema_changes),
    'settings_data':{'changed':False,'before_sha256':digest(data_before),'after_sha256':digest(data_after)},
    'schema':{'before_sha256':digest(before('config/settings_schema.json')),'after_sha256':digest(Path('config/settings_schema.json').read_bytes())},
    'preserved_contracts':{'original_ids':len(a),'types':len(a),'option_values':True,'range_bounds_and_steps':True,'section_block_platform_state':True},
    'final_status_counts':dict(collections.Counter(row['status'] for row in rows.values())),
    'runtime_scope':scope,
    'validation':validation,
    'remaining_source_contract_errors':[]
}
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'reconciliation.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'settings':len(b),'groups':inventory['schema_groups'],'counts':report['counts'],'runtime_files':len(scope),'settings_data_sha256':digest(data_after),'contract_errors':[]},indent=2))
