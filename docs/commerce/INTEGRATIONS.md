# Restaurant ordering integration matrix (Nov 2, 2026)

## Distinguish four ownership cases

1. **Own website / customer pickup** — Uptaco controls checkout and prepares order for customer collection. Square Orders supports `PICKUP` fulfillment, location-specific pickup schedules, and updates.
2. **Marketplace / customer pickup** — Uber Eats, DoorDash or Grubhub is the checkout/source of truth; Uptaco prepares for **the customer**, not a courier. Only ingest/write statuses when explicit merchant/partner access is approved.
3. **Marketplace / courier delivery** — marketplace owns checkout and normally dispatches its **own** courier; don't create a duplicate courier request.
4. **Own website / courier delivery** — Uptaco controls checkout and hires external last-mile delivery via Uber Direct or DoorDash Drive, subject to approval, coverage, quote and fees.

## Candidates

| Connection | Ingest/orders | Uptaco website pickup | Own-site courier delivery | Readiness |
| --- | --- | --- | --- | --- |
| Square Orders + Catalog + Locations + Payments | Primary POS and fulfillment source of truth | Yes, `PICKUP` | Pair with external courier; Square `DELIVERY` fulfillment is not generally POS-visible without a formal partnership | Proposed, merchant OAuth needed |
| Uber Eats Marketplace | Authorized Uber Eats orders, including customer pickup | Marketplace's checkout only | Not Uber Direct | Partner onboarding/permissions required |
| Uber Direct | Not a consumer marketplace | No | Yes, courier picks up at Uptaco | Merchant account, quotes, dispatch permissions needed |
| DoorDash Marketplace | Orders, customer pickup, delivery | Marketplace's checkout only | Marketplace controls delivery unless self-delivery enabled | Limited partner API access |
| DoorDash Drive | No marketplace checkout | No | Yes, independent courier from Uptaco's checkout | Limited API access |
| Grubhub | Marketplace pickup and delivery order feed where approved | Marketplace's checkout only | Grubhub marketplace usually controls | Prefer approved POS integration |
| Deliverect | Consolidates Uber Eats, DoorDash, Grubhub into Square POS | Through constituent platforms | Supports integrations, validate contract | Optional paid middleware |
| Otter / Checkmate / Chowly | Consolidated POS marketplace integrations | Through connected platforms | Separate dispatch contract needed | Optional middleware; pick ONE |
| Cartwheel / Nash | Dispatch orchestration only | No | Multi-carrier dispatch + fallback | Optional if volume and economics justify |
| ezCater | Catering marketplace / tracking | Catering collection varies | Catering courier via supported integrations | Consider after core ordering |

**NYC exception:** the original Relay Delivery announced an **April 1, 2026 NYC operations shutdown**; don't include as an automatic courier option without verifying a legally distinct currently operational provider.

## Square cautions
- Square Orders API supports `PICKUP`; `DELIVERY` is beta/partnership-constrained for POS visibility. Use a POS-visible pickup/workflow representation plus a **separate courier-deliveries record** until actual merchant configuration proves another path.
- Square Orders `order.created` webhook behavior varies by order origin and API version; subscribe to available `order.updated` and `order.fulfillment.updated`, then fetch and reconcile remote order state. Never infer complete POS events from one webhook type.
- Avoid double importing Square-synced marketplaces: if Square already ingests a DoorDash order, dedupe on channel+merchant external ID and map to the same normalized Uptaco order.
- No `DELIVERY` promise or pickup ETA until provider and store availability are authoritative.

## Integration adapter contract

Every adapter declares `kind`, `capabilities`, `externalLocationId`, `sourceOfTruth`, `authentication` and a versioned webhook event schema. Marketplace adapters implement order ingestion, ack/accept, fulfillment updates where authorized. Courier adapters implement `quote`, `dispatch`, `get`, `cancel`, webhook verification and normalized courier milestones. Token/secret storage remains in environment/vault, not Payload documents.

Webhook ingress must verify signatures using the provider's exact documentation, store provider event ID and signature algorithm/version, reject stale/replayed events, and process side effects through an idempotent job/outbox. HTTP acknowledgment must not wait on kitchen/courier side effects. Scheduled reconciliation repairs missed events.

**Human gate before enabling:** Uptaco merchant account access, API scopes, Square location mappings, marketplace ownership, integration fees, courier coverage for Harlem/Midtown, tax/tips/tender behavior and dispatch responsibility.

## Verified documentation
- https://developer.squareup.com/docs/orders-api/fulfillments
- https://developer.squareup.com/reference/square/orders-api/webhooks
- https://squareup.com/help/us/en/article/8445-integrate-partnership-platforms-for-square-online-pickup-and-delivery-orders
- https://developer.uber.com/docs/deliveries/overview
- https://developer.uber.com/docs/deliveries/guides/webhooks
- https://developer.doordash.com/en-US/docs/drive/overview/about_drive/
- https://developer.doordash.com/en-US/docs/marketplace/overview/getting_started/preferred_integrations_new/
- https://help.doordash.com/en-us/merchants/article/order-pickup
- https://www.deliverect.com/en-us/integrations
- https://www.tryotter.com/integrations
- https://trycartwheel.zendesk.com/hc/en-us/articles/7179786869015-Delivery-Model-3rd-Party-Delivery
- https://nash.ai/orchestrate
- https://www.relay.delivery/english-messaging
