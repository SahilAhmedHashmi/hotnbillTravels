const RECIPIENT = 'hornbilljourneys@gmail.com';
const MAX_LENGTH = 2000;

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const bounded = (value) => text(value).slice(0, MAX_LENGTH);

const sendJson = (response, status, body) => response.status(status).json(body);

const validatePayload = (payload) => {
  const form = payload?.form;
  const labels = payload?.labels;
  const reference = text(payload?.reference);

  if (!form || typeof form !== 'object' || !labels || typeof labels !== 'object' || !reference) {
    return 'Incomplete enquiry payload.';
  }
  if (!bounded(form.fullName) || !bounded(form.phone) || !bounded(form.email)) {
    return 'Name, phone, and email are required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return 'A valid email address is required.';
  }
  return null;
};

const buildEmail = ({ form, labels, reference }) => {
  const rows = [
    ['Reference', reference],
    ['Destination', labels.destination || 'Not selected'],
    ['Experience', labels.experience || 'Not selected'],
    ['Travel dates', `${form.startDate || 'TBD'} to ${form.endDate || 'TBD'}`],
    ['Travellers', `${Number(form.adults || 0) + Number(form.children || 0)} (${form.adults || 0} adults, ${form.children || 0} children)`],
    ['Vehicle', labels.vehicle || 'Not selected'],
    ['Trip type', form.tripType || 'Not selected'],
    ['Full name', form.fullName],
    ['Phone', form.phone],
    ['Email', form.email],
    ['City', form.city || 'Not provided'],
    ['Special requirements', form.specialRequirements || 'None'],
    ['Notes', form.notes || 'None'],
  ];

  const textBody = [
    'New Booking Enquiry',
    '',
    ...rows.map(([label, value]) => `${label}: ${bounded(value)}`),
  ].join('\n');

  const htmlBody = `
    <h2>New Booking Enquiry</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
      ${rows.map(([label, value]) => `<tr><th align="left">${label}</th><td>${bounded(value).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]))}</td></tr>`).join('')}
    </table>
  `;

  return { textBody, htmlBody };
};

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed.' });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return sendJson(response, 503, { error: 'Email delivery is not configured.' });
  }

  let payload;
  try {
    payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return sendJson(response, 400, { error: 'Invalid enquiry payload.' });
  }

  const validationError = validatePayload(payload);
  if (validationError) return sendJson(response, 400, { error: validationError });

  const { textBody, htmlBody } = buildEmail(payload);
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [RECIPIENT],
      reply_to: bounded(payload.form.email),
      subject: `Booking Enquiry ${bounded(payload.reference)}`,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!resendResponse.ok) {
    return sendJson(response, 502, { error: 'The email provider could not deliver the enquiry.' });
  }

  return sendJson(response, 200, { emailSent: true });
}
