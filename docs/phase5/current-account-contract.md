# Checkpoint F — official Shopify contract

Accessed 2026-09-23 before implementation. Baseline checkpoint E: `8e114764138cf5a5967ff56b75064808d6366bed`.

| Official source | Applicable contract |
| --- | --- |
| https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component | Theme integration uses `shop.customer_accounts_enabled`, `shopify-account` and `menu`. Shopify owns the signed-in avatar and sheet. Current accounts open the sheet; legacy accounts use direct sign-in. The signed-out slot/part can be styled. A section `link_list` setting is recommended; the default handle is `customer-account-main-menu`. Merchants manage links in Content > Menus. |
| https://shopify.dev/docs/api/storefront-web-components/components/shopify-account | Documented attributes: `menu`, `sign-in-url`. This theme leaves sign-in-url at Shopify's default. Documented slot/part: `signed-out-avatar`. Size variables: `--shopify-account-avatar-size`, `--shopify-account-signed-in-avatar-size`. Documented `open` event allows navigation drawer cleanup. Other sheet color/font/radius variables exist, but this integration leaves the sheet palette and typography to Shopify. No internal selectors or token/session implementation. |
| https://shopify.dev/docs/storefronts/themes/store/requirements | The account component must be in the header and visible on desktop and mobile. |
| https://shopify.dev/changelog/the-shopify-account-component-for-customer-accounts-is-now-a-theme-store-requirement | July 30, 2026: required for new Theme Store submissions and updates; legacy customer templates are no longer required. |
| https://shopify.dev/changelog/legacy-customer-accounts-are-deprecated | February 26, 2026: new stores and stores not already on legacy accounts cannot enable them. Removing the templates can migrate an eligible legacy merchant. This checkpoint retains every customer template and does not change account configuration. |

The generic web-component reference also contains headless `shopify-store`/token examples. Those are **not the theme installation contract** and are not copied into this theme. Existing `content_for_header` delivery is retained.

## Menu and fallback decisions

All five active headers expose `customer_account_menu`. The shared snippet accepts the selected menu handle, escaped as an attribute; blank/unset selection uses Shopify's documented system handle. Rendering does not require `linklists[handle]` to exist locally and does not fabricate menu links. The component/platform owns menu resolution, including defaults. A deleted/empty/custom menu's remote behavior requires live verification; no undocumented absent-menu guarantee is claimed.

The previous repository contains no runtime `customer-account-main-menu` use: account-page navigation and Header Two/Five dropdowns were separately constructed native links. The new default is therefore the documented Shopify menu, not a required custom menu invented by Quadratum. Tracking shortcuts remain available in existing native fallback/navigation; merchants can add them to the selected account menu.

Native fallback markup stays visible until `:defined`; CSS then removes it and the old drawer account controls from layout and accessibility trees. Shopify owns all enhanced signed-in/out state. No Liquid `customer` branch controls the component. This CSS upgrade boundary is not a health probe after component definition; remote loading, service failures and sessions remain live-QA items.

All controls remain outside mobile navigation dialogs. Direct `open` listeners close any competing drawer without stealing focus; existing abort cleanup owns those listeners. No theme code reads Shopify shadow DOM. Test-only shadow fixtures are explicitly adapters, not Shopify's implementation.
