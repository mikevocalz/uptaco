'use client';
import Link from 'solito/link';
import { Header, Nav, Page, Text } from '@acme/ui/html';
import { ShellIcon } from '@acme/ui/icons';
import { useUptacoSite } from '../store/site.store';
import { OrderLink } from './SiteOrdering';
import { BagPill } from './BagPill';
export function SiteHeader(){
  const location=useUptacoSite(state=>state.location);
  const name=location==='harlem'?'Harlem':'Midtown';
  return <Header className="site-header">
    <Page className="topline">
      <Text>HAND-PRESSED. CITY-READY.</Text>
      <Text className="topline__right">HARLEM & MIDTOWN · NYC</Text>
    </Page>
    <Page className="header-inner">
      <Link href="/" className="wordmark" aria-label="Uptaco home">UPTACO<Text className="wordmark-dot">.</Text></Link>
      <Nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/menu">The menu</Link>
        <Link href="/locations">Find Uptaco</Link>
        <Link href="/catering">Catering</Link>
        <Link href="/cafe-partners">Café partners</Link>
        <Link href="/story">Our story</Link>
      </Nav>
      <Link href="/more" className="header-explore">Explore</Link>
      <Link href="/locations" className="header-location" aria-label={`Change Uptaco location, currently ${name}`}>
        <ShellIcon name="map-pin" size={16}/><Text>{name}</Text>
      </Link>
      <BagPill variant="header"/>
      <OrderLink compact/>
    </Page>
  </Header>;
}
