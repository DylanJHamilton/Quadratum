"""Remove store-owned resources from a staged install, retaining layout and design.

Never run this against the showroom source tree. Demo imagery does not transfer
with a Theme Store install. Merchants select their own resources in the editor.
"""
import json
import re
from pathlib import Path

RESOURCES = {'image_picker', 'video', 'video_url', 'product', 'product_list', 'collection', 'collection_list', 'blog', 'article', 'page', 'metaobject', 'metaobject_list'}
SAFE_URLS = {'/', '/collections', '/collections/all', '/search', '/cart'}
DEMO_COPY = re.compile(r'Quadratum|ChatGPT|Claude|brand worlds|theme demo|concept(?:ual)? store|fictional|no inventory|checkout is disabled|nothing is (?:offered|sold|charged)|not offered for (?:purchase|sale)', re.I)

def read(path):
    return json.loads(re.sub(r'^\s*/\*.*?\*/', '', path.read_text(encoding='utf-8-sig'), flags=re.S))

def schema(path):
    match = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', path.read_text(encoding='utf-8-sig'), re.S)
    return json.loads(match[1]) if match else {}

def sanitize(root):
    assert 'ultima-submission' in root.parts, 'Only sanitize a staged candidate.'
    sections = {p.stem:schema(p) for p in (root/'sections').glob('*.liquid')}
    blocks = {p.stem:schema(p) for p in (root/'blocks').glob('*.liquid')}
    global_schema = {'settings':[v for group in read(root/'config/settings_schema.json') for v in group.get('settings', [])]}
    changes = []

    def clean_url(value):
        if value in SAFE_URLS: return value
        if value.startswith('/products/') or value.startswith('/collections/'): return '/collections/all'
        return ''

    def settings(values, definition, where):
        allowed = {s['id']:s for s in definition.get('settings', []) if 'id' in s}
        for key in list(values):
            if key in ['sections','content_for_index','blocks']: continue
            old = values[key]
            field = allowed.get(key)
            if field is None:
                del values[key]
                changes.append({'path':where+'/'+key, 'reason':'unused setting omitted'})
                continue
            kind = field['type']
            new = old
            if kind in RESOURCES:
                new = [] if kind.endswith('_list') else ''
            elif kind == 'link_list':
                new = field.get('default', 'footer' if 'footer' in where.lower() or 'footer' in key else 'main-menu')
            elif kind == 'url' and isinstance(old, str):
                new = clean_url(old)
            elif isinstance(old, str):
                if 'shopify://' in old or '{{' in old or 'preview_theme_id' in old:
                    new = ''
                elif kind in ['richtext','inline_richtext','html','liquid']:
                    def anchor(m):
                        url = clean_url(m[1])
                        return '<a href="'+url+'">'+m[2]+'</a>' if url else m[2]
                    new = re.sub(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', anchor, old, flags=re.I|re.S)
                    new = re.sub(r'<img\b[^>]*>', '', new, flags=re.I)
                if re.search(r'(?:mailto:|@[^\s]+\.[a-z]{2,}|quadratum-theme\.myshopify\.com)', new, re.I):
                    new = ''
                if DEMO_COPY.search(new):
                    # These are install defaults, never edits to the historical demo stores.
                    if kind == 'liquid':
                        new = '<nav aria-label="Explore the store"><a href="/collections/all">Shop all products</a> <a href="/search">Search the store</a></nav>'
                    elif key in ['question','title','heading'] or key.endswith('_heading'):
                        new = 'Explore the details' if key != 'question' else 'Where can I find more information?'
                    elif key in ['kicker','kicker_text','eyebrow','accent_text','popup_eyebrow']:
                        new = 'Discover more'
                    elif key == 'label':
                        new = 'I agree to be contacted about this request.' if 'understand' in old.lower() else 'Explore the store'
                    elif 'label' in key:
                        new = 'Explore the store'
                    elif kind in ['richtext','inline_richtext','html']:
                        new = '<p>Explore product details and helpful information. Contact the store if you need more information before ordering.</p>'
                    else:
                        new = 'Explore product details and helpful information. Contact the store if you need more information before ordering.'
            if old != new:
                values[key] = new
                changes.append({'path':where+'/'+key, 'reason':'store resource or destination reset', 'type':kind})

    def node(n, definition, where):
        settings(n.get('settings', {}), definition, where+'/settings')
        children = n.get('blocks', {})
        for key, b in (enumerate(children) if isinstance(children, list) else children.items()):
            own = next((x for x in definition.get('blocks', []) if x.get('type') == b.get('type')), None)
            node(b, own or blocks.get(b.get('type'), {}), where+'/blocks/'+str(key))

    def template(data, where):
        for key, n in data.get('sections', {}).items():
            node(n, sections.get(n.get('type', key), {}), where+'/sections/'+key)

    for path in [*(root/'templates').rglob('*.json'), *(root/'sections').glob('*.json'), *(root/'listings').rglob('*.json')]:
        data = read(path)
        template(data, path.relative_to(root).as_posix())
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    path = root/'config/settings_data.json'
    data = read(path)
    parent_is_quadratum = data.get('current') == data.get('presets', {}).get('Quadratum')
    for key, values in [('current', data.get('current', {})), *data.get('presets', {}).items()]:
        if not isinstance(values, dict): continue
        settings(values, global_schema, 'config/settings_data.json/'+key)
        template(values, 'config/settings_data.json/'+key)
        # Store-specific app embed settings never belong in a distributed theme.
        values.pop('blocks', None)
        # Root showroom copy can otherwise leak through perfectly valid text settings.
        if key == 'Quadratum' or (key == 'current' and parent_is_quadratum):
            clean_copy = dict(popup_eyebrow='Store updates', popup_heading='Be the first to know.', popup_text='<p>Get product news and updates from our store.</p>', popup_button_label='Explore the catalog', popup_button_url='/collections/all', popup_secondary_label='Keep browsing', popup_secondary_url='/collections/all', notfound_cta_label='Back to home', notfound_cta_link='/', search_page_placeholder='Search our store', search_empty_message='Try a product name or a different description.')
            for setting, value in clean_copy.items():
                if values.get(setting) != value:
                    changes.append({'path':'config/settings_data.json/'+key+'/'+setting, 'reason':'showroom copy replaced with merchant copy'})
                    values[setting] = value
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    return changes
