import { Link } from 'solito/link';
import { Article, Page, Heading, Paragraph, Text } from '@acme/ui/html';
import { AddToBagButton } from './AddToBagButton';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_MEDIA } from '../data/brand';
import type { MenuHighlight } from '../data/menu';
export function MenuHighlightCard({item,index}:{item:MenuHighlight;index:number}) {
  return <Article className={`menu-card menu-card--${index%3}`}>
    <Page className="menu-card-top"><Text>{item.kicker}</Text><Text>0{index+1}</Text></Page>
    {item.slug==='bec-breakfast-taco' && <Page className="menu-card-food-photo"><BrandImage src={UPTACO_MEDIA.heroBec}
      alt="Uptaco BEC breakfast taco" width={460} height={460} sizes="(max-width: 700px) 42vw, 300px"/></Page>}
    <Heading level={3}>{item.name}</Heading>
    <Paragraph>{item.description}</Paragraph>
    <Page className="menu-card-actions">
      <Link className="menu-card-link" href={`/menu/${item.slug}`}>Explore this item <Text aria-hidden={true}>↗</Text></Link>
      <AddToBagButton productId={item.slug} name={item.name} category={item.category}/>
    </Page>
  </Article>;
}
