# Batch 9 checkpoint D — tokens, base and static assets

C is remotely verified at `2a7aa9f95d2610f6c71e36c82bd9ad38983a4a9f`. Five Family 9 assets reviewed: **four active/live queued (including one generated sprite), one dormant retained owner-review deletion candidate**.

| Asset | Ownership/consumers | Assessment and change |
|---|---|---|
| `icons.svg` | GENERATED, deployed ACTIVE. `cta-icon`, `q-icon` and rewards CTA; transitive section hosts are in `consumers.json` | XML passes; 6,831 unique, nonempty symbols with viewBoxes; no scripts, event attributes, external links or duplicate IDs. Existing preset/allowed-icon fixtures resolve their symbols. Stable bytes retained. 2.74 MB size is a future optimization opportunity, not authority to split/rebuild the icon delivery system. The separate 7,830 individual-library visual queue is not closed by sprite parsing. |
| `q-base.css.liquid` | ACTIVE normal-layout stylesheet referenced by its served name `q-base.css`; loaded after native tokens and before `styles.css` | Corrected obsolete, nonexistent `type_header_font`/`type_body_font` references to canonical font aliases and connected compatibility palette values to canonical colors. Global p/li/span rules now inherit their owning component's foreground and line height instead of forcing a dark global color/rhythm over nested CTA/brand text. Preserve remaining base helpers and loading order. Register tracing now resolves asset `.liquid` aliases instead of falsely calling this file unconsumed. |
| `qtm-section-surfaces.css` | ACTIVE normal-layout opt-in `.q-section--bg-*` infrastructure, used by 13 retained sections listed in `surface-consumers.json` | Unchanged. Default/surface uses base, contrast uses contrast surface, brand uses brand/on-color, soft variants use a mix. Rules remain opt-in and tokens remain local to each root; independent instances have no shared mutable state. Native color-mix support, final merchant contrast and scoped overrides remain browser/live checks. |
| `quadratum-tokens.css` | No runtime/build import; duplicates much of `tailwind.css` token/shim source | DORMANT, retained owner-review deletion candidate. Contains unconditional OS-dark rules and important shims; loading it would create a second owner and change the current cascade. Never wire it in simply to remove an orphan finding. Retain for owner decision. |
| `worm.svg` | ACTIVE static decorative fallback/default for Icon List | Valid 24×24 SVG, three paths, no external resources or scripting. Host supplies empty alt, decorative wrapper and 64×64 intrinsic image size; fallback error handler disables itself before switching source. Source currentColor in an external image does not imply inheritance of arbitrary host text tint. No source change; final rendering remains live queued. |

## Build ownership and limits

`tools/build-icons.mjs` is the historical sprite exporter; its `icons/lucide`, `icons/tabler` and `icons/custom` input directories are absent. `tools/build-sprite.mjs` instead targets `dist/icons.svg` from custom sources. Neither is part of `npm run build:css`. Do not run either as a release rebuild or assume current dependency versions reproduce the saved sprite: the first can skip missing packs and write an empty asset. This checkpoint preserves and hashes the already-deployed sprite. Reproducible icon regeneration requires restoring/validating source packs in a separately scoped owner decision; no regeneration is required to test the retained sprite.

`assets/icons/` remains excluded by `.shopifyignore`; the flat `icons.svg` and `worm.svg` remain deployable. Build-tool references are now included in the Batch 9 consumer evidence. No dynamic snippet render or config reference activates the dormant duplicate token sheet.

## Validation

Saved before/after regression proves the configured-font alias failure and corrected palette/inherited text contracts. SVG integrity, strict native q-base parse, PostCSS syntax, existing icon/preset/consumer fixtures, source inventory, protected hashes and reference checks pass. No claim of browser layout, AT or live Shopify certification. Real fonts/colors in nested text, main/password cascade, 320–1440px/RTL/zoom, asset CDN fragment use and Icon List failure fallback remain scheduled acceptance.

Global NOT REVIEWED: **5**, all checkpoint E assets. No files deleted; 150 sections, 102 blocks and merchant state remain intact.
