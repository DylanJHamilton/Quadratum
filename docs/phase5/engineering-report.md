# Phase 5 — Account infrastructure

Status: PHASE 5 ACCOUNT INFRASTRUCTURE ENGINEERING COMPLETE — READY FOR OWNER REVIEW. Owner live acceptance and account-model release decisions remain explicitly separate. No merge or Phase 6 work is included.

Repository: DylanJHamilton/Quadratum
Branch: release/v1-phase-5-account-infrastructure
Baseline: d8e2c951d223cd8eac9c9b0adda26977856c405a

## Publication contract

Review, repair, test, commit, publish, verify the remote SHA for each checkpoint. Stop new engineering if publication fails. GitHub is the source of saved work. Checkpoints use the connected GitHub Git Data API with non-forced fast-forward branch updates, followed by independent remote SHA and source-tree verification.

## Checkpoints

- A: login / registration / recovery / reset / activation — published and remote verified at `2c8c90c5f488b1a1a1c41d9d4c91f57c090949c1`.
- B: dashboard / shared navigation — published and remote verified at `7f2ccd2506b556c0aa109c6209fbb32a20e45680`.
- C: orders / order detail / tracking — published and remote verified at `00d42554d305339dd9cd9410020724888b19b18d`.
- D: addresses — published and remote verified at `1b9c206866aab2feed10dd7b0a18557022127328`.
- E: cross-account assets / template mapping / final reconciliation — closure checkpoint containing this report; final remote SHA is returned in the owner handoff. Reviewed component blob SHAs are recorded in `validation/checkpoint-e/source-manifest.json`.

## Account model

These customer Liquid templates implement legacy customer accounts. Current Shopify Customer Accounts are hosted independently of themes; Liquid templates and account CSS/JS cannot customize their hosted screens. Existing legacy templates are retained per owner scope. The current Shopify deprecation notice says new stores and stores not already using legacy accounts cannot enable legacy accounts. Removing legacy templates can trigger an account migration; this phase must not do that.

Sources checked 2026-09-23:
- https://shopify.dev/changelog/legacy-customer-accounts-are-deprecated
- https://shopify.dev/docs/storefronts/themes/architecture/templates
- https://shopify.dev/docs/apps/build/customer-accounts

## Prior evidence

Reuse tests/phase4/account-auth.cjs, tests/phase4/account-pages.cjs and docs/phase4/validation/batch7-account-{auth,pages}/. Fixture adapters do not certify Shopify endpoints, pagination, email delivery, CAPTCHA, browser pixels or assistive technology.

## Protected scope

No main writes, merging, settings_data.json changes, unrelated Phase 4 modifications, Phase 6 or demo-store work.

## Checkpoint A — authentication

Reviewed each login, register, activate and reset section, the recovery snippet, eight auth CSS/JS files and their four native customer template mappings. Reviewed contrast-text as their shared direct dependency.

Repairs:
- Preserve escaped login/recovery email values on Shopify validation responses; never repopulate passwords.
- Focus native error/success summaries, including when password visibility is disabled. Retain native browser required/email validation and Shopify server validation; activation decline retains formnovalidate.
- Handle recovery hash changes and scoped recovery IDs; unload removes listeners, restores native visible forms and re-hides enhancement controls.
- Login/register render account/logout links for an already authenticated customer. Activation/reset remain token-route flows and are not gated by the customer object.
- Remove the unimplemented remember_me checkbox and its two schema settings. Stored merchant configuration is untouched; obsolete values have no effect. Shopify owns session duration. Remove its unused CSS.
- Repair password-toggle colors against the white input surface on dark merchant cards.
- Expand compressed auth controllers into named lifecycle/visibility functions. Existing asset names, selectors and standalone boot behavior are retained. Similar small visibility routines remain intentionally independent to avoid a new script-order dependency.

