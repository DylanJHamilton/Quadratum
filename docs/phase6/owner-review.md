# Phase 6 owner review

PHASE 6 PRE-LAUNCH LEGACY SETTINGS CLEANUP COMPLETE — READY FOR OWNER REVIEW.

All 37 audited deprecated controls were removed under owner authorization; none remain active or hidden. The schema has 215 supported controls across 13 groups. [Cleanup report](legacy-cleanup-report.md) records exact IDs and validation; [H1 audit](legacy-cleanup-audit.md) preserves historical schemas and replacement ownership. No removal decisions remain. Confirm the streamlined editor presentation and preserved current styling/menu choices during owner acceptance.

Engineering and local validation are complete on `release/v1-phase-6-theme-settings`. No live Shopify acceptance testing was performed in this cleanup. This queue covers acceptance and distribution decisions; it does not represent unresolved source-level settings defects. Do not merge or begin Phase 7 as part of this handoff.

## Decisions before deployment or distribution

| Decision | Current implementation and review needed |
| --- | --- |
| Visible settings corrections | Review shared spacing now emitted as 12/16/24px and 48px instead of fractions of a rem; shared dark on-color default is white. Review the newly effective global color mode, card ratio, shared controls and popup geometry against the owner's intended design. Saved numbers and explicit local styles remain unchanged. |
| Decorative video | Backgrounds are always muted and use accessible theme motion controls; content-video sections own sound/native controls. Confirm this intentional behavior correction. |
| Trusted code and tracking | Three raw HTML/JavaScript hooks remain privileged compatibility surfaces, now with a real master off switch. Default true preserves old behavior. Decide migration/distribution policy for app embeds and Shopify pixels. Inert GA4/Meta/TikTok controls were removed; no tracking is silently installed. |
| Provider loading and data handling | Approve Maps' automatic provider load when enabled, public key restrictions and the site's privacy configuration. Approve custom form endpoint operation, token verification, delivery and opt-in handling. Metadata is not consent or an installed CRM. |
| Popup frequency | Persistent frequency uses Shopify preference permission; absent permission uses page memory. Confirm the resulting potential repeat display across pages. Newsletter confirmation does not set tracking consent. |
| Product metadata and submission scope | Confirm Quadratum/DylanJHamilton, version 1.0.0, branch documentation and repository issues as the intended support channel. This is engineering metadata, not a product release. Any Theme Store submission needs its own full review, including header/footer section groups, resource/preset packaging and third-party integration policy. |

## Retained saved state

`config/settings_data.json` is byte-identical to the current Shopify starting commit `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`. Before/after SHA-256: `00683165515aa22401fd3793bfca9561df0a20f3f41d113690839b255d77f9b4`. All 63 saved globals, the eight inert values associated with removed controls, and all section/block/platform state are preserved. All three Shopify commits after A–G closure remain ancestors. The older compatibility state below also remains untouched.

| Legacy key | Saved value | Disposition |
| --- | --- | --- |
| `account_layout` | `classic` | Retained inactive state. Account sections own layout; only the unused JavaScript export was removed. |
| `email_marketing_app` | `mailchimp` | Retained form metadata; no provider integration is inferred or installed. |
| `gmap_style_json` | `[]` (text) | Retained inactive map styling state; supported map presentation is local. |
| `gmap_marker_image` | Empty text | Retained inactive marker state. |
| `fb_feed_enable` | `false` | Retained inactive state; the Facebook section owns its current provider controls. |
| `cart_mode` | `ajax` | Retained. Explicit modern `enable_ajax_cart_drawer` true/false wins. Only known legacy `ajax_drawer` is used when modern state is absent; no speculative migration of `ajax`. |

## Live acceptance queue

| Surface | Check on a development theme with representative merchant resources |
| --- | --- |
| Theme Editor and branding | Visit all 13 groups; confirm the 37 removed controls and four empty headings are absent, then verify labels/help, saved false/zero values, global defaults versus explicit local overrides, fonts, sharing images, dark/light colors, spacing and both normal/password layouts. |
| Headers, footers and accounts | Exercise all five variants, mobile navigation, current Shopify account entry and native legacy fallback, logged-in/out destinations, and keyboard focus. Verify actual hosted account transport. |
| Cart and product cards | Exercise native and Ajax routes, master and source trigger gates, card defaults, unavailable products, add failures, quantities, empty state and local bundle behavior. Verify threshold display in enabled currencies; it does not promise actual shipping eligibility or conversion. |
| Search and 404 | Test every enabled search source, predictive-only collections, all-sources-off, popup/native routes, real resource results, 404 search, safe CTA fallback and configured imagery. |
| Media, localization and performance | Verify eager versus lazy imagery, explicit ratios, background pause/reduced motion, real font delivery and connection hints. Exercise available Markets/country/language forms, localized routes and RTL/Latin-script variants. |
| Native and custom forms | Submit real native newsletter/contact forms with Shopify CAPTCHA. Verify unchecked confirmation, errors/success feedback, all nine custom hosts' provider/key precedence and server-side token validation. Confirm endpoint delivery and provider tags/metadata. |
| Integrations and privacy | Verify trusted scripts on/off with actual approved code, provider app/pixel setup, permission changes, Maps failure/fallback and safe social links. Ensure no secrets are stored in client settings. |
| Popups | Test delay/scroll/exit/manual triggers, mobile/desktop gates, placements, animations, reduced motion, Escape/overlay/focus return, modal coexistence, native newsletter responses, preference-denied/allowed frequency, editor preview, section replacement and unload. |
| Cross-browser accessibility | Check Safari/iOS and Firefox in addition to Chromium; keyboard-only use, screen readers, touch, zoom, long/localized content and owner-selected color contrast. Automated axe passes are bounded by the fixture content. |

The 112 Phase 3/4 suites, 13 targeted Phase 5/6 suites and 176 browser fixtures are recorded in [legacy-cleanup-report.md](legacy-cleanup-report.md). Theme Check has zero errors and 517 disclosed warnings. Owner acceptance can proceed from these results; local fixtures are not live Shopify certification.
