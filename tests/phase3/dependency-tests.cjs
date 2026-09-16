const fs=require('node:fs');
const assert=require('node:assert/strict');
const {Liquid}=require('liquidjs');
const engine=new Liquid();
(async()=>{
const source=fs.readFileSync('./sections/multipurpose-hero-banner.liquid','utf8');
const association=source.match(/{%- liquid\s+assign slide_content =[\s\S]*?-%}/)[0];
const blocks=[{id:'a',type:'slide'},{id:'p1',type:'product',settings:{parent_slide:''}},{id:'b',type:'slide'},{id:'p2',type:'product',settings:{parent_slide:''}},{id:'p3',type:'content_column',settings:{parent_slide:'a'}},{id:'p4',type:'product',settings:{parent_slide:'missing'}}];
for(const [id,expected] of [['a','p1,p3'],['b','p2']]){
const output=await engine.parseAndRender(association+"{{ slide_content | map: 'id' | join: ',' }}",{section:{blocks},slide:{id}});
assert.equal(output.trim(),expected);
}
console.log('PASS actual Liquid association: preceding slides, saved explicit IDs, unknown parents excluded; no duplicate children.');
})().catch(e=>{console.error(e);process.exit(1)});
