const assert = require('node:assert/strict');
const { read, render, dom, product } = require('../phase4/support/commerce.cjs');
(async () => {
  const classic = read('sections/main-product-classic.liquid');
  assert.match(classic, /\.q-media-item :is\(video, iframe, model-viewer\) \{[^}]*display: block;[^}]*height: auto;[^}]*aspect-ratio: 1;/);
  const compact = read('sections/main-product-compact.liquid');
  assert.match(compact, /media_tag:[^}]+preload: 'metadata'/);
  assert.match(compact, /all-media video \{ aspect-ratio: var\(--media-ratio, 16 \/ 9\)/);
  const d = dom(await render('main-product-compact',{data:{product:{...product,media:[{media_type:'video',aspect_ratio:16/9,alt:'Test video'}]}}}));
  assert.match(d.window.document.querySelector('.qtm-compact__all-media figure').getAttribute('style'), /--media-ratio: 1\.777/);
  assert(d.window.document.querySelector('.qtm-compact__all-media video[controls]'));
  d.window.close();
  console.log('PASS product media sizing: Classic overrides the viewer default height; Compact reserves video aspect ratio before metadata and preserves controls.');
})().catch(error => { console.error(error); process.exitCode=1; });
