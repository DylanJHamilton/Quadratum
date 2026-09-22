# Batch 9 checkpoint B — deferred navigation closure

Checkpoint A is remotely saved at `6c640a26941fa295cac0f47c6d46b9883b11fb04`. This checkpoint dispositions the remaining four deferred Family 1 snippets and makes one bounded repair to their already-reviewed active Header Two controller. All eight deferred dependencies now have individual dispositions; Family 1 has zero NOT REVIEWED entries.

| Component | Consumers / ownership | Disposition and source assessment |
|---|---|---|
| `header-two-mega-menu` | No runtime root; obsolete native-linklist/mega-block matching, unrelated to V2 block-built navigation | DORMANT, retained owner-review deletion candidate. Native links/escaped labels, guarded images and section/index IDs exist, but hidden menus have no matching `data-qh2-menu-*` controller/CSS. Legacy promo rich text, URL attributes, focus/keyboard/editor selection and breakpoint behavior need re-review before activation. No missing active navigation is repaired by connecting it. |
| `header-two-mobile-menu` | No caller; references legacy logo and the active shared static search helper | DORMANT, retained owner-review deletion candidate. Section/index IDs and labelled controls exist; absent `data-qh2-drawer` / `data-header-two-mobile-*` controller leaves it hidden. Focus containment/return, Escape, submenu state, system-action handoff and responsive styles have no runtime owner. Popup-disabled fallback and unescaped placeholder/URL output require preactivation review. |
| `header-two-search` | Only dormant actions; delegates inline search to `search-form-static` and popup to existing global hook | DORMANT, retained owner-review deletion candidate. Popup-disabled mode correctly falls back to search page; inline IDs/context must be supplied by a future caller. No independent listeners or lifecycle. Existing active header/search implementations already own these contracts. |
| `q-nav` | No consumers, CSS owner or runtime enhancer; only its own commented usage example | DORMANT, retained owner-review deletion candidate. Native list/link structure, escaped href/ID and active matching exist. Empty-state `break` outside a loop is not a safe snippet-return contract; raw title/label/class/data-attribute arguments and absent semantic current-location output need review before use. Its commented JSON construction suggestion is not an established consumer contract. Do not wire it into existing TOCs. |

Reference proof includes every retained section/block/snippet/layout/template/config path, build inputs and nonliteral app-block renders. Tailwind scanning is not runtime activation. Merchant custom Liquid beyond this repository cannot be excluded, so no deletion is automatic. These explicit preactivation liabilities do not block testing the retained active theme.

## Active Header Two lifecycle repair

Inspection of the actual consumer implementation found document listeners incorrectly registered inside `setOpenButtons`. Twelve open/close cycles added **48** document listeners. Registration now occurs once per header lifecycle. The old-media-query fallback now removes its listener on unload; a pending sticky animation frame is cancelled and transient sticky state is cleared on unload. No setting, schema, markup, navigation design or ownership changed.

`batch9-header-lifecycle.cjs` renders two actual Header Two presets and executes the production controller. The saved before fixture fails on listener accumulation; after passes repeated drawer cycles, duplicate boot/reload, independent instances, focus/return/Escape, rapid reopening, legacy media-query cleanup and sticky-frame cancellation. Existing Headers 1–5 and actual header/footer preset suites also pass. Four strict native Liquid/HTML parses pass for the dormant sources. Live Shopify/geometry/AT verification remains in B1's queue.

Global register: **17 NOT REVIEWED** remain, all Family 9. No section/block deletion or merchant-state change. PR #22 remains draft.
