"""Compose editable store experiences from the current, repaired section library.

Only writes theme configuration and a provenance manifest. Never changes Shopify
resources, historical demos, or Git branches.
"""
from pathlib import Path
import copy, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]
def read(path):
    return json.loads(re.sub(r'/\*.*?\*/', '', (ROOT/path).read_text(encoding='utf-8-sig'), flags=re.S))
def write(path, value):
    p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def section(kind, settings=None, blocks=None):
    value={'type':kind,'settings':settings or {}}
    if blocks:
        value['blocks']={f'item{i+1}':block for i,block in enumerate(blocks)}
        value['block_order']=list(value['blocks'])
    return value
def template(*sections):
    return {'sections':{f'section{i+1}':s for i,s in enumerate(sections)},'order':[f'section{i+1}' for i in range(len(sections))]}
def text(title,body):
    return section('basic-content-helper-text-centered-full-width',{'kicker':'ARC//FORM','title':title,'body':body,'max_width':'narrow','body_size':'lg','pad_y':48})
def directory(title,intro,items,eyebrow='ARC//FORM',h1=True,popup=False):
    return section('store-directory',{'eyebrow':eyebrow,'heading':title,'heading_tag':'h1' if h1 else 'h2','intro':'<p>'+intro+'</p>','show_popup':popup},[
        section('destination',{'title':title,'description':desc,'url':url,'label':label,'category':category,**({'image':image} if image else {})})
        for title,desc,url,label,category,image in items])
def faq(items):
    return section('interactive-content-helper-tabs-accordion',{'heading':'A few useful answers.','subheading':'<p>Start here, then talk to us if you need a hand.</p>','layout_mode':'accordion','style_preset':'minimal','icon_position':'none','accordion_default_open':'all_closed','update_hash':False},[
        section('item',{'label':q,'content':'<p>'+a+'</p>','icon':'','anchor_id':f'answer-{i+1}'}) for i,(q,a) in enumerate(items)])

pagebase='/pages/contact?view='
care=[('Choosing an object','Compare dimensions, materials and connections before deciding.',pagebase+'buying-guide','Find your fit','Before you buy','shopify://shop_images/vector-one-08-lifestyle.webp'),('Care & setup','Simple habits for objects you use every day.',pagebase+'care-guide','Read the guide','After it arrives','shopify://shop_images/station-dock-08-lifestyle.webp'),('Talk to the studio','Product questions, setup help and feedback in one place.','/pages/contact?view=contact','Get in touch','A human answer',None)]
write('templates/page.customer-care.json',template(directory('Good objects. Useful support.','Everything you need to choose well, get started and keep things in use.',care),faq([
    ('Where do I find technical specifications?','Each product page lists its specifications and available options. Check device connections and dimensions before selecting an object.'),
    ('How do I ask a product question?','Use the <a href="/pages/contact?view=contact">support form</a> and include the product name and what you would like to know.'),
    ('Can I purchase from this store?','ARC//FORM is an illustrative Quadratum theme store. Its products and brand stories demonstrate the shopping experience; they are not offered for purchase here.')])) )
write('templates/page.services.json',template(directory('A little help goes a long way.','From choosing a frame to planning a calmer desk, start with the task in front of you.',care),text('Bring us the details.','<p>Tell us which object you are considering, the device you use and what you need it to do. A clear starting point makes a useful answer possible.</p><p><a href="/pages/contact?view=contact">Contact the studio</a></p>')))
write('templates/page.why-choose-us.json',template(directory('Less friction. More everyday.','Objects earn their place by making the ordinary feel considered.',[],h1=True),text('A familiar starting point.','<p>Familiar shapes, readable controls and practical connections. Our collection starts with the things people already know how to use.</p>'),text('One material language.','<p>Matte surfaces, quiet colors and purposeful details bring the collection together. Compare the eyewear, carry and workday objects to find a combination that feels like yours.</p>'),directory('Find your everyday.', 'Explore by the way you spend your day.',care,h1=False)))
write('templates/page.buying-guide.json',template(directory('Choose around your day.','A short guide to finding the right object for the job.',[],h1=True),faq([
    ('Eyewear: start with fit.','Compare the frame dimensions with a pair you already wear. Review the lens and audio information on the product page before choosing a finish.'),
    ('Carry: start with what you bring.','Measure your laptop and consider the items that travel with it. Check the bag dimensions and compartment details instead of relying on capacity alone.'),
    ('Power: start with your devices.','Compare the stated input and output specifications with your devices and cables. Available power depends on the connections in use.'),
    ('Desk: start with connections.','List your display, network and peripheral requirements. Check host-device compatibility before selecting a dock or hub.')]),text('Still deciding?','<p><a href="/pages/contact?view=contact">Ask a product question</a> or <a href="/collections/all-products">browse every object</a>.</p>')))
