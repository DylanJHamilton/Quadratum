"""Compile the Theme Store build to native services; preserve historical demos.

No provider keys, custom form receivers, booking widgets or CRM SDKs are needed
by the merchant package. Transformations fail closed if the source changes.
"""
import json
import re

EXCLUDED = {
    '3rd-party-crm-form-funnel-embed.liquid',
    '3rd-party-scheduling-booking-embed.liquid',
    '3rd-party-crm-lead-capture-form.liquid',
    '3rd-party-bulk-ordering.liquid',
}
FORM_IDS = {'endpoint_url', 'captcha_mode', 'captcha_site_key'}
GLOBAL_IDS = {'forms_backend', 'forms_captcha_provider', 'captcha_site_key',
              'forms_global_endpoint', 'gmap_enable', 'gmap_api_key', 'gmap_default_zoom'}
MAP_IDS = {'enable_map', 'default_lat', 'default_lng', 'default_zoom', 'pin_primary_label'}
SCHEMA = re.compile(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', re.S)

def apply(root):
    changes = []
    def rewrite(path, text):
        path.write_text(text, encoding='utf-8')
        changes.append(path.relative_to(root).as_posix())
    for path in (root/'sections').glob('*.liquid'):
        text = path.read_text(encoding='utf-8-sig')
        match = SCHEMA.search(text)
        if not match: continue
        schema = json.loads(match[1])
        is_form = "'form-dispatch'" in text
        is_map = path.name == 'maps-store-locator.liquid'
        if not (is_form or is_map): continue
        fields = []
        for field in schema.get('settings', []):
            if field.get('id') in (FORM_IDS if is_form else MAP_IDS): continue
            if field.get('id') == 'destination':
                field['options'] = [o for o in field['options'] if o['value'] != 'custom_endpoint']
                field['info'] = 'Shopify handles delivery and spam protection. Contact sends inquiries; marketing signup records consent according to store settings.'
            if is_form and 'custom endpoint' in field.get('info','').lower():
                field['info'] = 'Shopify handles the submission and spam protection. Marketing confirmation follows the store’s consent and double opt-in settings.'
            if is_map and field.get('type') == 'paragraph':
                field['content'] = 'Location cards, contact links and directions work without an API key. Search matches your configured location text. Directions open Google Maps in a new tab; no geocoding or distance calculation is performed by the theme.'
            if path.name == 'form-waitlist.liquid' and field.get('id') == 'success_text':
                field['default'] = 'Thank you for signing up for product news.'
            if path.name == 'form-waitlist.liquid' and field.get('id') == 'destination':
                field['info'] = 'Records product-interest tags and marketing consent in Shopify. This is a product news signup; it does not send automated inventory alerts.'
            fields.append(field)
        schema['settings'] = fields
        if path.name == 'form-waitlist.liquid':
            schema['name'] = 'Form – product news'
            defaults = {'heading':'Product news, in your inbox', 'subheading':'Sign up for product updates and store news.', 'variant_help':'Choose the product option you are interested in.', 'success_text':'Thank you for signing up for product news.', 'aria_label':'Product news signup'}
            for field in fields:
                if field.get('id') in defaults: field['default'] = defaults[field['id']]
        allowed = {f.get('id') for f in fields}
        for preset in schema.get('presets',[]):
            preset['settings'] = {k:v for k,v in preset.get('settings',{}).items() if k in allowed}
            if preset['settings'].get('destination') == 'custom_endpoint':
                preset['settings']['destination'] = next(f['default'] for f in fields if f.get('id')=='destination')
            if path.name == 'form-waitlist.liquid':
                preset['name'] = preset['name'].replace('waitlist','product news')
                for key in list(preset['settings']):
                    if key in defaults: preset['settings'][key] = defaults[key]
        text = text[:match.start(1)]+'\n'+json.dumps(schema,ensure_ascii=False,indent=2)+'\n'+text[match.end(1):]
        if is_form:
            text = re.sub(r'data-captcha="[^"]*"', 'data-captcha="none"', text)
            text = re.sub(r'\s+data-captcha-key="[^"]*"', '', text)
        if path.name == 'form-waitlist.liquid':
            text = re.sub(r'<p class="q-help">Shopify Customer records.*?</p>', '<p class="q-help">This signup records marketing consent and product-interest tags in Shopify. It does not send automatic restock alerts.</p>', text)
        rewrite(path,text)
    config = root/'config/settings_schema.json'
    groups = json.loads(config.read_text(encoding='utf-8'))
    for group in groups:
        if 'settings' in group:
            group['settings'] = [f for f in group['settings'] if f.get('id') not in GLOBAL_IDS and not (f.get('type')=='header' and 'google maps' in f.get('content','').lower())]
    rewrite(config,json.dumps(groups,ensure_ascii=False,indent=2)+'\n')
    path = root/'snippets/form-dispatch.liquid'
    text = path.read_text(encoding='utf-8')
    start = text.index('{%- liquid\n  assign endpoint_valid')
    native = text.index('  {%- comment %} Shopify supplies each native form')
    assert text.rstrip().endswith('{%- endif -%}')
    text = text[:start] + text[native:]
    text = text[:text.rindex('{%- endif -%}')]
    rewrite(path,text)
    path = root/'assets/frontend-form-logic.js'
    text = path.read_text(encoding='utf-8')
    text = text.replace(', sdkLoads = new Map()', '')
    begin,end = text.index('  const apiFor ='),text.index('  function initForm(')
    text = text[:begin]+text[end:]
    begin,end = text.index('    function clearWidget()'),text.index('    if (steps.length > 1)')
    # Preserve native form validation, multi-step behavior and editor disposal.
    text = text[:begin]+'    function stopOperation() { operation = null; }\n    function clearTokens() {}\n'+text[end:]
    text = text.replace("      if (native || armed || !host.dataset.captcha || host.dataset.captcha === 'none') return;\n      event.preventDefault(); verify(event.submitter);", '      // Shopify owns the native form submission and captcha lifecycle.')
    for name in ['frontend-form-logic.js','frontend-form-logic-form-sections.js']:
        rewrite(root/'assets'/name,text)
    path = root/'assets/maps-locator.js'
    text = path.read_text(encoding='utf-8')
    begin,end = text.index('  function load(key)'),text.index('  function mount(root)')
    text = text[:begin]+text[end:]
    begin,end = text.index('    const center=pair('),text.index('\n  }\n  const scan=')
    text = text[:begin]+text[end:]
    text = text.replace('/* One optional Google Maps loader; native cards remain complete without it. */','/* Native searchable location cards and editor pin preview. No external SDK. */')
    rewrite(path,text)
    path = root/'snippets/maps-locator-engine.liquid'
    rewrite(path,"{{ 'maps-locator.css' | asset_url | stylesheet_tag }}\n<script src=\"{{ 'maps-locator.js' | asset_url }}\" defer></script>\n<div data-map-config hidden data-enabled=\"false\"></div>\n")
    # Saved custom destinations cannot survive a merchant install or listing.
    for folder in ['config','templates','sections','listings']:
        for path in (root/folder).rglob('*.json'):
            if path.name == 'settings_schema.json': continue
            try: data=json.loads(re.sub(r'^\s*/\*.*?\*/','',path.read_text(encoding='utf-8-sig'),flags=re.S))
            except json.JSONDecodeError: continue
            def walk(value):
                if isinstance(value,dict):
                    if value.get('destination') == 'custom_endpoint': value['destination']='shopify_contact'
                    for v in value.values(): walk(v)
                elif isinstance(value,list):
                    for v in value: walk(v)
            walk(data)
            rewrite(path,json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    return sorted(set(changes))
