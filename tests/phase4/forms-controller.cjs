const assert=require('node:assert/strict'),f=require('./support/forms.cjs');
const assets=['frontend-form-logic.js','frontend-form-logic-form-sections.js'];
const step=(id,title)=>({id,type:'step',settings:{step_title:title}});
const fire=(w,el,type)=>el.dispatchEvent(new w.Event(type,{bubbles:true}));
const submit=(w,form,submitter=form.querySelector('[type=submit]'))=>{const event=new w.SubmitEvent('submit',{bubbles:true,cancelable:true,submitter});form.dispatchEvent(event);return event;};
async function fixture({settings={},blocks,attrs='',id='one',url,editor=false}={}){
  const html=await f.snippet('form-dispatch',{id,settings:{destination:'custom_endpoint',endpoint_url:'/apps/forms',...settings},blocks:blocks??[f.field('email','email',{name_attr:'email',required:true,default_value:'valid@example.test'})]});
  const d=f.dom('<section data-q-form-host data-template="'+(settings.template_style||'card')+'" '+attrs+'>'+html+'</section><form id="unrelated" class="q-form"><input required></form>',url);
  if(editor)d.window.Shopify={designMode:true};
  return d;
}
(async()=>{
  assert.equal(f.read('assets/'+assets[0]),f.read('assets/'+assets[1]),'saved legacy entry points cannot drift');
  const blocks=[step('step1','Contact'),f.field('email','email',{name_attr:'contact[email]',condition_enable:true,condition_field:'missing',condition_operator:'equals',condition_value:'never'}),f.field('check','checkbox',{name_attr:'contact[choice]',default_value:'arbitrary-value'}),f.field('conditional','text',{name_attr:'contact[detail]',required:true,default_value:'secret',condition_enable:true,condition_field:'contact[choice]',condition_operator:'checked'}),step('step2','Project'),f.field('message','textarea',{name_attr:'contact[body]',required:true})];
  let d=await fixture({settings:{destination:'shopify_contact',template_style:'steps'},blocks,attrs:'data-msg-error="&lt;Unsafe&gt;"'}),w=d.window,doc=w.document,host=doc.querySelector('[data-q-form-host]'),form=host.querySelector('form');
  assert.equal(form.querySelectorAll('[data-q-step]').length,2);assert.equal(form.querySelectorAll('[hidden]').length,0,'native steps start complete');
  f.boot(w,assets);assert(form.noValidate);assert(!doc.getElementById('unrelated').noValidate);assert.equal(form.querySelectorAll('[data-q-step-controls]').length,1);
  const email=form.querySelector('[type=email]'),condition=form.querySelector('[data-cond-field="contact[choice]"]'),check=form.querySelector('[type=checkbox]'),body=form.querySelector('textarea'),groups=[...form.querySelectorAll('[data-q-step]')];
  assert(!email.disabled);assert(condition.hidden);assert(condition.querySelector('input').disabled);assert(!new w.FormData(form).has('contact[detail]'));
  check.checked=true;fire(w,check,'change');assert(!condition.hidden);assert(!condition.querySelector('input').disabled);
  check.checked=false;fire(w,check,'change');assert(condition.hidden);
  assert(submit(w,form).defaultPrevented);assert.equal(doc.activeElement,email);assert.equal(form.querySelector('.q-live').textContent,'<Unsafe>');assert(!form.querySelector('.q-live unsafe'));
  email.value='test@example.test';assert(submit(w,form).defaultPrevented);assert(groups[0].hidden);assert(!groups[1].hidden);assert.equal(form.querySelector('.q-steps-count').textContent,'Step 2 of 2');
  assert(submit(w,form).defaultPrevented);assert.equal(doc.activeElement,body);
  body.value='Project';assert(!submit(w,form).defaultPrevented);assert.equal(new w.FormData(form).get('contact[email]'),'test@example.test','earlier step remains in payload');
  email.value='bad';assert(submit(w,form).defaultPrevented);assert(!groups[0].hidden);assert.equal(doc.activeElement,email);
  fire(w,host,'shopify:section:unload');assert(!form.noValidate);assert(!form.dataset.qValidateInit);assert(groups.every(el=>!el.hidden));assert(!condition.querySelector('input').disabled);assert(!form.querySelector('[data-q-step-controls]'));
  let protects=0;w.Shopify={captcha:{protect(actual){assert.equal(actual,form);protects++}}};fire(w,host,'shopify:section:load');assert.equal(protects,1);assert.equal(form.querySelectorAll('[data-q-step-controls]').length,1);w.close();
  d=await fixture({settings:{destination:'shopify_contact',template_style:'steps'},blocks,editor:true});w=d.window;f.boot(w,assets);assert(!w.document.querySelector('[data-q-step-controls]'));assert([...w.document.querySelectorAll('[data-q-step]')].every(el=>!el.hidden));w.close();
  d=await fixture({blocks:[f.field('source','text',{name_attr:'odd" ][',default_value:'yes'}),f.field('dependent','text',{name_attr:'dependent',condition_enable:true,condition_field:'odd" ][',condition_operator:'equals',condition_value:'yes'})]});w=d.window;f.boot(w,assets);assert(!w.document.querySelector('[data-cond]').hidden);w.close();
  d=await fixture({settings:{destination:'shopify_customer'},attrs:'data-captcha="recaptcha_v3" data-captcha-key="key" data-q-pack-tags="0"',blocks:[f.field('email','email',{default_value:'native@example.test'}),f.field('utm','hidden',{name_attr:'contact[utm_source]',default_value:'merchant'})],url:'https://shop.test/fr/contact'});w=d.window;let executions=0;w.grecaptcha={ready(cb){cb()},execute(){executions++;return Promise.resolve('native-must-not-call')}};f.boot(w,assets);form=w.document.querySelector('form');assert(!submit(w,form).defaultPrevented);assert.equal(executions,0);assert.equal(form.querySelector('[name="contact[utm_source]"]').value,'merchant');w.close();
  // Re-entry retains submit events/submitter and never calls HTMLFormElement.submit().
  d=await fixture({attrs:'data-captcha="recaptcha_v3" data-captcha-key="key"'});w=d.window;let accepted=0,providedSubmitter,resolveToken;
  w.grecaptcha={ready(cb){cb()},execute(){executions++;return new Promise(resolve=>{resolveToken=resolve})}};
  w.HTMLFormElement.prototype.requestSubmit=function(button){providedSubmitter=button;if(!submit(w,this,button).defaultPrevented)accepted++};
  w.HTMLFormElement.prototype.submit=function(){assert.fail('bypasses native events')};f.boot(w,assets);form=w.document.querySelector('form');
  assert(submit(w,form).defaultPrevented);await f.drain();assert(form.querySelector('button').disabled);assert(submit(w,form).defaultPrevented);resolveToken('verified');await f.drain();assert.equal(accepted,1);assert.equal(providedSubmitter,form.querySelector('[type=submit]'));assert.equal(form.querySelector('[name="g-recaptcha-response"]').value,'verified');assert(!providedSubmitter.disabled);
  assert(submit(w,form).defaultPrevented);await f.drain();const stale=resolveToken;form.querySelector('[type=email]').value='new@example.test';fire(w,form.querySelector('[type=email]'),'input');stale('stale');await f.drain();assert.equal(accepted,1);assert(!form.querySelector('button').disabled);
  assert(submit(w,form).defaultPrevented);await f.drain();const removedToken=resolveToken;fire(w,form.closest('section'),'shopify:section:unload');removedToken('late');await f.drain();assert.equal(accepted,1);assert(!form.dataset.qValidateInit);w.close();
  d=await fixture({attrs:'data-captcha="recaptcha_v3" data-captcha-key="key"'});w=d.window;w.grecaptcha={ready(cb){cb()},execute(){return Promise.reject(new Error('blocked'))}};f.boot(w,assets);form=w.document.querySelector('form');assert(submit(w,form).defaultPrevented);await f.drain();assert.match(form.querySelector('.q-live').textContent,/Verification failed/);assert(!form.querySelector('button').disabled);w.close();
  d=await fixture({attrs:'data-captcha="turnstile" data-captcha-key="key"'});w=d.window;let options,removed=[],widgetCalls=0;accepted=0;
  w.turnstile={render(mount,opts){assert(mount.isConnected);assert.equal(mount.style.position,'');assert.equal(opts.size,'flexible');options=opts;return 'widget-'+(++widgetCalls)},remove(id){removed.push(id)}};
  w.HTMLFormElement.prototype.requestSubmit=function(button){if(!submit(w,this,button).defaultPrevented)accepted++};f.boot(w,assets);form=w.document.querySelector('form');
  submit(w,form);await f.drain();options['error-callback']();assert(!form.querySelector('button').disabled);assert.deepEqual(removed,['widget-1']);
  submit(w,form);await f.drain();options['expired-callback']();assert.equal(accepted,0);
  submit(w,form);await f.drain();options.callback('turnstile-token');assert.equal(accepted,1);assert.equal(form.querySelector('[name="cf-turnstile-response"]').value,'turnstile-token');assert.equal(removed.length,3);w.close();
  // Deadline and unload cancel owned timers; delayed provider completion cannot post.
  d=await fixture({attrs:'data-captcha="recaptcha_v3" data-captcha-key="key"'});w=d.window;
  const timers=new Map();let timerId=0,late;w.setTimeout=(cb,delay)=>{timers.set(++timerId,{cb,delay});return timerId};w.clearTimeout=id=>timers.delete(id);
  w.grecaptcha={ready(cb){cb()},execute(){return new Promise(resolve=>{late=resolve})}};accepted=0;w.HTMLFormElement.prototype.requestSubmit=function(){accepted++};f.boot(w,assets);form=w.document.querySelector('form');submit(w,form);await f.drain();
  assert.equal(timers.size,1);assert.equal([...timers.values()][0].delay,30000);[...timers.values()][0].cb();assert.equal(timers.size,0);assert(!form.querySelector('button').disabled);late('too-late');await f.drain();assert.equal(accepted,0);
  submit(w,form);await f.drain();assert.equal(timers.size,1);fire(w,form.closest('section'),'shopify:section:unload');assert.equal(timers.size,0);late('removed');await f.drain();assert.equal(accepted,0);w.close();
  // A shared pending SDK has per-form cancellation, and failed loads are retryable.
  const one=await fixture({attrs:'data-captcha="turnstile" data-captcha-key="key"'});w=one.window;const copy=one.window.document.querySelector('section').cloneNode(true);one.window.document.body.appendChild(copy);f.boot(w,assets);
  const forms=[...w.document.querySelectorAll('section form')];forms.forEach(form=>submit(w,form));assert.equal(w.document.querySelectorAll('script[src^="https://challenges.cloudflare.com/"]').length,1);
  fire(w,forms[0].closest('section'),'shopify:section:unload');assert.equal(w.document.querySelectorAll('script[src^="https://challenges.cloudflare.com/"]').length,1);
  const sdk=w.document.querySelector('script[src^="https://challenges.cloudflare.com/"]');sdk.dispatchEvent(new w.Event('error'));await f.drain();assert.match(forms[1].querySelector('.q-live').textContent,/Verification failed/);assert(!forms[1].querySelector('button').disabled);submit(w,forms[1]);assert.equal(w.document.querySelectorAll('script[src^="https://challenges.cloudflare.com/"]').length,1);fire(w,copy,'shopify:section:unload');await f.drain();assert.equal(w.document.querySelectorAll('script[src^="https://challenges.cloudflare.com/"]').length,0);w.close();
  // Real shared-host output still uses exactly one scoped controller per native form.
  for(const name of ['call-to-action-quote-form','form-quote-full','form-compact','form-support-request','form-newsletter']){d=f.dom(await f.host(name));w=d.window;f.boot(w,assets);assert.equal(w.document.querySelectorAll('form[data-q-validate-init="1"]').length,1,name);assert(!w.document.querySelector('script[src^="https://www.google.com/recaptcha"]'));w.close();}
  for(const name of ['call-to-action-quote-form','form-quote-full','form-compact','form-support-request']){
    d=f.dom('<style>'+f.read('assets/forms-sections.css')+f.read('assets/call-to-action-quote-form.css')+'</style>'+await f.host(name,{settings:{template_style:'steps'},blocks}));w=d.window;
    const nativeSteps=[...w.document.querySelectorAll('[data-q-step]')];assert.equal(nativeSteps.length,2,name);assert(nativeSteps.every(el=>w.getComputedStyle(el).display!=='none'),name+' complete without JS');
    f.boot(w,assets);assert.equal(nativeSteps.filter(el=>!el.hidden).length,1,name);w.close();
  }
  console.log('PASS scoped forms controller: native constraints, grouped steps/no-JS/editor, safe conditional names/disabled payloads, one instance across both assets, native Shopify captcha, custom token success/error/expiry/cancellation, shared SDK retries, attribution preservation and five actual hosts.');
})().catch(e=>{console.error(e);process.exit(1)});
