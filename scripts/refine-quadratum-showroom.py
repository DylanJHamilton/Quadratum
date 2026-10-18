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
    ('metropolitan-suit-jacket', 'Fashion / Vantier', 'Compare tailoring, materials and sizes in four distinct presentations.'),
]
lab = {'type': 'commerce-showcase', 'settings': {'eyebrow': 'FOUR INDUSTRIES. ONE FOUNDATION.', 'heading': 'Your products. Your presentation.', 'heading_tag': 'h2', 'intro': '<p>Open the same product in four layouts. Compare the gallery, product information and buying experience using real demo catalog data.</p>'}, 'blocks': {f'product{i}': {'type': 'product', 'settings': {'product': handle, 'category': category, 'description': description}} for i, (handle, category, description) in enumerate(products)}, 'block_order': [f'product{i}' for i in range(4)]}
def story(heading, body, **settings):
    base = dict(layout='brief', brand_art='none', heading=heading, heading_tag='h2', body=body, background='#f5f5f3', foreground='#141414')
    base.update(settings)
    return {'type': 'editorial-story', 'settings': base}

brands_page = read('templates/page.brands.json')
directory = next(s for s in brands_page['sections'].values() if s['type'] == 'store-directory')
directory['settings'].update(intro='<p>Explore the storefront behind each image. Nine demos are available; EVERREAL is paused for a costume imagery review. Demos open in a new tab; return to this tab to keep exploring.</p>')
for block in directory['blocks'].values():
    st = block['settings']
    if st['title'] == 'EVERREAL':
        st.update(url='', image='', description='Costume imagery is being reviewed before this demo returns.', label='Demo temporarily paused', status='Demo temporarily paused')
    if st['title'] == 'FAIRWAY MOTOR CO.':
        st['image'] = 'shopify://shop_images/fairway-aster-2-select-pearl-white-catalog.webp'
    if st['title'] == 'KINVAR':
        st['image'] = 'shopify://shop_images/kinvar-product-kin-008.webp'
save('templates/page.brands.json', brands_page)
featured = copy.deepcopy(directory)
featured['settings'].update(heading_tag='h2', heading='A different world, every time.', intro='<p>Technology. Home. Pets. Books. Fashion. Open a storefront in a new tab and see how the same foundation takes on a different personality.</p>', link='/pages/features?view=brands', link_label='Explore all brand directions')
featured['blocks'] = {key: value for key, value in featured['blocks'].items() if value['settings']['title'] in ['ARC//FORM', 'Folio & Field', 'Morrow', 'OpenPath Living', 'Northstar', 'VANTIER']}
featured['block_order'] = list(featured['blocks'])

campaign = {'type': 'showroom-campaign', 'settings': {'eyebrow': 'QUADRATUM / THE EVERYDAY EDIT', 'heading': 'Make room for better everyday.', 'body': '<p>Objects for the way you work, unwind and move through the world. Discover the details that make them yours.</p>', 'image': 'shopify://shop_images/station-dock-08-lifestyle.webp', 'spotlight': 'station-dock', 'label': 'Explore the everyday edit', 'link': '/collections/all', 'edit_heading': 'Small details. Daily difference.'}, 'blocks': {}, 'block_order': []}
for i, (handle, category) in enumerate([('vector-one', 'TECHNOLOGY / ARC//FORM'), ('station-dock', 'WORKSPACE / ARC//FORM'), ('mc-morrow-scratcher', 'PET LIVING / MORROW'), ('metropolitan-suit-jacket', 'PERSONAL STYLE / VANTIER')]):
    campaign['blocks'][f'item{i}'] = {'type': 'product', 'settings': {'product': handle, 'category': category}}
    campaign['block_order'].append(f'item{i}')

