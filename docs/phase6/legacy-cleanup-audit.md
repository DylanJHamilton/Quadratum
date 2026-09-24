# Pre-launch legacy settings audit — H1

Starting remote: `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`. Earlier A–G closure remains historical; the three later Shopify commits are preserved.

All 37 deprecated controls were independently reviewed. Each qualifies for **A — remove before V1**. None needs hidden compatibility or active retention. This checkpoint changes documentation only. Removal and validation follow in H2/H3.

The settings_data SHA-256 is `00683165515aa22401fd3793bfca9561df0a20f3f41d113690839b255d77f9b4`. Its 63 global values, including 8 saved deprecated IDs, are captured in `validation/checkpoint-h1/owner-state.json`. Preserve the entire file, not just selected keys.

## Evidence and boundaries

36 controls have no global source reads. `header_show_store_name` has one read inside an unreachable helper chain: the old mobile-menu helper calls the logo helper, but no runtime caller reaches the mobile-menu helper. H2 removes that unused conditional branch before removing the control. All dynamic global reads resolve to social URLs or warehouse mappings. Dynamic render targets are app blocks, not this helper.

The same names `video_muted` and `video_controls` occur in the CTA banner section and JSON templates as **section-local settings**. Those controls and values remain unchanged. Do not turn a global schema cleanup into a section migration.

Shopify documents schema categories/metadata, saved current/preset/platform state and conditional visibility for supported types. None of these custom IDs is a required platform field; supported native/local features remain. Conditional visibility is unnecessary for nonfunctional controls with no live compatibility purpose. Sources are linked in `legacy-cleanup-audit.json`. This is source validation, not Theme Store certification.

## Individual decisions

