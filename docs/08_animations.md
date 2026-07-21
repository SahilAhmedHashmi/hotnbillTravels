# 08_ANIMATIONS.md

# Northeast India Travel Website v2.0

## Motion Design & Interaction Specification

Read first:

* 00_READ_FIRST.md
* 01_HOMEPAGE.md
* 02_DESTINATIONS.md
* 03_EXPERIENCES.md
* 04_FLEET.md
* 05_PACKAGES.md
* 06_BOOKING_ENGINE.md
* 07_DESIGN_SYSTEM.md

---

# Goal

Introduce subtle, premium animations that improve usability, guide attention, and enhance perceived quality.

Animations should never exist purely for decoration.

Every animation should have a purpose.

---

# Motion Philosophy

The website should feel:

✓ Smooth

✓ Calm

✓ Responsive

✓ Elegant

✓ Premium

It should never feel:

✗ Flashy

✗ Over-animated

✗ Distracting

✗ Slow

✗ Gimmicky

---

# General Rules

Animations should:

* reinforce hierarchy
* improve orientation
* improve perceived performance
* make interactions feel responsive

Animations should NEVER delay users.

---

# Global Motion Timing

Use consistent durations.

Recommended:

Fast

150ms

Normal

250ms

Slow

350ms

Avoid animations longer than 500ms.

---

# Easing

Use smooth easing.

Avoid:

* bounce
* elastic
* exaggerated spring effects

The website should feel refined.

---

# Page Transitions

Every page transition should feel smooth.

Allowed:

* fade
* fade + slight upward movement
* subtle opacity transition

Do not use:

* zoom
* spinning
* rotating
* sliding entire pages dramatically

---

# Scroll Reveal

Major homepage sections should animate when entering the viewport.

Examples:

Hero

↓

Destinations

↓

Experiences

↓

Fleet

↓

Packages

↓

Testimonials

↓

CTA

Reveal style:

* fade
* slight upward movement

Only animate once.

Do not repeat animations every scroll.

---

# Cards

All cards should share the same hover behavior.

Hover:

* slight elevation
* subtle shadow increase
* slight image zoom
* smooth transition

Never:

* rotate
* bounce
* shake

---

# Buttons

Buttons should feel responsive.

Hover:

* slight brightness adjustment
* smooth background transition
* gentle elevation

Active:

* slight press effect

Focus:

* clear outline
* accessible

---

# Images

On hover:

* subtle zoom

No excessive scaling.

Images should remain stable.

---

# Navigation

Navbar should animate smoothly.

Examples:

* background transition
* sticky behavior
* active link transition

Avoid sudden jumps.

---

# Mobile Navigation

Drawer should:

* slide smoothly
* trap focus
* close gracefully

Avoid jarring transitions.

---

# Booking Platform

Booking is the highest priority interaction.

Transitions between booking steps should be smooth.

Allowed:

* fade
* horizontal slide
* subtle progress animation

Never lose entered data.

---

# Progress Indicator

Animate:

* completed steps
* current step
* progress line

Keep movement subtle.

---

# Trip Summary

When values change:

Destination

Vehicle

Travellers

Dates

Animate updates subtly.

No flashing.

---

# Success Page

After booking submission:

Use a subtle success animation.

Examples:

✓ Checkmark draw

✓ Gentle fade

✓ Success card appearance

Avoid confetti or excessive celebration.

---

# Floating Contact Widget

Expand:

Smooth radial or vertical reveal.

Collapse:

Reverse animation.

Should never obstruct interaction.

---

# FAQ Accordion

Animate:

* height
* icon rotation

Keep animation fast.

---

# Gallery

Image loading:

Fade-in only.

Avoid sudden appearance.

Future lightbox should support smooth transitions.

---

# Skeleton Loading

Use skeletons for:

* cards
* images
* booking page
* galleries

Animate with subtle shimmer if appropriate.

Avoid empty white spaces.

---

# Loading Indicators

When submitting forms:

Disable submit button.

Show loading state.

Prevent duplicate submissions.

---

# Hover Consistency

All interactive elements should respond consistently.

Examples:

Cards

Buttons

Links

Icons

Images

Maintain one interaction language.

---

# Scroll Behaviour

Implement smooth scrolling for:

* anchor links
* "Back to Top"

Respect browser accessibility settings.

---

# Reduced Motion

Respect:

prefers-reduced-motion

If enabled:

* disable non-essential animations
* preserve usability

Accessibility takes priority.

---

# Performance

Animations must use GPU-friendly properties where possible.

Prefer:

* opacity
* transform

Avoid animating:

* width
* height
* top
* left

unless necessary.

---

# Libraries

Reuse existing animation library if one exists.

Do not introduce heavy animation frameworks without clear justification.

---

# Accessibility

Animations should never:

* hide important information
* cause motion sickness
* prevent interaction

---

# Implementation Workflow

Before editing:

1. Audit current animations.
2. Remove inconsistent effects.
3. Standardize timing.
4. Reuse animation utilities where possible.
5. Wait for approval before introducing new animation libraries.

---

# Definition of Done

* [ ] Scroll reveals are consistent.
* [ ] Cards share one hover language.
* [ ] Buttons share one interaction style.
* [ ] Booking transitions are smooth.
* [ ] Success page animation implemented.
* [ ] Skeleton loading implemented where appropriate.
* [ ] Reduced motion respected.
* [ ] Animations remain performant.
* [ ] Existing branding preserved.
* [ ] No distracting effects introduced.

---

# Final Reminder

Animations should make the website feel more professional—not more animated.

If users notice the animations more than the content, they are too strong.

The best animations are the ones users feel rather than consciously notice.
