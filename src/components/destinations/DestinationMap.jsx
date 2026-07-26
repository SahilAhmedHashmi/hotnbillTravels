import { useEffect, useState } from 'react';
import { northeastStates as mapStates, destinationMarkers as markers } from '../../data/northeastMap.js';

export default function DestinationMap({ activeState, onChange }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        <div className="destination-map-toolbar">
          <p className="map-toolbar-label">
            {activeState === 'All' ? 'A curated atlas of the Northeast' : `${activeState} highlights`}
          </p>
          <button type="button" className="map-reset" onClick={() => onChange('All')}>
            Show All
          </button>
        </div>
        <div className={`destination-map-placeholder ${isVisible ? 'is-visible' : ''}`} role="img" aria-label="Interactive atlas map of Northeast India states">
          <div className="map-rings" aria-hidden="true" />
          <svg viewBox="0 0 620 620" className="destination-map-svg" aria-hidden="true">
            <defs>
              <filter id="stateGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {mapStates.map((state) => (
              <path
                key={state.name}
                d={state.path}
                pathLength="100"
                className={`map-state ${activeState === state.name ? 'is-active' : ''} ${hoveredState === state.name ? 'is-hovered' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${state.name}`}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                onFocus={() => setHoveredState(state.name)}
                onBlur={() => setHoveredState(null)}
                onClick={() => onChange(state.name)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onChange(state.name);
                  }
                }}
              />
            ))}
          </svg>
          {mapStates.map((state) => (
            hoveredState === state.name && (
              <span
                key={`label-${state.name}`}
                className="map-state-label"
                style={{ left: `${(state.lx / 620) * 100}%`, top: `${(state.ly / 620) * 100}%` }}
                aria-hidden="true"
              >
                {state.name}
              </span>
            )
          ))}
          {markers.map((marker, index) => {
            const visible = activeState === 'All' || marker.state === activeState;
            return (
              <button
                key={marker.id}
                type="button"
                className={`map-marker ${visible ? 'is-visible' : ''} ${hoveredMarker === marker.id ? 'is-hovered' : ''}`}
                style={{ left: `${(marker.x / 620) * 100}%`, top: `${(marker.y / 620) * 100}%`, animationDelay: `${index * 90}ms` }}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                onFocus={() => setHoveredMarker(marker.id)}
                onBlur={() => setHoveredMarker(null)}
                onClick={() => onChange(marker.state)}
                aria-label={`View ${marker.name} in ${marker.state}`}
              >
                <span className="map-marker-dot" />
                {hoveredMarker === marker.id && (
                  <span className="map-tooltip">
                    <strong>{marker.name}</strong>
                    <span>{marker.location}</span>
                    <em>{marker.type}</em>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="map-helper">Select a state to focus the destination cards below, or reset to view the full atlas.</p>
      </div>
    </section>
  );
}
