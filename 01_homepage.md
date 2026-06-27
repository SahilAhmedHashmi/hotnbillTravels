# 01_HOMEPAGE.md

# Northeast India Travel Website v2.0

## Homepage Implementation Specification

Read `docs/00_READ_FIRST.md` before implementing this file.

---

# Goal

Refine the existing homepage into a polished, premium, trustworthy, conversion-focused travel agency homepage.

Do not redesign the homepage from scratch.

Preserve the existing:

* color palette
* typography
* luxury editorial aesthetic
* dark green / ivory / gold visual identity
* overall layout direction

Improve the homepage by making it:

* easier to navigate
* more trustworthy
* more conversion-focused
* more consistent
* more readable
* more responsive
* more polished
* more story-driven

---

# Core Homepage Philosophy

The homepage should feel like a guided discovery journey.

The user journey should be:

Hero
→ Destinations
→ Experiences
→ Fleet
→ Packages
→ Trust / Testimonials
→ Final CTA
→ Booking

The visitor should never feel forced to book.

The website should naturally make booking feel like the obvious next step.

---

# Non-Negotiable Rules

Do NOT:

* redesign the homepage
* change the brand identity
* change the color palette
* replace typography
* add clutter
* add aggressive sales CTAs everywhere
* use random irrelevant images
* use Lorem Ipsum
* break existing responsive layouts
* remove useful existing content unless instructed
* introduce unnecessary dependencies

---

# Main Homepage Changes

## 1. Remove Irrelevant Image Collage Section

There is currently a random image collage/gallery section before the final CTA section titled something like:

“Let the Northeast Call You Home”

Remove this collage section completely.

Requirements:

* Remove the component from the homepage.
* Remove unused imports related to it.
* Remove unused styles if safe.
* Do not replace it with another gallery.
* After removal, adjust vertical spacing so the transition into the final CTA feels intentional.

Acceptance criteria:

* The random collage section no longer appears.
* No broken layout gap remains.
* The final CTA section flows naturally from the previous section.
* No console errors.

---

## 2. Final CTA Section

The section titled:

“Let the Northeast Call You Home”

should no longer act as the booking form destination.

It should become a final emotional conversion CTA.

Purpose:

* Give the homepage an elegant ending.
* Encourage users to continue to the dedicated booking page.
* Offer quick contact options.

Required CTAs:

1. Primary CTA:

   * Label: “Plan My Trip”
   * Route: `/plan-my-trip`

2. Secondary CTA:

   * Call button
   * Use functional `tel:` link.
   * Use placeholder phone number for now if real number does not exist.
   * Example placeholder: `tel:+910000000000`

3. WhatsApp button:

   * Use placeholder WhatsApp Business link for now.
   * Example placeholder: `https://wa.me/910000000000`
   * Add clear TODO comment where the real number should be added later.

Requirements:

* Keep the current premium visual treatment.
* Keep the emotional tone.
* Do not embed a long form here.
* Ensure the buttons are accessible and keyboard focusable.
* Ensure icons are aligned properly.
* Ensure hover/focus states are visible.

Acceptance criteria:

* “Plan My Trip” opens `/plan-my-trip`.
* Call button opens phone app on supported devices.
* WhatsApp button opens placeholder WhatsApp link.
* Section remains visually premium and uncluttered.

---

## 3. Navigation Bar Improvements

Update the navigation so users clearly understand what the website offers.

Recommended navigation structure:

* Home
* Destinations
* Experiences
* Fleet
* Packages
* Travel Guides
* About Us
* Contact
* Plan My Trip

The “Plan My Trip” link/button should be visually emphasized as the primary CTA.

Requirements:

* Preserve the existing navbar aesthetic.
* Do not make the navbar feel crowded.
* On desktop, show main links cleanly.
* On mobile, use a polished hamburger / drawer menu.
* Ensure all navigation links are functional.
* If pages are not fully implemented yet, create placeholder routes/pages with proper layout instead of broken links.
* Add active route styling if routing system supports it.

Behavior:

* Navbar may remain sticky if already implemented.
* If sticky, ensure it does not cover content.
* If transparent-on-hero behavior already exists, preserve it unless it causes readability issues.

