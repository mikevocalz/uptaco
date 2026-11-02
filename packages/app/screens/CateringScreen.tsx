import { Main, Section, Page, Heading, Paragraph, Text, Link, Article } from '@acme/ui/html';
export function CateringScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--catering">
      <Text className="page-kicker">BIG MORNING ENERGY</Text>
      <Heading level={1}>FEED<br/>THE WHOLE<br/>ROOM.</Heading>
      <Paragraph>Breakfast meetings, gatherings and everything in between. Uptaco catering brings the morning to you.</Paragraph>
      <Link className="cta cta--orange" href="https://uptaco.gethoneycart.com/" target="_blank" rel="noopener noreferrer">Browse catering & order <Text aria-hidden="true">↗</Text></Link>
    </Section>
    <Section className="chapter">
      <Page className="chapter-heading"><Heading level={2}>More than a tray<br/>of tacos.</Heading><Paragraph>Mix, match and feed your crowd.</Paragraph></Page>
      <Page className="service-grid">
        <Article><Text>01 / START THE DAY</Text><Heading level={3}>Breakfast tacos</Heading><Paragraph>Classic potato–egg–cheese, BEC or plant-based chorizo.</Paragraph></Article>
        <Article><Text>02 / SOMETHING EXTRA</Text><Heading level={3}>Fresh cups & pastries</Heading><Paragraph>Overnight oats, parfaits, fruit cups, bagels and pastry packs.</Paragraph></Article>
        <Article><Text>03 / KEEP IT FLOWING</Text><Heading level={3}>Coffee & matcha</Heading><Paragraph>Cold brew, hot coffee and brewed matcha boxes.</Paragraph></Article>
      </Page>
    </Section>
    <Section className="leadtime-block">
      <Page><Text className="page-kicker">A LITTLE HEADS-UP</Text><Heading level={2}>Good things<br/>take planning.</Heading></Page>
      <Page><Paragraph>Some catering selections require advance notice. Current examples include 36 hours for cold-brewed matcha boxes, 48 hours for pastry packs, and 72 hours for Brazilian cheese bread. The catering provider confirms live lead times and delivery availability.</Paragraph><Link href="https://uptaco.gethoneycart.com/" className="text-action">Plan with Uptaco <Text aria-hidden="true">↗</Text></Link></Page>
    </Section>
  </Main>;
}
