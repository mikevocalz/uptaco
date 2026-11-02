import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text } from '@acme/ui/html';

type Status='received'|'accepted'|'preparing'|'ready'|'collected'|'on-the-way'|'delivered'|'cancelled';
export type VerifiedOrder=Readonly<{
  id:string;
  status:Status;
  locationName:string;
  fulfillment:'pickup'|'delivery';
  createdAt:string;
  itemCount:number;
}>;
const milestones=[
  {id:'received',title:'Order placed',text:'Your Uptaco order has been received.'},
  {id:'preparing',title:'In the kitchen',text:'The Uptaco team is preparing your meal.'},
  {id:'ready',title:'Ready for handoff',text:'Your pickup or courier handoff is ready.'},
  {id:'delivered',title:'Completed',text:'The provider confirms your order is complete.'}
] as const;

export function OrderStatusScreen({order=null}:{order?:VerifiedOrder|null}){
  const verified=order!==null;
  return <Main id="main-content" className="order-status-page">
    <Section className="interior-hero interior-hero--order">
      <Text className="page-kicker">UPTACO / ORDER UPDATES</Text>
      <Heading level={1}>WHERE'S{'\n'}MY TACO?</Heading>
      <Paragraph>{verified?'Your order update is right here.':'Every Uptaco order will be tracked here using verified updates—no outside tracking website.'}</Paragraph>
    </Section>
    <Section className="status-workspace">
      <Page className="status-main">
        <Text className="page-kicker">ORDER PROGRESS</Text>
        {verified?
          <Page className="status-verified">
            <Heading level={2}>Your order is {order.status.replaceAll('-',' ')}.</Heading>
            <Paragraph>{order.locationName} · {order.itemCount} items · {order.fulfillment}</Paragraph>
          </Page>:
          <Page className="status-empty">
            <Text className="status-empty-symbol" aria-hidden={true}>U.</Text>
            <Heading level={2}>No verified order to show.</Heading>
            <Paragraph>We can't show a status without a confirmed order and valid receipt authorization. No order has been placed from this preview.</Paragraph>
            <Link href="/menu" className="cta cta--orange">Discover the menu <Text aria-hidden={true}>→</Text></Link>
          </Page>}
      </Page>
      <Article className="status-timeline">
        <Text className="page-kicker">THE UPTACO TIMELINE</Text>
        <Heading level={2}>FROM COUNTER{'\n'}TO YOU.</Heading>
        {milestones.map((m,i)=><Page className="status-step" key={m.id}>
          <Text className="status-step-index">{String(i+1).padStart(2,'0')}</Text>
          <Page><Heading level={3}>{m.title}</Heading><Paragraph>{m.text}</Paragraph></Page>
        </Page>)}
        <Paragraph className="status-note">This shows the designed milestones, not a live order. The active step will come only from authorized Square and delivery-provider events.</Paragraph>
      </Article>
    </Section>
  </Main>;
}
