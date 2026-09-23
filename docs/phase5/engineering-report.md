# Phase 5 — Account infrastructure

Status: OPEN. No component is approved merely from Phase 4 evidence.

Repository: DylanJHamilton/Quadratum
Branch: release/v1-phase-5-account-infrastructure
Baseline: d8e2c951d223cd8eac9c9b0adda26977856c405a

## Publication contract

Review, repair, test, commit, publish, verify the remote SHA for each checkpoint. Stop new engineering if publication fails. GitHub is the source of saved work. The command-line write credential is unavailable; checkpoints will use the connected GitHub Git Data API with non-forced fast-forward branch updates, followed by independent fetch verification.

## Checkpoints

- A: login / registration / recovery / reset / activation — engineering verified; checkpoint A publication.
- B: dashboard / shared navigation — pending.
- C: orders / order detail / tracking — pending.
- D: addresses — pending.
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

Validation: 171 reused Phase 4 auth cases (two setting permutations retired with remember_me), 198 reused account-page cases, 13 new auth scenarios, 36-file strict source/reference/template/CSS/JS validation. Baseline had zero Theme Check errors and 609 warnings; full comparison runs at reconciliation. No auth endpoint, email, CAPTCHA, activation token, expired token or screen-reader certification is claimed from fixtures.

Naming retained: account-main-account.css is the login stylesheet, not a global account bundle; the recovery snippet is a real native form despite its historic placeholder suffix. Neither is orphaned. Preserve names for compatibility.
