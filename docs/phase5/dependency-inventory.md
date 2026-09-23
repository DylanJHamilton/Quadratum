# Account dependency inventory

All paths below are relative to the repository root. The component register covers 37 owned account components and the unchanged shared `contrast-text` helper. All 35 components requested at baseline remain present. The two additions are `templates/customers/account.orders.liquid` and `snippets/account-safe-link.liquid`.

## Customer template map

| Template | Section | Legacy flow |
| --- | --- | --- |
| templates/customers/account.liquid | account-main-account-dashboard | Default account dashboard |
| templates/customers/account.orders.liquid | account-main-account-orders | Full history via account route plus `?view=orders` |
| templates/customers/activate_account.liquid | account-main-account-activate | Invitation activation or decline |
| templates/customers/addresses.liquid | account-main-account-addresses | Address CRUD/default/pagination |
| templates/customers/login.liquid | account-main-account-login | Login and native password recovery |
| templates/customers/order.liquid | account-main-account-order | One native customer order |
| templates/customers/register.liquid | account-main-account-register | Native registration |
| templates/customers/reset_password.liquid | account-main-account-reset-password | Email-token password reset |

The tracking section is an optional merchant-placeable preset, not one of Shopify's native customer routes. It remains available for a page template if the merchant chooses to use it; no page, carrier integration or navigation destination was fabricated. Tracking navigation requires a configured URL. Public tracking pages use the native account destination, preserving the hosted-account boundary.

## Asset ownership

No account asset is orphaned, missing or renamed. Each CSS/JS file is loaded by its owning section or the shared nav snippet. The generated JSON records exact source hashes and every actual direct dependency, excluding commented examples and schema text.

| Asset | Consumer |
| --- | --- |
| assets/account-main-account-activate.css | sections/account-main-account-activate.liquid |
| assets/account-main-account-activate.js | sections/account-main-account-activate.liquid |
| assets/account-main-account-addresses.css | sections/account-main-account-addresses.liquid |
| assets/account-main-account-addresses.js | sections/account-main-account-addresses.liquid |
| assets/account-main-account-dashboard.css | sections/account-main-account-dashboard.liquid |
| assets/account-main-account-login.js | sections/account-main-account-login.liquid |
| assets/account-main-account-nav.css | snippets/account-main-account-nav.liquid |
| assets/account-main-account-order-tracking.css | sections/account-main-account-order-tracking.liquid |
| assets/account-main-account-order.css | sections/account-main-account-order.liquid |
| assets/account-main-account-orders.css | sections/account-main-account-orders.liquid |
| assets/account-main-account-orders.js | sections/account-main-account-orders.liquid |
| assets/account-main-account-register.css | sections/account-main-account-register.liquid |
| assets/account-main-account-register.js | sections/account-main-account-register.liquid |
| assets/account-main-account-reset-password.css | sections/account-main-account-reset-password.liquid |
| assets/account-main-account-reset-password.js | sections/account-main-account-reset-password.liquid |
| assets/account-main-account.css | sections/account-main-account-login.liquid |
| assets/account-main-order-tracking.js | sections/account-main-account-order-tracking.liquid |

## Direct snippets

| Snippet | Responsibility | Consumers |
| --- | --- | --- |
| snippets/account-main-account-nav.liquid | Shared navigation and nav stylesheet | sections/account-main-account-addresses.liquid, sections/account-main-account-dashboard.liquid, sections/account-main-account-order-tracking.liquid, sections/account-main-account-order.liquid, sections/account-main-account-orders.liquid |
| snippets/account-main-account-login-recover-form-placeholder.liquid | Native recovery form despite historic suffix | sections/account-main-account-login.liquid |
| snippets/account-safe-link.liquid | Validate fulfillment/status web-link schemes before escaped rendering | sections/account-main-account-order.liquid |
| snippets/contrast-text.liquid | Color contrast through Shopify Liquid color filters | sections/account-main-account-activate.liquid, sections/account-main-account-addresses.liquid, sections/account-main-account-dashboard.liquid, sections/account-main-account-login.liquid, sections/account-main-account-order-tracking.liquid, sections/account-main-account-order.liquid, sections/account-main-account-orders.liquid, sections/account-main-account-register.liquid, sections/account-main-account-reset-password.liquid |

