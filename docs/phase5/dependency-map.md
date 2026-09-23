# Account dependency and route reconciliation

The account-page implementation targets **eligible legacy Shopify customer accounts**. Checkpoint F adds a shared storefront entry for **current and legacy account models**. All seven existing customer templates remain. Account data and authorization come from Shopify's native Liquid drops and form handlers; JavaScript only enhances rendered controls.

| Account section suffix | Template/placement | Stylesheet basename | Controller basename | Direct snippets |
| --- | --- | --- | --- | --- |
| login | customers/login.liquid | account-main-account.css | account-main-account-login.js | contrast-text; account-main-account-login-recover-form-placeholder |
| register | customers/register.liquid | account-main-account-register.css | account-main-account-register.js | contrast-text |
| activate | customers/activate_account.liquid | account-main-account-activate.css | account-main-account-activate.js | contrast-text |
| reset-password | customers/reset_password.liquid | account-main-account-reset-password.css | account-main-account-reset-password.js | contrast-text |
| dashboard | customers/account.liquid | account-main-account-dashboard.css | None | contrast-text; account-main-account-nav |
| orders | customers/account.orders.liquid, `routes.account_url` + `?view=orders` | account-main-account-orders.css | account-main-account-orders.js | contrast-text; account-main-account-nav |
| order | customers/order.liquid; native `order.customer_url` | account-main-account-order.css | None | contrast-text; account-main-account-nav; account-safe-link |
| addresses | customers/addresses.liquid | account-main-account-addresses.css | account-main-account-addresses.js | contrast-text; account-main-account-nav |
| order-tracking | Optional section preset on a merchant-created page; no native tracking customer route | account-main-account-order-tracking.css | account-main-order-tracking.js | contrast-text; account-main-account-nav |

Section filenames use the prefix `sections/account-main-account-`. All 17 existing account assets have a live source consumer. All eight customer templates map to their intended section. Tracking has an explicit preset instead of an invented customer route.

## Shared dependencies

- `account-main-account-nav` owns `account-main-account-nav.css`. One native list is shared across horizontal/sidebar/compact presentations. Compact mode uses details/summary without a script. No tracking link is shown until a URL exists. Account pages use the alternate full-history destination; explicitly configured Orders URLs are preserved.
- `account-main-account-login-recover-form-placeholder` renders a real `recover_customer_password` form. The historical suffix is retained for compatibility. Login renders one instance, never cloned markup.
- `contrast-text` chooses a readable foreground for configured card/button surfaces. It has no transitive snippet or asset dependency and was reviewed without modification.
- `account-safe-link` gates web/store-relative order-status and fulfillment links; callers escape the returned URL. No API request or carrier inference is involved.
- `account-main-account.css` belongs only to login despite its generic historical name. `account-main-order-tracking.js` intentionally keeps the older, shorter filename. No asset rename, alias or compatibility shim was necessary.
- Four authentication controllers retain their independent entry points and small visibility routines. Loading one form never depends on another page's script. Every controller has duplicate-boot guards, scoped instance state and Shopify section unload cleanup; native forms remain available without JS.

## Storefront shell boundary

Customer templates use the existing normal layout. Account fixtures include compiled theme CSS, rendered global theme variables, `q-base.css.liquid` and `styles.css`. The latter two names follow Shopify's native Liquid-asset serving convention. Header/footer structure, search, cart, global block controllers and global settings remain Phase 4-owned; layout/head, delivery and five-header lifecycle regressions were rerun. Account source does not add dependencies on those controllers.

The five active header sections (`header-one` through `header-five`) render `snippets/header-account-entry.liquid`, which loads only `assets/header-account-entry.css`. Each existing header controller owns its direct component `open` listener through its existing abort lifecycle. No account page depends on these listeners.

| Entry path | Visibility and ownership |
| --- | --- |
| Header One | Existing icon and independent mobile settings; mobile-only mode supported when only mobile entry is enabled. Native drawer link is fallback-only. |
| Header Two | Existing show/display settings; native details dropdown and optional mobile registration stay fallback-only. Tracking remains in ordinary mobile navigation. |
| Header Three | Existing show/display settings; current component remains in the mobile toolbar. Narrow logo text yields space to menu/account/cart. |
| Header Four | Existing show setting (default off); enable for review. Component remains in the mobile toolbar; collapsed grid reserves action space. |
| Header Five | Existing show/display settings; hover dropdown and drawer links are fallback-only. Addresses now respects the account visibility gate. |

Every path is also gated by `shop.customer_accounts_enabled`. The shared menu setting/default is described in `current-account-contract.md`; the component has no Liquid-customer authentication branch. The signed-out slot receives each header’s existing icon/trigger classes. Shopify controls the signed-in avatar, sheet and hosted pages.

`layout/theme.liquid` selects exactly one of the five static header sections (defaulting to One); its platform delivery is unchanged. `header-basic.liquid` is empty/unselected. `header-two-actions` and `header-two-mobile-menu` have no active consumers; `header-two-account` is only called by the unconsumed actions helper. They are not renamed, deleted or silently reactivated. The 25-file active header dependency closure, including unchanged search/conversion/marketplace helpers, is recorded in `validation/checkpoint-f/source.json`.

## Platform boundary and release decision

Shopify owns sessions, logout, credentials, activation/reset tokens, email delivery, CAPTCHA, authorization, native form processing, customer/order data and server pagination. The fixtures cannot establish those remote outcomes. A logged-out fixture never receives customer/order data; that gate is a presentation check, not a replacement for Shopify authorization.

Current Shopify Customer Accounts are hosted independently. Their sign-in, orders, addresses, branding and extensions are **not** customized by these Liquid templates or account assets. Native account links hand off to Shopify's configured account experience. `?view=orders` is an alternate legacy template, not a hosted-accounts customization API.

As of Shopify's February 26, 2026 notice, legacy accounts are deprecated and unavailable to new stores or existing stores that were not already using them. Removing customer templates can migrate a legacy store; this phase deliberately retains all existing templates. Shopify's July 30, 2026 notice requires the `shopify-account` component in desktop/mobile headers for new Theme Store submissions and updates. Checkpoint F now supplies that component through every active header. Its source integration gap is resolved; enabled visibility and live Shopify acceptance remain distribution gates. Merchant account migration and Customer Account UI extensions remain separate architectural work.

Sources checked 2026-09-23:

- https://shopify.dev/changelog/legacy-customer-accounts-are-deprecated
- https://shopify.dev/docs/storefronts/themes/architecture/templates
- https://shopify.dev/docs/storefronts/themes/architecture/templates/alternate-templates
- https://shopify.dev/changelog/the-shopify-account-component-for-customer-accounts-is-now-a-theme-store-requirement
- https://shopify.dev/docs/apps/build/customer-accounts
- https://shopify.dev/docs/api/liquid/tags/form
- https://shopify.dev/docs/api/liquid/objects/form
- https://shopify.dev/docs/api/liquid/objects/order
- https://shopify.dev/docs/api/liquid/objects/line_item
- https://shopify.dev/docs/api/liquid/objects/fulfillment
