'use client';
import Link from 'solito/link';
import { Page, Button, Article, Heading, Paragraph, Text } from '@acme/ui/html';
import { MENU_HIGHLIGHTS } from '../data/menu';
import { useUptacoSite, type MenuCategory } from '../store/site.store';
const CATEGORIES=[
  {key:'all',label:'Everything'},{key:'tacos',label:'Tacos'},
  {key:'burritos',label:'Burritos'},{key:'drinks',label:'Drinks'},
  {key:'lunch',label:'Lunch'}
] as const;
export function MenuCatalog(){
  const category=useUptacoSite(s=>s.category);
  const change=useUptacoSite(s=>s.setCategory);
  const visible=MENU_HIGHLIGHTS.filter(p=>category==='all'||p.category===category);
  return <Page className="menu-workspace-grid">
    <Page className="menu-category-pane">
      <Text className="menu-pane-label">BROWSE THE COUNTER</Text>
      <Page className="menu-category-list" role="group" aria-label="Filter menu by category">
        {CATEGORIES.map(option=><Button key={option.key}
          aria-pressed={category===option.key}
          className={category===option.key?'menu-category active':'menu-category'}
          onPress={()=>change(option.key as MenuCategory)}>
          {option.label}<Text aria-hidden="true">↗</Text>
        </Button>)}
      </Page>
    </Page>
    <Page className="menu-detail-pane">
      <Page className="menu-collection">
        {visible.map((item,index)=><Article key={item.slug} className="menu-list-item">
          <Page className="menu-list-index"><Text>{String(index+1).padStart(2,'0')}</Text></Page>
          <Page className="menu-list-body">
            <Text className="menu-list-kicker">{item.kicker}</Text>
            <Heading level={3}>{item.name}</Heading>
            <Paragraph>{item.description}</Paragraph>
            <Link className="menu-card-link" href={`/menu/${item.slug}`}>Product details <Text aria-hidden="true">→</Text></Link>
          </Page>
        </Article>)}
      </Page>
    </Page>
    <Page className="menu-inspector">
      <Text className="menu-pane-label">THE UPTACO EXPERIENCE</Text>
      <Heading level={3}>Your order.{'\n'}Your way.</Heading>
      <Paragraph>Menus, customization, secure checkout, and order updates belong inside Uptaco. Live ordering is activated only after the restaurant's integration is connected.</Paragraph>
      <Link className="cta cta--black" href="/order">Choose pickup or delivery <Text aria-hidden="true">→</Text></Link>
    </Page>
  </Page>;
}
