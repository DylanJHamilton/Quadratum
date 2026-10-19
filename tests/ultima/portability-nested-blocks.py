"""Ensure packaging resets store resources without destroying nested design settings."""
import importlib.util
import json
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('portability', ROOT / 'scripts/submission_portability.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def liquid_schema(path, data):
    path.write_text('{% schema %}' + json.dumps(data) + '{% endschema %}', encoding='utf-8')

with tempfile.TemporaryDirectory(dir=ROOT / '.cache') as temporary:
    stage = Path(temporary) / 'ultima-submission'
    for name in ['sections', 'blocks', 'templates', 'config', 'listings']:
        (stage / name).mkdir(parents=True)
    liquid_schema(stage / 'sections/main.liquid', {'blocks': [{'type': 'row'}, {'type': 'inline', 'settings': [{'id': 'title', 'type': 'text'}]}]})
    liquid_schema(stage / 'blocks/row.liquid', {'settings': [{'id': 'gap', 'type': 'range'}], 'blocks': [{'type': 'heading'}, {'type': 'hotspot'}]})
    liquid_schema(stage / 'blocks/heading.liquid', {'settings': [{'id': 'text', 'type': 'text'}, {'id': 'size', 'type': 'range'}, {'id': 'links', 'type': 'textarea'}]})
    liquid_schema(stage / 'blocks/hotspot.liquid', {'settings': [{'id': 'x', 'type': 'range'}, {'id': 'product', 'type': 'product'}, {'id': 'image', 'type': 'image_picker'}]})
    # An inline block must keep its own schema, even if a theme block shares its name.
    liquid_schema(stage / 'blocks/inline.liquid', {'settings': [{'id': 'other', 'type': 'text'}]})
    data = {'sections': {'main': {'type': 'main', 'blocks': {
        'row': {'type': 'row', 'settings': {'gap': 24}, 'blocks': {
            'heading': {'type': 'heading', 'settings': {'text': 'Make room for more', 'size': 42, 'links': 'Vector One | /products/vector-one\nEyewear | /collections/smart-eyewear\nOur story | /pages/about\nJournal | /blogs/news\nSearch | /search'}},
            'point': {'type': 'hotspot', 'settings': {'x': 31, 'product': 'original-product', 'image': 'shopify://shop_images/original.jpg'}}}},
        'inline': {'type': 'inline', 'settings': {'title': 'An inline detail'}}}}}}
    (stage / 'templates/index.json').write_text(json.dumps(data))
    (stage / 'config/settings_schema.json').write_text('[]')
    (stage / 'config/settings_data.json').write_text('{"current": {}, "presets": {}}')
    module.sanitize(stage)
    result = json.loads((stage / 'templates/index.json').read_text())['sections']['main']['blocks']
    assert result['row']['settings'] == {'gap': 24}
    assert result['row']['blocks']['heading']['settings'] == {'text': 'Make room for more', 'size': 42, 'links': 'Shop all products | /collections/all\nSearch | /search'}
    assert result['row']['blocks']['point']['settings'] == {'x': 31, 'product': '', 'image': ''}
    assert result['inline']['settings'] == {'title': 'An inline detail'}
print('PASS nested block packaging: layout, heading and hotspot settings retained; store resources reset; inline schemas preserved.')
