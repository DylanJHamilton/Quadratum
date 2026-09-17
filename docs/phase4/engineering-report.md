# Quadratum Phase 4 — component hardening progress

Status: **IN PROGRESS — draft review only.** Phase 4 is not complete. This document must not be read as certification of unreviewed components.

## Baseline and boundaries

Repository `DylanJHamilton/Quadratum`; fresh branch `release/v1-phase-4-component-hardening`. Owner-approved main baseline `13d9e03010de46595e32e80144c17f76e1c36a39` (PR #21 merged). GitHub compare confirmed no file differences from Phase 3 head `ff4b52c890560c4ba52fdcadbd48cd8448e28892`; tested tree `13dd9a4aa33206d8a34d9ee242f1ee98bcf09eaf`. Local starting commit `0dc7531` has that identical tree; local/published hashes differ because GitHub object APIs publish the commits.

150 sections, 102 Theme Blocks and both builder chains retained. `config/settings_data.json` SHA-256 remains `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`. No main writes, merges, publication, preset-brand rollout, account redesign, settings redesign or CSS-delivery rewrite.

## Register coverage

`component-register.csv` inventories every section, block, snippet and deployed/root CSS/JS/static asset. `static-assets/register-*.csv` separately enumerates all 7,830 SVG files in the excluded icon library, with individual hashes and XML parsing results (zero XML errors). Inventory is not release approval. Untouched components remain explicitly NOT REVIEWED; static icons remain VISUAL REVIEW PENDING. Dynamic consumer tracing remains necessary beyond literal references.

## Batch status

| Batch | Status |
|---|---|
| 1 Global / Structural | Initial engineering hardening and focused fixtures implemented; live visual/settings/editor acceptance queued. |
| 2 Hero / Banner / CTA | Eleven active components repaired and fixture-tested; remaining family components NOT REVIEWED; live acceptance pending |
| 3 Collection / Discovery | Pending |
| 4 Product / Commerce | Pending; Phase 3 contracts protected |
| 5 Content / Interactive | Pending |
| 6 Forms / Conversion | Pending |
| 7 Social / Third Party / Utilities | Pending |
| 8 Theme Blocks | All 102 inventoried; individual host review pending |
| 9 Snippet / Asset Closure | Inventory started; independent consumer/visual closure pending |

## Batch 1 findings and repairs

- **Headers One–Five lifecycle:** repeated asset execution and editor reloads could duplicate handlers; global listeners survived removed sections. Initialization now has explicit guards and abortable per-header listeners. Unload closes active navigation and clears relevant timers. Header One's existing initializer was moved into a deferred asset so editor loads receive the same behavior as initial loads. Its dropdown/drawer settings and layout remain.
- **Headers Two–Four mobile behavior:** immediate open-state focus, closing-state guards, reduced-motion close timing, opener restoration, proper dialog/fallback semantics and external-focus containment. Headers cooperate so opening one closes another; two simultaneous focus traps cannot fight. Headers Three/Four no longer transition visibility before focus. Header Five retains the Phase 3 contract and gains cleanup/cooperation.
- **Search/cart handoff:** Headers Three–Five release the mobile modal when a system search/cart trigger is used, avoiding competing focus traps. Header One/Two's existing handoff remains.
- **Search popup:** cancelled delayed focus after close; added Tab containment and outside-focus recovery. Singleton global ID and existing controller route preserved.
- **Global popup frequency:** boot previously called reset unconditionally, erasing once-per-session/day/week state on every load. Frequency now persists. Ordinary theme preview URLs no longer force Theme Editor behavior. Explicit false dataset settings take precedence over true global fallbacks. Blocked browser storage is handled. Reopening cancels the previous close timer; duplicate script/boot calls do not duplicate initialization.
- **Header Five mobile search:** `append: section_id` had been passed as an unused render argument, producing duplicate IDs. The ID is now assigned before rendering. Actual two-instance Liquid fixture proves distinct input IDs.
- **Footer Two–Five newsletter forms:** unique Shopify form IDs include section and block identity where applicable; input/label associations retained. Customer action and newsletter tags unchanged. Removed seven confirmed unused footer discovery flags/assignments while already reviewing those files.
- **Header/footer media:** added intrinsic image dimensions using each actual image object; square cropped thumbnails use their requested dimensions. Existing loading, crops, sizing and alt text retained. This is local layout-shift hardening, not a theme-wide image rewrite.
- **Header Four announcements:** first visible announcement no longer depends on the position of unrelated blocks in the section. Rotation now has a persistent pause/resume control, honors reduced-motion preference, pauses during hover/focus, and cancels its timer on unload. Countdown ticks no longer repeatedly announce every second; expiration remains a status message.
- **Search snippet maintenance:** removed stale generated migration commentary and unused render argument. No search behavior redesign.

## Deliberate non-changes and decisions

- No retained file deleted. `sections/header-basic.liquid` is a zero-byte file with no active consumer found in the layout/config/template trace: **DELETION CANDIDATE — OWNER REVIEW**, retained.
- Legacy `header-two-*` snippet chains and standalone `q-nav` remain for Batch 9 consumer closure. No automatic orphan deletion.
- Header/footer settings counts remain high. Removing controls or changing layout families solely to reduce lint counts would violate the feature-preservation brief.
- Source breakpoint review and rendered fixtures are not screenshots. Components awaiting real responsive/merchant-state verification are marked REQUIRES LIVE VERIFICATION, not PASS/HARDENED.
- The 605 historical Shopify-verification candidates remain separate. No candidate was promoted solely because it was unprovable offline.

## Batch 1 validation

From repository root; test dependencies are installed in the sibling analysis tools directory.

- `python tests/phase4/register.py` — inventories components, validates embedded schemas, refreshes dependency/hash evidence without overwriting recorded dispositions.
- `python tests/phase3/static-check.py` — protected architecture, schema and JavaScript checks.
- `python tests/phase3/closure/static-audit.py` — references, template/locale coverage and merchant state.
- `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase4/global-surfaces.cjs` — five header variants, duplicate/editor initialization, two instances, focus/Tab/Escape/return, rapid reopening, unload/reload, announcement pause/timer cleanup, popup persistence/storage denial, search focus and H5 IDs.
- `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase4/global-presets.cjs` — ten actual header/footer default/preset compositions, each rendered twice, unique IDs, label targets and required newsletter emails. Shopify form tags are fixture adapters, not live submission certification.
- All seven Phase 3 mechanism suites repeated; commerce, cart, predictive search, hero and other critical fixtures preserved.
- `npm run build:css` and `git -c core.whitespace=cr-at-eol diff --check`.
- Shopify Theme Check full JSON plus per-check movement retained in `validation/`. Existing diagnostics are not hidden or represented as a clean global lint result.

Theme Check movement: missing image dimensions **94 → 47**; unused assignments **72 → 65**. All other check counts unchanged. No new diagnostics; existing parser/complexity/settings/naming diagnostics remain.

## Live verification queue

**B1-VISUAL:** Headers One–Five and Footers One–Five at 1440, 1280, 768, 390 and 320px; long store names/menu labels, populated/empty menus, logos and explicit color overrides. Exercise every mode-dependent setting, newsletter success/error, localization, search/cart handoff, real editor add/remove/reorder and keyboard/screen-reader interaction. Header Four: mixed block order, pause/resume and expiration. Global popup: full navigation across pages with real frequency settings and editor preview.

This queue is bounded to actual component states. It is not permission to mark all remaining components reviewed. Batches 2–9 must still receive their individual engineering dispositions before Phase 4 can be completed.

## Batch 2 checkpoint — active banner and CTA behavior

This is a checkpoint within Batch 2, not completion of Batches 2–9. The owner authorized continued implementation; no additional permission is needed for remaining scoped repairs. The PR must remain draft until every retained component has a final disposition **and required validation/live queues are complete**.

- **CTA Featured Product:** the section did not load its variant controller or expose its required root hook. Fixed loading, exact variant matching, sold-out/nonexistent option guards, compare/savings appearing on later variants, and native fallback selection. Quantity remains in one form payload; the existing selling-plan snippet is reused. Moved media navigation into the same abortable lifecycle. Fixed custom-image and trust-badge settings that previously had no effect; removed contradictory mobile split rules and added visible radio focus. Neutralized unsubstantiated product/returns insertion copy. Existing merchant selections are untouched.
- **Carousel Hero:** inline scripts initialized every instance using one section's settings, duplicated clones/listeners, and skipped product controls for single-slide instances. A guarded deferred controller now owns each instance. Decorative clones retain the neighbor preview but are inert, disabled and stripped of duplicate IDs/scripts. Navigation wraps safely under rapid input and reduced motion; pause is persistent and timers/listeners are disposed. Variant fallback/select controls retain exact IDs and availability, with shared Phase 3 cart handling and selling-plan support. Styles containing merchant values are scoped by section identity, including custom-anchor cases. Explicit false carousel settings now stay false.
- **Slideshow Banner:** extracted the active `data-qsl` implementation, with duplicate-boot protection, inactive-slide inertness, persistent pause and unload cleanup. Inactive videos stop; embedded video sources are loaded only for the active slide outside reduced-motion/hidden-document states. Fixed a stray percent character in video markup. The unrelated `assets/section-slideshow.js` is not this section's active implementation and remains for Batch 9 tracing.
- **Current Sale:** section markup uses countdown blocks while its old asset expected obsolete root attributes. Each actual block now owns a timer; initially expired timers do not restart. Existing progress values are no longer overwritten by absent global settings. Expired preset deadlines, store-specific image references and fabricated preset progress were removed from new insertions. A shared local sale-link snippet preserves queries/fragments and encodes discounts for block-level destinations. Script loading is deferred. Real discount redemption remains a live check.

Tests: `banner-commerce.cjs` exercises production assets for option/ID/quantity, availability, invalid combinations, repeated boot, carousel wrapping/pause and editor disposal. `banner-presets.cjs` renders actual section presets twice with empty/product data; Current Sale's actual rendered blocks are executed to verify timers and unset-date editor guidance. Shopify form tags are adapters, not a live checkout claim. All seven Phase 3 regression suites and both Batch 1 suites remain passing. Validation evidence is in `validation/batch2/`.

**B2-BANNERS live queue:** four reviewed sections, all available layouts, 1440/1280/768/390/320px, long merchant text, actual images and video providers, keyboard/screen-reader behavior, real editor add/remove/reorder, carousel false settings and custom anchors. Featured Product/Carousel Hero: available/sold-out variants, quantity, required/optional selling plans, native submission and enabled/disabled AJAX drawer. Current Sale: independent deadlines, discount links with query/fragment and real redemption. Slideshow: video switching, reduced-motion preference changes and progress indicator behavior while paused. These checks remain open; no ready-for-review transition is authorized by this checkpoint.

Batch 2 Theme Check movement from Batch 1: image dimensions 47→46, hardcoded routes 11→10, parser-blocking scripts 9→8, unused assignments 65→64, variable naming 335→334. OrphanedSnippet 88→89: the new `cta-sale-link` is reported despite four explicit render consumers in Current Sale and passing render fixtures. This diagnostic is retained as a demonstrated tracing false positive, not suppressed. Other check counts are unchanged.

Batch 2 code publication: local `66826fe5e3a102a35f8bb82757a7aab2b48e0dde`; remote `a1a2e4f09af36aba81698e55fa6fc0493e10709c`; identical tree `7d40ebeec3c3ba155d87aa19e4c6470d6db3d8db`. No ready-for-review transition.

## Next source findings — not closed

These discoveries are recorded without promoting the components from NOT REVIEWED. Multipurpose Hero has active slide/content snippets, a gradient variable mismatch, broad button selectors, incomplete setting-to-CSS contracts, and unresolved media/product-picker handling. CTA Web3's active implementation is inline; when no URL is supplied it simulates connection without calling a wallet provider. Its similarly named external asset is not the active section implementation. Preserve the component and record a release decision rather than silently building a wallet connector or removing its intended behavior. The proxy snippets and q-banner-base have no literal consumers yet; dynamic tracing remains pending. tw-safelist-banners is a real Tailwind build input and is rendered by Grid Banner.

Current checkpoint: 447 primary components; 49 carry a reviewed disposition (mostly live-pending), 398 remain NOT REVIEWED, including partially inspected components with open engineering findings. Batches 3–9 have not been completed. The 7,830 excluded icons remain separately inventoried with visual review pending.

## Multipurpose Hero checkpoint

Five more register entries (section, two snippets, CSS and JS) now have a live-pending disposition. Register totals: 447 primary components, 393 NOT REVIEWED, 53 REQUIRES LIVE VERIFICATION and one retained owner-review deletion candidate. Earlier checkpoint counts above are historical.

Repairs restore solid/gradient overlays, slide fallback background, split ratios, stacking/reversal, content placement and width, card sizing and transition options. Shared-looking button rules are scoped to this component. Slides use a shared grid area so their content can establish height instead of being clipped by an absolute-only layout. Missing image selections no longer call image_url; selected product objects resolve directly, with legacy handle fallback. Existing image objects provide intrinsic dimensions. Product/info cards receive readable text on their light surfaces, and tiled panel imagery uses a valid background size.

Static and slideshow modes now suspend inactive, hidden-document and reduced-motion media, including deferred embedded video URLs. Unload clears playback and handlers; reload restores exactly one active slide. Pause exposes its pressed state. Default insertion now includes neutral copy and a valid collection destination; a storefront section with no slides is hidden, while the editor displays an instruction. Saved merchant state is unchanged.

Validation: actual Liquid presets and empty-state rendering, product-object resolution, native video/iframe activation and cleanup, preference/visibility changes, duplicate boot, root reload and the existing Phase 3 two-instance hero suite pass. All seven Phase 3 suites and existing Phase 4 fixtures pass. The Phase 3 JSDOM fixture now explicitly simulates a visible browser; its original timer/independence/pause assertions are retained. CSS build, schema/reference/architecture checks and Theme Check evidence accompany this checkpoint. No browser screenshot or live Shopify acceptance is claimed.

**B2-MULTIPURPOSE live queue:** every layout and override at 1440/1280/768/390/320px; long content, split stacking/reversal, desktop/mobile placement, panel colors/contrast and all animation choices. Use actual MP4/YouTube assets and real product selections. Exercise editor add/remove/reorder/block changes and existing parent-slide relationships. This remains open; the draft gate is unchanged.


## Featured Product Hero and Video Hero checkpoint

Register totals: **449 primary components; 391 NOT REVIEWED, 57 REQUIRES LIVE VERIFICATION, one retained owner-review deletion candidate**. Two new controllers account for the inventory increase. Batches 3–9 remain unfinished.

Featured Product Hero now leaves content visible when reveal is disabled or IntersectionObserver is unavailable. Reveal/parallax respect reduced motion and clean up on unload. Product and collection picker objects resolve directly; native forms use the localized cart route, exact selected variant, availability guards, current price and the existing selling-plan snippet. Its three insertion presets now apply their named alignment/panel settings; fallback colors, wrapping and control focus were corrected. Merchant configuration is unchanged.

Video Hero now defers embedded playback, offers a persistent pause control, respects initial reduced motion and hidden/viewport settings, and disposes playback/listeners on editor unload. Explicit user playback remains possible with reduced motion. Missing links no longer produce placeholder buttons; example video URLs and external demo CTA defaults were removed. YouTube embed/shorts URLs resolve along with existing formats. Poster imagery remains available before playback.

Validation in `validation/hero-media/`: all seven Phase 3 and seven Phase 4 suites pass, including actual two-instance Liquid, selected variant/price/availability, sold-out products, collection objects, missing-observer fallback, media suspension and editor disposal. CSS build, structural/reference checks pass; 150 sections and 102 Theme Blocks retained, no deletions, merchant settings hash unchanged. Theme Check remains nonzero for existing debt: image-dimension diagnostics 43→41 and hardcoded routes 10→8; all other check totals unchanged. Structural evidence reports the parent HEAD because it tested the working tree; source-hashes.json identifies the reviewed source.

**B2-HERO-MEDIA live queue (OPEN):** both sections at 1440/1280/768/390/320px, long merchant content, all layouts/presets/color overrides, reveal enabled/disabled, parallax, keyboard and screen reader, real editor add/remove/reorder. Featured Product Hero: available/sold-out variants, required/optional selling plans, localized native submission and AJAX drawer. Video Hero: real MP4/YouTube/Vimeo, poster/empty states, autoplay denial, persistent pause, reduced-motion changes and viewport hiding. No screenshots or live Shopify acceptance claimed. PR remains draft.


## Classic Hero checkpoint

Register totals: **450 primary components; 389 NOT REVIEWED, 60 REQUIRES LIVE VERIFICATION, one retained owner-review deletion candidate**. The controller adds one asset. Counts above describe earlier checkpoints.

Classic Hero's untracked interval and repeated global initialization were replaced by an instance-guarded, abortable controller. It supports static and slideshow modes, persistent manual pause, reduced motion, document/viewport hiding, focus/hover suspension, inactive media suspension and inertness, editor block selection, unload and reload. Embedded videos load on playback only. New CSS is scoped to this component's data attribute; the separate Sub Banner consumer remains unreviewed and unchanged.

Source fixes restore mobile font overrides and breakpoint height settings previously defeated by inline values; hide-on-desktop no longer hides mobile content. Custom anchors are emitted verbatim, decorative images include dimensions and skip missing selections, slideshow dots appear only in slideshow mode, and blank CTA links no longer become hash links. Controls have 44px targets and visible focus. Existing default/preset settings and merchant data are preserved.

Focused validation in `validation/classic/` exercises actual Liquid, two independent instances, exact timer counts, persistent pause, inactive media, reduced motion, editor block selection/unload/reload, blank image/link states and deferred YouTube parameters. Phase 3 hero regression, structural/reference checks and CSS build accompany the fixture. The prior hero-media checkpoint retains the complete seven Phase 3/seven Phase 4 regression run. Structural source_commit is parent HEAD; source-hashes.json identifies the tested working-tree files.

**B2-CLASSIC live queue (OPEN):** 1440/1280/768/390/320px, all nine placement choices, tablet/mobile height and text overrides, contained/full width, long content and custom anchors. Test real MP4/YouTube/Vimeo, slideshow images/overlays/Ken Burns, pause/focus/hover/reduced-motion changes, visibility settings, editor block selection and add/remove/reorder. Real browser layout/media and assistive-technology acceptance remain outstanding. Keep PR draft.

Classic Theme Check: ImgWidthAndHeight 41→40; all other check totals unchanged. Existing diagnostics remain visible in the full report.


## Breadcrumb Banner and Special Offers checkpoint

Register totals: **450 primary components; 387 NOT REVIEWED, 62 REQUIRES LIVE VERIFICATION, one retained owner-review deletion candidate**. No new production asset: Special Offers reuses the existing video controller. Earlier counts are historical.

Breadcrumb Banner now resolves article context explicitly, builds the blog/article chain in both visible markup and JSON-LD, and resolves heading defaults from the actual page context. Titles are escaped in markup; literal less-than characters in JSON are escaped without changing parsed values. Custom anchor characters no longer determine CSS selectors, breadcrumb alignment uses the full row, and long text can wrap. The previously unused overlap setting now applies the same gated margin/padding contract as sibling banners. References to nonexistent panel settings were replaced with their existing fallback values. Blank button destinations are skipped and reduced-motion/focus rules are explicit. Existing saved headings remain untouched.

Special Offers now uses the disposable video controller with its own 768px visibility boundary; original Video Hero keeps its 750px boundary. Native autoplay is deferred, manual pause is available, and hidden/editor-removed media stops. Missing media has a dark fallback surface; custom anchors and accessible labels are escaped, and the split promo receives its editor attributes. Grid offset participates in document flow so positive offsets cannot push cards below the clipped section. The grid and split insertion presets now create their required promo blocks, with neutral copy and a valid primary collection link.

Focused actual-Liquid/DOM fixtures cover eight breadcrumb contexts across both presets, visible/structured-data agreement, article chains, escaped titles, custom anchors and overlap gating; all three Offers presets, promo counts/editor attributes, two independent videos, viewport hiding and unload/reload. Existing Video Hero regression also passes. Evidence is in `validation/context-offers/`; this is not browser or Shopify acceptance.

**B2-CONTEXT-OFFERS live queue (OPEN):** both components at 1440/1280/768/390/320px, long titles, localized page/product/collection/blog/article/cart/search contexts, all color/layout/spacing overrides and keyboard/screen-reader navigation. Breadcrumb: plain/media, overlap on/off with actual header, structured-data validation on rendered storefront URLs. Offers: hero/grid/split, zero/one/multiple promo blocks, both offset extremes, all width/ratio choices, real MP4/poster/image fallback, paused/reduced-motion/visibility states and real editor add/remove/reorder. Original Video Hero should retain its existing breakpoint behavior. Phase 4 remains unfinished and PR stays draft.

Context/Offers validation: structural/reference checks and CSS build pass. Theme Check totals are unchanged from Classic; existing debt remains in the full JSON. The package launcher stalled and was stopped; the installed Shopify CLI completed the recorded run. Structural source_commit identifies the parent HEAD, while source-hashes.json identifies the tested working-tree files.


## Boxed Content Banner checkpoint

Register totals: **450 primary components; 386 NOT REVIEWED, 63 REQUIRES LIVE VERIFICATION, one retained owner-review deletion candidate**. No production asset added. Batches 3–9 remain pending and the rest of Batch 2 is unfinished.

The unscoped h2 selector is now scoped to its section, and generic animation names are component-specific. Buttons no longer depend on animation to override a persistent zero-opacity base: reduced-motion users retain visible CTAs. The pop animation explicitly ends at full opacity, and keyboard focus reveals animated buttons immediately. All three layouts use the existing video controller for reduced-motion defaults, explicit play/pause and unload cleanup; selected images provide posters. Custom IDs are preserved, labels/links escaped, default insertion copy is neutral with a valid collection destination, and long content/controls can wrap. Existing layout families, full-bleed geometry and merchant settings are retained.

Validation in `validation/boxed/`: actual Liquid for card/boxed-background/panel, two instances, existing insertion preset, custom anchors, primary links, reduced-motion media, explicit play and unload, missing-video image fallback, empty media/CTA states, scoped CSS selectors/keyframes and visible animation endpoints. Inventory/schema, references and CSS build are recorded. The preceding context-offers checkpoint contains structural protection checks; this source-only follow-up has no JS asset or architectural change. Source hashes identify the tested files.

**B2-BOXED live queue (OPEN):** card/band/panel at 1440/1280/768/390/320px, container widths, full bleed, min-height/spacing/color overrides, long text, mobile vertical and CTA alignment, all banner/content/button animation choices including zero duration and pop, reduced motion and keyboard focus, actual MP4/poster, editor add/remove/reorder. Browser layout and live Shopify acceptance are not claimed. PR remains draft.

Boxed Content Theme Check completed with unchanged check totals from Context/Offers. Existing debt remains visible; no clean global lint claim.
