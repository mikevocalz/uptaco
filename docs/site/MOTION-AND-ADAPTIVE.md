# Uptaco motion / interaction implementation contract

**Source**: mikevocalz/Kinetrell, git-pinned at the same tested commit across web/native; Rive for authored Raffi animation. Avoid Framer Motion and ad hoc independent motion engines. Kinetrell definitions are in packages/experience/src/motion.ts (pending installing package and verifying its peer range).

### Motion semantics
- On add to bag: update store and accessible status first, run 440ms visual-only item clone transition and bag counter snap; never delay a validated action for motion.
- On option change: immediate price/matrix update plus 160ms compress/release, preserve focus and keyboard activation.
- Product sheet: 310ms entrance, layer safely above, focus trap only if modal, Escape/back returns focus to trigger; responsive pane becomes Inspector where enough room.
- Location switch: verify location-specific items and timing before transition, prompt on incompatible cart; don't clear cart silently.
- Successful order: static receipt on confirmed server state; 560ms Raffi celebration optional with reduced-motion still.
- Smooth scroll: Lenis only on editorial chapters when motion preference allows, no checkout, nested menu or touch hijack. Exactly one GSAP ticker owner. Kinetrell adapts same compiled definitions to GSAP web and Reanimated native.
- Reduced motion: no spatial item travel, no automatic parallax, no infinitely moving marquee, short immediate press states only. All actionable content present in SSR HTML before animation.

### Shell policy
Web any viewport: persistent semantic header, mobile web compact bottom actions as applicable; **no side rail on web**.
Native phone: bottom tabs. Native tablet/foldable/headset: physical RIGHT rail in both LTR/RTL, even narrow; content can collapse to single pane. Never infer hardware family from width alone. This follows the pinned mikevocalz-foldable-layouts skill and Moyo's adaptive pane semantics (re-read actual source before transplant).

### Responsive content
- 320–430: brand/logo, food, one dominant pickup action above fold; category carousel, accessible item sheet and sticky bag
- 768: two meaningful panes where content fits; item detail can be modal, not stretched
- 1024–1440: category master / item detail / cart Inspector only when all fit; never duplicate checkout
- 1920+: control measure and image crop, don't enlarge forms beyond readable widths
- Touch and pointer: haptics only native; tablet pen/keyboard focus works; any XR scene optional, lazy and after checkout; no sensor permissions for ordinary menu.

### Web Designer Pro approval gate
Run three **rendered** first-screen directions at 390/1440; choose based on brand evidence. Use 390/768/1280/1440 captures, 320px, Windows scaling/HC, Android, Firefox, Safari/WebKit, keyboard, dark only if intentionally designed, reduced motion, and scored two-round visual critique. These checks are NOT yet done in this branch.
