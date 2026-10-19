# Feature showcase

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Feature showcase. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Block section, Product block section.

## Content

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

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `richtext`.

</details>

### Button text

Enter the button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore features`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_text`. Type: `text`.

</details>

### Button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

## Media

### Media type

Choose one of the supported options below for media type. Only the selected option applies; other settings can further customize its appearance.

Default: `image`.

Options: Image, Uploaded video, External video link.

<details><summary>Reference for connected builders</summary>

Setting: `media_type`. Type: `select`.

`image`, `video`, `external_video`

</details>

### Image or video poster

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

### Uploaded video

Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.

Availability condition: `{{ block.settings.media_type == 'video' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video`. Type: `video`.

</details>

### External video link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.media_type == 'external_video' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `external_video_url`. Type: `url`.

</details>

### Autoplay uploaded video

Turn on “Autoplay uploaded video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

Availability condition: `{{ block.settings.media_type == 'video' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay_video`. Type: `checkbox`.

</details>

### Show video controls

Turn on “Show video controls” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

Availability condition: `{{ block.settings.media_type == 'video' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `show_video_controls`. Type: `checkbox`.

</details>

### Media badge

Enter the media badge. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `media_badge`. Type: `text`.

</details>

### Media caption

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `media_caption`. Type: `richtext`.

</details>

### Desktop media minimum height

Drag the control to adjust desktop media minimum height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `560`.

Range: 320 to 820 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `media_height`. Type: `range`.

</details>

### Mobile media minimum height

Drag the control to adjust mobile media minimum height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `340`.

Range: 240 to 560 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_media_height`. Type: `range`.

</details>

## Feature cards

### Show numbers when icon is empty

Turn on “Show numbers when icon is empty” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_feature_numbers`. Type: `checkbox`.

</details>

## Feature 1

### Enable feature 1

Turn on “Enable feature 1” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_enabled`. Type: `checkbox`.

</details>

### Feature 1 icon or symbol

Enter the feature 1 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_1_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_icon`. Type: `text`.

</details>

### Feature 1 heading

Enter the feature 1 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_1_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_heading`. Type: `text`.

</details>

### Feature 1 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_1_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_text`. Type: `richtext`.

</details>

### Feature 1 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_1_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_link`. Type: `url`.

</details>

### Feature 1 link text

Enter the feature 1 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

Availability condition: `{{ block.settings.feature_1_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_1_link_text`. Type: `text`.

</details>

## Feature 2

### Enable feature 2

Turn on “Enable feature 2” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_enabled`. Type: `checkbox`.

</details>

### Feature 2 icon or symbol

Enter the feature 2 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_2_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_icon`. Type: `text`.

</details>

### Feature 2 heading

Enter the feature 2 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_2_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_heading`. Type: `text`.

</details>

### Feature 2 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_2_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_text`. Type: `richtext`.

</details>

### Feature 2 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_2_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_link`. Type: `url`.

</details>

### Feature 2 link text

