# Phase 5 owner acceptance

Engineering scope is legacy account infrastructure plus its direct dependencies. The following checks require a Shopify store; local fixtures never submit customer information or contact a tracking provider.

| Flow | Owner live acceptance |
| --- | --- |
| Account mode | Confirm the target store is eligible for legacy accounts before testing these templates. On current accounts, confirm the native account links reach Shopify's hosted experience; do not expect theme account CSS/settings to alter it. |
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

1. Choose the launch account architecture and distribution requirement. Shopify's current-account header component is required for Theme Store submissions; integration/migration/hosted-account extensions are not delivered by these legacy templates. See `dependency-map.md` for the dated official sources.
2. Decide whether the optional tracking page is wanted. If so, supply a compatible provider URL and page links. Otherwise retain the truthful native order/confirmation guidance. No external carrier service is provisioned.

No merge, store deployment, migration or Phase 6 work is authorized by this closure.
