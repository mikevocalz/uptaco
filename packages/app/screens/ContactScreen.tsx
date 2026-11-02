'use client';
import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text, Input, Textarea, Button } from '@acme/ui/html';
import { useInquiry } from '../store/inquiry.store';
export function ContactScreen(){
  const draft=useInquiry(s=>s.drafts.contact);
  const set=useInquiry(s=>s.setField);
  return <Main id="main-content" className="contact-page">
    <Section className="interior-hero interior-hero--more">
      <Text className="page-kicker">TALK TO UPTACO / NYC</Text>
      <Heading level={1}>SAY{'\n'}HELLO.</Heading>
      <Paragraph>Something on your mind? Your question belongs here, not in another app.</Paragraph>
    </Section>
    <Section className="contact-workspace">
      <Page className="contact-side"><Text className="page-kicker">THE TEAM IS HERE</Text><Heading level={2}>GOOD FOOD.{'\n'}GOOD CONVERSATIONS.</Heading>
        <Paragraph>Questions about the menu, catering, the Harlem counter, the Midtown location or wholesale? We'll help find the right answer.</Paragraph>
        <Link href="/help" className="text-action">Read the help guide <Text aria-hidden={true}>→</Text></Link>
        <Page className="contact-stamp" aria-hidden={true}><Text>UP.</Text></Page>
      </Page>
      <Article className="contact-form">
        <Text className="page-kicker">SEND UPTACO A NOTE</Text>
        <Heading level={2}>WHAT'S UP?</Heading>
        <Page className="inquiry-notice"><Text aria-hidden={true}>✳</Text><Paragraph>The secure contact endpoint is being connected. This preview keeps typed entries in local memory but cannot send messages yet.</Paragraph></Page>
        <Page className="inquiry-form-grid">
          <Page className="inquiry-field"><Text>Your name</Text><Input className="inquiry-input" aria-label="Your name" value={draft.name} onChangeText={v=>set('contact','name',v)} placeholder="Your name"/></Page>
          <Page className="inquiry-field"><Text>Email</Text><Input className="inquiry-input" aria-label="Email address" value={draft.email} onChangeText={v=>set('contact','email',v)} placeholder="Your email"/></Page>
        </Page>
        <Page className="inquiry-field"><Text>What's this about?</Text><Input className="inquiry-input" aria-label="Message subject" value={draft.company} onChangeText={v=>set('contact','company',v)} placeholder="Menu, catering, an order…"/></Page>
        <Page className="inquiry-field"><Text>Tell us a little more</Text><Textarea className="inquiry-textarea" aria-label="Your message" numberOfLines={6} value={draft.notes} onChangeText={v=>set('contact','notes',v)} placeholder="Write your note here"/></Page>
        <Button disabled className="cta cta--black inquiry-disabled">Sending not yet enabled</Button>
        <Paragraph className="inquiry-fineprint">No message or personal information has been submitted.</Paragraph>
      </Article>
    </Section>
  </Main>;
}
