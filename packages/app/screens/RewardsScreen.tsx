import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_MEDIA } from '../data/brand';

export function RewardsScreen(){
  return <Main id="main-content" className="rewards-page">
    <Section className="interior-hero interior-hero--rewards">
      <Text className="page-kicker">UPTACO REWARDS / YOUR EVERYDAY RITUAL</Text>
      <Heading level={1}>Good{'\n'}mornings.{'\n'}More of them.</Heading>
      <Paragraph>The future home for Uptaco’s own loyalty experience, with everything staying inside your account.</Paragraph>
      <Link href="/menu" className="cta cta--orange">Explore the menu <Text aria-hidden={true}>→</Text></Link>
      <Page className="rewards-brand-tile">
        <BrandImage src={UPTACO_MEDIA.wordmarkBlack} width={270} height={270} sizes="(max-width: 700px) 140px, 270px" alt="Uptaco official wordmark"/>
        <Text>GOOD THINGS ADD UP.</Text>
      </Page>
    </Section>
    <Section className="rewards-workspace">
      <Page className="rewards-heading">
        <Text className="page-kicker">A PROGRAM WORTH COMING BACK FOR</Text>
        <Heading level={2}>Made for{'\n'}your usual.</Heading>
        <Paragraph>Three parts of the Uptaco loyalty experience—shown as design previews until the actual Square Loyalty program is enabled.</Paragraph>
      </Page>
      <Page className="rewards-grid">
        <Article className="rewards-card rewards-card--lavender"><Text>01 / EARN</Text><Heading level={3}>Every good morning counts.</Heading><Paragraph>Eligible first-party purchases will be checked against Uptaco’s real loyalty program before points are awarded.</Paragraph></Article>
        <Article className="rewards-card rewards-card--orange"><Text>02 / USE</Text><Heading level={3}>Treat yourself when it’s time.</Heading><Paragraph>See and redeem only the rewards Uptaco actually publishes. No invented point values or promises.</Paragraph></Article>
        <Article className="rewards-card rewards-card--dark"><Text>03 / KNOW</Text><Heading level={3}>One balance. Your history.</Heading><Paragraph>Your verified reward status, expiration and activity belong in one Uptaco dashboard.</Paragraph></Article>
      </Page>
    </Section>
    <Section className="rewards-status">
      <Page><Text className="page-kicker">THE DETAILS MATTER</Text><Heading level={2}>Your points,{'\n'}properly.</Heading></Page>
      <Page><Paragraph>Uptaco Rewards enrollment and balances aren’t active in this preview. When the program is connected, Square’s verified ledger will be authoritative—never a made-up account balance.</Paragraph><Link href="/account/rewards" className="text-action">See your account design <Text aria-hidden={true}>→</Text></Link></Page>
    </Section>
  </Main>;
}