home = {'sections': {
    'campaign': campaign,
    'worlds': featured,
    'living': story('A little more room to live.', '<p>Warm textures. Quiet corners. Space for the things that matter. See how photography, product discovery and useful details come together in OpenPath Living.</p>', layout='split', image='shopify://shop_images/furniture_banner.webp', eyebrow='IN FOCUS / OPENPATH LIVING', label='Step inside the home demo', link='https://quadratum-theme.myshopify.com/?preview_theme_id=146519392340', label_two='Explore collection layouts', link_two='/pages/features?view=collections', background='#e8e4dc'),
    'commerce': lab,
    'builders': story('Your ideas. A head start.', '<p>Build with ChatGPT or Claude using named sections, reusable templates and an inspectable settings reference. Our demo stores were created with these assistants as part of the design and development workflow.</p><p>Bring the brief. Choose the building blocks. Review the result.</p>', layout='split', brand_art='quadratum-obsidian.png', eyebrow='FOR PEOPLE WHO BUILD / AI-FRIENDLY BY DESIGN', background='#0a0a0a', foreground='#f5f5f3', label='Build with ChatGPT & Claude', link='/pages/features?view=builder-reference', label_two='Get setup support', link_two='/pages/features?view=customer-care'),
    'closing': story('See the whole experience.', '<p>Product pages are just the beginning. Explore collection, journal, article and supporting-page layouts.</p>', eyebrow='BEYOND THE FIRST IMPRESSION', label='Explore the layout library', link='/pages/features?view=explore', label_two='Find your starting point', link_two='/pages/features?view=brands')
}, 'order': ['campaign', 'worlds', 'living', 'commerce', 'builders', 'closing']}
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
index = {'schema_version': 1, 'theme': 'Quadratum', 'usage': 'Choose relevant sections from this compact index, then read their actual Liquid schema through your theme-file connector. Full reference: quadratum-builder-manifest.json.', 'product_templates': manifest['product_templates'], 'presets': manifest['presets'], 'sections': {key: {'name': value['name'], 'file': 'sections/' + key + '.liquid', 'settings_count': len(value.get('settings', [])), 'block_types': [block['type'] for block in value.get('blocks', [])]} for key, value in inventory.items()}}
save('assets/quadratum-builder-index.json', index)

agencies = read('templates/page.agencies.json')
first = agencies['sections'][agencies['order'][0]]['settings']
first.update(label='Open the builder reference', link='/pages/features?view=builder-reference')
save('templates/page.agencies.json', agencies)
print('Refreshed homepage, four-industry product comparison, builder page and schema inventory.')

for view in ['documentation', 'customer-care', 'agencies', 'about', 'features', 'buying-guide', 'care-guide', 'release-status']:
    path = f'templates/page.{view}.json'
    data = read(path)
    for sec in data['sections'].values():
        if sec['type'] == 'editorial-story' and sec['settings'].get('layout') == 'text':
            sec['settings']['layout'] = 'brief'
    if view in ['customer-care', 'documentation', 'agencies', 'features']:
        data['sections']['ai_workflow'] = story('Build with ChatGPT & Claude.', '<p>Quadratum is designed to be understandable to people and connected AI assistants: named sections, reusable templates, native Shopify settings and a downloadable schema reference.</p><p>Our demos were built with ChatGPT and Claude in the workflow. Start with your brand and catalog, ask your assistant to use existing sections, then review its work in an unpublished theme.</p>', eyebrow='AI-ASSISTED STORE BUILDING', label='Open the builder guide', link='/pages/features?view=builder-reference', label_two='Ask for help', link_two='/pages/contact?view=contact')
        data['order'] = [key for key in data['order'] if key != 'ai_workflow']
        data['order'].insert(1, 'ai_workflow')
    if view == 'release-status':
        for sec in data['sections'].values():
            sec['settings']['body'] = sec['settings'].get('body', '').replace('ten historical brand demos are available', 'nine historical brand demos are available; EVERREAL is paused for costume imagery review. The available demos can be opened')
    save(path, data)
