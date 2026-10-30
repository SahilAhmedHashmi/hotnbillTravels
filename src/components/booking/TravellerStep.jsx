import FormField from './FormField.jsx';

export default function TravellerStep({ form, update, errors }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 3</p>
      <h2>Who is travelling?</h2>
      <p>Traveller count helps us recommend the right vehicle and pacing.</p>
      <div className="booking-form-grid two">
        <FormField label="Passengers / Travellers" error={errors.travellers}>
          <input type="number" min="1" value={form.travellers} onChange={(event) => update('travellers', event.target.value)} />
        </FormField>
        <FormField label="Special Requirements">
          <textarea value={form.specialRequirements} onChange={(event) => update('specialRequirements', event.target.value)} placeholder="Senior citizens, infant, wheelchair, dietary notes..." />
        </FormField>
      </div>
    </section>
  );
}
