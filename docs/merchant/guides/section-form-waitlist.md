# Form – waitlist

[All documentation](../README.md) · [Support](../SUPPORT.md)

Forms and support.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Form – waitlist.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product waitlist form`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Layout

### Template

Choose one of the supported options below for template. Only the selected option applies; other settings can further customize its appearance.

Default: `inline`.

Options: Inline (PDP minimal), Card (landing), Split (image + form).

<details><summary>Reference for connected builders</summary>

Setting: `template_style`. Type: `select`.

`inline`, `card`, `split`

</details>

### Surface chrome

Choose one of the supported options below for surface chrome. Only the selected option applies; other settings can further customize its appearance.

Inline always uses a minimal frameless surface. Card and Split use this setting.

Default: `card`.

Options: Card, Frameless (no card).

<details><summary>Reference for connected builders</summary>

Setting: `surface_style`. Type: `select`.

`card`, `frameless`

</details>

### Split: media side

Choose one of the supported options below for split: media side. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_side`. Type: `select`.

`left`, `right`

</details>

### Split image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `split_image`. Type: `image_picker`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Back in stock`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get notified when it’s back`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h3`.

Options: H2, H3.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h2`, `h3`

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `We’ll email you as soon as this variant is restocked.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Button

Enter the button. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Notify Me`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Show first name field

Turn on “Show first name field” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_first_name`. Type: `checkbox`.

</details>

## Variant binding

### Bind mode

Choose one of the supported options below for bind mode. Only the selected option applies; other settings can further customize its appearance.

Auto syncs a uniquely identified product purchase form on the matching product page. The waitlist picker remains available; unrelated forms and quick views are ignored.

Default: `auto`.

Options: Auto-detect from PDP (recommended), Manual only (show picker).

<details><summary>Reference for connected builders</summary>

Setting: `bind_mode`. Type: `select`.

`auto`, `manual`

</details>

### Product handle (optional override)

Enter the product handle (optional override). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Defaults to the current product on product pages. Elsewhere choose a published handle. Missing/unpublished products leave the form unavailable; variants render natively without a network request.

<details><summary>Reference for connected builders</summary>

Setting: `product_handle`. Type: `text`.

</details>

### Variant placeholder

Enter the variant placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Select a variant…`.

<details><summary>Reference for connected builders</summary>

Setting: `variant_placeholder`. Type: `text`.

</details>

### Variant help text

Enter the variant help text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Choose size/color to join the waitlist.`.

<details><summary>Reference for connected builders</summary>

Setting: `variant_help`. Type: `text`.

</details>

## Consent and privacy

### Consent label

Enter the consent label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `I agree to receive an email when this item is back in stock.`.

<details><summary>Reference for connected builders</summary>

Setting: `consent_label`. Type: `text`.

</details>

### Privacy link (URL)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `privacy_link`. Type: `url`.

</details>

### Privacy link label

Enter the privacy link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Privacy Policy`.

<details><summary>Reference for connected builders</summary>

Setting: `privacy_text`. Type: `text`.

</details>

## Routing

### Destination

Choose one of the supported options below for destination. Only the selected option applies; other settings can further customize its appearance.

Shopify Customer is an email marketing signup. Automated restock delivery requires a configured notification integration or a custom endpoint that processes inventory events. Match storefront copy to the service actually enabled.

Default: `shopify_customer`.

Options: Shopify customer (tags + marketing consent), Custom endpoint (POST).

<details><summary>Reference for connected builders</summary>

Setting: `destination`. Type: `select`.

`shopify_customer`, `custom_endpoint`

</details>

### Custom endpoint URL (HTTPS)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

The endpoint must process the POST, consent, captcha and notification service. Variant ID is submitted natively; label and enriched tags require JavaScript.

<details><summary>Reference for connected builders</summary>

Setting: `endpoint_url`. Type: `url`.

</details>

### Hidden tags (comma-separated)

Enter the hidden tags (comma-separated). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `waitlist, web`.

<details><summary>Reference for connected builders</summary>

Setting: `hidden_tags`. Type: `text`.

</details>

## Captcha

### Captcha

Choose one of the supported options below for captcha. Only the selected option applies; other settings can further customize its appearance.

Custom endpoints only, with server verification. Native Customer signup uses Shopify spam protection.

Default: `none`.

Options: None, Cloudflare turnstile, reCAPTCHA v3.

<details><summary>Reference for connected builders</summary>

Setting: `captcha_mode`. Type: `select`.

`none`, `turnstile`, `recaptcha_v3`

</details>

### Captcha site key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

<details><summary>Reference for connected builders</summary>

Setting: `captcha_site_key`. Type: `text`.

</details>

## Button and inputs

### Button variant

Choose one of the supported options below for button variant. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: — Theme default —, Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_variant`. Type: `select`.

`inherit`, `solid`, `outline`, `ghost`

</details>

### Form background

Choose a color for form background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `form_bg`. Type: `color`.

</details>

### Input radius

Drag the control to adjust input radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_radius`. Type: `range`.

</details>

### Input border color

Choose a color for input border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `input_border`. Type: `color`.

</details>

## Sizing and background

### Container

Choose one of the supported options below for container. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full-bleed.

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Padding Y

Drag the control to adjust padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 160 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Padding X

Drag the control to adjust padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

</details>

### Card radius

Drag the control to adjust card radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card elevation

Drag the control to adjust card elevation. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `range`.

</details>

## Overlay (optional)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Overlay

Choose one of the supported options below for overlay. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Solid, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`none`, `solid`, `gradient`

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `30`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Gradient start

Choose a color for gradient start. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start`. Type: `color`.

</details>

### Start opacity

Drag the control to adjust start opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `35`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start_opacity`. Type: `range`.

</details>

### Gradient end

Choose a color for gradient end. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end`. Type: `color`.

</details>

### End opacity

Drag the control to adjust end opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

### Gradient angle

Drag the control to adjust gradient angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `180`.

Range: 0 to 360 deg; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

## Visibility

### Anchor ID

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### Hide on mobile

Turn on “Hide on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_mobile`. Type: `checkbox`.

</details>

### Hide on desktop

Turn on “Hide on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_desktop`. Type: `checkbox`.

</details>

## Messages

### Success message

Enter the success message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Shown only after a successful native Shopify response. Do not promise automatic alerts unless an integration actually sends them; custom endpoints own their response.

Default: `All set — we’ll email you the moment it’s available.`.

<details><summary>Reference for connected builders</summary>

Setting: `success_text`. Type: `text`.

</details>

### Error message

Enter the error message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Please fix the highlighted fields and try again.`.

<details><summary>Reference for connected builders</summary>

Setting: `error_text`. Type: `text`.

</details>

## File reference

`sections/form-waitlist.liquid`
