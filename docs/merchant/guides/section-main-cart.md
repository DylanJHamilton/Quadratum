# Main cart

[All documentation](../README.md) · [Support](../SUPPORT.md)

Store essentials.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Main cart.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Show cart title

Turn on “Show cart title” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_cart_title`. Type: `checkbox`.

</details>

### Shipping notice

Enter the shipping notice. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping calculated at checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `shipping_notice`. Type: `text`.

</details>

### Continue shopping URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `continue_shopping_url`. Type: `url`.

</details>

### Show continue shopping link

Turn on “Show continue shopping link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_continue_shopping`. Type: `checkbox`.

</details>

### Empty cart message

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Looks like you have not added anything yet.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_cart_message`. Type: `richtext`.

</details>

## Overall style

### Cart style

Choose one of the supported options below for cart style. Only the selected option applies; other settings can further customize its appearance.

Default: `clean`.

Options: Clean, Soft, Outline, Editorial, Compact, Premium.

<details><summary>Reference for connected builders</summary>

Setting: `cart_style`. Type: `select`.

`clean`, `soft`, `outline`, `editorial`, `compact`, `premium`

</details>

## Layout

### Cart layout

Choose one of the supported options below for cart layout. Only the selected option applies; other settings can further customize its appearance.

Default: `standard`.

Options: Standard, Wide summary, Editorial, Compact.

<details><summary>Reference for connected builders</summary>

Setting: `cart_layout`. Type: `select`.

`standard`, `wide_summary`, `editorial`, `compact`

</details>

### Sticky summary on desktop

Turn on “Sticky summary on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_summary_desktop`. Type: `checkbox`.

</details>

### Rewards position

Choose one of the supported options below for rewards position. Only the selected option applies; other settings can further customize its appearance.

Default: `full_width`.

Options: Below summary, Below items, Full width, Hidden.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_position`. Type: `select`.

`below_summary`, `below_items`, `full_width`, `hidden`

</details>

### Add-ons position

Choose one of the supported options below for add-ons position. Only the selected option applies; other settings can further customize its appearance.

Default: `full_width`.

Options: Below summary, Below items, Full width, Hidden.

<details><summary>Reference for connected builders</summary>

Setting: `addons_position`. Type: `select`.

`below_summary`, `below_items`, `full_width`, `hidden`

</details>

## Standalone rewards bar

Reward tiers display progress only. Configure matching shipping rates, discounts or gifts in Shopify; this section does not grant rewards. Thresholds use the active cart currency.

### Show standalone rewards progress bar

Turn on “Show standalone rewards progress bar” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_rewards_progress_bar`. Type: `checkbox`.

</details>

### Standalone rewards bar position

Choose one of the supported options below for standalone rewards bar position. Only the selected option applies; other settings can further customize its appearance.

Default: `above_layout`.

Options: Above cart layout, Below cart layout, Above cart items, Below summary.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_progress_bar_position`. Type: `select`.

`above_layout`, `below_layout`, `above_items`, `below_summary`

</details>

### Show rewards progress percentage

Turn on “Show rewards progress percentage” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_rewards_progress_percentage`. Type: `checkbox`.

</details>

### Rewards bar background

Choose a color for rewards bar background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_bar_background`. Type: `color`.

</details>

### Rewards bar fill color

Choose a color for rewards bar fill color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_bar_fill_color`. Type: `color`.

</details>

### Rewards bar text color

Choose a color for rewards bar text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_bar_text_color`. Type: `color`.

</details>

### Rewards bar radius

Drag the control to adjust rewards bar radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_bar_radius`. Type: `range`.

</details>

### Rewards bar height

Drag the control to adjust rewards bar height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 4 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_bar_height`. Type: `range`.

</details>

## Component styles

### Line item style

Choose one of the supported options below for line item style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Soft, Outline, Compact, Editorial.

<details><summary>Reference for connected builders</summary>

Setting: `line_item_style`. Type: `select`.

`card`, `soft`, `outline`, `compact`, `editorial`

</details>

### Summary style

Choose one of the supported options below for summary style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Soft, Outline, Elevated, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `summary_style`. Type: `select`.

`card`, `soft`, `outline`, `elevated`, `minimal`

</details>

### Quantity style

Choose one of the supported options below for quantity style. Only the selected option applies; other settings can further customize its appearance.

Default: `segmented`.

Options: Segmented, Pill, Outline, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `quantity_style`. Type: `select`.

`segmented`, `pill`, `outline`, `minimal`

</details>

### Rewards style

Choose one of the supported options below for rewards style. Only the selected option applies; other settings can further customize its appearance.

Default: `progress`.

Options: Progress, Steps, Cards.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_style`. Type: `select`.

`progress`, `steps`, `cards`

</details>

### Add-ons style

Choose one of the supported options below for add-ons style. Only the selected option applies; other settings can further customize its appearance.

Default: `cards`.

