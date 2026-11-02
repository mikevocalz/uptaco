/**
 * Architectural guard: no literal DOM tags in product screens/components.
 * Native and web DOM/Compose adapters live inside packages/ui only.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const roots=['packages/app/screens','packages/app/components'];
const invalid=/<\/?(?:a|article|aside|button|div|footer|form|h[1-6]|header|img|input|label|main|nav|p|section|span|textarea|ul|li|svg|br)\b/gi;
const findings=[];
async function walk(root) {
  const entries=await readdir(root,{withFileTypes:true});
  for(const entry of entries){
    const candidate=path.join(root,entry.name);
    if(entry.isDirectory()) await walk(candidate);
    else if(/\.tsx$/.test(entry.name)) {
      const text=await readFile(candidate,'utf8');
      const matches=[...text.matchAll(invalid)].map(m=>m[0]);
      if(matches.length) findings.push({file:candidate,matches});
    }
  }
}
for(const root of roots) await walk(root);
if(findings.length){
  console.error('Raw HTML tags found outside @acme/ui HTML adapters:');
  for(const hit of findings) console.error(hit.file+': '+hit.matches.join(', '));
  process.exitCode=1;
}else console.log('Semantic UI boundary check passed.');
