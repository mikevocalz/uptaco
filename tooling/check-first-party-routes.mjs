import {readdir,readFile} from 'node:fs/promises';
import path from 'node:path';
const roots=['packages/app/components','packages/app/screens'];
const problems=[];
async function walk(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())await walk(file);
    else if(/\.tsx$/.test(entry.name)){
      const content=await readFile(file,'utf8');
      const external=[...content.matchAll(/\bhref\s*=\s*["']\s*(?:https?:|\/\/|mailto:|tel:)/gi)].map(x=>x[0]);
      const providerCheckout=[...content.matchAll(/(?:uptaco-harlem\.square\.site|uptaco\.square\.site|grubhub\.com|portal\.odeko\.com|uptaco\.gethoneycart\.com)/gi)].map(x=>x[0]);
      if(external.length||providerCheckout.length)problems.push({file,external,providerCheckout});
    }
  }
}
for(const dir of roots)await walk(dir);
if(problems.length){
  console.error('Offsite customer routes detected; use first-party server adapters:');
  for(const issue of problems)console.error(JSON.stringify(issue));
  process.exitCode=1;
}else console.log('First-party customer routing check passed.');
