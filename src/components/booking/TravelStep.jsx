import FormField from './FormField.jsx';

export default function TravelStep({ form, update, errors }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 2</p>
      <h2>When are you planning to travel?</h2>
      <p>Exact dates help us judge road timing, vehicle availability, permits, and seasonal route conditions.</p>
      <div className="booking-form-grid two">
        <FormField label="Travel Start Date" error={errors.startDate}>
          <input type="date" value={form.startDate} onChange={(event) => update('startDate', event.target.value)} />
        </FormField>
        <FormField label="Travel End Date" error={errors.endDate}>
          <input type="date" value={form.endDate} onChange={(event) => update('endDate', event.target.value)} />
        </FormField>
        <FormField label="Number of Days">
          <input type="number" min="1" value={form.days} onChange={(event) => update('days', event.target.value)} placeholder="Optional" />
        </FormField>
      </div>
    </section>
  );
}
