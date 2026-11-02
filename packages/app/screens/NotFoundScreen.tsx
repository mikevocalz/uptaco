import Link from 'solito/link';
import { Main, Section, Heading, Paragraph, Text } from '@acme/ui/html';
export function NotFoundScreen(){return <Main id="main-content"><Section className="interior-hero interior-hero--placeholder"><Text className="page-kicker">THAT'S NOT ON THE MENU</Text><Heading level={1}>404.{'\n'}LET'S EAT.</Heading><Paragraph>This page isn't here, but breakfast still is.</Paragraph><Link href="/" className="cta cta--black">Back to Uptaco ↗</Link></Section></Main>;}
