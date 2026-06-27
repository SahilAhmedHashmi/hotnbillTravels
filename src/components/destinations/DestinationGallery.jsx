import Gallery from '../common/Gallery.jsx';

export default function DestinationGallery({ destination }) {
  return (
    <section className="destination-detail-section">
      <div className="detail-section-heading">
        <p className="label">Gallery</p>
        <h2>First Glimpse of {destination.name}</h2>
      </div>
      <Gallery
        images={destination.gallery}
        getAlt={(index) => `${destination.name} travel view ${index + 1}`}
        className="destination-gallery"
      />
    </section>
  );
}
