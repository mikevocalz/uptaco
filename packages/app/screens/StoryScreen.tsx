import { Link } from 'solito/link';
import { Main, Section, Page, Heading, Paragraph, Text } from '@acme/ui/html';
export function StoryScreen(){
 return <Main id="main-content" className="interior-page">
  <Section className="interior-hero interior-hero--story"><Text className="page-kicker">THE WHOLE REASON WE'RE UP</Text><Heading level={1}>A GOOD{'\n'}START HAS{'\n'}A STORY.</Heading>
   <Paragraph>Two friends, a love for good food, and a better way to start a New York morning.</Paragraph>
  </Section>
  <Section className="story-editorial"><Page><Text className="page-kicker">DEREK + DAN / NYC / 2021</Text>
   <Heading level={2}>Started with{'\n'}breakfast.{'\n'}Made for everyone.</Heading></Page>
   <Page><Paragraph>Derek and Dan started Uptaco in 2021 with a simple goal: make restaurant-quality casual food available in the spaces New Yorkers visit every day.</Paragraph>
   <Paragraph>With chef experience in New York kitchens, Uptaco grew from breakfast tacos into cafés, office catering and neighborhood counters. Great food should fit the way the city actually moves.</Paragraph>
   <Link href="/menu" className="cta cta--black">Explore the food <Text aria-hidden={true}>↗</Text></Link></Page>
  </Section>
 </Main>;
}