Validation: 171 reused Phase 4 auth cases (two setting permutations retired with remember_me), 198 reused account-page cases, 13 new auth scenarios, 36-file strict source/reference/template/CSS/JS validation. Baseline had zero Theme Check errors and 509 warnings; full comparison runs at reconciliation. No auth endpoint, email, CAPTCHA, activation token, expired token or screen-reader certification is claimed from fixtures.

Naming retained: account-main-account.css is the login stylesheet, not a global account bundle; the recovery snippet is a real native form despite its historic placeholder suffix. Neither is orphaned. Preserve names for compatibility.

## Checkpoint B — dashboard and shared navigation

Checkpoint A remote verified: `2c8c90c5f488b1a1a1c41d9d4c91f57c090949c1`.

Reviewed dashboard section/CSS, shared nav snippet/CSS, account template and the newly added `customers/account.orders.liquid` alternate template. The full orders section previously had no template consumer; Orders duplicated the Dashboard destination. Default shared Orders navigation now uses the locale-aware account route with `?view=orders`, which renders the existing full-history section. Explicit merchant Orders URLs remain supported. This applies to legacy theme routes; newer hosted accounts bypass these templates.

Dashboard keeps a bounded recent-order preview and links to full history; removes competing preview pagination. Greeting no longer silently depends on nonblank subheading when customer-name display is enabled. Corrects the block container for Shopify format_address HTML, logical RTL table alignment and card-link contrast. Removes proven unused pre-shared-nav CSS. Shared nav renders one captured list for horizontal/sidebar/compact modes, preserving keyboard-native details/summary, labels, active state and 44px targets without JavaScript.

Validation: strict source and reference checks, 7 new dashboard/nav scenarios, all 198 account-page regressions. Live QA: alternate-template routing and pagination query preservation, real long customer/address text, card/table semantics with assistive technology and merchant colors. Full orders flow receives independent review at checkpoint C.

Alternate-template contract: https://shopify.dev/docs/storefronts/themes/architecture/templates/alternate-templates (checked 2026-09-23).

## Checkpoint C — orders, detail and tracking

Checkpoint B remote verified: `7f2ccd2506b556c0aa109c6209fbb32a20e45680`.

Independently reviewed the orders, order-detail and tracking sections, their three stylesheets and two controllers, and the native order template. Completed full-history navigation, including default detail back-links. Existing native pagination stays server rendered; search/filter/sort are explicitly limited to the current page. Table/cards share exact status tokens and are counted once. Unloading restores original row/card order and visibility; no hidden request or full-history-search claim exists.

Order detail keeps Shopify order amounts and labels, discounts as an informational already-included amount, private line-item properties hidden, escaped customer/product metadata, absent-address fallbacks and native fulfillment links. Removes the undocumented total_tax fallback; tax_price is the documented contract. Multiple native tracking numbers are displayed without inventing per-number carrier URLs. A signed-in missing-order state links to Orders rather than asking that customer to sign in again. New account-safe-link filters native fulfillment/status links to web/store-relative URLs and rejects script/data/protocol-relative/credential/control-character targets.

Tracking architecture is a configured client-side redirect plus static guidance. It performs no carrier/API call, order-number authentication, lookup or shipment-status inference. No private keys, tokens or browser storage. Native fulfillment data is displayed on order detail, not looked up on this page. The tracking section is an optional merchant-placed section with a preset, not a native Shopify customer route. Blank/invalid provider or no JavaScript leaves confirmation/account/support guidance visible; the lookup form remains hidden. Public-page guests receive sign-in navigation, not Logout.

Tracking controller now has named URL validation, submission and cleanup functions. HTTPS or store-relative destinations only; credentials, control characters, host placeholders and unknown placeholders are rejected. Values are encoded and may be inserted into path/query/fragment; omitted placeholders use order/email/tracking query parameters. The destination origin must match the validated configuration. Providers must accept this exact URL contract; sending data in a URL is inherent to this configured redirect and is documented in merchant settings. API-ready/QuadratumLink comment claims and obsolete simulated-status CSS removed. No real status timeline is implied. Historic JS name account-main-order-tracking.js is retained and wired correctly.

