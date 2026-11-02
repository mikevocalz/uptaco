import Link from 'solito/link';
import { Main, Section, Heading, Paragraph, Text, Page } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';
export function OrderEntryScreen(){
  return <Main id="main-content" className="interior-page order-entry">
    <Section className="interior-hero interior-hero--order">
      <Text className="page-kicker">YOUR BREAKFAST, YOUR CALL</Text>
      <Heading level={1}>LET'S GET{'\n'}YOU FED.</Heading>
      <Paragraph>Pick your Uptaco location, then decide whether you're stopping by or getting delivery.</Paragraph>
    </Section>
    <Section className="order-entry-content">
      <OrderChooser/>
      <Page className="order-entry-note">
        <Heading level={2}>A quick heads-up.</Heading>
        <Paragraph>Prices, item options, hours, preparation times and payment are confirmed by Uptaco's current ordering provider. You don't need an Uptaco website account to start an order.</Paragraph>
        <Link href="/menu" className="text-action">Explore the menu <Text aria-hidden="true">↗</Text></Link>
      </Page>
    </Section>
  </Main>;
}
