# Uptaco — Complete Navigation, Roles and Screen Inventory

Status: design and implementation contract, November 2, 2026. The live website is the priority. Customer accounts, staff admin, and partner portals are PLANNED until verified authentication and commerce integrations exist.

## The five fixed customer destinations

| Slot | Guest | Signed-in customer | Destination |
| --- | --- | --- | --- |
| 1 | Home | Home | / |
| 2 | Menu | Menu | /menu |
| 3 (raised orange) | **Order** | **Order** | /order or native action sheet |
| 4 | Locations | Locations | /locations |
| 5 | **More** | **You** | /more or /account |

The bag is a contextual accessory, not a sixth destination. It appears only after first-party checkout is operational. No login wall for food purchase. Guest checkout with a signed order-status token is the default.

## Platform navigation

- Mobile website below 600 CSS pixels: Uptaco top header (brand, selected location), five bottom tabs, safe-area bottom padding and 44–48px targets. NO duplicate scrolling top nav.
- Intermediate website 600–839: brand, Explore, selected location and Order CTA in top header. No bottom tabs.
- Desktop website 840+: persistent semantic top nav: Menu, Locations, Catering, Café partners, Our story, location switch, Order CTA. The menu's category Master and cart Inspector are CONTENT panes, not global navigation rails.
- All web runtimes, including foldable browsers: no global right-side rail.
- Native ordinary phone: five bottom tabs. Center Order launches @expo/ui native Compose/SwiftUI sheet.
- Native foldable/tablet/headset: physically RIGHT rail in LTR and RTL, including narrow folded cover. Five same destinations plus contextual bag when real checkout runs. Rail actions avoid reported hinges; panel count adapts separately to usable content space.
- Unknown native hardware family: preserve unresolved bootstrap shell, do not permanently classify it as a phone.
- XR uses optional spatial product detail/preview; secure 2D checkout stays usable without XR.

## Homepage, menu and purchase screens

| Screen | Guest | Signed-in | Important exception |
| --- | --- | --- | --- |
| / Home | Editorial food + direct order | Optional repeat previous verified order | Real photography/closed store |
| /menu Browse | Catalog/categories | Same + saved markers | Sold out, stale catalog |
| /menu/[slug] Customize | Required modifier choices and allergen notes | Favorite and reorder | Price/availability recalculation |
| /order | Choose Harlem/Midtown, Pickup/Delivery | Same choice, remembered preference | Courier coverage, store closed |
| /bag | Only when native checkout enabled | Same | Empty, incompatible cart/location |
| /checkout | **Guest checkout allowed** | Faster checkout with opted-in fields | Payment pending, no duplicate charge |
| /order/[token] | Valid scoped receipt token | Owner session OR scoped token | Revoked token, refunded/cancelled |
| /locations | Harlem and Midtown list | Preferred location highlighted | Do not infer geolocation consent |
| /locations/harlem | Store, verified hours, pickup | Same | Closed/no available slot |
| /locations/midtown | Store, verified hours, pickup | Same | Closed/no available slot |
| /more | Service directory, help, optional sign-in only when auth works | Discover from personal account | No fake account link |
| /story | Public brand narrative | Same | Missing media |
| /catering | Public provider ordering | Same; past quotes if integrated | Product-specific 36/48/72h notice |
| /catering/quote | Inquiry with date/headcount | Saved inquiry when authorized | Quote is not a confirmed order |
| /catering/group/[token] | Scoped invite where group orders enabled | Scoped invite | Expired/locked group session |
| /cafe-partners | Public wholesale overview | Public | No wholesale pricing |
| /cafe-partners/apply | Guest partner application | Same | Duplicate and pending review |
| /rewards | Public explanation only if program active | Square-backed balance/opt-in | Loyalty inactive |
| /gifts | Gift purchase only after provider approval | Same + history | Funding/activation failures |
| /help, /faq, /contact | Public help | Public support | Rate limit and provider support |
| /privacy, /terms, /accessibility | Public verified legal/accessibility content | Public | No template legal placeholders |

## Guest versus member identity

Guest / More: Explore order, locations, catering, wholesale, story and help. Optional sign-in CTA must be HIDDEN until Better Auth is actually connected; no reward balance, no false saved-order history. Guest checkout should never require marketing consent.

