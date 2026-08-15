import { contact } from '../data/contact.js';

const pad = (value) => String(value).padStart(5, '0');

export function createBookingReference() {
  // TODO: Replace local reference generation with backend-issued references.
  const year = new Date().getFullYear();
  const seed = Math.floor(Date.now() % 100000);
  return `NE-${year}-${pad(seed)}`;
}

export function buildBookingMessage(form, labels, reference) {
  return [
    'New Booking Enquiry',
    '',
    `Reference: ${reference}`,
    `Destination: ${labels.destination || 'Not selected'}`,
    `Experience: ${labels.experience || 'Not selected'}`,
    `Travel Dates: ${form.startDate || 'TBD'} to ${form.endDate || 'TBD'}`,
    `Travellers: ${Number(form.adults || 0) + Number(form.children || 0)} (${form.adults} adults, ${form.children} children)`,
    `Vehicle: ${labels.vehicle || 'Not selected'}`,
    `Trip Type: ${form.tripType || 'Not selected'}`,
    `Contact: ${form.fullName}, ${form.phone}, ${form.email}, ${form.city}`,
    `Special Requirements: ${form.specialRequirements || 'None'}`,
    `Notes: ${form.notes || 'None'}`,
  ].join('\n');
}

export async function submitBooking(form, labels) {
  const reference = createBookingReference();
  const message = buildBookingMessage(form, labels, reference);

  const emailPayload = {
    to: contact.emailLabel,
    subject: `Booking Enquiry ${reference}`,
    body: message,
  };

  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(message)}`;

  await new Promise((resolve) => window.setTimeout(resolve, 450));

  return {
    reference,
    message,
    whatsappUrl,
    emailPayload,
  };
}
