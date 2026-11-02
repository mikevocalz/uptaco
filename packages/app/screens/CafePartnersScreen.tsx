import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text, Article } from '@acme/ui/html';
export function CafePartnersScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--cafe">
      <Text className="page-kicker">HEY, CAFÉ OWNERS</Text>
      <Heading level={1}>YOUR{'\n'}EXTENDED{'\n'}KITCHEN.</Heading>
      <Paragraph>Chef-quality food, ready for your counter. Partner with Uptaco directly through this website.</Paragraph>
      <Link className="cta cta--orange" href="/cafe-partners/apply">Explore a partnership <Text aria-hidden="true">→</Text></Link>
    </Section>
    <Section className="chapter">
      <Page className="chapter-heading"><Heading level={2}>Built for cafés{'\n'}that care.</Heading>
        <Paragraph>Thoughtful food without running a full restaurant kitchen.</Paragraph></Page>
      <Page className="service-grid">
        <Article><Text>01 / MENU</Text><Heading level={3}>Beyond tacos</Heading><Paragraph>Breakfast wraps, bowls, cups and sandwiches for busy café counters.</Paragraph></Article>
        <Article><Text>02 / OPERATIONS</Text><Heading level={3}>Built to stock</Heading><Paragraph>Wholesale food and delivery schedules adapted to approved partners.</Paragraph></Article>
        <Article><Text>03 / PARTNERSHIP</Text><Heading level={3}>Made for your counter</Heading><Paragraph>Appropriate holding, reheating and service instructions for every product.</Paragraph></Article>
      </Page>
    </Section>
    <Section className="partner-chapter"><Page><Text className="chapter-index">LET'S TALK FOOD</Text><Heading level={2}>We'd love to meet.</Heading></Page>
      <Page><Paragraph>Partner enrollment, catalog and invoices will remain inside Uptaco, with separate wholesale account permissions.</Paragraph>
        <Link className="text-action" href="/cafe-partners/apply">Learn about applying <Text aria-hidden="true">→</Text></Link></Page>
    </Section>
  </Main>;
}
