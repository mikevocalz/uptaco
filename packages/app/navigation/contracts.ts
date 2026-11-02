/**
 * Uptaco navigation contract. This module intentionally has no UI/runtime imports:
 * SSR, native, provider capability gates, Storybook and tests agree on the same slots.
 *
 * IMPORTANT: Navigation visibility is not authorization. Check all private
 * permissions on the server with verified sessions and location membership.
 */
export type Audience = 'guest' | 'customer' | 'staff' | 'partner';
export type NativeFamily = 'phone' | 'foldable' | 'tablet' | 'headset' | 'unknown';
export type ShellRuntime = 'web' | 'native';
export type Shell = 'web-header' | 'native-phone-tabs' | 'native-right-rail' | 'native-pending-capability';
export type TabId = 'home' | 'menu' | 'order' | 'locations' | 'more' | 'you';
export type TabIconId = 'house' | 'utensils' | 'bag' | 'map-pin' | 'more' | 'user';
export type Tab = Readonly<{
  id: TabId;
  label: string;
  href: string;
  icon: TabIconId;
  primary?: boolean;
}>;
export type ConsumerCapabilities = Readonly<{
  accountsEnabled: boolean;
  checkoutEnabled: boolean;
  rewardsEnabled: boolean;
  giftsEnabled: boolean;
  groupOrdersEnabled: boolean;
}>;
export type ConsumerContext = Readonly<{
  audience: 'guest' | 'customer';
  capabilities: ConsumerCapabilities;
}>;

export const NOT_CONNECTED: ConsumerCapabilities = Object.freeze({
  accountsEnabled: false,
  checkoutEnabled: false,
  rewardsEnabled: false,
  giftsEnabled: false,
  groupOrdersEnabled: false
});

/** Hardware family is stable; available pane width is a separate input. */
export function chooseShell(runtime: ShellRuntime, family: NativeFamily): Shell {
  if (runtime === 'web') return 'web-header';
  if (family === 'phone') return 'native-phone-tabs';
  if (family === 'foldable' || family === 'tablet' || family === 'headset') return 'native-right-rail';
  return 'native-pending-capability'; // unknown is NOT a regular phone
}

/** Five fixed slots. "Order" is the universal centerpiece, never account-gated.
 * Web opens /order; native may present its adaptive OrderChooser sheet.
 */
export function consumerTabs(context: ConsumerContext): readonly Tab[] {
  const personal = context.audience === 'customer' && context.capabilities.accountsEnabled;
  return [
    {id:'home',label:'Home',href:'/',icon:'house'},
    {id:'menu',label:'Menu',href:'/menu',icon:'utensils'},
    {id:'order',label:'Order',href:'/order',icon:'bag',primary:true},
    {id:'locations',label:'Locations',href:'/locations',icon:'map-pin'},
    personal
      ? {id:'you',label:'You',href:'/account',icon:'user'}
      : {id:'more',label:'More',href:'/more',icon:'more'}
  ];
}

/** The visible tab reflects the task the customer is completing rather than
 * exposing every deep route as its own destination.
 */
export function selectedTabId(path: string, context: ConsumerContext): TabId {
  const normalized = path.split('?')[0]?.split('#')[0] || '/';
  if (normalized === '/') return 'home';
  if (normalized === '/menu' || normalized.startsWith('/menu/')) return 'menu';
  if (normalized === '/order' || normalized.startsWith('/order/') ||
      normalized === '/bag' || normalized === '/checkout' || normalized.startsWith('/checkout/')) return 'order';
  if (normalized === '/locations' || normalized.startsWith('/locations/')) return 'locations';
  const personal = context.audience === 'customer' && context.capabilities.accountsEnabled;
  if (personal && (normalized === '/account' || normalized.startsWith('/account/') ||
       normalized === '/rewards' || normalized === '/gifts')) return 'you';
  return 'more';
}

export const DESKTOP_LINKS = Object.freeze([
  {label:'Menu',href:'/menu'},
  {label:'Locations',href:'/locations'},
  {label:'Catering',href:'/catering'},
  {label:'Café partners',href:'/cafe-partners'},
  {label:'Our story',href:'/story'}
] as const);

/** Private account navigation is rendered only for a verified customer
 * session; NOT a self-reported client-side role.
 */
