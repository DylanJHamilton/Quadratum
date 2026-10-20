# QUADRATUM V1 — ULTIMA Launch Program

**Started:** 2026-10-15  
**Baseline main:** `a2af1499177a83af6753795648fc286020fb2af3`  
**Working branch:** `release/v1-ultima-launch-20261015`  
**Proposed Shopify Theme Store price:** $440 USD, one license per merchant store  
**Status:** Architecture and preliminary repository audit; not yet release-ready

## Mission

Turn the separate Quadratum development demos into one technically coherent, polished and strongly branded V1 release. Fix reusable defects found in the demos, deliver page/template-level transparent versus solid headers, build the ULTIMA capabilities gallery and prepare a clean Shopify Theme Store submission.

ULTIMA is the **master showcase**, not a license to transplant demo-specific data and branding into every merchant install. The official install package must remain a clean, configurable theme. Shopify store data—products, collections, pages, articles, menus, media and metaobjects—must be handled in Shopify or via explicit seed/import procedures rather than assumed to exist in a theme ZIP.

## Launch architecture

- **Core theme:** shared, merchant-neutral Liquid sections, blocks, snippets, assets and default templates.
- **ULTIMA showcase:** Quadratum's monochrome/platinum presentation, curated theme examples and internal industry-demo directory. Use authentic product pages, collection experiences and articles where possible.
- **Official Theme Store preset demo(s):** fully functioning, realistic merchant store(s), each matching a named submitted preset and its industry/catalog tags. A static HTML mockup, image snapshot or ULTIMA directory cannot substitute for a required preset demo.
- **Presets:** Shopify currently requires one preset named `Quadratum`. Existing working concepts `Atelier`, `Signal`, `Terrace` need an explicit final preset decision, install-parity review and working demo URLs if submitted.
- **Marketing:** agencies and repeat-use implementers first commercially, but show approachable, industry-neutral use cases for developers/vibe coders, dropshippers, merchants and founders. Per-store licensing remains mandatory.

## Release workstreams and order

1. **Branch archaeology** — finish collecting each demo's section, block, layout, template, product and editorial configurations. Classify each source as installed Shopify draft vs. HTML prototype vs. catalog seed.
2. **Reusable fixes first** — extract and review generic Liquid/CSS/JS fixes from Northstar, EVERREAL, Folio, Morrow and ORVAINE. Never copy an entire branch's `config/settings_data.json`, `templates/index.json`, brand assets or product links into clean core.
3. **Header architecture** — support template-level solid/transparent/transparent-until-scroll choices, focus-visible menus, correct overlay positioning, mobile and sticky behavior. First resolve the known Header Three dropdown overflow.
4. **Clean V1 defaults** — remove demo-only custom CSS/scripts and references to ARC resources from the distributed baseline. Preserve demo design in separate store configuration and dedicated ULTIMA templates. Avoid any app requirement for basic theme functionality.
5. **ULTIMA brand and experiences** — monochrome/platinum, Instrument Sans + Inter, custom geometric Q (vector validated), real imagery. Curate demos and provide actual collection/PDP/blog/article/landing/cart/account/search/404 states.
6. **QA and reviewer simulation** — functional matrix, content verification, Theme Check, Lighthouse, accessibility, keyboard/no-JS, mobile/browser/webviews, theme editor, empty-state and edge-case tests.
7. **Theme Store submission** — build ZIP from approved clean core, validate name/preset parity, demo URLs, screenshots, rights and support details, submit only after explicit owner sign-off.

## Release safety

- This branch is a staging home for ULTIMA planning and integration.
- **Do not merge or force-update `main` without explicit authorization.**
- Do not publish store drafts, change checkout/payment modes or submit to Shopify without authorization.
- Keep branch-specific demo fixes attributable and tested; prefer small commits and PR review over blind cherry-picks.
- No sale/conversion promises, fabricated analytics, dummy testimonials presented as real, or fake product interfaces in the official demo.
- Shopify Theme Store themes must be exclusive to the Theme Store; do not distribute the submitted theme package elsewhere.

## Audit snapshot

As of 2026-10-15 there are **11 demo branches** in the repository plus `main`. ARC//FORM expansion PR #25, Phase 4 PR #22, Phase 5 PR #23 and Phase 6 PR #24 are merged. Main templates and `settings_data.json` are still ARC-specific and require a clean-release split. No assertion is made that all 11 demos have working Shopify catalogs.

See:
- [Demo inventory](DEMO-INVENTORY.md)
- [Defect register](DEFECT-REGISTER.md)
- [ULTIMA build and acceptance specification](BUILD-AND-SUBMISSION.md)

## Current verification boundaries

The repository has been inspected through GitHub source and branch comparisons only. Runtime Shopify theme editor, live stores, real product catalogs, checkout, Theme Check and Lighthouse have **not** been run as part of this launch-program kickoff. These must be recorded as pending until verified.
