"""Validate native conditional controls and preservation of merchant setting contracts."""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
paths = [row['path'] for row in json.loads((ROOT / 'docs/ultima/editor-panel-improvements-20261019.json').read_text())]
supported = {'checkbox', 'number', 'radio', 'range', 'select', 'text', 'textarea', 'header', 'paragraph', 'color', 'color_background', 'color_scheme', 'font_picker', 'html', 'image_picker', 'inline_richtext', 'link_list', 'liquid', 'richtext', 'text_alignment', 'url', 'video', 'video_url'}

def schema(text):
    return json.loads(re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', text, re.S)[1])

def visible(condition, values):
    expression = condition.removeprefix('{{').removesuffix('}}').strip()
    clauses = expression.split(' and ')
    for clause in clauses:
        match = re.fullmatch(r'(?:block|section)\.settings\.(\w+)(?: (==|>=) (\d+|\x27[^\x27]*\x27))?', clause)
        assert match, clause
        key, operator, target = match.groups()
        value = values.get(key)
        if not operator:
            result = bool(value)
        else:
            target = int(target) if target.isdigit() else target.strip("'")
            result = value == target if operator == '==' else value >= target
        if not result:
            return False
    return True

conditional_count = 0
for path in paths:
    old = schema(subprocess.check_output(['git', 'show', '26acf5f62b723bb8a692d91b6315f02cccc10ce1:' + path], cwd=ROOT).decode('utf-8'))
    new = schema((ROOT / path).read_text(encoding='utf-8'))
    old_fields = {s['id']: s for s in old['settings'] if 'id' in s}
    new_fields = {s['id']: s for s in new['settings'] if 'id' in s}
    assert old_fields.keys() == new_fields.keys(), path
    values = {key: setting.get('default') for key, setting in new_fields.items()}
    for key, setting in new_fields.items():
        contract = {k: v for k, v in setting.items() if k != 'visible_if'}
        previous_contract = {k: v for k, v in old_fields[key].items() if k != 'visible_if'}
        contrast_defaults = {'cta_btn_text': '#1F130D', 'newsletter_btn_text': '#1F130D', 'cta_outline_text': '#2B2117', 'cta_outline_border': '#2B2117'}
        if path == 'sections/call-to-action-banner.liquid' and key in contrast_defaults:
            previous_contract['default'] = contrast_defaults[key]
        assert contract == previous_contract, (path, key)
        condition = setting.get('visible_if')
        if not condition:
            continue
        assert setting['type'] in supported
        own = 'block' if path.startswith('blocks/') else 'section'
        refs = re.findall(r'(block|section)\.settings\.(\w+)', condition)
        assert refs and all(scope == own and name in new_fields for scope, name in refs), (path, key)
        for _, name in refs:
            assert new_fields[name]['type'] in {'checkbox', 'range', 'number', 'select', 'radio'}, (path, name)
        visible(condition, values)
        conditional_count += 1
    if path.endswith('content-comparison-matrix.liquid'):
        for preset in new['presets']:
            configured = dict(values, **preset['settings'])
            assert any(configured[f'column_{i}_enabled'] for i in range(1, 5)), preset['name']
            assert any(configured[f'row_{i}_enabled'] for i in range(1, 9)), preset['name']
        expression = new_fields['row_2_column_3_value']['visible_if']
        assert visible(expression, dict(values, row_2_enabled=True, column_3_enabled=True))
        assert not visible(expression, dict(values, row_2_enabled=False, column_3_enabled=True))
        assert not visible(expression, dict(values, row_2_enabled=True, column_3_enabled=False))
    if path.endswith('product-comparison-table.liquid'):
        expression = new_fields['row_8_column_4']['visible_if']
        assert visible(expression, dict(values, row_count=8, column_count=4))
        assert not visible(expression, dict(values, row_count=7, column_count=4))
        assert not visible(expression, dict(values, row_count=8, column_count=3))
    if path.endswith('featured-product-hero-banner.liquid'):
        expression = new_fields['row_count']['visible_if']
        assert visible(expression, dict(values, product_block_mode='collection'))
        assert not visible(expression, dict(values, product_block_mode='single'))
print(f'PASS {len(paths)} editor schemas: {conditional_count} native conditions, references, supported types, row/column/mode tasks and existing setting contracts.')
