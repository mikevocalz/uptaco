'use client';
import Link from 'solito/link';
import { Header, Nav, Page, Text } from '@acme/ui/html';
import { OrderLink } from './SiteOrdering';

export function SiteHeader() {
  return <Header className="site-header">
    <Page className="topline"><Text>HAND-PRESSED. CITY-READY.</Text><Text className="topline__right">HARLEM & MIDTOWN · NYC</Text></Page>
    <Page className="header-inner">
      <Link href="/" className="wordmark" aria-label="Uptaco home">UPTACO<span className="wordmark-dot">.</span></Link>
      <Nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/menu">The menu</Link>
        <Link href="/locations">Find Uptaco</Link>
        <Link href="/catering">Catering</Link>
        <Link href="/cafe-partners">Café partners</Link>
        <Link href="/story">Our story</Link>
      </Nav>
      <OrderLink compact/>
    </Page>
    <Nav className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/menu">Menu</Link>
      <Link href="/locations">Locations</Link>
      <Link href="/catering">Catering</Link>
      <Link href="/cafe-partners">Cafés</Link>
      <Link href="/story">Story</Link>
    </Nav>
  </Header>;
}
