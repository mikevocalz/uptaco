import { Link } from 'solito/link';
import { Main, Section, Article, Page, Heading, Paragraph, Text, Nav } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_MEDIA } from '../data/brand';

/** Only server-verified session data may ever populate this interface.
 * No fake customer names, rewards balances, order records or login actions.
 */
export type AccountViewer = Readonly<{id:string;displayName?:string;email:string;verified:true}>;
type AccountArea='overview'|'orders'|'favorites'|'rewards'|'gifts'|'profile'|'addresses'|'preferences'|'notifications'|'security'|'privacy';
const areas: readonly {id:AccountArea;label:string;path:string;description:string}[]=[
  {id:'overview',label:'My Uptaco',path:'/account',description:'Your Uptaco home and recent orders'},
  {id:'orders',label:'Orders & receipts',path:'/account/orders',description:'Receipts and real order statuses'},
  {id:'favorites',label:'Favorites',path:'/account/favorites',description:'Your favorite verified menu configurations'},
  {id:'rewards',label:'Rewards',path:'/account/rewards',description:'Points and offers, when Uptaco Rewards is enabled'},
  {id:'gifts',label:'Gift cards',path:'/account/gifts',description:'Card purchases, sending and balance checks'},
  {id:'profile',label:'Profile',path:'/account/profile',description:'Contact and preferred restaurant location'},
  {id:'addresses',label:'Saved addresses',path:'/account/addresses',description:'Opt-in delivery addresses'},
  {id:'preferences',label:'Food & preferences',path:'/account/preferences',description:'Dietary notes and personal ordering preferences'},
  {id:'notifications',label:'Notifications',path:'/account/notifications',description:'Order updates and optional marketing'},
  {id:'security',label:'Sign-in & security',path:'/account/security',description:'Sessions, secure login and passkeys'},
  {id:'privacy',label:'Privacy & data',path:'/account/privacy',description:'Consents, export and deletion'}
];

function IllustrationCard(){
  return <Page className="customer-illustration" aria-hidden={true}>
    <Page className="customer-illustration-logo">
      <BrandImage src={UPTACO_MEDIA.wordmarkBlack} width={128} height={128} alt="" sizes="128px"/>
    </Page>
    <Text className="customer-illustration-stamp">YOUR NEW YORK MORNING, ON REPEAT.</Text>
    <Page className="customer-illustration-ticket"><Text>GOOD THINGS LIVE HERE</Text><Text>01 / UPTACO</Text></Page>
  </Page>;
}

export function AccountScreen({area='overview',viewer=null}:{area?:AccountArea;viewer?:AccountViewer|null}){
  const current=areas.find(x=>x.id===area)??areas[0];
  return <Main id="main-content" className="account-screen">
    <Section className="interior-hero interior-hero--account">
      <Text className="page-kicker">PERSONAL CORNER / UPTACO</Text>
      <Heading level={1}>{viewer?'YOUR MORNING.':'ONE MORE'}{'\n'}{viewer?'YOUR WAY.':'GOOD THING.'}</Heading>
      <Paragraph>{viewer? `Good morning, ${viewer.displayName||'friend'}. Your Uptaco account lives here.` : 'Your orders, favorites, and good mornings—together when customer accounts launch.'}</Paragraph>
    </Section>
    <Section className="account-shell" aria-label="Uptaco account experience">
      <Nav className="account-master" aria-label="Account sections">
        <Text className="account-master-caption">MY UPTACO</Text>
        {areas.map(item=><Link key={item.id} href={item.path}
          className={item.id===area?'account-master-link is-active':'account-master-link'}
          aria-current={item.id===area?'page':undefined}>
          <Text>{item.label}</Text><Text aria-hidden={true}>↗</Text>
        </Link>)}
      </Nav>
      <Article className="account-detail">
        <Page className="account-detail-heading">
          <Text className="page-kicker">YOUR SPACE / {String(areas.indexOf(current)+1).padStart(2,'0')}</Text>
          <Heading level={2}>{current.label}</Heading>
          <Paragraph>{current.description}.</Paragraph>
        </Page>
        {viewer?
          <Page className="account-actual-state">
            <Text className="account-actual-kicker">CONNECTED CUSTOMER</Text>
            <Heading level={3}>{area==='overview'?'Welcome back.':current.label}</Heading>
            <Paragraph>We’ll show only verified Uptaco records associated with your authenticated account. The live data adapter has not been connected for this section.</Paragraph>
            <Link href="/order" className="cta cta--orange">Start an Uptaco order <Text aria-hidden={true}>→</Text></Link>
          </Page>
        :
          <Page className="account-guest-panel">
            <Page className="account-guest-status"><Text className="account-guest-dot" aria-hidden={true}>✳</Text><Text>ACCOUNT ACCESS IS BEING CONNECTED</Text></Page>
            <Heading level={3}>Keep your mornings close.</Heading>
            <Paragraph>Once secure Uptaco sign-in is live, this space will hold your receipts, saved favorites, preferences, and eligible rewards. We won’t pretend you’re logged in or collect credentials before authentication works.</Paragraph>
            <Link className="cta cta--black" href="/order">Order as a guest <Text aria-hidden={true}>→</Text></Link>
          </Page>
        }
        <Page className="account-benefits" aria-label="Account features">
          <Page><Text className="account-benefit-index">01</Text><Heading level={3}>Reorder your usual</Heading><Paragraph>Your last eligible meal, repriced for today's menu.</Paragraph></Page>
          <Page><Text className="account-benefit-index">02</Text><Heading level={3}>Track every bite</Heading><Paragraph>Receipts and updates tied to real Uptaco orders.</Paragraph></Page>
          <Page><Text className="account-benefit-index">03</Text><Heading level={3}>Earn when enabled</Heading><Paragraph>One verified loyalty balance, not made-up points.</Paragraph></Page>
        </Page>
      </Article>
      <Page className="account-inspector"><IllustrationCard/>
        <Text className="page-kicker">YOUR UPTACO CORNER</Text>
        <Paragraph>Membership is for convenience. Ordering food will never require an account.</Paragraph>
      </Page>
    </Section>
  </Main>;
}

export const ACCOUNT_AREAS:readonly AccountArea[] = areas.map(area=>area.id);
