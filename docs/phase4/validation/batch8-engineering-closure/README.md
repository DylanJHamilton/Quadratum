# Formal Batch 8 engineering closure — 2026-09-22

**BATCH 8 ENGINEERING COMPLETE — READY FOR OWNER CHECKPOINT.** Local closure is complete; publication is pending because automatic approval review rejected the public-branch push. PR #22 remains DRAFT and Phase 4 remains active. Stop here: Batch 9, Atelier/Signal/Terrace application, roadmap Phase 5 and live Shopify QA have not begun.

## Scope and disposition

All **102 Theme Blocks plus 27 Family 8 dependencies** are individually reviewed. **128 REQUIRES LIVE VERIFICATION; one RETAINED — DORMANT SOURCE REVIEWED; zero NOT REVIEWED.** The dormant comment-only `snippets/qtm-content-block-wrapper-end.liquid` remains retained. No source-level Batch 8 defect remains unresolved in this engineering review.

`block-evidence-index.json` maps all 102 blocks to their existing individual setting/preset reviews. Their current schemas contain 5,617 setting IDs and 294 built-in presets. `family8-dependencies.json` retains all 27 dependency dispositions and consumer evidence. Existing cross-family controllers retain their ownership and have passing affected regressions.

Runtime source head: `34d1726151c91d9ea46bb797abbee41321f3e791`. The formal closure adds register/report/evidence reconciliation and the date-fixture correction only. The owner's GitHub starting head remains `d9e1fcdf2d074208d40675d5c50e5eecba32336b`. Final 11 blocks: **1,026 actual renders, 956 settings, 27 presets**, across proof/timeline, motion/counters and reviews/UGC checkpoints.

| Gate | Result |
|---|---|
| Full Phase 3/4 regression suite | All 111 pass: seven Phase 3 and 104 Phase 4; one timezone fixture corrected and rerun |
| Strict Shopify Liquid/HTML parser | All 117 Family 8 Liquid sources pass |
| Individual review coverage | All 129 dispositions justified; all 102 setting/preset evidence links present |
| Schema/reference/architecture | Pass; 150 sections, 102 blocks and protected builders/hosts retained |
| Source hashes | All 515 component hashes match |
| Merchant state | Unchanged; SHA-256 `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499` |
| Protected section files | All 150 byte-identical to Batch 7 closure |
| CSS build | Pass; compiled asset byte-identical to Batch 7 closure |
| Deleted files | Zero |
| Theme Check 4.8.0 | Exit 1, unsuppressed: 512 findings, three errors, 509 warnings |
| Family 8 Theme Check | Zero errors; 84 retained warnings |

`fixture-reconciliation.md` explains the timezone correction. Initial/intermediate failures and final passing evidence are preserved. No runtime source changed to satisfy the fixture. Every existing assertion remains.

## Theme Check movement

The final-group Theme Check result is reused for closure because runtime sources are identical; this is not represented as an additional CLI execution. It remains **512 / three errors / 509 warnings**, unchanged from the owner handoff. Across Batch 8, Batch 7 closure's 499 / five / 494 changed by +13 findings, -2 errors and +15 warnings. Helper-orphan diagnostics retain traced consumers and remain unsuppressed.

The remaining global errors are two image-dimension diagnostics in `sections/slideshow-banner.liquid` and a parser-blocking script filter in `layout/theme.liquid`. No Family 8 error remains, and unrelated sources were not changed to lower lint totals. `themecheck-comparison.json` contains exact positions and movement.

## Remaining engineering and acceptance

Global inventory: **515 components** — 461 live queued, 27 dormant/source-reviewed, one build-only reviewed, one retained owner-review deletion candidate, **25 NOT REVIEWED**. Those 25 are 17 Family 9 entries and eight Family 1 legacy/shared dependencies assigned to Batch 9 closure: seven `header-two-*` snippets and `q-nav`. Exact paths remain in `register-summary.json`. This checkpoint does not begin their review.

B8-FINAL carries forward every individual live queue: real native settings/product/collection/form/section-rendering/media contracts; both builders and nested layouts; 320–1440px, RTL, zoom, long content, no-JS, keyboard/AT/contrast; actual motion/media/reduced-motion behavior and Theme Editor lifecycle; and merchant-authored claims. The earlier batches' acceptance queues, 605 historical verification candidates and 7,830 icon visual-review entries remain separate. Live acceptance is scheduled after engineering batches. LiquidJS/JSDOM/adapters/static fixtures do not certify Shopify/browser acceptance.

## Publication and owner checkpoint

Read-only verification confirms PR #22 open and DRAFT, release branch at `d9e1fcdf2d074208d40675d5c50e5eecba32336b`, and main at `13d9e03010de46595e32e80144c17f76e1c36a39`.

Automatic approval review rejected the public-branch push, including a retry narrowed to the exact recovered commit after scope/signature checks, stating that trusted direct authorization for public source disclosure was missing. No alternate publication route was used. All work is committed locally; the replacement PR summary is prepared separately. Explicit owner authorization is needed to publish the closure to `release/v1-phase-4-component-hardening` and update PR #22 while retaining DRAFT. Re-fetch and reconcile before any future push; never reset or force-push.

Existing owner deletion/security-triage queues remain, with no new clearance claim. No main write, merge, production deployment, merchant-state rewrite or later-phase work occurred. Stop for the Batch 8 owner checkpoint.
