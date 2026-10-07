# ARC//FORM demo expansion

Draft Shopify theme: ARC FORM — Demo 01 (146261999700). Base: 85342046068ee223a78eeb8aadd25ed18c555777.

This demo branch adds optional reusable features: hero spec blocks, a bento collection layout, keyboard/drag image rotation, product-card wishlists and header counts, a collection comparison dialog, and cart goals/add-on/gift-wrap controls. CTA Banner Classic has independent outline text and border colors. Product-card wishlist controls sit above the hover overlay.

The demo preserves the live Home and Collection configurations captured before this pass, adds four home sections, and retains the previous collection grid as a disabled editable alternative. Current filled CTA choices are preserved. Product JSON was not replaced. Existing About, Contact, Services, Why Choose Us, blog/article and utility templates remain in the draft.

New Shopify pages and templates:
- /pages/workday-system?view=workday-system — campaign landing
- /pages/features?view=features — capabilities and an isolated style playground
- /pages/block-library?view=block-library — curated populated block examples, not a complete 102-block catalog
- /pages/wishlist?view=wishlist — browser-local saved products

Use the draft preview; the published theme is unchanged. Page records use the default template because unpublished template suffixes are not available in the published-theme admin selector. Demo links explicitly select their draft templates. The optional wishlist link override does the same.

Cart goals are visual thresholds only: they do not configure shipping rates, discounts, or automatic gifts. Add-on and gift-wrap features require merchant-selected products. The fictional catalog remains sold out and no purchase or checkout transaction was performed.

Validation: Shopify Theme Check zero errors; existing Liquid and shared-UI tests passed; arc-expansions.cjs covers frame keyboard state, compare limit/table/focus/clear, and product-level wishlist persistence/counts. Live browser verified home and campaign rendering, frame arrows, compare table, wishlist mouse and keyboard activation plus persistence, page links, style controls, and empty cart drawer. Mobile hero inspected in Shopify editor. Native checkout, nonempty cart and configured gift-wrap transactions are not live-verified.

The section-map control and style playground are demo-only content in footer custom Liquid / page code blocks. Core feature defaults remain off or unchanged unless configured by this demo.


## Claude HTML reference pass — 7 October 2026

Expanded the draft from the nine supplied HTML build maps: Home, Collection, Product, Workday, Studio, Support, Journal, Features and Block Library. Native section settings, nested blocks, product resources and existing image assets power the layouts. Header Two and Footer Five replace the earlier demo navigation. Demo-specific visual overrides and section anchors are contained in this draft's script settings.

The header's one-row layout now reclaims the reserved inline-search column when search uses an icon or popup. The active Header Two section also exposes the existing local wishlist.

Reference adaptation notes:
- All catalog products remain sold out. No orders or checkout transactions were submitted.
- Reviews and brand stories are illustrative, with the demo disclosure retained in the footer and review headings. No external review app was installed.
- Product-specific examples from the Block Library reference cannot be embedded directly in a Shopify page template; native product context remains on the PDP. Block family examples use populated native content blocks and editable layout rows/columns.
- The design-system panel retains the interactive demo playground. Existing three journal articles are linked instead of the mock HTML article paths.
- Eyewear-specific supplemental PDP/collection sections are visually scoped to Vector One and Smart Eyewear in the demo settings.
- Native schema limits, rich-text formatting, and allowed section contexts differ in a few places from the supplied maps and have been corrected.

Validation: Theme Check reported zero errors. Desktop rendering inspected for all nine page types; mobile home/header composition inspected in Shopify's editor. Checkout, external integrations and every individual block interaction are not acceptance-tested in this pass.


## Visual refinement — 2026-10-07

Refined the ARC FORM draft in response to the page-by-page review: dark-section contrast, full-width moment tiles, centered frame viewer, uniform UGC grid, shaped journal cards, branded forms/search/lightbox, Workday alignment, Studio material cards and metrics, footer typography and navigation. Theme/support/studio icon text fields now accept explicit `lucide-` sprite keys while preserving existing emoji/text input. Fixed double quoting of Shopify font family values. Added the drawer's View cart link.

The demo-only CSS is retained in `current.script_head`; `refinement.css` mirrors this refinement for review. The second mega-menu promo is disabled. Theme page copy announces forthcoming ready-to-use demos included with purchase as they launch.

Store data: enabled continue-selling for Vector One Graphite and Alloy for demo cart testing. Added one Graphite through the actual product button and verified its drawer and full cart line at $279. No order placed. Other demo products retain their existing availability.

Validation: Shopify Theme Check reported zero errors; desktop home, gallery, search, cart, Studio materials, support icons and commerce showcase checked. Mobile home hero and two-column moment cards reviewed in the draft editor.
