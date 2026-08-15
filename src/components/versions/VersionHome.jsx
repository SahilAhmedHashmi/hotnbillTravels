import { Link } from 'react-router-dom';
import HeroSection from '../home/HeroSection.jsx';
import { featuredDestinations } from '../../data/destinations.js';
import { homepageExperiences } from '../../data/experiences.js';
import { vehicles } from '../../data/vehicles.js';
import { journeyIdeas } from '../../data/journeys.js';

const Arrow = () => <span className="v-arrow" aria-hidden="true">↗</span>;
const Picture = ({ item, eager = false }) => (
  <img src={item.image} alt={item.alt || item.name || item.title || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
);
const destinationPath = (item) => `/destinations/${item.slug}`;
const experiencePath = (item) => `/experiences/${item.slug}`;
const journeyPath = (item) => `/plan-my-trip?destination=${item.destinationSlugs[0]}&experience=${item.experienceSlug}`;

export default function VersionHome({ direction }) {
  if (direction === 'editorial') return <EditorialHome />;
  if (direction === 'earthy') return <EarthyHome />;
  if (direction === 'minimal') return <MinimalHome />;
  if (direction === 'photographic') return <PhotographicHome />;
  return <CinematicHome />;
}

function CinematicHome() {
  const scenes = featuredDestinations.slice(0, 4);
  return <>
    <HeroSection direction="cinematic" />
    <section className="cine-overture" aria-label="Introduction">
      <div className="cine-overture__index">Prologue / 01</div>
      <h2>Six landscapes.<br /><span>One unfolding road.</span></h2>
      <div className="cine-overture__notes"><span>River plain</span><span>Rain country</span><span>Wildlife grassland</span><span>High pass</span></div>
    </section>
    <section id="cine-scenes" className="cine-scenes" aria-label="Destination chapters">
      <div className="cine-scenes__stage">
        {scenes.map((item, index) => <article className="cine-scene" key={item.slug} data-cine-scene>
          <div className="cine-scene__image"><Picture item={item} /></div>
          <div className="cine-scene__shade" />
          <div className="cine-scene__count">0{index + 1}</div>
          <div className="cine-scene__copy">
            <p>{item.state} / visual chapter</p><h3>{item.name}</h3>
            <span>{item.shortDescription}</span>
            <Link to={destinationPath(item)}>Enter this landscape <Arrow /></Link>
          </div>
        </article>)}
        <div className="cine-scenes__progress" aria-hidden="true"><i /></div>
      </div>
    </section>
    <section className="cine-cut" aria-labelledby="cine-experience-title">
      <div className="cine-cut__still"><Picture item={homepageExperiences[0]} /><p>Sound on the river. Footsteps in the forest.</p></div>
      <div className="cine-cut__list"><p>Chapter 03 / Ways into the landscape</p><h2 id="cine-experience-title">Choose the feeling.</h2>
        {homepageExperiences.slice(0, 4).map((item, index) => <Link to={experiencePath(item)} key={item.slug} data-cine-link>
          <small>0{index + 1}</small><strong>{item.title}</strong><span>{item.shortDescription || item.description}</span><Arrow />
        </Link>)}
      </div>
    </section>
    <section id="cine-road" className="cine-road" aria-label="Vehicles and complete trips">
      <header><p>Chapter 04 / The road</p><h2>A trusted cabin between every scene.</h2></header>
      <div className="cine-road__rail">
        {vehicles.slice(0, 3).map((item, index) => <Link className="cine-vehicle" to={`/fleet/${item.slug}`} key={item.slug}>
          <span>Vehicle 0{index + 1}</span><Picture item={item} /><div><h3>{item.name}</h3><p>{item.passengerCapacity} · {item.rate}</p><Arrow /></div>
        </Link>)}
      </div>
      <JourneyTimeline className="cine-journeys" />
    </section>
    <LandingCta direction="cine" title={<>Write the next <em>chapter.</em></>} />
  </>;
}

function EditorialHome() {
  const features = featuredDestinations.slice(0, 4);
  return <>
    <HeroSection direction="editorial" />
    <section className="ed-lede">
      <p className="ed-folio">Hornbill Review / Vol. 01</p>
      <div><h2>A region read<br />in many voices.</h2><p>Wildlife grasslands, river islands, rain-cut cliffs and high mountain roads. The Northeast resists the single story.</p></div>
    </section>
    <section id="ed-plates" className="ed-plates" aria-label="Editor's destination selection">
      <article className="ed-plate ed-plate--lead"><Link to={destinationPath(features[0])}><div className="ed-plate__media"><Picture item={features[0]} /></div><Meta item={features[0]} number="01" /></Link></article>
      <p className="ed-pull">“The journey changes register with every state.”</p>
      {features.slice(1).map((item, index) => <article className={`ed-plate ed-plate--${index + 2}`} key={item.slug}><Link to={destinationPath(item)}><div className="ed-plate__media"><Picture item={item} /></div><Meta item={item} number={`0${index + 2}`} /></Link></article>)}
    </section>
    <section id="ed-service" className="ed-service">
      <header><span>Travel desk</span><h2>Two ways to commission a journey.</h2></header>
      <div className="ed-service__chapters">
        <Link to="/fleet"><b>01</b><div><h3>Vehicle + local driver</h3><p>Choose the cabin, capacity and route suitability your journey needs.</p></div><Arrow /></Link>
        <Link to="/packages"><b>02</b><div><h3>The complete trip</h3><p>Begin with a route idea, then shape the destinations, pace and experiences.</p></div><Arrow /></Link>
      </div>
    </section>
    <section className="ed-journeys"><p>The route edit</p>{journeyIdeas.map((item, index) => <Link key={item.slug} to={journeyPath(item)}><small>0{index + 1}</small><h3>{item.title}</h3><span>{item.destinations.map(d => d.name).join(' · ')}</span><Arrow /></Link>)}</section>
    <LandingCta direction="ed" title={<>Your route,<br /><em>personally edited.</em></>} />
  </>;
}

function EarthyHome() {
  const trail = featuredDestinations.slice(0, 4);
  return <>
    <HeroSection direction="earthy" />
    <section className="earth-source"><div className="earth-source__rings" aria-hidden="true" /><p>Follow the contour</p><h2>Water finds the valley.<br />Roads learn the mountain.</h2><span>A journey here moves with the terrain—from the Brahmaputra plain to rain forests and high passes.</span></section>
    <section id="earth-trail" className="earth-trail" aria-label="Landscape route">
      <svg className="earth-trail__line" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true"><path d="M52 0 C10 130 88 220 48 350 S10 570 62 690 S84 860 44 1000" /></svg>
      {trail.map((item, index) => <article className="earth-stop" key={item.slug} data-earth-stop>
        <div className="earth-stop__marker">0{index + 1}</div><Link className="earth-stop__image" to={destinationPath(item)}><Picture item={item} /></Link>
        <div className="earth-stop__copy"><p>{item.state}</p><h3>{item.name}</h3><span>{item.shortDescription}</span><Link to={destinationPath(item)}>Follow the route <Arrow /></Link></div>
      </article>)}
    </section>
    <section className="earth-field"><header><p>Ways to be outside</p><h2>Move closer to the landscape.</h2></header><div className="earth-field__rail">{homepageExperiences.slice(0, 4).map((item, index) => <Link to={experiencePath(item)} key={item.slug}><Picture item={item} /><span>0{index + 1}</span><strong>{item.title}</strong></Link>)}</div></section>
    <section className="earth-road"><div><p>The changing road</p><h2>Comfort that travels well.</h2><span>Well-maintained vehicles, chosen for your group and the route ahead.</span><Link to="/fleet">Choose a vehicle <Arrow /></Link></div><div className="earth-road__vehicles">{vehicles.slice(0, 2).map(item => <Link to={`/fleet/${item.slug}`} key={item.slug}><Picture item={item} /><span>{item.name}</span></Link>)}</div></section>
    <LandingCta direction="earth" title={<>Let the route<br /><em>take its shape.</em></>} />
  </>;
}

function MinimalHome() {
  return <>
    <HeroSection direction="minimal" />
    <section className="minifesto"><span>HJ—01</span><h2>Go further.<br />Keep it clear.</h2><p>Choose the place, the vehicle, or the complete trip. We shape the practical route between them.</p></section>
    <section className="min-destinations" aria-label="Destination index"><header><span>No.</span><span>Destination</span><span>State</span><span>View</span></header>{featuredDestinations.slice(0, 6).map((item, index) => <Link to={destinationPath(item)} key={item.slug} data-min-row><small>0{index + 1}</small><strong>{item.name}</strong><span>{item.state}</span><Arrow /><img src={item.image} alt="" aria-hidden="true" /></Link>)}</section>
    <section className="min-binary"><Link to="/fleet"><span>A / Transport</span><h2>Book the vehicle.</h2><p>Compare real capacities, displayed rates and route suitability.</p><Arrow /></Link><Link to="/packages"><span>B / Planning</span><h2>Book the journey.</h2><p>Start with a route idea, then send one structured enquiry.</p><Arrow /></Link></section>
    <section className="min-fleet"><header><span>Type</span><span>Vehicle</span><span>Capacity</span><span>Rate</span></header>{vehicles.map(item => <Link to={`/fleet/${item.slug}`} key={item.slug}><span>{item.type}</span><strong>{item.name}</strong><span>{item.passengerCapacity}</span><span>{item.rate}</span></Link>)}</section>
    <LandingCta direction="min" title={<>One enquiry.<br />A clearer route.</>} />
  </>;
}

function PhotographicHome() {
  const photos = [...featuredDestinations.slice(0, 5), ...homepageExperiences.slice(0, 3)];
  return <>
    <HeroSection direction="photographic" />
    <section className="ph-opening"><p>Field sequence / Northeast India</p><h2>Look first.<br />Choose the road after.</h2></section>
    <section className="ph-story" aria-label="Photographic destination story">
      {photos.slice(0, 4).map((item, index) => <Link className={`ph-story__frame ph-story__frame--${index + 1}`} to={item.state ? destinationPath(item) : experiencePath(item)} key={item.slug} data-photo-frame><Picture item={item} /><span><b>0{index + 1}</b>{item.name || item.title}</span></Link>)}
    </section>
    <section className="ph-sequence"><div className="ph-sequence__sticky"><Picture item={photos[4]} /><div className="ph-sequence__caption"><p>Frame 05</p><h2>{photos[4].name}</h2><Link to={destinationPath(photos[4])}>Open field note <Arrow /></Link></div></div><div className="ph-sequence__notes">{photos.slice(5).map((item, index) => <Link to={experiencePath(item)} key={item.slug}><span>0{index + 6}</span><h3>{item.title}</h3><p>{item.shortDescription || item.description}</p></Link>)}</div></section>
    <section className="ph-choice"><div className="ph-choice__image"><Picture item={journeyIdeas[0]} /></div><div><p>Two ways forward</p><h2>The vehicle,<br />or the whole journey.</h2><Link to="/fleet">Book a vehicle <Arrow /></Link><Link to="/packages">Plan a complete trip <Arrow /></Link></div></section>
    <LandingCta direction="ph" title={<>The next frame<br /><em>starts on the road.</em></>} />
  </>;
}

function Meta({ item, number }) { return <div className="ed-plate__meta"><small>{number} / {item.state}</small><h3>{item.name}</h3><Arrow /></div>; }
function JourneyTimeline({ className = '' }) { return <div className={className}><header><p>Chapter 05 / Complete journeys</p><Link to="/packages">All route ideas <Arrow /></Link></header>{journeyIdeas.map((item, index) => <Link key={item.slug} to={journeyPath(item)}><small>0{index + 1}</small><strong>{item.title}</strong><span>{item.destinations.map(d => d.name).join(' · ')}</span><Arrow /></Link>)}</div>; }
function LandingCta({ direction, title }) { return <section className={`v-cta v-cta--${direction}`}><p>Begin with a conversation</p><h2>{title}</h2><span>Tell us where you want to go, who is travelling and what matters most.</span><div><Link to="/plan-my-trip">Plan a complete trip <Arrow /></Link><Link to="/fleet">Book a vehicle</Link></div></section>; }
