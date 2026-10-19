"""One-time/idempotent schema migration for checklist defects found in October 2026."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
mapping = {
    'bundle_metaobject': ('bundle_reference', 'Bundle reference', 'bundle'),
    'metaobject_reference': ('entry_reference', 'Entry reference', 'story'),
    'timeline_metaobject_list': ('timeline_reference', 'Timeline reference', 'timeline'),
}
for path in ROOT.glob('sections/*.liquid'):
    source = path.read_text(encoding='utf-8-sig')
    m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', source, re.S)
    if not m: continue
    schema = json.loads(m[1])
    changed = False
    def migrate(node):
        global changed
        settings = []
        for setting in node.get('settings', []):
            if setting['type'] in ['metaobject', 'metaobject_list'] and not setting.get('metaobject_type', '').startswith('shopify--'):
                prefix, label, key = mapping[setting['id']]
                settings.extend([
                    {'type':'text','id':prefix+'_namespace','label':label+' metafield namespace','default':'custom'},
                    {'type':'text','id':prefix+'_key','label':label+' metafield key','default':key,
                     'info':'Optional product metafield containing a metaobject reference'+(' list.' if setting['type']=='metaobject_list' else '.')+' Manual content works without a metafield.'},
                ])
                changed = True
            else:
                if setting['type'] == 'link_list' and path.stem.startswith(('header-', 'footer-')) and setting['id'] != 'customer_account_menu':
                    expected = 'footer' if path.stem.startswith('footer-') else 'main-menu'
                    if setting.get('default') != expected: setting['default'] = expected; changed = True
                settings.append(setting)
        if 'settings' in node: node['settings'] = settings
        for block in node.get('blocks', []): migrate(block)
    migrate(schema)
    if changed:
        source = source[:m.start(1)] + '\n' + json.dumps(schema, ensure_ascii=False, indent=2) + '\n' + source[m.end(1):]
        path.write_text(source, encoding='utf-8')

runtime = {
    'sections/product-bundles.liquid': ('  assign meta_bundle = s.bundle_metaobject', '  assign meta_bundle = s.bundle_metaobject\n  assign bundle_reference = product.metafields[s.bundle_reference_namespace][s.bundle_reference_key]\n  if bundle_reference.type == \'metaobject_reference\'\n    assign meta_bundle = bundle_reference.value\n  endif'),
    'sections/product-story.liquid': ('    assign meta_story = s.metaobject_reference', '    assign meta_story = s.metaobject_reference\n    assign story_reference = q_product.metafields[s.entry_reference_namespace][s.entry_reference_key]\n    if story_reference.type == \'metaobject_reference\'\n      assign meta_story = story_reference.value\n    endif\n    assign timeline_reference = q_product.metafields[s.timeline_reference_namespace][s.timeline_reference_key]'),
    'snippets/product-meta-panel-content.liquid': ('      assign entry = b.metaobject_reference', '      assign entry = b.metaobject_reference\n      assign entry_reference = product.metafields[b.entry_reference_namespace][b.entry_reference_key]\n      if entry_reference.type == \'metaobject_reference\'\n        assign entry = entry_reference.value\n      endif'),
}
for name, (before, after) in runtime.items():
    path = ROOT/name
    text = path.read_text(encoding='utf-8')
    if after not in text:
        assert before in text, name
        path.write_text(text.replace(before, after, 1), encoding='utf-8')
path = ROOT/'sections/product-story.liquid'
text = path.read_text(encoding='utf-8')
before = "      assign timeline_items = s.timeline_metaobject_list\n    endif"
after = before + "\n    if s.show_timeline and s.timeline_source == 'metaobject_list' and timeline_reference.type == 'list.metaobject_reference'\n      assign timeline_items = timeline_reference.value\n    endif"
if after not in text:
    assert before in text
    path.write_text(text.replace(before, after, 1), encoding='utf-8')

path = ROOT/'locales/en.default.json'
data = json.loads(path.read_text(encoding='utf-8'))
data.setdefault('search', {})['filters'] = {'heading':'Filter products','minimum':'Minimum price','maximum':'Maximum price','sort':'Sort by','apply':'Apply filters','clear':'Clear filters'}
path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
