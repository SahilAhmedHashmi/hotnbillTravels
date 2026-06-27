# 03_EXPERIENCES.md

# Northeast India Travel Website v2.0

## Experiences Implementation Specification

Read these first:

1. `docs/00_READ_FIRST.md`
2. `docs/01_HOMEPAGE.md`
3. `docs/02_DESTINATIONS.md`

---

# Goal

Create a complete, scalable experiences system.

The Experiences section should help users answer:

> “What kind of journey can I have in Northeast India?”

The purpose is not only to describe activities. The purpose is to help visitors discover destinations and packages based on the type of travel experience they want.

Examples:

* Adventure
* Wildlife
* Photography
* Culture
* Family Travel
* Romantic Getaways
* Road Trips
* Nature Escapes

Every experience should eventually guide users toward relevant destinations, packages, vehicles, and the booking page.

---

# Required Routes

Implement or verify these routes:

* `/experiences`
* `/experiences/:slug`

Examples:

* `/experiences/adventure`
* `/experiences/wildlife`
* `/experiences/photography`
* `/experiences/culture`
* `/experiences/family-trips`
* `/experiences/road-trips`

---

# Core Requirements

## Experiences Listing Page

Create a dedicated `/experiences` page.

This page should include:

* premium page hero/header
* short intro copy
* experience category cards
* recommended destinations for each experience
* final CTA section
* breadcrumb navigation

Purpose:

The page should allow users to browse by travel style instead of only by location.

---

# Experience Data Structure

Create a centralized experience data file.

Suggested file:

`src/data/experiences.js`
or
`src/data/experiences.ts`

Use the project’s existing language conventions.

Each experience object should include:

```js
{
  slug: "adventure",
  title: "Adventure",
  shortDescription: "For travelers looking for rivers, valleys, mountain roads and unforgettable outdoor moments.",
  longDescription: "Detailed experience overview...",
  image: "/images/placeholders/experiences/adventure.jpg",
  icon: "mountain",
  bestDestinations: [
    "cherrapunji",
    "dawki",
    "tawang",
    "dzukou-valley"
  ],
  relatedPackages: [
    "meghalaya-adventure-tour"
  ],
  idealFor: [
    "Friends",
    "Young travelers",
    "Outdoor lovers"
  ],
  highlights: [
    "Scenic road trips",
    "Waterfalls",
    "Clear rivers",
    "Mountain viewpoints"
  ],
  suggestedVehicles: [
    "innova-crysta",
    "tempo-traveller"
  ],
  faqs: [
    {
      question: "Is this experience suitable for families?",
      answer: "Some routes are family-friendly, while others are better suited for experienced travelers. Our team can help choose the right route."
    }
  ]
}
```

Use useful placeholder content.

Do not use Lorem Ipsum.

---

# Initial Experience Categories

Create enough experience entries to make the section feel complete.

Recommended initial experiences:

* Adventure
* Wildlife
* Photography
* Culture & Heritage
* Family Trips
* Romantic Getaways
* Road Trips
* Nature Escapes
* Monasteries & Spiritual Travel
* River & Waterfall Trails

---

# Experiences Listing Page Layout

Recommended structure:

1. Page hero
2. Intro text
3. Experience card grid
4. “Choose by Travel Style” explanation block
5. Recommended destinations preview
6. Final CTA

---

# Page Hero Requirements

The `/experiences` page hero should feel immersive and premium.

Suggested title:

“Choose How You Want to Experience the Northeast”

Suggested subtitle:

“Whether you are looking for wildlife, waterfalls, mountain roads, culture, photography, or peaceful family travel, discover the experiences that match your journey.”

CTA:

“Plan My Trip”

Secondary CTA:

“Browse Experiences”

Breadcrumb:

`Home → Experiences`

---

# Experience Card Requirements

Each experience card should include:

* image or icon
* experience title
* short description
* highlights/tags
* “Explore Experience” CTA

Behavior:

* Clicking the card or CTA routes to `/experiences/:slug`.

