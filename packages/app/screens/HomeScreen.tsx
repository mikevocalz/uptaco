import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text, Figure, Figcaption, Article } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { KinetrellSurface } from '@acme/ui/motion';
import { OrderChooser } from '../components/OrderChooser';
import { MenuHighlightCard } from '../components/MenuHighlightCard';
import { UPTACO_MEDIA } from '../data/brand';
import { MENU_HIGHLIGHTS } from '../data/menu';
import { heroEntry } from '../data/motion';

export function HomeScreen(){
  return <Main id="main-content">
    <Section className="hero" aria-label="Uptaco breakfast tacos">
      <Page className="hero-top">
        <Text className="hero-tag">BREAKFAST TACOS · NEW YORK CITY</Text>
        <Text className="hero-serial">EST. 2021 / MADE TO GET UP FOR</Text>
      </Page>
      <KinetrellSurface definition={heroEntry} className="hero-display">
        <Heading level={1} className="hero-title">Up for{'\n'}breakfast?</Heading>
      </KinetrellSurface>
      <Figure className="hero-photo">
        <BrandImage src={UPTACO_MEDIA.heroBec} alt="Uptaco breakfast taco photographed for the restaurant"
          width={900} height={1180} sizes="(max-width: 760px) 88vw, 46vw" priority className="hero-photo-image"/>
        <Figcaption className="photo-stamp">HAND-PRESSED EVERY MORNING</Figcaption>
      </Figure>
      <Page className="hero-lower">
        <Paragraph>Hand-pressed breakfast tacos, made for the city that never sleeps in.</Paragraph>
        <Link href="/menu" className="hero-browse">Meet the menu <Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Page className="hero-pattern" aria-hidden={true}/>
      <Page className="hero-soft-sticker" aria-hidden={true}><Text>Made fresh.</Text><Text>Made Uptaco.</Text></Page>
    </Section>

    <Page className="dock-bridge"><OrderChooser id="order"/></Page>
    <Page className="mobile-order-entry">
      <Page className="mobile-order-entry__copy">
        <Text className="mobile-order-entry__eyebrow">BREAKFAST, YOUR WAY</Text>
        <Paragraph>Harlem or Midtown. Pickup or delivery.</Paragraph>
      </Page>
      <Link href="/order" className="mobile-order-entry__action" aria-label="Choose an Uptaco location and start your order">
        Start order <Text aria-hidden={true}>→</Text>
      </Link>
    </Page>

    <Section className="chapter menu-chapter" aria-label="Explore the menu">
      <Page className="chapter-heading">
        <Page>
          <Text className="chapter-index">WHAT'S GOOD IN THE MORNING</Text>
          <Heading level={2}>Your morning{'\n'}looks good.</Heading>
        </Page>
        <Link href="/menu" className="text-action">Explore the menu <Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Page className="menu-grid">
        {MENU_HIGHLIGHTS.slice(0,3).map((item,index)=><MenuHighlightCard key={item.slug} item={item} index={index}/>)}
      </Page>
      <Paragraph className="chapter-note">A taste of the lineup. Products, prices and current availability are confirmed when you order.</Paragraph>
    </Section>

    <Section className="story-band">
      <Text className="story-band-label">IT STARTS WITH THE TORTILLA</Text>
      <Heading level={2}>A little{'\n'}different.{'\n'}A lot better.</Heading>
      <Page className="story-band-detail">
        <Paragraph>Fresh food for the city that gets moving early. Tacos, burritos, coffee and a whole lot of good mornings.</Paragraph>
        <Link href="/story" className="text-action text-action--light">Meet Uptaco <Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Text className="story-band-outline" aria-hidden={true}>UPTACO</Text>
    </Section>

    <Section className="chapter locations-chapter">
      <Page className="chapter-heading">
        <Page><Text className="chapter-index">TWO PLACES TO GET UP</Text><Heading level={2}>Your corner.{'\n'}Your morning.</Heading></Page>
        <Link href="/locations" className="text-action">Both locations <Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Page className="locations-grid">
        <Article className="location-teaser location-teaser--harlem">
          <Figure className="location-photo"><BrandImage src={UPTACO_MEDIA.harlem} width={980} height={640} alt="Uptaco's Harlem restaurant" sizes="(max-width: 760px) 100vw, 50vw"/></Figure>
          <Page className="location-teaser-copy"><Text>135TH & ST. NICHOLAS</Text><Heading level={3}>HELLO, HARLEM.</Heading><Link href="/locations/harlem">Find us Uptown <Text aria-hidden={true}>↗</Text></Link></Page>
        </Article>
        <Article className="location-teaser location-teaser--midtown">
          <Figure className="location-photo"><BrandImage src={UPTACO_MEDIA.midtown} width={980} height={640} alt="Uptaco's Midtown location near Madison Avenue" sizes="(max-width: 760px) 100vw, 50vw"/></Figure>
          <Page className="location-teaser-copy"><Text>55TH & MADISON</Text><Heading level={3}>HEY, MIDTOWN.</Heading><Link href="/locations/midtown">Find us in the plaza <Text aria-hidden={true}>↗</Text></Link></Page>
        </Article>
      </Page>
    </Section>

    <Section className="catering-chapter">
      <Page className="catering-stage">
        <Text className="chapter-index">THE WHOLE TEAM GETS FED</Text>
        <Heading level={2}>Good mornings{'\n'}are better{'\n'}together.</Heading>
        <Paragraph>Team breakfast, big meetings, celebrations. There's a tray for that.</Paragraph>
        <Link href="/catering" className="cta cta--orange">Explore catering <Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Page className="catering-stamp" aria-hidden={true}><Text>GOOD</Text><Text>FOR</Text><Text>A GROUP.</Text></Page>
    </Section>

    <Section className="partner-chapter">
      <Page><Text className="chapter-index">A LITTLE UPTACO EVERYWHERE</Text><Heading level={2}>Good food.{'\n'}For good cafés.</Heading></Page>
      <Page><Paragraph>We help neighborhood cafés offer thoughtful, ready-to-serve food without adding a kitchen.</Paragraph>
        <Link href="/cafe-partners" className="text-action">Become a café partner <Text aria-hidden={true}>↗</Text></Link></Page>
    </Section>
  </Main>;
}
