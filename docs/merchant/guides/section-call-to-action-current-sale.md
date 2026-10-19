# Button — current sale

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Button — current sale.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Split, Grid, Strip.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`split`, `grid`, `strip`

</details>

### Default destination URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `sale_destination_url`. Type: `url`.

</details>

### Discount code (optional)

Enter the discount code (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `discount_code_badge`. Type: `text`.

</details>

### Auto-append ?discount=

Turn on “Auto-append ?discount=” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `auto_apply_discount`. Type: `checkbox`.

</details>

### Surface

Choose one of the supported options below for surface. Only the selected option applies; other settings can further customize its appearance.

Default: `elevated`.

Options: Default, Elevated card, Outlined, Accent.

<details><summary>Reference for connected builders</summary>

Setting: `surface_style`. Type: `select`.

`default`, `elevated`, `outlined`, `accent`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `start`.

Options: Start, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`start`, `center`

</details>

### Section width

Choose one of the supported options below for section width. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Background image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg_image`. Type: `image_picker`.

</details>

### Background overlay opacity

Drag the control to adjust background overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 90 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg_overlay`. Type: `range`.

</details>

## Blocks you can add

### Text

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `New Markdowns`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

#### Headline

Enter the headline. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Up to 40% OFF`.

<details><summary>Reference for connected builders</summary>

Setting: `headline`. Type: `text`.

</details>

#### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Ends Sunday. Online only.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

#### Show discount code pill from section

Turn on “Show discount code pill from section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_discount_code`. Type: `checkbox`.

</details>

#### Text align

Choose one of the supported options below for text align. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_align`. Type: `select`.

`left`, `center`, `right`

</details>

### Badge

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Text

Enter the text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `SALE`.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `text`.

</details>

#### Background color

Enter the background color. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `#dc2626`.

<details><summary>Reference for connected builders</summary>

Setting: `bg`. Type: `text`.

</details>

#### Text color

Enter the text color. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `fg`. Type: `text`.

</details>

#### Inline style

Turn on “Inline style” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `inline`. Type: `checkbox`.

</details>

### Countdown

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### End date and time

Enter the real end date and time of a genuine event or offer in the format described below. Check the time zone. Do not use a resetting countdown or imply a discount that has not been configured in Shopify.

Include the time zone, for example 2027-12-31T23:59:59Z.

<details><summary>Reference for connected builders</summary>

Setting: `end_datetime`. Type: `text`.

</details>

#### Style

Choose one of the supported options below for style. Only the selected option applies; other settings can further customize its appearance.

Default: `inline`.

Options: Inline, Stacked blocks.

<details><summary>Reference for connected builders</summary>

Setting: `variant`. Type: `select`.

`inline`, `stacked`

</details>

#### Show days

Turn on “Show days” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_days`. Type: `checkbox`.

</details>

#### Show labels (d/h/m/s)

Turn on “Show labels (d/h/m/s)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_labels`. Type: `checkbox`.

</details>

### Image

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Alt text

Enter the alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `alt`. Type: `text`.

</details>

#### Aspect ratio

Choose one of the supported options below for aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `ratio-1-1`.

Options: 1:1, 4:3, 3:2, 16:9.

<details><summary>Reference for connected builders</summary>

Setting: `ratio`. Type: `select`.

`ratio-1-1`, `ratio-4-3`, `ratio-3-2`, `ratio-16-9`

</details>

#### Width (px)

Drag the control to adjust width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `240`.

Range: 96 to 640 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `range`.

</details>

#### Add dark overlay

Turn on “Add dark overlay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay`. Type: `checkbox`.

</details>

### Progress

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Aria label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `% claimed`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `claimed`.

Options: % claimed, % stock remaining.

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`claimed`, `stock`

</details>

#### Value %

Drag the control to adjust value %. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `value`. Type: `range`.

</details>

#### Show numeric value

Turn on “Show numeric value” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_value`. Type: `checkbox`.

</details>

#### Thin bar (strip)

Turn on “Thin bar (strip)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `thin`. Type: `checkbox`.

</details>

### Buttons

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Primary label

Enter the primary label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop Sale`.

<details><summary>Reference for connected builders</summary>

Setting: `primary_label`. Type: `text`.

</details>

#### Primary URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `primary_url`. Type: `url`.

</details>

#### Secondary label

Enter the secondary label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_label`. Type: `text`.

</details>

#### Secondary URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_url`. Type: `url`.

</details>

### Spacer

#### Slot

Choose one of the supported options below for slot. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Split — left, Split — right, Grid — header, Strip — left, Strip — center, Strip — right.

<details><summary>Reference for connected builders</summary>

Setting: `slot`. Type: `select`.

`left`, `right`, `grid_head`, `strip_left`, `strip_center`, `strip_right`

</details>

#### Width (px)

Drag the control to adjust width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `range`.

</details>

### Promo card (grid only)

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Category Sale`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Subtitle

Enter the subtitle. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `text`.

</details>

#### Percent label

Enter the percent label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Up to 30% off`.

<details><summary>Reference for connected builders</summary>

Setting: `percent_off`. Type: `text`.

</details>

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### Button URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

## File reference

`sections/call-to-action-current-sale.liquid`