Readability:

* If text is over image, use the global readability overlay system.
* If card uses icon + solid background, ensure contrast remains strong.
* Preserve existing palette.

Acceptance criteria:

* All experience cards are clickable.
* No dead cards remain.
* Card styling aligns with the global card system.

---

# Experience Detail Page

Create dynamic detail pages at:

`/experiences/:slug`

Each experience page should include:

1. Breadcrumbs
2. Hero image
3. Experience title
4. Short intro
5. Overview
6. Best destinations for this experience
7. Suggested packages
8. Recommended vehicles
9. Gallery or image strip
10. FAQs
11. Final CTA

---

# Breadcrumbs

Add breadcrumb navigation:

`Home → Experiences → Experience Name`

Requirements:

* Subtle styling.
* Accessible links.
* Not sticky.
* Do not add a sticky section menu.

---

# Experience Detail Hero

Hero should include:

* large contextual image
* title
* subtitle
* CTA: “Plan My Trip”
* optional secondary CTA: “View Destinations”

CTA behavior:

`Plan My Trip` → `/plan-my-trip?experience=<slug>`

---

# Overview Section

Explain the experience clearly.

Avoid generic content.

Answer:

* What does this experience involve?
* Who is it best for?
* Which regions are suitable?
* Why is Northeast India special for this experience?

Example:

For Wildlife:

Explain Kaziranga, grasslands, forests, early morning safaris, and comfortable road transfers.

---

# Best Destinations Section

This is the most important part of each experience page.

Purpose:

Answer:

> “Where in Northeast India can I have this experience?”

Show destination cards connected to this experience.

Example:

Adventure:

* Cherrapunji
* Dawki
* Tawang
* Dzukou Valley

Wildlife:

* Kaziranga
* Manas
* Pobitora

Photography:

* Ziro
* Tawang
* Dawki
* Cherrapunji
* Majuli

Each destination card should include:

* destination image
* name
* state
* short reason why it fits this experience
* Learn More CTA
* Plan My Trip CTA

Behavior:

* Learn More → `/destinations/<destinationSlug>`
* Plan My Trip → `/plan-my-trip?experience=<experienceSlug>&destination=<destinationSlug>`

---

# Suggested Packages Section

If packages exist for this experience, show related package cards.

Example:

* Meghalaya Adventure Escape
* Kaziranga Wildlife Journey
* Tawang Mountain Route

Behavior:

* View Details → `/packages/<packageSlug>`
* Plan My Trip → `/plan-my-trip?experience=<experienceSlug>&package=<packageSlug>`

If no related packages exist yet:

* Show a polished empty state.
* Example text:
  “Custom trips for this experience are available. Tell us your travel dates and group size, and our team will help plan the right route.”

CTA:
`Plan My Trip`

---

# Recommended Vehicles Section

Show vehicle recommendations based on experience.

Examples:

Adventure / Mountain Roads:

* Innova Crysta
* SUV options

Family Trips:

* Innova Crysta
* Tempo Traveller

Large Group Road Trips:

* Tempo Traveller

Requirements:

* Use vehicle data if available.
* Do not duplicate vehicle content manually if a central vehicle data file exists.
* CTA should route to booking with both experience and vehicle prefilled.

Example:

`/plan-my-trip?experience=adventure&vehicle=innova-crysta`

---

# Gallery / Image Strip

Add a compact, elegant visual section.

Requirements:

* Use context-aware placeholders.
* Use lazy loading.
* Maintain aspect ratios.
* Add alt text.
* Avoid random irrelevant images.

Examples:

Adventure:

* mountains
* river
* valley road

Wildlife:

* grassland
* rhino/wildlife placeholder
* forest trail

Culture:

* monastery
* local festival
* village landscape

---

# FAQ Section

Use FAQ data from experience object.

Requirements:

* Accordion or clean list.
* Keyboard accessible.
* Works on mobile.
* No layout shift.

Suggested FAQ topics:

