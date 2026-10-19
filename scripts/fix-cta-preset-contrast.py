"""Correct known low-contrast CTA insertion defaults, preserving saved merchant data."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / 'sections/call-to-action-banner.liquid'
source = path.read_text(encoding='utf-8')
match = re.search(r'({%\s*schema\s*%})(.*?)({%\s*endschema\s*%})', source, re.S)
schema = json.loads(match[2])
defaults = {'cta_btn_text': '#1F130D', 'newsletter_btn_text': '#1F130D', 'cta_outline_text': '#2B2117', 'cta_outline_border': '#2B2117'}
for field in schema['settings']:
    if field.get('id') in defaults:
        field['default'] = defaults[field['id']]
for preset in schema['presets']:
    settings = preset['settings']
    if settings['layout_variant'] == 'classic':
        settings.update(cta_btn_text='#1F130D', cta_btn_hover_bg='#9A4321', cta_btn_hover_border='#9A4321', cta_outline_text='#2B2117', cta_outline_border='#2B2117')
    elif settings['layout_variant'] == 'web3':
        settings.update(section_bg_color='#111827', section_bg_opacity=100, cta_outline_text='#FFFFFF', cta_outline_border='#FFFFFF')
source = source[:match.start(2)] + '\n' + json.dumps(schema, ensure_ascii=False, indent=2) + '\n' + source[match.end(2):]
path.write_text(source, encoding='utf-8', newline='\n')
print('CTA insertion defaults and two presets corrected; runtime and saved store settings unchanged.')
