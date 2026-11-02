/** Route planning inventory. "planned" is intentionally not an implementation claim. */
export type RouteAudience = 'consumer' | 'customer' | 'partner' | 'staff';
export type RoutePlan = Readonly<{
  path: string;
  title: string;
  audience: RouteAudience;
  primaryAction: string;
  stateOwner: 'payload-content' | 'square' | 'honeycart' | 'odeko' | 'auth' | 'commerce';
  planned: true;
}>;
export const UPTACO_ROUTES: readonly RoutePlan[] = [
  {path:'/',title:'Home',audience:'consumer',primaryAction:'Order Harlem pickup',stateOwner:'payload-content',planned:true},
  {path:'/menu',title:'Menu',audience:'consumer',primaryAction:'Choose pickup location',stateOwner:'square',planned:true},
  {path:'/menu/[slug]',title:'Product details',audience:'consumer',primaryAction:'Select required options',stateOwner:'square',planned:true},
  {path:'/bag',title:'Your bag',audience:'consumer',primaryAction:'Review fulfillment',stateOwner:'commerce',planned:true},
  {path:'/checkout',title:'Checkout',audience:'consumer',primaryAction:'Review and pay securely',stateOwner:'square',planned:true},
  {path:'/order/[token]',title:'Order status',audience:'customer',primaryAction:'View pickup instructions',stateOwner:'square',planned:true},
  {path:'/locations',title:'Locations',audience:'consumer',primaryAction:'Choose a store',stateOwner:'payload-content',planned:true},
  {path:'/locations/harlem',title:'Harlem',audience:'consumer',primaryAction:'Order Harlem pickup',stateOwner:'square',planned:true},
  {path:'/locations/midtown',title:'Midtown',audience:'consumer',primaryAction:'Order Midtown pickup',stateOwner:'square',planned:true},
  {path:'/catering',title:'Catering',audience:'consumer',primaryAction:'Start catering order',stateOwner:'honeycart',planned:true},
  {path:'/catering/quote',title:'Catering inquiry',audience:'consumer',primaryAction:'Request a quote',stateOwner:'commerce',planned:true},
  {path:'/cafe-partners',title:'Café partners',audience:'partner',primaryAction:'Explore wholesale',stateOwner:'odeko',planned:true},
  {path:'/cafe-partners/apply',title:'Partner inquiry',audience:'partner',primaryAction:'Contact Uptaco',stateOwner:'commerce',planned:true},
  {path:'/story',title:'Our story',audience:'consumer',primaryAction:'Explore the menu',stateOwner:'payload-content',planned:true},
  {path:'/rewards',title:'Rewards',audience:'customer',primaryAction:'Check eligibility',stateOwner:'square',planned:true},
  {path:'/gifts',title:'Gift Uptaco',audience:'customer',primaryAction:'Choose a gift card',stateOwner:'square',planned:true},
  {path:'/account',title:'Account',audience:'customer',primaryAction:'Sign in securely',stateOwner:'auth',planned:true},
  {path:'/account/orders',title:'Past orders',audience:'customer',primaryAction:'Reorder an eligible item',stateOwner:'square',planned:true},
  {path:'/admin',title:'Staff console',audience:'staff',primaryAction:'Review the kitchen queue',stateOwner:'commerce',planned:true}
] as const;

export function findRoute(path: string): RoutePlan | undefined {
  return UPTACO_ROUTES.find(r => r.path === path);
}
