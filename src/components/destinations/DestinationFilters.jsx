import { destinationStates } from '../../data/destinations.js';

export default function DestinationFilters({ activeState, onChange }) {
  return (
    <div className="destination-filters" aria-label="Filter destinations by state">
      {destinationStates.map((state) => (
        <button
          type="button"
          className={activeState === state ? 'is-active' : ''}
          key={state}
          onClick={() => onChange(state)}
          aria-pressed={activeState === state}
        >
          {state}
        </button>
      ))}
    </div>
  );
}
