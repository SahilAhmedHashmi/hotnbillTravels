import { destinationStates } from '../../data/destinations.js';

export default function DestinationMapPlaceholder() {
  return (
    <section className="destination-map-section">
      <div className="destination-map-copy">
        <p className="label">Regional Coverage</p>
        <h2>Explore the Northeast by Region</h2>
        <p>
          The eight states reward careful routing. We help connect wildlife reserves, mountain valleys, river islands,
          border roads, and cultural stops into routes that work on the ground.
        </p>
      </div>
      <div className="destination-map-placeholder">
        {/* TODO: Replace this regional placeholder with an interactive Northeast map when map data is available. */}
        <div className="map-rings" aria-hidden="true" />
        <div className="map-chips">
          {destinationStates.filter((state) => state !== 'All').map((state) => <span key={state}>{state}</span>)}
        </div>
      </div>
    </section>
  );
}