Acceptance criteria:

* Every navbar item routes somewhere valid.
* Mobile menu works.
* Plan My Trip CTA is always easy to find.
* Navbar remains accessible by keyboard.

---

## 4. Homepage Storytelling Flow

Improve the homepage so each section leads naturally to the next.

Current sections should feel like one continuous story, not disconnected blocks.

Suggested narrative:

1. Hero:

   * Inspire the visitor.
   * Establish premium Northeast travel feeling.
   * Primary CTA: Plan My Trip.

2. Destinations:

   * Answer: “Where can I go?”

3. Experiences:

   * Answer: “What can I do there?”

4. Fleet:

   * Answer: “How will I travel safely and comfortably?”

5. Packages:

   * Answer: “Can this agency help me plan a proper route?”

6. Trust / Testimonials:

   * Answer: “Can I trust them?”

7. Final CTA:

   * Answer: “How do I start?”

Implementation requirements:

* Improve section spacing.
* Add subtle transition rhythm between sections.
* Avoid abrupt visual jumps.
* Add short bridge text only where useful.
* Keep copy concise.
* Avoid excessive marketing language.

Acceptance criteria:

* Homepage feels like a continuous journey.
* Sections remain visually distinct but connected.
* User always has a clear next step.

---

## 5. Featured Destinations Section

The existing “Featured Destinations” section should remain, but improve functionality.

Requirements:

* “View All Destinations” button must navigate to `/destinations`.
* Destination cards should have readable text over images.
* Add subtle image gradient overlays where needed.
* Cards should use global card styling.
* Cards should have consistent hover behavior.
* Each destination card should be clickable.
* Clicking a destination card should eventually route to its detail page:

  * Example: `/destinations/shillong`

CTA behavior:

* Card click or “Learn More” → destination detail page.
* “Plan My Trip” inside destination card, if present → `/plan-my-trip?destination=<slug>`

Acceptance criteria:

* View All Destinations button works.
* Destination cards are readable.
* Destination cards behave consistently.
* No dead buttons.

---

## 6. Experiences Section

Experience cards should become clickable and functional.

Requirements:

* Each experience card should link to a dedicated experience page.
* Example routes:

  * `/experiences/adventure`
  * `/experiences/wildlife`
  * `/experiences/photography`
  * `/experiences/culture`

If detail pages are not implemented in this phase, create placeholder pages with correct layout and TODO comments.

Experience cards should answer:

“What type of journey can I have in Northeast India?”

Acceptance criteria:

* Each experience card is clickable.
* No card leads nowhere.
* Hover/focus states are consistent.
* Card text remains readable.

---

## 7. Fleet Section

Fleet section is a major business differentiator.

It should clearly communicate:

* well-maintained vehicles
* experienced local drivers
* transparent prices
* comfort
* safety
* suitability for Northeast terrain

Requirements:

* Preserve existing vehicle section if visually strong.
* Improve card readability and hierarchy.
* Ensure prices are visible and clear.
* Add small trust cues where appropriate:

  * experienced driver
  * clean vehicle
  * ideal passenger count
  * luggage capacity
  * suitable routes

Book Now behavior:

When user clicks “Book Now” on a vehicle card:

* Navigate to `/plan-my-trip?vehicle=<vehicleSlug>`
* Booking page should later pre-select that vehicle.
* Do not open a modal on homepage.

Acceptance criteria:

* Every vehicle Book Now button works.
* Vehicle slug is passed in URL.
* Pricing remains clear.
* Cards are visually consistent.

---

## 8. Featured Packages Section

Packages should lead to dedicated package detail pages.

Requirements:

* Package card click / “View Details” should route to:

  * `/packages/<packageSlug>`

Do not send package cards directly to booking unless the button specifically says “Plan My Trip” or similar.

Each package card should include:

* image
* title
* duration
* short description
* price if available
* highlights
* View Details CTA

Acceptance criteria:

* Package links work.
* Package card layout is consistent.
* No dead View Details buttons.

---

## 9. Trust Section

Add or improve a trust-building section if one does not already exist.

Suggested title:

