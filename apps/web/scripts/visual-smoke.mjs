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
  ['study-soft-rise','/design-preview/soft-rise'],
  ['study-counter','/design-preview/counter-editorial'],
  ['study-splash','/design-preview/morning-splash'],
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
  // Mobile Order tab regression: selectors stay inside /order, NOT behind
  // the fixed bottom tabbar on Home. Confirm at two compact phone widths.
  for (const width of [320,390]) {
    const context=await browser.newContext({viewport:{width,height:width===320?700:844},deviceScaleFactor:1});
    const page=await context.newPage();
    try{
      await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
      await page.locator('.site-tabbar').waitFor({state:'visible'});
      if(await page.locator('.dock-bridge').isVisible())
        throw new Error('Home must not show a location selector above the mobile tab bar');
      await page.locator('.mobile-order-entry__action').waitFor({state:'visible'});
      await page.locator('.site-tabbar-item--order').click();
      await page.waitForURL('**/order');
      await page.getByRole('group',{name:'Uptaco location'}).waitFor({state:'visible'});
      const midtown=page.getByRole('button',{name:'Midtown'});
      await midtown.click();
      if(await midtown.getAttribute('aria-pressed')!=='true')
        throw new Error('Midtown location selection did not update');
      await page.getByRole('button',{name:'Delivery'}).click();
      if(await page.getByRole('button',{name:'Delivery'}).getAttribute('aria-pressed')!=='true')
        throw new Error('Delivery choice did not update');
      const tabBar=page.locator('.site-tabbar');
      const orderButton=page.locator('.order-entry .order-dock-action .cta');
      await page.locator('.order-entry .order-dock-action').evaluate(el=>
        el.scrollIntoView({block:'center',behavior:'instant'})
      );
      await page.waitForTimeout(100);
      const bounds=await page.evaluate(()=>{
        const tab=document.querySelector('.site-tabbar');
        const button=document.querySelector('.order-entry .order-dock-action .cta');
        if(!tab||!button) return null;
        const a=tab.getBoundingClientRect(),b=button.getBoundingClientRect();
        return {tabTop:a.top,buttonBottom:b.bottom,scrollWidth:document.documentElement.scrollWidth,width:document.documentElement.clientWidth};
      });
      if(!bounds||bounds.buttonBottom>bounds.tabTop-2)
        throw new Error('Order action is obscured by the fixed navigation');
      if(bounds.scrollWidth>bounds.width+2)
        throw new Error('Mobile Order screen overflows horizontally');
      await page.screenshot({path:join(dir,`order-selector-${width}.png`),fullPage:false,animations:'disabled'});
      await orderButton.click();
      await page.waitForURL('**/menu?location=midtown&fulfillment=delivery');
      results.push({name:'mobile-order-tab',width,passed:true,bounds});
    }catch(e){fatal.push({name:'mobile-order-tab',width,error:String(e)});}
    finally{await context.close();}
  }
  // Run an interactive Uptaco menu → bag → remove/undo smoke check.
  const context=await browser.newContext({viewport:{width:390,height:844}});
  const page=await context.newPage();
  try{
    await page.goto(origin+'/menu',{waitUntil:'domcontentloaded'});
    // Allow the client root to rehydrate the anonymous draft bag before edits.
    await page.waitForTimeout(200);
    const button=page.getByRole('button',{name:/add .* to your .* bag/i}).first();
    await button.waitFor({state:'visible',timeout:10000});
    await button.click();
    await page.getByRole('link',{name:/view your .* bag/i}).first().waitFor({state:'visible',timeout:10000});
    // Deliberately do a hard navigation: the preview bag must survive reload.
    await page.goto(origin+'/bag',{waitUntil:'domcontentloaded'});
    const remove=page.getByRole('button',{name:/remove .* from bag/i}).first();
    await remove.waitFor({state:'visible',timeout:10000});
    await remove.click();
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
