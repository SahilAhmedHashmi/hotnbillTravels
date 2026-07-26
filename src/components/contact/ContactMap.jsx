import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { northeastStates } from '../../data/northeastMap.js';

export default function ContactMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const [openState, setOpenState] = useState(null); // fullscreen focus

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close fullscreen on Escape and lock body scroll while it's open.
  useEffect(() => {
    if (!openState) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenState(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [openState]);

  const renderStates = (activeName) => (
    <svg viewBox="0 0 620 620" className="destination-map-svg">
      {northeastStates.map((state) => (
        <path
          key={state.name}
          d={state.path}
          pathLength="100"
          className={`map-state ${activeName === state.name ? 'is-active' : ''} ${
            hoveredState === state.name ? 'is-hovered' : ''
          }`}
          role="button"
          tabIndex={0}
          aria-label={`View ${state.name}`}
          onMouseEnter={() => setHoveredState(state.name)}
          onMouseLeave={() => setHoveredState(null)}
          onFocus={() => setHoveredState(state.name)}
          onBlur={() => setHoveredState(null)}
          onClick={() => setOpenState(state.name)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpenState(state.name);
            }
          }}
        />
      ))}
    </svg>
  );

  return (
    <>
      <div className={`contact-map ${isVisible ? 'is-visible' : ''}`}>
        {renderStates(null)}

        {northeastStates.map((state) =>
          hoveredState === state.name ? (
            <span
              key={`label-${state.name}`}
              className="map-state-label"
              style={{ left: `${(state.lx / 620) * 100}%`, top: `${(state.ly / 620) * 100}%` }}
              aria-hidden="true"
            >
              {state.name}
            </span>
          ) : null,
        )}

        <span className="contact-map-tag">Northeast India · 8 States</span>
        <p className="contact-map-hint">Tap a state to explore</p>
      </div>

      {openState && createPortal(
        <div
          className="contact-map-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${openState} on the map of Northeast India`}
          onClick={() => setOpenState(null)}
        >
          <button type="button" className="contact-map-close" aria-label="Close map" onClick={() => setOpenState(null)}>
            &times;
          </button>
          <div className="contact-map-stage" onClick={(event) => event.stopPropagation()}>
            <div className="contact-map-stage-head">
              <p className="label">Northeast India</p>
              <h3>{openState}</h3>
              <p>Tap another state to shift focus, or explore what to see and do here.</p>
            </div>
            <div className="contact-map-stage-svg">{renderStates(openState)}</div>
            <Link className="btn btn-gold" to={`/destinations?state=${encodeURIComponent(openState)}`}>
              Explore {openState} destinations
            </Link>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
