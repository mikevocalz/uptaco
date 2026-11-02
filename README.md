# Uptaco — website, ordering and operations

Uptaco's **website-first** digital restaurant platform: editorial brand experience, Harlem / Midtown menus, pickup and delivery ordering, rewards, catering and staff operations.

## Status (November 2, 2026)

This branch adds a **schema-and-domain foundation**, not a live website or production POS integration. It deliberately contains no API secrets, merchant credentials, fabricated menus or real customer records. The website implementation should be brought in from [Spatial Solito Starter](https://github.com/mikevocalz/Solito-NativeUI-Starter) after version/adapter compatibility checks.

- `packages/commerce`: cross-platform-safe, pure TypeScript order source, pickup, dispatch and loyalty contracts, including Node tests
- `packages/payload`: Payload CMS **4.0.0-beta.6** collection schema for the restaurant admin (pending authentication wiring and migrations)
- `docs/commerce`: provider integrations, order lifecycle, privacy, migration and verification gates
- `docs/site`: Uptaco-specific visual direction, screen map, semantic UI and Kinetrell constraints

## Source of truth

Uptaco operates Square online pickup, marketplace delivery and catering flows. Confirm the merchant account's **actual integrations and contractual API permissions** before enabling any webhook, checkout, courier request or automated menu mutation.

**Do not mark this branch production-ready:** provider OAuth, Better Auth, checkout, signature verification, migrations and site/runtime test suites are not implemented yet. Keep the current ordering links available until each new path is proven.

## Review

1. Read `docs/commerce/INTEGRATIONS.md` and `docs/commerce/ORDER-LIFECYCLE.md`.
2. Review `packages/payload/src/collections.ts` with Uptaco operations.
3. Run `pnpm --filter @uptaco/commerce test` on Node 24+ after dependencies are installed.
4. Inspect the recommended PR sequence in `docs/commerce/IMPLEMENTATION-PLAN.md`.

**Architecture:** Solito + Expo/Next; `@acme/ui/html` semantic components; no raw HTML in feature screens; Moyo's adaptive content panes (not web side rail); Zustand shared state; Kinetrell cross-platform motion backed by GSAP/Lenis on web and Reanimated on native; Rive only for authored animation; Payload v4 CMS; Postgres and Better Auth adapter to be integrated behind reviewed boundaries.
