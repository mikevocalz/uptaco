# Uptaco site direction — restaurant-specific

## Purpose
Build the **Uptaco website**, not a generic restaurant app. The first viewport must make the brand recognizable and let a visitor choose **Order Harlem pickup** or an available alternative quickly. Future native/spatial surfaces share components but never block normal web ordering.

## Verified identity and approved-assets gate
The newer Uptaco brand uses its organic sculptural wordmark, purple/lavender and orange, and mascot Raffi. Its older red taco/sun mark is *not* the visual source for this redesign. Inspect Uptaco's Instagram posts alongside the agency files; Instagram images were not independently accessible in this session. Request approved vector logos, fonts, mascot rigs, restaurant photography and product photos. Don't reconstruct or invent a logo.

**Provisional swatches only**: lavender #C68EDB, deep purple #624681, orange #EC5B27, warm terracotta #AA6545, lilac #F2E5F5, ink #17121B. These are not official brand HEX values; confirm with the brand owner and contrast-test.

## Signature composition
**The Uptaco Counter**: enormous real wordmark, authentic food photography and layered lavender/terracotta shapes informed by the Harlem interior. Menu entry is immediate; hero is not a full-screen animation gate. A short, reversible, reduced-motion-aware add-to-bag transfer is the signature microinteraction. The cart count and accessible status message update independently of motion.

## Navigation
Home, Menu, Harlem, Midtown, Catering, Our Story, Café Partners, Contact; restaurant privacy/terms/allergen disclosures. Customer journey: location → pickup/delivery → product and required modifiers → bag → independently verified checkout → signed receipt/confirmed order status. Guest checkout must be possible where the connected provider allows it.

### Core screens
- `/`: branded food hero, Harlem ordering CTA, real popular products, locations, catering
- `/menu`, `/menu/[slug]`: category master / menu detail / bag inspector on wide web; accessible item view and sticky bag on phones
- `/order`, `/bag`, `/checkout`, `/orders/[token]`: real provider-backed transactions and lifecycle or verified external redirect
- `/locations/harlem`, `/locations/midtown`: real store details
- `/catering`, `/cafe-partners`, `/story`, `/contact`: business and editorial content, not throwaway cards
- `/account`, `/rewards`: only when verified consumer authentication/loyalty is enabled

## Accessibility & engineering
`@acme/ui/html` semantic wrappers, no raw DOM tags in screens. Mobile tap targets 44–48px; keyboard, screen readers, 200–400% zoom, focus and RTL checks. Responsive web header, sticky bag and adaptive content panes; **no side rail on web**. Lazy optional Viro/WebSpatial/Rive. Design for LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (targets, not measured outcomes).

## Motion system
Kinetrell motion definitions are the single source. Web runner: Kinetrell GSAP/Lenis integration; native runner: Kinetrell Reanimated 4.7+; mascot: Rive. Match semantic state and final rest pose on every runtime, and disable choreographed movement for reduced motion. Guard against Kinetrell's GSAP timelines initially hiding SSR content; animate *from* settled DOM, not from invisible server-rendered markup.

References: https://www.uptaco.nyc/ ; https://www.instagram.com/uptaconyc/ ; https://www.transformmagazine.net/articles/2025/new-manhattan-breakfast-taco-brand-reveals-bright-identity/
