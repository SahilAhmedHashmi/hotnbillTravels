import { usePageMeta } from '../hooks/usePageMeta.js';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import SectionLabel from '../components/common/SectionLabel.jsx';
import Button from '../components/common/Button.jsx';
import { contact } from '../data/contact.js';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Hornbill Journeys | Northeast India Travel',
    description: 'Get in touch with Hornbill Journeys to plan your Northeast India adventure. Phone, WhatsApp, email, and office location.',
  });

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <Breadcrumbs items={[{ label: 'Contact', current: true }]} />
          <p className="label">Get In Touch</p>
          <h1>Contact Hornbill Journeys</h1>
          <p className="contact-hero-desc">
            Whether you're dreaming of wildlife safaris, mountain treks, cultural immersion, or a bespoke Northeast India adventure—
            we're here to make it real. Reach out and let's start planning your journey.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="contact-methods">
        <div className="contact-methods-grid">
          {/* Phone */}
          <article className="contact-card">
            <div className="contact-card-icon phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3>Phone</h3>
            <p className="contact-value">{contact.phoneLabel}</p>
            <Button href={contact.phoneHref} variant="ghost">Call Now</Button>
          </article>

          {/* WhatsApp */}
          <article className="contact-card">
            <div className="contact-card-icon whatsapp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3>WhatsApp</h3>
            <p className="contact-value">{contact.phoneLabel}</p>
            <Button href={contact.whatsappHref} variant="ghost">Message Us</Button>
          </article>

          {/* Email */}
          <article className="contact-card">
            <div className="contact-card-icon email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p className="contact-value">{contact.emailLabel}</p>
            <Button href={contact.emailHref} variant="ghost">Send Email</Button>
          </article>

          {/* Office */}
          <article className="contact-card">
            <div className="contact-card-icon location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3>Office</h3>
            <p className="contact-value">{contact.address}</p>
            <p className="contact-hours">Shillong, Meghalaya</p>
          </article>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="contact-info-section">
        <div className="contact-info-inner">
          <div className="contact-hours-card">
            <h3>Business Hours</h3>
            <div className="hours-grid">
              <div className="hour-row">
                <span>Monday – Saturday</span>
                <strong>9:00 AM – 6:00 PM IST</strong>
              </div>
              <div className="hour-row">
                <span>Sunday</span>
                <strong>Closed</strong>
              </div>
            </div>
            <p className="hours-note">We typically respond to enquiries within 24 hours during business hours.</p>
          </div>

          <div className="contact-promise-card">
            <h3>Our Promise</h3>
            <p>
              Every enquiry receives thoughtful, personalized attention. Our travel specialists will understand your vision and
              craft an itinerary that matches your timeline, budget, interests, and comfort level.
            </p>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="contact-why">
        <div className="contact-why-inner">
          <p className="label">Why Contact Us</p>
          <h2>What We Can Help With</h2>
          <div className="why-grid">
            <div className="why-item">
              <h4>Custom Itineraries</h4>
              <p>Build your perfect Northeast India route with us. Flexible dates, any duration, any destination combination.</p>
            </div>
            <div className="why-item">
              <h4>Vehicle Bookings</h4>
              <p>From compact SUVs to luxury coaches. Experienced drivers, maintained vehicles, flexible rental periods.</p>
            </div>
            <div className="why-item">
              <h4>Group Tours</h4>
              <p>Family reunions, corporate retreats, travel groups. We handle logistics, coordination, and experience design.</p>
            </div>
            <div className="why-item">
              <h4>Adventure Trips</h4>
              <p>Wildlife safaris, mountain treks, river adventures. We arrange permits, guides, and safety protocols.</p>
            </div>
            <div className="why-item">
              <h4>Local Expertise</h4>
              <p>Born and bred in the Northeast. We know the roads, the seasons, the hidden gems, and the best pacing.</p>
            </div>
            <div className="why-item">
              <h4>Travel Planning</h4>
              <p>Stays, meals, permits, timing, weather considerations. We handle the details so you can focus on the experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-inner">
          <h2>Ready to Start Your Journey?</h2>
          <p>Contact us today and let's begin planning your Northeast India adventure.</p>
          <div className="contact-cta-actions">
            <Button href={contact.whatsappHref}>Message on WhatsApp</Button>
            <Button href={contact.phoneHref} variant="ghost">Call Now</Button>
            <Button href={contact.emailHref} variant="ghost">Send Email</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
