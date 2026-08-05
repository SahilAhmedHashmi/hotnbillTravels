import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { navigation } from '../../data/navigation.js';
import { useScrolledNav } from '../../hooks/useScrolledNav.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledNav();
  const location = useLocation();
  const toggleRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.classList.toggle('nav-open', open);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <nav className={`site-nav ${isScrolled || open ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav-inner">
        <Logo />
        <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span />
          <span />
        </button>
        <div className={`nav-menu ${open ? 'is-open' : ''}`} id="primary-navigation">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.to}>
                {item.to.includes('#') ? (
                  // Hash links (e.g. in-page section anchors) render as plain links so they
                  // don't pick up NavLink's "active" state on every matching pathname.
                  <Link to={item.to} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink to={item.to} onClick={() => setOpen(false)}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
