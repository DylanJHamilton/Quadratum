"""Build an evidence-backed checkpoint without implying unverified gates passed."""
import csv
import hashlib
import html
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/ultima'
def read(name):
    return json.loads((OUT / name).read_text(encoding='utf-8'))
def write(name, data):
    (OUT / name).write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8', newline='\n')
def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT).decode().strip()

benchmark = read('benchmark-release-lh135/summary.json')
assert benchmark['complete_matrix'] and benchmark['thresholds_met'] and len(benchmark['runs']) == 18
regression = read('release-regression-20261019.json')
assert len(regression) == 40 and all(r['passed'] for r in regression)
setup = read('benchmark-setup.json')
setup['scores'] = benchmark['averages']
setup['evidence'] = 'benchmark-release-lh135/summary.json'
setup['lighthouse_version'] = '13.5.0'
setup['measurement_limits'] = ['Measured configured home/product/collection only.', 'Product accessibility 97 includes a Shopify-owned accelerated-payment contrast finding.', 'Earlier Lighthouse 12.8.2 runs are superseded; the incomplete benchmark-release matrix is not a pass.']
write('benchmark-setup.json', setup)

def rendering_source(path):
    text = path.read_text(encoding='utf-8-sig').replace('\r\n', '\n')
    return re.sub(r'{%\s*schema\s*%}.*?{%\s*endschema\s*%}', '', text, flags=re.S) if path.suffix == '.liquid' else text

differences = []
candidate = Path(read('submission-stage-quadratum.json')['output'])
for row in setup['runtime_parity']:
    relative = row['path']
    original, current = Path(setup['target']) / relative, candidate / relative
    if original.is_file() and current.is_file() and rendering_source(original) != rendering_source(current):
        differences.append(relative)
assert not differences, ('Benchmark rendering code changed after measurement', differences)
parity = {'checked_files': len(setup['runtime_parity']), 'current_candidate': str(candidate), 'rendering_differences': differences, 'normalization': 'Compare generated merchant candidate to measured merchant installation, not the source showroom. UTF-8 line endings and Liquid schema excluded for rendering comparison only. Schema changes are separately Theme Checked and editor tested.', 'extra_nonrendered_file': 'snippets/third-party-licenses.liquid'}
write('benchmark-runtime-parity-20261019.json', parity)

