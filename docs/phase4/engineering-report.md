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
| 2 Hero / Banner / CTA | Pending |
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