“Why Travelers Trust Us”

Purpose:

Build credibility before users reach the final CTA.

Include trust signals such as:

* Years in business
* Happy customers
* Trips completed
* Google Reviews
* Licensed / registered business
* GST registration
* Local office address
* Fleet ownership
* 24×7 customer support
* Experienced local drivers

Important:

Only use placeholders where real values are not yet available.

Example placeholders:

* `10+ Years in Business`
* `5,000+ Happy Travelers`
* `1,200+ Trips Completed`
* `4.8★ Google Rating`

Add TODO comments where actual values should be inserted.

Design requirements:

* Must feel premium, not loud.
* Can use stat cards, icon cards, or a clean grid.
* Should match existing design system.
* Consider animated counters, but only subtle.

Acceptance criteria:

* Trust section appears naturally before or near testimonials.
* It does not feel like clutter.
* Statistics are easy to edit later.
* Layout works on mobile.

---

## 10. Testimonials Section

Testimonials can remain mostly as-is if already good.

Improvements:

* Ensure readability.
* Ensure consistent card heights.
* Add subtle quote styling if appropriate.
* Make sure testimonial text does not overflow.
* Preserve premium feel.

If testimonials are placeholders, add TODO comments.

Acceptance criteria:

* Testimonials are readable.
* Layout works across screen sizes.
* Visual treatment matches rest of homepage.

---

## 11. Floating Contact Widget

Add a global floating contact widget if not already present.

Placement:

* Bottom-right on desktop.
* Bottom-right or bottom-center safe area on mobile.

Collapsed state:

* One elegant circular button.

Expanded state:

Show options:

* Call Us
* WhatsApp
* Email
* Back to Top

Links:

* Call: `tel:+910000000000`
* WhatsApp: `https://wa.me/910000000000`
* Email: `mailto:hello@example.com`

Use placeholders and TODO comments for real details.

Behavior:

* Smooth expand/collapse.
* Close when clicking outside or pressing Escape.
* Keyboard accessible.
* Do not cover important content.
* Do not overlap footer awkwardly.
* Optional: slightly hide while scrolling down and reappear on scroll up.

Acceptance criteria:

* Widget works on all pages if implemented globally.
* All links are functional placeholders.
* Keyboard users can operate it.
* Mobile layout is not obstructed.

---

## 12. Global Card Readability Fix

Problem:

Some cards contain text over backgrounds/images that may be too bright or too dark.

Solution:

Implement a consistent readability system.

Requirements:

* Text over image must always be readable.
* Add subtle gradient overlays where needed.
* Use existing color palette only.
* Do not introduce new unrelated colors.
* Use subtle text shadow only if needed.
* Ensure buttons remain readable on image cards.
* Apply consistently across:

  * destination cards
  * experience cards
  * package cards
  * vehicle cards if relevant
  * CTA image blocks

Acceptance criteria:

* Text remains readable regardless of image brightness.
* Existing palette is preserved.
* Overlay feels premium and subtle.

---

## 13. Global Card Design System

Create or refine reusable card styles.

Cards should share:

* consistent border radius
* consistent image aspect ratios
* consistent shadows
* consistent hover elevation
* consistent transition duration
* consistent spacing
* consistent button treatment
* consistent typography hierarchy
* consistent skeleton loading treatment

Card variants:

* DestinationCard
* ExperienceCard
* VehicleCard
* PackageCard
* TestimonialCard
* TrustStatCard

Do not make all cards identical.

They should feel related, not cloned.

Acceptance criteria:

* Cards feel like part of one design system.
* Hover states are consistent.
* Mobile layouts remain clean.
* Code avoids duplicated card styling.

---

## 14. Image Handling

All homepage images should be production-ready.

Requirements:

* Use high-quality placeholders for now.
* Use context-aware placeholders:

  * mountains
  * forests
  * rivers
  * waterfalls
  * wildlife
  * premium vehicles
  * Northeast India-inspired landscapes
* Add lazy loading where appropriate.
* Use graceful fade-in when images load.
* Prevent layout shift by defining aspect ratios.
* Avoid distorted images.
* Use object-fit appropriately.
* Add descriptive alt text.