Enter the feature 2 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View detail`.

Availability condition: `{{ block.settings.feature_2_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_2_link_text`. Type: `text`.

</details>

## Feature 3

### Enable feature 3

Turn on “Enable feature 3” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_enabled`. Type: `checkbox`.

</details>

### Feature 3 icon or symbol

Enter the feature 3 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_3_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_icon`. Type: `text`.

</details>

### Feature 3 heading

Enter the feature 3 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_3_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_heading`. Type: `text`.

</details>

### Feature 3 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_3_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_text`. Type: `richtext`.

</details>

### Feature 3 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_3_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_link`. Type: `url`.

</details>

### Feature 3 link text

Enter the feature 3 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore`.

Availability condition: `{{ block.settings.feature_3_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_3_link_text`. Type: `text`.

</details>

## Feature 4

### Enable feature 4

Turn on “Enable feature 4” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_enabled`. Type: `checkbox`.

</details>

### Feature 4 icon or symbol

Enter the feature 4 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_4_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_icon`. Type: `text`.

</details>

### Feature 4 heading

Enter the feature 4 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_4_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_heading`. Type: `text`.

</details>

### Feature 4 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_4_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_text`. Type: `richtext`.

</details>

### Feature 4 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_4_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_link`. Type: `url`.

</details>

### Feature 4 link text

Enter the feature 4 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_4_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_4_link_text`. Type: `text`.

</details>

## Feature 5

### Enable feature 5

Turn on “Enable feature 5” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_enabled`. Type: `checkbox`.

</details>

### Feature 5 icon or symbol

Enter the feature 5 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_5_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_icon`. Type: `text`.

</details>

### Feature 5 heading

Enter the feature 5 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_5_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_heading`. Type: `text`.

</details>

### Feature 5 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_5_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_text`. Type: `richtext`.

</details>

### Feature 5 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_5_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_link`. Type: `url`.

</details>

### Feature 5 link text

Enter the feature 5 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_5_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_5_link_text`. Type: `text`.

</details>

## Feature 6

### Enable feature 6

Turn on “Enable feature 6” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_enabled`. Type: `checkbox`.

</details>

### Feature 6 icon or symbol

Enter the feature 6 icon or symbol. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_6_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_icon`. Type: `text`.

</details>

### Feature 6 heading

Enter the feature 6 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_6_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_heading`. Type: `text`.

</details>

### Feature 6 text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Availability condition: `{{ block.settings.feature_6_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_text`. Type: `richtext`.

</details>

### Feature 6 link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ block.settings.feature_6_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_link`. Type: `url`.

</details>

### Feature 6 link text

Enter the feature 6 link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Availability condition: `{{ block.settings.feature_6_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `feature_6_link_text`. Type: `text`.

</details>

## Behavior

### Enable sticky media on desktop

Turn on “Enable sticky media on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_sticky_media`. Type: `checkbox`.

</details>

### Enable progressive feature reveal

Turn on “Enable progressive feature reveal” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_progressive_reveal`. Type: `checkbox`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Split, Stacked, Immersive.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`split`, `stacked`, `immersive`

</details>

### Media position

Choose one of the supported options below for media position. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `media_position`. Type: `select`.

`left`, `right`

</details>

### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

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

### Gap

Drag the control to adjust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 8 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

## Spacing

### Margin top

Drag the control to adjust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_top`. Type: `range`.

</details>

### Margin bottom

Drag the control to adjust margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_bottom`. Type: `range`.

</details>

### Padding

Drag the control to adjust padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding`. Type: `range`.

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

Default: `#4A4A4A`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

### Media background

Choose a color for media background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#F6F6F6`.

<details><summary>Reference for connected builders</summary>

Setting: `media_background_color`. Type: `color`.

</details>

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `card_background_color`. Type: `color`.

</details>

### Card border

Choose a color for card border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#E5E5E5`.

<details><summary>Reference for connected builders</summary>

Setting: `card_border_color`. Type: `color`.

</details>

### Block border color

Choose a color for block border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#E5E5E5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Link color

Choose a color for link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

## Border

### Block border width

Drag the control to adjust block border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 8 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

### Block border radius

Drag the control to adjust block border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 0 to 48 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `border_radius`. Type: `range`.

</details>

### Card border radius

Drag the control to adjust card border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 40 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

## Visibility

### Show on desktop

Turn on “Show on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_desktop`. Type: `checkbox`.

</details>

### Show on tablet

Turn on “Show on tablet” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_tablet`. Type: `checkbox`.

</details>

### Show on mobile

Turn on “Show on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_mobile`. Type: `checkbox`.

</details>

## Animation

### Animation

Choose one of the supported options below for animation. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Fade, Fade up, Fade down, Fade left, Fade right, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation`. Type: `select`.

`none`, `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom`

</details>

## File reference

`blocks/content-feature-showcase.liquid`
