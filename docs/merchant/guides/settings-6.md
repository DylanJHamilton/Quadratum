# Commerce defaults

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Commerce defaults.
2. Choose whether successful additions open the cart drawer, and which purchase surfaces trigger it. Disabling the drawer retains the native cart journey.
3. Configure any free-shipping or reward milestones in Shopify before entering matching amounts here. Select an actual gift-wrap product if you offer it; the theme adds that product as a cart line.
4. Wishlist controls store saved products in the shopper’s current browser. Choose a page using the wishlist template before enabling its navigation link.
5. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
6. Preview a home, product, collection, and cart page before saving shared changes.

## Product listing (cards)

### Enable quick add

Turn on “Enable quick add” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default for shared product cards and search results. Explicit host quick-add settings take priority.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `pcard_quick_add`. Type: `checkbox`.

</details>

### Show SALE/NEW/low stock badges

Turn on “Show SALE/NEW/low stock badges” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default for shared product cards and search results. Explicit host badge settings take priority.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `pcard_show_badges`. Type: `checkbox`.

</details>

## Cart

### Show shipping threshold progress

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Display only; does not grant free shipping. Configure matching shipping rates in Shopify. Uses the current cart currency, without currency conversion.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_free_ship_threshold_enable`. Type: `checkbox`.

</details>

### Free shipping threshold amount

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Amount in the current cart currency. Zero or a negative amount hides progress. Confirm the threshold for every active market.

Default: `75`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_free_ship_threshold_amount`. Type: `number`.

</details>

### Enable AJAX cart drawer

Turn on “Enable AJAX cart drawer” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_ajax_cart_drawer`. Type: `checkbox`.

</details>

### Open cart drawer after add to cart

Turn on “Open cart drawer after add to cart” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_ajax_cart_after_add`. Type: `checkbox`.

</details>

### Enable header cart icon drawer trigger

Turn on “Enable header cart icon drawer trigger” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

When disabled, the cart icon opens the cart page.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_enable_header_trigger`. Type: `checkbox`.

</details>

### Use drawer for product forms

Turn on “Use drawer for product forms” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Shared product-page and featured-product forms. Disabled forms keep native cart submission. Bundle sections retain their explicit add mode.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_enable_pdp_trigger`. Type: `checkbox`.

</details>

### Enable collection quick add drawer trigger

Turn on “Enable collection quick add drawer trigger” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Shared product-card and quick-view forms. Disabled forms keep native cart submission.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_enable_collection_trigger`. Type: `checkbox`.

</details>

### Enable cart add-on drawer refresh

Turn on “Enable cart add-on drawer refresh” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Enhances native add-on forms from the cart page. Does not create drawer add-on products.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_enable_addon_trigger`. Type: `checkbox`.

</details>

### Drawer width (px)

Drag the control to adjust drawer width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `460`.

Range: 320 to 640 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_width`. Type: `range`.

</details>

### Show continue shopping link

Turn on “Show continue shopping link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_show_continue_shopping`. Type: `checkbox`.

</details>

### Show shipping progress in drawer

Turn on “Show shipping progress in drawer” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Requires shipping threshold progress above. Cart-page reward blocks remain section-owned.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_show_rewards_progress_bar`. Type: `checkbox`.

</details>

### Drawer background

Choose a color for drawer background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f8f8f8`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_background`. Type: `color`.

</details>

### Drawer panel background

Choose a color for drawer panel background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_panel_background`. Type: `color`.

</details>

### Drawer text color

Choose a color for drawer text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_text`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 90 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_overlay_opacity`. Type: `range`.

</details>

## Cart summary note

### Cart summary note

Enter the cart summary note. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Shown in the cart summary above the checkout button. Does not change Shopify checkout.

Default: `Secure checkout powered by Shopify.`.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_note`. Type: `text`.

</details>

## Product card wishlist

### Show wishlist on product cards

Turn on “Show wishlist on product cards” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `pcard_show_wishlist`. Type: `checkbox`.

</details>

### Wishlist page

Choose an existing Shopify page. Edit the page’s content separately in Online Store > Pages.

<details><summary>Reference for connected builders</summary>

Setting: `wishlist_page`. Type: `page`.

</details>

## Cart drawer extras

### Tier 1 amount

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Leave blank to disable. Configure the actual reward in Shopify discounts or shipping settings.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_1_amount`. Type: `number`.

</details>

### Tier 1 label

Enter the tier 1 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_1_label`. Type: `text`.

</details>

### Tier 2 amount

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Leave blank to disable. Configure the actual reward in Shopify discounts or shipping settings.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_2_amount`. Type: `number`.

</details>

### Tier 2 label

Enter the tier 2 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_2_label`. Type: `text`.

</details>

### Tier 3 amount

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Leave blank to disable. Configure the actual reward in Shopify discounts or shipping settings.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_3_amount`. Type: `number`.

</details>

### Tier 3 label

Enter the tier 3 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_tier_3_label`. Type: `text`.

</details>

### Drawer add-on product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `cart_drawer_addon_product`. Type: `product`.

</details>

### Offer gift wrap

Turn on “Offer gift wrap” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_gift_wrap_enable`. Type: `checkbox`.

</details>

### Gift-wrap product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

Select a product with one variant, no subscription, and a minimum quantity of one.

<details><summary>Reference for connected builders</summary>

Setting: `cart_gift_wrap_product`. Type: `product`.

</details>

### Wishlist link override

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Optional URL for a preview template or custom wishlist destination.

<details><summary>Reference for connected builders</summary>

Setting: `wishlist_link`. Type: `url`.

</details>

## File reference

`config/settings_schema.json`
