import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Visual evidence is generated from the built Next app on every PR.
 * It does not authorize public checkout or invent customer credentials.
 */
const origin=process.env.UPTACO_TEST_ORIGIN??'http://127.0.0.1:3000';
const dir=new URL('../visual-screenshots/',import.meta.url).pathname;
mkdirSync(dir,{recursive:true});
const routes=[
  ['home','/'], ['menu','/menu'],['bec','/menu/bec-breakfast-taco'],
  ['order','/order'],['bag','/bag'],['checkout','/checkout'],
  ['account-guest','/account'],['account-orders','/account/orders'],
  ['rewards','/rewards'],['gifts','/gifts'],
  ['locations','/locations'],['harlem','/locations/harlem'],['midtown','/locations/midtown'],
  ['catering','/catering'],['catering-quote','/catering/quote'],
  ['cafe','/cafe-partners'],['cafe-application','/cafe-partners/apply'],
  ['contact','/contact'],['help','/help'],['order-status','/order/invalid-preview-token'],
  ['more','/more'],['story','/story']
];
const views=[{name:'mobile',width:390,height:844},{name:'desktop',width:1440,height:900}];
const results=[],fatal=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try{
  for(const view of views){
    const context=await browser.newContext({viewport:{width:view.width,height:view.height},deviceScaleFactor:1});
    for(const [name,path] of routes){
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      let status=0;
      try{
        const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:30000});
        status=response?.status()??0;
        await page.locator('main').first().waitFor({state:'visible',timeout:15000});
        await page.waitForTimeout(450);
        await page.screenshot({path:join(dir,`${name}-${view.name}.png`),fullPage:true,animations:'disabled'});
        const audit=await page.evaluate(()=>{
          const width=document.documentElement.clientWidth;
          const scrollWidth=document.documentElement.scrollWidth;
          const h1=document.querySelector('main h1')?.textContent?.trim()??'';
          const external=[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')??'').filter(href=>/^https?:\/\//i.test(href)||href.startsWith('//'));
          const images=[...document.querySelectorAll('main img')].map(img=>({src:img.currentSrc||img.src,loaded:img.complete&&img.naturalWidth>0}));
          return {width,scrollWidth,overflow:scrollWidth>width+2,h1,external,images};
        });
        const item={name,view:view.name,path,status,...audit,errors};
        results.push(item);
        if(status!==200||!audit.h1||audit.external.length||errors.length||audit.overflow){
          fatal.push(item);
        }
      }catch(e){const error={name,view:view.name,path,status,error:String(e),errors};results.push(error);fatal.push(error);}
      finally{await page.close();}
    }
    await context.close();
  }
  // Run an interactive Uptaco menu → bag → remove/undo smoke check.
  const context=await browser.newContext({viewport:{width:390,height:844}});
  const page=await context.newPage();
  try{
    await page.goto(origin+'/menu',{waitUntil:'domcontentloaded'});
    const button=page.getByRole('button',{name:/add .* to your .* bag/i}).first();
    await button.waitFor({state:'visible',timeout:10000});
    await button.click();
    await page.goto(origin+'/bag',{waitUntil:'domcontentloaded'});
    await page.getByRole('button',{name:/remove .* from bag/i}).first().click();
    await page.getByRole('button',{name:/undo removal/i}).click();
    await page.screenshot({path:join(dir,'bag-after-undo-mobile.png'),fullPage:true,animations:'disabled'});
    results.push({name:'bag-interactions',passed:true});
  }catch(e){fatal.push({name:'bag-interactions',error:String(e)});}
  finally{await context.close();}
}finally{await browser.close();}
const report={generatedAt:new Date().toISOString(),origin,screenCount:routes.length*views.length+1,results,fatal};
writeFileSync(join(dir,'report.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Captured ${results.length} checks; ${fatal.length} failures.`);
if(fatal.length){console.error(JSON.stringify(fatal.slice(0,15),null,2));process.exitCode=1;}
