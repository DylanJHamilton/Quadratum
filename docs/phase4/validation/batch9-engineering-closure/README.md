# FORMAL PHASE 4 — BATCH 9 ENGINEERING CLOSURE

**BATCH 9 ENGINEERING COMPLETE — READY FOR OWNER CHECKPOINT.** PR #22 stays DRAFT. This closes component engineering, not live Shopify acceptance.

All runtime repairs were published and verified at `6109054abec9113df43e89032735fb6fe2b7bba0` before this closure reconciliation. The containing commit is the formal closure commit; PR #22 records its final verified remote SHA. Each checkpoint used a non-force update of `release/v1-phase-4-component-hardening`, matched the local Git tree exactly, and verified the remote head plus PR open/draft/unmerged state. No additional remote branch was created.

## Final dispositions

| Scope | Live verification queued | Retained dormant/source-reviewed | Build-only reviewed | Retained deletion candidates | NOT REVIEWED |
|---|---:|---:|---:|---:|---:|
| Batch 9 — 17 assets/helpers | 9 | 1 | 1 | 6 | 0 |
| Deferred Batch 1 — 8 snippets | 0 | 0 | 0 | 8 | 0 |
| Entire Phase 4 — 515 components | 470 | 28 | 2 | 15 | 0 |

The nine active Batch 9 entries include two generated assets: deployed `icons.svg` and compiled `theme.css`. All dormant candidates remain present. Eight legacy header dependencies, three unused helper implementations, duplicate quadratum tokens and two obsolete slideshow assets account for 14 new candidates; the existing Header Basic candidate makes 15 globally. See [the exact retained list](deletion-candidates.md). Architectural deletion needs owner review. Dormant source liabilities are documented individually; they are not approved for activation.

The register's current **Final Disposition** column governs these counts. Earlier statements in historical checkpoint notes remain historical and do not reopen entries.

## Repairs and deliberate retention

- **Header Two:** moved repeated drawer document-listener registration into the per-header lifecycle; removed legacy media-query subscriptions and cancelled pending sticky frames on unload. An actual two-preset stress fixture reproduced 48 extra registrations before repair and passes after.
- **Contrast and tokens:** preserved canonical `background` while accepting existing `bg` callers; all 41 actual helper calls are exercised. Connected existing global stylesheet tokens to canonical schema-backed values, including zero/min/max choices.
- **Base/global CSS:** use real font/palette owners, preserve component text color/rhythm and link hover color, honor uppercase settings, and respect small configured mobile heading sizes. Existing CSS architecture and loading order remain.
- **Delivery:** remove the duplicate playground compiled-stylesheet link; defer Quick View after its existing host; give both actual slideshow image branches their selected image's intrinsic dimensions, including mobile-only fallback. No invented dimensions or lint suppression.
- **Stable/generated assets:** preserve all sprite/image bytes and the minified stylesheet. CSS rebuild reproduces the saved output. The historical sprite exporters lack their input packs; they were not run. Reproducible future icon regeneration requires restoring/validating those sources, not replacing the current valid sprite during this batch.

Exactly eight runtime/source paths changed; see `runtime-changes.json`. No settings schema, preset or merchant-state change. No feature rollout or readability pass.

## Validation

| Gate | Result / evidence |
|---|---|
| Full Phase 3/4 regressions | **115/115 PASS** — seven Phase 3, 108 Phase 4; zero failures. `suite-summary.json`, `regressions.txt` |
| Strict native Liquid/HTML parsing | **19/19 PASS** — every scoped Liquid source plus adjacent modified layout/template/slideshow. `native-parse.json` |
| Schema, references, JS and architecture | PASS. `static-check.json`, `reference-audit.json`, `inventory.json` |
| Source integrity | **515/515 hashes match**. `source-hashes.json` |
| CSS build | PASS; saved/generated SHA-256 `e95c623df26ff2eff84bf749f025593fc667e4b71419c898b5e0987c5a0c8f16`. E's `build-integrity.json` records actual versions/output |
| Theme Check 4.8.0 | **509 findings, zero errors, 509 warnings; exit 0**, unsuppressed. Baseline 512 / three / 509. `themecheck-summary.json` points to E's fresh complete execution; runtime is unchanged, so this is explicitly reuse, not another execution |
| Sprite and fallback SVG | Valid XML, no duplicate IDs/scripts/event attributes/external resources; deployed sprite has **6,831** unique nonempty symbols. D's `svg-integrity.json` |
| Protected structure | **150 sections, 102 blocks**; all five Main Product hosts, Quick View, Headers/Footers 1–5, both builders and row/column chains preserved |
| Protected bytes | All 102 blocks and 149 sections byte-identical to the Batch 9 start; only the three-line slideshow dimension repair changed a section. `protected-state.json` |
| Merchant state | Unchanged: `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499` |
| Deleted files / main writes / merges / deployments | **Zero** |

Per-component inputs, direct/transitive consumers, build-only scans, dynamic app-block checks, absent consumers, accessibility, responsive and lifecycle limits remain in A–E and `all25-dispositions.json` / `all25-consumers.json`. Preserved before failures are explicit regression evidence, not current failures. The three inherited Theme Check errors are fixed; the unchanged complexity warning's reported line moved with the dimension insertion.

## Remaining acceptance and owner decisions

**470 current components** still require live verification. Their existing individual queues remain authoritative: native product/collection/settings drops, forms/checkout, actual saved merchant configurations, both builders, media/providers, editor add/remove/reorder/unload, keyboard/AT/contrast, no-JS/reduced motion and 320/390/768/1280/1440px plus RTL/zoom/long content. This batch adds explicit emphasis on configured typography/palette/spacing, nested foreground colors, normal/password cascade, deferred Quick View and selected-image dimensions. Source fixes can visibly restore settings previously masked by CSS fallback values; no saved value was rewritten.

The **605 historical verification candidates** and **7,830 individual icon visual-review entries** remain separate queues. They overlap other work and are not added together as a count of distinct tests. Static/LiquidJS/JSDOM/color-adapter checks are not live Shopify certification.

No additional active engineering blocker was identified as required before owner-led live testing within this authorized scope. Retain dormant candidates without activating them; future reuse requires their documented repairs and re-review. Owner deletion decisions, the 509 warnings, historical checksum/security-scan triage and eventual live acceptance remain open. No new security/CI clearance is claimed. Restoring sprite generator inputs is necessary only before a future regeneration, not to test the current shipped asset.

## Published checkpoints and stop

| Checkpoint | Verified remote SHA |
|---|---|
| A — header controls | `6c640a26941fa295cac0f47c6d46b9883b11fb04` |
| B — header navigation/lifecycle | `9d828a933d540925411326f22f248a28d6195f0b` |
| C — shared helpers | `2a7aa9f95d2610f6c71e36c82bd9ad38983a4a9f` |
| D — base/static assets | `46e40f93fce2ada7a59fd717ba56b4cbb3774596` |
| E — delivery/build runtime closure | `6109054abec9113df43e89032735fb6fe2b7bba0` |

**STOP AFTER THIS OWNER CHECKPOINT.** PR #22 remains open, DRAFT and unmerged; main remains `13d9e03010de46595e32e80144c17f76e1c36a39`. No Atelier/Signal/Terrace application, source maintainability/readability refactor, live Shopify QA or roadmap Phase 5 has begun. Await the owner's next instruction.
