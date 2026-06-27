# 07_DESIGN_SYSTEM.md

# Northeast India Travel Website v2.0

## Global Design System Specification

Read first:

* 00_READ_FIRST.md
* 01_HOMEPAGE.md
* 02_DESTINATIONS.md
* 03_EXPERIENCES.md
* 04_FLEET.md
* 05_PACKAGES.md
* 06_BOOKING_ENGINE.md

---

# Goal

Create a unified, reusable design system that every page and component follows.

Do not redesign the website.

The purpose is to make the website feel like one cohesive premium product instead of a collection of independently designed pages.

---

# Design Philosophy

The design should communicate:

* Premium
* Trustworthy
* Elegant
* Modern
* Comfortable
* Authentic
* Professional

It should never feel:

* flashy
* cluttered
* overly luxurious
* corporate
* generic

---

# Preserve Existing Identity

Do NOT change:

* Primary color palette
* Typography
* Overall luxury editorial feel
* Existing branding
* Existing logo treatment
* Existing visual identity

Improve:

* consistency
* spacing
* readability
* hierarchy
* interactions

---

# Global Spacing System

Create a consistent spacing rhythm.

Every section should follow a predictable vertical spacing system.

Maintain generous whitespace.

Avoid cramped layouts.

Cards should never feel crowded.

---

# Typography

Preserve the existing typography.

Improve hierarchy only.

Rules:

* One clear H1 per page.
* Logical H2/H3 hierarchy.
* Comfortable line lengths.
* Consistent paragraph spacing.
* Avoid oversized text blocks.

---

# Global Card System

All cards should share:

* border radius
* spacing
* hover elevation
* transition duration
* image treatment
* typography hierarchy
* CTA placement

Create reusable variants:

* DestinationCard
* ExperienceCard
* VehicleCard
* PackageCard
* TestimonialCard
* TrustCard
* FAQCard

Each variant may contain different content, but all should feel part of one family.

---

# Buttons

Create reusable button variants.

Primary Button

Used for:

* Plan My Trip
* Book Now
* Submit Booking

Secondary Button

Used for:

* Learn More
* View Details
* Explore

Ghost Button

Used sparingly.

Maintain consistent:

* height
* padding
* radius
* typography
* hover state
* focus state

---

# Forms

All form elements should follow one style.

Inputs

Dropdowns

Date Pickers

Textareas

Checkboxes

Validation

Requirements:

* clear labels
* accessible focus states
* inline validation
* consistent spacing

---

# Image Treatment

Images are critical.

Rules:

* fixed aspect ratios
* lazy loading
* object-fit
* fade-in loading
* context-aware placeholders

Never distort images.

Never crop important subjects.

---

# Global Readability System

This is mandatory.

Whenever text appears over:

* images
* gradients
* videos

Automatically ensure readability using:

* subtle overlays
* adaptive text color
* gentle shadows only when necessary

Never modify the existing color palette.

---

# Icons

Use one icon library consistently.

All icons should:

* share stroke weight
* align visually
* maintain consistent sizing

---

# Shadows

Maintain one shadow system.

Small

Medium

Large

Avoid random shadow values.

---

# Borders & Radius

Use consistent corner radius across:

* cards
* buttons
* forms
* galleries
* modals

Avoid inconsistent rounding.

---

# Breadcrumbs

Use a consistent breadcrumb component.

Example:

Home → Destinations → Shillong

Requirements:

* subtle
* accessible
* reusable

---

# Galleries

Create one reusable gallery component.

Used by:

* destinations
* vehicles
* packages
* experiences

Features:

* responsive
* lazy loading
* lightbox-ready architecture
* consistent spacing

---

# FAQ Component

Create one reusable FAQ accordion.

Used everywhere.

Must be:

* keyboard accessible
* animated subtly
* reusable

---

# CTA Sections

Every major page ends with a CTA.

Maintain one reusable CTA component.

Inputs:

* title
* subtitle
* primary CTA
* secondary CTA

Never duplicate layouts unnecessarily.

---

# Loading States

Every major page should include:

* skeleton loaders
* image placeholders
* graceful loading

Avoid blank white screens.

---

# Empty States

Whenever data is unavailable:

Display elegant messaging.

Never leave empty containers.

---

# Trust Components

Create reusable trust elements.

Examples:

* Years in Business
* Happy Travelers
* Google Rating
* GST Registered
* Experienced Drivers

These should be editable and reusable.

---

# Color Usage

Do NOT introduce additional theme colors.

Use the existing palette consistently.

Color should communicate hierarchy—not decoration.

---

# Accessibility

All reusable components must support:

* keyboard navigation
* visible focus
* ARIA labels
* sufficient contrast
* semantic HTML

---

# Reusability

Every new component should be evaluated before creation.

Ask:

Can an existing component be reused?

Avoid duplicate implementations.

---

# Component Architecture

Suggested structure:

```text
components/

Cards/
Buttons/
Forms/
Gallery/
Breadcrumb/
FAQ/
CTA/
Trust/
Navigation/
Layout/
Booking/
```

Adapt to the existing project structure where appropriate.

---

# Implementation Workflow

Before editing:

1. Audit existing reusable components.
2. Identify duplicates.
3. Refactor where beneficial.
4. Preserve working implementations.
5. Wait for approval before large refactors.

---

# Definition of Done

* [ ] Consistent spacing system.
* [ ] Unified card system.
* [ ] Unified buttons.
* [ ] Unified forms.
* [ ] Global readability system.
* [ ] Reusable galleries.
* [ ] Reusable FAQ.
* [ ] Reusable CTA.
* [ ] Reusable trust cards.
* [ ] Consistent typography hierarchy.
* [ ] Existing branding preserved.
* [ ] No duplicated component logic.

---

# Final Reminder

The design system is the foundation of the website.

Every new page and every future feature should naturally fit into this system without requiring redesigns.
