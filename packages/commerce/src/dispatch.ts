import type { CourierDispatch, CourierProvider, CourierQuote, NormalizedOrder } from './types.ts';
import { assertCourierDispatchAllowed, courierIdempotencyKey, usableQuote } from './order.ts';

export type DispatchRequest = Readonly<{
  orderId: string; locationId: string; provider: CourierProvider; providerQuoteId: string;
  idempotencyKey: string; pickupReadyAt: string; deliveryAddressToken: string;
}>;

export interface DeliveryAdapter {
  readonly provider: CourierProvider;
  quote(input: { order: NormalizedOrder; deliveryAddressToken: string; pickupReadyAt: string }): Promise<CourierQuote>;
  dispatch(request: DispatchRequest): Promise<CourierDispatch>;
  get(externalDispatchId: string): Promise<CourierDispatch>;
  cancel(externalDispatchId: string, reason: string): Promise<CourierDispatch>;
  /** Signature verification is provider-specific. Must happen before parsing or side effects. */
  verifyWebhook(rawBody: Uint8Array, headers: Readonly<Record<string, string>>): Promise<boolean>;
}

export function prepareDispatch(
  order: NormalizedOrder,
  quote: CourierQuote,
  args: { attempt: number; nowMs: number; pickupReadyAt: string; deliveryAddressToken: string; activeDispatchCount: number },
): DispatchRequest {
  assertCourierDispatchAllowed(order);
  if (args.activeDispatchCount !== 0) throw new Error('An active courier dispatch already exists');
  if (!usableQuote(quote, args.nowMs)) throw new Error('Courier quote expired or inside safety margin');
  if (!Number.isFinite(Date.parse(args.pickupReadyAt))) throw new Error('pickupReadyAt must be valid ISO datetime');
  if (!args.deliveryAddressToken.trim()) throw new Error('A secured delivery address token is required');
  return {
    orderId: order.id,
    locationId: order.locationId,
    provider: quote.provider,
    providerQuoteId: quote.providerQuoteId,
    idempotencyKey: courierIdempotencyKey(order.id, quote.provider, args.attempt),
    pickupReadyAt: args.pickupReadyAt,
    deliveryAddressToken: args.deliveryAddressToken,
  };
}

/** Pure core only. Production must enforce a one-active-dispatch DB index and transaction/outbox. */
