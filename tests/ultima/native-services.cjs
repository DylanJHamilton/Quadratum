// Run with the staged merchant directory as cwd, using the existing adapters.
const assert=require('node:assert/strict'),fs=require('node:fs'),f=require('../phase4/support/forms.cjs');
(async()=>{
  for(const name of ['form-compact','form-newsletter','form-quote-full','form-support-request','form-waitlist','call-to-action-newsletter-form','call-to-action-quote-form']){
    const {schema}=f.unpack(name);
    assert(!schema.settings.some(s=>['endpoint_url','captcha_mode','captcha_site_key'].includes(s.id)));
    assert(!schema.settings.some(s=>s.options?.some(o=>o.value==='custom_endpoint')));
    const destinations=schema.settings.find(s=>s.id==='destination').options;
    for(const destination of destinations){
      const d=f.dom(await f.host(name,{settings:{destination:destination.value},globals:{product:f.product}})),w=d.window,form=w.document.querySelector('form.q-form');
      assert(form,name+' renders a native form');
      assert.equal(form.dataset.platformForm,destination.value==='shopify_customer'?'customer':'contact');
      assert(form.querySelector('[name="contact[email]"]')?.required,name+' requires a native email');
      assert(!form.querySelector('[name="cf-turnstile-response"],[name="g-recaptcha-response"]'));
      f.boot(w,['frontend-form-logic.js','frontend-form-logic-form-sections.js']);
      assert(form.dataset.qValidateInit);
      const event=new w.Event('submit',{bubbles:true,cancelable:true});form.dispatchEvent(event);assert(event.defaultPrevented,'invalid submission is stopped');
      const host=form.closest('[data-q-form-host]');host.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(!form.dataset.qValidateInit);host.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert(form.dataset.qValidateInit);w.close();
    }
  }
  for(const file of ['frontend-form-logic.js','frontend-form-logic-form-sections.js','maps-locator.js'])assert(!/challenges\.cloudflare|recaptcha\/api|maps\.googleapis/.test(fs.readFileSync('assets/'+file,'utf8')));
  for(const file of ['3rd-party-crm-form-funnel-embed','3rd-party-crm-lead-capture-form','3rd-party-scheduling-booking-embed','3rd-party-bulk-ordering']){
    const text=fs.readFileSync('sections/'+file+'.liquid','utf8');
    assert(!/s\.embed_code|action="{{ (?:eff_endpoint|external_action)|endpoint_valid/.test(text),file);
    const d=f.dom(await f.host(file)),doc=d.window.document,form=doc.querySelector('form');
    assert(form,file+' retained layout renders a native contact form');
    assert.equal(form.dataset.platformForm,'contact',file);
    assert(form.querySelector('[name="contact[email]"]')?.required,file+' native email is required');
    assert(form.querySelector('[name="contact[body]"]'),file+' native message field exists');
    assert(!doc.querySelector('iframe,script[src*="calendly"],script[src*="leadconnector"]'),file);
    d.window.close();
  }
  console.log('PASS Main native services: eleven retained form layouts, native destinations/email/validation, editor lifecycle, no provider transport or external CAPTCHA/Maps SDKs.');
})().catch(e=>{console.error(e);process.exitCode=1});
