'use client';
import { Page, Button, Article, Heading, Paragraph, Text, Link } from '@acme/ui/html';
import SolitoLink from 'solito/link';
import { MENU_HIGHLIGHTS } from '../data/menu';
import { useUptacoSite, type MenuCategory } from '../store/site.store';
import { selectCheckout } from '@uptaco/experience/capabilities';
const CATEGORIES = [
  {key:'all',label:'Everything'},
  {key:'tacos',label:'Tacos'},
  {key:'burritos',label:'Burritos'},
  {key:'drinks',label:'Drinks'},
  {key:'lunch',label:'Lunch'}
] as const;
export function MenuCatalog(){
  const category = useUptacoSite(s=>s.category);
  const change = useUptacoSite(s=>s.setCategory);
  const location=useUptacoSite(s=>s.location);
  const route=selectCheckout(location,'pickup',null);
  const visible=MENU_HIGHLIGHTS.filter(p=>category==='all'||p.category===category);
  return <Page className="menu-workspace-grid">
    <Page className="menu-category-pane">
      <Text className="menu-pane-label">BROWSE THE COUNTER</Text>
      <Page className="menu-category-list" role="radiogroup" aria-label="Filter menu by category">
        {CATEGORIES.map(option=><Button key={option.key}
          role="radio" aria-checked={category===option.key}
          className={category===option.key?'menu-category active':'menu-category'}
          onPress={()=>change(option.key as MenuCategory)}>
          {option.label} <Text aria-hidden="true">↗</Text>
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
            <SolitoLink className="menu-card-link" href={`/menu/${item.slug}`}>View product details <Text aria-hidden="true">↗</Text></SolitoLink>
          </Page>
          <Text className="menu-list-symbol" aria-hidden="true">✳</Text>
        </Article>)}
      </Page>
    </Page>
    <Page className="menu-inspector">
      <Text className="menu-pane-label">READY WHEN YOU ARE</Text>
      <Heading level={3}>Your order.{'\n'}Your way.</Heading>
      <Paragraph>Choose your location to see actual prices, modifiers, preparation windows, and current availability.</Paragraph>
      <Link className="cta cta--black" href={route.href} target="_blank" rel="noopener noreferrer">
        Order in {location==='harlem'?'Harlem':'Midtown'} <Text aria-hidden="true">↗</Text>
      </Link>
    </Page>
  </Page>;
}
