import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { northeastStates, destinationMarkers } from '../../data/northeastMap.js';
import { destinations } from '../../data/destinations.js';

// Resolve each signature marker to its destination slug (markers are keyed by name).
const slugByName = new Map(destinations.map((item) => [item.name, item.slug]));
const disabledStates = new Set(['Manipur', 'Nagaland']);

/**
 * Interactive atlas of Northeast India. Clicking a state opens a focused,
 * enlarged view of only that state with its destinations as points; clicking a
 * point navigates to that destination. Shared by the contact and destinations pages.
 */
export default function NortheastMap({ tag = 'Six states we travel', hint = 'Select a highlighted state' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const [openName, setOpenName] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openState = useMemo(() => northeastStates.find((state) => state.name === openName) || null, [openName]);

  return (
    <>
      <div className={`ne-map ${isVisible ? 'is-visible' : ''}`}>
        <svg viewBox="0 0 620 620" className="ne-map-svg">
          {northeastStates.map((state) => {
            const isDisabled = disabledStates.has(state.name);
            const isHovered = hoveredState === state.name;

            return (
              <path
                key={state.name}
                d={state.path}
                pathLength="100"
                className={`map-state ${isDisabled ? 'is-disabled' : ''} ${!isDisabled && isHovered ? 'is-hovered' : ''}`}
                role={isDisabled ? 'img' : 'button'}
                tabIndex={isDisabled ? -1 : 0}
                aria-label={isDisabled ? state.name : `Explore ${state.name}`}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                onFocus={() => setHoveredState(state.name)}
                onBlur={() => setHoveredState(null)}
                onClick={() => {
                  if (!isDisabled) setOpenName(state.name);
                }}
                onKeyDown={(event) => {
                  if (isDisabled) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setOpenName(state.name);
                  }
                }}
              />
            );
          })}
        </svg>

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

        {tag && <span className="ne-map-tag">{tag}</span>}
        {hint && <p className="ne-map-hint">{hint}</p>}
      </div>

      {openState && createPortal(<StateFocus state={openState} onClose={() => setOpenName(null)} />, document.body)}
    </>
  );
}

function StateFocus({ state, onClose }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const points = useMemo(
    () =>
      destinationMarkers
        .filter((marker) => marker.state === state.name)
        .map((marker) => ({ ...marker, slug: slugByName.get(marker.name) }))
        .filter((marker) => marker.slug),
    [state.name],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const { minX, minY, maxX, maxY } = state.bbox;
  const w = maxX - minX;
  const h = maxY - minY;
  const dim = Math.max(w, h);
  const pad = dim * 0.16;
  const viewBox = `${minX - pad} ${minY - pad} ${w + pad * 2} ${h + pad * 2}`;
  const r = dim * 0.02;
  const fontSize = dim * 0.042;

  const openDestination = (slug) => {
    onClose();
    navigate(`/destinations/${slug}`);
  };

  return (
    <div
      className="ne-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Destinations in ${state.name}`}
      onClick={onClose}
    >
      <button type="button" className="ne-modal-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <div className="ne-modal-stage" onClick={(event) => event.stopPropagation()}>
        <div className="ne-modal-head">
          <p className="label">Northeast India</p>
          <h3>{state.name}</h3>
          <p>
            {points.length
              ? 'Tap a highlighted point to open that destination.'
              : 'Detailed destinations for this state are coming soon.'}
          </p>
        </div>

        <svg viewBox={viewBox} className="ne-modal-svg">
          <path d={state.path} pathLength="100" className="map-state ne-focus-state" vectorEffect="non-scaling-stroke" />
          {points.map((point) => (
            <g
              key={point.id}
              className={`ne-point ${hovered === point.id ? 'is-hovered' : ''}`}
              transform={`translate(${point.x} ${point.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${point.name}`}
              onMouseEnter={() => setHovered(point.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(point.id)}
              onBlur={() => setHovered(null)}
              onClick={() => openDestination(point.slug)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openDestination(point.slug);
                }
              }}
            >
              <circle className="ne-point-halo" r={r * 2.4} />
              <circle className="ne-point-dot" r={r} />
              <text
                className="ne-point-label"
                y={-r * 2.8}
                fontSize={fontSize}
                textAnchor="middle"
                strokeWidth={fontSize * 0.16}
              >
                {point.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
