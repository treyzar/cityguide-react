import React from 'react';

const AttractionCard = ({ attraction, handleAttractionClick }) => {
  return (
    <div
      className="card"
      onClick={() => handleAttractionClick(attraction.id)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleAttractionClick(attraction.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <img
        src={attraction.image}
        alt={attraction.name}
        style={{
          height: '200px',
          width: '320px',
          borderRadius: '7px',
        }}
      />
      <h2>{attraction.name}</h2>
      <p>{attraction.description}</p>
      <p>
        <strong>Адрес:</strong> {attraction.addres}
      </p>
      <p>
        <strong>Регион:</strong> {attraction.region}
      </p>
      <p>
        <strong>Рейтинг:</strong> {attraction.rating}
      </p>
    </div>
  );
};

export default AttractionCard;