"""Build review-only gallery and release matrix from the reconciled source inventory."""
import json, subprocess, html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((ROOT/p).read_text(encoding='utf-8-sig'))
write=lambda p,d:(ROOT/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
esc=html.escape
inventory=read('docs/ultima/reconciliation.json')['demo_branch_inventory']
ids=[146261999700,146433015892,146360795220,146519392340,146547245140,146554191956,146556223572,146584109140,146590105684,146590367828]
presets=['Quadratum',None,'Morrow',None,'Northstar',None,None,None,'Vantier','Kinvar']
brands=[]
for b,theme,preset in zip(inventory,ids,presets):
 files=subprocess.check_output(['git','ls-tree','-r','--name-only',b['sha'],'templates'],cwd=ROOT,text=True).splitlines()
 kinds={k:[f for f in files if Path(f).name.startswith(k+'.')] for k in ['page','collection','product','blog','article']}
 brands.append({**b,'theme_id':theme,'preset':preset,'template_inventory':kinds,'preview_url':f'https://quadratum-theme.myshopify.com/?preview_theme_id={theme}','preview_status':'Historical demo; not updated to ULTIMA; store access may be required'})
write('demos/gallery-manifest.json',{'date':'2026-10-17','brands':brands})
style='''<style>*{box-sizing:border-box}body{margin:0;background:#11151c;color:#edf0f5;font:16px/1.6 system-ui}main{max-width:1200px;margin:auto;padding:48px 24px}h1{font-size:clamp(32px,6vw,64px);line-height:1.1}h2{line-height:1.2}a{color:#a9d4ff}a:focus,button:focus{outline:3px solid #f1ba67;outline-offset:4px}.muted{color:#b3bdcc}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px}.card{background:#1d2430;border:1px solid #3c485b;border-radius:16px;padding:24px;overflow-wrap:anywhere}.tag{color:#f1ba67;font-size:13px;text-transform:uppercase;letter-spacing:1px}details{margin:12px 0}summary{cursor:pointer}ul{padding-left:22px}table{border-collapse:collapse;width:100%;font-size:14px}td,th{border-bottom:1px solid #3c485b;text-align:left;padding:14px;vertical-align:top}.table{overflow-x:auto}nav{display:flex;gap:20px;flex-wrap:wrap}code{overflow-wrap:anywhere}li{margin-bottom:6px}</style>'''
def doc(title,body):return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title>'+style+'<main>'+body+'</main></html>'
cards=[]
for b in brands:
 sections=''
 for k,files in b['template_inventory'].items():
  links=''.join(f'<li><a href="https://github.com/DylanJHamilton/Quadratum/blob/{b["sha"]}/{esc(f)}">{esc(Path(f).name)}</a></li>' for f in files)
  sections+=f'<details><summary>{k.title()} templates · {len(files)}</summary><ul>{links}</ul></details>'
 cards.append(f'<article class="card"><span class="tag">{esc(b["preset"]+" preset" if b["preset"] else "Gallery brand")}</span><h2>{esc(b["brand"])}</h2><p><a href="{b["preview_url"]}">Open historical demo ↗</a></p><p class="muted">{esc(b["preview_status"])}</p>{sections}<small>Source: <code>{b["sha"][:12]}</code></small></article>')
body='<p class="tag">Quadratum / ULTIMA</p><h1>Ten brands.<br>One shared theme.</h1><p>Five install presets. Ten design references. Explore each brand and its page, collection, product, blog and article template source.</p><nav><a href="https://quadratum-theme.myshopify.com/?preview_theme_id=146655674452">Current unpublished ULTIMA QA ↗</a><a href="../docs/ultima/release-readiness.html">Release readiness</a></nav><p class="muted">These demo themes retain their original code. Source inventories are pinned to audited commits; installed demos can be newer. This gallery is outside the submission package.</p><section class="grid">'+''.join(cards)+'</section>'
(ROOT/'demos/gallery.html').write_text(doc('ULTIMA brand and template gallery',body),encoding='utf-8')
rows=[
('01','Exclusivity','Owner evidence needed','Confirm distribution and ownership before submission.'),
('02','Uniqueness','Review pending','Document original architecture and distinguish the five designs; 37 bug fixes do not prove originality.'),
('03','Design / UX','Partial','Homepage geometry checked at 390 and 1280; full content, contrast and empty-state review remains.'),
('04','Features','Partial','Existing commerce suites provide baseline. Complete account, localization, selling-plan, media, quantity and cart acceptance on the release fixture.'),
('05','Templates / sections','Partial','Header/footer groups implemented. page.playground.liquid remains an engineering-only template; exclude or migrate before packaging. Confirm custom Liquid and app-block support on every applicable host.'),
('06','Lighthouse','Open gate','No release benchmark scores recorded. Run home/product/collection mobile and desktop on the official fixture; target performance ≥60 and accessibility ≥90.'),
('07','Pages','Partial','Product, collection, contact and article smoke evidence exists. Complete cart, search, password, 404 and customer flows; do not treat basic rendering as interaction coverage.'),
('08','Consistency','Partial','Regression suites pass at recorded baseline. Retest section add/remove/reorder and all five fresh preset installs after packaging.'),
('09','Browsers','Open gate','Chrome evidence only. Safari/iOS, Firefox, Edge and Android coverage remains.'),
('10','Assets','Owner evidence needed','Audit image/font/icon licenses and rights; remove development-only assets from final package.'),
('11','SEO','Review pending','Check rendered titles, canonical URLs, structured data and image alt text across each template; no full semantic sign-off yet.'),
('12','Accessibility','Partial','Skip link added. Existing lightbox/menu checks retained. Full keyboard, screen reader, focus, reduced-motion and contrast audit remains.'),
('13','Social','Review pending','Inspect sharing metadata and ensure fresh-install social defaults do not point to demo brands.'),
('14','Settings','Partial','Duplicate schema-ID guard and range validation pass. 117 excessive-setting warnings require merchant editor simplification decisions.'),
('15','Typography','Review pending','Confirm font-picker choices and rendered bold/italic combinations across presets.'),
('16','Colors','Review pending','Verify editable foreground/background choices and accessible combinations for every preset.'),
('17','Images','Partial','Local responsive geometry checks exist. Audit source sizes, lazy loading, eager hero loading and broken/empty media on the final fixture.'),
('18','Names / presets','Partial','Five named presets retained; parent preset Quadratum exists. Header/footer labels improved. Broader labels and install/demo parity still need review.'),
('19','Release metadata','Open gate','Set final version, merchant release notes and immutable release SHA after the remaining gates pass.'),
('20','Demos','Open gate','Historical ten-brand gallery created. Dedicated preset demonstrations, catalog isolation, test checkout and install parity remain; shared mixed catalog is not certified.'),
('21','Documentation','Open gate','Provide public merchant documentation and a support contact form; engineering GitHub links alone are insufficient.'),
('22','Support','Owner evidence needed','Assign support ownership, response coverage and update process before submission.')]
write('docs/ultima/compliance-matrix.json',{'date':'2026-10-17','submission_ready':False,'source':'https://shopify.dev/docs/storefronts/themes/store/requirements','rows':[dict(zip(['id','area','status','evidence_and_next_action'],r)) for r in rows]})
body='''<p class="tag">ULTIMA / Release review · 17 October 2026</p><h1>Release readiness</h1><p><strong>Not submission-ready.</strong> Original bug reconciliation and targeted Shopify checks are retained. This matrix tracks the additional launch gates without claiming full certification.</p><nav><a href="reconciliation.html">37-entry registry</a><a href="../../demos/gallery.html">Ten-brand gallery</a><a href="https://shopify.dev/docs/storefronts/themes/store/requirements">Official requirements</a><a href="https://shopify.dev/docs/storefronts/themes/store/success/updates">Official updates</a></nav><h2>Completed in this pass</h2><ul><li>Native header/footer section groups and descriptive editor labels, preserving selected settings.</li><li>Keyboard skip link; duplicate column-builder setting removed.</li><li>Upload checks now reject per-file errors even when Shopify exits successfully.</li><li>Kinvar homepage and global settings recovered from its newer installed demo; demo untouched.</li><li>Five-preset homepage checks recorded separately from deeper commerce coverage.</li></ul><h2>Next release sequence</h2><ol><li>Engineering: clean package, template migration/exclusions, settings and asset warning triage.</li><li>Engineering + design: fresh install parity for five presets, all template interactions, accessibility and browser matrix.</li><li>Engineering: measured performance benchmark and fixes; attach raw reports to release SHA.</li><li>Owner + content: dedicated preset demo destinations, rights evidence, public docs/support and final branding.</li><li>Owner: approve release candidate and merge/publishing separately. No main merge or publishing performed here.</li></ol><h2>Branch and package strategy</h2><p>Keep shared runtime on ultima/part-1 until review. Store exactly five preset install configurations under listings. Keep ten-brand gallery, source snapshots and engineering fixtures outside the theme ZIP. Pin each demo manifest to a runtime release SHA and content revision. Apply runtime updates to demo drafts only after approval; do not merge whole demo branches into main. Assemble a clean release candidate, compare its manifest, then merge by reviewed PR.</p><h2>Coverage by official requirement area</h2><p class="muted">Categories reference the official requirements. Status and evidence below are project findings, not Shopify approval. Partial means evidence exists but the category is not closed.</p><div class="table"><table><thead><tr><th>ID</th><th>Area</th><th>Status</th><th>Evidence / next action</th></tr></thead><tbody>'''
body+=''.join('<tr>'+''.join('<td>'+esc(v)+'</td>' for v in r)+'</tr>' for r in rows)+'</tbody></table></div><h2>Evidence</h2><ul><li><a href="qa-verification.json">Earlier Shopify smoke checks and corrected upload history</a></li><li><a href="preset-smoke.json">Preset homepage checks</a></li><li><a href="warning-triage.json">555-warning triage</a></li><li><a href="reconciliation.json">Original tracker and baseline SHAs</a></li></ul>'
(ROOT/'docs/ultima/release-readiness.html').write_text(doc('ULTIMA release readiness',body),encoding='utf-8')
print('Built gallery, source manifest and 22-area release matrix')
