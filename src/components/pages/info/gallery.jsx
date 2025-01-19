import React, { useState } from "react";

const Gallery = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = (index) => {
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

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Изображение ${index + 1}`}
          className="gallery-image"
          onClick={() => openFullscreen(index)}
        />
      ))}
      {isFullscreen && (
        <div className="fullscreen-gallery active">
          <img src={images[currentImageIndex]} alt="Полноэкранное изображение" />
          <button id="close-gallery" onClick={closeFullscreen}>
            &times;
          </button>
          <button id="prev-image" onClick={showPrevImage}>
            &lt;
          </button>
          <button id="next-image" onClick={showNextImage}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;