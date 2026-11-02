export const ORDER_ORIGINS = ['uptaco-web', 'square-online', 'uber-eats', 'doordash-marketplace', 'grubhub', 'catering'] as const;
export type OrderOrigin = typeof ORDER_ORIGINS[number];
export const FULFILLMENT_TYPES = ['customer-pickup', 'curbside-pickup', 'courier-delivery', 'merchant-delivery'] as const;
export type FulfillmentType = typeof FULFILLMENT_TYPES[number];
export type DispatchAuthority = 'merchant' | 'marketplace' | 'none';
export type CourierProvider = 'uber-direct' | 'doordash-drive' | 'cartwheel' | 'nash' | 'own-fleet';
export type OrderStatus = 'draft' | 'awaiting-payment' | 'placed' | 'accepted' | 'preparing' | 'ready-for-handoff' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'authorized' | 'captured' | 'partially-refunded' | 'refunded' | 'failed';
export type DispatchStatus = 'not-requested' | 'quoting' | 'requested' | 'assigned' | 'courier-arriving' | 'picked-up' | 'delivered' | 'cancelled' | 'failed' | 'returned';
export type PickupActor = 'customer' | 'courier' | 'employee';
export interface NormalizedOrder {
  id: string;
  origin: OrderOrigin;
  locationId: string;
  externalOrderId: string;
  fulfillment: FulfillmentType;
  dispatchAuthority: DispatchAuthority;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  currency: 'USD';
  subtotalCents: number;
  taxCents: number;
  feesCents: number;
  staffTipCents: number;
  courierTipCents: number;
  totalCents: number;
}
export interface CourierQuote {
  provider: CourierProvider;
  providerQuoteId: string;
  expiresAt: string;
  feeCents: number;
  currency: 'USD';
  trackingUrl?: string;
}
export interface CourierDispatch {
  id: string;
  orderId: string;
  provider: CourierProvider;
  externalDispatchId?: string;
  status: DispatchStatus;
  quoteId?: string;
  idempotencyKey: string;
}
