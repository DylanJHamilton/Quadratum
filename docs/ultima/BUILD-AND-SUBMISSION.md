# ULTIMA — Storefront, Header and Theme Store Acceptance

## A. Distinguish two consumer experiences

**ULTIMA capabilities hub:** A branded Quadratum showcase and directory with proof from the other demo brands. May use source previews or screenshots clearly labeled as concepts when not yet operational. Interactive pages must be real Shopify-rendered templates and backed by actual store resources.

**Official Theme Store demo(s):** Coherent, realistic merchant businesses aligned with submitted presets. Shopify requires at least one working demo URL per submitted preset, genuine content and matching install-state templates. A marketing gallery or static mockup cannot replace this. For the fastest first submission, investigate using one excellent, fully functional `Quadratum` preset and demo rather than immediately committing to extra hosted preset demos. Do not claim approval or submit without owner decision.

## B. ULTIMA brand and information architecture

**Brand:** QUADRATUM — Platinum Precision. Obsidian `#0A0A0A`, Porcelain `#F5F5F3`, Graphite `#6E6E73`, Silver Mist `#C9CCD1`, Platinum `#E5E7EB`. Display: Instrument Sans; interface: Inter. Elegant, thin rulework and architectural accents; real demo brands can keep their own colors.

**Proposed main navigation:** Theme / Showcase / For Agencies / Ecosystem / Resources / Support.

**Homepage section sequence:**
1. Real theme hero — headline `Commerce. Without compromise.`, CTA `Explore the Theme`, CTA `Explore the Demos`.
2. Three meaningful reasons to choose Quadratum: visual versatility, commerce capability, reusable engineering.
3. Real device/browser screenshot gallery from working theme pages (not fabricated app UI).
4. Industry demo directory/gallery with implementation-status-accurate cards.
5. Agency-first repeat-build system: one familiar foundation, distinct brand outcomes.
6. Best-of section and block demonstrations by capability, not by file name.
7. Actual product template selection gallery: tech, luxury, editorial, lifestyle.
8. Commerce modality demo: variant, catalog, cart, wishlist, recommendations, search.
9. Content/publishing and landing-page demonstrations.
10. Theme / Assist / Link / Scan ecosystem, with honest planned-release labels.
11. Verified performance/accessibility/developer documentation and support.
12. Closing CTA, footer, legal/privacy/support.

**Suggested internal route structure (concept until created in Shopify):**
- `/pages/ultima-directory` — searchable/filterable gallery of industry demos.
- `/pages/ultima-components` — curated sections and block capabilities.
- `/pages/ultima-products` — PDP design gallery.
- `/pages/ultima-content` — blogs, article and landing-page designs.
- `/pages/ultima-technical` — technical and accessibility demos.
- `/pages/for-agencies` — repeat build and licensing/workflows.

Use native Shopify collections/products/pages/blogs for fully interactive routes. Do not hard-link to unpublished or non-existent pages.

## C. Template coverage plan

| Route family | Required ULTIMA variation |
|---|---|
| Homepage | Platinum editorial hero and theme demonstrations |
| Landing pages | Full-bleed editorial/campaign hero; transparent header capable |
| Standard pages | Guide/FAQ/contact and feature composition; solid header |
| Collection grid | Lifestyle, editorial, spec-heavy and filtering use cases |
| Collection list | Gallery-style and text-forward variations |
| Product | Apparel variants, computers/specs, lifestyle kits and visual merchandise |
| Product gallery | Images, zoom, media, alternative view and sold-out conditions |
| Blog index | Publication-style with categories and article cards |
| Article | Editorial, guide/how-to and media-rich |
| Cart/drawer | Empty and filled, remove/change quantity, cart notes, threshold messaging |
| Search | Results and zero-results; predictive and keyboard behavior |
| 404 | Useful recovery and correctly aligned header |
| Customer | Login/register/reset/addresses/orders, where available in current/legacy account mode |
| Password/gift card | Realistic and accessible layouts |

Products, collections, pages, menus, files and articles are *Shopify store data* and require separate seeded import/configuration; they are not magically created by JSON template files.

## D. Transparent versus solid header specification

**Existing code:** `layout/theme.liquid` chooses one of five headers globally. `header-three.liquid` supports `solid`, `transparent`, `transparent_until_scroll` as section-level background modes but lacks reliable per-template selection.

