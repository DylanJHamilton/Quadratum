# Batch 3 closure / Batch 4 shared-card opening

Source and fixture evidence only. Shopify storefront/editor acceptance is queued after Batches 4–9 engineering, per owner instruction. PR #22 remains draft.

- `suite-summary.json` and `regressions.txt`: all seven Phase 3 and 33 Phase 4 suites passed. `blog-discovery-final.txt` and `collection-hosts-final.txt` rerun the affected suites after final settings/attribute/CSS repairs. The Liquid tests supply explicit Shopify-shaped globals and already-paginated arrays; DOM fixtures are not browser certification.
- `structural.json`, `references.json`, `inventory.json`: schema/reference checks, 150 sections, 102 Theme Blocks, both builders/protected architecture, no unauthorized deletion, unchanged merchant-state hash.
- `source-hashes.json`: reviewed runtime sources for this checkpoint. `component-register.csv` contains the authoritative per-file dispositions/hashes; 461 entries, 315 not reviewed, 124 live queued, 20 retained dormant, one build-only, one deletion candidate pending owner review. No deletion is approved by this evidence.
- `register-summary.json`: all 42 Batch 3 entries have source dispositions: 27 live queued and 15 dormant retained. Shared Product Card opens Batch 4; its remaining product hosts retain their individual reviews.
- `consumer-trace.json`: literal consumers plus dynamic legacy controller → Quick View/shared native controller edges. No active legacy root loader found; existing merchant custom code and future activations require host acceptance. No orphan is inferred to be disposable.
- `css-build.txt`: CSS build passed; `git diff --check` passed. CSS source tests parse the four collection stylesheets.
- `themecheck.json`, `themecheck-movement.json`: Shopify CLI 4.8.0, exit 1 with existing debt retained. 670 diagnostics (37 errors / 633 warnings), down from 684 (46 / 638). No new error signatures. Eight missing-image-dimension errors and Classic's script parse error are removed. Classic's 115-setting warning becomes visible after parse repair; Blog Collection's existing warning changes from 56 to 57 settings. Two new helpers report orphan warnings despite real render consumers. Diagnostics were not suppressed.

The legacy selection tray exposes native links to selected products; it does not claim side-by-side comparison. Protected Quick View remains retained and inactive until a real host is reviewed. The shared active drawer/pagination controller and legacy adapter have distinct responsibilities and legacy JS/CSS excludes Main Collection Simple.

Live queues and settings limitations are listed in the final checkpoint of `../../engineering-report.md`: B3-BLOG, B3-COLLECTION, B3-SEARCH and B4-CARD, plus all prior queued acceptance. Live cart, localization/currencies, browser layout/accessibility, theme-editor behavior and future legacy activation are not certified here.
