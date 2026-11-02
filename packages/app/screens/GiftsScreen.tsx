import { Link } from 'solito/link';
import { Main, Section, Page, Article, Heading, Paragraph, Text, Input, Button } from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_MEDIA } from '../data/brand';

/** Visual shopping UI, not payment collection. Gift card issuance requires
 * an approved Square merchant and successful funded activation.
 */
export function GiftsScreen(){
  return <Main id="main-content" className="gifts-page">
    <Section className="interior-hero interior-hero--gifts">
      <Text className="page-kicker">SHARE THE UPTACO MORNING</Text>
      <Heading level={1}>GIVE THE{'\n'}GOOD STUFF.</Heading>
      <Paragraph>Breakfast makes a good gift. The entire gifting experience will live right here, from choosing a card to sending it.</Paragraph>
    </Section>
    <Section className="gifts-workspace">
      <Page className="gifts-art">
        <Page className="gift-card-visual gift-card-visual--rear" aria-hidden={true}/>
        <Page className="gift-card-visual">
          <Page className="gift-card-visual-top"><Text>UPTACO GIFT CARD</Text><Text>NYC • 2026</Text></Page>
          <BrandImage src={UPTACO_MEDIA.wordmarkBlack} width={235} height={235} sizes="235px" alt="Uptaco sculptural black wordmark"/>
          <Page className="gift-card-visual-bottom"><Text>FOR YOUR KIND OF MORNING.</Text><Text>✳</Text></Page>
        </Page>
        <Paragraph>A branded digital gift, designed for Uptaco. This is a preview—not an issued or activated card.</Paragraph>
      </Page>
      <Article className="gifts-configurator">
        <Text className="page-kicker">01 / MAKE THEIR DAY</Text>
        <Heading level={2}>A little{'\n'}Uptaco for them.</Heading>
        <Paragraph>Gift cards will support an amount, personal note, delivery details, and payment when Uptaco's gift-card integration is active.</Paragraph>
        <Page className="gifts-form-preview">
          <Page className="form-field"><Text>Gift amount</Text><Page className="amount-preview"><Text>Amounts set by Uptaco’s live gift-card program</Text></Page></Page>
          <Page className="form-field"><Text>Recipient</Text><Input editable={false} aria-label="Recipient email preview" placeholder="Recipient email — unavailable" className="form-input"/></Page>
          <Page className="form-field"><Text>Personal message</Text><Input editable={false} aria-label="Gift message preview" placeholder="Write a note — unavailable" className="form-input"/></Page>
          <Page className="form-field"><Text>Delivery date</Text><Input editable={false} aria-label="Gift delivery date preview" placeholder="Choose a date — unavailable" className="form-input"/></Page>
        </Page>
        <Button disabled className="cta cta--black gifts-disabled" aria-label="Gift purchase unavailable until enabled">Gift card sales not yet available</Button>
        <Paragraph className="form-footnote">No payment details, recipient information, or gift cards are collected on this preview.</Paragraph>
        <Link href="/menu" className="text-action">Explore Uptaco first <Text aria-hidden={true}>→</Text></Link>
      </Article>
    </Section>
    <Section className="gifts-bottom"><Text className="page-kicker">MAKE IT PERSONAL</Text>
      <Heading level={2}>A reason to{'\n'}get up early.</Heading>
      <Paragraph>Gift delivery notifications, balances and receipts will be handled from the Uptaco account—not a separate checkout website.</Paragraph>
    </Section>
  </Main>;
}
