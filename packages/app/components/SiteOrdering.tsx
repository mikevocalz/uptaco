'use client';
import Link from 'solito/link';
import { Text } from '@acme/ui/html';
export function OrderLink({compact=false}:{compact?:boolean}) {
  return <Link className={compact?'header-order':'cta cta--orange'} href="/order" aria-label="Start an order on Uptaco">
    {compact?'Order':'Start an order'} <Text aria-hidden="true">→</Text>
  </Link>;
}
