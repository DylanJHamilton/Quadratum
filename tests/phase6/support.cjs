// Explicit Shopify Liquid/form adapters inherited from Phase 4. No live endpoint calls.
const f=require('../phase4/support/forms.cjs');
const defaults=Object.assign({},...JSON.parse(f.read('config/settings_schema.json')).map(g=>f.defaults(g.settings)));
async function popup(overrides={},data={}){
 const context={settings:{...defaults,popup_enable:true,popup_trigger:'manual',...overrides},request:{design_mode:false},form:{},routes:{root_url:'/fr/',cart_url:'/fr/cart',all_products_collection_url:'/fr/collections/all'},...data};
 return f.engine.renderFile('global-popup',context,{globals:context});
}
module.exports={...f,defaults,popup};
