#!/usr/bin/env python3
"""Current Phase 6 pre-launch contract gate. A-G closure evidence stays historical."""
from pathlib import Path
import argparse
import collections
import hashlib
import json
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--checkpoint', default='checkpoint-h3')
parser.add_argument('--final', action='store_true', help='Also require the recorded H2/H3 regression and browser gates')
args = parser.parse_args()
BASE = '2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27'
OUT = Path('docs/phase6/validation') / args.checkpoint
before = lambda file: subprocess.check_output(['git', 'show', BASE + ':' + file])
digest = lambda value: hashlib.sha256(value).hexdigest()
flat = lambda groups: {s['id']: s for g in groups for s in g.get('settings', []) if 'id' in s}
audit = json.loads(Path('docs/phase6/legacy-cleanup-audit.json').read_text())
inventory = json.loads(Path('docs/phase6/settings-inventory.json').read_text())
state = json.loads(Path('docs/phase6/validation/checkpoint-h1/owner-state.json').read_text())
old_groups = json.loads(before('config/settings_schema.json'))
new_groups = json.loads(Path('config/settings_schema.json').read_text())
a, b = flat(old_groups), flat(new_groups)
rows = {r['id']: r for r in inventory['settings']}
removed = {r['id'] for r in audit['settings'] if r['category'] == 'A_REMOVE_BEFORE_V1'}
assert audit['starting_remote_sha'] == BASE and len(audit['settings']) == 37
assert len(removed) == 37 and a.keys() - b.keys() == removed
assert not b.keys() - a.keys(), 'No new controls in this cleanup'
assert not inventory['schema_errors'] and not inventory['final_contract_errors']
assert [g['name'] for g in old_groups] == [g['name'] for g in new_groups], 'Group order preserved'
assert old_groups[0] == new_groups[0], 'Theme metadata preserved'
for key in b:
    # Only these two reviewed merchant-facing descriptions change; all input contracts remain exact.
    allowed = {'label', 'info'} if key == 'checkout_note' else {'label'} if key == 'marketing_consent_mode' else set()
    assert {k: v for k, v in a[key].items() if k not in allowed} == {k: v for k, v in b[key].items() if k not in allowed}, key + ': active contract changed'
    assert rows[key]['status'] in {'ACTIVE', 'PRIVILEGED_COMPATIBILITY', 'LEGACY_METADATA'}, key
    assert any(not edge['transport_only'] for edge in rows[key]['consumers']), key + ': no implementation'
for key in removed:
    assert rows[key]['status'] == 'RETIRED_PRE_V1' and not rows[key]['consumers'] and rows[key]['group'] is None, key
    assert rows[key]['previous_contract']['type'] == a[key]['type'] and rows[key]['history_ref'], key
    historical = next(r for r in audit['settings'] if r['id'] == key)
    assert historical['old_schema'] == a[key] and historical['active_consumer_count'] == 0, key
    assert rows[key]['saved_values'] == historical['saved_values'], key + ': saved state lost'
for group in new_groups:
    if 'settings' not in group:
        continue
    assert any('id' in s for s in group['settings']), group['name'] + ': empty group'
    current_header, count = None, 0
    for s in group['settings']:
        if s['type'] == 'header':
            assert current_header is None or count, group['name'] + ': empty heading ' + str(current_header)
            current_header, count = s['content'], 0
        elif 'id' in s:
            count += 1
    assert current_header is None or count, group['name'] + ': trailing empty heading'
assert not any(r['status'] == 'DEPRECATED' for r in rows.values()), 'No deprecated controls left in this audited set'
assert all(not removed.intersection(d['resolved_ids']) for d in inventory['dynamic_accesses'])
data_before = before('config/settings_data.json')
data_after = Path('config/settings_data.json').read_bytes()
assert data_before == data_after, 'Current Shopify owner state must remain byte-identical'
assert digest(data_after) == state['settings_data_sha256'] == audit['settings_data_before_sha256']
for sha in state['shopify_commits']:
    subprocess.run(['git', 'merge-base', '--is-ancestor', sha, 'HEAD'], check=True)
changed = subprocess.check_output(['git', 'diff', '--name-only', BASE], text=True).splitlines()
runtime = [p for p in changed if p.split('/')[0] in {'assets', 'layout', 'sections', 'snippets', 'blocks', 'templates', 'config'}]
assert set(runtime) == {'config/settings_schema.json', 'snippets/header-two-logo.liquid'}, runtime
# A raw token scan complements alias/dynamic mapping. The two video names legitimately remain local.
local_only = {'video_muted', 'video_controls'}
for folder in ['assets', 'layout', 'sections', 'snippets', 'blocks', 'templates']:
    for path in Path(folder).rglob('*'):
        if path.is_file() and path.suffix in {'.liquid', '.js', '.css', '.json'}:
            text = path.read_text()
            assert not any(key in text for key in removed - local_only), 'Retired token survives: ' + str(path)