* Is this experience suitable for families?
* What vehicle is recommended?
* Which season is best?
* How many days are required?
* Can this be customized?

---

# Final CTA

Each experience detail page should end with a clean CTA.

Purpose:

Convert discovery into booking.

Suggested title:

“Ready to Plan This Experience?”

CTA:

“Plan My Trip”

Secondary:

Call / WhatsApp

Behavior:

* Plan My Trip → `/plan-my-trip?experience=<slug>`
* Call → `tel:+910000000000`
* WhatsApp → `https://wa.me/910000000000`

Use placeholders with TODO comments.

---

# Homepage Integration

Update homepage experience cards so they route to the correct experience detail pages.

Required behavior:

* Adventure card → `/experiences/adventure`
* Wildlife card → `/experiences/wildlife`
* Photography card → `/experiences/photography`
* Culture card → `/experiences/culture`

If the homepage has a “View All Experiences” button, route it to:

`/experiences`

If it does not exist, add one only if it fits the existing layout cleanly.

Do not clutter the homepage.

---

# Placeholder Images

Use context-aware placeholders.

Examples:

* Adventure → mountain road, waterfalls, river
* Wildlife → grasslands, forest, rhino-like wildlife imagery
* Photography → scenic viewpoints, landscapes, misty hills
* Culture → monastery, village, traditional architecture
* Family Trips → comfortable scenic travel
* Road Trips → winding roads, valleys, vehicle routes

Do not use irrelevant random people or unrelated stock imagery.

---

# SEO Requirements

Each experience page should have:

* unique title
* unique meta description
* Open Graph image
* semantic headings
* breadcrumb structured data if feasible

Example title:

`Adventure Travel in Northeast India | Guided Vehicle Tours`

Example meta:

`Explore adventure routes across Meghalaya, Arunachal Pradesh and Northeast India with comfortable vehicles and experienced local drivers.`

---

# Accessibility Requirements

Ensure:

* semantic HTML
* heading hierarchy
* alt text on images
* keyboard accessible cards and accordions
* visible focus states
* sufficient contrast
* aria labels for icon-only buttons

---

# Responsive Requirements

Experience pages must work on:

* desktop
* tablet
* mobile

Check:

* hero
* card grids
* destination cards
* package cards
* vehicle recommendations
* FAQs
* final CTA

No horizontal scrolling.

---

# Performance Requirements

Implement:

* lazy-loaded images
* aspect-ratio containers
* reusable data-driven rendering
* no unnecessary external libraries
* no heavy animations

---

# Implementation Process for Codex

Before editing code:

1. Read `docs/00_READ_FIRST.md`.
2. Read `docs/01_HOMEPAGE.md`.
3. Read `docs/02_DESTINATIONS.md`.
4. Analyze existing routing.
5. Identify existing experience-related components.
6. Identify reusable card, button, gallery, FAQ and breadcrumb components.
7. Produce a short implementation plan.
8. Wait for approval before modifying files.

---

# Definition of Done

This task is complete only when:

* [ ] `/experiences` route exists.
* [ ] `/experiences/:slug` route exists.
* [ ] Experience data is centralized.
* [ ] Experiences listing page displays all required experience cards.
* [ ] Homepage experience cards route correctly.
* [ ] Experience cards are clickable and accessible.
* [ ] Experience detail pages include overview, best destinations, suggested packages, recommended vehicles, gallery, FAQ, and final CTA.
* [ ] Plan My Trip CTAs include correct experience query param.
* [ ] Destination CTAs include destination and experience params where relevant.
* [ ] Breadcrumbs are present.
* [ ] Placeholder images are context-aware.
* [ ] No Lorem Ipsum exists.
* [ ] Pages are responsive.
* [ ] Pages are accessible.
* [ ] No console errors.
* [ ] Existing brand identity is preserved.

---

# Final Reminder

Do not build generic activity pages.

Build experience-led discovery pages that help users choose how they want to travel, then guide them naturally toward destinations, vehicles, packages, and booking.
