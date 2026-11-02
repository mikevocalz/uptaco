import { Link } from 'solito/link';
import { Main, Section, Heading, Paragraph, Text } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';
const FEATURES={
  rewards:{kicker:'LOYALTY',heading:'GOOD THINGS\nARE COMING.',body:'Uptaco Rewards will be managed here once Uptaco’s loyalty program is connected. There is no external rewards portal.'},
  gifts:{kicker:'GIFT UPTACO',heading:'SPREAD THE\nGOOD MORNING.',body:'Digital gift cards, purchase, delivery and balance lookup will live here. Sales are disabled until the merchant’s gift-card service is configured.'},
  account:{kicker:'YOUR ACCOUNT',heading:'YOUR MORNING,\nYOUR WAY.',body:'Uptaco account sign-in and saved orders will happen here. Guest access stays available while customer login is being built.'},
  bag:{kicker:'YOUR ORDER',heading:'TAKE IT\nTO GO.',body:'Your Uptaco cart will stay here. Live prices and ordering cannot be enabled before the restaurant’s catalog and payment connection are verified.'},
  checkout:{kicker:'SECURE ORDERING',heading:'READY TO\nGET UP?',body:'Checkout will happen entirely on Uptaco, using secure embedded payment fields. No payments are being accepted until the merchant integration is verified.'},
  help:{kicker:'NEED A HAND?',heading:'WE’VE GOT\nYOU.',body:'Order help and customer support will stay here. Use the on-site contact page for restaurant questions.'}
} as const;
export function FutureFeatureScreen({feature}:{feature:keyof typeof FEATURES}){
  const info=FEATURES[feature];
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--placeholder">
      <Text className="page-kicker">{info.kicker}</Text>
      <Heading level={1} className="preline">{info.heading}</Heading>
      <Paragraph>{info.body}</Paragraph>
      <Link href="/menu" className="text-action">Explore Uptaco menu <Text aria-hidden="true">→</Text></Link>
    </Section>
    <Section className="interior-order"><OrderChooser/></Section>
  </Main>;
}
