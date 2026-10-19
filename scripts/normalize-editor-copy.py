"""Normalize editor labels without changing setting IDs, values, or storefront copy."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROPER = {'shopify', 'liquid', 'youtube', 'vimeo', 'facebook', 'instagram', 'tiktok', 'pinterest', 'linkedin', 'whatsapp', 'google', 'apple', 'paypal', 'klarna', 'afterpay', 'quadratum', 'openstreetmap', 'mapbox'}

def sentence(text):
    if text.startswith('t:') or '<' in text:
        return text
    text = text.replace(' & ', ' and ').replace('�', '—')
    text = re.sub(r'\bCTA\b', 'Button', text) if 'label' in text.lower() or 'link' in text.lower() else text
    text = re.sub(r'\b(colour|colours|centre|centred|grey|customise|catalogue|cancelled)\b', lambda m: {'colour':'color','colours':'colors','centre':'center','centred':'centered','grey':'gray','customise':'customize','catalogue':'catalog','cancelled':'canceled'}[m[0].lower()], text, flags=re.I)
    index = 0
    def word(m):
        nonlocal index
        value = m[0]
        index += 1
        if index == 1 or value.lower() in PROPER or value.isupper():
            return value
        return value.lower()
    return re.sub(r'[A-Za-z]+', word, text)

changes = []
paths = [*ROOT.glob('sections/*.liquid'), *ROOT.glob('blocks/*.liquid'), ROOT/'config/settings_schema.json']
for path in paths:
    text = path.read_text(encoding='utf-8-sig')
    match = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', text, re.S)
    if not match and path.suffix == '.liquid':
        continue
    raw = match[1] if match else text
    data = json.loads(raw)
    targets = {}
    def add(key, value):
        if isinstance(value, str):
            replacement = sentence(value)
            if replacement != value:
                targets[(key, value)] = replacement
    def schema(node):
        add('name', node.get('name'))
        for setting in node.get('settings', []):
            add('label', setting.get('label'))
            if setting.get('type') == 'header':
                add('content', setting.get('content'))
            for option in setting.get('options', []):
                add('label', option.get('label'))
        for block in node.get('blocks', []):
            if isinstance(block, dict): schema(block)
        for preset in node.get('presets', []):
            add('name', preset.get('name'))
            add('category', preset.get('category'))
    for node in data if isinstance(data, list) else [data]: schema(node)
    def replace(m):
        key, value = m[1], json.loads(m[2])
        result = targets.get((key, value))
        return m[0] if result is None else m[0][:m.start(2)-m.start()] + json.dumps(result, ensure_ascii=False)
    updated = re.sub(r'"(name|label|content|category)"\s*:\s*("(?:[^"\\]|\\.)*")', replace, raw)
    if updated != raw:
        if match: text = text[:match.start(1)] + updated + text[match.end(1):]
        else: text = updated
        path.write_text(text, encoding='utf-8')
        changes.append({'path': path.relative_to(ROOT).as_posix(), 'labels': len(targets)})
print(json.dumps(changes))
