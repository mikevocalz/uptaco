import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text, Figure } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_LOCATIONS, UPTACO_MEDIA } from '../data/brand';
export function LocationsScreen(){
  return <Main id="main-content" className="interior-page">
    <Section className="interior-hero interior-hero--locations">
      <Text className="page-kicker">NYC, WE'RE HERE</Text>
      <Heading level={1}>BREAKFAST{'\n'}HAS AN ADDRESS.</Heading>
      <Paragraph>Find us in Harlem and Midtown. Check live store details before heading out.</Paragraph>
    </Section>
    <Section className="location-list">
      {(['harlem','midtown'] as const).map((id,index)=>{
        const l=UPTACO_LOCATIONS[id];
        return <Page className="location-row" key={id}>
          <Figure className="location-row-photo"><BrandImage src={UPTACO_MEDIA[id]} alt={`Exterior of Uptaco ${l.label}`} width={1000} height={800}/></Figure>
          <Page className="location-row-info">
            <Text className="page-kicker">0{index+1} / NEW YORK CITY</Text>
            <Heading level={2}>{l.label.toUpperCase()}</Heading>
            <Paragraph>{l.address}{'\n'}{l.crossStreet}</Paragraph>
            <Link href={`/locations/${id}`} className="cta cta--black">Explore location <Text aria-hidden={true}>↗</Text></Link>
          </Page>
        </Page>;
      })}
    </Section>
  </Main>;
}
