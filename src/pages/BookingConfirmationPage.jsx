import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/common/Icon.jsx';
import { contact } from '../data/contact.js';
import { createBookingReference, buildBookingMessage } from '../services/bookingService.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function BookingConfirmationPage() {
  const { state } = useLocation();
  const reference = state?.booking?.reference || createBookingReference();
  const whatsappUrl = state?.booking?.whatsappUrl || (
    state?.form ? `${contact.whatsappHref}?text=${encodeURIComponent(buildBookingMessage(state.form, state.labels || {}, reference))}` : contact.whatsappHref
  );

  usePageMeta({
    title: 'Booking Request Received | Hornbill Journeys',
    description: 'Your Northeast India travel enquiry has been received.',
  });

  return (
    <main className="booking-confirmation-page">
      <section>
        <div className="success-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" />
            <path d="M15 24.5 21.5 31 34 17" />
          </svg>
        </div>
        <p className="label">Booking Request Received</p>
        <h1>Thank you. Our travel experts will review your request and contact you shortly.</h1>
        <div className="booking-reference">
          <span>Booking Reference</span>
          <strong>{reference}</strong>
        </div>
        <p>
          Keep this reference handy. If your dates are urgent, call us or send the enquiry summary on WhatsApp.
        </p>
        <div className="confirmation-actions">
          <a className="btn btn-gold" href={contact.phoneHref}><Icon name="phone" /> Call Us</a>
          <a className="btn btn-ghost" href={whatsappUrl}><Icon name="whatsapp" /> WhatsApp</a>
          <Link className="btn btn-ghost" to="/">Return Home</Link>
        </div>
      </section>
    </main>
  );
}
