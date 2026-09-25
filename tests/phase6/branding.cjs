const assert = require('node:assert/strict');
const fs = require('node:fs');
const postcss = require('postcss');
const f = require('../phase4/support/commerce.cjs');
const schema = JSON.parse(f.read('config/settings_schema.json'));
const defaults = Object.assign({}, ...schema.map(g => f.defaults(g.settings)));
async function tokens(overrides = {}) {
  return f.engine.parseAndRender(f.read('snippets/theme-tokens.liquid'), {settings: {...defaults, ...overrides}});
}
function values(css) {
  const result = {};
  postcss.parse(css).walkRules(':root', rule => rule.walkDecls(d => {result[d.prop] = d.value;}));
  return result;
}
(async () => {
  const vars = values(await tokens({space_md: 28, section_padding_top: 0, button_border_width: 0, button_radius: 0, type_body_size: 120}));
  assert.equal(vars['--space-md'], '28px');
  assert.equal(vars['--section-pt'], '0px');
  assert.equal(vars['--btn-border-w'], '0px');
  assert.equal(vars['--btn-radius'], '0px');
  assert.equal(vars['--fs-body'], '1.2rem');
  for (const [shape, radius] of [['square','0'],['rounded','8px'],['pill','999px']]) {
    assert.equal(values(await tokens({chip_shape:shape}))['--qtm-chip-radius'], radius);
  }
  for (const [kit, width] of [['cozy','1088px'],['comfort','var(--container-lg)'],['wide','var(--container-xl)'],['full','100%']]) {
    assert.equal(values(await tokens({style_kit:kit}))['--qtm-page-maxw'], width);
  }
  assert.equal(values(await tokens({button_variant_default:'outline'}))['--btn-bg'], 'transparent');
  assert.equal(values(await tokens({button_variant_default:'ghost'}))['--btn-border'], 'transparent');
  assert.doesNotMatch(await tokens({enable_dark_mode:false}), /\[data-theme="dark"\]/);
  f.engine.registerFilter('image_url', image => '//cdn.test/' + image);
  const context = {settings:{social_share_image:'fallback',logo_primary:'logo'},page_image:'page',page_title:'<Safe "title">',shop:{name:'Shop'},request:{origin:'https://shop.test'}};
  let html = await f.engine.parseAndRender(f.read('snippets/social-meta-tags.liquid'),context);
  assert.match(html,/page/); assert.doesNotMatch(html,/content="<Safe/); assert.match(html,/&lt;Safe/);
  html = await f.engine.parseAndRender(f.read('snippets/social-meta-tags.liquid'),{...context,page_image:null});
  assert.match(html,/fallback/);
  console.log('PASS global tokens: merchant values, zero spacing/borders, typography scale, three chip shapes, four width modes, button inheritance, disabled dark colors and escaped page/fallback social metadata.');
})().catch(error => {console.error(error);process.exitCode=1;});
