import FormField from './FormField.jsx';
import { vehicles } from '../../data/vehicles.js';

const tripTypes = ['Family', 'Friends', 'Corporate', 'Couple', 'Photography', 'Adventure'];

export default function VehicleStep({ form, update }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 4</p>
      <h2>What kind of vehicle feels right?</h2>
      <p>If you are unsure, choose the closest option. Our team can recommend the right vehicle after reviewing your route.</p>
      <div className="booking-form-grid two">
        <FormField label="Preferred Vehicle">
          <span className="select-chevron">
            <select value={form.vehicle} onChange={(event) => update('vehicle', event.target.value)}>
              <option value="">Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.slug} value={vehicle.slug}>{vehicle.name}</option>
              ))}
            </select>
          </span>
        </FormField>
        <FormField label="Trip Type">
          <select value={form.tripType} onChange={(event) => update('tripType', event.target.value)}>
            <option value="">Select trip type</option>
            {tripTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </FormField>
      </div>
    </section>
  );
}
