import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { navigation } from '../../data/navigation.js';
import { useScrolledNav } from '../../hooks/useScrolledNav.js';
import DesignControls from './DesignControls.jsx';
import { useDesign } from '../../context/DesignContext.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledNav();
  const location = useLocation();
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const { direction } = useDesign();

  useGSAP(() => {
    if (!open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const links = '.nav-links li, .design-controls';
    const variants = {
      cinematic: { from: { y: 36, opacity: 0 }, to: { y: 0, opacity: 1, duration: .7, stagger: .08, ease: 'power3.out' } },
      editorial: { from: { x: -16, opacity: 0 }, to: { x: 0, opacity: 1, duration: .34, stagger: .045, ease: 'power2.out' } },
      earthy: { from: { y: 18, rotate: -1.5, opacity: 0 }, to: { y: 0, rotate: 0, opacity: 1, duration: .52, stagger: .07, ease: 'sine.out' } },
      minimal: { from: { opacity: 0 }, to: { opacity: 1, duration: .14, stagger: .025, ease: 'none' } },
      photographic: { from: { xPercent: 18, clipPath: 'inset(0 100% 0 0)' }, to: { xPercent: 0, clipPath: 'inset(0 0% 0 0)', duration: .55, stagger: .06, ease: 'power3.out' } },
    };
    gsap.fromTo(links, variants[direction].from, variants[direction].to);
  }, { scope: navRef, dependencies: [open, direction], revertOnUpdate: true });

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
    <nav ref={navRef} className={`site-nav ${isScrolled || open ? 'scrolled' : ''}`} aria-label="Main navigation">
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
          <DesignControls />
        </div>
      </div>
    </nav>
  );
}
