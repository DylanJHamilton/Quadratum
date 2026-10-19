"""Add native conditional controls and task groups without changing saved values."""
import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
changes = []

def update(path, headers, condition):
    file = ROOT / path
    source = file.read_text(encoding='utf-8')
    match = re.search(r'({%\s*schema\s*%})(.*?)({%\s*endschema\s*%})', source, re.S)
    schema = json.loads(match[2])
    before = {s['id']: copy.deepcopy(s) for s in schema['settings'] if 'id' in s}
    result = []
    for setting in schema['settings']:
        key = setting.get('id', '')
        if key in headers and not (result and result[-1].get('content') == headers[key]):
            result.append({'type': 'header', 'content': headers[key]})
        expression = condition(key)
        if expression:
            assert setting['type'] not in ['product', 'collection', 'article', 'blog', 'page', 'product_list', 'collection_list'], path + '/' + key
            setting['visible_if'] = '{{ ' + expression + ' }}'
        result.append(setting)
    schema['settings'] = result
    after = {s['id']: copy.deepcopy(s) for s in result if 'id' in s}
    assert before.keys() == after.keys()
    for key in before:
        after[key].pop('visible_if', None)
        before[key].pop('visible_if', None)
    assert before == after, 'Existing control contract changed: ' + path
    rewritten = source[:match.start(2)] + '\n' + json.dumps(schema, indent=2, ensure_ascii=False) + '\n' + source[match.end(2):]
    assert source[:match.start()] == rewritten[:match.start()], 'Runtime changed'
    file.write_text(rewritten, encoding='utf-8')
    changes.append({'path': path, 'input_ids_preserved': len(before), 'conditional_inputs': sum(bool(s.get('visible_if')) for s in result), 'headers': sum(s['type'] == 'header' for s in result), 'runtime_unchanged': True})

def matrix_condition(key):
    if match := re.fullmatch(r'column_(\d+)_(.+)', key):
        column, suffix = match.groups()
        if suffix != 'enabled':
            return f'block.settings.column_{column}_enabled'
    if match := re.fullmatch(r'row_(\d+)_(.+)', key):
        row, suffix = match.groups()
        if suffix != 'enabled':
            expression = f'block.settings.row_{row}_enabled'
            if cell := re.match(r'column_(\d+)_', suffix):
                expression += f' and block.settings.column_{cell[1]}_enabled'
            return expression
    if key == 'cta_row_label':
        return 'block.settings.show_cta_row'

update('blocks/content-comparison-matrix.liquid', {**{f'column_{n}_enabled': f'Column {n}' for n in range(1, 5)}, **{f'row_{n}_enabled': f'Row {n}' for n in range(1, 9)}, 'included_label': 'Accessible value labels'}, matrix_condition)

def comparison_condition(key):
    if match := re.match(r'column_(\d+)_', key):
        return f'block.settings.column_count >= {match[1]}'
    if match := re.fullmatch(r'row_(\d+)_(.+)', key):
        row, suffix = match.groups()
        expression = f'block.settings.row_count >= {row}'
        if cell := re.fullmatch(r'column_(\d+)', suffix):
            expression += f' and block.settings.column_count >= {cell[1]}'
        return expression

update('blocks/product-comparison-table.liquid', {**{f'column_{n}_title': f'Column {n}' for n in range(1, 5)}, **{f'row_{n}_label': f'Row {n}' for n in range(1, 9)}}, comparison_condition)

def feature_condition(key):
    if match := re.fullmatch(r'feature_(\d+)_(.+)', key):
        if match[2] != 'enabled':
            return f'block.settings.feature_{match[1]}_enabled'
    if key in ['video', 'autoplay_video', 'show_video_controls']:
        return "block.settings.media_type == 'video'"
    if key == 'external_video_url':
        return "block.settings.media_type == 'external_video'"

update('blocks/content-feature-showcase.liquid', {f'feature_{n}_enabled': f'Feature {n}' for n in range(1, 7)}, feature_condition)

def banner_condition(key):
    if key.startswith('prod_media_') or key == 'layout_dir':
        return "section.settings.layout_variant == 'product'"
    if key.startswith('newsletter_'):
        return "section.settings.layout_variant == 'newsletter'"
    if key.startswith('content_overlay_') and key != 'content_overlay_enabled':
        return 'section.settings.content_overlay_enabled'
    if key.startswith('video_') or key in ['image', 'image_alt']:
        return "section.settings.mode == 'media'"
    if key in ['overlay_color', 'overlay_opacity']:
        return "section.settings.overlay_type == 'solid'"
    if key.startswith('grad_'):
        return "section.settings.overlay_type == 'gradient'"
    if key == 'safe_offset_px':
        return 'section.settings.enable_header_overlap'

update('sections/call-to-action-banner.liquid', {'anchor_id': 'Section behavior', 'section_radius': 'Layout', 'heading_color': 'Colors', 'image': 'Background media', 'overlay_type': 'Background overlay', 'heading': 'Content', 'cta_btn_bg': 'Buttons', 'layout_dir': 'Product layout', 'newsletter_action_url': 'Newsletter integration', 'newsletter_btn_bg': 'Newsletter button', 'content_overlay_enabled': 'Content backdrop'}, banner_condition)

def hero_condition(key):
    if key.startswith('row_') and key != 'row_collection':
        return "section.settings.product_block_mode == 'collection'"
    if key == 'show_atc':
        return "section.settings.product_block_mode == 'single'"
    if key.startswith('reveal_') and key != 'reveal_enable':
        return 'section.settings.reveal_enable'
    if key == 'parallax_strength':
        return 'section.settings.parallax_enable'
    if key.endswith('_local'):
        return 'section.settings.use_section_button_motion'
    if key == 'card_bg':
        return "section.settings.card_style == 'panel'"

update('sections/featured-product-hero-banner.liquid', {'layout_variant': 'Layout', 'bg_image': 'Background media', 'overlay_color': 'Background overlay', 'card_style': 'Content backdrop', 'badge': 'Content', 'btn_bg': 'Button appearance', 'cta1_text': 'Primary button', 'cta2_text': 'Secondary button', 'product_block_mode': 'Product content', 'row_collection': 'Collection content', 'region_label': 'Accessibility'}, hero_condition)

(ROOT / 'docs/ultima/editor-panel-improvements-20261019.json').write_text(json.dumps(changes, indent=2) + '\n', encoding='utf-8')
print(json.dumps(changes, indent=2))
