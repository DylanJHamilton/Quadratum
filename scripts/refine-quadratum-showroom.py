"""Refresh the showroom's concrete commerce examples and builder reference."""
import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def read(name):
    return json.loads((ROOT / name).read_text(encoding='utf-8'))

def save(name, data):
    (ROOT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

products = [
    ('vector-one', 'Technology / ARC//FORM', 'Let shoppers explore the frame, compare finishes and see the details up close.'),
    ('mc-morrow-scratcher', 'Pets / Morrow', 'Give everyday products a distinct personality, with room for sizes and materials.'),
    ('creatine-sachet-concept', 'Supplements / Kinvar', 'Organize pack formats and product information in a focused presentation.'),
    ('golden-library-ballroom-gown', 'Fashion / Vantier', 'Make intricate photography part of the shopping experience.'),
]
lab = {'type': 'commerce-showcase', 'settings': {'eyebrow': 'FOUR INDUSTRIES. ONE FOUNDATION.', 'heading': 'Your products. Your presentation.', 'heading_tag': 'h2', 'intro': '<p>Open the same product in four layouts. Compare the gallery, product information and buying experience using real demo catalog data.</p>'}, 'blocks': {f'product{i}': {'type': 'product', 'settings': {'product': handle, 'category': category, 'description': description}} for i, (handle, category, description) in enumerate(products)}, 'block_order': [f'product{i}' for i in range(4)]}
home = read('templates/index.json')
home['sections']['commerce'] = lab
# A shorter, deliberate journey: product proof, industry range, deeper layouts, builder workflow.
home['order'] = ['s0', 'commerce', 's2', 's3', 's5', 's4', 's8', 's9']
home['sections'] = {key: home['sections'][key] for key in home['order']}
home['sections']['s0']['settings'].update(label='See the product experience', link='/pages/features?view=products', label_two='Find your industry', link_two='/pages/features?view=brands')
home['sections']['s4']['settings'].update(layout='text', brand_art='none', heading='Learn the system. Build your next store.', body='<p>Named sections. Reusable templates. Settings you can inspect. Give your team or connected AI assistant a concrete starting point for the next build.</p>', label='Open the builder reference', link='/pages/features?view=builder-reference')
save('templates/index.json', home)
detail = copy.deepcopy(lab)
detail['settings'].update(heading='Let the product lead.', heading_tag='h1')
save('templates/page.products.json', {'sections': {'commerce': detail}, 'order': ['commerce']})
save('templates/page.builder-reference.json', {'sections': {'reference': {'type': 'builder-reference', 'settings': {}}}, 'order': ['reference']})

inventory = {}
for path in sorted((ROOT / 'sections').glob('*.liquid')):
    match = re.search(r'{% schema %}(.*?){% endschema %}', path.read_text(encoding='utf-8'), re.S)
    if not match:
        continue
    schema = json.loads(match.group(1))
    inventory[path.stem] = {key: schema[key] for key in ('name', 'settings', 'blocks', 'max_blocks', 'enabled_on', 'disabled_on', 'presets') if key in schema}
manifest = {'schema_version': 1, 'theme': 'Quadratum', 'scope': 'Development showroom; inventory generated from this source tree. Not an MCP integration or a guarantee of connector access.', 'product_templates': {'default': 'main-product-modern-variant', 'classic': 'main-product-classic', 'simple': 'main-product-simple', 'compact': 'main-product-compact'}, 'collection_templates': ['default', 'sidebar', 'editorial', 'minimal', 'collection-list'], 'presets': list(read('config/settings_data.json')['presets']), 'sections': inventory}
save('assets/quadratum-builder-manifest.json', manifest)

agencies = read('templates/page.agencies.json')
first = agencies['sections'][agencies['order'][0]]['settings']
first.update(label='Open the builder reference', link='/pages/features?view=builder-reference')
save('templates/page.agencies.json', agencies)
print('Refreshed homepage, four-industry product comparison, builder page and schema inventory.')
