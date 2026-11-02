import Link from 'solito/link';
import { Footer, Page, Heading, Paragraph, Nav, Text, Address } from '@acme/ui/html';
export function SiteFooter(){
  return <Footer className="site-footer">
    <Page className="footer-grid">
      <Page className="footer-intro">
        <Heading level={2} className="footer-title">SEE YOU<br/>UP THERE.</Heading>
        <Paragraph>Breakfast tacos and good mornings in New York City.</Paragraph>
      </Page>
      <Nav aria-label="Explore Uptaco" className="footer-links">
        <Text className="footer-label">EXPLORE</Text>
        <Link href="/menu">Menu</Link><Link href="/locations">Locations</Link><Link href="/catering">Catering</Link>
        <Link href="/cafe-partners">Café partners</Link><Link href="/story">Our story</Link>
      </Nav>
      <Page className="footer-contact">
        <Text className="footer-label">COME FIND US</Text>
        <Address>300 W 135th St · Harlem<br/>550 Madison Ave · Midtown</Address>
        <Paragraph>Live hours and availability are confirmed by the ordering provider.</Paragraph>
        <a href="mailto:orders@uptaco.nyc">orders@uptaco.nyc</a>
      </Page>
    </Page>
    <Page className="footer-bottom"><Text>© {new Date().getFullYear()} Uptaco</Text><Text>MADE FOR NYC MORNINGS</Text></Page>
  </Footer>;
}
