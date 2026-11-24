import { useEffect, useRef } from 'react';
import './Lightbox.css';

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const lastFocusedElement = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    lastFocusedElement.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
      lastFocusedElement.current?.focus();
    };
  }, [onClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay active" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="ปิดภาพ"
        >
          ×
        </button>
        
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={onPrev}
          aria-label="รูปภาพก่อนหน้า"
        >
          ‹
        </button>
        
        <button
          type="button"
          className="lightbox-nav next"
          onClick={onNext}
          aria-label="รูปภาพถัดไป"
        >
          ›
        </button>
        
        <img
          className="lightbox-image"
          src={currentImage.src}
          alt={currentImage.title}
        />
        
        <a
          className="lightbox-download"
          href={currentImage.downloadUrl || currentImage.src}
          download={currentImage.title}
          aria-label="ดาวน์โหลดรูปภาพ"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <path d="m7 10 5 5 5-5"/>
            <path d="M12 15V3"/>
          </svg>
          <span>ดาวน์โหลด</span>
        </a>
        
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
