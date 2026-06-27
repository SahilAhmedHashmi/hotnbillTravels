# 05_PACKAGES.md

# Northeast India Travel Website v2.0

## Packages Implementation Specification

Read first:

* 00_READ_FIRST.md
* 01_HOMEPAGE.md
* 02_DESTINATIONS.md
* 03_EXPERIENCES.md
* 04_FLEET.md

---

# Goal

Packages should bridge the gap between inspiration and booking.

Many visitors don't know which destinations to combine or how many days they should travel. Curated packages solve this problem by presenting complete, well-structured journeys while still allowing customization.

The objective of this system is to:

* inspire confidence
* simplify trip planning
* showcase expertise
* naturally guide users toward booking

---

# Philosophy

A package is **not** a fixed product.

It is a professionally recommended itinerary.

Visitors should always feel that packages can be customized according to:

* travel dates
* group size
* preferred vehicle
* interests

Do not present packages as rigid tours.

---

# Required Routes

Create or verify:

```text
/packages
/packages/:packageSlug
```

Examples:

```text
/packages/5-day-meghalaya
/packages/kaziranga-wildlife
/packages/tawang-expedition
```

---

# Data Architecture

Create a centralized data source.

Suggested file:

```text
src/data/packages.ts
```

Each package should follow a reusable structure.

Example:

```ts
{
    slug: "5-day-meghalaya",

    title: "5-Day Meghalaya Explorer",

    duration: "5 Days / 4 Nights",

    price: "₹XXXXX",

    coverImage: "...",

    destinations: [

        "shillong",

        "cherrapunji",

        "dawki"

    ],

    recommendedVehicle: "innova-crysta",

    idealFor: [

        "Families",

        "Couples"

    ],

    highlights: [],

    itinerary: [],

    inclusions: [],

    exclusions: [],

    gallery: [],

    faq: []
}
```

All package information must come from this centralized source.

Never hardcode package information directly into components.

---

# Packages Listing Page

Route:

```text
/packages
```

Structure:

Hero

↓

Package Grid

↓

Why Choose Our Packages

↓

FAQ

↓

Final CTA

---

# Hero Section

Title:

**Curated Northeast India Tour Packages**

Subtitle:

Provide a concise explanation that these itineraries are professionally designed but fully customizable.

CTA:

**Plan My Trip**

Breadcrumb:

Home → Packages

---

# Package Cards

Each package card should include:

* cover image
* title
* duration
* destinations covered
* ideal traveller type
* starting price
* View Details
* Plan My Trip

---

# Card Behaviour

**View Details**

↓

```text
/packages/:packageSlug
```

**Plan My Trip**

↓

```text
/plan-my-trip?package=<slug>
```

Do not immediately ask users to pay.

The package should simply be pre-selected inside the booking system.

---

# Detail Page Structure

Each package page should contain:

1. Hero
2. Package Overview
3. Destinations Covered
4. Day-by-Day Itinerary
5. Included Services
6. Excluded Services
7. Recommended Vehicle
8. Gallery
9. FAQs
10. Related Packages
11. Final CTA

---

# Package Hero

Large cover image

Package title

Duration

Starting price

Primary CTA

Plan My Trip

---

# Overview

Explain:

* who the package is designed for
* what makes it special
* travel style
* overall pace

Avoid generic travel marketing.

---

# Destinations Covered

Display destination cards.

Each destination should link to its own destination page.

Example:

Shillong

↓

```text
/destinations/shillong
```

This encourages further exploration.

---

# Day-by-Day Itinerary

Display a clean timeline.

Example:

Day 1

Arrival in Guwahati

Transfer to Shillong

Evening sightseeing

---

Day 2

Shillong

Elephant Falls

Shillong Peak

Police Bazaar

---

Continue for all days.

Keep the structure reusable.

---

# Included Services

Examples:

* Vehicle
* Driver
* Fuel (if applicable)
* Parking
* Toll
* Pickup

