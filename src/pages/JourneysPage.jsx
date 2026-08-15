import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import Button from '../components/common/Button.jsx';
import { journeyIdeas } from '../data/journeys.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function JourneysPage(){
  usePageMeta({title:'Complete Trips | Hornbill Journeys',description:'Start with a Northeast India route idea, then customise destinations, pacing, experiences, and vehicle.'});
  return <main className="journeys-page">
    <header className="journeys-hero"><div><Breadcrumbs items={[{label:'Complete Trips',current:true}]} /><p className="label">Complete journey planning</p><h1>Start with a route.<br/>Make it yours.</h1></div><p>These are flexible enquiry starting points assembled from our existing destination and experience catalogue. Final routes, timing, stays, transport, and pricing are confirmed personally.</p></header>
    <section className="journey-list" aria-label="Complete trip ideas">
      {journeyIdeas.map((journey,index)=><article className="journey-row" key={journey.slug}>
        <figure><img src={journey.image} alt="" loading={index ? 'lazy':'eager'} decoding="async"/><figcaption>{String(index+1).padStart(2,'0')} / {journey.experience?.title}</figcaption></figure>
        <div className="journey-copy"><h2>{journey.title}</h2><p>{journey.summary}</p><ul aria-label="Destinations">{journey.destinations.map(item=><li key={item.slug}><Link to={`/destinations/${item.slug}`}>{item.name}</Link></li>)}</ul><Button to={`/plan-my-trip?destination=${journey.destinationSlugs[0]}&experience=${journey.experienceSlug}`}>Plan this journey</Button></div>
      </article>)}
    </section>
  </main>;
}
