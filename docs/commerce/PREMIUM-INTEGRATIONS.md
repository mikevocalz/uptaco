# Additional integrations and sourcing plan

Research checked November 2, 2026. These are integration options, NOT connected services.

## The high-value Square-native path
Square for Restaurants supports direct Uber Eats and DoorDash channel connections, menu/price/availability sync and order flow into POS, KDS and printers. Confirm Uptaco's plan, merchant ownership, two location IDs and any existing middleware before activating; **activating can disconnect a current integration**. A one-time assisted Square audit is required.
Official: https://squareup.com/help/us/en/article/8515-set-up-uber-eats-integration-with-square
https://squareup.com/help/us/en/article/8518-integrate-doordash-with-square

Square Online has **group ordering** for eligible Plus/Premium plans: owner creates shareable collective cart, participants contribute, organizer pays. Don't build a separate simultaneous cart unless native capability and subscription is confirmed.
https://squareup.com/help/us/en/article/6859-checkout-options-with-square-online-store

Square Loyalty API reads account balance, accrues/redeems reward points, promotions and history. It **does not create the underlying seller loyalty program**—that is configured by merchant inside Square. Source of truth MUST be exactly one ledger. If Square Loyalty is enabled: Square balance + Payload read mirror/campaigns and adjustment audit, not a second Points system.
https://developer.squareup.com/docs/loyalty-api/overview

Square Gift Card APIs support digital gift creation and redemption. A created card starts pending and needs activation through a funded gift card activity. **Never store GAN/PIN or raw gift numbers** in Payload. User-facing gift cards and scheduled delivery wait until merchant Gift Cards and payment capabilities are approved.
https://developer.squareup.com/reference/square/gift-cards-api/CreateGiftCard
https://developer.squareup.com/docs/gift-cards/redeem-gift-cards

Square Online supports date-based preorders (Plus/Premium) and scheduled pickup separately. Only make a schedule promise if the *current provider* has capacity and confirms the slot. Conflicts need a proactive recovery UI.
https://squareup.com/help/us/en/article/8285-sell-items-as-preorders-with-square-online

Square's Subscriptions API can support a future coffee/morning membership. **Do not launch a subscription before measuring retention and modeling redemption costs, cancellation rights and capacity.**
https://developer.squareup.com/reference/square/subscriptions-api

## Existing Uptaco operations
- Harlem verified Square-hosted pickup: https://uptaco-harlem.square.site/
- Midtown verified Square-hosted pickup: https://uptaco.square.site/
- Uptaco website: https://www.uptaco.nyc/locations
- Catering provider HoneyCart: https://uptaco.gethoneycart.com/
- Café wholesale: existing Odeko relationship documented at https://www.uptaco.nyc/cafe

HoneyCart published products include pastry and cheese bread packs with 48/72-hour lead times, and a cold-brewed matcha box with a 36-hour lead time. Model each item/date/time with its own cutoff and fulfillment constraints, not a single global 24-hour banner.

## Other candidates (do NOT install by default)
- Resend: transactional email order receipts, gift notices, catering status, consented lifecycle campaigns; signed server-only triggers, suppression and dedicated branded domain.
- Google Business Profile and Apple Business Connect: correct hours/location/menu URLs, local SEO and maps.
- Analytics: first-party events with consent-aware attribution and no raw PII in analytics payload.
- Cartwheel or Nash: optional courier orchestration when Square's delivery partnership cannot cover needed operational conditions.
- Deliverect or Otter: only if Square direct marketplace channels are unavailable or lacking required workflows; avoid an unnecessary parallel source of truth.
- QR-based in-store ordering: possible with Square but only after observing store flow and staff needs; no new restaurant tablet requirements without evidence.
- Dine-in reservations: not a first-order feature for a breakfast pickup restaurant; avoid bloating the primary order flow.

## Approval matrix
For each integration record owner, exact product, contract, merchant account, approved scopes, secret vault path, webhook verification, production/sandbox endpoints, source-of-truth, cost per order, staging test, failure rollback and operational owner. Never activate by merely setting a Payload boolean.
