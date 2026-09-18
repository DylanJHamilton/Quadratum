const fs=require('node:fs'),assert=require('node:assert/strict'),{Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
(async()=>{
 const engine=new Liquid({root:'snippets',extname:'.liquid'}),read=p=>fs.readFileSync(p,'utf8');
 for(const file of ['fp-hero-content-proxy','fp-hero-media-proxy'])assert.equal((await engine.renderFile(file,{content:'<p>Supplied content</p>'})).trim(),'<p>Supplied content</p>');
 assert.equal((await engine.renderFile('q-banner-base',{})).trim(),'','no section context cannot emit global styles');
 const d=new JSDOM(await engine.renderFile('q-banner-base',{section:{id:'one'}})+await engine.renderFile('q-banner-base',{section:{id:'two'}}));
 for(const sheet of d.window.document.styleSheets)for(const rule of [...sheet.cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]))if(rule.selectorText)assert(rule.selectorText.startsWith('#shopify-section-'));
 d.window.close();assert.equal((await engine.renderFile('tw-safelist-banners',{})).trim(),'','build safelist emits no storefront markup');
 const css=read('assets/theme.css');for(const span of [4,5,6,7])assert(css.includes('.lg\\:col-span-'+span),'dynamic banner grid span survives CSS build');
 console.log('PASS Banner support: retained content proxies, two-instance legacy base style scope/no-context guard, build-only safelist without rendered markup, generated dynamic grid spans. Dormant helpers are not active-host certification.');
})().catch(e=>{console.error(e);process.exitCode=1});
