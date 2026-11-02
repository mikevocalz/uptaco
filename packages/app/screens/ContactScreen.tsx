import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text } from '@acme/ui/html';
export function ContactScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--more">
      <Text className="page-kicker">TALK TO UPTACO</Text>
      <Heading level={1}>SAY{'\n'}HELLO.</Heading>
      <Paragraph>Food, catering, wholesale or an order question? We'll keep the help experience here.</Paragraph>
    </Section>
    <Section className="business-onboarding"><Page>
      <Heading level={2}>We're listening.</Heading>
      <Paragraph>Contact intake is being connected to the secure Uptaco backend. This preview does not collect messages or send email. For immediate assistance with a prior order, use the contact details in your existing receipt.</Paragraph>
      <Link className="text-action" href="/more">Explore Uptaco <Text aria-hidden={true}>→</Text></Link>
    </Page></Section>
  </Main>;
}
