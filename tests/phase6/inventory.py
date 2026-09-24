#!/usr/bin/env python3
"""Global settings contract inventory. Run from repo root; no merchant-state writes.

Liquid comments/schema are excluded, section/block objects are not global settings,
and form snippet `settings` parameters are explicitly local. CSS variable and JS
references are evidence edges, not proof that a browser has executed a feature.
"""
import argparse
import collections
import csv
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/phase6'
BASE = '2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27'
LOCAL_PARAMETERS = {'form-background', 'form-core', 'form-dispatch', 'form-waitlist-fields', 'pb-bundle-card'}
RESERVED = {'sections', 'blocks', 'content_for_index'}
UNRESOLVED = {'REVIEW_REQUIRED', 'NO_SOURCE_CONSUMER', 'MISSING_SCHEMA', 'EXPORT_ONLY'}
JS_CONTRACTS = {
    'assets/cart-drawer.js': {
        'ajaxDrawerEnabled': 'enable_ajax_cart_drawer',
        'openAfterAdd': 'open_ajax_cart_after_add',
        'headerTriggerEnabled': 'cart_drawer_enable_header_trigger',
        'productTriggerEnabled': 'cart_drawer_enable_pdp_trigger',
        'collectionTriggerEnabled': 'cart_drawer_enable_collection_trigger',
        'addonTriggerEnabled': 'cart_drawer_enable_addon_trigger',
    }
}

def read_json(path):
    return json.loads(re.sub(r'^\s*/\*.*?\*/', '', path.read_text(), count=1, flags=re.S))

def mask(match):
    return '\n' * match.group(0).count('\n')

def clean(text):
    text = re.sub(r'{%-?\s*(comment|schema)\s*-?%}.*?{%-?\s*end\1\s*-?%}', mask, text, flags=re.S)
    return re.sub(r'<!--.*?-->|/\*.*?\*/', mask, text, flags=re.S)

