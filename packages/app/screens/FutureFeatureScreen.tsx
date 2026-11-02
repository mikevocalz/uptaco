import Link from 'solito/link';
import { Main, Section, Heading, Paragraph, Text } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';
const FEATURES={
  rewards:{kicker:'LOYALTY',heading:'GOOD THINGS\nARE COMING.',body:'Rewards are not yet enabled on this site. For now, place your order through Uptaco’s official provider.'},
  gifts:{kicker:'GIFT UPTACO',heading:'SPREAD THE\nGOOD MORNING.',body:'Digital gift cards are planned, but not on sale here until Uptaco’s payment and gift card systems are approved.'},
  account:{kicker:'YOUR ACCOUNT',heading:'YOUR MORNING,\nYOUR WAY.',body:'Accounts and saved orders are not yet available here. Ordering does not require an Uptaco website account.'},
  bag:{kicker:'YOUR ORDER',heading:'TAKE IT\nTO GO.',body:'The website’s own cart is not connected yet. The official ordering provider manages your basket and payment securely.'},
  checkout:{kicker:'SECURE ORDERING',heading:'READY TO\nGET UP?',body:'Uptaco checkout is handled by its verified ordering provider. This page never collects payment details.'},
  help:{kicker:'NEED A HAND?',heading:'WE’VE GOT\nYOU.',body:'For changes to an existing order, use the contact options on your order confirmation or the ordering provider.'}
} as const;
export function FutureFeatureScreen({feature}:{feature:keyof typeof FEATURES}){
 const info=FEATURES[feature];
 return <Main id="main-content" className="interior-page">
  <Section className="interior-hero interior-hero--placeholder"><Text className="page-kicker">{info.kicker}</Text><Heading level={1} className="preline">{info.heading}</Heading>
   <Paragraph>{info.body}</Paragraph><Link href="/menu" className="text-action">Explore Uptaco menu ↗</Link>
  </Section>
  <Section className="interior-order"><OrderChooser/></Section>
 </Main>;
}
