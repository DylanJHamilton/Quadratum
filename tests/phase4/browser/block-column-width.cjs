// Local Chromium geometry using actual Liquid/CSS and the native-wrapper adapter.
// No Shopify session or network is used; owner Theme Editor acceptance stays pending.
// Run from the repo root with playwright, liquidjs and jsdom on NODE_PATH.
// CHROMIUM_EXECUTABLE may point to an installed headless Chromium binary.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const cp = require('node:child_process');
const { chromium } = require('playwright');
const f = require('../support/theme-blocks.cjs');
const baseline = process.env.WIDTH_BASELINE_REF;
const names = ['content-newsletter', 'content-logo-cloud', 'content-testimonials',
  'content-product-grid', 'content-rich-text', 'content-marquee', 'content-press-mentions'];
const alignments = ['left', 'center', 'right', 'stretch'];
const viewports = [320, 768, 1440];
const seeds = {
  'content-newsletter': { heading: 'Join our mailing list', text: '<p>Receive useful store updates.</p>' },
  'content-logo-cloud': { heading: 'Our partners', logo_1_image: f.photo() },
  'content-testimonials': { testimonial_1_quote: 'Helpful service and thoughtful products.', testimonial_1_name: 'Customer' },
  'content-product-grid': { product_source: 'manual', products: [f.product, { ...f.product, id: 2 }] },
  'content-rich-text': { rich_text: '<p>Readable text should use the available column width.</p>' },
  'content-marquee': { item_1_text: 'Useful store announcements', item_2_text: 'New arrivals' },
  'content-press-mentions': { item_1_source_name: 'Publication', item_1_quote: 'Useful products.' }
};
f.engine.registerTag('content_for', { parse() {}, render(ctx) { return ctx.get(['projectedBlocks']) || ''; } });

async function tree(node, id, section, design) {
  const children = [];
  for (const [i, child] of (node.blocks || []).entries()) children.push(await tree(child, id + '-' + i, section, design));
  const data = { section: { settings: section }, projectedBlocks: children.join('') };
  if (baseline && ['layout-column', 'product-layout-column'].includes(node.type)) {
    const source = cp.execFileSync('git', ['show', baseline + ':blocks/' + node.type + '.liquid'], { encoding: 'utf8' });
    const [liquid, tail] = source.split('{% schema %}');
    const schema = JSON.parse(tail.split('{% endschema %}')[0]);
    return f.engine.parseAndRender(f.platform(liquid), {
      block: { id, type: node.type, settings: { ...f.defaults(schema.settings), ...node.settings }, shopify_attributes: 'data-editor-block="' + id + '"' }
    }, { globals: { ...data, request: { design_mode: design } } });
  }
  return f.html(node.type, node.settings || {}, id, design, data);
}

async function host(product, columns, id, design, rowSettings = {}) {
  const section = { section_width: 'full', padding_left: 16, padding_right: 16, mobile_behavior: 'stack' };
  const row = { type: product ? 'product-layout-row' : 'layout-row', settings: { columns: String(columns.length), ...rowSettings }, blocks: columns };
  const projectedBlocks = await tree(row, id + '-row', section, design);
  return f.render(product ? 'product-block-section' : 'block-section', {
    id, settings: section, blocks: [], data: { projectedBlocks, request: { design_mode: design } }
  });
}

async function documentHead() {
  const settings = Object.assign({}, ...JSON.parse(f.read('config/settings_schema.json')).map(g => f.defaults(g.settings)));
  const tokens = await f.engine.parseAndRender(f.read('snippets/global-theme-vars.liquid'), { settings });
  const base = await f.engine.parseAndRender(f.read('assets/q-base.css.liquid'), { settings });
  return '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>' + f.read('assets/theme.css') + '</style>' + tokens + '<style>' + base + '</style>' +
    ['styles.css', 'qtm-content-blocks.css', 'qtm-section-surfaces.css'].map(p => '<style>' + f.read('assets/' + p) + '</style>').join('') +
    '</head><body>';
}

