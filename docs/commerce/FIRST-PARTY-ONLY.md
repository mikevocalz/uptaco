# Uptaco — no offsite customer journey (mandatory product decision)

This supersedes earlier redirect-based suggestions in historical research documents and PR descriptions. The customer-facing site, including catering, account, gift cards, rewards, wholesale and help, never opens Square Online, Uber Eats, DoorDash, Grubhub, HoneyCart or Odeko. These are data/fulfillment integrations only when Uptaco authorizes the integration. No customer-facing links to external checkout providers or embedded external webview shells.

## First-party flow

Uptaco web (location → fulfillment → catalog → product modifiers → bag → guest checkout → Square Web Payments SDK on Uptaco → server-side Square Orders + Payments → receipt → status). A branded bag and motion can work as a preview with no credentials; it MUST NOT offer a live payment or invent prices until server approval and live catalog are available.

No third-party redirect fallback: disabled checkout with useful explanation and an internal help path if the Square account is not connected. Never direct orders to Grubhub or Square-hosted pages under the guise of a fully integrated app.

## Backend system adapters

- Square Catalog, Locations, Orders, Payments, Square Web Payments SDK: merchant grants, PCI-safe card tokenization, idempotent order+payment, taxes/tips, quote and status. Tokenized payment data is handled by the SDK/server; no raw card fields in Payload.
- Uber Eats / DoorDash Marketplace / Grubhub: approved inbound order events to the Uptaco operations system; marketplace courier ownership must not trigger duplicate dispatch.
- Uber Direct / DoorDash Drive: fulfillment of Uptaco-owned orders, with quote expiry, verified scope, dispatch idempotency, customer status **within Uptaco**.
- HoneyCart and Odeko: import/sync adapters only if contractual APIs are available. If not, build Uptaco-native catering/partner operations using Payload, not a public redirect.
- Square Loyalty and Gift Cards: if enabled, use those as financial source of truth, with Uptaco branded account, program and redemption screens.
- Resend: order receipts/marketing inside Uptaco’s system after compliance, email verification and proper sender domain.

## Animated bag

- Kinetrell authored motions: +Add initiates an orange-lavender branded token flight from the product trigger to the bag, plus bag counter spring.
- Quantity + / −: targeted count pulse and locally updated quantity. Decrement from one is remove.
- Remove: product row visually peels and disappears, brand token releases outward; immediate domain state mutation.
- Undo: restores original variant/quantity with short return animation, announced by assistive technology.
- Simultaneous rapid additions: multiple independent visual tokens, no shared animation lock.
- Reduced motion: skip flight, 3D and slides; all state, counts, button focus and Undo work instantly.
- Bag is local preview until the live catalog/merchant is ready. Do not label a preview as a placed order. Checkout must be blocked without verified price, availability and permissions.

## Critical acceptance

1. No `href` to outside checkout hosts appears in any customer-facing TSX component.
2. All primary CTAs and buttons lead to actual first-party routes, with clear unavailable states before the backend is connected.
3. Test bag: add one, add again, decrement, remove, undo exact quantities, switch location (bag retained separately).
4. No orders and no payment API calls occur from preview actions.
5. Server-side quote, price and fulfillment checks mandatory before enabling checkout.
6. Staff and wholesale partners receive separate RBAC-protected experiences; do not reuse consumer roles.
