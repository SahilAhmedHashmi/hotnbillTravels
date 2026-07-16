import { Link, useParams, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function PlaceholderPage({ title, eyebrow, copy, metaDescription = copy, noIndex = false }) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const details = [
    params.slug ? `Route slug: ${params.slug}` : null,
    searchParams.toString() ? `Query: ${searchParams.toString()}` : null,
  ].filter(Boolean);

  usePageMeta({
    title,
    description: metaDescription,
    noIndex,
  });

  return (
    <main className="placeholder-page">
      <section>
        <p className="label">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        {details.map((detail) => <p className="route-note" key={detail}>{detail}</p>)}
        <div className="placeholder-actions">
          <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
          <Link className="btn btn-ghost" to="/">Back Home</Link>
        </div>
      </section>
    </main>
  );
}
