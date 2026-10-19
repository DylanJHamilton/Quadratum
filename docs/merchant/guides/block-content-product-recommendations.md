# Content recommendations

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Content recommendations. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Product block section.

## Products

### Product source

Choose one of the supported options below for product source. Only the selected option applies; other settings can further customize its appearance.

Default: `recommendations`.

Options: Shopify recommendations, Featured collection, Manual products.

<details><summary>Reference for connected builders</summary>

Setting: `product_source`. Type: `select`.

`recommendations`, `collection`, `manual`

</details>

### Fallback collection

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

### Manual products

Choose existing products in the order you want to feature them. Edit product information in Products.

<details><summary>Reference for connected builders</summary>

Setting: `products`. Type: `product_list`.

</details>

### Product limit

Drag the control to adjust product limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shopify recommendations return up to 10 products. Manual and collection sources use the full limit.

Default: `4`.

Range: 2 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `product_limit`. Type: `range`.

</details>

## Header

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Enter the description. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `text`.

</details>

### Heading size

Drag the control to adjust heading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `36`.

Range: 20 to 72 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `range`.

</details>

### Heading size mobile

Drag the control to adjust heading size mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 18 to 48 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size_mobile`. Type: `range`.

</details>

### Description size

Drag the control to adjust description size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 24 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `description_size`. Type: `range`.

</details>

## Layout

### Recommendation layout

Choose one of the supported options below for recommendation layout. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, Carousel, Cards.

<details><summary>Reference for connected builders</summary>

Setting: `recommendation_layout`. Type: `select`.

`grid`, `carousel`, `cards`

</details>

### Show carousel arrows

Turn on “Show carousel arrows” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_arrows`. Type: `checkbox`.

</details>

### Show arrows on mobile

Turn on “Show arrows on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_mobile_arrows`. Type: `checkbox`.

</details>

## Product card

### Show vendor

Turn on “Show vendor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_vendor`. Type: `checkbox`.

</details>

### Show price

Turn on “Show price” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_price`. Type: `checkbox`.

</details>

### Show sale badge

Turn on “Show sale badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_sale_badge`. Type: `checkbox`.

</details>

### Sale badge text

Enter the sale badge text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sale`.

<details><summary>Reference for connected builders</summary>

Setting: `sale_badge_text`. Type: `text`.

</details>

### Show button

Turn on “Show button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_button`. Type: `checkbox`.

</details>

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View product`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Product title size

Drag the control to adjust product title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 28 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `product_title_size`. Type: `range`.

</details>

## Images

### Image fit

Choose one of the supported options below for image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `image_fit`. Type: `select`.

`cover`, `contain`

</details>

### Image ratio

Drag the control to adjust image ratio. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `125`.

Range: 60 to 180 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `image_ratio`. Type: `range`.

</details>

## Columns

### Columns desktop

Drag the control to adjust columns desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Columns tablet

Drag the control to adjust columns tablet. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns mobile

Drag the control to adjust columns mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `range`.

</details>

## Empty state

### Show empty state

Turn on “Show empty state” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_empty_state`. Type: `checkbox`.

</details>

### Empty state text

Enter the empty state text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Recommendations will appear when products are available.`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `text`.

</details>

## Accessibility labels

### Recommendations label

Enter the recommendations label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Recommended products`.

<details><summary>Reference for connected builders</summary>

Setting: `recommendations_label`. Type: `text`.

</details>

### Previous label

Enter the previous label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Previous recommended products`.

<details><summary>Reference for connected builders</summary>

Setting: `previous_label`. Type: `text`.

</details>

### Next label

Enter the next label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Next recommended products`.

<details><summary>Reference for connected builders</summary>

Setting: `next_label`. Type: `text`.

</details>

## Colors

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Price color

Choose a color for price color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `price_color`. Type: `color`.

</details>

### Sale color

Choose a color for sale color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#b42318`.

<details><summary>Reference for connected builders</summary>

Setting: `sale_color`. Type: `color`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_background_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `button_background_color`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `button_text_color`. Type: `color`.

</details>

### Arrow background

Choose a color for arrow background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_background_color`. Type: `color`.

</details>

### Arrow text

Choose a color for arrow text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_text_color`. Type: `color`.

</details>

### Focus color

Choose a color for focus color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `focus_color`. Type: `color`.

</details>

## Border

### Border width

Drag the control to adjust border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 8 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

### Card radius

Drag the control to adjust card radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 60 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

## Container

### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto, Small, Medium, Large, Full.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `select`.

`auto`, `small`, `medium`, `large`, `full`

</details>

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`, `right`

</details>

## Spacing

### Grid gap

Drag the control to adjust grid gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 60 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `grid_gap`. Type: `range`.

</details>

### Card padding

Drag the control to adjust card padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 48 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `card_padding`. Type: `range`.

</details>

### Margin top

Drag the control to adjust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_top`. Type: `range`.

</details>

### Margin bottom

Drag the control to adjust margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_bottom`. Type: `range`.

</details>

### Padding

Drag the control to adjust padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding`. Type: `range`.

</details>

## Visibility

### Show on desktop

Turn on “Show on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_desktop`. Type: `checkbox`.

</details>

### Show on tablet

Turn on “Show on tablet” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_tablet`. Type: `checkbox`.

</details>

### Show on mobile

Turn on “Show on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_mobile`. Type: `checkbox`.

</details>

## Animation

### Animation

Choose one of the supported options below for animation. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Fade, Fade up, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation_style`. Type: `select`.

`none`, `fade`, `fade_up`, `zoom`

</details>

### Price range prefix

Enter the price range prefix. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `From`.

<details><summary>Reference for connected builders</summary>

Setting: `price_from_label`. Type: `text`.

</details>

## File reference

`blocks/content-product-recommendations.liquid`
