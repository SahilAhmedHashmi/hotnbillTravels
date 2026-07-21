# 02_DESTINATIONS.md

# Northeast India Travel Website v2.0

## Destinations Implementation Specification

Read these first:

1. `docs/00_READ_FIRST.md`
2. `docs/01_HOMEPAGE.md`

---

# Goal

Create a complete, scalable destinations system.

The destinations section should help users answer:

> “Where can I travel in Northeast India?”

The goal is not just to list places. The goal is to make users feel confident exploring destinations and then naturally guide them toward booking a vehicle for that destination.

---

# Required Routes

Implement or verify these routes:

* `/destinations`
* `/destinations/:slug`

Examples:

* `/destinations/shillong`
* `/destinations/cherrapunji`
* `/destinations/dawki`
* `/destinations/kaziranga`
* `/destinations/tawang`

---

# Core Requirements

## Destinations Listing Page

Create a dedicated `/destinations` page.

This page should include:

* premium page hero/header
* short intro copy
* category/state filters
* destination cards grid
* optional interactive map placeholder
* final CTA section
* breadcrumb navigation

Suggested categories:

* Meghalaya
* Assam
* Arunachal Pradesh
* Sikkim
* Nagaland
* Mizoram
* Manipur
* Tripura

Do not overcomplicate filters. Simple buttons/tabs are enough for now.

---

# Destination Data Structure

Create a centralized destination data file.

Suggested file:

`src/data/destinations.js`
or
`src/data/destinations.ts`

Use the project’s existing language conventions.

Each destination object should include:

```js
{
  slug: "shillong",
  name: "Shillong",
  state: "Meghalaya",
  shortDescription: "A scenic hill city known for waterfalls, cafes, viewpoints and pleasant weather.",
  longDescription: "Detailed destination overview...",
  image: "/images/placeholders/shillong.jpg",
  gallery: [
    "/images/placeholders/shillong-1.jpg",
    "/images/placeholders/shillong-2.jpg"
  ],
  highlights: [
    "Umiam Lake",
    "Elephant Falls",
    "Shillong Peak",
    "Police Bazaar"
  ],
  bestTimeToVisit: "October to April",
  recommendedDuration: "2–3 Days",
  idealFor: [
    "Families",
    "Couples",
    "First-time Northeast travelers"
  ],
  suggestedVehicles: [
    "innova-crysta",
    "ertiga"
  ],
  relatedDestinations: [
    "cherrapunji",
    "dawki",
    "mawlynnong"
  ],
  faqs: [
    {
      question: "How many days are enough for Shillong?",
      answer: "Most travelers prefer 2 to 3 days depending on nearby excursions."
    }
  ]
}
```

Use placeholder data where real content is unavailable.

Do not use Lorem Ipsum.

---

# Initial Destination Cards

Create enough destination entries to make the page feel complete.

Minimum recommended destinations:

## Meghalaya

* Shillong
* Cherrapunji
* Dawki
* Mawlynnong
* Mawsynram
* Jowai

## Assam

* Guwahati
* Kaziranga
* Majuli
* Sivasagar
* Tezpur

## Arunachal Pradesh

* Tawang
* Bomdila
* Dirang
* Ziro
* Itanagar

## Sikkim

* Gangtok
* Pelling
* Lachung
* Yumthang Valley

## Nagaland

* Kohima
* Dzukou Valley
* Mon

## Mizoram

* Aizawl
* Reiek
* Champhai

## Manipur

* Imphal
* Loktak Lake

## Tripura

* Agartala
* Unakoti

Use placeholders for images.

The user will replace images later.

---

# Destination Listing Page Layout

Recommended structure:

1. Page hero
2. Intro text
3. State/category filter tabs
4. Destination card grid
5. Optional interactive map placeholder
6. Trust/help strip
7. Final CTA

---

# Page Hero Requirements

The `/destinations` page hero should feel premium and cinematic.

