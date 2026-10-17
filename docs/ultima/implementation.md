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
