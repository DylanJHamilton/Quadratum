# Phase 5 — Account infrastructure

Status: ENGINEERING COMPLETE — READY FOR OWNER REVIEW. No unresolved source-level account defect remains in the reviewed scope. Live Shopify acceptance remains explicitly separate from these source, DOM and local-browser results.

Repository: DylanJHamilton/Quadratum
Branch: release/v1-phase-5-account-infrastructure
Baseline: d8e2c951d223cd8eac9c9b0adda26977856c405a

## Publication contract

Review, repair, test, commit, publish, verify the remote SHA for each checkpoint. Stop new engineering if publication fails. GitHub is the source of saved work. The command-line write credential is unavailable; checkpoints will use the connected GitHub Git Data API with non-forced fast-forward branch updates, followed by independent fetch verification.

## Checkpoints

- A: login / registration / recovery / reset / activation — published and independently verified at `2c8c90c5f488b1a1a1c41d9d4c91f57c090949c1`.
- B: dashboard / shared navigation — published and independently verified at `7f2ccd2506b556c0aa109c6209fbb32a20e45680`.
- C: orders / order detail / tracking — published and independently verified at `00d42554d305339dd9cd9410020724888b19b18d`.
- D: addresses — published and independently verified at `1b9c206866aab2feed10dd7b0a18557022127328`.
- E: cross-account assets / template mapping / final reconciliation — initial checkpoint published at `d005b5f428800a54b01033edbc75a6496bfda0e9`; this follow-up retains that work and adds the complete final regression/dependency inventory. The final remote SHA is supplied in the owner handoff after fetch verification; source hashes are recorded in validation/final/reconciliation.json.

## Account model

These customer Liquid templates implement legacy/classic customer accounts. Current Shopify Customer Accounts are hosted independently of themes; Liquid templates and account CSS/JS cannot customize their hosted screens. Native storefront account entry routes remain in place for either account model, but this is not a second implementation of hosted accounts. Existing legacy templates are retained per owner scope. Shopify deprecated legacy accounts on February 26, 2026: new stores and stores not already using them cannot enable them. Its notice says the final sunset date will be announced later in 2026. Removing legacy templates can trigger an account migration; this phase does not do that.

Shopify owns authentication, authorization, sessions/logout, token validity, CAPTCHA, email delivery and persisted customer/order/address data. This theme owns legacy presentation and progressive enhancement. Hosted-account customization belongs in Shopify's checkout/accounts branding tools and supported customer account extensions, not these Liquid templates. No account model was changed and no store configuration was queried or modified.

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

## Checkpoint E — reconciliation and closure

Checkpoint D remote verified: `1b9c206866aab2feed10dd7b0a18557022127328`. Its initial publication request encountered a transport error; engineering paused, the unchanged remote was checked, and publication was retried and independently fetched before this checkpoint began.

The pre-publication check found checkpoint E commit `d005b5f428800a54b01033edbc75a6496bfda0e9` newly published above D. Its source repairs, owner-review/dependency documents and validation are retained. Local additions were rebased onto it, then the combined account sources were retested before publication. No remote history was replaced. The retained corrections include opaque order badges/active filters on dark cards, logical auth error-list indentation, displayed-money search, quantity-summing fallback and removal of undocumented `line_item.variant_title` rendering; the historical purchased line-item title already carries the variant.

All 9 sections, 17 assets, 3 account snippets and 8 customer templates are dispositioned, plus the unchanged shared contrast helper: 38 register entries. This includes every one of the 35 original components. The native template map is complete; the added orders alternate makes the full-history section reachable. Optional tracking is intentionally merchant-placed. See [component register](component-register.csv), [dependency inventory](dependency-inventory.md) and the source hashes/dependency graph in [reconciliation evidence](validation/final/reconciliation.json).

Final repairs remove proven unused orders navigation/tracking-link rules, copied nonexistent auth helper selectors, a stale recovery visibility rule and file-number comments. Preserve all original filenames and setting IDs except the two unsupported remember-me controls. Tracking stage-color labels now describe static guidance. Browser accessibility auditing found and repaired activation-decline/address-delete contrast on dark cards by making their pale red background opaque.

Every account section setting has a source consumer, and every section-declared custom property has a CSS consumer. No unexplained account dependency remains. The inherited layout/token/base-style/form-handler/entry-link boundary was reviewed without changing global components. Native auth forms preserve Shopify's CAPTCHA contract through `content_for_header`; no cloned/programmatic auth submission or custom session service was introduced. Social sign-in information is explicitly a merchant note, not an integration. The unused global `QuadratumSettings.customer` export is documented as a Phase 6 boundary, not an account dependency.

### Final validation

