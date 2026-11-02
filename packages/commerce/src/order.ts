import type { NormalizedOrder, OrderOrigin, OrderStatus, FulfillmentType, PickupActor, CourierQuote, CourierProvider } from './types.ts';

const TRANSITIONS: Record<OrderStatus, ReadonlySet<OrderStatus>> = {
  draft: new Set(['awaiting-payment', 'cancelled']),
  'awaiting-payment': new Set(['placed', 'cancelled']),
  placed: new Set(['accepted', 'cancelled']),
  accepted: new Set(['preparing', 'cancelled']),
  preparing: new Set(['ready-for-handoff', 'cancelled']),
  'ready-for-handoff': new Set(['completed', 'cancelled']),
  completed: new Set(['refunded']),
  cancelled: new Set(['refunded']),
  refunded: new Set([]),
};
const marketplace = new Set<OrderOrigin>(['uber-eats', 'doordash-marketplace', 'grubhub']);

function required(value: string, label: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} is required`);
  return trimmed;
}

export function externalOrderKey(origin: OrderOrigin, locationExternalId: string, externalOrderId: string): string {
  return JSON.stringify([origin, required(locationExternalId, 'locationExternalId'), required(externalOrderId, 'externalOrderId')]);
}

export function pickupActor(type: FulfillmentType): PickupActor {
  if (type === 'courier-delivery') return 'courier';
  if (type === 'merchant-delivery') return 'employee';
  return 'customer';
}

export function allowedTransition(from: OrderStatus, to: OrderStatus): boolean {
  return from === to || TRANSITIONS[from].has(to);
}
export function transitionOrder(order: NormalizedOrder, to: OrderStatus): NormalizedOrder {
  if (!allowedTransition(order.orderStatus, to)) throw new Error(`Invalid order transition: ${order.orderStatus} -> ${to}`);
  return { ...order, orderStatus: to };
}

export function canDispatchCourier(order: NormalizedOrder): boolean {
  return (
    order.fulfillment === 'courier-delivery' &&
    order.dispatchAuthority === 'merchant' &&
    (order.paymentStatus === 'captured' || order.paymentStatus === 'authorized') &&
    ['accepted', 'preparing', 'ready-for-handoff'].includes(order.orderStatus) &&
    !marketplace.has(order.origin)
  );
}

/** Marketplace self-delivery requires a separate reviewed capability grant. Never auto-send a second courier. */
export function assertCourierDispatchAllowed(order: NormalizedOrder): void {
  if (!canDispatchCourier(order)) throw new Error('Courier dispatch not authorized for this order');
}

export function usableQuote(quote: CourierQuote, nowMs: number, minimumRemainingMs = 60_000): boolean {
  const expiry = Date.parse(quote.expiresAt);
  return Number.isFinite(expiry) && Number.isFinite(nowMs) && expiry - nowMs > minimumRemainingMs && quote.feeCents >= 0;
}

export function courierIdempotencyKey(orderId: string, provider: CourierProvider, attempt: number): string {
  if (!Number.isSafeInteger(attempt) || attempt < 1) throw new RangeError('attempt must be a positive integer');
  return JSON.stringify(['uptaco-dispatch-v1', required(orderId, 'orderId'), provider, attempt]);
}

/** Only own-store paid and verified fulfilled orders can automatically earn loyalty. */
export function canAwardRewards(order: NormalizedOrder, hasCustomerConsent: boolean): boolean {
  return hasCustomerConsent && !marketplace.has(order.origin) &&
    order.paymentStatus === 'captured' && order.orderStatus === 'completed';
}

export function assertAmounts(order: NormalizedOrder): void {
  for (const key of ['subtotalCents', 'taxCents', 'feesCents', 'staffTipCents', 'courierTipCents', 'totalCents'] as const) {
    if (!Number.isSafeInteger(order[key]) || order[key] < 0) throw new RangeError(`${key} must be non-negative integer cents`);
  }
  if (order.subtotalCents + order.taxCents + order.feesCents + order.staffTipCents + order.courierTipCents !== order.totalCents)
    throw new Error('Order totals do not reconcile');
}
