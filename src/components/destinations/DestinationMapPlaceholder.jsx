import { useEffect, useState } from 'react';

const mapStates = [
  { name: 'Arunachal Pradesh', path: 'M310 122 L365 138 L415 170 L455 188 L448 222 L422 235 L392 238 L358 262 L334 247 L300 234 L272 195 L278 168 Z' },
  { name: 'Assam', path: 'M238 260 L292 242 L332 250 L362 278 L342 320 L310 340 L270 330 L226 314 L214 287 Z' },
  { name: 'Meghalaya', path: 'M292 320 L326 308 L348 332 L336 356 L310 360 L282 344 Z' },
  { name: 'Nagaland', path: 'M350 308 L388 290 L418 304 L416 336 L388 354 L354 342 Z' },
  { name: 'Manipur', path: 'M384 344 L432 334 L462 352 L458 388 L430 408 L392 396 L372 368 Z' },
  { name: 'Mizoram', path: 'M390 402 L430 410 L450 452 L426 486 L384 484 L360 448 Z' },
  { name: 'Tripura', path: 'M446 452 L486 452 L500 480 L478 500 L444 492 L430 472 Z' },
  { name: 'Sikkim', path: 'M262 186 L296 172 L316 182 L306 208 L280 218 L246 210 Z' },
];

const markers = [
  { id: 'living-root-bridges', name: 'Living Root Bridges', location: 'Nongriat, Meghalaya', type: 'Nature • Trekking', state: 'Meghalaya', x: 300, y: 338 },
  { id: 'dawki-river', name: 'Dawki River', location: 'Shnongpdeng, Meghalaya', type: 'Water • Boating', state: 'Meghalaya', x: 286, y: 350 },
  { id: 'nohkalikai-falls', name: 'Nohkalikai Falls', location: 'Cherrapunji, Meghalaya', type: 'Scenery • Adventure', state: 'Meghalaya', x: 280, y: 325 },
  { id: 'kaziranga-national-park', name: 'Kaziranga National Park', location: 'Assam', type: 'Wildlife • Safari', state: 'Assam', x: 272, y: 286 },
  { id: 'majuli-island', name: 'Majuli Island', location: 'Brahmaputra, Assam', type: 'Culture • River Life', state: 'Assam', x: 248, y: 302 },
  { id: 'tawang-monastery', name: 'Tawang Monastery', location: 'Tawang, Arunachal Pradesh', type: 'Culture • Monastery', state: 'Arunachal Pradesh', x: 380, y: 188 },
  { id: 'sela-pass', name: 'Sela Pass', location: 'Arunachal Pradesh', type: 'Scenery • Mountain Roads', state: 'Arunachal Pradesh', x: 356, y: 216 },
  { id: 'dzukou-valley', name: 'Dzukou Valley', location: 'Nagaland', type: 'Trekking • Meadow Views', state: 'Nagaland', x: 374, y: 322 },
  { id: 'loktak-lake', name: 'Loktak Lake', location: 'Manipur', type: 'Lake • Floating Islands', state: 'Manipur', x: 426, y: 368 },
  { id: 'neermahal-palace', name: 'Neermahal Palace', location: 'Tripura', type: 'Heritage • Palace Stay', state: 'Tripura', x: 465, y: 470 },
  { id: 'vantawng-falls', name: 'Vantawng Falls', location: 'Mizoram', type: 'Nature • Waterfall Trail', state: 'Mizoram', x: 410, y: 440 },
  { id: 'gurudongmar-lake', name: 'Gurudongmar Lake', location: 'North Sikkim', type: 'High Altitude • Sacred', state: 'Sikkim', x: 278, y: 198 },
];

export default function DestinationMapPlaceholder({ activeState, onChange }) {
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
                className={`map-state ${activeState === state.name ? 'is-active' : ''} ${hoveredState === state.name ? 'is-hovered' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${state.name}`}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => onChange(state.name)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onChange(state.name);
                  }
                }}
              />
            ))}
            <path className="map-route route-one" d="M286 338 C304 324, 320 286, 356 222" />
            <path className="map-route route-two" d="M276 286 C300 294, 320 304, 374 322" />
            <path className="map-route route-three" d="M374 322 C402 340, 426 348, 462 370" />
          </svg>
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
