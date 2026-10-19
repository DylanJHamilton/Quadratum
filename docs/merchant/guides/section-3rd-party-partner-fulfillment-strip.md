# 3P - partner strip

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3P - partner strip.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

A native collection preview, not fulfillment integration. Use a collection/tag containing only the intended partner products and enter accurate delivery copy. Filtering and local price/date sorting inspect at most the first 50 products supplied by Shopify. The collection link opens the full tagged/sorted catalog; Shopify can redirect unused tags.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfilled by partner product strip`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfilled by partner`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore our partner selection`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Browse this selection and check individual product pages for current delivery information.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

### Shipping note

Enter the shipping note. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `See each product’s delivery details.`.

<details><summary>Reference for connected builders</summary>

Setting: `shipping_note`. Type: `text`.

</details>

## Partner labeling

### Partner / network name

Enter the partner / network name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Our fulfillment partners`.

<details><summary>Reference for connected builders</summary>

Setting: `partner_name`. Type: `text`.

</details>

### Badge text

Enter the badge text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfilled by partner`.

<details><summary>Reference for connected builders</summary>

Setting: `fulfilled_badge_text`. Type: `text`.

</details>

### Show partner logo

Turn on “Show partner logo” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_partner_logo`. Type: `checkbox`.

</details>

### Partner logo

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `partner_logo`. Type: `image_picker`.

</details>

## Products source

### Product collection

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

### Filter by product tag (optional)

Enter the filter by product tag (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `filter_tag`. Type: `text`.

</details>

### Max products to show

Drag the control to adjust max products to show. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_items`. Type: `range`.

</details>

### Preview sort order

Choose one of the supported options below for preview sort order. Only the selected option applies; other settings can further customize its appearance.

Price/newest sorts apply within the preview. Best selling requires the collection’s native order to be Best selling.

Default: `collection_default`.

Options: Collection default, Best selling (collection order), Price, low to high, Price, high to low, Newest first.

<details><summary>Reference for connected builders</summary>

Setting: `sort_order`. Type: `select`.

`collection_default`, `best_selling`, `price_asc`, `price_desc`, `created_desc`

</details>

## Layout and styling

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `strip`.

Options: Strip, Carousel, Grid.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`strip`, `carousel`, `grid`

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Contrast, Brand color.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`surface`, `contrast`, `brand`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`

</details>

## View all link

### Show "view all" link

Turn on “Show "view all" link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_view_all_link`. Type: `checkbox`.

</details>

### "View all" label

Enter the "view all" label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Browse the collection`.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_label`. Type: `text`.

</details>

### "View all" link destination

Choose one of the supported options below for "view all" link destination. Only the selected option applies; other settings can further customize its appearance.

Default: `collection`.

Options: Selected collection, Custom URL.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_url_mode`. Type: `select`.

`collection`, `custom`

</details>

### Custom "view all" URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_custom_url`. Type: `url`.

</details>

## File reference

`sections/3rd-party-partner-fulfillment-strip.liquid`