Validation: 22 new orders/tracking scenarios, all 198 prior page cases, strict Liquid/reference/template/CSS/JS checks. RTL alignment repaired locally. Live QA: actual Shopify order pagination preserves view=orders, paid/refunded/cancelled/partial orders, multi-shipment native links, large histories, localized data, provider acceptance/redirect and assistive technology. No external provider has been configured or contacted.

Object contracts checked 2026-09-23:
- https://shopify.dev/docs/api/liquid/objects/order
- https://shopify.dev/docs/api/liquid/objects/line_item
- https://shopify.dev/docs/api/liquid/objects/fulfillment

## Checkpoint D — addresses

Checkpoint C remote verified: `00d42554d305339dd9cd9410020724888b19b18d`.

Independently reviewed the address section, stylesheet, controller and customer address template. Native customer_address forms create/edit addresses and set defaults while preserving every address field. Delete remains a native locale-aware POST with _method=delete, enhanced by scoped confirmation. There is no fake saved-success state: Shopify documents customer_address form.posted_successfully? as always true, so it cannot certify a successful operation.

Repairs: complete Orders navigation; add error rendering for the set-default form; country-name autocomplete. Refactor the compressed controller into named country enhancement, panel and cleanup functions. Generated province selects retain error/label/required attributes, preserve rejected values, clear stale province when the country changes, use a blank choice rather than silently selecting the first province, and restore the saved country/province on native reset. Countries without provinces omit that field from submission; missing/malformed metadata preserves a text input. Metadata is resolved from the selected index and native country value, including the duplicated no-JS saved-country option. Keyboard Escape/Close returns focus to the opener; returned server errors stay open and receive focus. Unload aborts listeners, removes generated selects and restores complete native forms. Unused legacy navigation CSS and a duplicate declaration removed.

Validation: 14 new address scenarios (native field/default/delete contracts, country transitions/reset, keyboard focus, error associations, no-JS and lifecycle), all 198 account-page regressions, strict source/reference checks. Owner live acceptance remains required for actual saved create/edit/delete/default outcomes, server validation, countries/provinces supplied by Shopify, more than 20 addresses, keyboard/AT and localized address formatting. Source tests never submit an address to a store.

Native form contract: https://shopify.dev/docs/api/liquid/tags/form#form-customer_address
Form status limitation: https://shopify.dev/docs/api/liquid/objects/form#form-posted_successfully


## Checkpoint E — final reconciliation

Checkpoint D remote verified: `1b9c206866aab2feed10dd7b0a18557022127328`. The final review resumed from the remotely published A–D checkpoints, preserving that work, and used an isolated checkout to avoid competing edits.

All **38 account source components** have explicit dispositions: nine sections, 17 existing account assets, four snippets (two original plus contrast-text and account-safe-link), and eight customer templates (seven original plus the full-history alternate). There are no NOT REVIEWED components, unexplained account assets or missing direct references. See `component-register.csv` and `dependency-map.md` for the full ownership/route record. No customer template or asset was renamed or removed.

Final repairs based on independent reconciliation:
- Browser checks exposed nine dark-card contrast failures across three viewport/direction combinations. Activation decline, address deletion and active order filters now use stable readable surfaces; fallback order badges are also readable for less common financial/fulfillment states.
- Remove the remaining unused old Orders navigation CSS, keep shared navigation as its sole presentation owner, and use logical padding for authentication error lists in RTL.
- Order search now includes the customer-visible formatted price as well as native raw values. Its fallback item count sums quantities rather than counting distinct lines.
- Remove undocumented `line_item.variant_title`. The native `line_item.title` retains the purchased product/variant title, even after a product is edited or deleted; consulting the current variant would misrepresent historical purchases.
- Reconcile every account asset/snippet/section reference and every original/alternate template. Check schema and CSS-variable consumers. Preserve historical asset/snippet names with documented ownership rather than adding aliases or renames.

