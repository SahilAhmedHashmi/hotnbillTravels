import FormField from './FormField.jsx';

export default function ContactStep({ form, update, errors }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 5</p>
      <h2>How should we reach you?</h2>
      <p>We will use these details only to respond to your travel enquiry.</p>
      <div className="booking-form-grid two">
        <FormField label="Full Name" error={errors.fullName}>
          <input value={form.fullName} onChange={(event) => update('fullName', event.target.value)} autoComplete="name" />
        </FormField>
        <FormField label="Phone Number" error={errors.phone}>
          <input value={form.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" />
        </FormField>
        <FormField label="Email Address" error={errors.email}>
          <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" />
        </FormField>
        <FormField label="City">
          <input value={form.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" />
        </FormField>
        <FormField label="Additional Notes">
          <textarea value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Hotel preference, route doubts, arrival city, budget range..." />
        </FormField>
      </div>
    </section>
  );
}
