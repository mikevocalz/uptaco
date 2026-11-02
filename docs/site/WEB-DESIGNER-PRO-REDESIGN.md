# Uptaco — Web Designer Pro brand-led redesign

Status: **design review / draft**, 2 Nov 2026. Source skill supplied by the user: `web-designer-pro.zip`, including `SKILL.md`, `references/slop.md`, `finish.md`, `redesign.md`, `directions.md`, `type.md`, `imagery.md`, `critique.md`. The current branch is not approved or deployed.

## 1. The error we are correcting

Previously the site applied the developer's neo-brutalist style: Uptaco's **organic black wordmark** was trapped inside a square white tile with a black outline and hard offset shadow; food photography had thick black picture frames and arbitrary tilt; all customer screens inherited heavy borders, boxed UI, uppercase Helvetica and hard shadows. The logo's *own* sculptural softness was not reflected by the UI. That was wrong. The user explicitly rejected it.

### Keep / lose

Keep: verified Uptaco logo from its public website, authentic BEC photography and site location photos, soft lavender/orange brand notes, Harlem and Midtown, internal order/menu/location/customer routes, guest checkout requirement, Kinetrell cart motion, real copy/products, responsive architecture and first-party ordering. Nothing routes customers to a marketplace, Square-hosted checkout, HoneyCart, Odeko or a WebView.

Lose: boxed logo, pseudo-neo-brutalist outlines and offset drop shadows, angular card framing, forced uppercase/shouty type everywhere, fake thick divider bars, original hard-edged menu/order/checkout controls, secondary visual "sticker" motifs with no Uptaco justification. Replace with organic edges earned from the real wordmark, typography with a warm grotesque and a more premium material/photography rhythm.

Unknown: exact official brand palette/allowed marks, image rights for production, official font/master vector logo. Provisional tokens must not be presented as an approved style guide.

## 2. The three first-screen directions — implemented as noindex review routes

| Direction | Source / ground / typography / richness / grammar | What it does | Status |
| --- | --- | --- | --- |
| **Soft Rise (recommended)** | Place/material / lavender and pale peach / Fredoka *only for the hero*, Bricolage for supporting text / real BEC photography / scroll-story | Unboxed black sculptural mark, single large rounded headline, an asymmetric food-blob photograph, an actual floating order composer, apricot "made fresh" object and quiet pages below | Main CSS system, screenshot QA required |
| **Counter Editorial** | Printed matter / warm near-white / Bricolage display / type/photo overlap / editorial poster | Quiet nav and unboxed identity, large offset editorial line, photo crosses it, reduced chroma, sparse functional content | Isolated study route |
| **Morning Splash** | Colour/material / deep violet with tangerine / warm full-width grotesque / expressive inverted official mark + food / colour-field | Rich bolder design for promotions; hero feels like a soft sculptural ribbon rather than cards | Isolated study route |

Temporary review URLs, not navigation: `/design-preview/soft-rise`, `/design-preview/counter-editorial`, `/design-preview/morning-splash`. They are not linked in the customer shell; remove before production. CI visual smoke captures all three at 390×844 and 1440×900 alongside the rest of the actual site.

## 3. Soft Rise art direction

**Concept:** A freshly pressed breakfast taco, expressed as fluid colour/material rather than a brutalist brand sticker.

- Identity: official current black Uptaco sculptural wordmark, no bounding tile, no border/shadow. The source image's opaque white background is compositionally blended on pale surfaces using CSS `mix-blend-mode:multiply`; production should use an approved transparent master asset instead of depending on blend mode.
- Ground: warm ivory and Uptaco-inspired lavender; pale peach wraps the real product photography. Orange is a warm active ingredient, deep violet is UI ink/CTA.
- Display: self-hosted Fredoka Variable (only the first-page emotional moment) and Bricolage Grotesque Variable elsewhere. Rounded does *not* mean bubble lettering everywhere. Both pinned at fontsource 5.3.0 (OFL) until the restaurant provides custom commercial type.
- Surfaces: cards only when they earn depth (order composer, meaningful customer panels), otherwise whitespace and softly rounded visual backgrounds. Borders generally 0; use subtle 1px lines for dense operational data when needed, never thick 3px black frame. No hard-offset shadows.
- Imagery: Uptaco's real published BEC image, Harlem/Midtown restaurant images, with organic crop; do not fabricate menu dishes or use stock food masquerading as Uptaco. Introduce original approved product photos before a real merchandising launch.
- Content: locations + fulfillment choice in the first viewport, gallery of real menu item names, genuine brand story, catering and café partner offerings. Do not invent opening hours, discounts, checkout totals, reward balances or customer records.
- Motion: Kinetrell stays the authority; meaningful product-add/remove/undo, softer spring/squash, no forced animations when reduced motion is requested.
- Navigation: web top header and compact mobile tab bar, no global right rail on web. Native phone tabs and foldable/tablet/headset physical-right rail remain a separate verified platform follow-on.

## 4. Critique protocol and evidence

The old site's visual screenshot review and first Soft Rise production build are available from GitHub Actions. **Round 1** subjective scores, self-critique against the ZIP's 15-line rubric: Concept 4, category distinction 3, slop/rut 3, first viewport 4, typography 2, colour 4, imagery 3, depth/finish 3, below fold 3, craft 3, responsive 4, platform matrix 2 (not run), signature 3, copy 3, screenshot test 3. *Not done.* This is intentionally not an independent critic score.

Round 1 corrective actions: unbox logo, eliminate harsh outlines/offset shadows, adopt natural photo blob/multi-plane layout, apply owned color, preserve cart functionality, and replace repeated cartoon display typography with a warm grotesque (Round 2). To reach the ZIP's bar, inspect all review PNGs at mobile and desktop, run the broader Windows/Safari/Firefox/high-contrast matrix, collect the client-approved logo master and menu image library, and do an additional full-page critique with no FAILs.

Do not claim all 22 screens or the entire brand are complete just because Next.js and the 45+ visual smoke checks pass; production transactional, member and staff integrations remain separately gated.