| Check | Result | Evidence |
| --- | --- | --- |
| Strict Shopify Liquid parser | 21 Liquid files passed | validation/final/phase5-source.txt |
| Asset/snippet/section references; CSS/JS syntax; customer mapping | 38 files; 46 source references; 7 native + 1 alternate template passed | validation/final/phase5-source.txt |
| New account behavior scenarios | 56 passed: auth 13, dashboard/nav 7, orders/tracking 22, addresses 14 | validation/final/phase5-*.txt |
| Reused Phase 4 account regressions | 171 auth + 198 page cases passed | validation/final/phase4-account-*.txt |
| Broader retained source/DOM regressions | All 112 top-level Phase 3/4 suites passed | validation/final/regressions/results.json and per-suite logs |
| Local Chromium layout/source integration | 90 cases passed; 320/768/1440 widths, all 3 section layouts, RTL, dark cards, long data and maximum size settings; no visible horizontal overflow | validation/final/browser.json |
| Browser accessibility and focus | 18 axe audits: zero reported violations; 4 keyboard transitions passed; no script errors; native no-JS forms checked | validation/final/browser.json |
| Retained checkpoint E browser states | 54 enhanced data/error/dark-card cases with axe plus 9 no-JS cases; rerun against combined final source | validation/final/browser-states.json |
| Retained checkpoint E reconciliation | Asset/setting/style ownership; displayed-amount search; quantity fallback; historical order titles | validation/final/phase5-reconciliation.txt |
| Reconciliation | 35 original names retained; 37 owned components plus one direct shared dependency accounted for; no dead section setting references; protected scope unchanged | validation/final/reconciliation.json |
| Theme Check (Shopify CLI 4.8.0) | 0 errors, 509 warnings; baseline 0 errors, 509 warnings | validation/final/theme-check-summary.json and theme-check.json |
| Whitespace/scope | Passed with existing CRLF files respected; no protected file changes | git diff / reconciliation check |

Theme Check is not warning-free. The login excessive-settings warning was removed; the new safe-link helper adds an `OrphanedSnippet` false positive despite actual render consumers. The existing nav/recovery helpers receive the same false positive. Those three are the complete final account-specific warning set. References are proven independently by strict source, dependency and rendered behavior checks; no warning suppressions were added. Unrelated baseline warnings are outside this account phase. Warning comparison ignores source-row movements and compares path/check/severity/message.

Validation uses explicit Shopify form/filter/pagination fixtures, not Shopify servers. Local Chromium uses actual section Liquid/CSS/JS and inherited base styles with network requests blocked. Automated accessibility coverage is scoped to the rendered account content, not the entire storefront or all assistive technology. Nested historical Phase 3 closure and Phase 4 browser scripts are not included in the 112-suite count. Test commands and runtime versions are in [tests/phase5/README.md](../../tests/phase5/README.md).

Both browser suites were rerun against the combined final source: 153 cases and 72 axe audits with zero reported violations. Desktop dashboard and narrow dark-card address screenshots were also visually inspected; long address text wraps and controls remain within the viewport. Screenshots are reproducible intermediate checks, not storefront screenshots or live acceptance.

### Known live-QA items

- On an eligible existing legacy store, exercise registration/login/logout, invalid credentials, recovery email, valid/expired reset and activation tokens, decline and CAPTCHA/challenge return. Confirm Shopify's actual error/success responses and redirects.
- Confirm native locale-aware account routes, `?view=orders` rendering and pagination query preservation with more than one page of orders/addresses. Exercise empty, paid, refunded, cancelled, partial and multiple-fulfillment data.
- Save real address create/edit/delete/default operations; verify country/province localization, default replacement, returned errors and more than 20 addresses. No address mutation was performed in this phase.
- Check selected merchant fonts/colors, translations, RTL, long real data, mobile Safari/Firefox, zoom and screen-reader announcements. Existing English UI fallbacks and merchant text remain; RTL layout testing does not certify translations.
- If tracking is enabled, choose a provider that accepts the documented URL contract and verify its redirect/results independently. The theme has no carrier status API. No provider was contacted or configured.
- Confirm account entry links on the owner's actual account model. Hosted Customer Accounts bypass these legacy templates; their branding/extensions need their own acceptance.

### Deferred scope and owner decisions

No unresolved account source defect is deferred. Live platform acceptance above remains required before store rollout. Demo-store QA, global readability work, Phase 6 Theme Settings (including unused global customer exports), unrelated baseline Theme Check warnings, new social/carrier integrations and hosted-account extension development were not started.

The owner must decide the deployment account model and migration plan: retain these screens only for stores still eligible for legacy accounts, or use Shopify-hosted Customer Accounts and separately scope supported branding/extensions. Shopify's deprecation makes that a deployment decision; this theme cannot enable legacy accounts on an ineligible store. Optional tracking also needs a selected provider or can remain disabled. Neither decision requires changing the reviewed source to hand this branch over.

For Theme Store distribution, Shopify's July 30, 2026 requirement additionally mandates the `shopify-account` header component on desktop/mobile. The retained headers do not include it. Owner action: separately scope current-account header adoption before Theme Store submission. This legacy infrastructure closure does not certify Theme Store submission readiness. That architectural header adoption and account migration remain outside the protected scope here; see [owner acceptance](owner-review.md) and [platform dependency summary](dependency-map.md).

No merge, main write, template removal, config/settings_data.json change, global Theme Settings rewrite or unrelated header/footer modification occurred. All checkpoint work is published to the specified release branch; the final handoff supplies the independently verified remote SHA. Phase 5 engineering stops here.

CAPTCHA boundary source checked 2026-09-23: https://shopify.dev/docs/storefronts/themes/trust-security/captcha

Theme Store account-component requirement checked 2026-09-23: https://shopify.dev/changelog/the-shopify-account-component-for-customer-accounts-is-now-a-theme-store-requirement
