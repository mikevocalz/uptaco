'use client';
import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text, Input, Textarea, Button, Fieldset, Legend } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { useInquiry, type UptacoInquiryKind, type InquiryDraft } from '../store/inquiry.store';
import { UPTACO_MEDIA } from '../data/brand';

function InquiryTextField({kind,field,label,placeholder}:{
  kind:UptacoInquiryKind;field:keyof InquiryDraft;label:string;placeholder:string
}){
  const value=useInquiry(s=>s.drafts[kind][field]);
  const set=useInquiry(s=>s.setField);
  return <Page className="inquiry-field"><Text>{label}</Text>
    <Input value={value} onChangeText={text=>set(kind,field,text)}
      aria-label={label} className="inquiry-input" placeholder={placeholder}/>
  </Page>;
}
function InquiryChoice({kind,field,options,label}:{
  kind:UptacoInquiryKind;field:'location'|'service';label:string;
  options:readonly {label:string;value:string}[]
}){
  const current=useInquiry(s=>s.drafts[kind][field]);
  const update=useInquiry(s=>s.setField);
  return <Fieldset className="inquiry-choices"><Legend>{label}</Legend>
    <Page className="inquiry-choice-pair">{options.map(option=><Button key={option.value}
      aria-pressed={current===option.value}
      className={current===option.value?'inquiry-choice is-active':'inquiry-choice'}
      onPress={()=>update(kind,field,option.value)}>{option.label}</Button>)}</Page>
  </Fieldset>;
}

export function BusinessOnboardingScreen({kind}:{kind:'catering'|'partner'}){
  const catering=kind==='catering';
  const note=useInquiry(s=>s.drafts[kind].notes);
  const set=useInquiry(s=>s.setField);
  return <Main id="main-content" className="business-inquiry-page">
    <Section className={catering?'interior-hero interior-hero--catering':'interior-hero interior-hero--cafe'}>
      <Text className="page-kicker">{catering?'GROUP BREAKFAST / UPTACO':'WHOLESALE / UPTACO'}</Text>
      <Heading level={1}>{catering?'THE WHOLE\nTEAM IS UP.':'GOOD FOOD.\nGOOD PARTNERS.'}</Heading>
      <Paragraph>{catering?'Tell us a little about your occasion, and we’ll plan a breakfast worth showing up for.':'Tell us about your café. Uptaco makes chef-quality food for counters with big ambitions.'}</Paragraph>
    </Section>
    <Section className="inquiry-workspace">
      <Page className="inquiry-story">
        <Page className="inquiry-story-number"><Text>{catering?'01 / THE GATHERING':'01 / THE PARTNERSHIP'}</Text></Page>
        <Heading level={2}>{catering?'Breakfast\nfor everyone.':'More good\nin the case.'}</Heading>
        <Paragraph>{catering?'Your order should match the people at your table—not force you through a generic checkout.':'Wholesale stock, menu planning and delivery will live inside your approved Uptaco partner account.'}</Paragraph>
        <Page className="inquiry-photo">
          <BrandImage src={UPTACO_MEDIA.heroBec} alt="Uptaco BEC breakfast taco" width={900} height={1000}
            sizes="(max-width: 800px) 90vw, 40vw"/>
          <Text className="inquiry-photo-label">{catering?'A GOOD START / NYC':'MADE FOR THE MORNING RUSH'}</Text>
        </Page>
        <Paragraph className="inquiry-leadtime">{catering
          ? 'Some items require up to 36, 48, or 72 hours of preparation time. Uptaco will validate the requested date and menu before accepting payment.'
          : 'Wholesale prices, volume and delivery options will be available only after your business is approved.'}</Paragraph>
      </Page>
      <Article className="inquiry-form">
        <Text className="page-kicker">{catering?'PLAN YOUR MORNING':'LET’S START A CONVERSATION'}</Text>
        <Heading level={2}>{catering?'THE DETAILS.':'YOUR CAFÉ.'}</Heading>
        <Paragraph>{catering?'Start with the basics. We’ll need a real availability check before any quote or order can be confirmed.':'Your application will eventually be reviewed by Uptaco’s team; this is the first-party interface.'}</Paragraph>
        <Page className="inquiry-notice">
          <Text className="inquiry-notice-icon" aria-hidden={true}>✳</Text>
          <Paragraph>Form preview: your entries stay in this browser session. Submissions are disabled until Uptaco’s secure backend is connected.</Paragraph>
        </Page>
        {catering?
          <Page className="inquiry-form-section">
            <Heading level={3}>01 / The gathering</Heading>
            <Page className="inquiry-form-grid">
              <InquiryTextField kind={kind} field="date" label="Event date" placeholder="MM / DD / YYYY"/>
              <InquiryTextField kind={kind} field="time" label="Preferred time" placeholder="e.g. 9:30 AM"/>
              <InquiryTextField kind={kind} field="headcount" label="How many people?" placeholder="Guest count"/>
              <InquiryTextField kind={kind} field="company" label="Business or event name" placeholder="Optional"/>
            </Page>
            <InquiryChoice kind={kind} field="service" label="How will the food get there?" options={[
              {label:'Pickup',value:'pickup'}, {label:'Delivery',value:'delivery'}
            ]}/>
            <InquiryChoice kind={kind} field="location" label="Preferred Uptaco counter" options={[
              {label:'Harlem',value:'harlem'}, {label:'Midtown',value:'midtown'}
            ]}/>
          </Page>
        :
          <Page className="inquiry-form-section">
            <Heading level={3}>01 / The business</Heading>
            <Page className="inquiry-form-grid">
              <InquiryTextField kind={kind} field="company" label="Café or business name" placeholder="Business name"/>
              <InquiryTextField kind={kind} field="city" label="City / neighborhood" placeholder="Where’s the café?"/>
              <InquiryTextField kind={kind} field="numberOfLocations" label="How many locations?" placeholder="Number of locations"/>
              <InquiryTextField kind={kind} field="phone" label="Business phone" placeholder="Optional"/>
            </Page>
            <Paragraph>Approved wholesale accounts have their own menus, recurring orders, invoices, deliveries and team settings.</Paragraph>
          </Page>}
        <Page className="inquiry-form-section">
          <Heading level={3}>02 / Stay in touch</Heading>
          <Page className="inquiry-form-grid">
            <InquiryTextField kind={kind} field="name" label="Your name" placeholder="First and last"/>
            <InquiryTextField kind={kind} field="email" label="Email address" placeholder="you@example.com"/>
          </Page>
          <Page className="inquiry-field"><Text>{catering?'Menu ideas & dietary notes':'Products, volume & other details'}</Text>
            <Textarea value={note} onChangeText={value=>set(kind,'notes',value)}
              aria-label={catering?'Menu ideas and dietary notes':'Business details'}
              placeholder={catering?'What should we know about your group?':'What should we know about your café?'}
              numberOfLines={5} className="inquiry-textarea"/>
          </Page>
        </Page>
        <Button disabled className="cta cta--black inquiry-disabled">
          {catering?'Request quote — not yet connected':'Apply to partner — not yet connected'}
        </Button>
        <Paragraph className="inquiry-fineprint">No submission, booking, charge, or business approval occurs on this preview. Once live, Uptaco will validate your details and request consent where needed.</Paragraph>
        <Link className="text-action" href={catering?'/catering':'/cafe-partners'}>
          Back to {catering?'catering':'café partners'} <Text aria-hidden={true}>→</Text>
        </Link>
      </Article>
    </Section>
  </Main>;
}