---

# Excluded Services

Examples:

* Flights
* Personal expenses
* Meals (if applicable)
* Entry tickets

Use placeholders where information is unavailable.

---

# Recommended Vehicle

Show the best vehicle for this package.

Include:

* image
* passenger capacity
* why it is recommended

CTA:

Book This Vehicle

↓

```text
/plan-my-trip?package=<slug>&vehicle=<vehicleSlug>
```

---

# Gallery

Use premium placeholder photography.

Images should match the destinations included.

Requirements:

* lazy loading
* aspect ratio consistency
* no layout shift
* graceful fade-in

---

# FAQ

Use package-specific FAQs.

Examples:

* Can this itinerary be customized?

* Can I add more destinations?

* Can I upgrade the vehicle?

* Is hotel booking included?

Accordion must be accessible.

---

# Related Packages

Show 3–4 related packages.

Example:

Meghalaya Explorer

↓

Kaziranga Wildlife Tour

↓

Shillong & Dawki Weekend

↓

Tawang Expedition

Do not recommend unrelated packages.

---

# Final CTA

Section title:

**Ready to Start This Journey?**

Buttons:

* Plan My Trip

* Call Us

* WhatsApp

Behaviour:

Plan My Trip

↓

```text
/plan-my-trip?package=<slug>
```

Call:

```text
tel:+910000000000
```

WhatsApp:

```text
https://wa.me/910000000000
```

Use TODO placeholders.

---

# Homepage Integration

Homepage package cards should:

View Details

↓

Package page

Plan My Trip

↓

Booking page with package pre-selected

Do not leave any inactive buttons.

---

# Placeholder Images

Use destination-aware placeholders.

Examples:

Meghalaya package

↓

Waterfalls

↓

Clouds

↓

Hills

Wildlife package

↓

Grasslands

↓

Rhino

↓

Safari

Mountain package

↓

Monasteries

↓

Snow

↓

Valleys

Never use unrelated stock imagery.

---

# SEO

Each package page should include:

* unique title
* unique meta description
* Open Graph image
* semantic headings
* canonical URL if appropriate

Example:

```text
5-Day Meghalaya Tour Package | Northeast India Travel
```

---

# Accessibility

Ensure:

* semantic HTML
* proper heading hierarchy
* keyboard-accessible accordions
* visible focus states
* sufficient contrast
* alt text for all images

---

# Responsive Design

Verify:

* package cards
* itinerary timeline
* gallery
* CTA
* FAQ

All layouts should adapt cleanly across desktop, tablet, and mobile.

---

# Performance

Implement:

* lazy-loaded images
* reusable components
* centralized data
* no duplicated rendering logic
* optimized galleries

Avoid unnecessary dependencies.

---

# Implementation Workflow

Before modifying code:

1. Read previous implementation documents.
2. Analyze existing package components.
3. Identify reusable cards, gallery, timeline, FAQ, and CTA components.
4. Produce an implementation plan.
5. Wait for approval.

Do not rewrite existing working components unnecessarily.

---

# Definition of Done

* [ ] `/packages` route exists.
* [ ] `/packages/:slug` route exists.
* [ ] Package data is centralized.
* [ ] Package listing page implemented.
* [ ] Package cards reusable.
* [ ] Detail pages include overview, itinerary, destinations, inclusions, exclusions, recommended vehicle, gallery, FAQ, related packages, and final CTA.
* [ ] Plan My Trip correctly pre-selects package.
* [ ] Destination links work.
* [ ] Vehicle recommendation links work.
* [ ] Placeholder images are context-aware.
* [ ] Responsive layouts verified.
* [ ] Accessibility requirements satisfied.
* [ ] No console errors.
* [ ] Existing visual identity preserved.

---

# Final Reminder

Do not build an online travel marketplace.

Build elegant, trustworthy, professionally curated itinerary pages that reinforce the agency's expertise and naturally guide visitors toward submitting a booking enquiry.
