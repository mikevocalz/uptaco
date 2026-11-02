'use client';
import { Link } from 'solito/link';
import { useEffect } from 'react';
import { Article, Page, Fieldset, Legend, Button, Text, Paragraph } from '@acme/ui/html';
import { selectCheckout } from '@uptaco/experience/capabilities';
import { useUptacoSite } from '../store/site.store';

/** Internal-only order entry. Never embeds provider checkout or launches a
 * marketplace browser. Product/price/availability must come from server API.
 */
export function OrderChooser({id}: {id?:string}) {
  const location=useUptacoSite(s=>s.location);
  const fulfillment=useUptacoSite(s=>s.fulfillment);
  const chooseLocation=useUptacoSite(s=>s.setLocation);
  const chooseFulfillment=useUptacoSite(s=>s.setFulfillment);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    const q=new URLSearchParams(window.location.search);
    const loc=q.get('location');
    const mode=q.get('fulfillment');
    if(loc==='harlem'||loc==='midtown') chooseLocation(loc);
    if(mode==='pickup'||mode==='delivery') chooseFulfillment(mode);
  },[chooseLocation,chooseFulfillment]);
  // Null capabilities are deliberate until authenticated merchant API is live.
  const route=selectCheckout(location,fulfillment,null);
  return <Article id={id} className="order-dock" aria-label="Order Uptaco">
    <Page className="order-dock-head">
      <Text className="order-eyebrow">YOUR MORNING, YOUR CALL</Text>
      <Paragraph>Where should we meet you?</Paragraph>
    </Page>
    <Page className="order-dock-controls">
      <Fieldset className="choice-fieldset"><Legend>Uptaco location</Legend>
        <Page className="choice-pair">
          <Button aria-pressed={location==='harlem'} className={location==='harlem'?'choice active':'choice'} onPress={()=>chooseLocation('harlem')}>Harlem</Button>
          <Button aria-pressed={location==='midtown'} className={location==='midtown'?'choice active':'choice'} onPress={()=>chooseLocation('midtown')}>Midtown</Button>
        </Page>
      </Fieldset>
      <Fieldset className="choice-fieldset"><Legend>Fulfillment method</Legend>
        <Page className="choice-pair">
          <Button aria-pressed={fulfillment==='pickup'} className={fulfillment==='pickup'?'choice active':'choice'} onPress={()=>chooseFulfillment('pickup')}>Pickup</Button>
          <Button aria-pressed={fulfillment==='delivery'} className={fulfillment==='delivery'?'choice active':'choice'} onPress={()=>chooseFulfillment('delivery')}>Delivery</Button>
        </Page>
      </Fieldset>
      <Page className="order-dock-action">
        <Link className="cta cta--black" href={route.href}>
          {route.label} <Text aria-hidden={true}>→</Text>
        </Link>
      </Page>
    </Page>
    <Text className="dock-disclaimer">{route.explanation}</Text>
  </Article>;
}