write('templates/page.care-guide.json',template(directory('Keep the everyday in good shape.','Thoughtful handling starts with the instructions supplied with your object.',[],h1=True),faq([
    ('Eyewear and screens','Use the cleaning method specified for your lenses or display. Avoid abrasive materials, and store eyewear in its case when it is not in use.'),
    ('Bags and fabric','Check the material-specific care instructions. Empty pockets before cleaning and allow damp fabric to dry fully before storing.'),
    ('Chargers, cables and docks','Disconnect power before cleaning. Keep ports dry and free of debris; stop using a cable or device if it is visibly damaged.'),
    ('Need more specific guidance?','Tell us the product name through the <a href="/pages/contact?view=contact">support form</a>. Follow the manufacturer instructions for your exact model.')])) )

# Alternative presentations use actual resource data, never a hard-coded product.
recommend=section('product-recommend',{})
write('templates/product.classic.json',template(section('main-product-classic',{'max_width':'xl','thumb_placement_desktop':'left','desktop_sticky_target':'summary','enable_lightbox':True,'show_vendor':False,'show_dynamic_checkout':False,'content_display_mode':'tabs'},[section('description',{'heading':'Details'})]),recommend))
write('templates/product.simple.json',template(section('main-product-simple',{'media_size':'large','gallery_layout':'stacked','media_fit':'original','enable_sticky_info':True,'variant_picker_type':'buttons','show_dynamic_checkout':False},[section('accordion_description',{'title':'The details','open_by_default':True})]),recommend))
write('templates/product.compact.json',template(section('main-product-compact',{'gap':24,'padding_top':48,'padding_bottom':48},[section(t) for t in ['title','price','variant_picker','quantity','buy_buttons','description']]),recommend))
for name,kind,settings in [
    ('sidebar','main-collection-classic',{'layout':'two_column_sidebar','show_description':True,'columns_desktop':3,'filters_desktop_mode':'sidebar','enable_quick_view':True,'enable_compare':True}),
    ('editorial','main-collection-simple',{'layout_preset':'editorial_grid','show_description':True,'description_style':'full','columns_desktop':3,'card_style':'none','hover_effects':'none','filter_presentation':'bar','image_ratio':'portrait','button_bg':'#111111'}),
    ('minimal','main-collection-simple',{'layout_preset':'minimal_grid','columns_desktop':4,'card_style':'none','hover_effects':'none','filter_presentation':'drawer','image_ratio':'square','button_bg':'#111111'}),
    ('list','main-collection-simple',{'layout_preset':'cardless_list','card_style':'none','hover_effects':'none','filter_presentation':'bar','button_bg':'#111111'})]:
    write(f'templates/collection.{name}.json',template(section(kind,settings)))
for name,settings in [('editorial',{'page_layout':'full_width','posts_layout':'list','card_radius':0,'card_border_width':0,'articles_per_page':6}),('sidebar',{'page_layout':'sidebar','posts_layout':'grid','auxiliary_content_position':'sidebar','columns_desktop':2,'card_radius':0})]:
    settings.update({'description':'<p>Notes on design, everyday routines and the objects that connect them.</p>','show_author':False})
    write(f'templates/blog.{name}.json',template(section('main-blog-collection',settings,[section('tags',{'heading':'Topics'}),section('recent_posts',{'heading':'From the journal','max_posts':3})])))
for name,settings in [('wide',{'layout_style':'wide','wide_banner_content':False,'content_max_width':820}),('sidebar',{'layout_style':'sidebar','content_max_width':820})]:
    settings.update({'show_author_box':False,'show_related_articles':True,'show_prev_next_navigation':True})
    write(f'templates/article.{name}.json',template(section('main-blog-single',settings,[section('recent_posts',{'heading':'Keep reading','max_posts':3})] if name=='sidebar' else None)))
