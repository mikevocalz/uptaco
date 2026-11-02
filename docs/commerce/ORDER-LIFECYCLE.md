# Order, pickup and courier lifecycle

**Source of truth:** one Uptaco internal order per upstream order, stable `origin + merchantLocation + providerOrderID`. A Square-synced marketplace order must additionally carry the **original marketplace identity** and upstream linkage so two webhooks cannot create two orders.

## State machines (not one giant status field)

- Order: `draft → awaiting-payment → placed → accepted → preparing → ready-for-handoff → completed`, with `cancelled` and `refunded` transitions controlled by the charge and fulfillment truth. Delayed or duplicate marketplace updates must never regress a terminal state.
- Fulfillment: `not-started → preparing → ready → handed-off → complete`; explicit pickup actor `customer | courier | employee`. Courier `handed-off` is **not** the same as `delivered`.
- Dispatch: `not-requested → quoting → requested → assigned → courier-arriving → picked-up → delivered`, with `failed | cancelled | returned` subpaths. One **active** dispatch per order; previous attempts remain auditable.
- Payment: `unpaid | authorized | captured | partially-refunded | refunded | failed`; provider payment/webhook governs final state; never re-charge on ambiguous timeouts.
- Rewards: append-only `earn | redeem | reversal | adjustment | expire` ledger, balanced in points. Earn after financially captured and eligible fulfilled order; reverse on refunds. Marketplace order linking requires explicit consent and provider terms.

## Order origins
`uptaco-web | square-online | uber-eats | doordash-marketplace | grubhub | catering`. Fulfillment:
`customer-pickup | curbside-pickup | courier-delivery | merchant-delivery`.
Dispatch authority `merchant | marketplace | none` is **separate** from the fulfillment type.

Examples:
- DoorDash marketplace pickup → `customer-pickup`, authority `marketplace`; **zero courier request**.
- Uber Eats delivery → `courier-delivery`, authority `marketplace`; **zero Uber Direct request**.
- Uptaco web + Uber Direct → `courier-delivery`, authority `merchant`; quote/dispatch **after confirmed eligible payment and fulfillment acceptance**, with explicit cancellation handling.
- Uptaco web + scheduled in-store pickup → `customer-pickup`, authority `none`.

## Dispatcher invariants
1. Verify merchant authorization and supported coverage; pickup/dropoff addresses, hours, accurate prep time.
2. Check order paid/captured, accepted and not cancelled; compute actual restaurant ready window.
3. Request new quote, respect expiration **and** safety margin; re-quote before expiry rather than reusing stale price/ETA.
4. Confirm promised fees with guest at checkout before payment; dispatch only with adequate payment handling.
5. Create provider request with deterministic idempotency key; persist attempt before sending. On timeout, query provider by own reference before retry.
6. On webhooks, verify signature, dedupe event ID, transition monotonically, notify customer and kitchen without revealing courier personal data unnecessarily.
7. On driver arrived: confirm packaging, allergen notes and pickup code; on collected, store handoff evidence when supported; on delivered, provider confirmation, then eligible reward accounting.
8. If provider rejects or cannot assign, review alternatives; never silently send concurrent requests to multiple courier fleets. Revoke/cancel old attempt before switching.
9. Refund/cancel/tip adjustment and customer support workflows must be explicitly documented and rehearsed.

## Admin UX
Order queue has channel badges and exact pickup actor: **Customer collecting / Uber courier collecting / Dasher collecting / Staff delivery**. Views: New, Accepted, Preparing, Ready, Courier Arriving, Picked Up, Completed, Exceptions. Order detail shows provider, pickup code, ETA *source*, modifiers and paid/tip breakdown. Confirm pickup in one accessible action; no status changes just because an animation completed.

At a glance, show Store, Provider, Order ID, Items, Prep target, Ready time, Pickup actor, Dispatch authority and Courier status. An override requires a staff reason, audit event and reconciliation—not a silent manual mutation.
