import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../home/HeroSection.jsx';
import PhotoHero from '../home/PhotoHero.jsx';
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
  const destinations = featuredDestinations.slice(0, 5);
  const journeyImages = ['/destinations/kaziranga-hero-v2.webp', '/destinations/root-bridge-hero-v2.webp', '/destinations/tawang-hero-v2.webp', '/destinations/gurudongmar-lake.jpg'];
  return <>
    <PhotoHero />
    <section className="photo-prologue">
      <p>Hornbill field journal / 01</p>
      <h2>Not one Northeast.<br /><em>Many ways through it.</em></h2>
      <figure><img src="/Waterfall Expeditions.jpg" alt="A waterfall and clear pool in Meghalaya" loading="eager" decoding="async"/><figcaption>Water country / Meghalaya</figcaption></figure>
      <div><span>Six states</span><p>Rain forests and river islands. Wildlife grasslands and mountain passes. Journeys built around what you want to see—and the road required to reach it.</p></div>
    </section>
    <section className="photo-horizontal" aria-label="Featured destinations">
      <div className="photo-horizontal__track">
        <header className="photo-horizontal__intro"><p>Destination sequence / 02</p><h2>Five frames.<br />Five reasons to go.</h2><span>Scroll to move east</span></header>
        {destinations.map((item, index) => <article className={`photo-destination photo-destination--${index + 1}`} key={item.slug} data-photo-destination>
          <Link to={destinationPath(item)}><div className="photo-destination__image"><Picture item={item} /></div><div className="photo-destination__meta"><small>0{index + 1} / {item.state}</small><h3>{item.name}</h3><p>{item.shortDescription}</p><span>View field note <Arrow /></span></div></Link>
        </article>)}
        <Link className="photo-horizontal__end" to="/destinations"><span>Continue exploring</span><strong>All destinations</strong><Arrow /></Link>
      </div>
      <div className="photo-horizontal__progress" aria-hidden="true"><i /></div>
    </section>
    <PhotoExperienceAtlas />
    <PhotoFleetStage />
    <section className="photo-journeys">
      <header><p>Complete journeys / 05</p><h2>A route is more than<br />a list of places.</h2><span>Start with a visual idea. We shape the sequence, transport and pacing around your enquiry.</span></header>
      <div className="photo-journeys__stack">{journeyIdeas.map((item, index) => <article key={item.slug} className="photo-journey" data-photo-journey style={{'--stack-index': index}}><img src={journeyImages[index]} alt={item.title} loading="lazy" decoding="async"/><div className="photo-journey__veil"/><div className="photo-journey__copy"><small>Journey 0{index + 1}</small><h3>{item.title}</h3><p>{item.summary}</p><div>{item.destinations.map(destination => <span key={destination.slug}>{destination.name}</span>)}</div><Link to={journeyPath(item)}>Use this as a starting point <Arrow /></Link></div></article>)}</div>
    </section>
    <section className="photo-final"><img src="/destinations/yumthang-valley.jpg" alt="A mountain road through the Yumthang Valley in Sikkim" loading="lazy" decoding="async"/><div className="photo-final__shade"/><p>Start with what draws you in.</p><h2>We’ll shape<br />the road around it.</h2><div className="photo-final__actions"><Link to="/plan-my-trip">Plan a complete trip <Arrow /></Link><Link to="/fleet">Book a vehicle <Arrow /></Link></div></section>
  </>;
}

function PhotoExperienceAtlas() {
  const items = homepageExperiences.slice(0, 4);
  const visuals = ['/destinations/gurudongmar-lake.jpg', '/destinations/kaziranga-hero-v2.webp', '/destinations/majuli-hero-v2.webp', '/destinations/tawang-hero-v2.webp'];
  const [active, setActive] = useState(0);
  return <section className="photo-atlas" data-active={active} aria-labelledby="photo-atlas-title">
    <div className="photo-atlas__visual">{items.map((item,index)=><img key={item.slug} src={visuals[index]} alt="" aria-hidden="true" className={index===active?'active':''} loading="eager" decoding="async"/>)}<div className="photo-atlas__counter"><span>0{active+1}</span><i/><span>0{items.length}</span></div></div>
    <div className="photo-atlas__content"><header><p>Ways to experience it / 03</p><h2 id="photo-atlas-title">Choose how<br />you enter.</h2></header><div className="photo-atlas__list">{items.map((item,index)=><Link to={experiencePath(item)} key={item.slug} data-atlas-row data-index={index} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><small>0{index+1}</small><h3>{item.title}</h3><p>{item.shortDescription || item.description}</p><Arrow /></Link>)}</div></div>
  </section>;
}

function PhotoFleetStage() {
  const fleet = vehicles.slice(0, 3);
  const [active, setActive] = useState(0);
  const vehicle = fleet[active];
  return <section className="photo-fleet" aria-labelledby="photo-fleet-title">
    <div className="photo-fleet__landscape"><img src="/tawang valley.jpg" alt="Mountain road landscape in Arunachal Pradesh" loading="lazy" decoding="async"/><div><p>The road is part of the picture.</p><span>Local route knowledge · Comfortable transport · Experienced drivers</span></div></div>
    <div className="photo-fleet__stage">
      <header><p>Vehicles / 04</p><h2 id="photo-fleet-title">Choose the cabin<br />for what lies ahead.</h2></header>
      <div className="photo-fleet__product" key={vehicle.slug}><span className="photo-fleet__number">0{active+1}</span><img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async"/><div><small>{vehicle.type}</small><h3>{vehicle.name}</h3><p>{vehicle.passengerCapacity} · {vehicle.rate} {vehicle.rateNote}</p><Link to={`/fleet/${vehicle.slug}`}>View vehicle details <Arrow /></Link></div></div>
      <div className="photo-fleet__tabs" aria-label="Select a vehicle">{fleet.map((item,index)=><button type="button" aria-pressed={index===active} key={item.slug} onClick={()=>setActive(index)}><span>0{index+1}</span>{item.name}</button>)}</div>
      <Link className="photo-fleet__all" to="/fleet">Compare the complete fleet <Arrow /></Link>
    </div>
  </section>;
}

function Meta({ item, number }) { return <div className="ed-plate__meta"><small>{number} / {item.state}</small><h3>{item.name}</h3><Arrow /></div>; }
function JourneyTimeline({ className = '' }) { return <div className={className}><header><p>Chapter 05 / Complete journeys</p><Link to="/packages">All route ideas <Arrow /></Link></header>{journeyIdeas.map((item, index) => <Link key={item.slug} to={journeyPath(item)}><small>0{index + 1}</small><strong>{item.title}</strong><span>{item.destinations.map(d => d.name).join(' · ')}</span><Arrow /></Link>)}</div>; }
function LandingCta({ direction, title }) { return <section className={`v-cta v-cta--${direction}`}><p>Begin with a conversation</p><h2>{title}</h2><span>Tell us where you want to go, who is travelling and what matters most.</span><div><Link to="/plan-my-trip">Plan a complete trip <Arrow /></Link><Link to="/fleet">Book a vehicle</Link></div></section>; }