### Validation and evidence

All eleven relevant source/fixture suites pass: six Phase 5 suites (strict source, authentication, dashboard/nav, orders/tracking, addresses, final reconciliation), both reused Phase 4 account suites, and layout/head, delivery and five-header lifecycle regressions. This includes **425 account scenarios** from the two reused account suites and the four new flow suites. Counts are fixture assertions/scenarios, not live-store acceptance claims.

Strict validation covers **38 files, 21 Shopify Liquid parses, 46 asset/snippet/section references and eight customer-template mappings**, plus CSS parsing, JS syntax, settings consumers and SHA evidence. Rendered source exercises native form types/field names, error and guest states, escaping, page-local sorting/filtering, URL rejection, duplicate boot, isolated instances, unloading/reloading, address metadata/reset/default/delete contracts and truthful tracking handoff.

**63 local Chromium fixtures pass**: 54 enhanced cases spanning all nine account sections at 320/768/1440px, LTR/RTL, default/dark cards, long data and authentication errors; nine no-JS cases confirm native forms remain available and inert enhancement controls stay hidden. No runtime errors, document overflow or axe WCAG A/AA violations occurred in the tested fixtures. Keyboard entry/Escape/focus return was exercised in the browser. CSS came from the account assets plus actual global theme CSS/tokens; Shopify forms/data/pagination/date formatting were explicit local adapters. Representative mobile and desktop screenshots were visually inspected. These are source/browser checks, not a claim of Shopify endpoint or manual assistive-technology certification.

Theme Check (Shopify CLI 4.8.0): **zero errors, 509 warnings**, versus zero errors and 509 warnings at the exact Phase 4 baseline. One excessive-settings warning was removed with the two unimplemented remember-me controls. One new OrphanedSnippet warning flags account-safe-link, despite two explicit order-section consumers; the same checker also flags the existing live recovery and shared-nav snippets. Direct reference tests and `dependency-map.md` reconcile these warnings. The other 508 warnings are inherited; no unrelated warning cleanup or suppression was performed. Full normalized diagnostics and a baseline delta are in `validation/checkpoint-e/`.

`config/settings_data.json`, global Theme Settings, headers/footers and unrelated Phase 4 components remain unchanged. Main is verified against the supplied baseline before and after publication. The final fast-forward checkpoint publishes code, tests, component register and all validation evidence together.

### Boundaries, deferred items and owner decisions

No known source-level defect remains in the reviewed legacy account scope. Actual Shopify authentication/emails/CAPTCHA/tokens, server authorization and persistence, real pagination/alternate-template routing, merchant/provider configuration and manual screen-reader acceptance remain owner live-QA items, enumerated in `owner-review.md`.

The architecture is native legacy Shopify forms and customer/order drops with progressive client enhancements. Tracking is a merchant-configured redirect plus native fulfillment/status links on order detail. No carrier API, authenticated tracking lookup, live status timeline or backend service was implemented or implied.

Current Shopify Customer Accounts bypass these theme-controlled screens. Shopify deprecated legacy accounts in February 2026 and requires the `shopify-account` header component for Theme Store submissions as of July 30, 2026. This repository does not yet contain that component. **Owner decision: scope current-account header adoption before Theme Store submission, and choose whether any account extensions/migration are needed.** This closure certifies the requested legacy infrastructure engineering, not Theme Store submission readiness or customization of hosted accounts. Removing existing templates to force migration was deliberately excluded.

The optional tracking provider/page is also an owner configuration decision. No integration provider is assumed. Global readability work, Phase 6 Theme Settings, demo stores, account migration and hosted-account extensions remain deferred. Nothing is merged or deployed to a store.
