# Product story

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product story.
2. Start with Manual blocks and add story text, images, or timeline items. Use Split for a lead image beside the story; additional media remains in the content.
3. For advanced data, select a product metafield. A reference entry may supply heading, content, media_image, media_video, media_caption, and timeline_items. A timeline list uses title, date, text, and image fields.
4. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
5. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
6. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Content

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `The story behind this product`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Intro (optional)

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `intro`. Type: `richtext`.

</details>

## Source

### Story source

Choose one of the supported options below for story source. Only the selected option applies; other settings can further customize its appearance.

Default: `metafield`.

Options: Manual (blocks), Product metafield, Metaobject reference.

<details><summary>Reference for connected builders</summary>

Setting: `source`. Type: `select`.

`manual`, `metafield`, `metaobject`

</details>

### Metafield namespace (when source = metafield)

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_namespace`. Type: `text`.

</details>

### Metafield key (when source = metafield)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `story`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_key`. Type: `text`.

</details>

### Entry reference metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `entry_reference_namespace`. Type: `text`.

</details>

### Entry reference metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Optional product metafield containing a metaobject reference. Manual content works without a metafield.

Default: `story`.

<details><summary>Reference for connected builders</summary>

Setting: `entry_reference_key`. Type: `text`.

</details>

Optional: connect a product metafield containing a metaobject reference. You can also enter the story manually without creating a definition.

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Stack, Split.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`stack`, `split`

</details>

### Media position (desktop)

Choose one of the supported options below for media position (desktop). Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `media_position_desktop`. Type: `select`.

`left`, `right`

</details>

### Media ratio

Choose one of the supported options below for media ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `adapt`.

Options: Adapt, Square, Landscape (16:9), Portrait (4:5).

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `select`.

`adapt`, `square`, `landscape`, `portrait`

</details>

### Media fit

Choose one of the supported options below for media fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`cover`, `contain`

</details>

### Content width

Choose one of the supported options below for content width. Only the selected option applies; other settings can further customize its appearance.

Default: `content-center-aligned`.

Options: Center aligned, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `content_width`. Type: `select`.

`content-center-aligned`, `content-full-width`

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `text_alignment`. Type: `select`.

`left`, `center`

</details>

## Media

### Show media

Turn on “Show media” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_media`. Type: `checkbox`.

</details>

### Preferred media type

Choose one of the supported options below for preferred media type. Only the selected option applies; other settings can further customize its appearance.

Default: `image`.

Options: Image, Video.

<details><summary>Reference for connected builders</summary>

Setting: `media_type`. Type: `select`.

`image`, `video`

</details>

### Fallback image (if no media block / metaobject media)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

### Fallback video (if no media block / metaobject media)

Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.

<details><summary>Reference for connected builders</summary>

Setting: `video`. Type: `video`.

</details>

### Autoplay video

Turn on “Autoplay video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `video_autoplay`. Type: `checkbox`.

</details>

### Loop video

Turn on “Loop video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `video_loop`. Type: `checkbox`.

</details>

### Media caption (optional)

Enter the media caption (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `media_caption`. Type: `text`.

</details>

## Timeline (optional)

### Show timeline

Turn on “Show timeline” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_timeline`. Type: `checkbox`.

</details>

### Timeline source

Choose one of the supported options below for timeline source. Only the selected option applies; other settings can further customize its appearance.

Default: `manual`.

Options: Manual (blocks), Metaobject list.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_source`. Type: `select`.

`manual`, `metaobject_list`

</details>

### Timeline heading

Enter the timeline heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Timeline`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_heading`. Type: `text`.

</details>

### Timeline reference metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_reference_namespace`. Type: `text`.

</details>

### Timeline reference metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Optional product metafield containing a metaobject reference list. Manual content works without a metafield.

Default: `timeline`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_reference_key`. Type: `text`.

</details>

## Spacing

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

## Colors

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Card / surface background

Choose a color for card / surface background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f7f7f7`.

<details><summary>Reference for connected builders</summary>

Setting: `surface_color`. Type: `color`.

</details>

### Body text

Choose a color for body text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Headings

Choose a color for headings. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#555555`.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Borders

Choose a color for borders. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Media background

Choose a color for media background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f2f2f2`.

<details><summary>Reference for connected builders</summary>

Setting: `media_bg_color`. Type: `color`.

</details>

### Timeline dot

Choose a color for timeline dot. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_dot_color`. Type: `color`.

</details>

## Blocks you can add

### Story paragraph

#### Content

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Share the inspiration, materials, and craft behind this product.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `content`. Type: `richtext`.

</details>

### Story image

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Caption (optional)

Enter the caption (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `caption`. Type: `text`.

</details>

#### Ratio override

Choose one of the supported options below for ratio override. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit, Adapt, Square, Landscape (16:9), Portrait (4:5).

<details><summary>Reference for connected builders</summary>

Setting: `ratio`. Type: `select`.

`inherit`, `adapt`, `square`, `landscape`, `portrait`

</details>

### Story video

#### Video

Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.

<details><summary>Reference for connected builders</summary>

Setting: `video`. Type: `video`.

</details>

#### Caption (optional)

Enter the caption (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `caption`. Type: `text`.

</details>

### Timeline item

#### Date (text)

Enter the date (text). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Shopify sections do not support a true date picker here. Use e.g. 2026-02-28 or Jan 2026.

<details><summary>Reference for connected builders</summary>

Setting: `date`. Type: `text`.

</details>

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `richtext`.

</details>

#### Image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `media_image`. Type: `image_picker`.

</details>

## File reference

`sections/product-story.liquid`
