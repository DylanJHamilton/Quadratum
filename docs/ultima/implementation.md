# ULTIMA implementation checkpoint

Branch: `ultima/part-1`  
Base: `a2af1499177a83af6753795648fc286020fb2af3`

## Consolidated changes

- Header One navigation breakpoint and optional transparent homepage behavior from VANTIER; collection sort sizing and explicit Product Spotlight selection handling.
- ORVAINE Stats Strip colors and Product Recommend stylesheet placement.
- Slideshow image coverage, fade layout sizing and split content positioning; Split Content Dynamic mobile stacking; Transparent Hero mobile controls spacing.
- Classic Hero and Boxed Content panel full-width overflow; Footer Five responsive columns.
- Feed heading typography, independent team section heading colors, carousel button contrast, Multipurpose Hero CTA contrast, visible-label matching for sub-banner accessible names, and currency-formatted price filter chips.
- Product structured data, Follow on Shop snippet, JSON password template, and Product Bundles schema label.
- Five approved presets (Quadratum, Morrow, Northstar, Kinvar, Vantier), 21 listing templates and an index of all ten demo source branches.

## Validation

- 17 targeted existing suites passed; details in `suites.json`.
- 21 local Chrome render/browser checks passed; details in `regressions.json`, runner in `tests/ultima/regressions.cjs`.
- Shopify Theme Check: zero errors, 434 warnings; full file-level results in `theme-check.json`.
- All 21 listing JSON files parse successfully; exactly five presets are present.
- Windows test fixture reader normalizes line endings before Shopify Liquid adaptation.

Local browser checks use Shopify adapters and do not replace real store acceptance testing.

## Remaining release work

Verify the fixes in Shopify preview and the theme editor, including dynamic section reloads, real product/collection data, keyboard interaction and mobile behavior. Triage the 434 Theme Check warnings. Complete the official Theme Store compliance matrix, including section-group architecture, and reconcile the original tracker before claiming every historical entry closed. Enhancements and platform issues must remain separate from verified code defects.

The gallery currently links demo source branches; public storefront previews remain to be supplied. Keep shared engineering on ULTIMA, review before merging to main, and apply the approved shared baseline to demo branches separately. No store publishing or demo-branch updates are part of this checkpoint.

## Original tracker reconciliation — 2026-10-17

The supplied 37-entry tracker is now mapped entry by entry in `reconciliation.json` and the readable `reconciliation.html`. Original wording is preserved in `original-37-tracker.txt`; demo reports and ten source SHAs are retained as evidence. This supersedes the earlier note that the original tracker was missing.

Additional work includes content-aware header collapse, viewport-clamped dropdowns, split banner sizing, lightbox controls, input contrast, collection card spacing, blog gutters/tags, native section color options and reusable anchors. Bundled icons now render inline without downloading the sprite. ARC custom injection was preserved under demos before removal from shared settings. Range validation runs in CI and through the optional push wrapper.

Final local validation: 19 suites passed, 32 browser/render checks passed, range-validator fixtures passed, zero invalid saved ranges, and Theme Check zero errors / 559 warnings. Of the icon-related warnings, 103 are OrphanedSnippet reports despite explicit render references and 21 are generated-bank complexity warnings. These remain visible for review; no suppression was added. Reports: `reconciliation-suites.json`, `regressions.json`, `theme-check-reconciled.json`.

All 37 entries have a disposition, not live-store closure. Remaining work includes Shopify preview/editor acceptance, Northstar comparison-table wrapping with actual content, warning triage and the full launch-compliance review. Main and stores remain unchanged.

## Bug-fix closeout — 2026-10-17

Northstar's actual homepage comparison data now passes at 390/774/1440px with readable columns, internal horizontal scrolling, keyboard focus and no page overflow. The full browser runner passes 35 checks; the protected-content-hosts suite and saved-range validator also pass.

Removed the undefined content_for_footer output and replaced three deprecated helvetica_n4 selections with inter_n4, already the schema's font default. Shopify requires deprecated preset fonts to be replaced: https://shopify.dev/changelog/posts/changes-to-our-font-library . Preview acceptance must include the resulting text reflow.

Every remaining Theme Check diagnostic has a disposition in warning-triage.json. These are retained release follow-ups, not silently suppressed or claimed resolved. The latest full scan is theme-check-closeout.json. The original 37-entry reconciliation and demo-fix consolidation code phase is complete. Live Shopify acceptance remains open: read-only theme inventory confirmed no ULTIMA draft exists; creating an isolated unpublished ULTIMA QA theme was requested for owner approval. No existing store theme was changed.

## Unpublished Shopify QA — 2026-10-17

Owner approved creation of ULTIMA QA, ID 146655674452. All 661 runtime files uploaded successfully in 17 small batches after two full uploads were throttled. Native Shopify homepage, mobile menu, modern product lightbox/variant, collection sort, support/article rendering and editor settings received targeted smoke verification; details and exact limits are in qa-verification.json. This does not certify the full 37-entry/five-preset acceptance matrix.

Live QA caught and corrected the ARC homepage's redundant custom newsletter consent field. The required native marketing confirmation remains and was verified once in the DOM. Only the new unpublished QA theme was updated. Preview and editor remain open for owner review. Main, live store theme and existing demos were not modified.