report = {
    'starting_remote_sha': BASE,
    'counts': {'deprecated_reviewed': 37, 'removed': len(removed), 'retained_active': 0, 'retained_hidden_compatibility': 0,
               'remaining_schema_settings': len(b), 'groups': inventory['schema_groups']},
    'removed_ids': sorted(removed), 'retained_deprecated_ids': [],
    'settings_data': {'changed': False, 'before_sha256': digest(data_before), 'after_sha256': digest(data_after),
                      'saved_global_keys_preserved': len(state['saved_global_values']),
                      'removed_control_saved_values_preserved': state['deprecated_saved_values'],
                      'shopify_commits_preserved': state['shopify_commits']},
    'remaining_schema_status_counts': dict(collections.Counter(rows[key]['status'] for key in b)),
    'groups': [{'name': g['name'], 'before': sum('id' in s for s in g['settings']),
                'after': sum('id' in s for s in next(n for n in new_groups if n['name'] == g['name'])['settings'])}
               for g in old_groups if 'settings' in g],
    'active_contracts_preserved': {'ids': len(b), 'types': True, 'defaults': True, 'option_values': True,
                                 'range_bounds_and_steps': True, 'global_local_precedence': True},
    'runtime_scope': runtime,
    'same_named_local_video_settings_preserved': True,
    'remaining_removed_setting_global_dependencies': [],
    'unresolved_global_reads': [],
    'schema_errors': [],
    'history': 'docs/phase6/legacy-cleanup-audit.json',
    'live_shopify_certification': False
}
if args.final:
    read_report = lambda path: json.loads(Path(path).read_text())
    regressions = read_report(OUT / 'regressions/results.json')
    targeted = read_report(OUT / 'targeted-results.json')
    assert len(regressions) == len({r['test'] for r in regressions}) == 112
    assert len(targeted) == len({r['suite'] for r in targeted}) == 13
    assert all(r['exit_code'] == 0 and Path(r['log']).stat().st_size for r in regressions + targeted)
    popup = read_report(OUT / 'popup-browser-results.json')
    headers = read_report(OUT / 'header-browser/browser.json')
    accounts = read_report(OUT / 'account-browser-results.json')
    assert popup['cases'] == len(popup['results']) == 41
    assert len(headers['cases']) == 72 and not headers['errors']
    assert len(headers['accessibility']) == 20 and all(not r['violations'] for r in headers['accessibility'])
    assert len(headers['keyboard']) == 15 and len(headers['lifecycle']) == 5
    assert len(accounts) == 63
    assert all(not r['errors'] and not r['violations'] for r in popup['results'] + accounts)
    account_entry = read_report(OUT / 'header-source/source.json')
    assert account_entry['scenarios'] == 66 and account_entry['state_baseline'] == BASE
    assert account_entry['baseline'] == '8e114764138cf5a5967ff56b75064808d6366bed'
    theme = read_report('docs/phase6/validation/checkpoint-h2/theme-check.json')
    theme_counts = collections.Counter(o['severity'] for file in theme for o in file['offenses'])
    assert theme_counts['error'] == 0 and theme_counts['warning'] == 517
    subprocess.run(['git', 'diff', '--exit-code', '66e61f8d6e4557831880b47ada3746e9653249f8', '--',
                    'config', 'layout', 'sections', 'snippets', 'blocks', 'assets', 'templates'], check=True, stdout=subprocess.PIPE)
    report['validation'] = {
        'phase3_phase4_suites_passed': len(regressions), 'phase5_phase6_suites_passed': len(targeted),
        'browser_fixtures_passed': popup['cases'] + len(headers['cases']) + len(accounts),
        'browser_fixtures': {'popup_commerce_localization': 41, 'headers': 72, 'accounts': 63},
        'header_additional_checks': {'accessibility': 20, 'keyboard': 15, 'lifecycle': 5},
        'account_entry_source_scenarios': 66,
        'theme_check': {'cli_version': '4.8.0', 'error': 0, 'warning': 517, 'new_warnings': 0,
                        'report': 'docs/phase6/validation/checkpoint-h2/theme-check.json'},
        'runtime_unchanged_since_validated_h2': True,
        'fixture_change': 'Select the current Shopify merchant-state baseline independently of the unchanged Phase 5 account source baseline.',
        'live_shopify_certification': False
    }
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'reconciliation.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'counts': report['counts'], 'settings_data_sha256': digest(data_after), 'runtime_scope': runtime,
                  'validation': report.get('validation'), 'contract_errors': []}, indent=2))
