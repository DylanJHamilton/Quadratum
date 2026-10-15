# ULTIMA Demo Inventory — Baseline 2026-10-15

**Important:** Branch existence does not equal Shopify installation or populated commerce data. Source notes sometimes describe an older HTML-only concept although later commits add Shopify template work; investigate both before categorizing as ready.

| Branch | Demo/vertical | Observed implementation | Integration position |
|---|---|---|---|
| `demo/arc-form-expansions-20261007` | ARC//FORM / eyewear & everyday tech | Merged into main as PR #25. Real Shopify-oriented templates, sections and block demonstration; documented checkout limitations. | Baseline reference and reusable component features. Demo-specific content must be isolated. |
| `demo/orvaine-handbags-20261015` | ORVAINE / handbags | 14 commits ahead of main; 22 changed templates including detailed collections and product. Also shared Liquid/section modifications. | Review cross-theme changes independently; do not bulk merge brand-specific templates. |
| `demo/sample-bookstore-20261007` | Folio & Field / bookstore | 79 commits ahead, 7 behind; 99 changed files; Shopify JSON templates, assets and source HTML prototype. | Rich editorial/product/article case study; separate general fixes from font/media/brand files. |
| `demo/sample-cat-store-20261007` | Morrow Cat Co. / pet products | 116 commits ahead, 7 behind; Shopify section homepage plus niche sections; 24 fictional concept products not Shopify product records. | Visual and niche-section reference; first map concepts to actual Shopify records if commerce interactions will be shown. |
| `demo/sample-computer-store-20261007` | Northstar Systems / computers | 32 commits ahead, 7 behind; native product/page templates, assets and extensive dated bug log. | Highest-priority generic bug-fix source; preserve product spec/compare design. |
| `demo/sample-cosplay-20261007` | EVERREAL (legacy README calls it Mythwoven) / cosplay | 7 commits ahead; real Shopify template changes and bug log 2026-10-14. | Resolve brand naming inconsistency; extract Header Three dropdown bug and shared fixes. |
| `demo/sample-golf-cart-dealership-20261007` | Caddie & Coast / golf carts | 3 commits ahead, 7 behind; HTML prototype, README and catalog planning CSV only. | Inspiration/snapshot until adapted to native Shopify records/templates. |
| `demo/sample-handbag-accessories-20261007` | ATELIER NOË / handbags | 3 commits ahead, 7 behind; HTML prototype, README and planning CSV only. | Separate from ORVAINE; avoid duplicate storefront identity in showcase. |
| `demo/sample-luxury-fashion-20261007` | MAISON VÉRITÉ / fashion | 3 commits ahead, 7 behind; HTML prototype, README and planning CSV only. | Snapshot-only until true Shopify implementation exists. |
| `demo/sample-mobility-accessories-20261007` | OpenPath Living / mobility | 3 commits ahead, 7 behind; HTML prototype, README and planning CSV only. | Accessible product specification and content concept, not a live storefront. |
| `demo/sample-supplements-20261007` | Form & Field / supplements | 3 commits ahead, 7 behind; HTML prototype, README and planning CSV only. | Requires real product labels/claims and Shopify implementation before commerce demonstration. |

## Existing core assets (main)

- `blocks/`: 102 named Liquid theme blocks observed.
- `sections/`: multiple core headers, footers, products, collections, content, forms, social and third-party sections; exact usage per store needs a machine-generated manifest of each template's `sections[].type`, `blocks[].type`, and settings.
- `templates/`: account, home, collection, product, article, blog, cart, search, 404, many pages and technical sample templates.
- `main` current home template still contains ARC-specific product/resource references; do **not** treat it as a merchant-neutral install preset.
- Some demo branches diverged from main, making full branch merging particularly dangerous.

## Required final manifest (must be generated from every branch)

For each brand, enumerate:
1. Route/template (home, page, collection, product, article, blog, utility, account).
2. Section type and instance count, with section settings and activation state.
3. Every block type and instance count, hierarchy, and content dependency.
4. Expected Shopify product and collection handles, actual published channel state and inventory type.
5. Page, article, blog, menu, file and metaobject resources.
6. Visual identity and owned/licensed media.
7. Verified interactions and known bugs.
8. ULTIMA destination: reusable core fix, showcase template, content seed, static snapshot or exclude.

## Catalog rules

The `catalog-seed.csv` files in HTML-prototype branches are expressly **not Shopify-native imports**, and prices/claims are illustrative. Convert to Shopify-supported product imports only after fields, assets, permissions, stock status and safety statements are reviewed. A theme ZIP never transports backend products, articles, navigation menus or store files.

## Suggested featured coverage

- Product gallery + tech specifications: ARC//FORM and Northstar
- Publishing/blog/article: Folio & Field
- Niche lifestyle editorial and cards: Morrow
- Category variety: ORVAINE
- Tailored page/campaign experience: EVERREAL
- Aspirational snapshots: other prototype verticals, explicitly labeled conceptual

Focus on thorough, interactive examples rather than artificially claiming all 11 brands have identical implementation maturity.