export const ACCOUNT_SECTIONS = Object.freeze([
  {id:'overview',label:'My Uptaco',href:'/account'},
  {id:'orders',label:'Orders & receipts',href:'/account/orders'},
  {id:'favorites',label:'Favorites & reorder',href:'/account/favorites'},
  {id:'rewards',label:'Rewards',href:'/account/rewards',requires:'rewardsEnabled'},
  {id:'gifts',label:'Gift cards',href:'/account/gifts',requires:'giftsEnabled'},
  {id:'profile',label:'Profile',href:'/account/profile'},
  {id:'addresses',label:'Saved addresses',href:'/account/addresses'},
  {id:'preferences',label:'Preferences',href:'/account/preferences'},
  {id:'notifications',label:'Notifications',href:'/account/notifications'},
  {id:'security',label:'Security',href:'/account/security'},
  {id:'privacy',label:'Privacy & deletion',href:'/account/privacy'}
] as const);
export function customerAccountLinks(context: ConsumerContext) {
  if (context.audience !== 'customer' || !context.capabilities.accountsEnabled) return [];
  return ACCOUNT_SECTIONS.filter(item => !('requires' in item) ||
    context.capabilities[item.requires as keyof ConsumerCapabilities] === true);
}

export type StaffRole = 'owner' | 'manager' | 'kitchen' | 'cashier' | 'support' | 'marketing';
export type StaffDestination = Readonly<{id:string;label:string;href:string;roles:readonly StaffRole[]}>;
const ALL_STAFF: readonly StaffRole[] = ['owner','manager','kitchen','cashier','support','marketing'];
const OPERATIONS: readonly StaffRole[] = ['owner','manager','kitchen','cashier','support'];
const MANAGEMENT: readonly StaffRole[] = ['owner','manager'];
const CONTENT: readonly StaffRole[] = ['owner','manager','marketing'];
export const STAFF_DESTINATIONS: readonly StaffDestination[] = [
  {id:'overview',label:'Overview',href:'/admin',roles:ALL_STAFF},
  {id:'orders',label:'Orders',href:'/admin/orders',roles:OPERATIONS},
  {id:'kitchen',label:'Kitchen',href:'/admin/kitchen',roles:['owner','manager','kitchen','cashier']},
  {id:'dispatch',label:'Couriers & pickups',href:'/admin/dispatch',roles:['owner','manager','support']},
  {id:'menu',label:'Products & menus',href:'/admin/menu',roles:MANAGEMENT},
  {id:'inventory',label:'Availability & inventory',href:'/admin/inventory',roles:MANAGEMENT},
  {id:'catering',label:'Catering',href:'/admin/catering',roles:['owner','manager','support']},
  {id:'wholesale',label:'Café partners',href:'/admin/partners',roles:['owner','manager','support']},
  {id:'customers',label:'Customer support',href:'/admin/customers',roles:['owner','manager','support']},
  {id:'rewards',label:'Rewards & gift cards',href:'/admin/rewards',roles:MANAGEMENT},
  {id:'content',label:'Website pages & media',href:'/admin/content',roles:CONTENT},
  {id:'campaigns',label:'Campaigns',href:'/admin/campaigns',roles:CONTENT},
  {id:'reports',label:'Reports',href:'/admin/reports',roles:['owner','manager']},
  {id:'payments',label:'Payments & reconciliation',href:'/admin/payments',roles:MANAGEMENT},
  {id:'integrations',label:'Integrations',href:'/admin/integrations',roles:['owner']},
  {id:'locations',label:'Locations',href:'/admin/locations',roles:MANAGEMENT},
  {id:'team',label:'Staff & roles',href:'/admin/team',roles:['owner']},
  {id:'audit',label:'Audit log',href:'/admin/audit',roles:['owner']}
];
export function staffDestinations(role: StaffRole): readonly StaffDestination[] {
  return STAFF_DESTINATIONS.filter(item => item.roles.includes(role));
}
export const PARTNER_DESTINATIONS = Object.freeze([
  {id:'overview',label:'Partner overview',href:'/partners'},
  {id:'catalog',label:'Wholesale catalog',href:'/partners/catalog'},
  {id:'orders',label:'Orders & reorder',href:'/partners/orders'},
  {id:'schedule',label:'Deliveries',href:'/partners/schedule'},
  {id:'invoices',label:'Invoices',href:'/partners/invoices'},
  {id:'team',label:'Team & locations',href:'/partners/team'},
  {id:'support',label:'Partner support',href:'/partners/support'}
] as const);