Options: Cards, Soft, Compact.

<details><summary>Reference for connected builders</summary>

Setting: `addons_style`. Type: `select`.

`cards`, `soft`, `compact`

</details>

### Empty cart style

Choose one of the supported options below for empty cart style. Only the selected option applies; other settings can further customize its appearance.

Default: `centered`.

Options: Centered, Minimal, Editorial.

<details><summary>Reference for connected builders</summary>

Setting: `empty_state_style`. Type: `select`.

`centered`, `minimal`, `editorial`

</details>

## Density and media

### Cart image size

Choose one of the supported options below for cart image size. Only the selected option applies; other settings can further customize its appearance.

Default: `medium`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `cart_image_size`. Type: `select`.

`small`, `medium`, `large`

</details>

## Typography

### Title font size

Drag the control to adjust title font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `34`.

Range: 20 to 60 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_font_size`. Type: `range`.

</details>

### Price font size

Drag the control to adjust price font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `price_font_size`. Type: `range`.

</details>

### Meta font size

Drag the control to adjust meta font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 11 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `meta_font_size`. Type: `range`.

</details>

## Buttons

### Checkout button style

Choose one of the supported options below for checkout button style. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid, Outline, Soft.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_style`. Type: `select`.

`solid`, `outline`, `soft`

</details>

### Checkout button color

Choose a color for checkout button color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_color`. Type: `color`.

</details>

### Checkout button text color

Choose a color for checkout button text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_text_color`. Type: `color`.

</details>

### Checkout button border width

Drag the control to adjust checkout button border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_border_width`. Type: `range`.

</details>

### Checkout button radius

Drag the control to adjust checkout button radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_radius`. Type: `range`.

</details>

### Checkout button vertical padding

Drag the control to adjust checkout button vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 8 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `checkout_button_padding`. Type: `range`.

</details>

## Rewards styling

### Rewards background

Choose a color for rewards background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_background`. Type: `color`.

</details>

### Rewards border color

Choose a color for rewards border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#dddddd`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_border_color`. Type: `color`.

</details>

### Rewards progress color

Choose a color for rewards progress color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_progress_color`. Type: `color`.

</details>

### Rewards progress track color

Choose a color for rewards progress track color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_progress_track_color`. Type: `color`.

</details>

### Unlocked tier background

Choose a color for unlocked tier background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#eaf5ef`.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_unlocked_background`. Type: `color`.

</details>

### Rewards radius

Drag the control to adjust rewards radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_radius`. Type: `range`.

</details>

### Rewards padding

Drag the control to adjust rewards padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 8 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `rewards_padding`. Type: `range`.

</details>

## Add-ons styling

### Add-ons background

Choose a color for add-ons background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `addons_background`. Type: `color`.

</details>

### Add-ons border color

Choose a color for add-ons border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#dddddd`.

<details><summary>Reference for connected builders</summary>

Setting: `addons_border_color`. Type: `color`.

</details>

### Add-ons radius

Drag the control to adjust add-ons radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `addons_radius`. Type: `range`.

</details>

### Add-ons padding

Drag the control to adjust add-ons padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 8 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `addons_padding`. Type: `range`.

</details>

### Add-ons columns desktop

Drag the control to adjust add-ons columns desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `addons_columns_desktop`. Type: `range`.

</details>

### Add-ons columns mobile

Drag the control to adjust add-ons columns mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `addons_columns_mobile`. Type: `range`.

</details>

## Spacing

### Cart item spacing

Drag the control to adjust cart item spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 8 to 48 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cart_item_spacing`. Type: `range`.

</details>

### Section padding

Drag the control to adjust section padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `section_padding`. Type: `range`.

</details>

## Blocks you can add

### Reward tier

#### Threshold amount

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Default: `50`.

<details><summary>Reference for connected builders</summary>

Setting: `threshold_amount`. Type: `number`.

</details>

#### Locked text

Enter the locked text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Free Shipping`.

<details><summary>Reference for connected builders</summary>

Setting: `locked_text`. Type: `text`.

</details>

#### Unlocked text

Enter the unlocked text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Free Shipping unlocked`.

<details><summary>Reference for connected builders</summary>

Setting: `unlocked_text`. Type: `text`.

</details>

#### Reward type

Choose one of the supported options below for reward type. Only the selected option applies; other settings can further customize its appearance.

Default: `shipping`.

Options: Free shipping, Free gift, Bonus item, Custom.

<details><summary>Reference for connected builders</summary>

Setting: `reward_type`. Type: `select`.

`shipping`, `gift`, `bonus`, `custom`

</details>

#### Icon text

Enter the icon text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `★`.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `text`.

</details>

### Add-on product

#### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

#### Custom label

Enter the custom label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `custom_label`. Type: `text`.

</details>

#### Custom description

Write the custom description. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `custom_description`. Type: `textarea`.

</details>

## File reference

`sections/main-cart.liquid`
