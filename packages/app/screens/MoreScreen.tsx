import Link from 'solito/link';
import { Main, Page, Section, Heading, Paragraph, Nav, Text } from '@acme/ui/html';
import { OrderChooser } from '../components/OrderChooser';

const groups=[
  {name:'For your morning', links:[
    {label:'See the menu',href:'/menu',description:'Breakfast tacos, burritos, coffee and matcha'},
    {label:'Find Uptaco',href:'/locations',description:'Harlem and Midtown counters'},
    {label:'Order now',href:'/order',description:'Choose pickup or delivery'}]},
  {name:'For everyone',links:[
    {label:'Catering',href:'/catering',description:'Office breakfasts and group occasions'},
    {label:'Café partners',href:'/cafe-partners',description:'Bring Uptaco to your café'},
    {label:'Our story',href:'/story',description:'Why NYC wakes up with Uptaco'}]},
  {name:'Here to help',links:[
    {label:'Help with an order',href:'/help',description:'Provider support and ordering questions'}]}
] as const;

/** Guest "More" is a real destination, never a disguised non-functional login.
 * When Better Auth is ready the same fifth slot becomes "You" for customers.
 */
export function MoreScreen(){
  return <Main id="main-content" className="interior-page more-page">
    <Section className="interior-hero interior-hero--more">
      <Text className="page-kicker">THERE'S MORE TO UPTACO</Text>
      <Heading level={1}>MORE{'\n'}GOOD STUFF.</Heading>
      <Paragraph>Everything you need for a good morning, all in one place.</Paragraph>
    </Section>
    <Section className="more-directory" aria-label="Explore Uptaco">
      {groups.map((group)=><Page key={group.name} className="more-group">
        <Heading level={2}>{group.name}</Heading>
        <Nav aria-label={group.name} className="more-link-list">
          {group.links.map(item=><Link href={item.href} key={item.href} className="more-link">
            <Page><Text className="more-link-title">{item.label}</Text>
              <Text className="more-link-description">{item.description}</Text></Page>
            <Text aria-hidden="true" className="more-link-arrow">↗</Text>
          </Link>)}
        </Nav>
      </Page>)}
    </Section>
    <Section className="interior-order"><OrderChooser/></Section>
  </Main>;
}
