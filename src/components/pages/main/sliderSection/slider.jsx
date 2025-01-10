import React, { useState, useEffect } from 'react';
import './sliderSection.css';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  return (
    <div className="slider">
      <div className="slider__container">
        <div className="slider__slider-img">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            />
          ))}
        </div>
        <button
          className="prev-button"
          onClick={prevSlide}
          aria-label="Посмотреть предыдущий слайд"
        >
          &lt;
        </button>
        <button
          className="next-button"
          onClick={nextSlide}
          aria-label="Посмотреть следующий слайд"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
