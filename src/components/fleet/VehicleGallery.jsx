import Gallery from '../common/Gallery.jsx';

export default function VehicleGallery({ vehicle }) {
  return (
    <section className="vehicle-detail-section">
      <div className="fleet-section-heading">
        <p className="label">Gallery</p>
        <h2>A closer look at {vehicle.name}.</h2>
      </div>
      <Gallery
        images={vehicle.gallery}
        getAlt={(index) => `${vehicle.name} view ${index + 1}`}
        className="vehicle-gallery"
      />
    </section>
  );
}
