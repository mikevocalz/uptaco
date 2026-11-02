import { Main, Page, Section, Heading, Paragraph, Text } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';
import { MenuCatalog } from '../components/MenuCatalog';

export function MenuScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--menu">
      <Text className="page-kicker">THE UPTACO LINEUP</Text>
      <Heading level={1}>GOOD MORNING,{'\n'}GOOD MENU.</Heading>
      <Paragraph>Hand-pressed breakfast tacos, bigger burritos, fresh coffee, matcha and more.</Paragraph>
    </Section>
    <Section className="menu-workspace" aria-label="Browse Uptaco menu">
      <Page className="workspace-heading"><Heading level={2}>Find your usual.{'\n'}Or something new.</Heading>
        <Paragraph>These are menu highlights—not a live catalog. Confirm availability, options and prices with Square before purchasing.</Paragraph></Page>
      <MenuCatalog/>
    </Section>
    <Section className="interior-order"><OrderChooser/></Section>
  </Main>;
}
