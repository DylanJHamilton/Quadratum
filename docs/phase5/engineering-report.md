# Phase 5 — Account infrastructure

Status: OPEN. No component is approved merely from Phase 4 evidence.

Repository: DylanJHamilton/Quadratum
Branch: release/v1-phase-5-account-infrastructure
Baseline: d8e2c951d223cd8eac9c9b0adda26977856c405a

## Publication contract

Review, repair, test, commit, publish, verify the remote SHA for each checkpoint. Stop new engineering if publication fails. GitHub is the source of saved work. The command-line write credential is unavailable; checkpoints will use the connected GitHub Git Data API with non-forced fast-forward branch updates, followed by independent fetch verification.

## Checkpoints

- A: login / registration / recovery / reset / activation — pending.
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
