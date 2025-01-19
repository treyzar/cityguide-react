import React from 'react';

const AttractionCard = ({ attraction }) => {
  if (!attraction) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="container">
      <div className="card">
        <h2>{attraction.name}</h2>
        <div className="image-map-container">
          <iframe src={attraction.map} title="Карта" className="map"></iframe>
        </div>
        <p>{attraction.description2}</p>
        <a href="/attractions" className="back-button">
          Вернуться назад
        </a>
      </div>
    </div>
  );
};

export default AttractionCard;