const results = { scope: 'Local Chromium with Shopify Liquid/wrapper adapters; no live Shopify access', baseline: baseline || null,
  blocks: names, viewports, column_presets: ['Layout column', 'Card column', 'Centered column'], alignments,
  width_cases: 0, control_cases: 0, failures: [], examples: [] };
const near = (a, b) => Math.abs(a - b) < 1.1;
function check(ok, label, measured) { if (!ok) results.failures.push({ label, ...measured }); }

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-zygote'] });
  results.browser = await browser.version();
  try {
    const context = await browser.newContext();
    await context.route('**/*', route => route.abort());
    const page = await context.newPage();
    const head = await documentHead();
    for (const design of [false, true]) {
      let body = '';
      const cases = [];
      for (const product of [false, true]) for (const [p, preset] of f.unpack('layout-column').schema.presets.entries()) {
        for (const alignment of alignments) {
          const id = (product ? 'product' : 'content') + '-' + p + '-' + alignment;
          const leaves = names.map(type => ({ type, settings: { ...f.unpack(type).schema.presets[0].settings, ...seeds[type] } }));
          body += await host(product, [{ type: product ? 'product-layout-column' : 'layout-column',
            settings: { ...preset.settings, horizontal_alignment: alignment }, blocks: leaves }], id, design);
          for (const [i, name] of names.entries()) cases.push({ id: id + '-row-0-' + i, name, product, preset: preset.name, alignment });
        }
      }
      await page.setContent(head + body.replace(/<script\b[\s\S]*?<\/script>/gi, '') + '</body></html>');
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport, height: 900 });
        const measured = await page.evaluate(cases => cases.map(test => {
          const wrapper = document.getElementById('shopify-block-' + test.id);
          const root = wrapper.querySelector(':scope > :not(style):not(script):not(link)');
          const inner = wrapper.parentElement;
          const rect = node => ({ x: node.getBoundingClientRect().x, width: node.getBoundingClientRect().width });
          return { ...test, wrapper: rect(wrapper), root: rect(root), inner: rect(inner), hidden: root.hidden,
            overflow: root.scrollWidth - root.clientWidth };
        }), cases);
        for (const m of measured) {
          results.width_cases++;
          check(!m.hidden && near(m.wrapper.width, m.inner.width) && near(m.root.width, m.inner.width),
            'full/default block uses the available column', { design, viewport, ...m });
          if (!design && viewport === 1440 && m.preset === 'Card column' && m.alignment === 'left' && !m.product)
            results.examples.push({ block: m.name, available: m.inner.width, wrapper: m.wrapper.width, root: m.root.width });
        }
      }
    }

    // Explicit block widths and alignments must survive a full-width outer wrapper.
    // Include unequal settings and both builders in one document to catch leakage.
    for (const viewport of [390, 1440]) {
      await page.setViewportSize({ width: viewport, height: 900 });
      for (const product of [false, true]) for (const alignment of alignments) {
        const id = 'narrow-' + product + '-' + alignment;
        const blocks = names.map(type => ({ type, settings: { ...seeds[type], width: 'small', block_width: 'small',
          alignment: alignment === 'stretch' ? 'left' : alignment, text_alignment: alignment === 'stretch' ? 'left' : alignment,
          desktop_width: '50', mobile_width: '75', content_width: 'custom', custom_width: 240 } }));
        const body = await host(product, [{ type: product ? 'product-layout-column' : 'layout-column',
          settings: { horizontal_alignment: alignment }, blocks }], id, true);
        await page.setContent(head + body.replace(/<script\b[\s\S]*?<\/script>/gi, '') + '</body></html>');
        const measured = await page.evaluate(({ id, names }) => names.map((name, i) => {
          const wrapper = document.getElementById('shopify-block-' + id + '-row-0-' + i);
          const root = wrapper.querySelector(':scope > :not(style):not(script):not(link)');
          const rect = node => ({ x: node.getBoundingClientRect().x, width: node.getBoundingClientRect().width });
          return { name, wrapper: rect(wrapper), root: rect(root), custom: name === 'content-rich-text' ? rect(root.firstElementChild) : null };
        }), { id, names });
        const limits = [640, 720, 720, 900, Infinity, 720, 720];
        for (const [i, m] of measured.entries()) {
          const ratio = m.name === 'content-rich-text' ? (viewport < 750 ? .75 : .5) : 1;
          const expected = Math.min(m.wrapper.width * ratio, limits[i]);
          check(near(m.root.width, expected), 'configured width retained', { viewport, product, alignment, ...m });
          if (m.custom) check(near(m.custom.width, Math.min(240, m.root.width)), 'custom content width retained', m);
          else {
            const factor = alignment === 'center' ? .5 : alignment === 'right' ? 1 : 0;
            check(near(m.root.x - m.wrapper.x, (m.wrapper.width - m.root.width) * factor), 'block alignment retained', m);
          }
          results.control_cases++;
        }
        // A deliberately narrow wrapper still uses column alignment, as do tag:null children.
        const control = await page.evaluate(({ product, alignment }) => {
          const inner = document.querySelector(product ? '.qtm-product-layout-column__inner' : '.qtm-layout-column__inner');
          const wrapper = inner.querySelector('.shopify-block');
          wrapper.style.maxWidth = '200px';
          const direct = document.createElement('div'); direct.style.width = '120px'; direct.style.height = '20px'; inner.append(direct);
          const rect = node => ({ x: node.getBoundingClientRect().x, width: node.getBoundingClientRect().width });
          return { inner: rect(inner), wrapper: rect(wrapper), direct: rect(direct) };
        }, { product, alignment });
        const factor = alignment === 'center' ? .5 : alignment === 'right' ? 1 : 0;
        check(near(control.wrapper.width, 200) && near(control.wrapper.x - control.inner.x, (control.inner.width - 200) * factor),
          'column alignment and wrapper max-width retained', control);
        const directWidth = 120; // An explicit inline width remains authoritative, even under stretch.
        check(near(control.direct.width, directWidth) && near(control.direct.x - control.inner.x, (control.inner.width - directWidth) * factor),
          'tag:null child alignment retained', control);
        results.control_cases += 2;
      }
    }

    // Row stacking, scrolling and grid sizing with more than one real column.
    for (const product of [false, true]) for (const mode of ['stack', 'scroll', 'keep-grid']) {
      const column = { type: product ? 'product-layout-column' : 'layout-column', blocks: [{ type: 'content-newsletter', settings: seeds['content-newsletter'] }] };
      const body = await host(product, [column, column], 'row-check', false, { mobile_behavior: mode });
      await page.setContent(head + body + '</body></html>');
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const m = await page.evaluate(() => {
          const row = document.querySelector('[data-qtm-layout-row]');
          const cols = [...row.children].filter(x => x.matches('[data-editor-block]'));
          const rect = x => ({ x: x.getBoundingClientRect().x, y: x.getBoundingClientRect().y, width: x.getBoundingClientRect().width });
          return { row: rect(row), cols: cols.map(rect), gap: parseFloat(getComputedStyle(row).columnGap),
            wrappers: cols.map(c => c.querySelector('.shopify-block').getBoundingClientRect().width),
            inners: cols.map(c => c.querySelector('[class$="__inner"]').getBoundingClientRect().width) };
        });
        const columns = width < 750 && mode === 'stack' ? 1 : 2;
        if (width < 750 && mode === 'scroll') check(m.cols[0].width >= m.row.width * .77 && m.cols[1].x > m.cols[0].x, 'horizontal row retained', m);
        else check(near(m.cols[0].width, (m.row.width - (columns - 1) * m.gap) / columns), 'row track width retained', m);
        check(m.wrappers.every((w, i) => near(w, m.inners[i])), 'both column instances fill their own track', m);
        results.control_cases++;
      }
    }
    await context.close();
  } finally { await browser.close(); }
  if (process.env.WIDTH_RESULTS_PATH) fs.writeFileSync(process.env.WIDTH_RESULTS_PATH, JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify({ browser: results.browser, baseline, width_cases: results.width_cases, control_cases: results.control_cases,
    failures: results.failures.length, examples: results.examples }, null, 2));
  if (baseline) assert.ok(results.failures.length > 0, 'the prior source must reproduce the defect');
  else assert.equal(results.failures.length, 0, JSON.stringify(results.failures.slice(0, 5), null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
