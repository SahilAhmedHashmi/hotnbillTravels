# Hornbill Journeys redesign audit

## Direct observation

- React/Vite SPA using React Router, static JS data modules, and hand-written CSS.
- Live routes: home, destination list/detail, experience list/detail, fleet list/detail, plan-my-trip, confirmation, guides, about, contact, and 404.
- The documentation describes package routes and components that are absent from the current source. Packages are therefore a documented intention, not preserved live functionality.
- Data inventory: 23 destinations in Assam, Arunachal Pradesh, Meghalaya, Mizoram, Tripura, and Sikkim; 10 experiences; 6 vehicles with existing specifications and prices.
- Nagaland and Manipur exist only as disabled shapes in the regional SVG. They are not in destination data. Old legacy HTML and unused image assets contain both states and must not feed the offered catalogue.
- Booking is a six-step client-side enquiry flow. It validates input, generates a local reference, and prepares a WhatsApp message. There is no backend submission.
- Contact details include a live WhatsApp number, while the email recipient in the booking service is explicitly a placeholder.
- Existing theme was a single dark visual direction. No persisted light/dark control existed.
- Existing homepage statistics and testimonials are unsupported by a verifiable source. They are excluded from the redesigned homepage.
- The app builds successfully with `npm.cmd run build`. CSS and JS remain a single bundle; route-level splitting is a later performance opportunity.

## Design inference

- The strongest product asset is not a decorative brand motif; it is the combination of route knowledge, vehicle choice, destination data, and a guided enquiry flow.
- A version system should share data and booking behaviour but allow composition, type, imagery, rhythm, and interaction to diverge.
- The SVG can show the full geographic region for context only if unavailable states are visibly non-interactive and copy describes the six-state service area.

## Implementation recommendation

- Persist `direction` and `theme` independently and apply them at the document root so every route participates.
- Keep form, map, data, routing, and metadata shared. Art-direct homepage hierarchy and CSS per direction.
- Do not reconstruct package claims from legacy HTML: it includes prohibited destinations and unverifiable ratings, reviews, group limits, and prices.
- Connect the booking service to a real endpoint and replace the placeholder email before production launch.
