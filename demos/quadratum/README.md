# Quadratum technology store refinement

Branch: `demo/quadratum-tech-refine-20261021`, cut from `demo/arc-form-expansions-20261007` (6ae1dba). Target draft: Quadratum - ARC FORM Original Branch, theme id 146776883284. Nothing on this branch is published, merged to main, or part of the submission package.

## Intent

Keep the ARC//FORM technology-store character (graphite and off-white surfaces, restrained industrial styling, strong type, product photography) and make it carry the Quadratum brand and a tighter retail journey: hero, categories, curated products, a shoppable Workday System, one comparison, journal, compact footer. Developer-facing demonstrations stay on their own pages.

## What changed, file by file

### config/settings_data.json
- `logo_primary` now points to `shopify://shop_images/quadratum-logo-black.png`; `favicon` to `quadratum-favicon-180.png`. Both files are in `demos/quadratum/brand/` and must be uploaded to Content > Files with those exact filenames before the draft shows them (see Apply below). Until then the header falls back to the store name.
- `header_announce_text`, 404 and popup imagery switched from the furniture placeholders to existing ARC//FORM store images.
- `script_head` (demo-only CSS, unchanged otherwise): the footer wordmark pseudo-element now reads QUADRATUM and inherits the theme font instead of Space Grotesk.
- Header Two (`sections.header-two`): mega menu columns are now Eyewear, Wearables, Carry, Desk & Power with product and collection links; the five text links are Eyewear, Wearables, Carry, Desk & Power, Support. Workday System, Journal, Studio and Theme pages are reachable from the mega menu promos and the footer; the pages themselves are untouched.
- Footer Five: Shop (menu `arc-form-main`), Support (menu `arc-form-explore`), About Quadratum (contact block, text only), newsletter. The demo-tools custom Liquid block is disabled, not deleted. Utility and bottom messages carry the Quadratum demonstration disclosure.
- Footer Two (inactive alternative) brand block points at the white Quadratum logo.

### templates/index.json
Order: hero, ticker, collections, slider, workday-intro, workday-grid, compare, journal. Disabled, preserved with their settings: desk-tour, index-one, tour3d, stats, reviews, moments, ugc, newsletter.

| Component | Section or block file | Change |
| --- | --- | --- |
| Hero "Everyday. Elevated." | sections/featured-product-hero-banner.liquid | Kept. `product_block_mode: single`, `product: vector-one` adds the in-frame product card with price. Secondary CTA now Shop all eyewear. |
| Spec ticker | sections/interactive-content-helper-text-carousel.liquid | Kept as is. |
| Category introduction | sections/featured-content-collection-spotlight.liquid (bento) | Four collection blocks: smart-eyewear, wearables, tech-carry, power-charging with subtitles and link CTAs. workday-system block disabled. |
| Curated selection | sections/interactive-content-helper-product-slider.liquid | Eight manual products in retail order; two disabled. Quick add and quick view remain on. |
| Workday System intro | sections/call-to-action-split-content.liquid | New instance (copied from the Index One split) with Station Dock lifestyle image, Shop the Workday System to the collection and See the setup guide to the campaign page. Trust line removed. |
| Workday System grid | sections/feeds-product-grid.liquid | New. `source_mode: collection`, `collection: workday-system`, five columns, tech card preset, prices, quick add button, quick view modal. |
| Comparison | sections/block-section.liquid > blocks/layout-row > blocks/layout-column > blocks/content-comparison-matrix.liquid | Copied from the collection template's compare-frames instance. CTAs now View Vector Air / One / Shade / Capture. |
| Journal | sections/featured-content-blog-spotlight.liquid | Copy rebranded; the three existing articles stay. |

### templates/collection.json
- Hero subheading shortened; second button now Shop the Workday System (collection).
- main-collection-classic: quick add button and quick view modal on, empty state text written, 4 columns desktop and 2 mobile.
- Assurances (call-to-action-icon-list): the four items no longer promise free shipping, a 30-day trial or a two-year warranty. They now state shipping at checkout, prescription-ready fronts (a catalog fact), where the returns policy lives, and Shopify checkout.

### templates/product.json
- Illustrative reviews section disabled (product pages carry no invented reviews).
- FAQ answer and recommendations copy rebranded; recommendations stay dynamic and complementary.

### templates/cart.json
- Existing main-cart only, restyled to the store: editorial cart and line items, minimal summary, outline quantity, square checkout button, shipping and taxes at checkout.
- Reward tiers (Free Shipping at $50, Free Gift, Bonus Item) disabled, not deleted: they are visual thresholds that read as shipping promises.
- The add-on product was a Shopify sample snowboard; it is now Core 100 with a one-line description.

### Page templates
`page.about`, `page.contact`, `page.features`, `page.workday-system`, `page.block-library`, `blog`: brand strings only (ARC//FORM to Quadratum, #ARCFORMDAILY to #QUADRATUMDAILY). Layouts untouched. Page handles and menu handles (`about-arc-form`, `arc-form-main`, `arc-form-explore`) are store data and unchanged.

## Apply to the draft (146776883284)

1. Upload `demos/quadratum/brand/quadratum-logo-black.png`, `quadratum-logo-white.png` and `quadratum-favicon-180.png` to Content > Files. Filenames must match.
2. Pull the draft so its upload-compatibility repairs are visible: `shopify theme pull --store quadratum-theme --theme 146776883284 --path /tmp/draft`.
3. Diff `/tmp/draft` against `origin/demo/arc-form-expansions-20261007`. Whatever differs is the repair set. Cherry-pick those hunks onto this branch (they are expected in sections, snippets or assets, not in the eleven files changed here).
4. Push this branch to the draft only: `shopify theme push --store quadratum-theme --theme 146776883284 --only config/settings_data.json templates/index.json templates/collection.json templates/product.json templates/cart.json templates/page.about.json templates/page.contact.json templates/page.features.json templates/page.workday-system.json templates/page.block-library.json templates/blog.json`.
5. Preview at `https://quadratum-theme.myshopify.com/?preview_theme_id=146776883284`.

Do not publish, do not merge to main, do not replace the submission ZIP.

## Open items

- The Support footer column reuses the `arc-form-explore` menu. A dedicated `quadratum-support` menu (Support, Shipping and returns, Contact, Journal) would be cleaner; create it in Navigation and swap the handle in Footer Five.
- Page and menu handles still say arc-form. Renaming pages changes URLs; leave them unless the store is reset.
- Product data for specifications, compatibility, dimensions and included items comes from the existing product-meta-panels and specification content on each product; nothing new was invented.
- The sharing image is `demos/quadratum/brand/quadratum-social-share-1200x630.webp` for the store's social sharing setting in Online Store preferences.
