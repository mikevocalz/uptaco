import { Link } from 'solito/link';
import {
  Main, Section, Page, Heading, Paragraph, Figure, Figcaption, Text
} from '@acme/ui/html';
import { BrandImage } from '@acme/ui/media';
import { UPTACO_MEDIA } from '../data/brand';

/** Three distinct first-screen concept studies using the real Uptaco image
 * references. Temporary design-review route, noindex, not linked publicly.
 * Sources: attached Web Designer Pro design workflow / concept-exploration step.
 */
export type StudyDirection='soft-rise'|'counter-editorial'|'morning-splash';

const studies:Record<StudyDirection,{
  eyebrow:string; headline:string; intro:string;float:string; callToAction:string;
}>={
  'soft-rise':{
    eyebrow:'UPTACO · MADE FOR NYC MORNINGS',
    headline:'Up for\nbreakfast?',
    intro:'Hand-pressed, made fresh, and ready for the city that never sleeps in.',
    float:'MADE FRESH. MADE UPTACO.',
    callToAction:'Explore the menu'
  },
  'counter-editorial':{
    eyebrow:'UPTACO / THE NEW YORK COUNTER',
    headline:'Breakfast\nhas a new\nrhythm.',
    intro:'Fresh tortillas. Proper coffee. A little joy between Harlem and Midtown.',
    float:'NYC, YOUR MORNING IS CALLING',
    callToAction:'Find your taco'
  },
  'morning-splash':{
    eyebrow:'BREAKFAST LOOKS GOOD FROM HERE',
    headline:'Mornings\nhit different\nup here.',
    intro:'Good food, bright mornings, and the breakfast taco you actually look forward to.',
    float:'ONE GOOD MORNING, PLEASE.',
    callToAction:'Order from Uptaco'
  }
};

export const UPTACO_STUDY_DIRECTIONS=Object.keys(studies) as StudyDirection[];

export function DesignStudyScreen({direction}:{direction:StudyDirection}){
  const s=studies[direction];
  return <Main id="main-content" className="uptaco-study">
    <Section className={`study-hero study-hero--${direction}`}
      aria-label={`Uptaco visual exploration ${direction}`}>
      <Page className="study-color-field" aria-hidden={true}/>
      <Page className="study-heading">
        <Text className="study-eyebrow">{s.eyebrow}</Text>
        <Heading level={1}>{s.headline}</Heading>
      </Page>
      <Figure className="study-photo">
        <BrandImage src={UPTACO_MEDIA.heroBec} width={960} height={1100}
          sizes="(max-width: 720px) 90vw, 45vw" priority
          alt="Actual Uptaco BEC breakfast taco"/>
        <Figcaption>HAND-PRESSED · NEW YORK CITY</Figcaption>
      </Figure>
      <Page className="study-float" aria-hidden={true}><Text>{s.float}</Text></Page>
      <Page className="study-copy">
        <Paragraph>{s.intro}</Paragraph>
        <Link href="/menu" className="study-cta">{s.callToAction}<Text aria-hidden={true}>↗</Text></Link>
      </Page>
      <Page className="study-art-mark" aria-hidden={true}>
        <BrandImage src={UPTACO_MEDIA.wordmarkBlack} width={340} height={350} sizes="250px"
          alt=""/>
      </Page>
      <Text className="study-tag">UPTACO · DESIGN DIRECTION STUDY</Text>
    </Section>
  </Main>;
}
