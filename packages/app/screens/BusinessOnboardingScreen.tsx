import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text } from '@acme/ui/html';
export function BusinessOnboardingScreen({kind}:{kind:'catering'|'partner'}){
  const catering=kind==='catering';
  return <Main id="main-content" className="interior-page">
    <Section className={catering?'interior-hero interior-hero--catering':'interior-hero interior-hero--cafe'}>
      <Text className="page-kicker">{catering?'UPTACO CATERING':'UPTACO FOR CAFÉS'}</Text>
      <Heading level={1}>{catering?'MAKE A\nMORNING.':'STOCK\nTHE GOOD.'}</Heading>
      <Paragraph>{catering?'Plan menus, headcount, pickup/delivery and the right lead times here.':'Manage your wholesale relationship, locations and recurring orders through Uptaco.'}</Paragraph>
    </Section>
    <Section className="business-onboarding">
      <Page>
        <Text className="page-kicker">FIRST-PARTY EXPERIENCE</Text>
        <Heading level={2}>All under one roof.</Heading>
        <Paragraph>{catering
          ? 'Catering intake and payment will be activated after Uptaco confirms its item lead times and fulfillment capacity.'
          : 'Partner applications require restaurant approval. The protected application and wholesale account experience is being connected.'}</Paragraph>
        <Paragraph>No request is submitted or information collected on this preview page.</Paragraph>
        <Link className="cta cta--black" href={catering?'/catering':'/cafe-partners'}>Back to {catering?'catering':'café partners'} <Text aria-hidden="true">→</Text></Link>
      </Page>
    </Section>
  </Main>;
}