# Clean up stock snowboard upsells and unconfigured reward promises.
write('templates/cart.json',template(section('main-cart',{'cart_style':'editorial','cart_layout':'wide_summary','line_item_style':'editorial','summary_style':'minimal','quantity_style':'outline','continue_shopping_url':'/collections/all-products','empty_cart_message':'<p>Your next everyday object is waiting. Explore the collection to get started.</p>','show_rewards_progress_bar':False,'rewards_position':'hidden','addons_position':'below_items','section_padding':48},[section('addon_product',{'product':'vector-one','custom_label':'A different way to listen.'}),section('addon_product',{'product':'station-dock','custom_label':'Make room on your desk.'})])))
write('templates/404.json',template(section('main-404',{},[section('404_link',{'label':'Shop all objects','url':'/collections/all-products'}),section('404_link',{'label':'Visit the journal','url':'/blogs/news'}),section('404_link',{'label':'Get support','url':'/pages/contact?view=customer-care'})])))

items=[]
def link(title,description,url,category,image=None,label='Explore'):
    items.append((title,description,url,label,category,image))
link('The complete collection','Everyday objects, brought together.','/collections/all-products','Shop')
for suffix,title,desc in [('', 'Modern product','A detailed story with thumbnails, product information and supporting content.'),('classic','Classic product','A focused gallery with a sticky summary and tabbed details.'),('simple','Image-led product','A stacked gallery that gives the object room to speak.'),('compact','Compact product','The essentials, brought into a concise buying experience.')]:
    link(title,desc,'/products/vector-one'+('?view='+suffix if suffix else ''),'Product presentations')
for suffix,title in [('', 'Story-led collection'),('sidebar','Collection with sidebar'),('editorial','Editorial collection'),('minimal','Minimal collection'),('list','Collection list')]:
    link(title,'Explore the same eyewear collection through a different browsing experience.','/collections/smart-eyewear'+('?view='+suffix if suffix else ''),'Collection presentations')
for suffix,title in [('', 'Journal grid'),('editorial','Journal list'),('sidebar','Journal with topics')]:
    link(title,'Design stories and ideas for the everyday.','/blogs/news'+('?view='+suffix if suffix else ''),'Journal')
for suffix,title in [('', 'Classic article'),('wide','Wide article'),('sidebar','Article with sidebar')]:
    link(title,'Read A quieter workspace in a different editorial layout.','/blogs/news/sample-blog-post'+('?view='+suffix if suffix else ''),'Articles')
for suffix,title,desc in [('about','The studio','Meet the thinking behind ARC//FORM.'),('services','Our services','Help choosing, setting up and caring for your objects.'),('why-choose-us','Our approach','A familiar shape. A considered detail.'),('customer-care','Customer care','Useful support, all in one place.'),('buying-guide','Buying guide','Choose around your day.'),('care-guide','Care guide','Keep the everyday in good shape.'),('contact','Contact','A direct line to the studio.')]:
    link(title,desc,('/pages/about-arc-form?view=' if suffix=='about' else pagebase)+suffix,'Supporting pages')
link('Search','Find products, pages and stories.','/search?q=vector&type=product%2Carticle%2Cpage','Shopping tools')
link('Your bag','A clear summary and useful next steps.','/cart','Shopping tools')
link('Saved objects','Keep your shortlist together.','/pages/wishlist?view=wishlist','Shopping tools')
link('A helpful wrong turn','A 404 page with a way forward.','/ultima-page-not-found','Shopping tools')
link('Ten brand worlds','Discover the original brand presentations.','/pages/features?view=brands','Brand gallery')
write('templates/page.explore.json',template(directory('One theme. Many ways to explore.','Discover complete shopping journeys, useful support and ten distinct brand worlds.',items,eyebrow='QUADRATUM / ULTIMA',popup=True)))