gates = [
    {'id': 'GATE-01', 'title': 'Benchmark performance and accessibility', 'state': 'PASS', 'done': 'Official 2,000-product / 20,000-variant dataset, 20 collections, images and three articles installed on the dedicated free benchmark. All 18 Lighthouse 13.5.0 runs valid on first attempt.', 'remaining': 'Retest affected pages if rendering code or benchmark content changes. These measurements do not certify other presets or all configurations.'},
    {'id': 'GATE-02', 'title': 'Five preset demos and installation parity', 'state': 'OPEN', 'done': 'Five independent free client-transfer stores created. Five unpublished candidates uploaded successfully, each with the shared ULTIMA runtime.', 'remaining': 'Catalog export/import approval is pending. Then import each matching brand catalog, configure collections, pages, blogs, menus and media, activate test gateways, and check preset/template parity and public demo access. Empty installations are not finished demo stores.'},
    {'id': 'GATE-03', 'title': 'Real Shopify services and browser acceptance', 'state': 'PARTIAL', 'done': '40 regression suites pass. Live selected-variant add-to-cart, quantity change, cart total and native checkout handoff verified. Free Test Payment Gateway active on benchmark. Hero, CTA, comparison and feature-panel checks recorded separately.', 'remaining': 'Explicit simulated-order permission is pending. Decline/success outcomes, service-dependent fixtures (gift cards, pickup, selling plans, high-variant catalog, app blocks, localization/media) and other supported browser engines still require acceptance evidence. Chromium alone is not cross-browser certification.'},
    {'id': 'GATE-04', 'title': 'Public documentation and support', 'state': 'PARTIAL', 'done': '266 merchant guides publicly available on GitHub without login, covering sections, blocks and all 225 theme settings. Documentation metadata points to that manual. Support email is dylan@bestwebsitebuildergroup.com.', 'remaining': 'Approval to create the public support form and send a labeled delivery test is pending. Configure verified form URL in metadata and demonstrate receipt. Owner must confirm the two-business-day response commitment.'},
    {'id': 'GATE-05', 'title': 'Rights, originality and listing approval', 'state': 'OWNER REVIEW', 'done': 'Open-source icon and model-viewer notices included in the distributable package; upstream license source hashes recorded. Historical branches and shared-runtime strategy remain documented.', 'remaining': 'Owner confirmation of original code/asset redistribution rights, exclusive Theme Store distribution, naming/listing facts and support ownership is pending. The repository is public and package.json declares ISC; reconcile distribution policy before launch. If the source repository becomes private, move the public manual to an independent public destination first. Declared icon versions do not prove the exact historical source of every icon or image.'},
    {'id': 'GATE-06', 'title': 'Merchant editor usability and warning review', 'state': 'PARTIAL', 'done': 'Every remaining candidate warning has a path, line, hash and disposition. Five large panels have 233 native conditional controls and clearer groups. CTA insertion contrast and disabled comparison presets corrected. No lint checks suppressed.', 'remaining': '117 high-control schemas retain an explicit merchant acceptance queue. Representative live checks improve confidence but do not prove every configuration. Finish the remaining preset walkthroughs and record accepted warning dispositions against their actual use.'},
]
fixes = [
    ('VRF-001','P1','Nested theme-block settings were discarded by portability sanitizer','scripts/submission_portability.py; scripts/prepare-benchmark.py','Resolve full global definition when a parent only declares a block type.','tests/ultima/portability-nested-blocks.py'),
    ('VRF-002','P1','Collection pagination and filter semantics failed accessibility checks','sections/main-collection-classic.liquid','Remove invalid list roles, retain visible filter names, use product H2 headings.','tests/phase4/collection-hosts.cjs; benchmark-release-lh135'),
    ('VRF-003','P1','Accessible link names hid visible titles, badges or counts','snippets/product-card.liquid; snippets/collection-card.liquid; sections/header-two.liquid; sections/call-to-action-collection.liquid; sections/social-media-ugc-hashtag-gallery.liquid; sections/social-media-youtube-grid.liquid','Retain visible accessible names; move supplementary context to descriptions.','tests/phase4/social-galleries.cjs; benchmark-release-lh135'),
    ('VRF-004','P1','Muted/compare-price text and split CTA colors had insufficient contrast','config/settings_data.json; snippets/product-card.liquid; snippets/collection-card.liquid; sections/main-collection-classic.liquid; sections/call-to-action-split-content.liquid','Use readable defaults/opacity and existing contrast helper for split surfaces.','benchmark-release-lh135; release-regression-20261019.json'),
    ('VRF-005','P2','Collection spotlight bento cards could clip the CTA','sections/featured-content-collection-spotlight.liquid','Use column flex layout and reserve CTA space without forcing image overlap.','tests/phase4/collection-spotlight.cjs'),
    ('VRF-006','P2','Image/icon fallback accessibility and footer link distinction','blocks/content-image-hotspots.liquid; blocks/content-icon-list.liquid; sections/call-to-action-newsletter-form.liquid; sections/footer-five.liquid','Use meaningful or decorative alt defaults, descriptions and visible link underlines.','release-regression-20261019.json'),
    ('VRF-007','P2','Five oversized editor panels showed irrelevant controls','blocks/content-comparison-matrix.liquid; blocks/product-comparison-table.liquid; blocks/content-feature-showcase.liquid; sections/call-to-action-banner.liquid; sections/featured-product-hero-banner.liquid','Add logical headers and 233 native visible_if expressions while preserving setting IDs.','tests/ultima/editor-conditions.py; editor-live-acceptance-20261019.json'),
    ('VRF-008','P1','CTA banner insertion colors failed text contrast','sections/call-to-action-banner.liquid','Correct solid/newsletter/outline defaults and hover/preset colors. No saved merchant colors rewritten.','tests/ultima/cta-preset-contrast.py'),
    ('VRF-009','P2','Comparison presets inserted with all rows and columns disabled','blocks/content-comparison-matrix.liquid','Explicitly enable populated preset columns and rows while keeping schema defaults.','tests/ultima/editor-conditions.py'),
    ('VRF-010','P2','Required third-party notices were outside the merchant package','snippets/third-party-licenses.liquid; docs/vendor/icons/provenance.json','Ship upstream Lucide/Feather, Tabler and model-viewer notices in a non-rendered comment.','Candidate file inventory and upstream hashes'),
    ('VRF-011','P2','Benchmark setup filled optional video fields with navigation URLs','scripts/prepare-benchmark.py','Skip absent optional URLs and video/embed/provider/action fields.','Shopify editor video field verified blank; benchmark-release-lh135'),
    ('VRF-012','P2','Unused legacy candidate files and shadowed Liquid names obscured review','scripts/build-submission-candidate.py; scripts/fix-liquid-warning-hygiene.py','Exclude 30 proven unused snippets; remove unused assignments and disambiguate locals.','Theme Check zero errors; warning-hygiene-changes.json; 40 regression suites'),
]
registry = [dict(zip(['id','severity','problem','paths','change','evidence'], row), status='FIXED ON ULTIMA WORKING TREE; MAIN UNCHANGED') for row in fixes]
write('release-fixes-20261019.json', registry)
with (OUT/'release-fixes-20261019.csv').open('w', encoding='utf-8-sig', newline='') as handle:
    writer = csv.DictWriter(handle, fieldnames=list(registry[0])); writer.writeheader(); writer.writerows(registry)

