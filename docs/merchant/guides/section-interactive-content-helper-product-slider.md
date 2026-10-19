# Product slides

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product slides.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Source

### Source mode

Choose one of the supported options below for source mode. Only the selected option applies; other settings can further customize its appearance.

Default: `manual`.

Options: Manual (blocks), Collection, Current collection (template context), Same-collection products.

<details><summary>Reference for connected builders</summary>

Setting: `source_mode`. Type: `select`.

`manual`, `collection`, `current_collection`, `related_products`

</details>

### Collection (for collection or optional fallback)

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

### Max products

Drag the control to adjust max products. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 2 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `limit`. Type: `range`.

</details>

### Related fallback

Choose one of the supported options below for related fallback. Only the selected option applies; other settings can further customize its appearance.

Default: `same_collection_excluding_current`.

Options: Same collection (exclude current product).

<details><summary>Reference for connected builders</summary>

Setting: `related_fallback`. Type: `select`.

`same_collection_excluding_current`

</details>

## Header

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured products`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subtitle

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Explore what’s trending right now.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `richtext`.

</details>

### Show “view all” link

Turn on “Show “view all” link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_view_all`. Type: `checkbox`.

</details>

### View all label

Enter the view all label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop all`.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_label`. Type: `text`.

</details>

### View all URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_url`. Type: `url`.

</details>

## Carousel controls

### Slides per view (desktop)

