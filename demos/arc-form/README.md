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
