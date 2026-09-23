# Phase 5 — Account infrastructure

Status: OPEN. No component is approved merely from Phase 4 evidence.

Repository: DylanJHamilton/Quadratum
Branch: release/v1-phase-5-account-infrastructure
Baseline: d8e2c951d223cd8eac9c9b0adda26977856c405a

## Publication contract

Review, repair, test, commit, publish, verify the remote SHA for each checkpoint. Stop new engineering if publication fails. GitHub is the source of saved work. The command-line write credential is unavailable; checkpoints will use the connected GitHub Git Data API with non-forced fast-forward branch updates, followed by independent fetch verification.

## Checkpoints

- A: login / registration / recovery / reset / activation — engineering verified; checkpoint A publication.
- B: dashboard / shared navigation — engineering verified; checkpoint B publication.
- C: orders / order detail / tracking — engineering verified; checkpoint C publication.
- D: addresses — engineering verified; checkpoint D publication.
- E: cross-account assets / template mapping / final reconciliation — pending.

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
