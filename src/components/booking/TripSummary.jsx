export default function TripSummary({ form, labels }) {
  const travellers = Number(form.adults || 0) + Number(form.children || 0);

  return (
    <aside className="trip-summary" aria-label="Live trip summary">
      <p className="label">Trip Summary</p>
      <h2>Your enquiry so far</h2>
      <div>
        <span>Destination</span>
        <strong>{labels.destination || 'Not selected'}</strong>
      </div>
      <div>
        <span>Travel Dates</span>
        <strong>{form.startDate && form.endDate ? `${form.startDate} to ${form.endDate}` : 'Dates needed'}</strong>
      </div>
      <div>
        <span>Duration</span>
        <strong>{form.days ? `${form.days} days` : 'Calculated after dates'}</strong>
      </div>
      <div>
        <span>Travellers</span>
        <strong>{travellers || 'Add travellers'}</strong>
      </div>
      <div>
        <span>Vehicle</span>
        <strong>{labels.vehicle || 'No preference'}</strong>
      </div>
      <div>
        <span>Booking Type</span>
        <strong>{labels.experience || form.tripType || 'Personalised enquiry'}</strong>
      </div>
    </aside>
  );
}
