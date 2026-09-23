const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
const name = 'interactive-content-helper-countdown-and-progress';
const steps = [0,1,2].map(i => ({type:'step',settings:{label:'Step <'+i+'>',description:'Plain <text>'}}));
const markup = (settings={},blocks=steps,id='one',design=false) => f.render(name,{id,settings,blocks,data:{request:{design_mode:design}}});
function inspect(html,fn){const d=f.dom(html);try{fn(d.window.document)}finally{d.window.close()}}
function harness(html,now){const d=f.dom(html),w=d.window,timers=new Map();let next=0,hidden=false;
  w.Date.now=()=>now;w.setTimeout=(fn,delay)=>{timers.set(++next,{fn,delay});return next;};w.clearTimeout=id=>timers.delete(id);
  Object.defineProperty(w.document,'hidden',{get:()=>hidden});f.boot(w,['interactive-content-countdown.js']);
  return {d,w,timers,advance(ms){now+=ms;const callbacks=[...timers.values()];timers.clear();callbacks.forEach(x=>x.fn());},visibility(value){hidden=value;w.document.dispatchEvent(new w.Event('visibilitychange'));}};
}
(async()=>{
  for(const preset of f.unpack(name).schema.presets)inspect(await markup(preset.settings,preset.blocks||[]),doc=>assert.ok(doc.querySelector('section')));
  for(const s of f.unpack(name).schema.settings){const values=s.options?.map(o=>o.value)||(s.type==='range'?[s.min,s.max]:s.type==='checkbox'?[false,true]:[]);for(const value of values)inspect(await markup({[s.id]:value}),doc=>{assert.ok(doc.querySelector('section'));assert.doesNotMatch(doc.body.innerHTML,/Liquid error|NaN|undefined/);});}
  for(const date of ['', '2026-02-29','2100-02-29','2026-04-31','2026-00-10','2026-13-01','2026-12-00','2026-1-001','202x-12-01','2026-12-01extra','1969-12-31']){
    inspect(await markup({target_date:date,on_invalid_datetime:'show_message',invalid_message:'Invalid <safe>'}),doc=>{assert.equal(doc.querySelector('[data-q-invalid]').textContent.trim(),'Invalid <safe>');assert.equal(doc.querySelector('[data-q-countdown]'),null);});
    inspect(await markup({target_date:date,on_invalid_datetime:'hide_section'}),doc=>assert.equal(doc.querySelector('section'),null));
    inspect(await markup({target_date:date,on_invalid_datetime:'hide_section'},[],'edit',true),doc=>assert.ok(doc.querySelector('[role=status]')));
  }
  for(const time of ['', '24:00','12:60','1:005','-1:00','12:0x','12:00:00'])inspect(await markup({target_time:time,on_invalid_datetime:'show_message'}),doc=>assert.ok(doc.querySelector('[data-q-invalid]')));
  for(const date of ['2028-02-29','2000-02-29','2026-04-30','2026-12-31'])inspect(await markup({target_date:date,timezone_mode:'utc',show_seconds:false}),doc=>{assert.match(doc.querySelector('section').dataset.targetEpoch,/^\d+$/);assert.equal(doc.querySelector('.q-countdown__grid').hidden,true);assert.equal(doc.querySelector('[data-q-seconds]').hidden,true);assert.match(doc.querySelector('[data-q-static]').textContent,/ UTC/);});
  for(const current of [-9,0,40,100,150])inspect(await markup({mode:'progress_bar',current_value:current,label:'',show_values:true,value_suffix:'units <safe>'}),doc=>{const bar=doc.querySelector('[role=progressbar]');assert.equal(+bar.getAttribute('aria-valuenow'),Math.max(0,Math.min(100,current)));assert.equal(bar.getAttribute('aria-label'),'Progress');assert.equal(doc.querySelector('.q-progressbar__suffix').textContent,'units <safe>');});
  for(const max of [-1,0]){inspect(await markup({mode:'progress_bar',max_value:max}),doc=>assert.equal(doc.querySelector('section'),null));inspect(await markup({mode:'progress_bar',max_value:max},steps,'edit',true),doc=>assert.ok(doc.querySelector('[role=status]')));}
  for(const index of [-1,0,1,1.8,2,3,9])inspect(await markup({mode:'progress_steps',current_step_index:index}),doc=>{assert.equal(doc.querySelectorAll('[aria-current=step]').length,1);assert.equal([...doc.querySelectorAll('.q-step')].indexOf(doc.querySelector('[aria-current=step]')),Math.max(1,Math.min(3,Math.floor(index)))-1);assert.ok(doc.querySelector('.q-steps--fill'));assert.equal(doc.querySelector('script'),null);assert.equal(doc.querySelector('.q-step__label').textContent,'Step <0>');});
  inspect(await markup({mode:'progress_steps',show_connector_fill:false,show_step_numbers:false,show_inline_progress_bar:false}),doc=>assert.equal(doc.querySelector('.q-steps--fill,.q-step__num,.q-steps__inlinebar'),null));
  inspect(await markup({mode:'progress_steps'},[]),doc=>assert.equal(doc.querySelector('section'),null));
  const end=Date.parse('2028-02-29T12:00:00Z'),settings={target_date:'2028-02-29',target_time:'12:00',timezone_mode:'utc'};
  for(const behavior of ['hide_section','show_message','show_expired_state']){
    const h=harness(await markup({...settings,expired_behavior:behavior,show_seconds:false}),end-500);
    const root=h.w.document.querySelector('section');assert.equal(h.timers.size,1);assert.equal([...h.timers.values()][0].delay,500,'expiry is not postponed for a full minute');h.advance(500);assert.equal(h.timers.size,0);assert.equal(root.hidden,behavior==='hide_section');assert.equal(root.querySelector('[data-q-expired-message]').hidden,behavior!=='show_message');assert.equal(root.querySelector('.q-countdown__grid').hidden,behavior==='show_message');h.d.window.close();
  }
  let h=harness(await markup({...settings,expired_behavior:'hide_section'},steps,'edit',true),end);assert.equal(h.w.document.querySelector('section').hidden,false);assert.equal(h.w.document.querySelector('[data-q-expired-message]').hidden,false);assert.equal(h.timers.size,0);h.d.window.close();
  h=harness(await markup(settings)+await markup(settings,steps,'two'),end-90000);assert.equal(h.timers.size,2);h.visibility(true);assert.equal(h.timers.size,0);h.advance(30000);h.visibility(false);assert.equal(h.timers.size,2);
  const root=h.w.document.querySelector('section');root.dispatchEvent(new h.w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(h.timers.size,1);assert.equal(root.querySelector('.q-countdown__grid').hidden,true);root.dispatchEvent(new h.w.CustomEvent('shopify:section:load',{bubbles:true}));assert.equal(h.timers.size,2);f.boot(h.w,['interactive-content-countdown.js']);assert.equal(h.timers.size,2);h.d.window.close();
  h=harness((await markup(settings)).replace(/data-target-epoch="\d+"/,'data-target-epoch="123bad"'),end-90000);assert.equal(h.timers.size,0);assert.equal(h.w.document.querySelector('.q-countdown__grid').hidden,true);h.d.window.close();
  console.log('PASS Countdown/Progress actual settings/presets/modes, strict calendar/time validation, native fallback/steps/clamps/escaped text, exact deadline, hidden seconds, all expiry behaviors, editor visibility, independent roots, paused/duplicate/disposable lifecycle. LiquidJS date adapter does not certify Shopify store timezone or DST.');
})().catch(error=>{console.error(error);process.exitCode=1;});
