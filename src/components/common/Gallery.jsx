export default function Gallery({ images, getAlt, className = '' }) {
  return (
    <div className={`system-gallery ${className}`.trim()}>
      {images.map((image, index) => (
        <img key={`${image}-${index}`} src={image} alt={getAlt(index)} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
