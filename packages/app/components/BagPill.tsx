'use client';
import Link from 'solito/link';
import { Page, Text } from '@acme/ui/html';
import { KinetrellSurface } from '@acme/ui/motion';
import { bagButtonPulse } from '@acme/ui/bag-motion';
import { bagCount } from '@uptaco/commerce/bag';
import { useUptacoSite } from '../store/site.store';
import { useUptacoBag } from '../store/bag.store';

export function BagPill({variant}:{variant:'header'|'mobile'}){
  const location=useUptacoSite(s=>s.location);
  const lines=useUptacoBag(s=>s.bags[location]);
  const motionId=useUptacoBag(s=>s.motionSequence);
  const count=bagCount(lines);
  if(!count)return null;
  return <Link href="/bag" className={variant==='header'?'bag-pill bag-pill--header':'bag-pill bag-pill--mobile'}
    data-uptaco-bag-target="true"
    aria-label={`View your ${location} bag, ${count} item${count===1?'':'s'}`}>
    <Page className="bag-pill-title">
      <Text className="bag-pill-icon" aria-hidden="true">▣</Text>
      <Text>Your bag</Text>
    </Page>
    <KinetrellSurface key={motionId} definition={bagButtonPulse} className="bag-pill-count">
      <Text>{count}</Text>
    </KinetrellSurface>
  </Link>;
}
