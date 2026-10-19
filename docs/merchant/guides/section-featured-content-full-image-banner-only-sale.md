# Featured sale banner

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Featured sale banner.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Responsive images

Recommended sizes — Desktop: 2400×800, Laptop: 1800×700, Tablet: 1400×700, Mobile: 900×1100. Use WebP when possible and keep each file under ~300–500KB.

### Image — desktop

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image_desktop`. Type: `image_picker`.

</details>

### Image — laptop

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image_laptop`. Type: `image_picker`.

</details>

### Image — tablet

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image_tablet`. Type: `image_picker`.

</details>

### Image — mobile

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image_mobile`. Type: `image_picker`.

</details>

## Link (optional)

### Link URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `link_url`. Type: `url`.

</details>

### Link label (ARIA)

Enter the link label (aria). Replace sample wording with your own content; leave optional fields empty when you do not need them.

If Link URL is set, this label is used for accessibility (example: “Shop Spring Sale”).

Default: `View promotion`.

<details><summary>Reference for connected builders</summary>

Setting: `link_label`. Type: `text`.

</details>

## Banner sizing and fit

### Height mode

Choose one of the supported options below for height mode. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (image-driven), Fixed height per device (advanced).

<details><summary>Reference for connected builders</summary>

Setting: `height_mode`. Type: `select`.

`auto`, `fixed`

</details>

### Desktop height (fixed mode)

Drag the control to adjust desktop height (fixed mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `320`.

Range: 120 to 900 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `height_desktop`. Type: `range`.

</details>

### Laptop height (fixed mode)

Drag the control to adjust laptop height (fixed mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `300`.

Range: 120 to 900 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `height_laptop`. Type: `range`.

</details>

### Tablet height (fixed mode)

Drag the control to adjust tablet height (fixed mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `320`.

Range: 120 to 900 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `height_tablet`. Type: `range`.

</details>

### Mobile height (fixed mode)

Drag the control to adjust mobile height (fixed mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 120 to 900 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `height_mobile`. Type: `range`.

</details>

### Image fit

Choose one of the supported options below for image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `image_fit`. Type: `select`.

`cover`, `contain`

</details>

### Image position

Choose one of the supported options below for image position. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Top, Bottom, Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `image_position`. Type: `select`.

`center`, `top`, `bottom`, `left`, `right`

</details>

## Optional overlay

### Enable overlay

Turn on “Enable overlay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_enable`. Type: `checkbox`.

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 90 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

## Layout controls

### Full bleed

Turn on “Full bleed” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `full_bleed`. Type: `checkbox`.

</details>

### Max width (when not full bleed)

Drag the control to adjust max width (when not full bleed). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1440`.

Range: 480 to 2480 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Section padding (top/bottom)

Drag the control to adjust section padding (top/bottom). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Section padding (left/right)

Drag the control to adjust section padding (left/right). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 80 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Radius

Drag the control to adjust radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 48 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Shadow strength

Drag the control to adjust shadow strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Schema-safe decimals (0.0–1.0).

Default: `0.0`.

Range: 0 to 1 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `shadow_strength`. Type: `range`.

</details>

## Style system controls

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `rgba(0,0,0,0)`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

## Recommendations

Linking: Point to a Deals page / sale collection / financing offer / campaign landing page. Add UTM parameters for tracking if running ads.

Accessibility: If the banner is clickable, set a clear ARIA link label (e.g., “Shop Spring Sale”).

## File reference

`sections/featured-content-full-image-banner-only-sale.liquid`