Acceptance criteria:

* Images do not cause layout shift.
* Placeholder images look intentional.
* Alt text exists.
* Images load smoothly.

---

## 15. Homepage Animations

Add subtle premium animations.

Allowed animations:

* scroll reveal
* gentle fade-up
* subtle card hover lift
* image zoom on hover
* smooth CTA hover
* animated counters for trust stats
* smooth navbar transitions
* smooth page/section transitions

Rules:

* Animations must be subtle.
* Do not overanimate.
* Respect `prefers-reduced-motion`.
* Avoid heavy parallax.
* Do not reduce performance.

Acceptance criteria:

* Site feels more alive.
* No animation feels distracting.
* Reduced motion users are respected.

---

## 16. Responsive Requirements

Homepage must work beautifully on:

* large desktop
* laptop
* tablet
* mobile

Check:

* navbar
* hero text
* CTA buttons
* destination grid
* experience grid
* vehicle grid
* package grid
* trust section
* testimonials
* final CTA
* floating contact widget
* footer

Acceptance criteria:

* No horizontal scrolling.
* No overlapping elements.
* Text remains readable.
* CTA buttons remain tappable.
* Cards stack cleanly.
* Mobile layout feels intentional.

---

## 17. Accessibility Requirements

Implement:

* semantic HTML
* proper heading hierarchy
* descriptive alt text
* keyboard navigation
* visible focus states
* sufficient contrast
* aria labels for icon-only buttons
* Escape key handling for menus/widgets
* accessible mobile nav

Acceptance criteria:

* Keyboard users can navigate homepage.
* Focus states are visible.
* Icon buttons have labels.
* Text contrast is acceptable.

---

## 18. Performance Requirements

Do not degrade performance.

Implement where appropriate:

* lazy-loaded images
* optimized image sizes
* skeleton placeholders
* no unnecessary dependencies
* avoid heavy animation libraries unless already installed
* avoid excessive re-renders
* avoid large unused imports

Acceptance criteria:

* Homepage loads quickly.
* No major layout shift.
* No obvious jank during scroll.
* No console warnings/errors.

---

## 19. Footer

Footer should remain consistent with the premium brand.

Ensure footer includes:

* company name/logo
* quick links
* destinations
* contact details
* email placeholder
* phone placeholder
* WhatsApp placeholder
* office address placeholder
* social links if applicable

Acceptance criteria:

* Footer links work.
* Footer is responsive.
* Footer does not feel visually disconnected from the homepage.

---

# Implementation Process for Codex

Before editing code:

1. Read `docs/00_READ_FIRST.md`.
2. Analyze the existing homepage implementation.
3. Identify existing components that can be reused.
4. Identify files that need modification.
5. Identify files that need creation.
6. Produce a short implementation plan.
7. Wait for approval before modifying files.

Do not rewrite the homepage from scratch unless absolutely necessary.

Prefer incremental refactoring.

---

# Definition of Done

This task is complete only when:

* [ ] Irrelevant collage section is removed.
* [ ] Final CTA routes to `/plan-my-trip`.
* [ ] Call and WhatsApp CTAs are functional placeholders.
* [ ] Navbar links are functional.
* [ ] View All Destinations routes to `/destinations`.
* [ ] Experience cards route to experience pages.
* [ ] Vehicle Book Now buttons route to booking page with vehicle query param.
* [ ] Package cards route to package pages.
* [ ] Trust section exists or is improved.
* [ ] Floating contact widget exists and works.
* [ ] Card readability is fixed globally.
* [ ] Card styling is consistent.
* [ ] Images use placeholders and lazy loading.
* [ ] Homepage storytelling flow feels continuous.
* [ ] Animations are subtle and respect reduced motion.
* [ ] Mobile layout works.
* [ ] Keyboard navigation works.
* [ ] No dead buttons remain.
* [ ] No console errors.
* [ ] Existing brand identity is preserved.

---

# Final Reminder

This is a refinement and expansion task.

Do not redesign.

Do not simplify the website into a generic template.

Do not make the site look like OARS or any other travel website.

Preserve the current identity and elevate it.