manifest=read('demos/gallery-manifest.json');brand_items=[];provenance=[]
for brand in manifest['brands']:
    name=brand['brand'];slug={'ARC//FORM':'arc-form','Folio & Field':'folio-field','OpenPath Living':'openpath','Northstar':'northstar','Northstar Systems':'northstar','FAIRWAY':'fairway'}.get(name,name.lower().replace(' ','-'))
    raw_index=subprocess.check_output(['git','show',brand['sha']+':templates/index.json'],cwd=ROOT).decode('utf-8')
    image_match=re.search(r'"(?:image|desktop_image|background_image|hero_image)"\s*:\s*"(shopify://shop_images/[^"]+)"',raw_index)
    display_name='FAIRWAY MOTOR CO.' if name=='FAIRWAY' else name
    brand_items.append((display_name,'Explore the original '+display_name+' brand store.',brand['preview_url'],'Visit brand store','Brand world',image_match[1] if image_match else None))
    for kind,paths in brand['template_inventory'].items():
        for path in paths:
            if any(x in path for x in ['section-test','playground','block-library','features','landing']):continue
            raw=subprocess.check_output(['git','show',brand['sha']+':'+path],cwd=ROOT).decode('utf-8-sig')
            dest=f'demos/{slug}/templates/{Path(path).name}'
            write(dest,json.loads(re.sub(r'/\*.*?\*/','',raw,flags=re.S)))
            provenance.append({'brand':name,'sha':brand['sha'],'source':path,'archive':dest})
write('templates/page.brands.json',template(directory('Ten distinct points of view.','From the reading room to the open road, explore the original brand stores that shaped Quadratum.',brand_items,eyebrow='THE QUADRATUM COLLECTION')))

# Add the directory to this draft's theme-local navigation, not shared Shopify menus.
for base in ['','listings/quadratum/']:
    h=read(base+'sections/header-group.json')
    for s in h['sections'].values():
        for b in s.get('blocks',{}).values():
            if b.get('settings',{}).get('label')=='Theme':b['settings'].update({'label':'Explore','url':'/pages/features?view=explore'})
    write(base+'sections/header-group.json',h)
    f=read(base+'sections/footer-group.json')
    for s in f['sections'].values():
        for b in s.get('blocks',{}).values():
            if b['type']=='custom_liquid':b['settings']['custom_liquid']='<nav aria-label="Discover Quadratum" style="display:grid;gap:16px"><a href="/pages/features?view=explore">Explore the store</a><a href="/pages/contact?view=customer-care">Customer care</a><a href="/pages/contact?view=buying-guide">Buying guide</a><a href="/pages/contact?view=care-guide">Care guide</a><a href="/pages/features?view=brands">Ten brand worlds</a><button type="button" data-qtm-popup-open style="min-height:44px;background:transparent;color:inherit;border:1px solid currentColor;padding:10px">Stay in the loop</button></nav>'
    write(base+'sections/footer-group.json',f)
config=read('config/settings_data.json')
popup={'popup_enable':True,'popup_trigger':'manual','popup_frequency':'once_per_session','popup_placement':'center','popup_animation':'fade','popup_image':'shopify://shop_images/station-dock-08-lifestyle.webp','popup_eyebrow':'ARC//FORM / FIELD NOTES','popup_heading':'A quieter kind of inbox.','popup_text':'<p>Design stories, new objects and a closer look at the everyday. Explore this illustrative newsletter invitation.</p>','popup_button_label':'Explore the journal','popup_button_url':'/blogs/news','popup_secondary_label':'Keep exploring','popup_secondary_url':'/collections/all-products','popup_bg':'#f5f5f1','popup_text_color':'#111111','popup_heading_color':'#111111','popup_button_bg':'#111111','popup_button_text':'#ffffff','popup_show_newsletter_form':True,'popup_newsletter_button_label':'Join field notes','popup_width':520,'popup_padding':28,'popup_radius':0,'popup_show_on_mobile':True,'popup_show_on_desktop':True}
config['current'].update(popup);config['presets']['Quadratum'].update(popup);write('config/settings_data.json',config)
write('docs/ultima/store-experience-provenance.json',{'source_templates':provenance,'note':'Historical brand configurations are archived outside the theme upload. All new shared layouts use repaired ULTIMA section code. Existing demo stores and shared content resources are unchanged.'})
print('Built store experiences and archived',len(provenance),'brand template configurations.')