def schema_errors(entries):
    errors = []
    ids = [s['id'] for s in entries]
    for key, n in collections.Counter(ids).items():
        if n > 1: errors.append(f'duplicate ID: {key}')
    for s in entries:
        key, kind, default = s['id'], s['type'], s.get('default')
        if kind in ('select', 'radio'):
            options = [o['value'] for o in s['options']]
            if len(set(options)) != len(options): errors.append(f'duplicate options: {key}')
            if default is not None and default not in options: errors.append(f'invalid option default: {key}')
        if kind == 'checkbox' and default is not None and not isinstance(default, bool): errors.append(f'invalid boolean: {key}')
        if kind == 'range':
            lo, hi, step = s['min'], s['max'], s.get('step', 1)
            if not isinstance(default, (int, float)) or not lo <= default <= hi or abs((default-lo)/step-round((default-lo)/step)) > 1e-6:
                errors.append(f'invalid range default: {key}')
            if round((hi-lo)/step) > 100: errors.append(f'range exceeds 101 steps: {key}')
    return errors

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--checkpoint', default='current')
    parser.add_argument('--final', action='store_true', help='Fail on unresolved or undocumented contracts')
    args = parser.parse_args()
    schema = read_json(ROOT/'config/settings_schema.json')
    data = read_json(ROOT/'config/settings_data.json')
    policies_path = OUT/'dispositions.json'
    policies = read_json(policies_path) if policies_path.exists() else {}
    entries = [dict(s, group=g['name']) for g in schema for s in g.get('settings', []) if 'id' in s]
    contract = {s['id']: s for s in entries}
    consumers = collections.defaultdict(list)
    dynamic = []
    source = {}
    js_edges = []
    css_uses = collections.defaultdict(list)
    css_defs = collections.defaultdict(list)
    for folder in ['layout', 'sections', 'blocks', 'snippets', 'assets', 'templates']:
        for path in sorted((ROOT/folder).glob('**/*')):
            if not path.is_file() or path.suffix not in {'.liquid', '.js', '.css', '.json'}: continue
            rel = str(path.relative_to(ROOT))
            text = clean(path.read_text())
            source[rel] = text
            for n, line in enumerate(text.splitlines(), 1):
                for field, key in JS_CONTRACTS.get(rel, {}).items():
                    if re.search(r'\b'+field+r'\b', line):
                        consumers[key].append({'path':rel, 'line':n, 'access':'QuadratumSettings.cart.'+field,
                                               'source':line.strip(), 'transport_only':False, 'via':'layout/theme.liquid'})
                for var in re.findall(r'var\(\s*(--[\w-]+)', line):
                    if rel != 'assets/theme.css': css_uses[var].append(f'{rel}:{n}')
                for var in re.findall(r'(--[\w-]+)\s*:', line):
                    css_defs[var].append(f'{rel}:{n}')
                if 'QuadratumSettings' in line and path.suffix == '.js':
                    js_edges.append({'path': rel, 'line': n, 'source': line.strip()})
            if path.suffix != '.liquid': continue
            aliases = set() if path.stem in LOCAL_PARAMETERS else {'settings'}
            # Theme settings passed explicitly to form snippets; `settings` is local there.
            if 'theme_settings.' in text: aliases.add('theme_settings')
            for alias, obj in re.findall(r'\bassign\s+(\w+)\s*=\s*(\w+)\s*(?=[\n%|\-])', text):
                if obj in aliases: aliases.add(alias)
            if not aliases: continue
            pattern = r'(?<![\w.])('+'|'.join(sorted(aliases))+r')(?:\.([A-Za-z_]\w*)|\[([^\]]+)\])'
            for match in re.finditer(pattern, text):
                alias, key, bracket = match.groups()
                line = text.count('\n', 0, match.start()) + 1
                if bracket:
                    literal = re.fullmatch(r'''\s*['"](\w+)['"]\s*''', bracket)
                    if literal: key = literal.group(1)
                    else:
                        keys = []
                        if rel == 'sections/social-media-profile-card.liquid' and bracket == 'key':
                            keys = ['social_url_'+n for n in ['facebook','instagram','tiktok','youtube','twitter','pinterest']]
                        elif rel == 'sections/3rd-party-warehouse-merch.liquid':
                            suffix = {'code_key':'code','label_key':'label','desc_key':'desc','collection_key':'collection','chip_key':'chip_color'}.get(bracket)
                            if suffix: keys = [f'fulfillment_wh_group_{i}_{suffix}' for i in range(1,13)]
                        dynamic.append({'path': rel, 'line': line, 'alias': alias, 'expression': bracket, 'resolved_ids':keys})
                        for dynamic_id in keys:
                            consumers[dynamic_id].append({'path':rel,'line':line,'access':match.group(0),'source':text.splitlines()[line-1].strip(),'transport_only':False,'dynamic':True})
                        continue
                context = text.splitlines()[line-1].strip()
                edge = {'path': rel, 'line': line, 'access': match.group(0), 'source': context,
                        'transport_only': rel == 'layout/theme.liquid' and ' | json' in context}
                if edge not in consumers[key]: consumers[key].append(edge)
    current = data.get('current', {})
    saved_sets = {'current': current} if isinstance(current, dict) else {}
    saved_sets.update({'presets.'+k:v for k,v in data.get('presets', {}).items()})
    saved = collections.defaultdict(dict)
    for name, values in saved_sets.items():
        for key, value in values.items():
            if key not in RESERVED: saved[key][name] = value
    rows = []
    for key in sorted(set(contract)|set(consumers)|set(saved)|set(policies)):
        spec = contract.get(key, {})
        edges = consumers.get(key, [])
        status = 'REVIEW_REQUIRED'
        if not spec: status = 'MISSING_SCHEMA' if edges else 'LEGACY_SAVED_STATE'
        elif not edges: status = 'NO_SOURCE_CONSUMER'
        elif all(e['transport_only'] for e in edges): status = 'EXPORT_ONLY'
        policy = dict(policies.get(key, {}))
        if 'reason' in policy: policy['disposition'] = policy.pop('reason')
        if key.startswith('fulfillment_wh_group_'):
            policy = {'status':'LEGACY_DYNAMIC','disposition':'Retained Phase 4 compatibility fallback for 12 warehouse mappings. Section warehouse_mapping blocks take precedence; no new global controls are added.',
                      'precedence':'Section warehouse_mapping blocks > retained 12-group legacy global lookup.',
                      'legacy_value_contract':'code/label/desc are text; collection is a collection handle/resource; chip_color is a CSS color.'}
        rows.append({'id':key, 'group':spec.get('group'), 'type':spec.get('type'),
                     'label':spec.get('label'), 'default':spec.get('default'),
                     'allowed':{k:spec[k] for k in ('options','min','max','step','unit') if k in spec},
                     'saved_values':saved.get(key, {}), 'consumers':edges,
                     'merchant_impact':spec.get('info') or spec.get('label') or policy.get('disposition'),
                     'precedence':'Global default; explicit section/component controls retain priority. See consumer source and dependency-map.md.',
                     'status':status, **policy})
    final_errors = []
    for row in rows:
        if row['status'] in UNRESOLVED: final_errors.append('unresolved: '+row['id'])
        if not row.get('disposition'): final_errors.append('missing disposition: '+row['id'])
        if row['status'] == 'ACTIVE' and not any(not c['transport_only'] for c in row['consumers']):
            final_errors.append('active without implemented consumer: '+row['id'])
        if row['status'] == 'RETIRED_PRE_V1' and (row['group'] or row['consumers']):
            final_errors.append('retired global control still has a schema or source dependency: '+row['id'])
        if not row['group'] and not row['status'].startswith(('LEGACY_', 'RETIRED_')):
            final_errors.append('uncontracted legacy read: '+row['id'])
    for item in dynamic:
        if not item['resolved_ids']: final_errors.append('unresolved dynamic access: '+item['path']+':'+str(item['line']))
    report = {'inventory_version':3, 'baseline':BASE, 'schema_groups':sum('settings' in g for g in schema), 'schema_settings':len(entries),
              'theme_metadata':next((g for g in schema if g['name']=='theme_info'), None),
              'source_files_scanned':len(source), 'settings_data_sha256':hashlib.sha256((ROOT/'config/settings_data.json').read_bytes()).hexdigest(),
              'reserved_saved_keys':sorted(RESERVED & current.keys()),
              'platform_customizations':data.get('platform_customizations', {}),
              'schema_errors':schema_errors(entries), 'final_contract_errors':final_errors, 'dynamic_accesses':dynamic,
              'local_parameter_snippets':sorted(LOCAL_PARAMETERS), 'javascript_consumers':js_edges,
              'css_variables':{k:{'definitions':v,'consumers':css_uses.get(k,[])} for k,v in sorted(css_defs.items()) if any(x.startswith('snippets/theme-tokens.liquid:') for x in v)},
              'css_compatibility':{'--c-danger':'Retained semantic token/extension compatibility. No in-repo var() reader; color_error has direct active form consumers. Do not count this alias alone as implementation.'},
              'unloaded_compatibility_assets':['assets/quadratum-tokens.css'],
              'settings':rows}
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/'settings-inventory.json').write_text(json.dumps(report, indent=2, ensure_ascii=False)+'\n')
    with (OUT/'component-register.csv').open('w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id','group','type','status','source_references','saved_in','disposition'])
        for row in rows:
            writer.writerow([row['id'],row['group'],row['type'],row['status'],len(row['consumers']),';'.join(row['saved_values']),row.get('disposition','Pending checkpoint review')])
    summary = {k:v for k,v in report.items() if k in ('baseline','schema_groups','schema_settings','source_files_scanned','settings_data_sha256','schema_errors','final_contract_errors','dynamic_accesses')}
    summary['status_counts'] = dict(collections.Counter(row['status'] for row in rows))
    summary['no_source_consumer'] = [row['id'] for row in rows if row['status']=='NO_SOURCE_CONSUMER']
    summary['export_only'] = [row['id'] for row in rows if row['status']=='EXPORT_ONLY']
    summary['missing_schema'] = [row['id'] for row in rows if row['status']=='MISSING_SCHEMA']
    summary['legacy_saved_state'] = [row['id'] for row in rows if row['status']=='LEGACY_SAVED_STATE']
    target = OUT/'validation'/args.checkpoint
    target.mkdir(parents=True, exist_ok=True)
    (target/'inventory-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
    print(json.dumps(summary, indent=2))
    if summary['schema_errors']: raise SystemExit(1)
    if args.final and final_errors: raise SystemExit(1)

if __name__ == '__main__': main()