old = read('submission-readiness-20261018.json')
report = dict(old, date='2026-10-19', generated_utc=datetime.now(timezone.utc).isoformat(), submission_ready=False, status='BENCHMARK PASSED; FIVE RELEASE GATES STILL OPEN OR PARTIAL', branch=git('branch','--show-current'), runtime_commit=git('rev-parse','HEAD'), includes_uncommitted_changes=True, gates=gates, benchmark=benchmark['averages'], benchmark_parity=parity, regression_summary={'suites':len(regression),'passed':sum(r['passed'] for r in regression)}, current_fix_registry='release-fixes-20261019.json', warning_registry='warning-disposition-20261019.json', independent_stores='preset-demo-stores.json')
report['checks'] = read('checklist-package-results-20261018.json')
report['suites'] = regression
for row in report['matrix']:
    area = str(row['area'])
    if area == '6': row.update(status='PASS', evidence='18 Lighthouse 13.5.0 runs; mobile 92.33/99 and desktop 99.33/99 performance/accessibility averages. benchmark-release-lh135/summary.json.')
    elif area == '21': row.update(status='PARTIAL', evidence='266 public guides verified; contact form and delivery verification pending.')
    elif area == '8': row.update(status='PARTIAL', evidence='40 regression suites and live variant/cart/checkout handoff pass; native provider and browser coverage remains incomplete.')
    elif area == '14': row.update(status='PARTIAL', evidence='Zero candidate schema errors; 233 native conditional controls validated; remaining large-panel acceptance queue explicit.')
    elif area == '20': row.update(status='PARTIAL', evidence='Five independent free stores and unpublished theme installations exist; matching catalogs and completed public demos remain pending.')
    elif area in {'12','17'}: row.update(status='PARTIAL', evidence='Configured benchmark pages pass performance/accessibility thresholds; other configurations, manual assistive-technology and device coverage remain open.')
report['next_actions'] = [g['id'] + ': ' + g['remaining'] for g in gates if g['state'] != 'PASS']
write('submission-readiness-20261019.json', report)

