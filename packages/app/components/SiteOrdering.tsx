'use client';
import { Link as SemanticLink, Text } from '@acme/ui/html';
import { useUptacoSite } from '../store/site.store';
import { selectCheckout } from '@uptaco/experience/capabilities';

export function OrderLink({compact=false}:{compact?:boolean}) {
  const location=useUptacoSite(s=>s.location);
  const order=selectCheckout(location,'pickup',null);
  return <SemanticLink className={compact?'header-order':'cta cta--orange'} href={order.href}
    target="_blank" rel="noopener noreferrer" aria-label={`Order pickup at Uptaco ${location} through Square`}>
    {compact?'Order pickup':'Order pickup'} <Text aria-hidden="true">↗</Text>
  </SemanticLink>;
}
