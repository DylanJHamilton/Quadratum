const fs = require('node:fs');
const cp = require('node:child_process');
const {toLiquidHtmlAST} = require('@shopify/liquid-html-parser');
const files = cp.execFileSync('git',['diff','--name-only','47664f217cc150b64d68158b3babd38bac2885d6'],{encoding:'utf8'}).trim().split('\n').concat(cp.execFileSync('git',['ls-files','--others','--exclude-standard'],{encoding:'utf8'}).trim().split('\n')).filter(Boolean);
let parsed=0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  if(file.endsWith('.liquid')) {toLiquidHtmlAST(fs.readFileSync(file,'utf8'),{mode:'strict'});parsed++;}
  if(file.startsWith('assets/') && file.endsWith('.js')) cp.execFileSync(process.execPath,['--check',file]);
  if(file.startsWith('config/') && file.endsWith('.json')) JSON.parse(fs.readFileSync(file,'utf8').replace(/^\s*\/\*[\s\S]*?\*\//,''));
}
console.log('PASS changed source syntax: '+parsed+' strict Shopify Liquid files, changed JS syntax and config JSON.');
