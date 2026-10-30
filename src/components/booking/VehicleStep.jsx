import FormField from './FormField.jsx';
import { vehicles } from '../../data/vehicles.js';

const tripTypes = ['Family', 'Friends', 'Corporate', 'Couple', 'Photography', 'Adventure'];

export default function VehicleStep({ form, update }) {
  return (
    <section className="booking-step-panel">
      <p className="label">Step 4</p>
      <h2>What kind of vehicle feels right?</h2>
      <p>If you are unsure, choose the closest option. Our team can recommend the right vehicle after reviewing your route.</p>
      <div className="vehicle-choice-grid" role="radiogroup" aria-label="Preferred vehicle">
        <button type="button" className={`vehicle-choice ${!form.vehicle ? 'selected' : ''}`} onClick={() => update('vehicle', '')} aria-pressed={!form.vehicle}>
          <strong>No preference yet</strong>
          <span>Let our team recommend a vehicle</span>
        </button>
        {vehicles.map((vehicle) => (
          <button key={vehicle.slug} type="button" className={`vehicle-choice ${form.vehicle === vehicle.slug ? 'selected' : ''}`} onClick={() => update('vehicle', vehicle.slug)} aria-pressed={form.vehicle === vehicle.slug}>
            <img src={vehicle.image} alt="" />
            <strong>{vehicle.name}</strong>
            <span>{vehicle.passengerCapacity}</span>
          </button>
        ))}
      </div>
      <div className="booking-form-grid two">
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
