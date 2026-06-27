# 04_FLEET.md

# Northeast India Travel Website v2.0

## Fleet & Vehicle System Implementation

Read first:

* 00_READ_FIRST.md
* 01_HOMEPAGE.md
* 02_DESTINATIONS.md
* 03_EXPERIENCES.md

---

# Goal

The fleet is the company's biggest competitive advantage.

The objective of this section is NOT simply to display vehicles.

The objective is to convince visitors that they will travel comfortably, safely and reliably throughout Northeast India.

The vehicle pages should naturally guide users toward booking.

---

# Philosophy

Users do not buy vehicles.

They buy:

* reliability

* comfort

* experienced local drivers

* safety

* peace of mind

Every vehicle page should reinforce these ideas.

---

# Required Routes

Create:

```
/fleet

/fleet/:vehicleSlug
```

Examples

```
/fleet/innova-crysta

/fleet/tempo-traveller

/fleet/ertiga
```

---

# Data Architecture

Create

```
src/data/vehicles.ts
```

(or existing project equivalent)

Example

```ts
{
    slug: "innova-crysta",

    name: "Toyota Innova Crysta",

    passengerCapacity: "6-7",

    luggageCapacity: "4 Large Bags",

    transmission: "Manual",

    airConditioning: true,

    driverIncluded: true,

    pricing: {

        perDay: ...

        airportTransfer: ...

    },

    recommendedFor: [

        "Families",

        "Small Groups",

        "Airport Transfers"

    ],

    gallery: [],

    features: [],

    faq: [],

    relatedVehicles: []
}
```

Vehicle information should come from this data source only.

Do not hardcode vehicle information inside pages.

---

# Fleet Listing Page

Create

```
/fleet
```

Structure

Hero

↓

Vehicle Grid

↓

Why Our Fleet

↓

Driver Information

↓

FAQ

↓

CTA

---

# Fleet Hero

Title

```
Travel in Comfort Across Northeast India
```

Subtitle

Explain

* professional drivers

* comfortable vehicles

* reliable transport

* transparent pricing

CTA

Plan My Trip

---

# Vehicle Cards

Each card should include

* vehicle image

* name

* passenger capacity

* luggage capacity

* daily pricing

* recommended use

* Book Now

* View Details

Book Now

↓

```
/plan-my-trip?vehicle=<slug>
```

View Details

↓

```
/fleet/<slug>
```

---

# Vehicle Detail Page

Each page should include

Hero

↓

Overview

↓

Specifications

↓

Ideal For

↓

Features

↓

Gallery

↓

Pricing

↓

FAQs

↓

Related Vehicles

↓

Book This Vehicle

---

# Vehicle Hero

Large premium image

Vehicle name

Passenger capacity

Price

Book Now

---

# Specifications

Display

Passenger Capacity

Luggage

Air Conditioning

Driver Included

Transmission

Fuel Type

Ground Clearance

Suitable Terrain

---

# Why Choose This Vehicle

Instead of generic descriptions

Explain

* who it is best for

* why it works well in Northeast India

* route suitability

Example

```
Ideal for families travelling between

Shillong

Dawki

Cherrapunji

Kaziranga
```

---

# Driver Information

Every vehicle page should reinforce

Experienced Local Driver Included

Explain

* knows mountain roads

* local knowledge

* safe driving

* familiar with weather

This is one of the company's biggest advantages.

---

# Pricing

Current pricing system is acceptable.

Improve presentation.

Clearly distinguish

Included

Not Included

Possible Extras

Use editable placeholders where information is unavailable.

---

# Book Now

Book Now always routes

```
/plan-my-trip?vehicle=<slug>
```

Booking page should automatically preselect

vehicle

passenger capacity

---

# Related Vehicles

Example

Innova

↓

Tempo Traveller

↓

Ertiga

Do not recommend unrelated vehicles.

---

# Homepage Integration

Homepage Fleet section

Keep existing design.

Improve

Consistency

Hover

Readability

Spacing

Book Now

↓

Booking page

View Details

↓

Vehicle page

---

# Trust Cues

Throughout Fleet

Subtly reinforce

✓ Experienced Drivers

✓ Clean Vehicles

✓ Transparent Pricing

✓ Comfortable Travel

✓ Local Expertise

Avoid marketing buzzwords.

---

# Images

Current images are good.

If placeholders needed

Use

actual vehicle placeholders

Never random stock photos.

---

# Accessibility

All vehicle cards

Keyboard accessible

Book buttons

Focus states

Alt text

---

# Responsive

Fleet grid

Tablet

Mobile

Desktop

Must remain elegant.

---

# Performance

Lazy loading

Aspect ratio

No CLS

No unnecessary libraries

---

# Codex Workflow

Before editing

Analyze

Existing fleet components

Vehicle cards

Current routing

Reusable buttons

Reusable gallery

Then produce implementation plan.

Wait.

---

# Definition of Done

* Fleet page exists

* Vehicle pages exist

* Data centralized

* Vehicle cards reusable

* Book Now routes correctly

* View Details routes correctly

* Driver section exists

* Pricing presentation improved

* Related vehicles work

* Responsive

* Accessible

* No console errors

* Existing visual identity preserved

---

# Final Reminder

The Fleet section is not simply about transportation.

It should convince visitors that this company provides the safest, most comfortable and most reliable way to explore Northeast India.