Drag the control to adjust slides per view (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 1 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_per_view_desktop`. Type: `range`.

</details>

### Slides per view (tablet)

Drag the control to adjust slides per view (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_per_view_tablet`. Type: `range`.

</details>

### Slides per view (mobile)

Drag the control to adjust slides per view (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_per_view_mobile`. Type: `range`.

</details>

### Loop

Turn on “Loop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `loop`. Type: `checkbox`.

</details>

### Autoplay

Turn on “Autoplay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay`. Type: `checkbox`.

</details>

### Autoplay speed (ms)

Drag the control to adjust autoplay speed (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4500`.

Range: 2000 to 9000 ; step 250.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay_speed`. Type: `range`.

</details>

### Pause on hover

Turn on “Pause on hover” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `pause_on_hover`. Type: `checkbox`.

</details>

### Pause on focus

Turn on “Pause on focus” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `pause_on_focus`. Type: `checkbox`.

</details>

### Enable arrows

Turn on “Enable arrows” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_arrows`. Type: `checkbox`.

</details>

### Arrows visibility

Choose one of the supported options below for arrows visibility. Only the selected option applies; other settings can further customize its appearance.

Default: `desktop_only`.

Options: Desktop only (recommended), Always, Never.

<details><summary>Reference for connected builders</summary>

Setting: `arrows_mode`. Type: `select`.

`desktop_only`, `always`, `never`

</details>

### Controls position

Choose one of the supported options below for controls position. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay`.

Options: Overlay, Outside.

<details><summary>Reference for connected builders</summary>

Setting: `controls_position`. Type: `select`.

`overlay`, `outside`

</details>

### Show dots

Turn on “Show dots” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_dots`. Type: `checkbox`.

</details>

## Product card (shared) — presentation

### Card preset

Choose one of the supported options below for card preset. Only the selected option applies; other settings can further customize its appearance.

Default: `catalog`.

Options: Catalog, Compact.

<details><summary>Reference for connected builders</summary>

Setting: `card_preset`. Type: `select`.

`catalog`, `compact`

</details>

### Media mode

Choose one of the supported options below for media mode. Only the selected option applies; other settings can further customize its appearance.

Default: `swap`.

Options: Single, Swap on hover, Scroll gallery.

<details><summary>Reference for connected builders</summary>

Setting: `media_mode`. Type: `select`.

`single`, `swap`, `scroll`

</details>

### Scroll gallery: max images

Drag the control to adjust scroll gallery: max images. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 2 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `scroll_gallery_limit`. Type: `range`.

</details>

### Image fit

Choose one of the supported options below for image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`cover`, `contain`

</details>

### Media ratio (%)

Drag the control to adjust media ratio (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `100`.

Range: 60 to 140 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `range`.

</details>

### Image zoom on hover

Turn on “Image zoom on hover” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `image_zoom`. Type: `checkbox`.

</details>

### Hover treatment

Choose one of the supported options below for hover treatment. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay_actions`.

Options: Overlay actions, Media dim, Media zoom.

<details><summary>Reference for connected builders</summary>

Setting: `hover_treatment`. Type: `select`.

`overlay_actions`, `media_dim`, `media_zoom`

</details>

### Overlay opacity (%)

Drag the control to adjust overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `hover_overlay_opacity`. Type: `range`.

</details>

### Hover actions visibility

Choose one of the supported options below for hover actions visibility. Only the selected option applies; other settings can further customize its appearance.

Default: `desktop_only`.

Options: Desktop only, Always, Never.

<details><summary>Reference for connected builders</summary>

Setting: `hover_actions_visibility`. Type: `select`.

`desktop_only`, `always`, `never`

</details>

### Actions layout

Choose one of the supported options below for actions layout. Only the selected option applies; other settings can further customize its appearance.

Default: `stack`.

Options: Stack, Split.

<details><summary>Reference for connected builders</summary>

Setting: `actions_layout`. Type: `select`.

`stack`, `split`

</details>

## Product card — actions

### Enable quick add

Turn on “Enable quick add” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_quick_add`. Type: `checkbox`.

</details>

### Quick add mode

Choose one of the supported options below for quick add mode. Only the selected option applies; other settings can further customize its appearance.

Default: `button`.

Options: Button / add to cart, Sizes, Dropdown.

<details><summary>Reference for connected builders</summary>

Setting: `quick_add_mode`. Type: `select`.

`button`, `sizes`, `dropdown`

</details>

### Enable quick view

Turn on “Enable quick view” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_quick_view`. Type: `checkbox`.

</details>

### Quick view mode

Choose one of the supported options below for quick view mode. Only the selected option applies; other settings can further customize its appearance.

Default: `drawer`.

Options: Drawer, Modal.

<details><summary>Reference for connected builders</summary>

Setting: `quick_view_mode`. Type: `select`.

`drawer`, `modal`

</details>

### Quick view placement

Choose one of the supported options below for quick view placement. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay`.

Options: Overlay, Below content, Both, None.

<details><summary>Reference for connected builders</summary>

Setting: `quick_view_placement`. Type: `select`.

`overlay`, `below_content`, `both`, `none`

</details>

## Product card — price and badges

### Price mode

Choose one of the supported options below for price mode. Only the selected option applies; other settings can further customize its appearance.

Default: `simple`.

Options: Simple, Detailed.

<details><summary>Reference for connected builders</summary>

Setting: `price_mode`. Type: `select`.

`simple`, `detailed`

</details>

### Show badges

Turn on “Show badges” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_badges`. Type: `checkbox`.

</details>

### Enable sale badge

Turn on “Enable sale badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_sale`. Type: `checkbox`.

</details>

## Product card — typography (optional)

### Card text align

Choose one of the supported options below for card text align. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `card_text_align`. Type: `select`.

`left`, `center`

</details>

### Title size (px)

Drag the control to adjust title size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `range`.

</details>

### Title weight

Choose one of the supported options below for title weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: 400, 500, 600, 700.

<details><summary>Reference for connected builders</summary>

Setting: `title_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Price size (px)

Drag the control to adjust price size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `price_size`. Type: `range`.

</details>

### Price weight

Choose one of the supported options below for price weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: 400, 500, 600, 700.

<details><summary>Reference for connected builders</summary>

Setting: `price_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

## Product card — badge styling (optional)

### Badge position

Choose one of the supported options below for badge position. Only the selected option applies; other settings can further customize its appearance.

Default: `top_left`.

Options: Top left, Top right.

<details><summary>Reference for connected builders</summary>

Setting: `badge_position`. Type: `select`.

`top_left`, `top_right`

</details>

### Badge style

Choose one of the supported options below for badge style. Only the selected option applies; other settings can further customize its appearance.

Default: `pill`.

Options: Pill, Square.

<details><summary>Reference for connected builders</summary>

Setting: `badge_style`. Type: `select`.

`pill`, `square`

</details>

### Badge fill

Choose one of the supported options below for badge fill. Only the selected option applies; other settings can further customize its appearance.

Default: `filled`.

Options: Filled, Outline.

<details><summary>Reference for connected builders</summary>

Setting: `badge_fill`. Type: `select`.

`filled`, `outline`

</details>

## Product card — button styling (optional)

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `filled`.

Options: Filled, Outline.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`filled`, `outline`

</details>

### Button size

Choose one of the supported options below for button size. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `button_size`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Full-width buttons (where applicable)

Turn on “Full-width buttons (where applicable)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `button_full_width`. Type: `checkbox`.

</details>

### Hover strength (%)

Drag the control to adjust hover strength (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 80 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_hover_strength`. Type: `range`.

</details>

## Section layout

### Section text align

Choose one of the supported options below for section text align. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `text_align`. Type: `select`.

`left`, `center`

</details>

### Max width

Drag the control to adjust max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 720 to 1600 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Vertical padding

Drag the control to adjust vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Horizontal padding

Drag the control to adjust horizontal padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 60 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Card gap

Drag the control to adjust card gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Corner radius

Drag the control to adjust corner radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Shadow token (advanced)

Enter the shadow token (advanced). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `shadow`. Type: `text`.

</details>

## Designer styling — enable

### Enable custom colors

Turn on “Enable custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

## Designer styling — surface + header colors

### Surface background

Choose a color for surface background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `surface_bg`. Type: `color`.

</details>

### Surface border

Choose a color for surface border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `surface_border`. Type: `color`.

</details>

### Surface text (base)

Choose a color for surface text (base). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `surface_text`. Type: `color`.

</details>

### Header title color

Choose a color for header title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `header_title_color`. Type: `color`.

</details>

### Header subtitle color

Choose a color for header subtitle color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `header_subtitle_color`. Type: `color`.

</details>

### Header link color

Choose a color for header link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

</details>

## Designer styling — arrows + dots colors

### Arrow background

Choose a color for arrow background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_bg`. Type: `color`.

</details>

### Arrow text

Choose a color for arrow text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_text`. Type: `color`.

</details>

### Arrow border

Choose a color for arrow border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_border`. Type: `color`.

</details>

### Dot color

Choose a color for dot color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `dot_color`. Type: `color`.

</details>

### Dot active color

Choose a color for dot active color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `dot_active_color`. Type: `color`.

</details>

## Designer styling — typography

### Heading font family token

Choose whether this element follows the theme heading font, body font, or its surrounding content. Select the actual font in Theme Settings > Branding.

Default: `inherit`.

Options: Inherit, Theme: heading token, Theme: body token.

<details><summary>Reference for connected builders</summary>

Setting: `heading_font_family`. Type: `select`.

`inherit`, `var(--q-font-heading)`, `var(--q-font-body)`

</details>

### Body font family token

Choose whether this element follows the theme heading font, body font, or its surrounding content. Select the actual font in Theme Settings > Branding.

Default: `inherit`.

Options: Inherit, Theme: body token, Theme: heading token.

<details><summary>Reference for connected builders</summary>

Setting: `body_font_family`. Type: `select`.

`inherit`, `var(--q-font-body)`, `var(--q-font-heading)`

</details>

### Heading font size (px)

Drag the control to adjust heading font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `26`.

Range: 14 to 54 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_fs`. Type: `range`.

</details>

### Heading weight

Choose one of the supported options below for heading weight. Only the selected option applies; other settings can further customize its appearance.

Default: `700`.

Options: 400, 500, 600, 700, 800.

<details><summary>Reference for connected builders</summary>

Setting: `heading_fw`. Type: `select`.

`400`, `500`, `600`, `700`, `800`

</details>

### Heading letter-spacing (em)

Drag the control to adjust heading letter-spacing (em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.0`.

Range: -0.1 to 0.1 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_ls`. Type: `range`.

</details>

### Subtitle font size (px)

Drag the control to adjust subtitle font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 10 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle_fs`. Type: `range`.

</details>

### Subtitle opacity (%)

Drag the control to adjust subtitle opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `85`.

Range: 40 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle_opacity`. Type: `range`.

</details>

## Designer styling — controls feel

### Arrow size (px)

Drag the control to adjust arrow size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `42`.

Range: 28 to 72 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_size`. Type: `range`.

</details>

### Arrow inset from edges (px)

Drag the control to adjust arrow inset from edges (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_inset`. Type: `range`.

</details>

### Arrow radius (px)

Drag the control to adjust arrow radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_radius`. Type: `range`.

</details>

### Arrow shadow strength

Drag the control to adjust arrow shadow strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_shadow_strength`. Type: `range`.

</details>

### Arrow hover lift (px)

Drag the control to adjust arrow hover lift (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `arrow_lift`. Type: `range`.

</details>

### Dot size (px)

Drag the control to adjust dot size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `dot_size`. Type: `range`.

</details>

### Dot spacing (px)

Drag the control to adjust dot spacing (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `dot_spacing`. Type: `range`.

</details>

## Blocks you can add

### Manual product

#### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

## File reference

`sections/interactive-content-helper-product-slider.liquid`
