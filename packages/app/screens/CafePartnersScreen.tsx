import { Main, Section, Page, Heading, Paragraph, Text, Link, Article } from '@acme/ui/html';
export function CafePartnersScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--cafe">
      <Text className="page-kicker">HEY, CAFÉ OWNERS</Text>
      <Heading level={1}>YOUR<br/>EXTENDED<br/>KITCHEN.</Heading>
      <Paragraph>Chef-quality food, ready for your counter. Uptaco helps cafés serve excellent bites without building a full kitchen.</Paragraph>
      <Link className="cta cta--orange" href="https://portal.odeko.com/supply/locations/%2A/catalog/search?q=uptaco" target="_blank" rel="noopener noreferrer">Find Uptaco on Odeko <Text aria-hidden="true">↗</Text></Link>
    </Section>
    <Section className="chapter">
      <Page className="chapter-heading"><Heading level={2}>Built for cafés<br/>that care.</Heading><Paragraph>Good food becomes the easiest part of your day.</Paragraph></Page>
      <Page className="service-grid">
        <Article><Text>01 / MENU</Text><Heading level={3}>Beyond tacos</Heading><Paragraph>Breakfast wraps, bowls, cups and sandwiches alongside Uptaco favorites.</Paragraph></Article>
        <Article><Text>02 / LOGISTICS</Text><Heading level={3}>Built to stock</Heading><Paragraph>Refrigerated deliveries through Odeko three times weekly, according to Uptaco's current café information.</Paragraph></Article>
        <Article><Text>03 / PARTNERSHIP</Text><Heading level={3}>Made for your counter</Heading><Paragraph>Ready-to-go chilled items and reheatable dishes, with instructions for proper holding and service.</Paragraph></Article>
      </Page>
    </Section>
    <Section className="partner-chapter"><Page><Text className="chapter-index">LET'S TALK FOOD</Text><Heading level={2}>Don't use Odeko?</Heading></Page>
      <Page><Paragraph>Uptaco can discuss other wholesale options directly.</Paragraph><Link className="text-action" href="mailto:orders@uptaco.nyc">Contact the team <Text aria-hidden="true">↗</Text></Link></Page>
    </Section>
  </Main>;
}
