# Social media - FB basic

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - FB basic.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Merchant-curated content and native links unless an explicit provider embed is configured. The theme does not fetch social posts, authorize accounts, verify claims or implement feed synchronization.

## Content

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Follow us on Facebook`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body

Write the body. Keep paragraphs short and preview long text on mobile.

Default: `Stay connected with our latest updates, news, and offers on Facebook.`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full bleed.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`contained`, `full_bleed`

</details>

### Max width (px)

Drag the control to adjust max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1152`.

Range: 768 to 1440 ; step 16.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Embed alignment

Choose one of the supported options below for embed alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `embed_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

## Facebook page

### Facebook page URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

If left blank, the theme's Integrations → Facebook URL will be used.

<details><summary>Reference for connected builders</summary>

Setting: `facebook_page_url`. Type: `url`.

</details>

### Embed width (px)

Drag the control to adjust embed width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `500`.

Range: 320 to 500 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `embed_width`. Type: `range`.

</details>

### Embed height (px)

Drag the control to adjust embed height (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 200 to 900 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `embed_height`. Type: `range`.

</details>

### Show cover photo

Turn on “Show cover photo” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_cover`. Type: `checkbox`.

</details>

### Show friend faces

Turn on “Show friend faces” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_facepile`. Type: `checkbox`.

</details>

### Show timeline posts

Turn on “Show timeline posts” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_posts`. Type: `checkbox`.

</details>

## Performance

### Lazy-load Facebook embed (HTML loading attribute only)

Turn on “Lazy-load Facebook embed (HTML loading attribute only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Enable native lazy loading for the Facebook iframe.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `lazyload_embed`. Type: `checkbox`.

</details>

## File reference

`sections/social-media-facebook-feed.liquid`
