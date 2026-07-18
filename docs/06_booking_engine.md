# 06_BOOKING_ENGINE.md

# Northeast India Travel Website v2.0

## Booking Platform Implementation Specification

Read first:

* 00_READ_FIRST.md
* 01_HOMEPAGE.md
* 02_DESTINATIONS.md
* 03_EXPERIENCES.md
* 04_FLEET.md
* 05_PACKAGES.md

---

# Goal

The booking platform is the primary conversion system of the website.

The objective is **not** to allow users to instantly purchase a tour.

The objective is to collect high-quality trip enquiries in a premium, guided, and trustworthy manner.

The booking process should feel effortless, reassuring, and personalized.

---

# Booking Philosophy

The booking experience should never feel like filling out a government form.

Instead, it should feel like planning a trip with a travel consultant.

Every step should reduce uncertainty.

Every interaction should build confidence.

---

# Required Route

Create or verify:

```text
/plan-my-trip
```

This route becomes the single booking entry point for the entire website.

Every CTA eventually routes here.

---

# Booking Sources

The booking page must understand where the visitor came from.

Possible sources:

Homepage

↓

Destination Page

↓

Vehicle Page

↓

Package Page

↓

Experience Page

↓

Navigation Bar

↓

Floating CTA

---

# Context-Aware Pre-Filling

If a visitor arrives from another page, intelligently pre-fill relevant information.

Examples:

Destination Page

```
/plan-my-trip?destination=shillong
```

Vehicle Page

```
/plan-my-trip?vehicle=innova-crysta
```

Package Page

```
/plan-my-trip?package=5-day-meghalaya
```

Experience Page

```
/plan-my-trip?experience=adventure
```

Combined Example

```
/plan-my-trip?destination=shillong&vehicle=innova-crysta
```

Rules:

* Pre-fill fields automatically.
* Clearly show selected values.
* User must always be able to change them.

Never lock fields.

---

# Booking Layout

Desktop

Two-column layout.

Left:

Multi-step booking form.

Right:

Live Trip Summary.

---

Mobile

Single-column layout.

Trip summary appears:

* after each step
  or
* collapsible summary card.

---

# Progress Indicator

Display six booking steps.

Example:

1. Destination

2. Travel Dates

3. Travellers

4. Vehicle Preference

5. Contact Information

6. Review & Submit

Requirements:

* current step highlighted
* completed steps indicated
* smooth transitions
* accessible

---

# Step 1

Destination

Fields:

* Destination
* State (optional if inferred)

Destination list should come from destination data.

No hardcoded values.

Validation:

Destination required.

---

# Step 2

Travel Details

Fields:

Travel Start Date

Travel End Date

OR

Number of Days

Implementation may calculate one from the other if desired.

Validation:

Dates required.

End date must not precede start date.

---

# Step 3

Travellers

Fields:

Adults

Children

Total Travellers

Optional:

Special Requirements

Examples:

* senior citizens
* wheelchair
* infant

Validation:

At least one traveller.

---

# Step 4

Vehicle Preference

Allow user to choose:

Preferred Vehicle

Example:

* Innova Crysta

* Tempo Traveller

* Ertiga

If already preselected:

Display selection.

Allow change.

Optional:

Trip Type

Family

Friends

Corporate

Couple

Photography

Adventure

---

# Step 5

Contact Information

Fields:

Full Name

Phone Number

Email Address

City

Additional Notes

Validation:

Name required.

Phone required.

Email required.

Email format validation.

---

# Step 6

Review & Submit

Display summary.

Destination

Dates

Travellers

Vehicle

Contact Details

Notes

Buttons:

Back

Submit Booking Request

---

# Live Trip Summary

Visible throughout booking.

Update in real time.

Show:

Destination

Travel Dates

Duration

Travellers

Vehicle

Estimated Package

Booking Type

This summary is informational only.

No pricing calculations required.

---

# Validation

Validate each step independently.

User should never reach next step with invalid data.

Display clear inline validation.

Never use browser default alerts.

---

# Navigation

Buttons

Previous

Next

Submit

Requirements:

Smooth transitions.

Preserve entered data.

Do not reset form accidentally.

---

# Confirmation

After submission

Navigate to dedicated confirmation page.

Not popup.

Not alert.

---

# Confirmation Page

Title

Booking Request Received

Subtitle

Thank the visitor.

Explain:

"Our travel experts will review your request and contact you shortly."

Display

Booking Reference

Example

```
NE-2026-00125
```

This may be generated locally.

Also display

Call button

WhatsApp button

Return Home

---

# Booking Reference

Generate readable booking references.

Example

```
NE-2026-00125
```

Uniqueness can be approximate until backend exists.

Include TODO for backend implementation.

---

# Email Integration

After submission

Send booking enquiry.

Destination

Dates

Travellers

Vehicle

Contact

Notes

Recipient

Placeholder

```
hello@example.com
```

Add TODO:

Replace with official company email.

---

# WhatsApp Integration

Construct booking summary.

Open WhatsApp Business placeholder.

Placeholder

```
https://wa.me/910000000000
```

Message example

```
New Booking Enquiry

Destination:

Travel Dates:

Travellers:

Vehicle:

Contact:

Notes:
```

Use URL encoding.

---

# Backend

For now

No database required.

Structure implementation so backend can later be connected easily.

Avoid tightly coupling UI with submission logic.

Abstract submission into service.

Example

```
submitBooking()
```

Later replace with

Firebase

Supabase

Custom API

etc.

---

# Error Handling

If submission fails

Display elegant error message.

Offer

Retry

Call Us

WhatsApp

Never lose entered form data.

---

# Animations

Allowed

Fade between steps.

Progress animation.

Button hover.

Summary updates.

Success animation.

Avoid flashy effects.

---

# Accessibility

Keyboard navigation.

Labels.

Focus management.

Screen reader support.

Error announcements.

Visible focus.

---

# Responsive

Desktop

Tablet

Mobile

All steps usable.

Buttons easily tappable.

Progress indicator adapts.

---

# Performance

Avoid unnecessary rerenders.

Lazy load non-critical assets.

Keep bundle small.

No heavy form libraries unless already used.

---

# Component Architecture

Suggested components

```
BookingLayout

BookingStepper

DestinationStep

TravelStep

TravellerStep

VehicleStep

ContactStep

ReviewStep

TripSummary

BookingConfirmation

BookingService
```

Reuse existing button and form components.

---

# Implementation Workflow

Before editing

1. Analyze existing booking implementation.

2. Reuse current form components where possible.

3. Identify routing.

4. Produce implementation plan.

5. Wait for approval.

Do not rewrite working code unnecessarily.

---

# Definition of Done

* [ ] `/plan-my-trip` route exists.
* [ ] Six-step booking flow implemented.
* [ ] Progress indicator works.
* [ ] Context-aware pre-filling works.
* [ ] Live trip summary updates.
* [ ] Validation works.
* [ ] Form data preserved between steps.
* [ ] Confirmation page implemented.
* [ ] Booking reference generated.
* [ ] Placeholder email integration exists.
* [ ] Placeholder WhatsApp integration exists.
* [ ] Error handling implemented.
* [ ] Responsive.
* [ ] Accessible.
* [ ] No console errors.
* [ ] Existing branding preserved.

---

# Final Reminder

This booking platform should feel like a premium travel consultation experience—not a generic enquiry form.

It is the most important conversion feature of the entire website and should receive the highest level of polish, usability, and reliability.
