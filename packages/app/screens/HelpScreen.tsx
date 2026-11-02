import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text } from '@acme/ui/html';

const questions=[
  {question:'Where do I find Uptaco?',answer:'Uptaco has counters in Harlem at 300 West 135th Street and Midtown at 550 Madison Avenue. Store hours should be confirmed with the restaurant before visiting.',href:'/locations',action:'View both locations'},
  {question:'Can I order without creating an account?',answer:'Guest ordering is a core part of the Uptaco experience. Live checkout requires the merchant account and secure payment integration to be connected first.',href:'/order',action:'Start on Uptaco'},
  {question:'What about allergies and ingredients?',answer:'Ingredients and preparation environments can change. Tell the restaurant about allergies before ordering; no menu icon can guarantee against cross-contact.',href:'/contact',action:'Ask Uptaco'},
  {question:'Can Uptaco cater for an office?',answer:'Yes, Uptaco offers catering. Lead times vary by product, and a request is not a confirmed event order until Uptaco accepts it.',href:'/catering',action:'Explore catering'},
  {question:'Can I track a pickup or delivery?',answer:'The Uptaco order experience includes receipt and tracking screens. Live provider-driven updates will appear after an actual order is confirmed.',href:'/account/orders',action:'See account design'},
  {question:'Do you offer gift cards and rewards?',answer:'The first-party rewards and gift-card pages are designed. Programs and sales will become available only after Uptaco enables the necessary provider integrations.',href:'/rewards',action:'Explore rewards'},
] as const;

export function HelpScreen(){
  return <Main id="main-content" className="help-screen">
    <Section className="interior-hero interior-hero--more">
      <Text className="page-kicker">WE’RE HERE FOR YOU</Text>
      <Heading level={1}>A LITTLE{'\n'}HELP?</Heading>
      <Paragraph>From picking your breakfast to planning a big gathering, we’ll point you in the right direction—right here on Uptaco.</Paragraph>
    </Section>
    <Section className="help-content">
      <Page className="help-intro">
        <Text className="page-kicker">GOT A QUESTION?</Text>
        <Heading level={2}>WE'VE GOT{'\n'}ANSWERS.</Heading>
        <Paragraph>Every Uptaco order and question deserves a clear answer. Specific refund or cancellation policies will appear after they are approved by the restaurant.</Paragraph>
      </Page>
      <Page className="help-questions">
        {questions.map((item,i)=><Article key={item.question} className="help-question">
          <Page className="help-question-number"><Text>{String(i+1).padStart(2,'0')}</Text></Page>
          <Page className="help-question-body"><Heading level={3}>{item.question}</Heading><Paragraph>{item.answer}</Paragraph>
            <Link href={item.href} className="text-action">{item.action} <Text aria-hidden={true}>→</Text></Link>
          </Page>
        </Article>)}
      </Page>
    </Section>
    <Section className="help-last">
      <Text className="page-kicker">SOMETHING ELSE?</Text>
      <Heading level={2}>SAY HELLO.</Heading>
      <Paragraph>If you need to reach Uptaco, we're creating a direct, first-party contact flow.</Paragraph>
      <Link href="/contact" className="cta cta--orange">Contact Uptaco <Text aria-hidden={true}>→</Text></Link>
    </Section>
  </Main>;
}
