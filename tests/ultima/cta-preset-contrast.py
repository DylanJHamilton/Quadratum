"""Check concrete insertion colors including whole-button hover opacity."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
schema = json.loads(re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', (root / 'sections/call-to-action-banner.liquid').read_text(encoding='utf-8'), re.S)[1])
defaults = {s['id']: s.get('default') for s in schema['settings'] if 'id' in s}

def channels(color):
    return [int(color[i:i+2], 16) / 255 for i in (1, 3, 5)]

def luminance(rgb):
    return sum((v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4) * weight for v, weight in zip(rgb, [.2126, .7152, .0722]))

def contrast(a, b):
    low, high = sorted([luminance(a), luminance(b)])
    return (high + .05) / (low + .05)

for preset in [{'name': 'Schema defaults', 'settings': {}}] + schema['presets']:
    s = dict(defaults, **preset['settings'])
    surface = channels(s['section_bg_color'])
    for prefix in ['cta_btn', 'newsletter_btn']:
        assert contrast(channels(s[prefix + '_bg']), channels(s[prefix + '_text'])) >= 4.5, (preset['name'], prefix, 'rest')
        opacity = s['cta_btn_hover_opacity'] / 100
        mixed = [[v * opacity + back * (1-opacity) for v, back in zip(channels(s[prefix + '_hover_' + kind]), surface)] for kind in ['bg', 'text']]
        assert contrast(*mixed) >= 4.5, (preset['name'], prefix, 'hover')
    assert contrast(surface, channels(s['cta_outline_text'])) >= 4.5, (preset['name'], 'outline')
print('PASS CTA schema and both insertion presets: solid, newsletter, hover compositing and outline contrast >= 4.5:1. Merchant media/custom-color choices still require visual review.')
