# Product FAQ

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product FAQ.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Frequently asked questions`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Source

Choose one of the supported options below for source. Only the selected option applies; other settings can further customize its appearance.

Default: `manual`.

Options: Manual (blocks), Metafields (JSON or metaobjects).

<details><summary>Reference for connected builders</summary>

Setting: `source`. Type: `select`.

`manual`, `metafields`

</details>

## Metafields — JSON format (A)

### JSON metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `faq_json_namespace`. Type: `text`.

</details>

### JSON metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `faq`.

<details><summary>Reference for connected builders</summary>

Setting: `faq_json_key`. Type: `text`.

</details>

## Metafields — metaobject list (B)

### Metaobject list metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `faq_metaobject_namespace`. Type: `text`.

</details>

### Metaobject list metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `faq_items`.

<details><summary>Reference for connected builders</summary>

Setting: `faq_metaobject_key`. Type: `text`.

</details>

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `accordion_inline`.

Options: Accordion (inline media), Accordion + media stage (split).

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`accordion_inline`, `accordion_split`

</details>

### Media position (split)

Choose one of the supported options below for media position (split). Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_position`. Type: `select`.

`left`, `right`

</details>

### Sticky media column

Turn on “Sticky media column” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_sticky`. Type: `checkbox`.

</details>

### Open first item

Turn on “Open first item” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_first_item`. Type: `checkbox`.

</details>

## Media behavior

### Media display

Choose one of the supported options below for media display. Only the selected option applies; other settings can further customize its appearance.

Default: `mixed`.

Options: None, Images only, Videos only (includes external), Mixed (images + videos + models).

<details><summary>Reference for connected builders</summary>

Setting: `media_display`. Type: `select`.

`none`, `image`, `video`, `mixed`

</details>

### Aspect ratio

Choose one of the supported options below for aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `adapt`.

Options: Adapt, 1:1, 4:3, 16:9, 3:4.

<details><summary>Reference for connected builders</summary>

Setting: `media_aspect_ratio`. Type: `select`.

`adapt`, `1/1`, `4/3`, `16/9`, `3/4`

</details>

### Media fit

Choose one of the supported options below for media fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`cover`, `contain`

</details>

### Media corner radius (px)

Drag the control to adjust media corner radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `media_radius`. Type: `range`.

</details>

### Link images to full size

Turn on “Link images to full size” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `media_enable_zoom`. Type: `checkbox`.

</details>

### Inline media max width (px)

Drag the control to adjust inline media max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 240 to 760 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `inline_media_max_width`. Type: `range`.

</details>

### Stage media max height (px)

Drag the control to adjust stage media max height (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `560`.

Range: 240 to 900 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `stage_media_max_height`. Type: `range`.

</details>

## Custom colors and typography

### Section background

Choose a color for section background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg`. Type: `color`.

</details>

### Title color

Choose a color for title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `title_color`. Type: `color`.

</details>

### Title font size (px)

Drag the control to adjust title font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 16 to 56 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `range`.

</details>

### Title font weight

Choose one of the supported options below for title font weight. Only the selected option applies; other settings can further customize its appearance.

Default: `700`.

Options: 400, 500, 600, 700, 800.

<details><summary>Reference for connected builders</summary>

Setting: `title_weight`. Type: `select`.

`400`, `500`, `600`, `700`, `800`

</details>

### Question tab background

Choose a color for question tab background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f5f5f5`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_bg`. Type: `color`.

</details>

### Question tab text color

Choose a color for question tab text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_color`. Type: `color`.

</details>

### Question font size (px)

Drag the control to adjust question font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_size`. Type: `range`.

</details>

### Question font weight

Choose one of the supported options below for question font weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: 400, 500, 600, 700.

<details><summary>Reference for connected builders</summary>

Setting: `tab_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Content background

Choose a color for content background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `content_bg`. Type: `color`.

</details>

### Content text color

Choose a color for content text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#333333`.

<details><summary>Reference for connected builders</summary>

Setting: `content_color`. Type: `color`.

</details>

### Content font size (px)

Drag the control to adjust content font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_size`. Type: `range`.

</details>

### Content line height (x10)

Drag the control to adjust content line height (x10). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_line_height`. Type: `range`.

</details>

## Content width and spacing

### Content width

Choose one of the supported options below for content width. Only the selected option applies; other settings can further customize its appearance.

Default: `content-center-aligned`.

Options: Centered content, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `content_width`. Type: `select`.

`content-center-aligned`, `content-full-width`

</details>

### Padding top (px)

Drag the control to adjust padding top (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom (px)

Drag the control to adjust padding bottom (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

## Blocks you can add

### FAQ item

#### Question

Enter the question. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Question`.

<details><summary>Reference for connected builders</summary>

Setting: `question`. Type: `text`.

</details>

#### Answer

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Add your answer here.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `answer`. Type: `richtext`.

</details>

#### Media type

Choose one of the supported options below for media type. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Image, Hosted video, External video (URL), 3D model.

<details><summary>Reference for connected builders</summary>

Setting: `media_type`. Type: `select`.

`none`, `image`, `video`, `external_video`, `model`

</details>

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Hosted video

Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.

<details><summary>Reference for connected builders</summary>

Setting: `video`. Type: `video`.

</details>

#### External video URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `external_video_url`. Type: `url`.

</details>

#### Model (optional — product with a 3D model)

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `model`. Type: `product`.

</details>

#### Poster image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `poster_image`. Type: `image_picker`.

</details>

## File reference

`sections/product-faq.liquid`
