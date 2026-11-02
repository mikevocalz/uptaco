import { Main, Section, Heading, Paragraph, Text } from '@acme/ui/html';
import { Link } from 'solito/link';
export const metadata={title:'Uptaco Order Receipt'};
export default function OrderReceiptPage(){
  return <Main id="main-content"><Section className="interior-hero interior-hero--account">
    <Text className="page-kicker">ORDER RECEIPT / PROTECTED</Text>
    <Heading level={1}>YOUR ORDER.{'\n'}YOUR BUSINESS.</Heading>
    <Paragraph>Order receipts require a verified customer session or a signed, time-limited receipt link. We don't display customer information without authorization.</Paragraph>
    <Link href="/account/orders" className="cta cta--black">Your orders <Text aria-hidden="true">→</Text></Link>
  </Section></Main>;
}