**Target behavior:**
- Home: configurable transparent over full-bleed hero, becoming opaque once sticky/scroll state requires.
- Campaign landing / selected editorial product or collection templates: optional transparent overlay.
- Basic product, category, guide, blog, article, cart, search, 404, customer and utility pages: solid by default.
- Never overlay over text or light images without a suitable accessible logo/text/icon contrast policy.
- Transparent mode controlled by an explicit compatible template policy, not a brittle CSS-only preview hack.
- If no supported full-bleed first section exists, fall back to solid; prevent layout jump and header/hero overlap errors.
- Announcement bar, dropdown menus, search, cart and account surfaces always get readable opaque surfaces when open.
- Sticky mode transitions background, border, foreground and logo consistently; user reduced-motion preference respected.
- Test all five header variants or clearly constrain this feature to the supported header variant in V1 and document limits.
- No layout shift or cut-off nav/dropdown at narrower desktop widths (~1135px regression).

**Acceptance tests:** home at 320/375/768/1024/1135/1440 widths, landing with no hero, product with large image, account and 404, keyboard tab to dropdown, mobile menu, RTL, no JS, theme editor preview.

## E. Current release blockers requiring verification

1. Main settings and default JSON templates contain ARC/demo-specific media/product/collection links and extensive demo CSS in `script_head`; build clean public release defaults.
2. Mixed branch maturity and divergent fixes; do not bulk-merge.
3. Header Three clipped dropdown (EVERREAL) and template-specific transparency missing.
4. Prototype CSVs are not Shopify imports; product/collection/blog/newsletter data requires real Shopify admin configuration.
5. Demo-asset rights and copyrighted fonts/images/trademarks must be verified.
6. Official `Quadratum` preset name and real demo URL; additional presets must have distinct installation templates and working demo store URLs.

## F. Shopify acceptance gate

Use latest authoritative docs:  
https://shopify.dev/docs/storefronts/themes/store/requirements  
https://shopify.dev/docs/storefronts/themes/store/test-theme/checklist  
https://shopify.dev/docs/storefronts/themes/store/review-process/listings  
https://shopify.dev/docs/storefronts/themes/store/review-process/submit-theme

### Code, setup and intellectual property
- Original eligible theme code, no Dawn/Horizon-derived submission; Shopify Skeleton Theme exception noted in requirements.
- No mandatory app dependency for core theme functionality, no deceptive integrations.
- Valid Liquid/JSON/schema/HTML; `shopify theme check` and `shopify theme package` clean.
- Production CSS/JS served appropriately; no Sass, unsupported external resources, stray demo-only code or security-sensitive secrets.
- Demo imagery, wordmarks, fonts, content and product rights substantiated.
- Default installation clean, no broken `shopify://` references or store-specific metafield dependencies.
- Required `theme_info` metadata, support/documentation, stable URLs, version number and release notes.
- One preset named Quadratum; full `listings/` package where multiple presets are submitted; install state reflects demo.

### Functionality
- Execute **every relevant case** in Shopify's current Theme Store functional testing checklist in live theme editor and storefront.
- Product variants, availability, unit prices, image aspect ratios and rich media.
- Navigation/search/filters/cart/discounts/account/collection/page/blog/404/password.
- Strong empty states, forms/labels/focus/ARIA, semantic HTML and no-JS essential paths.
- Test supported browsers and required mobile social-app webviews.
- No broken links, dummy buttons, fabricated sales data or template configurations outside intended features.

### Lighthouse and accessibility
- Current Theme Store floor: mean Lighthouse **performance >=60**, **accessibility >=90**, both desktop and mobile across home/product/collection under Shopify benchmark. Aim substantially above floors.
- Body text >=4.5:1 contrast; large text and required non-text UI >=3:1; keyboard focus visibly strong; sensible DOM focus order; touch targets satisfy required minimum.
- Audit contentful pages, realistic images, responsive sizes, lazy loading, CLS, LCP, script loading, 3D/video behavior.
- Accessibility reviewed manually, not by Lighthouse alone.

### Store/listing documentation
- Working industry-aligned demo URL for each submitted preset, correctly configured test checkout.
- Desktop screenshot: 1000x1248 or 2000x2496; mobile screenshot: 750x1334; provide alt text.
- Preset-specific features, complete listing, contact and support within two business days.
- Submission only after sign-off and a verified ZIP built from an approved commit.
- Proposed price **$440**; published examples exist at that price, but final listing price and terms are controlled by Theme Store submission.
- Paid Theme Store license is per store. Theme revenue is subject to Shopify's then-current partner revenue share.

## G. Definition of done

The build is complete only when: all chosen ULTIMA routes exist, source content is attributed and licensed, native interactions work, shared bugs are tested, transparent/solid header states pass, brand is consistent, clean install works, official preset demos are live and parity-tested, scores and functional checklist pass, reviewers have everything necessary, owner authorizes submission.
