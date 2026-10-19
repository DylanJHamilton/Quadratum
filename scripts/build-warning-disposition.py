"""Record every candidate warning with source evidence and explicit acceptance limits."""
import csv
import hashlib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path, PureWindowsPath

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/ultima'
raw = json.loads((OUT / 'checklist-theme-check-quadratum.json').read_text(encoding='utf-8'))
rows = []
schemas = []
for file in raw:
    path = '/'.join(PureWindowsPath(file['path']).parts[-2:])
    source = (ROOT / path).read_text(encoding='utf-8')
    for warning in file['offenses']:
        kind = warning['check']
        evidence = ''
        if kind == 'ExcessiveSettingsCount':
            schema = json.loads(re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', source, re.S).group(1))
            controls = schema.get('settings', [])
            groups = []
            current = {'heading': 'General', 'controls': 0, 'conditional_controls': 0}
            for control in controls:
                if control['type'] == 'header':
                    if current['controls']:
                        groups.append(current)
                    current = {'heading': control.get('content', ''), 'controls': 0, 'conditional_controls': 0}
                elif control['type'] != 'paragraph':
                    current['controls'] += 1
                    current['conditional_controls'] += bool(control.get('visible_if'))
            if current['controls']:
                groups.append(current)
            schema_evidence = {'path': path, 'name': schema.get('name'), 'settings_count': len(controls), 'input_count': sum(g['controls'] for g in groups), 'header_count': sum(c['type'] == 'header' for c in controls), 'largest_group': max((g['controls'] for g in groups), default=0), 'groups': groups}
            schemas.append(schema_evidence)
            status = 'OPEN — merchant editor acceptance'
            rationale = 'Schema is valid and all controls are documented. A numeric count does not establish usability; header grouping alone does not close this review.'
            action = 'Review add/configure/reorder/reset tasks in Shopify editor; conditionally expose dependent controls and simplify oversized groups without changing saved setting IDs.'
            evidence = f"{schema_evidence['input_count']} inputs; {schema_evidence['header_count']} headers; largest group {schema_evidence['largest_group']} inputs. Full groups: warning-schema-groups-20261019.json."
        elif kind == 'LiquidComplexity' and '/q-icon-bank-' in path:
            status = 'ACCEPT — static icon selection table'
            rationale = 'The score counts static icon case branches. A request renders only the selected SVG, without network access or catalog loops.'
            action = 'Retain readable icon cases; cover icon selection and unknown-icon fallback in regression tests.'
            evidence = 'Source consists of a case selection over fixed SVG paths; shared icon tests remain required.'
        elif kind == 'LiquidComplexity':
            status = 'REVIEWED — regression and runtime evidence required'
            rationale = 'Conditional UI variants raise the score. The score alone does not prove a runtime failure, and the benchmark covers only its configured paths.'
            action = 'Retain behavior for this release where regression evidence passes; record untested configurations in browser acceptance. Extract cohesive rendering branches when changing this component.'
            evidence = 'release-regression-20261019.json; benchmark-release-lh135 reports for configured home/product/collection only.'
        elif kind == 'BlockIdUsage':
            status = 'ACCEPT — comparison of runtime IDs'
            rationale = 'Both operands originate from current Shopify blocks. No literal Shopify-generated ID is embedded. This prevents rendering the selected featured block twice.'
            action = 'Retain dynamic equality checks. Verify featured selection after block reorder.'
            evidence = 'featured-content-collection-spotlight compares block.id with hero.id; product-story stores a current block.id in featured_media_block_id before comparison.'
        elif kind == 'OrphanedSnippet' and path == 'snippets/third-party-licenses.liquid':
            status = 'ACCEPT — distribution license notice'
            rationale = 'This comment-only file intentionally travels in the merchant package without a rendering caller. It retains upstream redistribution notices.'
            action = 'Keep in all candidate packages. Do not render a legal notice on storefront pages merely to satisfy the orphan checker.'
            evidence = 'docs/vendor/icons/provenance.json and docs/vendor/model-viewer/LICENSE; full notices retained verbatim.'
        elif kind == 'RemoteAsset':
            status = 'ACCEPT — optional provider thumbnail'
            rationale = 'Automatic YouTube thumbnail comes from the video provider. Merchant thumbnail override uses Shopify image_url/image_tag; automatic fallback is lazy with explicit dimensions.'
            action = 'Prefer merchant-uploaded thumbnail when available; retain external-video fallback and document the provider request.'
            evidence = 'social-media-youtube-grid.liquid: thumbnail_override precedes i.ytimg.com fallback, with loading=lazy and width/height.'
        else:
            status, rationale, action = 'OPEN', 'Unclassified warning.', 'Review source before acceptance.'
        rows.append({'id': f'WARN-{len(rows)+1:03d}', 'path': path, 'line': warning['start_row'] + 1, 'check': kind, 'message': warning['message'], 'disposition': status, 'rationale': rationale, 'action': action, 'evidence': evidence, 'source_sha256': hashlib.sha256(source.encode()).hexdigest()})

report = {'generated_utc': datetime.now(timezone.utc).isoformat(), 'warning_count': len(rows), 'counts': dict(Counter(r['check'] for r in rows)), 'dispositions': dict(Counter(r['disposition'] for r in rows)), 'gates_closed_by_this_report': [], 'warnings': rows}
(OUT / 'warning-disposition-20261019.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
(OUT / 'warning-schema-groups-20261019.json').write_text(json.dumps(sorted(schemas, key=lambda r: -r['largest_group']), indent=2) + '\n', encoding='utf-8')
with (OUT / 'warning-disposition-20261019.csv').open('w', newline='', encoding='utf-8-sig') as handle:
    writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)
print(json.dumps({'warnings': len(rows), 'dispositions': report['dispositions'], 'largest_editor_groups': [{k: r[k] for k in ['path', 'largest_group', 'input_count']} for r in sorted(schemas, key=lambda r: -r['largest_group'])[:12]]}, indent=2))
