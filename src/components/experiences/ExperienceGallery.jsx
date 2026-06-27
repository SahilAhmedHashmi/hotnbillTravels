import Gallery from '../common/Gallery.jsx';

export default function ExperienceGallery({ experience }) {
  return (
    <section className="experience-detail-section">
      <div className="experience-section-heading">
        <p className="label">Visual Notes</p>
        <h2>What this journey can feel like.</h2>
      </div>
      <Gallery
        images={experience.gallery}
        getAlt={(index) => `${experience.title} view ${index + 1}`}
        className="experience-gallery"
      />
    </section>
  );
}
