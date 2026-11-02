'use client';
import Link from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text, Button } from '@acme/ui/html';
import { bagCount } from '@uptaco/commerce/bag';
import { captureBagMotionOrigin } from '@acme/ui/bag-motion';
import { useUptacoBag } from '../store/bag.store';
import { useUptacoSite } from '../store/site.store';

export function BagScreen(){
  const location=useUptacoSite(s=>s.location);
  const changeLocation=useUptacoSite(s=>s.setLocation);
  const lines=useUptacoBag(s=>s.bags[location]);
  const other=useUptacoBag(s=>s.bags[location==='harlem'?'midtown':'harlem']);
  const removed=useUptacoBag(s=>s.lastRemoved);
  const increase=useUptacoBag(s=>s.increase);
  const decrease=useUptacoBag(s=>s.decrease);
  const remove=useUptacoBag(s=>s.remove);
  const undo=useUptacoBag(s=>s.undoRemoval);
  const count=bagCount(lines);
  return <Main id="main-content" className="bag-screen">
    <Section className="interior-hero interior-hero--bag">
      <Text className="page-kicker">YOUR UPTACO BAG</Text>
      <Heading level={1}>YOUR{'\n'}GOOD STUFF.</Heading>
      <Paragraph>{location==='harlem'?'Harlem':'Midtown'} · {count} item{count===1?'':'s'}</Paragraph>
    </Section>
    <Section className="bag-workspace" aria-label="Your bag">
      <Page className="bag-list">
        <Page className="bag-list-heading">
          <Heading level={2}>{count?'Looking good.':'Bag looking lonely?'}</Heading>
          <Paragraph>{count?'Adjust your items before checkout.':'Browse Uptaco’s menu and build your morning.'}</Paragraph>
        </Page>
        {lines.length===0
          ? <Page className="bag-empty"><Text className="bag-empty-mark" aria-hidden="true">U.</Text>
              <Paragraph>Your bag is empty. Good mornings start with a taco.</Paragraph>
              <Link href="/menu" className="cta cta--orange">Explore the menu <Text aria-hidden="true">→</Text></Link>
            </Page>
          : <Page className="bag-lines">
              {lines.map(line=>{
                const rowId=`bag-row-${line.productId}`;
                return <Article key={line.key} id={rowId} className="bag-row">
                  <Page className="bag-row-stamp" aria-hidden="true">U</Page>
                  <Page className="bag-row-content">
                    <Text className="bag-row-category">{line.category.toUpperCase()}</Text>
                    <Heading level={3}>{line.name}</Heading>
                    <Text className="bag-row-price">Price and modifiers to be confirmed when the live menu connects</Text>
                    <Page className="bag-row-actions">
                      <Page className="bag-quantity" role="group" aria-label={`Quantity for ${line.name}`}>
                        <Button aria-label={`Decrease ${line.name} quantity`} onPress={()=>
                          decrease(location,line.key,captureBagMotionOrigin(rowId))}>−</Button>
                        <Text aria-label={`Quantity ${line.quantity}`}>{line.quantity}</Text>
                        <Button aria-label={`Increase ${line.name} quantity`} onPress={()=>
                          increase(location,line.key,captureBagMotionOrigin(rowId))}>+</Button>
                      </Page>
                      <Button className="bag-remove" aria-label={`Remove ${line.name} from bag`}
                        onPress={()=>remove(location,line.key,captureBagMotionOrigin(rowId))}>
                        Remove <Text aria-hidden="true">↗</Text>
                      </Button>
                    </Page>
                  </Page>
                </Article>;
              })}
            </Page>}
        {removed && <Page className="bag-undo">
          <Paragraph>Removed {removed.line.name} from {removed.location==='harlem'?'Harlem':'Midtown'}.</Paragraph>
          <Button onPress={()=>undo(captureBagMotionOrigin('bag-undo-trigger'))} id="bag-undo-trigger"
            className="bag-undo-button" aria-label={`Undo removal of ${removed.line.name}`}>Undo removal ↶</Button>
        </Page>}
        {bagCount(other)>0 && <Page className="bag-other-location">
          <Paragraph>You also have {bagCount(other)} item(s) saved in the {location==='harlem'?'Midtown':'Harlem'} bag. They stay separate.</Paragraph>
          <Button onPress={()=>changeLocation(location==='harlem'?'midtown':'harlem')}>View other location</Button>
        </Page>}
      </Page>
      <Page className="bag-summary">
        <Text className="page-kicker">ALMOST BREAKFAST</Text>
        <Heading level={2}>The{'\n'}final touch.</Heading>
        <Page className="bag-summary-line"><Text>Items</Text><Text>{count}</Text></Page>
        <Page className="bag-summary-line"><Text>Pricing</Text><Text>Awaiting live menu</Text></Page>
        <Paragraph className="bag-disclosure">These are preview bag items. No order has been sent or charged. Live availability, modifiers, taxes and delivery fees must be verified by Uptaco’s server before payment.</Paragraph>
        <Button disabled className="cta cta--black bag-checkout-disabled"
          aria-label="Checkout unavailable until Uptaco live merchant integration is connected">Checkout unavailable</Button>
        <Link href="/menu" className="text-action">Keep exploring <Text aria-hidden="true">→</Text></Link>
      </Page>
    </Section>
  </Main>;
}
