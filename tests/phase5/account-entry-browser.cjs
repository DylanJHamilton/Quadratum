// This small shadow/keyboard adapter exercises theme CSS, slots and lifecycle.
// It is NOT Shopify's component, authentication, menu service or hosted account UI.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const f = require('./header-fixtures.cjs');
const axe = f.read(require.resolve('axe-core/axe.min.js'));
const output = process.env.ACCOUNT_ENTRY_BROWSER_OUTPUT || 'docs/phase5/validation/checkpoint-f';
const results = {scope: 'Local Chromium; real header Liquid/CSS/JS with an explicit component adapter. No Shopify account or external request.', cases: [], accessibility: [], keyboard: [], lifecycle: [], errors: []};
const selectors = {
  one: ['[data-qh1-mobile-toggle]', '[data-qh1-mobile-panel]'],
  two: ['[data-qh2b-mobile-open]', '[data-qh2b-mobile-drawer]'],
  three: ['[data-qtm-h3-mobile-open]', '[data-qtm-h3-mobile-panel]'],
  four: ['[data-qtm-h4-mobile-open]', '[data-qtm-h4-mobile-panel]'],
  five: ['[data-qtm-h5-mobile-open]', '[data-qtm-h5-mobile-panel]']
};
function defineAccountAdapter(signedIn) {
  customElements.define('shopify-account', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = '<style>:host{vertical-align:middle}button{font:inherit;cursor:pointer}.signed-in{width:var(--shopify-account-avatar-size,44px);height:var(--shopify-account-avatar-size,44px);background:#eee;color:#111;border:1px solid #777;border-radius:50%}button:focus-visible{outline:2px solid currentColor;outline-offset:3px}</style>' +
        (signedIn ? '<button class="signed-in" aria-label="Account">Q</button>' : '<button part="signed-out-avatar" aria-label="Sign in"><slot name="signed-out-avatar"></slot></button>');
      const button = shadow.querySelector('button');
      button.addEventListener('click', () => {
        const dialog = document.createElement('dialog');
        dialog.setAttribute('aria-label', 'Test account sheet');
        dialog.innerHTML = '<button>Close</button>';
        document.body.append(dialog);
        dialog.querySelector('button').addEventListener('click', () => dialog.close());
        dialog.addEventListener('close', () => {dialog.remove(); button.focus(); this.dispatchEvent(new CustomEvent('close'));});
        dialog.showModal();
        this.dispatchEvent(new CustomEvent('open'));
      });
    }
  });
}
(async () => {
  fs.mkdirSync(output, {recursive: true});
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-zygote']});
  results.browser = await browser.version();
  const context = await browser.newContext();
  await context.route('**/*', route => route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => results.errors.push(error.message));
  try {
    for (const name of f.words) {
      for (const width of [320, 768, 1440]) {
        for (const signedIn of [false, true]) {
          for (const dark of [false, true]) {
            const direction = dark ? 'rtl' : 'ltr';
            const palette = dark ? {header_bg: '#111111', header_text: '#ffffff', header_link: '#ffffff', bg_color: '#111111', text_color: '#ffffff', link_color: '#ffffff', icon_color: '#ffffff', icon_bg: '#111111'} : {};
            await page.setViewportSize({width, height: 900});
            await page.goto('about:blank');
            await page.setContent(await f.html(name, {settings: palette}, direction));
            await page.evaluate(defineAccountAdapter, signedIn);
            const button = page.locator('shopify-account button');
            await assert.doesNotReject(() => button.waitFor({state: 'visible', timeout: 1500}), name + ': visible account');
            if (!signedIn) assert(await page.locator('shopify-account [slot] svg').isVisible(), name + ": visible signed-out icon");
            const box = await button.boundingBox();
            assert(box.width >= 44 && box.height >= 44, name + ': 44px target ' + JSON.stringify(box));
            assert(box.x >= -1 && box.x + box.width <= width + 1, name + ': account overflow ' + JSON.stringify(box));
            const duplicates = await page.locator('[data-qtm-account-fallback] a, [data-qtm-account-fallback] summary').evaluateAll(els => els.filter(e => e.checkVisibility()).length);
            assert.equal(duplicates, 0, name + ': upgraded fallback hidden');
            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            assert(scrollWidth <= width + 1, name + ': header/page overflow ' + scrollWidth);
            const hit = await button.evaluate(e => {const b=e.getBoundingClientRect(); const hit=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2); return hit === e.getRootNode().host || e.getRootNode().host.contains(hit);});
            assert(hit, name + ': account pointer target is not covered');
            if (width === 320) {
              const neighboringControls = await page.locator('[data-qtm-account-header] button').evaluateAll(els => els.filter(e => e.checkVisibility() && !e.closest('[hidden]')).map(e => ({label: e.getAttribute('aria-label'), left:e.getBoundingClientRect().left, right:e.getBoundingClientRect().right})));
              assert(neighboringControls.every(e => e.left >= -1 && e.right <= 321), name + ': neighboring header controls ' + JSON.stringify(neighboringControls));
            }
            results.cases.push({name, width, signedIn, direction, dark, accountBox: box, scrollWidth, pointerTarget: hit, fallbackControlsVisible: duplicates});
            if (width === 320) {
              await page.evaluate(axe);
              const audit = await page.evaluate(async () => (await axe.run(document.querySelector('shopify-account'), {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v => ({id: v.id, nodes: v.nodes.map(n => n.failureSummary)})));
              results.accessibility.push({name, signedIn, dark, violations: audit});
              assert.equal(audit.length, 0, name + ': account accessibility ' + JSON.stringify(audit));
            }
          }
        }
      }
      // Narrow CSS viewport also models reflow at 400% zoom on a 1280px display.
      await page.setViewportSize({width: 320, height: 900});
      await page.goto('about:blank');
      await page.setContent(await f.html(name, {globals: {shop: {name: 'VeryLongMerchantNameWithoutAnyBreaks'.repeat(3), customer_accounts_enabled: true}}}, 'rtl'));
      await page.evaluate(defineAccountAdapter, false);
      const longBox = await page.locator('shopify-account button').boundingBox();
      assert(longBox.x >= -1 && longBox.x + longBox.width <= 321, name + ': long-name account remains in viewport');
      const longScroll = await page.evaluate(() => document.documentElement.scrollWidth);
      assert(longScroll <= 321, name + ': long-name overflow ' + longScroll);
      results.cases.push({name, longMerchantName: true, width:320, direction:'rtl', accountBox:longBox, scrollWidth:longScroll});
      // A missing component script retains native, locale-aware fallback routes.
      await page.setViewportSize({width: 320, height: 900});
      await page.goto('about:blank');
      await page.setContent(await f.html(name, {}, 'ltr', false));
      assert.equal(await page.locator('shopify-account').isVisible(), false);
      const native = page.locator('.qtm-account-entry__fallback a, .qtm-account-entry__fallback summary').first();
      assert(await native.isVisible(), name + ': mobile no-JS native entry');
      results.cases.push({name, noComponentScript: true, nativeEntryVisible: true});
      // Upgrade an already rendered instance: no extra initialization/replacement.
      await page.evaluate(defineAccountAdapter, false);
      assert(await page.locator('shopify-account button').isVisible());
      assert.equal(await native.isVisible(), false);

      for (const display of ['icon', 'text', 'icon_text']) {
        await page.setViewportSize({width: 1440, height: 900});
        await page.goto('about:blank');
        await page.setContent(await f.html(name, {settings: {account_display: display}}));
        await page.evaluate(defineAccountAdapter, false);
        const button = page.locator('shopify-account button');
        await button.focus();
        await page.keyboard.press('Enter');
        assert(await page.locator('dialog[open]').isVisible());
        await page.keyboard.press('Escape');
        assert(await button.evaluate(e => e === e.getRootNode().activeElement));
        const focusStyle = await button.evaluate(e => ({style: getComputedStyle(e).outlineStyle, width: getComputedStyle(e).outlineWidth}));
        assert.notEqual(focusStyle.style, 'none');
        assert.notEqual(focusStyle.width, '0px');
        results.keyboard.push({name, display, enterEscapeFocus: true, focusStyle});
      }

      // Open-event cleanup, duplicate boot, unload and remount use actual controllers.
      await page.setViewportSize({width: 320, height: 900});
      await page.goto('about:blank');
      await page.setContent(await f.html(name, {settings: {mobile_menu_style: name === 'one' ? 'drawer_like' : undefined}}));
      await page.evaluate(defineAccountAdapter, false);
      await page.evaluate(f.read('assets/header-' + name + '.js'));
      await page.evaluate(() => {for (let i=0; i<2; i++) document.querySelector('section').dispatchEvent(new CustomEvent('shopify:section:load', {bubbles: true}));});
      const [opener, panel] = selectors[name];
      await page.locator(opener).first().click();
      assert.equal(await page.locator(opener).first().getAttribute('aria-expanded'), 'true');
      // Adapter opens after focusing its sheet; theme must not return focus to the drawer.
      await page.locator('shopify-account button').evaluate(e => e.click());
      assert.equal(await page.locator(opener).first().getAttribute('aria-expanded'), 'false', name + ': account closes drawer');
      assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), name + ': sheet keeps focus');
      await page.keyboard.press('Escape');
      await page.evaluate(() => document.querySelector('section').dispatchEvent(new CustomEvent('shopify:section:unload', {bubbles: true})));
      assert.equal(await page.locator(panel).getAttribute('aria-hidden'), 'true');
      await page.evaluate(() => {for (let i=0; i<2; i++) document.querySelector('section').dispatchEvent(new CustomEvent('shopify:section:load', {bubbles: true}));});
      await page.locator(opener).first().click();
      assert.equal(await page.locator(opener).first().getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator(opener).first().getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator('shopify-account').count(), 1);
      results.lifecycle.push({name, duplicateBootRemount: true, drawerClosedOnAccountOpen: true, sheetFocusPreserved: true});
      await page.locator(panel).waitFor({state: 'hidden'});
      const screenshotDir = process.env.ACCOUNT_ENTRY_SCREENSHOTS;
      if (screenshotDir) {fs.mkdirSync(screenshotDir, {recursive:true}); await page.screenshot({path: screenshotDir + '/' + name + '-mobile.png'});}
    }
    // Header One's independent mobile visibility setting is preserved.
    await page.goto('about:blank');
    await page.setContent(await f.html('one', {settings: {show_account_icon: false, show_mobile_account_link: true}}));
    await page.evaluate(defineAccountAdapter, false);
    for (const width of [320,1440]) {
      await page.setViewportSize({width,height:900});
      assert.equal(await page.locator('shopify-account').isVisible(), width === 320);
      results.cases.push({name:'one',mobileOnly:true,width,visible:width===320});
    }
    assert.deepEqual(results.errors, [], 'No header runtime errors');
  } finally {
    fs.writeFileSync(output + '/browser.json', JSON.stringify(results,null,2)+'\n');
    await browser.close();
  }
  console.log(`PASS ${results.cases.length} layout/fallback cases; ${results.accessibility.length} account axe audits; ${results.keyboard.length} keyboard scenarios; ${results.lifecycle.length} header lifecycle scenarios. Platform component is an explicit adapter; live Shopify QA remains required.`);
})().catch(error => {console.error(error); process.exitCode=1;});
