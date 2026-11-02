import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text, Figure } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_LOCATIONS, UPTACO_MEDIA } from '../data/brand';
export function LocationDetailScreen({location}:{location:'harlem'|'midtown'}){
  const data=UPTACO_LOCATIONS[location];
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--location-detail">
      <Text className="page-kicker">UPTACO / {location.toUpperCase()}</Text>
      <Heading level={1}>{location==='harlem'?'UPTOWN,':'MIDTOWN,'}{'\n'}WE'RE UP.</Heading>
      <Paragraph>{data.address}{'\n'}{data.crossStreet}</Paragraph>
    </Section>
    <Section className="location-detail-grid">
      <Figure className="location-detail-photo"><BrandImage src={UPTACO_MEDIA[location]} alt={`Uptaco ${data.label} restaurant exterior`} width={1100} height={1100}/></Figure>
      <Page className="location-detail-actions">
        <Heading level={2}>Come through.</Heading>
        <Paragraph>Enjoy Uptaco at {data.fullAddress}. Choose this location and discover the menu without leaving the Uptaco website. Opening hours and checkout availability must be verified before publishing.</Paragraph>
        <Link className="cta cta--orange" href={`/order?location=${location}`}>Explore {data.label} ordering <Text aria-hidden={true}>→</Text></Link>
        <Link href="/menu" className="text-action">Browse menu highlights <Text aria-hidden={true}>→</Text></Link>
      </Page>
    </Section>
  </Main>;
}
