import React from 'react';
import './cardSection.css';
import Card from './card';
import Title from './titleText';

export default function CardSection() {
  return (
    <section className="cart">
      <div className="cart__wrap">
        <div className="cart__container">
          <Title />
          <Card />
        </div>
      </div>
    </section>
  );
}
