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
    `Passengers / Travellers: ${form.travellers || 0}`,
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

  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(message)}`;
  const response = await fetch('/api/submit-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, labels, reference }),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The enquiry service returned an invalid response.');
  }

  if (!response.ok) {
    throw new Error(result.error || 'The enquiry could not be sent.');
  }

  return {
    reference,
    message,
    whatsappUrl,
    emailSent: result.emailSent === true,
  };
}
