# Delivery and CMS implementation plan

## Current branch
Schema-first foundation only. Node tests for the pure order domain are included; **no live APIs, credentials, checkout, admin deployment, site frontend or production courier dispatch**. This must remain a draft PR until hardened.

## PR sequence
1. **Base (this PR):** verified Payload v4 beta matching package pins; collections for users, pages, locations, products, modifier groups, orders, fulfilments, payments, courier attempts, partner mappings, rewards, webhooks and audit. Review fields for minimal PII, access rules and unique upstream identity.
2. **Authentication:** port NYC-MON's `@delmaredigital/payload-better-auth@next` adapter with an exact peer-compatible v4 build; staff 2FA and role checks; separate customer access/guest token scopes. Never let self-registration assign staff roles.
3. **Postgres:** reviewed additive migrations, role-to-table permissions, unique `(origin, externalLocationId, externalOrderId)`, partial unique index for one active delivery, reward ledger unique source, immutable event logs. Test twice, take snapshot before production rollout.
4. **Square:** read-only catalog/locations/order sync first; webhooks with signatures and reconciliation; matching item variation/modifiers; then own-site pickup order creation, payments and POS visibility, provider-authoritative price.
5. **Marketplace:** verify partner grants. Import Uber Eats/DoorDash/Grubhub orders via ONE verified provider path (Square **or** middleware), not two independent feeds without identity linking. Wire pickup versus third-party courier flags and accept/deny webhooks as allowed.
6. **Courier:** Uber Direct sandbox quote/dispatch/webhook/tracking; optional DoorDash Drive access; operations UI for manual fallback, expense, proof of pickup/delivery, and a replay-safe outbox.
7. **Web frontend:** clone/reconcile Spatial Solito source; implement Uptaco-branded, semantic `@acme/ui/html` routes and verified Moyo adaptive content panes; web never uses native rail. Use Kinetrell with GSAP/Lenis, Reanimated on native; Rive character only when approved. Checkout must remain functional reduced-motion.
8. **Rewards:** payment+fulfilment-gated signed point ledger, earn/redeem/reversal, expiry, tier, coupon controls and customer consent checks.
9. **Operational launch:** merchant approval, integration QA, signature attack tests, duplicate order tests, accessibility, SEO, Cwv and device/viewport matrix, accounting reconciliation and human walkthrough.

## Package selection checked Nov 2, 2026
- npm `payload` **beta tag 4.0.0-beta.6**; npm default `latest` points to **v3.92.1**. Do **not** run unqualified npm latest when requesting v4.
- Align `payload`, `@payloadcms/db-postgres`, `@payloadcms/ui` etc. at **exactly 4.0.0-beta.6**; no v3/v4 mixing.
- Next `@delmaredigital/payload-better-auth@next` supports Payload 4 betas; pin the **resolved exact version** after reading the current peer dependency metadata. Authentication is not wired by this PR.
- Expo SDK/React Native native dependencies must follow a compatible SDK train; npm newest is not automatically Expo compatible.
- Kinetrell source repo: https://github.com/mikevocalz/Kinetrell . Its npm/Git package version requires exact lock/pin confirmation. Don't silently introduce a second motion library.

## Acceptance cases
- Square pickup: chosen location + correct timestamp, kitchen receives only 1 order.
- Marketplace pickup: customer, not courier, is listed as collector.
- Uber marketplace delivery: no Uber Direct call.
- Uptaco website courier delivery: at most 1 active dispatch, re-quote on expiry, acknowledged webhooks.
- Duplicate same provider ID: creates 1 internal order; Square mirror maps to existing marketplace order.
- Out-of-order/cross-provider webhook: cannot regress terminal delivery state.
- Refund: correct partial/full ledger reversal and no double refund.
- Store offline: no promised pickup time or accepted fake order.
- Location swap: cart revalidation, no silent wrong location.
- Loyalty: guest/marketplace not auto-linked to personal account; permission rules.
- Staff role isolation: customer cannot edit any order, reward balance, integration or published page.
- Native/website: semantic focus and reduced motion; test at 320, 390, 768, 1024, 1440 and 1920 widths.
