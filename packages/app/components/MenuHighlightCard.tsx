import Link from 'solito/link';
import { Article, Page, Heading, Paragraph, Text } from '@acme/ui/html';
import type { MenuHighlight } from '../data/menu';
export function MenuHighlightCard({item,index}:{item:MenuHighlight;index:number}) {
  return <Article className={`menu-card menu-card--${index%3}`}>
    <Page className="menu-card-top"><Text>{item.kicker}</Text><Text>0{index+1}</Text></Page>
    <Heading level={3}>{item.name}</Heading>
    <Paragraph>{item.description}</Paragraph>
    <Link className="menu-card-link" href={`/menu/${item.slug}`}>Explore this item <span aria-hidden="true">↗</Text></Link>
  </Article>;
}
