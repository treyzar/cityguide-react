import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = index => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const showPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, currentImageIndex]);

  if (!images || images.length === 0) {
    return <p>Изображения отсутствуют</p>;
  }

  return (
    <div className="info-gallery">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => openFullscreen(index)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              openFullscreen(index);
            }
          }}
          style={{ border: 'none', background: 'none', padding: 0 }}
          aria-label={`Открыть изображение ${index + 1} в полноэкранном режиме`}
        >
          <img
            src={image}
            alt={`Изображение ${index + 1}`}
            className="info-gallery-image"
          />
        </button>
      ))}

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Полноэкранный просмотр изображения"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              showPrevImage();
            }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
            aria-label="Предыдущее изображение"
          >
            &#10094;
          </button>
          <button
            onClick={e => e.stopPropagation()}
            style={{ background: 'none', border: 'none', padding: 0 }}
            aria-label="Изображение"
          >
            <img
              src={images[currentImageIndex]}
              alt={`Изображение ${currentImageIndex + 1}`}
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              showNextImage();
            }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
            aria-label="Следующее изображение"
          >
            &#10095;
          </button>
          <button
            onClick={closeFullscreen}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
            aria-label="Закрыть полноэкранный режим"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
