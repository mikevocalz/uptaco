import Link from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text } from '@acme/ui/html';
import { MENU_HIGHLIGHTS } from '../data/menu';
import { OrderChooser } from '../components/OrderChooser';
export function MenuItemScreen({slug}:{slug:string}){
  const item=MENU_HIGHLIGHTS.find(candidate=>candidate.slug===slug);
  if(!item)return null;
  return <Main id="main-content" className="interior-page product-detail-page">
    <Section className="interior-hero interior-hero--product">
      <Text className="page-kicker">UPTACO / {item.category.toUpperCase()}</Text>
      <Heading level={1}>{item.name.toUpperCase()}</Heading>
      <Paragraph>{item.description}</Paragraph>
      <Page className="product-detail-breadcrumb">
        <Link href="/menu" className="text-action">All menu items <Text aria-hidden="true">→</Text></Link>
      </Page>
    </Section>
    <Section className="product-detail-content">
      <Page className="product-detail-intro">
        <Text className="page-kicker">YOUR ORDER, YOUR WAY</Text>
        <Heading level={2}>Make it your morning.</Heading>
        <Paragraph>Customization and current pricing will appear right here from Uptaco's connected menu and fulfillment services. We're not accepting online payments until those are verified.</Paragraph>
        <Paragraph>Ingredients and allergens can change. Please confirm dietary needs and potential cross-contact with the restaurant before ordering.</Paragraph>
      </Page>
      <OrderChooser/>
    </Section>
  </Main>;
}