Content suggestion:

Title:
“Explore Destinations Across Northeast India”

Subtitle:
“From misty hills and ancient monasteries to wildlife reserves and crystal-clear rivers, discover where your journey can begin.”

CTA:
“Plan My Trip”

Secondary CTA:
“Browse Destinations”

Requirements:

* Use existing visual language.
* Use high-quality placeholder image.
* Use readable text overlay.
* Include breadcrumb:
  `Home → Destinations`

---

# Destination Card Requirements

Each card should include:

* image
* destination name
* state badge
* short description
* highlights or tags
* best time or duration badge
* “Learn More” CTA
* “Plan My Trip” CTA

Behavior:

* Clicking card or Learn More:

  * route to `/destinations/:slug`

* Clicking Plan My Trip:

  * route to `/plan-my-trip?destination=<slug>`

Readability:

* Add image overlay if text sits on image.
* Ensure contrast is always strong.
* Use existing palette only.

---

# Filters

Add simple filter tabs/buttons:

* All
* Meghalaya
* Assam
* Arunachal Pradesh
* Sikkim
* Nagaland
* Mizoram
* Manipur
* Tripura

Requirements:

* Filter should update visible cards.
* Active filter should be clear.
* Must work on mobile.
* No page reload required.

Acceptance criteria:

* Clicking “Meghalaya” only shows Meghalaya destinations.
* Clicking “All” restores all destinations.
* Filter controls are keyboard accessible.

---

# Interactive Map Placeholder

Do not build a full map unless already available.

Instead, add a polished placeholder section titled:

“Explore the Northeast by Region”

This can show:

* a stylized map placeholder
* region/state chips
* short explanation

Include TODO comment for future interactive map.

Acceptance criteria:

* Section does not look unfinished.
* It clearly indicates regional coverage.
* It does not require external map libraries.

---

# Destination Detail Page

Create dynamic detail pages at:

`/destinations/:slug`

Each destination page should include:

1. Breadcrumbs
2. Hero image
3. Destination name
4. State / region badge
5. Short intro
6. Overview
7. Top attractions
8. Suggested itinerary ideas
9. Best time to visit
10. Recommended vehicle
11. Gallery
12. FAQs
13. Related destinations
14. Final CTA

---

# Breadcrumbs

Add breadcrumb navigation:

`Home → Destinations → Destination Name`

Requirements:

* Must be visible near top.
* Must be styled subtly.
* Must be accessible.
* Do not add sticky section navigation.

---

# Destination Detail Hero

Hero should include:

* large image
* title
* subtitle
* state badge
* CTA: “Plan My Trip”
* optional secondary CTA: “View Suggested Itinerary”

CTA behavior:

`Plan My Trip` → `/plan-my-trip?destination=<slug>`

---

# Overview Section

Explain the destination clearly and concisely.

Avoid generic travel copy.

Use useful information:

* what the place is known for
* who it suits
* why travelers visit
* nearby places

---

# Top Attractions Section

Use cards or a clean grid.

Each attraction should include:

* name
* short description
* optional image placeholder

Example for Shillong:

* Umiam Lake
* Elephant Falls
* Shillong Peak
* Ward’s Lake

Keep content editable in the data file if possible.

---

# Suggested Itinerary Ideas

Do not create complex itinerary builder.

Show simple itinerary blocks.

Examples:

* 2 Days
* 3 Days
* 5 Days

Each itinerary idea should include a few bullet points.

Example:

2 Days:

* Day 1: Shillong local sightseeing
* Day 2: Umiam Lake and nearby viewpoints

---

# Best Time to Visit

Show as a premium information block.

Include:

* season
* weather note
* travel recommendation

Example:

“October to April is generally preferred for pleasant weather and clear views.”

---

# Recommended Vehicle Section

This is important for conversion.

Show vehicle recommendations based on destination.

Example:

For Shillong:

* Innova Crysta:
  “Best for families and small groups looking for comfort.”
