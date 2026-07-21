import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { navigation } from '../../data/navigation.js';
import { useScrolledNav } from '../../hooks/useScrolledNav.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledNav();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
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
        <button className="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span />
          <span />
        </button>
        <div className={`nav-menu ${open ? 'is-open' : ''}`}>
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
