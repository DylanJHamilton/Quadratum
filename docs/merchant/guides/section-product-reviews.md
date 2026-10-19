# Product reviews

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product reviews.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Customer reviews`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `app_block_area`.

Options: App block area, Metaobject, Manual.

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`app_block_area`, `metaobject`, `manual`

</details>

### Metaobject namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

<details><summary>Reference for connected builders</summary>

Setting: `metaobject_namespace`. Type: `text`.

</details>

### Metaobject key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

<details><summary>Reference for connected builders</summary>

Setting: `metaobject_key`. Type: `text`.

</details>

### Show average rating

Turn on “Show average rating” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_average_rating`. Type: `checkbox`.

</details>

### Show write review button

Turn on “Show write review button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_write_review_button`. Type: `checkbox`.

</details>

### Write review label

Enter the write review label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Write a review`.

<details><summary>Reference for connected builders</summary>

Setting: `write_review_label`. Type: `text`.

</details>

### Write review URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `write_review_url`. Type: `url`.

</details>

## Blocks you can add

### @app

Select a compatible installed app. The app provides its settings and service.

### Review

#### Rating

Drag the control to adjust rating. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `5`.

Range: 1 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `rating`. Type: `range`.

</details>

#### Headline

Enter the headline. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `headline`. Type: `text`.

</details>

#### Quote

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `quote`. Type: `richtext`.

</details>

#### Name

Enter the name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `name`. Type: `text`.

</details>

#### Location

Enter the location. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `location`. Type: `text`.

</details>

#### Date

Enter the date. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `date`. Type: `text`.

</details>

#### Source

Enter the source. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `source`. Type: `text`.

</details>

## File reference

`sections/product-reviews.liquid`
