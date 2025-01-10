import React from 'react';
import Slider from './slider';
import MainText from './mainText';
import AboutText from './aboutText';
import slider1 from '../images/slider1.png';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import slider4 from '../images/slider4.jpg';
import slider5 from '../images/slider5.jpg';
import './sliderSection.css';

export default function SliderSection() {
  const images = [slider1, slider2, slider3, slider4, slider5];

  return (
    <section className="slider">
      <div className="slider__wrap">
        <MainText />
        <div className="slider__container">
          <AboutText />
          <Slider images={images} />{' '}
        </div>
      </div>
    </section>
  );
}
