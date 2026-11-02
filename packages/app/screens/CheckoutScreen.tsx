'use client';
import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text, Input, Button } from '@acme/ui/html';
import { bagCount } from '@uptaco/commerce/bag';
import { useUptacoBag } from '../store/bag.store';
import { useUptacoSite } from '../store/site.store';

/** This is the complete visual arrangement for Uptaco's future checkout.
 * Real payments REQUIRE an approved Square Web Payments integration plus
 * server repricing, taxes, fulfilment, anti-replay and order authorization.
 */
export function CheckoutScreen(){
  const location=useUptacoSite(s=>s.location);
  const fulfillment=useUptacoSite(s=>s.fulfillment);
  const lines=useUptacoBag(s=>s.bags[location]);
  const count=bagCount(lines);
  return <Main id="main-content" className="checkout-screen">
    <Section className="checkout-masthead">
      <Text className="page-kicker">THE UPTACO COUNTER / STEP 03</Text>
      <Heading level={1}>Just a{'\n'}few more bites.</Heading>
      <Paragraph>Your checkout never leaves Uptaco. The payment step is locked until secure merchant authorization is ready.</Paragraph>
      <Page className="checkout-progress" aria-label="Checkout steps">
        <Text>01 / Menu</Text><Text>02 / Bag</Text><Text className="is-current">03 / Checkout</Text><Text>04 / Ready</Text>
      </Page>
    </Section>
    <Section className="checkout-workspace">
      <Page className="checkout-primary">
        <Article className="checkout-panel">
          <Page className="checkout-panel-head"><Text>01 / YOUR PICKUP OR DELIVERY</Text><Text>LOCATION LOCKED UNTIL REQUOTE</Text></Page>
          <Heading level={2}>Where's breakfast going?</Heading>
          <Page className="checkout-choice-preview">
            <Text>{location==='harlem'?'Uptaco Harlem':'Uptaco Midtown'}</Text>
            <Text>{fulfillment==='pickup'?'Pickup':'Delivery'}</Text>
            <Link href="/order">Change order setup <Text aria-hidden={true}>→</Text></Link>
          </Page>
        </Article>
        <Article className="checkout-panel">
          <Page className="checkout-panel-head"><Text>02 / RECEIPT DETAILS</Text><Text>GUEST CHECKOUT</Text></Page>
          <Heading level={2}>How can we reach you?</Heading>
          <Page className="checkout-form-grid">
            <Page className="form-field"><Text>Full name</Text><Input editable={false} aria-label="Checkout name preview" placeholder="Full name — not enabled" className="form-input"/></Page>
            <Page className="form-field"><Text>Email receipt</Text><Input editable={false} aria-label="Checkout email preview" placeholder="Email address — not enabled" className="form-input"/></Page>
            <Page className="form-field"><Text>Mobile number (optional)</Text><Input editable={false} aria-label="Checkout mobile preview" placeholder="Mobile number — not enabled" className="form-input"/></Page>
          </Page>
          <Paragraph>When live, contact fields will be used only for the order unless the customer separately opts into marketing.</Paragraph>
        </Article>
        <Article className="checkout-panel checkout-panel--payment">
          <Page className="checkout-panel-head"><Text>03 / PAYMENT</Text><Text>SECURE UPTACO CHECKOUT</Text></Page>
          <Heading level={2}>Pay and get on your way.</Heading>
          <Page className="payment-empty"><Text className="payment-empty-symbol" aria-hidden={true}>▧</Text>
            <Page><Text>Payment fields are not active.</Text><Paragraph>Secure card entry will be handled by Square Web Payments SDK inside Uptaco; raw card details will never pass through the site or Payload.</Paragraph></Page></Page>
          <Button disabled className="cta cta--black checkout-locked" aria-label="Placing orders is not yet available">Payment unavailable</Button>
          <Paragraph>Nothing has been charged. Nothing has been submitted to the kitchen.</Paragraph>
        </Article>
      </Page>
      <Article className="checkout-summary">
        <Page className="checkout-summary-title"><Text className="page-kicker">YOUR COUNTER TICKET</Text><Heading level={2}>THE BAG.</Heading></Page>
        {lines.length===0?<Page className="checkout-summary-empty">
            <Text className="checkout-summary-sun" aria-hidden={true}>✳</Text>
            <Paragraph>No Uptaco items yet. Pick something tasty first.</Paragraph>
            <Link href="/menu" className="cta cta--orange">Explore the menu <Text aria-hidden={true}>→</Text></Link>
          </Page>:
          <Page className="checkout-summary-items">
            {lines.map(line=><Page key={line.key} className="checkout-summary-line">
              <Text>{line.name}</Text><Text>× {line.quantity}</Text>
            </Page>)}
          </Page>}
        <Page className="checkout-summary-total"><Text>{count} items</Text><Text>Awaiting verified prices</Text></Page>
        <Paragraph>Current prices, modifiers, service fees, taxes and prep windows are never guessed. They will be verified by Uptaco’s server at checkout.</Paragraph>
        <Link href="/bag" className="text-action">Back to your bag <Text aria-hidden={true}>→</Text></Link>
      </Article>
    </Section>
  </Main>;
}
