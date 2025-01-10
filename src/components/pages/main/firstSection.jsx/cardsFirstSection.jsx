import React from 'react';

export default function Card({ text1, text2, side }) {
  return (
    <div className={`main__block-${side}`}>
      <h1 className="main__block-title">{text1}</h1>
      <p className="main__block-subtitle">{text2}</p>
    </div>
  );
}
