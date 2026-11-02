import { Link } from 'solito/link';
import { Main, Section, Heading, Paragraph, Text, Page } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';
export function OrderEntryScreen(){
  return <Main id="main-content" className="interior-page order-entry">
    <Section className="interior-hero interior-hero--order">
      <Text className="page-kicker">YOUR BREAKFAST, YOUR CALL</Text>
      <Heading level={1}>Let's get{'\n'}you fed.</Heading>
      <Paragraph>Choose Uptaco Harlem or Midtown, pickup or delivery, and continue to the menu without leaving the site.</Paragraph>
    </Section>
    <Section className="order-entry-content">
      <OrderChooser/>
      <Page className="order-entry-note">
        <Heading level={2}>Always Uptaco.</Heading>
        <Paragraph>The menu, bag, checkout, confirmations and order tracking will all run here. Live ordering is disabled until the merchant integration is configured and verified; this site never redirects customers to another checkout.</Paragraph>
        <Link href="/menu" className="text-action">Explore the menu <Text aria-hidden={true}>→</Text></Link>
      </Page>
    </Section>
  </Main>;
}
