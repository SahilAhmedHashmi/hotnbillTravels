import Gallery from '../common/Gallery.jsx';

export default function PackageGallery({ item }) {
  return (
    <section className="package-detail-section">
      <div className="package-section-heading">
        <p className="label">Gallery</p>
        <h2>Visual notes from the route.</h2>
      </div>
      <Gallery
        images={item.gallery}
        getAlt={(index) => `${item.title} view ${index + 1}`}
        className="package-gallery"
      />
    </section>
  );
}
