# Uptaco premium experience release gates

Status: none of the checks below are marked passed without run artifacts.

### Required for website launch
- Brand: client-approved newer logo/typography/mascot/real food rights; no legacy red logo or guessed prices.
- First viewport: brand, food, store and legitimate order action visible at 320/390/768/1440 with JS delayed.
- Locations: Harlem vs Midtown correctly scoped menus and links, store closure, time zone, pickup cutoff and capacity; switch keeps or explicitly revalidates cart.
- Payments: merchant-owned Square sandbox/live boundaries, idempotency and pending states, no double charge, refunds/reconciliation.
- Loyalty: single Square or independent ledger decision; no double credit, earn on eligible paid/fulfilled events.
- Gift: activation, no storage of raw GAN/PIN; recipient and scheduled-email delivery verified; privacy handling.
- Group cart: only show when current Square entitlement is verified; test owner/joiner/expired link/pay.
- Catering: per-item lead-time 36/48/72hr cases, catering quote is never shown as confirmed until provider confirms.
- Wholesale: Odeko/partner segregation, no public wholesale pricing, account approval, no accidental consumer email exposure.
- Courier: marketplace-owned vs merchant-owned dispatch, quote expiry, one active attempt, signature checks, provider webhook replays and late events.
- Accessibility: WCAG 2.2 AA target, semantics, labels, clear errors, focus restoration, screen reader, 200–400% zoom; legal review of marketing consent.
- Security: CSRF, account role authorization, raw PII/secret boundaries, encrypted external IDs, outbox retries and abuse/rate limits.
- SEO: location-specific restaurant structured data only for verified info, canonical URLs, fast mobile images, no fictitious rating.
- Performance targets (measure on deployed builds): LCP < 2.5s, INP < 200ms, CLS < 0.1 at p75. No blocking Viro/WebGPU/Skia on ordering routes.
- Cross-browser: Chrome, Safari, Firefox, Windows high contrast/scaling, Android and iOS; capture screenshots and layout stress at 320,390,768,1024,1440,1920.
- Motion: no JS-hidden critical content; Kinetrell cross-platform rest state consistency, reduced-motion screenshots and no motion-dependent mutations.
- Staff: order queue stress 10,000 rows, keyboard, audit, out-of-order events, diner vs courier handoff and POS printer evidence.
- Launch control: staged rollout, monitoring and rollback to current live Square/HoneyCart links. A beautiful mock checkout must never absorb real money.

### Concrete automated test additions
- Capability routing tests: location mismatch, unsigned entitlements and unapproved provider links cannot enable checkout.
- Order tests: double submission, provider identities, out-of-order/duplicate events, canceled fulfillment, refunded loyalty, quote timeouts.
- End-to-end: menu→item→bag→checkout/payment sandbox→POS ticket→pickup receipt; group checkout if paid plan enabled.
- Merchant UAT: two stores, breakfast rush queue, offline POS, failed courier, scheduled catering and customer pickup.
