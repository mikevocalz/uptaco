# Uptaco website & admin — complete screen contracts

All routes are planned; none is claimed implemented. Shared shell: SSR-friendly semantic @acme/ui/html; persistent web header with location and bag; narrow web bottom controls only where supported; NO native physical-right rail on web. Native foldable follow-on keeps physical-right rail per pinned skill, independent of width.

## Consumer (location → real order)
| Route | Screen, critical content, primary action | Non-happy state |
| --- | --- | --- |
| / | Actual Uptaco brand, food proof, Harlem pickup | Closed/unavailable provider, slow JS, reduced motion |
| /locations | Verified Harlem/Midtown address and choice | Hours unavailable; no assumed "open" |
| /locations/harlem | Harlem photos, pickup/delivery, location notes | Sold out or closed provider |
| /locations/midtown | Midtown photos and current move notice | Schedule conflict and unavailable merchant data |
| /menu | Filterable catalog from Square, switch categories | Empty category, sold-out, stale prices |
| /menu/[slug] | Image, description, allergens, required modifier groups, changing price | Invalid modifier min/max, unavailable product |
| /bag | Location, item list, fees/tips, pickup time, checkout | Wrong-location items, no service, fees changed |
| /checkout | Guest/sign-in choice, pickup/delivery, verified payment | Payment pending/ambiguous, no second charge |
| /order/[token] | Receipt, pickup/driver state, provider truth | Expired token, canceled/refunded, stale order |
| /account | Optional Better Auth sign-in | Failed/passkey unavailable, accessibility |
| /account/orders | Last orders, repeat with availability checks | No orders, removed item, expired account |
| /rewards | Square program rules, points, redeemable rewards | Program not activated, disconnected or unverified |
| /gifts | Gift cards, schedule, purchaser/recipient, balance | No scope, payment declined, bad destination |
| /story | Original founder/process storytelling | Media missing without blank layout |
| /contact | Contact choices and accessible enquiry | Offline, throttled, submit error |

## Catering and wholesale
| Route | Screen | Validation |
| --- | --- | --- |
| /catering | Real packages from HoneyCart, headcount, date | Lead-time checks per item; catering pricing provider-controlled |
| /catering/quote | Group type, number of people, desired date, location, contact | Consent, timezone, no false quote or confirmed slot |
| /cafe-partners | Café wholesale menu, cold chain and Odeko order path | Apply workflow gated, no retail cart masquerade |
| /cafe-partners/apply | Partner business information and approval request | Server validation + privacy; no automatic B2B account approval |
| /help | Delivery/pickup policies, allergens and FAQs | Contact support when upstream info absent |
| /accessibility | Accessibility statement and support channel | Editable through reviewed content blocks |
| /privacy and /terms | Approved legal pages | No placeholder legal text published |

## Staff / Payload admin
- Overview: location-scoped current operational queue; counts are a compact line, not a wall of cards.
- Orders: channel/source, paid status, ready time, pickup actor, dispatch authority, exceptions; keyboard-accessible table.
- Order detail: immutable item/price snapshots, payment/fulfillment timeline, provider refs, idempotent actions and audit.
- Kitchen display: grouping by prep deadline, allergen labels, Ready and Handed Off separated, zero fictional ETAs.
- Courier console: one active merchant dispatch per order, quote expiry, courier arrival, proof of handoff, fallback.
- Menu: per-location and time-window availability sourced from Square; scheduled campaigns in Payload do not override POS truth.
- Rewards: Square-backed read-only points (when enabled), promotions and immutable reconciliation events.
- Gifts: Square Gift Card references only; no full card numbers or PINs.
- Catering: inquiries, lead-time exceptions, HoneyCart order links; quotes require staff authorization.
- Café partners: approve wholesale account, external Odeko mapping, recurring delivery requests.
- Content Studio: site pages, media rights, brand components, SEO, seasonal campaigns.
- Analytics: direct order conversion, pickup failures, delivery fees, revenue by source and location; provider reconciliation.
- Permissions: owner, manager, kitchen, cashier, support, marketing and customer, with no self-promotion.

## Interaction states required on EVERY screen
Initial/loading, empty-first-run, empty-filtered, partial/stale, offline, permission denied, validation errors, timeout retry, keyboard/focus, 320–1920 widths, RTL/zoom stress, reduced motion and unexpected platform return. Keep drafts/session identity through resize and fold (when native follow-on ships). Explicit "pending, not confirmed" for ambiguous payments and provider orders.
