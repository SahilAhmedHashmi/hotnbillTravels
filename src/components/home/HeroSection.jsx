import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';

const content = {
  cinematic: { eyebrow: 'A journey in six landscapes', title: <>The road into <em>Northeast India</em></>, body: 'Private vehicles and complete journeys across Assam, Meghalaya, Arunachal Pradesh, Mizoram, Tripura, and Sikkim.' },
  editorial: { eyebrow: 'Hornbill Journeys — Northeast India', title: <>Journeys, <em>considered.</em></>, body: 'Routes shaped with local judgement. Comfortable vehicles, meaningful places, and enough room to experience them.' },
  earthy: { eyebrow: 'From river plain to high pass', title: <>Travel at the <em>pace of the land.</em></>, body: 'Forests, waterfalls, valleys, villages and mountain roads—with a local driver who understands the route.' },
  minimal: { eyebrow: 'Northeast India / 06 states', title: <>A clear way <em>to go further.</em></>, body: 'Choose a vehicle. Choose a complete trip. Or tell us what you want to see and we will shape the route.' },
  photographic: { eyebrow: 'Field notes / Northeast India', title: <>Six states. <em>Many ways in.</em></>, body: 'Travel through rain country, river islands, wildlife landscapes and mountain valleys with Hornbill Journeys.' },
};

export default function HeroSection({ direction = 'cinematic' }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const timeout = window.setTimeout(() => setLoaded(true), 80); return () => window.clearTimeout(timeout); }, []);
  const copy = content[direction];
  return <section className={`hero hero-${direction}`}>
    <div className={`hero-bg ${loaded ? 'loaded' : ''}`} />
    <div className="hero-overlay" /><div className="hero-grain" />
    <div className="hero-content">
      <p className="hero-kicker">{copy.eyebrow}</p>
      <h1 className="hero-title">{copy.title}</h1>
      <p className="hero-desc">{copy.body}</p>
      <div className="hero-actions"><Button to="/plan-my-trip">Plan a complete trip</Button><Button to="/fleet" variant="ghost">Book a vehicle</Button></div>
    </div>
    <p className="hero-caption" aria-hidden="true">Roads / rivers / forests / highlands</p>
  </section>;
}
