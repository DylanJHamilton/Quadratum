# Live-QA block width repair — owner Shopify test pending

Owner-reported defect after Batch 9 closure. This is a scoped repair, not a new engineering batch. Work is based on `23994e325fa9a6c45ac14b24b9538c8194a62aad`, preserving the owner's Shopify-synced homepage commit after formal closure `7756be8`. No Shopify store or authenticated browser session was accessed. All browser evidence below is local Chromium with explicit Shopify Liquid and wrapper adapters.

## Root cause and minimal repair

The column inner container is a vertical flexbox. Left/center/right alignment disables cross-axis stretching. Its immediate flex item is Shopify's generated `.shopify-block`, whose width was auto. The actual content block sits inside that wrapper: its percentage width resolves against a shrink-wrapped parent. Inline-size containment on six representative block roots removes their content's intrinsic inline-size contribution, reproducing zero-width wrappers. Rich Text also shrinks to its content instead of the available column width.

The identical gap exists in both `blocks/layout-column.liquid` and `blocks/product-layout-column.liquid`. Each receives one instance-scoped rule setting only its **direct** `.shopify-block` children to `width: 100%` (four added lines including a comment). Existing min/max-width constraints, alignment rules and the leaves' width/max-width settings remain intact. No `display: contents`, `!important`, schema, preset, leaf-block, row, section, merchant-setting or global CSS changes.

## Before and after

At a 1440px viewport, the Card column's available inner width is 1342px:

| Block | Before wrapper / root | After wrapper / root |
|---|---:|---:|
| content-newsletter | 0 / 0px | 1342 / 1342px |
| content-logo-cloud | 0 / 0px | 1342 / 1342px |
| content-testimonials | 0 / 0px | 1342 / 1342px |
| content-product-grid | 0 / 0px | 1342 / 1342px |
| content-rich-text | 429.53125 / 429.53125px | 1342 / 1342px |
| content-marquee | 0 / 0px | 1342 / 1342px |
| content-press-mentions | 0 / 0px | 1342 / 1342px |

The same fixture against the unchanged parent commit produces 744 failed geometric assertions; the repaired source produces zero. Summary evidence: `browser-before.json`, `browser-after.json`.

## Validation

- **1164 local Chromium scenarios PASS**: 1008 full/default-width cases plus 156 width/alignment/row controls. The matrix covers all seven blocks, Layout/Card/Centered column presets, left/center/right/stretch, both content and product builders, multiple instances, and normal/design-mode fixture markup. Full matrix viewports: 320/768/1440px; explicit width/row controls: 390/1440px.
- Narrow block sizes remain capped, including Rich Text's 50% desktop / 75% mobile and 240px custom content width. Individual block left/center/right margins, deliberately capped wrapper alignment, explicit tag:null child widths, and multi-column stack/scroll/keep-grid behavior pass. No additional individual block-width repair was needed in these fixtures.
- **115/115 existing regressions PASS**: seven Phase 3 and 108 Phase 4, including the 367-case builder regression. Results are fresh for this source, recorded in `suite-summary.json` and `regressions.txt`.
- **Fresh Theme Check 4.8.0 PASS: 0 errors / 509 warnings, exit 0**. Diagnostic identities/messages are unchanged from Batch 9's final execution. No suppression. `themecheck.json` contains the actual output with filesystem paths normalized; `themecheck-summary.json` records comparison.
- **150 sections / 102 blocks**, all schemas/presets/child admissions unchanged, no deletions, and all other runtime files unchanged. The owner's homepage is byte-identical to the latest starting commit.
- Protected settings SHA-256 is unchanged: `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`. All **515 source hashes** match. Register dispositions are unchanged: **0 NOT REVIEWED**, **470 live queued**, **15 globally retained deletion candidates** (14 from Batch 9).

Run `tests/phase4/browser/block-column-width.cjs` from the repository root with `playwright`, `liquidjs`, and `jsdom` available. `CHROMIUM_EXECUTABLE` can select an installed Chromium; otherwise Playwright's default Chromium is used. `WIDTH_BASELINE_REF=23994e325fa9a6c45ac14b24b9538c8194a62aad` exercises the pre-fix columns without changing the working tree. `WIDTH_RESULTS_PATH` optionally writes results. All network requests are aborted by the test context.

## Owner stop point

Publish non-force only to `release/v1-phase-4-component-hardening`; keep PR #22 OPEN / DRAFT / UNMERGED and main unchanged. The verified GitHub SHA is recorded in the PR summary after publication.

**Ready for the owner's live Shopify check.** Actual Shopify-generated DOM, Theme Editor interaction and merchant-store acceptance are not claimed by the local adapter. No broad live QA, demo stores, preset-family rollout, deletion, readability refactor, roadmap Phase 5 or release-candidate work is started.
