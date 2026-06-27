import { useEffect, useRef, useState } from 'react';
import Icon from '../common/Icon.jsx';
import { contact } from '../../data/contact.js';

export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className={`floating-contact ${open ? 'is-open' : ''}`} ref={widgetRef}>
      <div className="floating-panel" aria-hidden={!open}>
        <a href={contact.phoneHref}><Icon name="phone" /> Call Us</a>
        <a href={contact.whatsappHref}><Icon name="whatsapp" /> WhatsApp</a>
        <a href={contact.emailHref}><Icon name="mail" /> Email</a>
        <button type="button" onClick={backToTop}><Icon name="arrow-up" /> Back to Top</button>
      </div>
      <button
        className="floating-toggle"
        type="button"
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? 'close' : 'phone'} />
      </button>
    </div>
  );
}
