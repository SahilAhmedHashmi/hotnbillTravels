# Website Architecture — Hornbill Journeys

## 1. Purpose
This project is a premium, editorial-style travel website for Northeast India. It is designed to feel curated, luxury-led, and narrative-driven rather than purely transactional.

The current implementation focuses on:
- immersive destination storytelling
- route-based experience and package discovery
- a multi-step booking enquiry flow
- a polished, black-and-gold visual system

## 2. Tech Stack
- React 18+
- Vite
- React Router DOM
- Custom CSS and CSS custom properties
- Static local data modules (no backend or CMS in the current build)

## 3. Project Structure

### Top level
- package.json — Vite scripts and dependencies
- index.html — app mount point and global page shell entry
- public/ — static assets such as images and local media
- src/ — application source

### Core app folders
- src/main.jsx — React entry point
- src/app/router.jsx — route definition for the full site
- src/layouts/RootLayout.jsx — shared app shell with navbar, footer, and global effects
- src/pages/ — route-level page components
- src/components/ — reusable UI blocks grouped by section
- src/data/ — content and structured datasets
- src/services/ — booking and submission logic
- src/styles/ — global and page-specific CSS
- src/hooks/ — reusable behavior hooks

## 4. Routing Model
Routes are defined in src/app/router.jsx and use a shared layout wrapper.

### Public routes
- / — Home
- /destinations — destination catalogue
- /destinations/:slug — destination detail page
- /experiences — experience listing
- /experiences/:slug — experience detail page
- /fleet — vehicle listing
- /fleet/:vehicleSlug — vehicle detail page
- /packages — package listing
- /packages/:slug — package detail page
- /plan-my-trip — multi-step booking enquiry form
- /booking-confirmation — post-submission confirmation
- /travel-guides — placeholder/guide section
- /about — placeholder/about section
- /contact — placeholder/contact section
- /* — 404 page

### Routing conventions
- The app uses client-side routing with React Router.
- The layout restores scroll to the top on navigation.
- Hash-based anchor links are supported for in-page jumps.

## 5. Page Architecture
Each page is a route-level composition built from smaller reusable components.

### Home page
- Hero, stats, trust messaging, featured destinations, experiences, fleet, packages, testimonials, and final CTA.

### Destinations page
- Filterable destination catalogue.
- Atlas-style regional map experience.
- State-based content highlighting and interactive map selection.

### Destination detail page
- Hero image, summary, highlights, best time, itinerary ideas, suggested vehicles, gallery, FAQs, and related destinations.

### Experiences page and detail page
- Experience categories and detailed exploration pages for specific travel styles.

### Fleet and vehicle detail pages
- Vehicle showcase with pricing, suitability, and recommended use cases.

### Packages page and detail page
- Curated itineraries with overview, highlights, itinerary steps, inclusions, exclusions, FAQs, and related packages.

### Plan My Trip page
- Multi-step booking form with step-based UI, validation, and a submission workflow.

### Placeholder pages
- About, Contact, and Travel Guides currently use simpler placeholder-style content and are not yet fully expanded.

## 6. Component Strategy
The app favors reusable, content-driven components over one-off page-specific markup.

### Common patterns
- Cards for destinations, experiences, packages, vehicles, testimonials
- Shared button, icon, section divider, breadcrumbs, FAQ, gallery, reveal-on-scroll, and final CTA patterns
- Route-aware layout primitives such as navbar and footer

### Important UI components
- src/components/common/Button.jsx
- src/components/common/FAQ.jsx
- src/components/common/Reveal.jsx
- src/components/common/Gallery.jsx
- src/components/destinations/DestinationMapPlaceholder.jsx
- src/components/booking/* — step-based enquiry flow

## 7. Data Layer
Content is centralized in static JS modules under src/data.

### Data modules
- destinations.js — destination catalogue, states, highlights, related links, itinerary ideas
- experiences.js — experience categories and detail content
- packages.js — package itineraries and trip metadata
- vehicles.js — fleet inventory, specs, and pricing
- testimonials.js — homepage social proof content
- navigation.js — nav menu data
- footer.js — footer navigation and links
- contact.js — contact details and booking link targets
- stats.js and trustStats.js — homepage metric content

### Why this matters
This structure makes it easy to:
- update content without touching layout code
- keep page templates reusable
- swap or expand content while preserving the overall experience

## 8. Styling System
The site uses a custom CSS architecture instead of a UI framework like Tailwind.

### Style organization
- src/styles/tokens.css — design tokens and theme variables
- src/styles/global.css — base typography, animation classes, shared buttons, nav styling
- page-specific CSS files such as destinations.css, experiences.css, packages.css, booking.css, fleet.css, home.css

### Design directions
- rich dark background palette
- gold-accented buttons and labels
- editorial typography and generous spacing
- subtle reveal animations and transitions

## 9. Interaction Patterns
### Bookings
- The booking experience is handled by a stepper UI and a service layer.
- Form submission currently creates a local booking reference and prepares a message payload.
- The flow is designed to be eventually replaced by a real backend/API integration.

### Map experience
- The destinations page uses an SVG-based atlas-style panel rather than a static image placeholder.
- It supports hover, selection, state-based highlight behavior, and filter synchronization.

### Scroll and metadata
- The layout includes scroll restoration and route-based anchor handling.
- Page metadata is managed through a custom hook for title, description, canonical URL, OG tags, and structured data.

## 10. Content and Asset Strategy
- Destination and experience data include curated image references and descriptive copy.
- Some images are pulled from remote sources while others rely on files in public/.
- The project is content-first, which makes it suitable for future CMS migration.

## 11. Current Implementation Notes and Known Gaps
The codebase is functional, but several areas are still intentionally lightweight or placeholder-driven:
- contact details and phone/WhatsApp numbers are still placeholder values
- the booking submission flow is a front-end mock and not yet connected to a live service
- about/contact/travel-guides pages are still relatively skeletal
- some media asset naming and local image references may need cleanup if content is expanded

## 12. Recommended Workflow for Future Changes
If another AI assistant continues this project, the safest workflow is:
1. Update content in the appropriate data file first.
2. Reuse existing route-level page components rather than creating new page structures from scratch.
3. Keep styling changes aligned with the existing tokens and global classes.
4. Preserve the curated premium tone of the site.
5. Verify with npm run build after changes.

## 13. Build and Verification
Run locally with:
- npm install
- npm run dev

Production build check:
- npm run build

## 14. Summary
This is a polished, content-driven React/Vite website with a strong component architecture, a central data layer, and a premium visual language. The main strengths are its modularity, clarity of content ownership, and coherent route structure. The main gaps are operational ones: real booking backend integration and richer production content for some secondary pages.