* Tempo Traveller:
  “Best for larger groups travelling together.”

CTA:

“Book This Vehicle” → `/plan-my-trip?destination=<slug>&vehicle=<vehicleSlug>`

---

# Gallery

Add a responsive gallery with placeholder images.

Requirements:

* consistent aspect ratio
* lazy loading
* alt text
* graceful loading
* no layout shift

---

# FAQ Section

Use FAQ data from destination object.

Requirements:

* accordion or clean list
* keyboard accessible
* no broken layout on mobile

---

# Related Destinations

Show related destinations near bottom.

Example:

On Shillong page:

* Cherrapunji
* Dawki
* Mawlynnong

Each related destination card should route correctly.

---

# Final CTA

Each destination page should end with a CTA.

Purpose:

Guide the user toward booking.

Content suggestion:

Title:
“Ready to Explore [Destination Name]?”

CTA:
“Plan My Trip”

Secondary:
Call / WhatsApp

Behavior:

* Plan My Trip → `/plan-my-trip?destination=<slug>`
* Call → `tel:+910000000000`
* WhatsApp → `https://wa.me/910000000000`

Use placeholders with TODO comments.

---

# Placeholder Images

Use context-aware placeholders.

Examples:

* Shillong: hills / lake / cityscape
* Cherrapunji: waterfalls / cliffs
* Dawki: clear river
* Kaziranga: wildlife / grassland
* Tawang: monastery / mountains
* Ziro: valley / fields

Do not use irrelevant random images.

---

# SEO Requirements

Each destination detail page should have:

* unique title
* unique meta description
* Open Graph image
* canonical URL if applicable
* semantic headings
* breadcrumb structured data if feasible

Example title:

`Shillong Travel Guide | Northeast India Tours`

Example meta:

`Explore Shillong with local drivers, comfortable vehicles, and custom Northeast India travel support.`

---

# Accessibility Requirements

Ensure:

* semantic HTML
* proper heading hierarchy
* alt text on images
* keyboard-friendly filters
* accessible accordions
* visible focus states
* sufficient text contrast

---

# Responsive Requirements

The destination system must work on:

* desktop
* tablet
* mobile

Check:

* hero
* filter tabs
* card grid
* galleries
* FAQ accordion
* related destination cards
* final CTA

No horizontal scrolling.

---

# Performance Requirements

Implement:

* lazy-loaded destination images
* aspect-ratio containers
* no large unnecessary dependencies
* no map libraries for placeholder map
* reusable data-driven rendering

---

# Implementation Process for Codex

Before editing code:

1. Read `docs/00_READ_FIRST.md`.
2. Read `docs/01_HOMEPAGE.md`.
3. Analyze existing routing structure.
4. Identify current destination-related components.
5. Identify reusable card/button/gallery components.
6. Produce a short implementation plan.
7. Wait for approval before modifying files.

---

# Definition of Done

This task is complete only when:

* [ ] `/destinations` route exists.
* [ ] `/destinations/:slug` route exists.
* [ ] Destination data is centralized.
* [ ] Destination listing page displays all required cards.
* [ ] State/category filters work.
* [ ] “View All Destinations” from homepage links correctly.
* [ ] Destination cards link to detail pages.
* [ ] Destination Plan My Trip CTAs include destination query param.
* [ ] Breadcrumbs are present.
* [ ] Detail pages include overview, attractions, itinerary ideas, best time, recommended vehicles, gallery, FAQs, related destinations, and CTA.
* [ ] Placeholder images are context-aware.
* [ ] No Lorem Ipsum exists.
* [ ] Pages are responsive.
* [ ] Pages are accessible.
* [ ] No console errors.
* [ ] Existing brand identity is preserved.

---

# Final Reminder

Do not build a generic tourism directory.

Build a premium, trustworthy destination discovery system that naturally leads users toward booking a vehicle-supported Northeast India trip.
