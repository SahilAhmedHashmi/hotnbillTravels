import { useMemo, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta.js';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import Button from '../components/common/Button.jsx';
import Icon from '../components/common/Icon.jsx';
import Reveal from '../components/common/Reveal.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import { contact } from '../data/contact.js';

const INTERESTS = [
  'Custom Itinerary',
  'Vehicle & Driver Rental',
  'Group / Corporate Tour',
  'Wildlife & Adventure',
  'General Enquiry',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  interest: INTERESTS[0],
  travelDate: '',
  message: '',
};

const methods = [
  {
    key: 'phone',
    icon: 'phone',
    label: 'Call Us',
    value: contact.phoneLabel,
    note: 'Mon–Sat, 9am–6pm IST',
    href: contact.phoneHref,
    action: 'Call now',
  },
  {
    key: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: contact.phoneLabel,
    note: 'Fastest replies, share ideas & photos',
    href: contact.whatsappHref,
    action: 'Message us',
    external: true,
  },
  {
    key: 'email',
    icon: 'mail',
    label: 'Email',
    value: contact.emailLabel,
    note: 'Detailed enquiries & documents',
    href: contact.emailHref,
    action: 'Send email',
  },
];

const helpItems = [
  { title: 'Custom Itineraries', text: 'Your perfect Northeast route — flexible dates, any duration, any combination of states.' },
  { title: 'Vehicle & Drivers', text: 'Compact SUVs to luxury coaches with experienced local drivers and transparent pricing.' },
  { title: 'Group & Corporate', text: 'Family reunions, retreats, and travel groups — logistics, coordination, and experience design.' },
  { title: 'Wildlife & Adventure', text: 'Safaris, treks, and river journeys with permits, guides, and safety handled end to end.' },
  { title: 'Local Expertise', text: 'Born in the Northeast — we know the roads, the seasons, the hidden gems, and the right pacing.' },
  { title: 'Full Trip Planning', text: 'Stays, meals, permits, timing, and weather — the details managed so you can just travel.' },
];

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Hornbill Journeys | Northeast India Travel',
    description:
      'Get in touch with Hornbill Journeys to plan your Northeast India adventure. Send an enquiry, or reach us by phone, WhatsApp, or email.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Hornbill Journeys',
      email: contact.emailLabel,
      telephone: contact.phoneLabel,
      address: contact.address,
      areaServed: 'Northeast India',
    },
  });

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Please tell us your name.';
    if (!form.email.trim()) next.email = 'We need an email to reply.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'That email looks incomplete.';
    if (form.message.trim().length < 10) next.message = 'A few more details help us plan (10+ characters).';
    return next;
  };

  const enquiryText = useMemo(() => {
    const lines = [
      'New travel enquiry — Hornbill Journeys',
      '',
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `Interest: ${form.interest}`,
      form.travelDate && `Preferred dates: ${form.travelDate}`,
      '',
      form.message,
    ].filter(Boolean);
    return lines.join('\n');
  }, [form]);

  const waHref = `${contact.whatsappHref}?text=${encodeURIComponent(enquiryText)}`;
  const mailHref = `${contact.emailHref}?subject=${encodeURIComponent(
    `Travel enquiry — ${form.interest}`,
  )}&body=${encodeURIComponent(enquiryText)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-inner">
          <Breadcrumbs items={[{ label: 'Contact', current: true }]} />
          <p className="label">Get In Touch</p>
          <h1>Let&rsquo;s plan your Northeast India journey</h1>
          <p className="contact-hero-desc">
            Wildlife safaris, mountain treks, cultural immersion, or a fully bespoke route — tell us what you have in
            mind and a local travel specialist will craft it around your dates, pace, and budget.
          </p>
          <div className="contact-hero-actions">
            <Button href={contact.whatsappHref}>
              <Icon name="whatsapp" /> Chat on WhatsApp
            </Button>
            <Button href={contact.phoneHref} variant="ghost">
              <Icon name="phone" /> {contact.phoneLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Get in touch — form + direct contact rail */}
      <section className="contact-connect">
        <div className="contact-connect-inner">
          {/* Enquiry form */}
          <Reveal className="contact-form-panel">
            {!submitted ? (
              <>
                <p className="label">Send an Enquiry</p>
                <h2>Tell us about your trip</h2>
                <p className="contact-form-lead">
                  Share a few details and we&rsquo;ll reply with ideas and a tailored quote — usually within 24 hours.
                </p>

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-field-grid">
                    <label className={`contact-field ${errors.fullName ? 'has-error' : ''}`}>
                      <span>Full Name*</span>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        autoComplete="name"
                        placeholder="Your name"
                      />
                      {errors.fullName && <small>{errors.fullName}</small>}
                    </label>

                    <label className={`contact-field ${errors.email ? 'has-error' : ''}`}>
                      <span>Email*</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                      {errors.email && <small>{errors.email}</small>}
                    </label>

                    <label className="contact-field">
                      <span>Phone / WhatsApp</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="Optional"
                      />
                    </label>

                    <label className="contact-field">
                      <span>Preferred Dates</span>
                      <input
                        type="text"
                        value={form.travelDate}
                        onChange={(e) => update('travelDate', e.target.value)}
                        placeholder="e.g. Mid-October, 8 days"
                      />
                    </label>

                    <label className="contact-field contact-field-full">
                      <span>I&rsquo;m interested in</span>
                      <select value={form.interest} onChange={(e) => update('interest', e.target.value)}>
                        {INTERESTS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={`contact-field contact-field-full ${errors.message ? 'has-error' : ''}`}>
                      <span>Your Message*</span>
                      <textarea
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={5}
                        placeholder="Where you'd like to go, group size, must-see places, budget range..."
                      />
                      {errors.message && <small>{errors.message}</small>}
                    </label>
                  </div>

                  <button type="submit" className="btn btn-gold contact-submit">
                    Review &amp; Send
                  </button>
                  <p className="contact-form-note">
                    We use your details only to answer this enquiry. No spam, ever.
                  </p>
                </form>
              </>
            ) : (
              <div className="contact-success" role="status" aria-live="polite">
                <div className="contact-success-mark">
                  <svg viewBox="0 0 52 52" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" />
                    <path d="M16 27l7 7 13-14" />
                  </svg>
                </div>
                <p className="label">Almost there</p>
                <h2>Thanks, {form.fullName.split(' ')[0]}!</h2>
                <p className="contact-form-lead">
                  Your enquiry is ready. Send it through your preferred channel and we&rsquo;ll get back to you within
                  24 hours.
                </p>

                <div className="contact-summary">
                  <div>
                    <span>Interest</span>
                    <strong>{form.interest}</strong>
                  </div>
                  {form.travelDate && (
                    <div>
                      <span>Dates</span>
                      <strong>{form.travelDate}</strong>
                    </div>
                  )}
                  <div>
                    <span>Reply to</span>
                    <strong>{form.email}</strong>
                  </div>
                </div>

                <div className="contact-success-actions">
                  <a className="btn btn-gold" href={waHref} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" /> Send on WhatsApp
                  </a>
                  <a className="btn btn-ghost" href={mailHref}>
                    <Icon name="mail" /> Send by Email
                  </a>
                </div>
                <button type="button" className="contact-reset" onClick={resetForm}>
                  Start a new enquiry
                </button>
              </div>
            )}
          </Reveal>

          {/* Direct contact rail */}
          <div className="contact-rail">
            <Reveal className="contact-methods-card">
              <p className="label">Reach Us Directly</p>
              <ul className="contact-method-list">
                {methods.map((method) => (
                  <li key={method.key}>
                    <a
                      href={method.href}
                      className="contact-method"
                      {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="contact-method-icon">
                        <Icon name={method.icon} />
                      </span>
                      <span className="contact-method-body">
                        <span className="contact-method-label">{method.label}</span>
                        <span className="contact-method-value">{method.value}</span>
                        <span className="contact-method-note">{method.note}</span>
                      </span>
                      <span className="contact-method-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="contact-hours-card" delay={1}>
              <p className="label">Office Hours</p>
              <div className="contact-hours-row">
                <span>Monday – Saturday</span>
                <strong>9:00 AM – 6:00 PM IST</strong>
              </div>
              <div className="contact-hours-row">
                <span>Sunday</span>
                <strong>Closed</strong>
              </div>
              <p className="contact-hours-note">
                Enquiries sent outside these hours are answered first thing the next working day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we can help with */}
      <section className="contact-help">
        <div className="contact-help-inner">
          <div className="contact-help-head">
            <p className="label">Why Contact Us</p>
            <h2>What we can help you with</h2>
          </div>
          <div className="contact-help-grid">
            {helpItems.map((item, index) => (
              <Reveal key={item.title} className="contact-help-item" delay={index % 3}>
                <span className="contact-help-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office location */}
      <section className="contact-office">
        <div className="contact-office-inner">
          <Reveal className="contact-office-copy">
            <p className="label">Our Base</p>
            <h2>Rooted in the Northeast</h2>
            <p>
              We&rsquo;re on the ground where you&rsquo;ll be travelling — which means first-hand road knowledge,
              trusted local partners, and quick answers when plans change en route.
            </p>
            <div className="contact-office-address">
              <span className="contact-method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p>{contact.address}</p>
            </div>
            <Button href={contact.whatsappHref} variant="ghost">
              <Icon name="whatsapp" /> Ask for directions
            </Button>
          </Reveal>
          <Reveal className="contact-office-visual" delay={1}>
            <div className="contact-office-grid-lines" />
            <div className="contact-office-pin">
              <span className="contact-office-pin-dot" />
              <span className="contact-office-pin-ring" />
            </div>
            <span className="contact-office-tag">Northeast India</span>
          </Reveal>
        </div>
      </section>

      <FinalCta
        eyebrow="Ready When You Are"
        title="Start planning your adventure"
        text="Send an enquiry above, or reach out on your favourite channel — either way, a real person on our team will help you shape the trip."
        primaryLabel="Explore Packages"
        primaryTo="/packages"
      />
    </main>
  );
}