| ID | Group / type | Global reads / active | Saved value | Reason / replacement |
| --- | --- | ---: | --- | --- |
| `article_measure` | User Interface / select | 0 / 0 | Not saved | Article section owns content width; no global measure consumer. Replacement: sections/main-blog-single.liquid. |
| `blog_list_style` | User Interface / select | 0 / 0 | "magazine" | Blog section owns its layout; saved magazine value never supplies the global presentation. Replacement: sections/main-blog-collection.liquid. |
| `blog_show_author` | User Interface / checkbox | 0 / 0 | Not saved | Blog/article sections own author visibility. Replacement: sections/main-blog-collection.liquid; sections/main-blog-single.liquid. |
| `blog_show_date` | User Interface / checkbox | 0 / 0 | Not saved | Blog/article sections own date visibility. Replacement: sections/main-blog-collection.liquid; sections/main-blog-single.liquid. |
| `blog_show_tags` | User Interface / checkbox | 0 / 0 | Not saved | Blog/article sections own tag visibility. Replacement: sections/main-blog-collection.liquid; sections/main-blog-single.liquid. |
| `cart_coupon_input_enable` | Commerce Defaults / checkbox | 0 / 0 | Not saved | No theme coupon input or discount mutation is implemented. Replacement: Shopify checkout discount entry. |
| `cart_drawer_show_addons` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Cart-page add-on blocks own products; layout drawer has no corresponding data source. Replacement: sections/main-cart.liquid; snippets/cart-addons.liquid. |
| `cart_drawer_show_rewards_tiers` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Cart-page reward display blocks own tiers; layout drawer has no corresponding data source. Replacement: sections/main-cart.liquid; snippets/cart-progress-rewards.liquid. |
| `cart_gift_wrap_enable` | Commerce Defaults / checkbox | 0 / 0 | true | No gift-wrap product or cart mutation exists; saved true currently changes no behavior. Replacement: Future separately scoped app/product flow. |
| `collection_card_ratio` | Commerce Defaults / select | 0 / 0 | Not saved | Collection sections own card ratio. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `collection_cols_d` | Commerce Defaults / text | 0 / 0 | Not saved | Collection sections own desktop columns. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `collection_cols_m` | Commerce Defaults / text | 0 / 0 | Not saved | Collection sections own mobile columns. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `collection_cols_t` | Commerce Defaults / text | 0 / 0 | Not saved | Collection sections own tablet columns. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `collection_show_filters` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Collection sections own filter visibility. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `collection_show_sort` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Collection sections own sort visibility. Replacement: sections/main-collection-classic.liquid; sections/main-collection-simple.liquid. |
| `enable_lottie` | Media Settings / checkbox | 0 / 0 | Not saved | No global Lottie loader or renderer exists. Replacement: Future separately scoped app or section. |
| `ga4_id` | Integrations / text | 0 / 0 | Not saved | No analytics loader, event subscriber or pixel implementation exists for this ID. Replacement: Provider app or Shopify customer events/pixels. |
| `gmap_default_lat` | Integrations / text | 0 / 0 | "37.7749" | Map sections own latitude; saved San Francisco latitude has no global reader. Replacement: Map section/block coordinates. |
| `gmap_default_lng` | Integrations / text | 0 / 0 | "-122.4194" | Map sections own longitude; saved San Francisco longitude has no global reader. Replacement: Map section/block coordinates. |
| `header_show_store_name` | Header / checkbox | 1 / 0 | Not saved | Only an unreachable logo/mobile-menu helper chain reads this flag. Remove its unused conditional branch alongside the schema control. Replacement: sections/header-one.liquid through sections/header-five.liquid. |
| `marketing_consent_default_checked` | Integrations / checkbox | 0 / 0 | true | No form reads this flag; native confirmation remains unchecked and required where implemented. Replacement: Native form confirmation and Shopify privacy configuration. |
| `marketing_consent_label` | Integrations / text | 0 / 0 | Not saved | No form reads this label; it never controlled Shopify tracking consent. Replacement: Native forms and their local labels. |
| `meta_pixel_id` | Integrations / text | 0 / 0 | Not saved | No Meta loader, event subscriber or pixel implementation exists for this ID. Replacement: Provider app or Shopify customer events/pixels. |
| `mobile_drawer_position` | Header / select | 0 / 0 | "right" | No global reader; supported header sections own drawer placement. Replacement: Selected header section controls. |
| `pcard_show_swatches` | Commerce Defaults / checkbox | 0 / 0 | Not saved | No global swatch renderer reads this control. Replacement: Product-card hosts and their local variant controls. |
| `pdp_show_compare_at` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Product sections own price display. Replacement: sections/main-product-classic.liquid; sections/main-product-simple.liquid; sections/main-product-master.liquid. |
| `pdp_show_unit_price` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Product sections own unit-price display. Replacement: Product sections and shared product price helpers. |
| `pdp_sticky_add_to_cart` | Commerce Defaults / checkbox | 0 / 0 | Not saved | Product sections own sticky purchase behavior. Replacement: Product sections and shared purchase controllers. |
| `pdp_tabs_mode` | Commerce Defaults / select | 0 / 0 | "tabs" | Product sections own content panels; Shopify-saved tabs value is retained but has no global effect. Replacement: Product sections and their tab/accordion controls. |
| `popup_type` | Popups / select | 0 / 0 | "promo" | Actual trigger, content and newsletter controls determine behavior. The selector never enforced age verification. Replacement: snippets/global-popup.liquid; assets/global-popup.js. |
| `reading_progress` | User Interface / checkbox | 0 / 0 | Not saved | No global progress reader; article presentation remains section-owned. Replacement: sections/main-blog-single.liquid. |
| `recaptcha_v3_threshold` | Integrations / range | 0 / 0 | Not saved | No browser or endpoint code in this repository enforces this score threshold. Replacement: Custom endpoint server-side token/score validation. |
| `tiktok_pixel_id` | Integrations / text | 0 / 0 | Not saved | No TikTok loader, event subscriber or pixel implementation exists for this ID. Replacement: Provider app or Shopify customer events/pixels. |
| `use_metaobject_cart_addons` | Commerce Defaults / checkbox | 0 / 0 | Not saved | No metaobject add-on lookup exists; supported cart-page blocks own add-ons. Replacement: sections/main-cart.liquid; snippets/cart-addons.liquid. |
| `use_metaobject_cart_rewards` | Commerce Defaults / checkbox | 0 / 0 | Not saved | No metaobject reward lookup or reward engine exists; supported cart-page blocks own display tiers. Replacement: sections/main-cart.liquid; snippets/cart-progress-rewards.liquid. |
| `video_controls` | Media Settings / checkbox | 0 / 0 | Not saved | Decorative videos use motion controls; same-named content-video section controls remain local and intact. Replacement: sections/call-to-action-banner.liquid and other content-video sections. |
| `video_muted` | Media Settings / checkbox | 0 / 0 | Not saved | Decorative backgrounds stay muted; same-named content-video section controls remain local and intact. Replacement: sections/call-to-action-banner.liquid and other content-video sections. |

## Planned group cleanup

Remove the four empty headers left by removals. Keep all 13 groups because each retains supported controls. Clarify the cart-summary note and the active form metadata label. Preserve every surviving ID/type/default/option/range and local owner. Historical old schemas, reasons, saved values and replacement owners remain in the JSON audit.

Unimplemented gift wrapping, Lottie, age verification, analytics loaders and metaobject rewards/add-ons remain future scope; this cleanup does not implement them.
