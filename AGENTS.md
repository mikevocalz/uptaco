# Uptaco contributor and coding-agent rules

## Before coding
Read the local user-provided **Web Designer Pro** skill where available, the relevant `expo/skills`, `mattpocock/skills`, `Argent/agent-device`, `coreyhaines31/marketingskills`, `pbakaus/impeccable`, `petergyang/no-ai-slop`, Payload v4 release/migration docs, Square Orders docs and relevant courier provider docs. Inspect installed package manifests/lockfiles; never claim a skill was loaded if not retrieved.

For foldables, tablets, spatial XR and inspector work, read the pinned `mikevocalz-foldable-layouts` source:
https://github.com/mikevocalz/universal-spatial-starter/blob/256a97b132803fd2fb8049f7a120cef9cb641f41/.agents/skills/mikevocalz-foldable-layouts/SKILL.md

## Hard boundaries
- **Website first**, not a native-app launch.
- No raw HTML in application feature screens. Use semantic `@acme/ui/html` wrappers from Spatial Solito; web DOM implementation is confined to the UI library. Keep Expo `@expo/ui` Jetpack Compose/SwiftUI behind native adapters.
- Preserve proper landmarks, keyboard controls, focus, order and accessible status messages.
- Reuse Moyo's **adaptive panes** where their real exports are verified. Web uses a persistent header and mobile sticky bag, **never** a native physical-right rail. Foldable/tablet native builds keep the physical-right rail by hardware family; content pane fit is independent.
- Zustand for app state; provider operations and long-running handles belong outside presentation.
- Kinetrell is the motion authority. Use `kinetrell` definitions and actual web/native adapters, not a competing animation stack. Native is Reanimated, web GSAP/Lenis as needed; Rive owns mascot animations. Respect reduced motion and don't delay checkout.
- All price, availability, tax, tips, discounts, and courier charges are calculated/verified **server-side**; client displays only.
- Marketplace source and dispatch authority are independent. Never dispatch another Uber Direct/DoorDash Drive courier for an Uber Eats/DoorDash marketplace delivery unless the merchant's explicit self-delivery arrangement authorizes it.
- Orders, payment events, loyalty ledger, webhook records and dispatch requests must be idempotent and auditable. Verify webhook signatures; no secrets or full card data in CMS.
- A marketplace order's customer identity is not automatically a loyalty account; require consent and contract-permitted linking.
- No invented products, prices, photos, store hours, permissions or availability.
- Payload v4 packages move **together** on exact verified versions. Prefer the latest validated v4 beta over mixing `latest` (v3), `beta`, and `canary`.
- Never enable POS, payment or dispatch writes without the restaurant's merchant approvals and sandbox/production credentials.

## Review gates
Typecheck, unit tests, webhook replay/idempotency, adapter contract tests, accessibility audit, real-device responsive and fold posture checks when applicable, payment sandbox, provider sandbox, migration rehearsal, and human acceptance. State what ran. PRs should be narrow, detailed, and not auto-merged.
