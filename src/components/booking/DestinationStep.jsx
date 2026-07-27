import FormField from './FormField.jsx';
import { destinations } from '../../data/destinations.js';
import { experiences } from '../../data/experiences.js';

export default function DestinationStep({ form, update, errors }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 1</p>
      <h2>Where would you like to go?</h2>
      <p>Choose a destination or keep the pre-selected context from the page you came from.</p>
      <div className="booking-form-grid">
        <FormField label="Destination" error={errors.destination}>
          <select value={form.destination} onChange={(event) => update('destination', event.target.value)}>
            <option value="">Select destination</option>
            {destinations.map((destination) => (
              <option key={destination.slug} value={destination.slug}>{destination.name} - {destination.state}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Experience">
          <select value={form.experience} onChange={(event) => update('experience', event.target.value)}>
            <option value="">Optional experience style</option>
            {experiences.map((experience) => (
              <option key={experience.slug} value={experience.slug}>{experience.title}</option>
            ))}
          </select>
        </FormField>
      </div>
    </section>
  );
}
