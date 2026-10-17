"""QA-only alternate templates. Generated outside the release theme."""
import json,subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
subprocess.run([sys.executable,str(root/'scripts/prepare-qa-preset.py'),'Quadratum'],check=True)
out=root/'.cache/ultima-preset/quadratum/templates'
image='shopify://shop_images/arc-home-hero-desktop.webp'
copy='Detailed product information must remain readable on a narrow phone screen. '*12
def section(kind,settings=None,blocks=None):
 d={'type':kind,'settings':settings or {}}
 if blocks:
  d['blocks']={f'b{i}':b for i,b in enumerate(blocks)};d['block_order']=list(d['blocks'])
 return d
layout={
 'splitfirst':section('split-content-dynamic',{'image':image,'mobile_presentation':'stack','mobile_image_first':True,'heading':'ULT001 image first','subheading':copy}),
 'splitlast':section('split-content-dynamic',{'image':image,'mobile_presentation':'stack','mobile_image_first':False,'heading':'ULT001 image last','subheading':copy}),
 'splitbanner':section('split-banner',{'image':image,'heading':'ULT011 long content','subheading':copy,'mobile_presentation':'stack','container_mode':'full'}),
 'classic':section('hero-banner',{'heading':'ULT031 classic full width'}),
 'boxed':section('boxed-content-banner',{'heading':'ULT032 panel full width','layout_variant':'panel'})}
for transition in ['slide','fade']:
 for mode in ['hero','split']:
  layout[transition+mode]=section('slideshow-banner',{'transition':transition,'layout_mode':mode,'autoplay':False},[{'type':'slide','settings':{'background_image':image,'heading':f'ULT022 029 {transition} {mode}','subheading':copy}}])
controls={
 'team':section('interactive-content-helper-team-members-grid',{'title':'ULT034 independent heading','name_color':'#ffffff','bio_color':'#ffffff','heading_color':'#112233','subheading_color':'#334455'}),
 'products':section('feeds-product-grid',{'show_header':True,'heading':'ULT033 product heading','layout_mode':'carousel','carousel_nav':True,'source_mode':'manual_products','manual_products':['vector-one','vector-air','vector-studio']}),
 'collections':section('feeds-collection-grid',{'show_header':True,'heading':'ULT033 collection heading','manual_collections':['smart-eyewear']}),
 'transparent':section('transparent-hero-banner',{'mode':'slideshow','enable_header_overlap':False,'autoplay':True,'nav_dots':True},[{'type':'slide','settings':{'image':image,'heading':'ULT030 controls','content_position':'bottom-center','subheading':copy[:300]}},{'type':'slide','settings':{'image':image,'heading':'ULT030 second slide'}}])}
controls['team']['blocks']={'person':{'type':'person','settings':{'name':'QA person','bio':'<p>QA biography</p>'}}}
controls['team']['block_order']=['person']
features={
 'spotlightmanual':section('featured-content-product-spotlight-row',{'heading':'ULT026 manual products','source_mode':'manual','products':['vector-one']}),
 'spotlightcollection':section('featured-content-product-spotlight-row',{'heading':'ULT026 collection products','source_mode':'collection','collection':'smart-eyewear'}),
 'stats':section('interactive-content-helper-stats-strip',{'title':'ULT024 colors','text_color':'#112233','muted_text_color':'#334455'},[{'type':'stat','settings':{'value':'42','label':'Independent label'}}]),
 'portfolio':section('interactive-content-helper-portfolio-grid',{'title':'ULT025 portfolio controls','section_background':'#eeeeee','heading_color':'#112233','subheading_color':'#334455'},[{'type':'project','settings':{'title':'QA project','image':image}}]),
 'collectioncta':section('call-to-action-collection',{'heading':'ULT012 collection cards'},[{'type':'collection_card','settings':{'collection':'smart-eyewear','custom_image':image}}]),
 'icons':section('call-to-action-icon-list',{'heading':'ULT014 component headings'},[{'type':'icon','settings':{'icon_filename':'heart','title':'Compact benefit','caption':'Readable supporting copy'}}])}
features['collectioncta']['settings']['image_source']='first_product'
features['collectionoverlay']=section('call-to-action-collection',{'heading':'ULT012 overlay contrast','layout':'grid_overlay','image_source':'first_product'},[{'type':'collection_card','settings':{'collection':'smart-eyewear','custom_image':image}}])
features['outline']=section('multipurpose-hero-banner',{},[{'type':'slide','settings':{'content_bg_style':'panel','content_bg_color':'#ffffff','heading':'ULT023 light panel','heading_color':'#111111','cta2_text':'Outline action','cta2_link':'/collections/all','cta2_variant':'outline'}}])
product={'main':section('main-product-classic',{'enable_lightbox':True},[{'type':'description','settings':{}}]),'recommendations':section('product-recommend')}
(out/'product.ultima-qa-classic.json').write_text(json.dumps({'sections':product,'order':list(product)},indent=2),encoding='utf-8')
for kind in ['sub-banner-modern','sub-banner-split','sub-banner-breadcrumb']:
 controls[kind.replace('-','')]=section(kind,{},[{'type':'button','settings':{'label':'Explore products','link':'/collections/all','aria_label':'Learn more'}}])
for name,sections in [('layout',layout),('controls',controls),('features',features)]:
 (out/f'page.ultima-qa-{name}.json').write_text(json.dumps({'sections':sections,'order':list(sections)},indent=2),encoding='utf-8')
print('Generated three QA-only templates')