`contrast-text` has no further render or asset dependencies. Native Shopify objects/tags/filters supply customer/order data, address formatting, form transport and pagination. There is no account framework, carrier SDK, Customer Account API client or account API credential in this stack.

## Inherited layout boundary (read-only review)

| Files/interfaces | Account dependency and disposition |
| --- | --- |
| layout/theme.liquid | Owns the single main landmark, document language/direction and `content_for_header`; unchanged. Shopify delivers CAPTCHA through that header object. Native auth forms remain server rendered; account JS does not override their submission. |
| snippets/global-theme-vars.liquid → snippets/theme-tokens.liquid + snippets/utilities.liquid | Supplies color, font, spacing and common utility tokens. Loaded in browser fixtures; unchanged. |
| assets/theme.css, assets/q-base.css.liquid, assets/styles.css | Global reset/base typography and surfaces. Included in browser fixtures; account selectors stay scoped. Global overflow clipping is not used as evidence of fit: browser checks also measure visible element bounds. Unchanged. |
| assets/qtm-content-blocks.css, assets/qtm-section-surfaces.css | Additional globally loaded surfaces included in browser fixtures; no new dependency or modification. |
| assets/cart-drawer.js, assets/predictive-search.js | Submit handlers require their own cart/search contracts and do not intercept native account forms. Unchanged; retained broader regressions passed. |
| assets/search-popup.js, assets/global-popup.js, assets/q-quick-view.js | Focus/click behavior is scoped to their own hosts and triggers. Not account controllers. Unchanged; retained broader regressions passed. |
| sections/header-one through header-five; sections/footer-two and footer-five; header account link helpers | Account entry links remain native `routes.account_*`. Shared header/footer Orders links enter the native account landing page; on legacy accounts its View all orders link reaches the full list. No legacy `?view=orders` was imposed globally on hosted accounts. No header/footer source changed. |
| layout/theme.liquid global `QuadratumSettings.customer` export | Existing `account_layout`, `orders_show_reorder` and `customer_help_text` exports have no account-controller consumers. Local section schemas own account controls. This unused global settings export is explicitly outside this phase; no dependency relies on it. Settings schema/data are unchanged. |

This boundary review does not claim a new full review of every shared/global component. Existing Phase 4 regressions were reused to detect collateral changes.

## Lifecycle and compatibility

All seven controllers are standalone, root-scoped and guarded against duplicate asset evaluation. They mount at DOM readiness and `shopify:section:load`, and dispose affected instances at `shopify:section:unload`. Cleanup restores native visibility/fields/order and removes instance listeners. Similar small auth password-visibility helpers intentionally remain local: extracting a new shared runtime would add load-order risk without changing the native form contract.

Without JavaScript, login/recovery/register/reset/activation submit through native forms; address edit/add/default/delete forms and server pagination remain available; order history/detail/nav remain readable. Filter/sort/password/panel controls stay hidden until enhanced. Provider redirect tracking requires JavaScript and valid merchant configuration; native order/support guidance remains available without them.

No asset was renamed. `account-main-account.css` belongs to login; `account-main-order-tracking.js` is the real tracking controller; the recovery snippet's placeholder suffix does not indicate missing implementation. Available Phase 4 history and current consumers were checked. Earlier repository history has missing local objects, so no claim is made that every historical rename was reconstructable. Current reference ownership is complete.

## Settings and duplication

Every setting ID in all nine section schemas has a source reference in the section or its consumed snippets. Every account custom property declared by a section has a CSS consumer. Native merchant text/URLs remain escaped; richtext settings and native Shopify formatters retain their intended HTML contract. Only the fake remember-me toggle/label were removed; they never controlled Shopify sessions. Tracking stage-color IDs remain stable with truthful labels.

Proven dead navigation/simulated-status/copied helper CSS and stale file-number comments were removed locally. Intentional auth/controller repetition is documented above; account styles were not collapsed into a global bundle. No global readability or Theme Settings work was performed.
