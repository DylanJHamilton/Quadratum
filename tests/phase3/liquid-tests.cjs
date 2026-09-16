const assert = require('node:assert/strict');
const fs = require('node:fs');
const {Liquid} = require('liquidjs');
const engine = new Liquid({strictFilters: true});
const root = './';
const source = name => fs.readFileSync(root + name, 'utf8');
(async () => {
  // Execute the actual media-building Liquid with object slices and numeric media IDs.
  const product = source('sections/main-product-simple.liquid');
  const media = product.slice(product.indexOf("  assign image_media = ''"), product.indexOf('  if image_media.size == 0'));
  const output = await engine.parseAndRender('{% liquid\n' + media + '\n%}{{ image_media | map: "id" | join: "," }}', {
    image_media_all: [{id: 1}, {id: 2}, {id: 3}], variant_media_ids: ['2', '3'], featured: {id: 2}, s: {hide_variants: true}
  });
  assert.equal(output.trim(), '1,2');
  // Render actual data table branches: empty column 2 must not shift column 3's cell.
  const table = source('sections/interactive-content-pricing-data-table.liquid');
  const start = table.indexOf("{%- when 'data_table' -%}") + "{%- when 'data_table' -%}".length;
  const end = table.indexOf('{%- endcase -%}', start);
  for (const mode of ['stack_rows', 'scroll']) {
    const html = await engine.parseAndRender(table.slice(start,end), {
      section: {settings:{col_1_label:'One',col_2_label:'',col_3_label:'Three'}},
      blocks:[{type:'row',settings:{cell_1:'First',cell_2:'Hidden',cell_3:'Third'}}],
      responsive_behavior:mode, show_heading_row:true
    });
    assert(html.includes('First') && html.includes('Third') && html.includes('Three'));
    assert(!html.includes('Hidden'));
  }
  console.log('PASS: original product-media order, featured-variant retention, and sparse pricing-table columns in both layouts. LiquidJS mechanism tests, not live Shopify validation.');
})().catch(error => {console.error(error);process.exit(1)});
