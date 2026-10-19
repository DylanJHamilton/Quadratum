# Featured product hero

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Featured product hero.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 4 blocks can be added.

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay`.

Options: Overlay (text on image), Media left (image/product left), Media right (image/product right).

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`overlay`, `media-left`, `media-right`

</details>

### Min height (vh)

Drag the control to adjust min height (vh). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `80`.

Range: 50 to 100 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `min_h_vh`. Type: `range`.

</details>

### Padding top (px)

Drag the control to adjust padding top (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `96`.

Range: 0 to 200 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_top`. Type: `range`.

</details>

### Padding bottom (px)

Drag the control to adjust padding bottom (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `96`.

Range: 0 to 200 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_bottom`. Type: `range`.

</details>

## Background media

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Background video URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `bg_video_url`. Type: `url`.

</details>

### Background alt text

Enter the background alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Hero background`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_alt`. Type: `text`.

</details>

## Background overlay

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity (%)

Drag the control to adjust overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

## Content backdrop

### Content backdrop style

Choose one of the supported options below for content backdrop style. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None (transparent), Panel (solid), Glass (blur).

<details><summary>Reference for connected builders</summary>

Setting: `card_style`. Type: `select`.

`none`, `panel`, `glass`

</details>

### Panel background (for 'panel')

Choose a color for panel background (for 'panel'). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

Availability condition: `{{ section.settings.card_style == 'panel' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `card_bg`. Type: `color`.

</details>

## Content

### Badge

Enter the badge. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured`.

<details><summary>Reference for connected builders</summary>

Setting: `badge`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Discover your next favorite`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H1, H2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h1`, `h2`

</details>

### Heading size (CSS)

Enter the heading size (css). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `clamp(2.25rem,4vw,3.5rem)`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `text`.

</details>

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Subheading

Enter the subheading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore our featured collection.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `text`.

</details>

### Subheading size (CSS)

Enter the subheading size (css). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `clamp(1rem,1.6vw,1.125rem)`.

<details><summary>Reference for connected builders</summary>

Setting: `sub_size`. Type: `text`.

</details>

### Subheading color

Choose a color for subheading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

### Body text

Enter the body text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Add product, delivery or returns information that applies to your store.

<details><summary>Reference for connected builders</summary>

Setting: `copy`. Type: `text`.

</details>

### Body max width (ch)

Drag the control to adjust body max width (ch). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 40 to 80 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `copy_max_ch`. Type: `range`.

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_align`. Type: `select`.

`left`, `center`, `right`

</details>

### Body text color

Choose a color for body text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `copy_color`. Type: `color`.

</details>

## Button appearance

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text`. Type: `color`.

</details>

### Button outline color

Choose a color for button outline color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_outline`. Type: `color`.

</details>

### Button border width (px)

Drag the control to adjust button border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_border_w`. Type: `range`.

</details>

### Button radius (px)

Drag the control to adjust button radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_radius`. Type: `range`.

</details>

## Primary button

### Primary CTA text

Enter the primary cta text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop Now`.

<details><summary>Reference for connected builders</summary>

Setting: `cta1_text`. Type: `text`.

</details>

### Primary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta1_link`. Type: `url`.

</details>

### Primary button ARIA label

Enter the primary button aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop now`.

<details><summary>Reference for connected builders</summary>

Setting: `cta1_aria`. Type: `text`.

</details>

## Secondary button

### Secondary CTA text

Enter the secondary cta text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn More`.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_text`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_link`. Type: `url`.

</details>

### Secondary button ARIA label

Enter the secondary button aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_aria`. Type: `text`.

</details>

## Product content

### Product content

Choose one of the supported options below for product content. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Single product (ATC in hero), Collection grid under hero.

<details><summary>Reference for connected builders</summary>

Setting: `product_block_mode`. Type: `select`.

`none`, `single`, `collection`

</details>

### Featured product (for 'single')

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

### Show add to cart (for 'single')

Turn on “Show add to cart (for 'single')” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

Availability condition: `{{ section.settings.product_block_mode == 'single' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `show_atc`. Type: `checkbox`.

</details>

## Collection content

### Collection (for 'collection')

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `row_collection`. Type: `collection`.

</details>

### Row heading

Enter the row heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Trending now`.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_heading`. Type: `text`.

</details>

### Max items

Drag the control to adjust max items. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 2 to 12 ; step 1.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_count`. Type: `range`.

</details>

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 5 ; step 1.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_cols_desktop`. Type: `range`.

</details>

### Columns (tablet)

Drag the control to adjust columns (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 2 to 4 ; step 1.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_cols_tablet`. Type: `range`.

</details>

### Columns (mobile)

Choose one of the supported options below for columns (mobile). Only the selected option applies; other settings can further customize its appearance.

Default: `2`.

Options: 1, 2.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_cols_mobile`. Type: `select`.

`1`, `2`

</details>

### Card media aspect

Choose one of the supported options below for card media aspect. Only the selected option applies; other settings can further customize its appearance.

Default: `4:5`.

Options: Square (1:1), Portrait (4:5), Landscape (3:2), Widescreen (16:9).

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_card_ratio`. Type: `select`.

`1:1`, `4:5`, `3:2`, `16:9`

</details>

### Grid gap (px)

Drag the control to adjust grid gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 32 ; step 2.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_gap`. Type: `range`.

</details>

### Row background

Turn on “Row background” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_bg_enable`. Type: `checkbox`.

</details>

### Row background color

Choose a color for row background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_bg_color`. Type: `color`.

</details>

### Row padding top (px)

Drag the control to adjust row padding top (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_pad_top`. Type: `range`.

</details>

### Row padding bottom (px)

Drag the control to adjust row padding bottom (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

Availability condition: `{{ section.settings.product_block_mode == 'collection' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `row_pad_bottom`. Type: `range`.

</details>

## Motion

### Enable reveal animations

Turn on “Enable reveal animations” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `reveal_enable`. Type: `checkbox`.

</details>

### Default reveal direction

Choose one of the supported options below for default reveal direction. Only the selected option applies; other settings can further customize its appearance.

Default: `up`.

Options: Up, Left, Right, Fade only.

Availability condition: `{{ section.settings.reveal_enable }}`.

<details><summary>Reference for connected builders</summary>

Setting: `reveal_style`. Type: `select`.

`up`, `left`, `right`, `fade`

</details>

### Reveal easing

Enter the reveal easing. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `cubic-bezier(.2,.8,.2,1)`.

Availability condition: `{{ section.settings.reveal_enable }}`.

<details><summary>Reference for connected builders</summary>

Setting: `reveal_ease`. Type: `text`.

</details>

### Reveal duration (ms)

Drag the control to adjust reveal duration (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 1200 ; step 50.

Availability condition: `{{ section.settings.reveal_enable }}`.

<details><summary>Reference for connected builders</summary>

Setting: `reveal_dur`. Type: `range`.

</details>

### Enable background parallax

Turn on “Enable background parallax” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `parallax_enable`. Type: `checkbox`.

</details>

### Parallax strength

Drag the control to adjust parallax strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 30 ; step 1.

Availability condition: `{{ section.settings.parallax_enable }}`.

<details><summary>Reference for connected builders</summary>

Setting: `parallax_strength`. Type: `range`.

</details>

## Per-section button motion (optional)

### Override global button motion for this hero

Turn on “Override global button motion for this hero” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_section_button_motion`. Type: `checkbox`.

</details>

### Hover opacity (%)

Drag the control to adjust hover opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `92`.

Range: 60 to 100 ; step 1.

Availability condition: `{{ section.settings.use_section_button_motion }}`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_opacity_local`. Type: `range`.

</details>

### Pressed scale (×100)

Drag the control to adjust pressed scale (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `98`.

Range: 95 to 100 ; step 1.

Availability condition: `{{ section.settings.use_section_button_motion }}`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_active_scale_local`. Type: `range`.

</details>

## Accessibility

### ARIA region label

Enter the aria region label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured product hero`.

<details><summary>Reference for connected builders</summary>

Setting: `region_label`. Type: `text`.

</details>

## Blocks you can add

### @app

Select a compatible installed app. The app provides its settings and service.

### Custom Liquid

#### Custom Liquid

Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.

<details><summary>Reference for connected builders</summary>

Setting: `liquid`. Type: `liquid`.

</details>

### Spec item

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Value

Enter the value. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `text`.

</details>

## File reference

`sections/featured-product-hero-banner.liquid`
