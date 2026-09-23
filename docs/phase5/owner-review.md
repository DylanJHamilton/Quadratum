# Phase 5 owner acceptance

Engineering scope now includes the hardened legacy accounts plus current/legacy storefront entry in all five headers. PHASE 5 ACCOUNT INFRASTRUCTURE ENGINEERING COMPLETE — CURRENT + LEGACY ACCOUNT ENTRY COMPATIBILITY READY FOR OWNER REVIEW. The following checks require a Shopify store; local fixtures never submit customer information or contact a tracking provider.

| Flow | Owner live acceptance |
| --- | --- |
| Account mode | Confirm the target store is eligible for legacy accounts before testing these templates. On current accounts, confirm the header component opens Shopify’s account sheet and its links reach the hosted experience; do not expect theme account CSS/settings to alter it. |
| Login/logout | Valid/invalid credentials, Shopify CAPTCHA when present, checkout return behavior, session state and logout destination. No theme-managed remember-me or password storage exists. |
| Register | Valid registration, duplicate email, rejected password, server error text and retained names/email; confirm the authenticated destination. |
| Recover | Existing/nonexistent email behavior, email delivery, success/error panel visibility, direct recovery hash and return focus. |
| Activate/reset | Real valid/expired/used token URLs, password mismatch, accepted password, invitation decline and Shopify redirect/session result. |
| Dashboard/history | Customer name/email/default address, empty state, recent-order limit, full-history `?view=orders`, second/last pages and query preservation with locale-prefixed routes. Search/filter/sort apply only to the rendered page. |
| Order details | Paid, authorized, partially paid/refunded, refunded, cancelled, partial/multiple fulfillments, deleted/renamed products, saved line titles, private properties, actual amounts/currency/taxes and absent addresses. Open native fulfillment and status links. |
| Tracking | Place the optional section on a real page if wanted, configure all links, and confirm the provider accepts the documented URL parameters/placeholders. Blank/invalid/no-JS must show guidance. No carrier API or verified shipment state is implemented. |
| Addresses | Add/edit/delete/set-default, rejected values, default badge, country/province combinations, reset, empty collection and more than 20 addresses. Verify persisted server data after reload. |
| Interaction/layout | Keyboard-only use and a screen reader; error announcement/focus; real long localized data, merchant colors/font choices, 320px mobile, tablet/desktop and RTL. Editor load/unload and repeated section previews. |

## Owner decisions

1. Use the store’s configured account model; no source architecture decision is outstanding. Header integration is delivered. Choose a migration only if wanted; this branch does not migrate stores or customize Shopify-hosted pages. Enable the active header’s account visibility for Theme Store review (Header Four retains its existing off default).
2. Decide whether the optional tracking page is wanted. If so, supply a compatible provider URL and page links. Otherwise retain the truthful native order/confirmation guidance. No external carrier service is provisioned.

## Checkpoint F — storefront acceptance

Test Header One–Five independently at desktop, tablet and mobile widths using real Shopify accounts:

- Current account model: signed out, sign in, return to storefront, signed-in avatar/session, account sheet menu and logout. Verify configured Shop/social sign-in without assuming every provider is enabled.
- Eligible legacy model: verify the component’s platform-owned sign-in handoff reaches the retained theme templates; then repeat normal account/login/logout flows.
- Visibility: shop-level account/sign-in setting and each header’s show setting; Header One icon-off/mobile-on permutation. No duplicate account entry in open mobile drawers after component loading.
- Menus: system default, selected custom menu, blank selection and deleted/empty menu. Confirm Orders/Profile destinations and any merchant-added tracking links. No custom menu must be created merely to render the header.
- Keyboard/AT: meaningful accessible names, focus ring, 44px targets, Tab/Enter/Escape, account sheet focus/return, opening/closing navigation and Shopify editor section reloads. Test the actual signed-in avatar too; local tests use an explicit adapter.
- Layout: real logos, dark/transparent header variants, long translations, RTL, narrow viewports and zoom. Mobile Safari and Firefox remain live checks. Confirm adjacent cart/search/menu controls remain usable.
- Degraded loading: no JavaScript, delayed/blocked component delivery, and network failure after definition. Native fallback is CSS-driven until `:defined`; it cannot monitor platform service health after registration.

Account-related submission status: **the missing-component source blocker is resolved**. Enabled account visibility and the live platform checks above are still required; local tests do not constitute Theme Store approval. Keeping legacy templates is intentional, preserves eligible merchants and requires no migration decision to review this branch.

No merge, store deployment, migration or Phase 6 work is authorized by this closure.
