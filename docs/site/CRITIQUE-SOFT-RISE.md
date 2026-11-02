# Uptaco Organic Redesign — Visual Critique

Sources: user's attached **web-designer-pro.zip**, especially `SKILL.md`, `references/redesign.md`, `slop.md`, `finish.md`, `directions.md`, `type.md`, `imagery.md` and `critique.md`. This is a self-critique against the kit bar; **no independent design director score is claimed**.

## Baseline before this PR

Old merged site: box around gooey official Uptaco black wordmark, black offset shadows, thick black borders and repeated card grids, tight uppercase headings, all surfaces treated like neo-brutalist poster panels. The user rejected these choices. Preserve the actual logo, food imagery, location pages, working first-party routes, bag motion and accessibility; replace only the aesthetic grammar and copy.

## Direction exploration

Three **rendered first-screen directions** are available via noindex internal routes: `/design-preview/soft-rise`, `/design-preview/counter-editorial`, `/design-preview/morning-splash`. The GitHub screenshot workflow captured each at 390×844 and 1440×900, alongside every normal site page. No fake products or invented prices.

- **Winner: Soft Rise.** Lavender-and-peach soft colour, authentic BEC cut-out, official sculptural Uptaco logo completely unboxed, order action in the first screen, warm organic contact shapes. Most faithful to the actual wordmark and physical breakfast experience.
- Counter Editorial: strong typography and restraint, but a little less distinctive as Uptaco.
- Morning Splash: visually energetic and memorable, but deep purple plus orange reads too promotion-like for a daily ordering homepage.

The final chosen work borrows the warm, restrained supporting type from Counter Editorial and keeps Soft Rise's organic/photo hero. The original site is a rejected direction, not one of the three concept studies.

## Round 1 — Soft Rise with bubble headings everywhere

Visual evidence: first successful branch site screenshot job at commit `996fb3bca`; 45 existing responsive page and interaction checks passed.

| Line (1–5) | R1 | R2 | Evidence / main change |
| --- | ---: | ---: | --- |
| Concept on the page | 4 | 4 | Product imagery + large soft lavender field correspond to actual Uptaco breakfast and gooey logo |
| Not the category average | 3 | 4 | Unboxed sculptural brand, asymmetrical photo and organic shape, no generic restaurant stock hero |
| Not a slop face/rut | 3 | 4 | Removed hard shadows, but R1 had same soft rounded display face everywhere; R2 reserves it for the hero |
| First screen | 4 | 4 | Actual taco, breakfast identity and order in the first viewport on mobile/desktop |
| Typography | 2 | 4 | R1 Fredoka on every heading felt childish; R2 uses restrained Bricolage supporting display with Fredoka only for the emotional hero |
| Color | 4 | 4 | Lavender, peach, orange and violet derived from existing Uptaco brand references |
| Imagery | 3 | 3 | Actual published BEC and location images are present, but a complete product photo library is still missing |
| Depth and finish | 3 | 4 | Photo overlaps colour shape; floating actual order composer; round 2 refinement of excessive visual noise |
| Below the first screen | 3 | 3 | Real location photos and catalog states, but some text-led sections can still use richer Uptaco assets |
| Craft | 3 | 4 | No logo badge; softer controls; 51 screenshot/interaction checks pass at 390/1440 |
| Responsive | 4 | 4 | Separate mobile photo placement and safe-area order tabs; 390/1440 screenshot tests clear |
| Everyone's computer | 2 | 2 | Firefox/WebKit, Windows scaling/high contrast, RTL and translation stress not yet verified |
| Signature interaction | 3 | 3 | Kinetrell add/removal/undo is an actual non-blocking cart behavior, but its filmstrip not visually audited yet |
| Copy and conversion | 3 | 3 | Clear location and order action; R2/R3 softened ALL CAPS headlines but provider-sensitive promises remain gated |
| Screenshot test | 3 | 4 | R2 no longer looks boxed/neo-brutal; visual first-screen still needs client acceptance |

Scores above are subjective design notes, not independent grades or a guarantee of WDP's stop rule.

### Specific Round 1 asks addressed in Round 2

1. Unbox real gooey Uptaco mark, remove thick outlines/shadows: **landed**.
2. Use more original Uptaco imagery and fluid natural geometry: **partial**, authentic BEC/locations done; full product set pending verified assets.
3. Let logo own expressive shape, replace bubble headings elsewhere with Bricolage: **landed**.
4. Make the order composer the one truly floating functional surface: **landed**.
5. Review all normal site screens at both widths and add three distinct rendered directions: **landed for Chromium**, more platforms pending.

### Round 2 refinements

Further shortened the typography register by changing selected large uppercase customer headings to natural sentence case. The three direction studies render in CI at the two main widths; their responsive smoke test remains a gate. The review branch stays draft until client approves a direction. Treat all payment, member and courier operations as separately disabled until verified.

## Still required for production approval

- Client review/acceptance of the final direction, official transparent master logo and approved imagery licensing.
- Real full merchandise imagery for most menu cards, and verified menu prices/ingredients from Square.
- Web Designer Pro cross-platform matrix: 320 / 390 / 768 / 1280 / 1440, Windows 125/150% and forced colors, Linux, Android, Firefox/WebKit/Safari, keyboard and reduced motion, and content-length stress.
- Kinetrell filmstrip and a second independent/specialist critique if available.
- Remove temporary noindex design-review routes before release.
- Checkout/auth/admin are separate backend readiness gates; a polished screen is not a working payment integration.
