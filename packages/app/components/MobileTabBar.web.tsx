'use client';
import { Link } from 'solito/link';
import { usePathname } from 'next/navigation';
import { Nav, Text } from '@acme/ui/html';
import { ShellIcon } from '@acme/ui/icons';
import { consumerTabs, selectedTabId, NOT_CONNECTED } from '../navigation/contracts';

/** Until Better Auth is connected, we have a real guest session only.
 * No fabricated "signed in" state or unavailable Rewards tab.
 */
const current = {audience:'guest',capabilities:NOT_CONNECTED} as const;

export function MobileTabBar(){
  const pathname=usePathname() ?? '/';
  const active=selectedTabId(pathname,current);
  return <Nav aria-label="Primary mobile navigation" className="site-tabbar">
    {consumerTabs(current).map(tab=>
      <Link key={tab.id} href={tab.href}
        className={['site-tabbar-item',tab.primary?'site-tabbar-item--order':'',active===tab.id?'site-tabbar-item--active':''].filter(Boolean).join(' ')}
        aria-label={tab.label==='Order'?'Start an Uptaco order':tab.label}
        aria-current={active===tab.id?'page':undefined}>
        <ShellIcon name={tab.icon} size={tab.primary?24:21}/>
        <Text>{tab.label}</Text>
      </Link>)}
  </Nav>;
}
