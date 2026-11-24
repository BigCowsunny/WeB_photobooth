import './PhotoGrid.css';

function PhotoGrid({ images, onImageClick }) {
  return (
    <div className="photo-grid">
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          className="photo-card card"
          onClick={() => onImageClick(index)}
          aria-label={`ดูรูปภาพ: ${image.title}`}
        >
          <img
            src={image.thumbnail || image.src}
            alt={image.title}
            loading="lazy"
          />
          <div className="photo-overlay">
            <div className="photo-title">{image.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default PhotoGrid;
