"""Export the schema-synchronized manual to public, GitHub-rendered documentation."""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/merchant'
(OUT / 'guides').mkdir(parents=True, exist_ok=True)
stage = Path(json.loads((ROOT / 'docs/ultima/submission-stage-quadratum.json').read_text())['output'])
guides = []

def clean(value):
    return html.unescape(re.sub(r'<[^>]+>', '', str(value))).replace('|', '\\|').strip()

def fields(items, level=2):
    lines = []
    for field in items:
        if field['type'] == 'header':
            lines += ['#' * level + ' ' + clean(field['content']), '']
            continue
        if field['type'] == 'paragraph':
            lines += [clean(field['content']), '']
            continue
        lines += ['#' * (level + 1) + ' ' + clean(field.get('label', field.get('id', 'Control'))), '', clean(field.get('how', '')), '']
        if field.get('info'):
            lines += [clean(field['info']), '']
        if 'default' in field:
            lines += ['Default: `' + str(field['default']).replace('`', '') + '`.', '']
        if 'min' in field:
            lines += [f"Range: {field['min']} to {field['max']} {field.get('unit', '')}; step {field.get('step', 1)}.", '']
        if field.get('options'):
            lines += ['Options: ' + ', '.join(clean(o['label']) for o in field['options']) + '.', '']
        if field.get('visible_if'):
            lines += ['Availability condition: `' + field['visible_if'] + '`.', '']
        lines += ['<details><summary>Reference for connected builders</summary>', '', f"Setting: `{field.get('id', '')}`. Type: `{field['type']}`.", '']
        if field.get('options'):
            lines += [', '.join('`' + str(o['value']) + '`' for o in field['options']), '']
        lines += ['</details>', '']
    return lines

for path in sorted((ROOT / 'assets').glob('q-doc-*.json')):
    data = json.loads(path.read_text(encoding='utf-8'))
    if data['kind'] != 'settings' and not (stage / data['file']).exists():
        continue
    guides.append(data)
    lines = ['# ' + data['name'], '', '[All documentation](../README.md) · [Support](../SUPPORT.md)', '', data['category'] + '.', '', '## Add and configure', '']
    lines += [f'{i}. {step}' for i, step in enumerate(data['steps'], 1)] + ['']
    if data.get('available_in'):
        lines += ['Compatible sections: ' + ', '.join(data['available_in']) + '.', '']
    if data.get('enabled_on') or data.get('disabled_on'):
        lines += ['Template availability: `' + json.dumps({k: data[k] for k in ['enabled_on', 'disabled_on'] if k in data}) + '`.', '']
    if data.get('max_blocks'):
        lines += [f"Up to {data['max_blocks']} blocks can be added.", '']
    lines += fields(data.get('settings', []))
    if data.get('blocks'):
        lines += ['## Blocks you can add', '']
        for block in data['blocks']:
            lines += ['### ' + block.get('name', block['type']), '']
            child = ROOT / 'assets' / ('q-doc-block-' + block['type'] + '.json')
            if child.exists():
                lines += ['[Open the block guide](block-' + block['type'] + '.md).', '']
            elif block['type'] == '@app':
                lines += ['Select a compatible installed app. The app provides its settings and service.', '']
            elif block['type'] == '@theme':
                lines += ['Add a compatible theme block; see the block reference in the documentation index.', '']
            lines += fields(block.get('settings', []), 3)
    lines += ['## File reference', '', '`' + data['file'] + '`', '']
    (OUT / 'guides' / (data['slug'] + '.md')).write_text('\n'.join(lines), encoding='utf-8')

setup = (ROOT / 'sections/documentation-hub.liquid').read_text(encoding='utf-8')
setup = re.search(r'<article data-doc-guide id="start">(.*?)</article>', setup, re.S)[1]
setup = setup.replace('{{ routes.root_url }}pages/features?view=customer-care', 'SUPPORT.md')
setup = setup.replace('{{ routes.root_url }}pages/features?view=builder-reference', '#working-with-connected-builders')
setup = setup.replace('The five planned install presets are', 'The five install presets are')
setup = re.sub(r'<details><summary>What the brand previews represent</summary>.*?</details>', '', setup, flags=re.S)
lines = ['# Quadratum documentation', '', 'Learn how to configure your theme, choose templates, and use every section, block, and Theme Settings group included in the merchant package.', '', '[Contact support](SUPPORT.md)', '', '## Getting started', '', setup.strip(), '', '## Working with connected builders', '', 'Start with the relevant component guide below. Its setting reference lists the exact setting IDs and supported option values. Give your assistant the store goal and the smallest set of relevant guides. Review the changes in an unpublished theme before publishing.', '']
for kind, title in [('settings', 'Theme Settings'), ('section', 'Sections'), ('block', 'Blocks')]:
    selected = sorted((d for d in guides if d['kind'] == kind), key=lambda d: d['name'].lower())
    lines += ['## ' + title, '', f'{len(selected)} guides.', '']
    lines += ['- [' + d['name'] + '](guides/' + d['slug'] + '.md)' for d in selected] + ['']
(OUT / 'README.md').write_text('\n'.join(lines), encoding='utf-8')
(OUT / 'SUPPORT.md').write_text('''# Quadratum support

[Open the complete manual](README.md).

## Contact the theme team

Email [dylan@bestwebsitebuildergroup.com](mailto:dylan@bestwebsitebuildergroup.com) for pre-purchase questions, setup help, and reproducible theme errors.

Use the [public Quadratum support form](https://docs.google.com/forms/d/e/1FAIpQLSdVYnnNyXSKScx3Ub8_Yq5X7s0z6OXdlQ6-7acODRUi0iAPHw/viewform). You do not need a Shopify preview password or Google sign-in to submit a request.

TinkerRune responds within two business days. Form responses are used to handle your support request; do not include confidential store or customer data.

## Include the details needed to help

- Your store URL and Quadratum version.
- The affected page, template, section, and block.
- What you expected and what happened.
- The steps needed to reproduce the issue.
- Browser, device, and a screenshot when useful.

Never send passwords, access tokens, payment details, or customer records. Share a collaborator request only after agreeing on the access needed for the issue.

## Support scope

Theme support covers native Quadratum setup, documented controls, and reproducible theme defects. Third-party apps, custom development, and Shopify account, payment, tax, or shipping administration may require the relevant provider.

## Before editing code

Duplicate the theme and work on the unpublished copy. Keep a record of custom changes so they can be reviewed when updating the theme.
''', encoding='utf-8')
print(json.dumps({'guides': len(guides), 'output': str(OUT)}))