Member / You: top greeting (verified user data), eligible active order, repeat last order (with live revalidation), verified rewards card only if program enabled; then Orders, Favorites, Rewards, Gift Cards, Profile, Addresses, Preferences, Notifications, Security, Privacy/Delete, Sign out.

Account routes to plan: /sign-in, /sign-up, /forgot-password, /reset-password, /verify-email, /auth/callback, /account, /account/orders, /account/orders/[id], /account/favorites, /account/rewards, /account/gifts, /account/profile, /account/addresses, /account/preferences, /account/notifications, /account/security, /account/privacy, /account/support. Gate with a real server-backed Better Auth session. Signed order tokens are separate from account credentials. Never trust a client role.

## Customer account page composition

Mobile: greeting and active order first, "Order your usual" only after a valid reprice, then personal sections in a simple list. Navigation remains Home/Menu/Order/Locations/You.

Wide web: persistent global header; account dashboard uses a context sidebar or Master pane for account categories, profile/detail in center, and optional active-order Inspector. This is content arrangement, not global web rail.

Native foldable/tablet: navigation rail is physically right; the account categories may occupy Master pane and account form/detail its own hinge-safe region. RTL changes reading order, not the rail's physical side.

## Staff console — separate Payload v4 admin

| Role | What the staff sees | Never automatically allowed |
| --- | --- | --- |
| Owner | Overview, Orders, Kitchen, Pickup/Couriers, Menu, Inventory, Catering, Wholesale, Customers, Rewards/Gifts, Website, Campaigns, Reports, Finance, Integrations, Locations, Team, Audit | Server access still enforced |
| Manager | Operational queues, menu/inventory, catering/wholesale, customers, gift/rewards, reports | Owner-only team/integration secrets |
| Kitchen | Kitchen queue, accepting/preparing/ready/handoff | Finance, CRM export, site editing |
| Cashier | Orders, customer pickup handoff and authorized POS actions | Arbitrary refund or staff management |
| Support | Orders, delivery exceptions, customer contact, catering cases | Full card data, unrestricted finance |
| Marketing | Website pages, approved media, campaigns, aggregate analytics | Customer PII, kitchen actions, payments |

Admin URLs and states: /admin, /admin/orders, /admin/orders/[id], /admin/kitchen, /admin/dispatch, /admin/dispatch/[id], /admin/menu, /admin/menu/products/[id], /admin/inventory, /admin/catering, /admin/catering/[id], /admin/partners, /admin/customers, /admin/rewards, /admin/content, /admin/campaigns, /admin/reports, /admin/payments, /admin/integrations, /admin/locations, /admin/team, /admin/audit.

Payload's WEB admin may use its own CMS internal sidebar; do not import the consumer navigation rail into the staff console. All writes are independently RBAC/location-validated, logged, idempotent when needed, and scoped by provider.

## Private café partner portal

Approved partner only at /partners. Destinations: Overview, Wholesale Catalog, Orders/Reorder, Scheduled Deliveries, Invoices, Team/Locations, Support. Account approval and wholesale pricing are separate from retail customers. Keep Odeko as verified fulfillment authority until integration rights exist.

## State contracts for every screen

Guest versus logged in; first load; loading skeleton; no results; sold out; stale/offline; processing payment; pending external provider; validation and accessibility errors; timed out; delayed courier; canceled/refunded; expired token; successful submission; saved state during resize, rotation, activity recreation and fold/unfold. Show no false business status or fake rewards.

Kinetrell: tab active indicator, ordering sheet, product-to-bag and adaptive pane transitions. Animations are decorative; never gate payment, status or accessibility. Rive Raffi can celebrate a VERIFIED successful order. No glow or gratuitous 3D in operational ordering.

## UI acceptance and rollout

Test widths 320/390/599/600/768/839/840/1024/1199/1200/1440/1600/1920, RTL, 200–400% text scaling, keyboard, focus, VoiceOver/TalkBack, screen-reader tab names, reduced motion, cart/session continuity, closed store and no provider credential. Native Surface Duo hinge and right-rail cases require real hardware verification.

First ship a usable guest storefront and order provider routing. Next first-party Square order/checkout, then approved Better Auth + member pages, then Square Loyalty/Gift Cards, corporate catering/group orders, partners and optional native/spatial surfaces. Do not publish nonfunctional account, gifts, rewards, wholesale or admin links.
