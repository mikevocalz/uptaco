/** Feature gates are capabilities, not marketing toggles.
 * An admin checkbox cannot fabricate a merchant-approved integration.
 * Server must supply a verified entitlement snapshot scoped to location.
 */
export type UptacoLocation = 'harlem' | 'midtown';
export type FulfillmentChoice = 'pickup' | 'delivery';
export type CheckoutRoute = Readonly<{
  kind: 'external' | 'native' | 'unavailable';
  label: string;
  href?: string;
  explanation: string;
}>;
export type MerchantCapabilities = Readonly<{
  location: UptacoLocation;
  squarePickup: boolean;
  squareDelivery: boolean;
  squareApiCheckout: boolean;
  squareGroupOrdering: boolean;
  squareLoyalty: boolean;
  squareGiftCards: boolean;
  merchantApproved: boolean;
  verifiedAt: string;
  deliveryPartner?: 'square-managed' | 'uber-direct' | 'doordash-drive';
}>;

/** These URLs appear on Uptaco's official locations and catering pages.
 * The links are NOT evidence of current hours or ordering availability.
 */
export const OFFICIAL_DESTINATIONS = Object.freeze({
  harlem: {
    pickup: 'https://uptaco-harlem.square.site/',
    delivery: 'https://www.grubhub.com/restaurant/up-taco-300-west-135th-street-new-york/13265128'
  },
  midtown: {
    pickup: 'https://uptaco.square.site/',
    delivery: 'https://www.uptaco.nyc/locations'
  },
  catering: 'https://uptaco.gethoneycart.com/',
  wholesale: 'https://www.uptaco.nyc/cafe',
  official: 'https://www.uptaco.nyc/',
  locations: 'https://www.uptaco.nyc/locations'
} as const);

const EXTERNAL_ALLOWED_HOSTS = new Set([
  'uptaco-harlem.square.site',
  'uptaco.square.site',
  'www.grubhub.com',
  'www.uptaco.nyc',
  'uptaco.gethoneycart.com'
]);

export function trustedExternalUrl(raw: string): string {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.username || url.password || !EXTERNAL_ALLOWED_HOSTS.has(url.hostname)) {
    throw new Error('Unapproved external destination');
  }
  return url.toString();
}

export function selectCheckout(
  location: UptacoLocation,
  fulfillment: FulfillmentChoice,
  config: MerchantCapabilities | null,
): CheckoutRoute {
  if (config !== null && config.location !== location) throw new Error('Location capability mismatch');
  // Explicit server-backed checkout only when merchant permissions and live order service are implemented.
  if (config?.merchantApproved && config.squareApiCheckout &&
    (fulfillment === 'pickup' ? config.squarePickup : config.squareDelivery)) {
    return {
      kind: 'native',
      label: fulfillment === 'pickup' ? 'Continue to checkout' : 'Review delivery',
      explanation: 'Live menu, price, availability, taxes and payment must be revalidated server-side.'
    };
  }
  const destination = OFFICIAL_DESTINATIONS[location][fulfillment];
  return {
    kind: 'external',
    label: fulfillment === 'pickup' ? 'Order pickup with Uptaco' : 'See delivery options',
    href: trustedExternalUrl(destination),
    explanation: 'You will finish your order with the restaurant ordering provider. Live availability and pricing are confirmed there.'
  };
}

export function groupOrderingEligible(config: MerchantCapabilities | null): boolean {
  return config?.merchantApproved === true && config.squareGroupOrdering === true;
}
export function rewardsEligible(config: MerchantCapabilities | null): boolean {
  return config?.merchantApproved === true && config.squareLoyalty === true;
}
export function giftsEligible(config: MerchantCapabilities | null): boolean {
  return config?.merchantApproved === true && config.squareGiftCards === true;
}
