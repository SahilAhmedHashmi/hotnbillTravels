import NortheastMap from '../map/NortheastMap.jsx';

export default function DestinationMap() {
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
      <div className="destination-map-panel">
        <NortheastMap hint="Tap a state to see its destinations" />
        <p className="map-helper">
          Select a state to open its map and jump straight to the destinations within it.
        </p>
      </div>
    </section>
  );
}
