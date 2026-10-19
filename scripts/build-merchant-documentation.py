"""Build merchant instructions and a complete, schema-synchronized control reference."""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = re.compile(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', re.S)

def read_schema(path):
    match = SCHEMA.search(path.read_text(encoding='utf-8-sig'))
    return json.loads(match[1]) if match else None

def field_help(s):
    kind, key, label = s['type'], s.get('id',''), s.get('label','')
    help_by_type = {
      'checkbox': 'Turn on “'+label+'” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.',
      'text': 'Enter the '+label.lower()+'. Replace sample wording with your own content; leave optional fields empty when you do not need them.',
      'textarea': 'Write the '+label.lower()+'. Keep paragraphs short and preview long text on mobile.',
      'richtext': 'Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.',
      'inline_richtext': 'Add a short line of text. Use the available emphasis and link tools; this field is intended for inline content.',
      'image_picker': 'Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.',
      'video': 'Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.',
      'video_url': 'Paste a supported YouTube or Vimeo video URL. Check playback in the preview; an external video can depend on the provider and the visitor’s privacy settings.',
      'product': 'Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.',
      'product_list': 'Choose existing products in the order you want to feature them. Edit product information in Products.',
      'collection': 'Choose an existing collection. Manage its products, title, image, and description under Products > Collections.',
      'collection_list': 'Choose existing collections in the order you want to show them. Manage each collection in Products > Collections.',
      'blog': 'Choose an existing blog. Create and manage its articles in Shopify’s blog post editor.',
      'article': 'Choose an existing blog post. Its image, title, excerpt, and publication date come from the post.',
      'page': 'Choose an existing Shopify page. Edit the page’s content separately in Online Store > Pages.',
      'link_list': 'Create or edit a menu in Content > Menus, then select it here. Nest links to create dropdown levels. Preview both desktop navigation and the mobile menu.',
      'url': 'Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.',
      'color': 'Choose a color for '+label.lower()+'. Check the paired background or text color: body text needs readable contrast, including hover and focus states.',
      'color_background': 'Choose a background fill. Check every foreground label and button against the resulting background.',
      'font_picker': 'Choose a font from Shopify’s font library. Preview headings, body text, bold, and italic text. Larger or heavier type can change line breaks and spacing.',
      'range': 'Drag the control to adjust '+label.lower()+'. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.',
      'number': 'Enter a number for '+label.lower()+'. Follow the unit and instructions shown below. A number alone does not create a Shopify discount, shipping rate, or inventory rule.',
      'select': 'Choose one of the supported options below for '+label.lower()+'. Only the selected option applies; other settings can further customize its appearance.',
      'radio': 'Choose one of the supported options below for '+label.lower()+'. Only one option can be active.',
      'liquid': 'Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.',
      'html': 'Advanced: add trusted HTML. Keep headings, image alternatives, and links accessible. Use a duplicated unpublished theme for code changes.',
      'text_alignment': 'Choose the alignment of the text. Compare it with the surrounding content so the reading order remains clear.',
      'header': '', 'paragraph': '',
    }
    result = help_by_type.get(kind, 'Configure '+label.lower()+' using the control shown in the theme editor, then preview the result.')
    if 'namespace' in key:
        result = 'Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.'
    elif key.endswith('_key') or key == 'key':
        result = 'Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.'
    elif 'countdown_end' in key or key in ['end_datetime','end_date']:
        result = 'Enter the real end date and time of a genuine event or offer in the format described below. Check the time zone. Do not use a resetting countdown or imply a discount that has not been configured in Shopify.'
    elif 'threshold' in key or re.search(r'tier_\d+_amount', key):
        result = 'Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.'
    elif kind == 'select' and 'font_family' in key:
        result = 'Choose whether this element follows the theme heading font, body font, or its surrounding content. Select the actual font in Theme Settings > Branding.'
    if kind == 'range' and '1000' in label and 'em' in label:
        result += ' This editor value is scaled by 1,000: 20 means 0.02em of letter spacing.'
    elif kind == 'range' and '100' in label:
        result += ' This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.'
    if key == 'predictive_search_debounce':
        result = 'Set how long the search waits after the last keystroke before requesting suggestions, in milliseconds. For example, 250 means a quarter of a second. A longer delay reduces requests but makes suggestions feel slower.'
    elif key == 'predictive_search_min_chars':
        result = 'Set how many characters a shopper must type before suggestions are requested. This does not prevent submitting a shorter search with the Search button.'
    elif key in ['script_head','script_body_open','script_body_close']:
        result = 'Advanced legacy integration slot. Prefer an app embed or native section. Only add code you own or trust; never enter credentials. Leave the default none when unused. The Allow legacy custom code switch controls these slots.'
    elif key in ['forms_global_endpoint','forms_backend','captcha_site_key','forms_captcha_provider','gmap_api_key','gmap_enable']:
        result += ' This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.'
    elif key in ['popup_frequency','popup_editor_preview']:
        result += ' Saved frequency state can prevent the popup from appearing again in the same browser. Use the editor preview control to review content without treating it as a new customer subscription.'
    elif key in ['currency_selector_enable','locale_selector_enable','rtl_enable']:
        result += ' Configure countries, currencies, and published languages in Shopify first. Enabling a selector does not add a market or translate your content. RTL changes layout direction; review translated content and icons separately.'
    elif key == 'preconnect_hosts':
        result = 'Advanced: list only origins the storefront actually needs, separated by commas. Keep Shopify CDN origins unless you have measured a reason to change them. This hints at connections; it does not load a script or make an external service faster by itself.'
    return result

def controls(settings):
    return [{**s, 'how':field_help(s)} for s in settings]

def category(slug):
    if slug.startswith(('header','footer','announcement')): return 'Navigation'
    if slug.startswith(('main-product','product-','featured-product')): return 'Products'
    if 'collection' in slug: return 'Collections'
    if 'blog' in slug or 'article' in slug: return 'Journal'
    if any(x in slug for x in ['cart','search','wishlist','password','404']): return 'Store essentials'
    if 'hero' in slug or 'banner' in slug: return 'Banners and imagery'
    if any(x in slug for x in ['newsletter','contact','form']): return 'Forms and support'
    if any(x in slug for x in ['gallery','video','3d','media','lookbook']): return 'Media and interaction'
    return 'Content and merchandising'

SPECIAL = {
 'product-bundles':['Select manual products or a collection first. Choose an optional product metafield reference only when you already have a suitable definition.', 'The section adds selected products as separate cart lines. It does not create a bundle SKU or apply a discount. Configure real automatic discounts separately in Shopify.'],
 'product-story':['Start with Manual blocks and add story text, images, or timeline items. Use Split for a lead image beside the story; additional media remains in the content.', 'For advanced data, select a product metafield. A reference entry may supply heading, content, media_image, media_video, media_caption, and timeline_items. A timeline list uses title, date, text, and image fields.'],
 'product-meta-panels':['Add one panel block per subject, then choose tabs, cards, or a table. Use Manual content for a quick start.', 'For a referenced entry, configure its product metafield namespace and key, then list the entry field keys to display in the Field key control.'],
 'main-search':['Search results come from Shopify. Choose searchable content types in Theme Settings > Search settings.', 'Product filters appear when Shopify supplies configured filters. Configure them with Shopify Search & Discovery. Applying product filters narrows the request to products; clearing filters restores the configured result types.'],
 'main-product-compact':['Assign the compact product template to a product, then arrange the title, price, variants, quantity, buy buttons, and description blocks.', 'Native option swatches appear when option values have color or image swatch data. The full media disclosure includes every product image and rich media item.'],
 'product-block-section':['Add a product layout row, add a column inside it, then insert product or content blocks in the column.', 'Use the product form block to group purchase controls. Keep one authoritative variant and quantity control for each form, and test the cart after changing the structure.'],
 'main-collection-list':['This section lists collections. Select the desired collections or use the store collection list.', 'Set each collection’s image in Shopify. The first product image is used when a collection image is absent.'],
 'custom-liquid':['Use this section for a small, trusted integration that needs Liquid or HTML.', 'Prefer native sections and app blocks where available. Duplicate the theme before editing custom code.'],
}

sections = {p.stem:read_schema(p) for p in ROOT.glob('sections/*.liquid')}
sections = {k:v for k,v in sections.items() if v}
blocks = {p.stem:read_schema(p) for p in ROOT.glob('blocks/*.liquid')}
blocks = {k:v for k,v in blocks.items() if v}
modules = []
for kind, inventory in [('section',sections),('block',blocks)]:
    for slug, schema in sorted(inventory.items()):
        title = schema.get('name',slug)
        steps = SPECIAL.get(slug, [])[:]
        if kind == 'section':
            if schema.get('presets'):
                steps.insert(0, 'Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose '+title+'.')
            else:
                steps.insert(0, 'Open the template that already contains '+title+' in the theme editor. This is a template or system section and may not appear in Add section.')
            if schema.get('blocks'): steps.append('Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.')
            steps.append('Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.')
        else:
            steps.insert(0, 'Open a compatible section or parent block in the theme editor, select Add block, and choose '+title+'. The parent controls its available space and overall layout.')
            steps.append('Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.')
        steps.append('Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.')
        if kind == 'section' and slug in {'showroom-campaign','editorial-story','commerce-showcase','builder-reference','documentation-hub','theme-support'}:
            steps.insert(0, 'Showcase component: this page belongs to the Quadratum demonstration and support website. It is excluded from the merchant submission package.')
        elif kind == 'section' and slug == 'main-product-master':
            steps.insert(0, 'Development component: this legacy laboratory layout is excluded from the merchant submission package. Use a supported product template for a customer store.')
        presets = [{'name':p.get('name'),'settings':p.get('settings',{}),'blocks':p.get('blocks',[])} for p in schema.get('presets',[])]
        module = {'slug':kind+'-'+slug,'name':title,'kind':kind,'category':category(slug),'file':kind+'s/'+slug+'.liquid','steps':steps,'settings':controls(schema.get('settings',[])), 'blocks':[dict(b,settings=controls(b.get('settings',[]))) for b in schema.get('blocks',[])], 'presets':presets,'enabled_on':schema.get('enabled_on'),'disabled_on':schema.get('disabled_on'),'limit':schema.get('limit'),'max_blocks':schema.get('max_blocks')}
        modules.append(module)

GROUP_HELP = {
 'Theme settings':['The tagline and announcement here are fallbacks. If a header or announcement section supplies its own text, edit that section too. Any shipping promise must match an actual Shopify shipping rule.'],
 'Branding':['Select desktop and mobile logos, then a favicon and social share image. Set heading and body fonts before adjusting sizes and line heights.', 'Set base background and text as a pair. Review the separate button, badge, muted text, and dark-mode pairs. Section overrides can keep their own colors.'],
 'User interface':['Choose a design kit and button style, then set container widths, shared gaps, and section padding. Start with the defaults and change one scale at a time.', 'Top and bottom section padding combine with the neighboring section. Reduce one side when two large gaps meet; keep useful separation between distinct sections.'],
 'Header':['Select your Main menu and sticky preference, then open the active header section to review its own settings. Each header layout can offer local overrides.', 'Preview dropdowns and the mobile menu after adding nested menu items. Keep announcement copy brief and truthful.'],
 'Footer':['Set shared footer defaults, then add the actual menu and content blocks inside the active footer section. Column count controls layout; it does not create menu items.', 'Use your own policies and contact information. Review narrow screens and retain the native Shopify credit in the submitted demo.'],
 'Commerce defaults':['Choose whether successful additions open the cart drawer, and which purchase surfaces trigger it. Disabling the drawer retains the native cart journey.', 'Configure any free-shipping or reward milestones in Shopify before entering matching amounts here. Select an actual gift-wrap product if you offer it; the theme adds that product as a cart line.', 'Wishlist controls store saved products in the shopper’s current browser. Choose a page using the wishlist template before enabling its navigation link.'],
 'Search settings':['Choose result types and the main form style. Full results support products, pages, and articles; collections are predictive suggestions.', 'Enable predictive search, set its minimum characters, delay, and per-type limits, then style the result panel. Use actual catalog terms to review loading, no-results, and keyboard behavior.', 'The popup has its own heading, placeholder, size, and form style. Product filters require Shopify filter configuration.'],
 '404 Settings':['Use a clear error message, a Home or collection destination, and a search form. Add optional imagery after the navigation is useful.', 'Preview a nonexistent storefront path. The page must remain helpful even if the optional image is absent.'],
 'Media settings':['These settings affect shared components that use the global media defaults. Individual sections can expose separate ratios, autoplay, and loop controls.', 'Keep lazy loading on for images below the first screen. Check video posters, playback controls, and reduced-motion behavior on the actual page.'],
 'Integrations':['Native storefront and Shopify forms do not require an external endpoint. Only configure optional third-party destinations when you have a working service and understand which data it receives.', 'Leave unused social URLs empty. A social link does not embed a feed or connect an account.', 'Do not paste private keys into theme settings. Public map or CAPTCHA keys require appropriate service and domain restrictions.'],
 'Popups':['Write the offer, choose imagery, and select the signup form or link destination before enabling the popup. A newsletter form collects an opt-in; it does not create or send a discount code.', 'Choose a trigger and frequency, then preview desktop and mobile. Use the editor preview option to inspect it when stored frequency rules would hide it.', 'Check Escape, the close button, focus return, and readability. Keep the underlying page usable when the popup is dismissed.'],
 'Performance settings':['Keep the default font-loading strategy unless you have measured an improvement. Compare multiple page types after any performance-related change.', 'Preconnect hints should match origins used by your real storefront. They cannot compensate for oversized imagery, heavy app scripts, or too much content above the fold.'],
 'Localization settings':['Set up Shopify Markets and publish translated languages before enabling selectors. Review country and language changes using the actual storefront.', 'RTL changes direction and needs translated content as well as a visual review. Theme settings do not translate product descriptions or create exchange rates.'],
}
for i, group in enumerate(json.loads((ROOT/'config/settings_schema.json').read_text(encoding='utf-8-sig'))):
    if not group.get('settings'): continue
    modules.append({'slug':'settings-'+str(i),'name':group['name'],'kind':'settings','category':'Theme Settings','file':'config/settings_schema.json','steps':['Open Online Store > Themes > Customize, then select Theme Settings and '+group['name']+'.',*GROUP_HELP.get(group['name'],[]),'Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.','Preview a home, product, collection, and cart page before saving shared changes.'],'settings':controls(group['settings']),'blocks':[],'presets':[]})

def descendants(schema, seen=None):
    seen = set() if seen is None else set(seen)
    result = set()
    for child in schema.get('blocks',[]):
        name = child['type']
        if name == '@theme': result.update(blocks)
        if name in blocks and name not in seen:
            result.add(name);result.update(descendants(blocks[name],seen|{name}))
    return result
for module in modules:
    if module['kind'] == 'block':
        name = module['slug'].removeprefix('block-')
        module['available_in'] = [schema['name'] for slug,schema in sections.items() if name in descendants(schema)]

index = []
for module in modules:
    filename = 'q-doc-'+module['slug']+'.json'
    (ROOT/'assets'/filename).write_text(json.dumps(module, ensure_ascii=False, separators=(',',':'))+'\n',encoding='utf-8')
    count = sum('id' in s for s in module['settings']) + sum(sum('id' in s for s in b.get('settings',[])) for b in module['blocks'])
    keywords = ' '.join([s.get('label','') for s in module['settings']]+[b.get('name',b['type']) for b in module['blocks']])
    index.append({'slug':module['slug'],'name':module['name'],'kind':module['kind'],'category':module['category'],'count':count,'keywords':keywords,'asset':filename})

index_liquid = '[' + ',\n'.join(json.dumps({k:v for k,v in item.items() if k!='asset'},ensure_ascii=False)[:-1]+',"url":'+"{{ '"+item['asset']+"' | asset_url | json }}"+'}' for item in index) + ']'
(ROOT/'snippets/documentation-index.liquid').write_text(index_liquid+'\n',encoding='utf-8')
summary = {'sections':len(sections),'blocks':len(blocks),'theme_setting_groups':sum(m['kind']=='settings' for m in modules),'theme_controls':sum(sum('id' in s for s in m['settings']) for m in modules if m['kind']=='settings'),'documented_controls':sum(i['count'] for i in index),'modules':len(modules),'index_bytes':len(index_liquid.encode()),'module_files':[i['asset'] for i in index]}
(ROOT/'docs/ultima/documentation-coverage-20261018.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
for name, section in [('documentation','documentation-hub'),('customer-care','theme-support')]:
    (ROOT/'templates'/('page.'+name+'.json')).write_text(json.dumps({'sections':{'main':{'type':section,'settings':{}}},'order':['main']},indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k!='module_files'}))