esc = html.escape
cards=''.join(f'<article class="gate"><p class="status {"pass" if g["state"]=="PASS" else "open"}">{esc(g["id"])} · {esc(g["state"])}</p><h2>{esc(g["title"])}</h2><p>{esc(g["done"])}</p><h3>Remaining</h3><p>{esc(g["remaining"])}</p></article>' for g in gates)
rows=''.join(f'<tr><td>{esc(r["id"])}</td><td>{esc(r["severity"])}</td><td>{esc(r["problem"])}</td><td>{esc(r["change"])}</td></tr>' for r in registry)
matrix=''.join(f'<tr><td>{esc(str(r["area"]))}. {esc(r["title"])}</td><td>{esc(r["status"])}</td><td>{esc(r["evidence"])}</td></tr>' for r in report['matrix'])
page=f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Quadratum — submission checkpoint, October 19</title><style>body{{font:16px/1.6 system-ui,sans-serif;background:#f4f4f1;color:#171717;margin:0}}main{{max-width:1180px;margin:auto;padding:56px 28px}}h1{{font-size:clamp(30px,5vw,58px);line-height:1.08;margin:14px 0}}h2{{font-size:23px;line-height:1.25}}h3{{font-size:15px}}.eyebrow{{letter-spacing:.14em;font-size:12px;text-transform:uppercase}}.lede{{font-size:20px;max-width:850px}}.metrics,.gates{{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:32px 0}}.metric,.gate{{background:white;border:1px solid #d9d9d3;padding:24px}}.metric strong{{display:block;font-size:40px;line-height:1.2}}.gates{{grid-template-columns:repeat(2,1fr)}}.status{{font-size:12px;font-weight:750;letter-spacing:.04em}}.pass{{color:#146431}}.open{{color:#8a4508}}a{{color:#145a78;text-underline-offset:3px}}table{{border-collapse:collapse;width:100%;background:white;font-size:14px}}th,td{{text-align:left;vertical-align:top;border-bottom:1px solid #ddd;padding:14px}}th{{background:#e8e8e2}}.table{{overflow:auto}}.note{{border-left:4px solid #8a4508;padding:12px 20px;background:#fff7eb}}footer{{margin-top:40px;font-size:13px;color:#555}}@media(max-width:720px){{.metrics,.gates{{grid-template-columns:1fr}}main{{padding:28px 18px}}}}</style><main><div class="eyebrow">TinkerRune / PROJECT ULTIMA / October 19, 2026</div><h1>Submission checkpoint</h1><p class="lede">The benchmark is complete and passing. Five release gates still contain work or owner decisions. This is an engineering checkpoint, not a submission approval.</p><div class="metrics"><div class="metric"><strong>92.33 / 99.33</strong>Mobile / desktop performance<br>Required: 60</div><div class="metric"><strong>99 / 99</strong>Mobile / desktop accessibility<br>Required: 90</div><div class="metric"><strong>40 / 40</strong>Regression suites passing<br>18 valid Lighthouse runs</div></div><p class="note"><strong>Pending owner responses:</strong> catalog migration permission, public support form and delivery-test permission, simulated test-order permission, and rights/exclusivity/support commitments. No costs, main merge, theme publication or final submission have been authorized by this report.</p><h2>Six release gates</h2><section class="gates">{cards}</section><h2>Evidence and deliverables</h2><ul><li><a href="benchmark-release-lh135/summary.json">Complete benchmark scores</a> · <a href="benchmark-runtime-parity-20261019.json">Runtime parity</a></li><li><a href="release-regression-20261019.json">40 regression results and limits</a></li><li><a href="warning-disposition-20261019.csv">Every remaining warning</a> · <a href="warning-schema-groups-20261019.json">Editor acceptance queue</a></li><li><a href="preset-demo-stores.json">Five independent demo installations</a></li><li><a href="https://github.com/DylanJHamilton/Quadratum/blob/ultima/part-1/docs/merchant/README.md">Public merchant manual — 266 guides</a></li><li><a href="reconciliation.json">Original 37-entry reconciliation</a> · <a href="release-fixes-20261019.csv">Current fix registry CSV</a></li></ul><h2>Corrections in this pass</h2><div class="table"><table><thead><tr><th>ID</th><th>Priority</th><th>Observed defect</th><th>Minimal correction</th></tr></thead><tbody>{rows}</tbody></table></div><h2>Launch compliance matrix</h2><div class="table"><table><thead><tr><th>Shopify area</th><th>Status</th><th>Evidence / limit</th></tr></thead><tbody>{matrix}</tbody></table></div><h2>Release strategy</h2><p>Keep shared engineering on <code>ultima/part-1</code>. Five merchant presets share one runtime and retain their listing-specific content. The ten-brand showroom is a separate marketing deployment. After the open gates close, freeze one commit, regenerate the parent package with five listings, record the ZIP hash, and obtain owner approval before submission or main merge.</p><footer>Snapshot generated {esc(report['generated_utc'])}. Base HEAD {esc(report['runtime_commit'])}; includes working-tree corrections identified in the linked registries. Main remains {esc(str(report['main_verified_remote']))}. <a href="https://shopify.dev/docs/storefronts/themes/store/requirements">Official Shopify Theme Store requirements</a>.</footer></main></html>'''
(OUT/'submission-readiness-20261019.html').write_text(page, encoding='utf-8', newline='\n')
print(json.dumps({'passed_gates':1,'remaining_gates':5,'regression_suites':40,'benchmark':benchmark['averages'],'runtime_parity_files':parity['checked_files']}))
