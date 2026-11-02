import Link from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text, Article } from '@acme/ui/html';
export function CateringScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--catering">
      <Text className="page-kicker">BIG MORNING ENERGY</Text>
      <Heading level={1}>FEED{'\n'}THE WHOLE{'\n'}ROOM.</Heading>
      <Paragraph>Breakfast meetings, gatherings and everything in between—planned and ordered entirely through Uptaco.</Paragraph>
      <Link className="cta cta--orange" href="/catering/quote">Plan your Uptaco catering <Text aria-hidden="true">→</Text></Link>
    </Section>
    <Section className="chapter">
      <Page className="chapter-heading"><Heading level={2}>More than a tray{'\n'}of tacos.</Heading>
        <Paragraph>Great group mornings start here.</Paragraph></Page>
      <Page className="service-grid">
        <Article><Text>01 / START THE DAY</Text><Heading level={3}>Breakfast tacos</Heading><Paragraph>Classic potato–egg–cheese, BEC or plant-based chorizo.</Paragraph></Article>
        <Article><Text>02 / SOMETHING EXTRA</Text><Heading level={3}>Fresh cups & pastries</Heading><Paragraph>Pastries, parfaits and other catering favorites.</Paragraph></Article>
        <Article><Text>03 / KEEP IT FLOWING</Text><Heading level={3}>Coffee & matcha</Heading><Paragraph>Coffee and matcha for the whole team.</Paragraph></Article>
      </Page>
    </Section>
    <Section className="leadtime-block"><Page><Text className="page-kicker">A LITTLE HEADS-UP</Text>
      <Heading level={2}>Good things{'\n'}take planning.</Heading></Page>
      <Page><Paragraph>Some catering packages need advance notice. Uptaco will confirm each item’s required lead time, availability and final quote before accepting your request.</Paragraph>
        <Link href="/catering/quote" className="text-action">Start a catering plan <Text aria-hidden="true">→</Text></Link>
      </Page>
    </Section>
  </Main>;
}
