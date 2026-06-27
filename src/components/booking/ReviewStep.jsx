export default function ReviewStep({ form, labels }) {
  const travellers = Number(form.adults || 0) + Number(form.children || 0);
  const rows = [
    ['Destination', labels.destination || 'Not selected'],
    ['Experience', labels.experience || 'Not selected'],
    ['Package', labels.package || 'Not selected'],
    ['Dates', `${form.startDate || 'TBD'} to ${form.endDate || 'TBD'}`],
    ['Travellers', `${travellers} total`],
    ['Vehicle', labels.vehicle || 'No preference'],
    ['Contact', `${form.fullName || '-'} / ${form.phone || '-'} / ${form.email || '-'}`],
    ['Notes', form.notes || form.specialRequirements || 'None'],
  ];

  return (
    <section className="booking-step-panel">
      <p className="label">Step 6</p>
      <h2>Review your request.</h2>
      <p>This is an enquiry, not a payment. Our team will review the route and contact you with practical options.</p>
      <dl className="booking-review">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
