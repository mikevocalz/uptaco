/** Uptaco owns ALL customer destinations. Providers are behind server APIs.
 * A provider connection never grants permission to navigate outside Uptaco.
 */
export type UptacoLocation = 'harlem' | 'midtown';
export type FulfillmentChoice = 'pickup' | 'delivery';
export type CheckoutRoute = Readonly<{
  kind: 'internal';
  label: string;
  href: string;
  checkoutEnabled: boolean;
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

/** Reject off-origin, scheme-relative and malformed routes. Used at feature and
 * rendering boundaries. Do not interpolate untrusted hrefs into first-party UI.
 */
export function firstPartyPath(path: string): string {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//') ||
      /[\\\u0000-\u001f]/.test(path) || /%2f|%5c/i.test(path)) {
    throw new Error('Only first-party paths are allowed');
  }
  const candidate = new URL(path, 'https://uptaco.invalid');
  if (candidate.origin !== 'https://uptaco.invalid' || candidate.username || candidate.password) {
    throw new Error('Destination must remain inside Uptaco');
  }
  return candidate.pathname + candidate.search + candidate.hash;
}

export function internalOrderHref(location: UptacoLocation, fulfillment: FulfillmentChoice): string {
  return firstPartyPath(`/menu?location=${location}&fulfillment=${fulfillment}`);
}

export function selectCheckout(
  location: UptacoLocation,
  fulfillment: FulfillmentChoice,
  config: MerchantCapabilities | null
): CheckoutRoute {
  if(config && config.location !== location) throw new Error('Location capability mismatch');
  const enabled=Boolean(config?.merchantApproved && config.squareApiCheckout &&
    (fulfillment === 'pickup' ? config.squarePickup : config.squareDelivery));
  return {
    kind:'internal',
    label:enabled ? 'Choose your food' : 'Explore the menu',
    href:internalOrderHref(location,fulfillment),
    checkoutEnabled:enabled,
    explanation:enabled
      ? 'Checkout, payment and order status stay inside Uptaco, backed by verified merchant services.'
      : 'Explore Uptaco here. Checkout is not enabled until the restaurant account is connected. No external ordering site.'
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
