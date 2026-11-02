import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text } from '@acme/ui/html';
import { MENU_HIGHLIGHTS } from '../data/menu';
import { AddToBagButton } from '../components/AddToBagButton';
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
        <Link href="/menu" className="text-action">All menu items <Text aria-hidden={true}>→</Text></Link>
      </Page>
    </Section>
    <Section className="product-detail-content">
      <Page className="product-detail-intro">
        <Text className="page-kicker">MAKE THIS YOUR MORNING</Text>
        <Heading level={2}>Going in the bag?</Heading>
        <Paragraph>Build a preview bag here, then review quantities and remove or restore items inside Uptaco.</Paragraph>
        <AddToBagButton variant="detail" productId={item.slug} name={item.name} category={item.category}/>
        <Paragraph>Live pricing and required customization options will appear only after Uptaco's approved catalog is connected. No payment can be made in this preview.</Paragraph>
        <Paragraph>Ingredients and allergens can change. Please confirm dietary needs and cross-contact with the restaurant.</Paragraph>
      </Page>
      <OrderChooser/>
    </Section>
  </Main>;
}
