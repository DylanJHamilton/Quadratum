const assert=require('node:assert/strict');
const f=require('../phase4/support/forms.cjs');
const defaults=Object.assign({},...JSON.parse(f.read('config/settings_schema.json')).map(g=>f.defaults(g.settings)));
const globals={...defaults,forms_captcha_provider:'turnstile',captcha_site_key:'global-public'};
const key=(mode,local_key,settings=globals)=>f.engine.parseAndRender(f.read('snippets/form-captcha-key.liquid'),{mode,local_key,settings});
(async()=>{
 assert.equal(await key('turnstile',''), 'global-public');
 assert.equal(await key('turnstile','local'), 'local');
 assert.equal(await key('turnstile','', {...globals,captcha_turnstile_site_key:'legacy'}), 'legacy');
 assert.equal(await key('recaptcha_v3',''), '');
 assert.equal(await key('turnstile','none'), '');
 assert.equal(await key('none','local'), '');
 assert.equal(await key('turnstile','', {...globals,captcha_site_key:'none'}), '');
 for(const name of ['form-compact','form-newsletter','form-quote-full','form-support-request','form-waitlist','call-to-action-newsletter-form','call-to-action-quote-form','3rd-party-crm-lead-capture-form','3rd-party-bulk-ordering']){
  const html=await f.host(name,{settings:{captcha_mode:'turnstile',action_url:'/apps/form',form_mode:'global_default'},globals:{settings:globals}});
  const d=f.dom(html);assert(d.window.document.querySelector('[data-captcha-key="global-public"]'),name);d.window.close();
 }
 for(const name of ['footer-two','footer-three']){
  const html=await f.host(name,{blocks:[{type:'social'}],globals:{settings:{...defaults,social_url_facebook:'javascript:alert(1)',social_url_instagram:'https://social.test/profile?x="safe"&y=2',social_url_tiktok:'https://user@invalid.test',social_url_youtube:'//invalid.test'}}});
  const d=f.dom(html),links=[...d.window.document.querySelectorAll('[aria-label="Social links"] a')];assert.equal(links.length,1,name);assert.equal(links[0].getAttribute('href'),'https://social.test/profile?x="safe"&y=2');assert(!d.window.document.querySelector('[onerror]'));d.window.close();
 }
 for(const url of ['https://user:secret@receiver.test/post','/bad\0path']){
  const html=await f.host('form-newsletter',{settings:{destination:'custom_endpoint',endpoint_url:url}});const d=f.dom(html);assert(!d.window.document.querySelector('form'));d.window.close();
 }
 const css=await f.engine.parseAndRender(f.read('snippets/theme-tokens.liquid'),{settings:{...defaults,custom_css:'.ok{color:red}</style><script id="breakout">bad()</script>'}});
 const d=f.dom('<style>'+css+'</style>');assert(!d.window.document.querySelector('#breakout'));assert.match(d.window.document.querySelector('style').textContent,/\\3c \/style/);d.window.close();
 // Render the exact layout hook conditions with harmless trusted markup.
 const source=f.read('layout/theme.liquid');
 for(const id of ['script_head','script_body_open','script_body_close']){
  const start=source.indexOf('{%- assign qtm_custom_code = settings.'+id);const end=source.indexOf('{%- endif -%}',start)+13;assert(start>=0);
  const hook=source.slice(start,end);
  for(const enabled of [true,false]){
   const html=await f.engine.parseAndRender(hook,{settings:{custom_scripts_enabled:enabled,[id]:'<span data-trusted-code>ok</span>'}});
   assert.equal(html.includes('data-trusted-code'),enabled);
  }
  assert.equal((await f.engine.parseAndRender(hook,{settings:{[id]:' none '}})).trim(),'');
 }
 console.log('PASS canonical/legacy/local CAPTCHA precedence across nine hosts; unsafe social links and endpoint credentials rejected; CSS delimiter containment; all three trusted-code gates and sentinel values. Provider services and consent remain external contracts.');
})().catch(e=>{console.error(e);process.exitCode=1;});
